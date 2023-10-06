import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { v4 } from 'uuid';

import {
  addVideo,
  delVideo,
  editVideo,
} from '../redux/modules/courses/actions';

import { database, storage } from '../firebase/config';
import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
} from 'firebase/storage';
import {
  Timestamp,
  addDoc,
  collection,
  doc,
  deleteDoc,
  updateDoc,
} from '@firebase/firestore';

import { useToast } from '@chakra-ui/react';

const uploadAssetFile = async (assetFile) => {
  if (assetFile.fileURL) {
    return assetFile;
  } else if (assetFile.file) {
    return new Promise((resolve, reject) => {
      const firestoreAssetFileName = `courses/downloads/${Date.now()}${v4()}`;
      const assetStorageRef = ref(storage, firestoreAssetFileName);
      const uploadAssetTask = uploadBytesResumable(
        assetStorageRef,
        assetFile.file,
      );

      uploadAssetTask.on(
        'state_changed',
        (snapshot) => {
          switch (snapshot.state) {
            case 'paused':
              toast({
                description: 'Envio pausado',
                status: 'info',
                duration: '3000',
                isClosable: true,
              });
              break;
            default:
              break;
          }
        },
        (error) => {
          switch (error.code) {
            case 'storage/unauthorized':
              toast({
                description:
                  'O usuário não tem autorização para acessar o objeto.',
                status: 'error',
                duration: '3000',
                isClosable: true,
              });
              break;
            case 'storage/canceled':
              toast({
                description: 'O usuário cancelou o upload',
                status: 'error',
                duration: '3000',
                isClosable: true,
              });
              break;
            default:
              toast({
                description: 'Ocorreu um erro, tente novamente.',
                status: 'error',
                duration: '3000',
                isClosable: true,
              });
              break;
          }
        },
        async () => {
          try {
            const fileURL = await getDownloadURL(uploadAssetTask.snapshot.ref);

            const fileObject = {
              fileName: assetFile.fileName,
              fileURL,
              fileStorageRef: firestoreAssetFileName,
            };
            resolve(fileObject);
          } catch (error) {
            reject(error);
            toast({
              description: error.message,
              status: 'error',
              duration: '3000',
              isClosable: true,
            });
          }
        },
      );
    });
  } else return;
};

const uploadToStorage = (storageRef, file) => {
  return new Promise(async (resolve, reject) => {
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        // Se quiser adicionar tratamento de progresso, pode fazer isso aqui
      },
      (error) => {
        switch (error.code) {
          case 'storage/unauthorized':
            reject(
              new Error('O usuário não tem autorização para acessar o objeto.'),
            );
            break;
          case 'storage/canceled':
            reject(new Error('O usuário cancelou o upload.'));
            break;
          default:
            reject(new Error('Ocorreu um erro, tente novamente.'));
        }
      },
      async () => {
        try {
          const path = await getDownloadURL(uploadTask.snapshot.ref);
          resolve(path);
        } catch (error) {
          reject(error);
        }
      },
    );
  });
};

const useVideo = () => {
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const toast = useToast();

  const uploadVideo = async (videoData, docCollection) => {
    setLoading(true);

    const assets = [];

    const uploadAsset = async (assetFile) => {
      if (assetFile.fileURL) {
        assets.push(assetFile);
      } else {
        const firestoreAssetFileName = `courses/downloads/${Date.now()}${v4()}`;
        const assetStorageRef = ref(storage, firestoreAssetFileName);
        const path = await uploadToStorage(assetStorageRef, assetFile.file);
        const fileObject = {
          fileName: assetFile.fileName,
          fileURL: path,
          fileStorageRef: firestoreAssetFileName,
        };

        assets.push(fileObject);
      }
    };

    if (videoData.assetsList) {
      for (const assetFile of videoData.assetsList) {
        await uploadAsset(assetFile);
      }
    }

    let videoDataUpdated;

    if (videoData.videoFile !== null) {
      const firestoreVideoFileName = `${docCollection}/${Date.now()}${v4()}`;
      const videoStorageRef = ref(storage, firestoreVideoFileName);

      const URL = await uploadToStorage(videoStorageRef, videoData.videoFile);

      videoDataUpdated = {
        ...videoData,
        videoPath: URL,
        storageRef: firestoreVideoFileName,
        createdAt: Timestamp.now(),
        assetsList: assets,
      };

      delete videoDataUpdated.videoFile;
      delete videoDataUpdated.assetsList;
      if (assets.length === 0) {
        delete videoDataUpdated.assets;
      }
    } else {
      videoDataUpdated = {
        ...videoData,
        videoPath: videoData.videoPath,
        createdAt: Timestamp.now(),
        assetsList: assets,
      };

      delete videoDataUpdated.assetsList;
      if (assets.length === 0) {
        delete videoDataUpdated.assets;
      }
    }

    const videoRes = await addDoc(
      collection(database, docCollection),
      videoDataUpdated,
    );

    const updateTime = Timestamp.now();
    const updateCollection = doc(database, 'updates', 'courses');
    setDoc(updateCollection, { lastCoursesUpdate: updateTime });
    const updatedAt = JSON.stringify(updateTime);
    localStorage.setItem('lastCoursesUpdate', updatedAt);

    dispatch(
      addVideo({
        id: videoRes.id,
        ...videoDataUpdated,
        createdAt: videoDataUpdated.createdAt.toMillis(),
      }),
    );

    toast({
      description: 'Video adicionado com sucesso!',
      status: 'success',
      duration: '3000',
      isClosable: true,
    });
    setLoading(false);
  };

  const updateVideo = async (
    courseId,
    oldVideoData,
    updatedVideoData,
    docCollection,
  ) => {
    setLoading(true);

    let filesToRemove;
    if (oldVideoData.assetsList && updatedVideoData.assetsList) {
      filesToRemove = oldVideoData?.assetsList?.filter(
        (item1) =>
          !updatedVideoData?.assetsList?.some(
            (item2) => item2.fileURL === item1.fileURL,
          ),
      );
    }

    if (filesToRemove && filesToRemove?.length > 0) {
      filesToRemove.forEach(async (file) => {
        if (file.fileStorageRef) {
          const fileRef = ref(storage, file.fileStorageRef);
          await deleteObject(fileRef);
        }
        return;
      });
    }

    try {
      let updatedAssets = oldVideoData.assets || [];
      if (updatedVideoData.assetsList) {
        updatedAssets = await Promise.all(
          updatedVideoData?.assetsList?.map(uploadAssetFile),
        );
      }

      let videoData;
      if (updatedVideoData?.videoFile) {
        const firestoreFileName = `${docCollection}/${Date.now()}${v4()}`;
        const storageRef = ref(storage, firestoreFileName);
        const URL = await uploadToStorage(
          storageRef,
          updatedVideoData.videoFile,
        );

        const fileRef = ref(storage, oldVideoData.storageRef);
        await deleteObject(fileRef);

        videoData = {
          ...updatedVideoData,
          assetsList: updatedAssets,
          createdAt: Timestamp.fromMillis(oldVideoData.createdAt),
          videoPath: URL,
          storageRef: firestoreFileName,
        };
      } else {
        videoData = {
          ...updatedVideoData,
          assetsList: updatedAssets,
          createdAt: Timestamp.fromMillis(oldVideoData.createdAt),
          storageRef: oldVideoData.storageRef ? oldVideoData.storageRef : null,
        };
      }

      const videoRef = doc(database, docCollection, oldVideoData.id);
      await updateDoc(videoRef, videoData);

      const updateTime = Timestamp.now();
      const updateCollection = doc(database, 'updates', 'courses');
      setDoc(updateCollection, { lastCoursesUpdate: updateTime });
      const updatedAt = JSON.stringify(updateTime);
      localStorage.setItem('lastCoursesUpdate', updatedAt);

      dispatch(
        editVideo({
          videoData: {
            ...videoData,
            createdAt: videoData.createdAt.toMillis(),
          },
          courseId,
        }),
      );

      toast({
        description: 'Video alterado com sucesso!',
        status: 'success',
        duration: '3000',
        isClosable: true,
      });
    } catch (error) {
      toast({
        description: error.message,
        status: 'error',
        duration: '3000',
        isClosable: true,
      });

      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const deleteVideo = async (courseId, video) => {
    setLoading(true);
    try {
      const videoRef = doc(database, `courses/${courseId}/videos/`, video.id);
      await deleteDoc(videoRef);

      if (video.storageRef) {
        const fileRef = ref(storage, video.storageRef);
        await deleteObject(fileRef);
      }

      if (video.assets) {
        video.assets.forEach(async (file) => {
          if (file.fileStorageRef) {
            const fileRef = ref(storage, file.fileStorageRef);
            await deleteObject(fileRef);
          }
        });
      }

      const updateTime = Timestamp.now();
      const updateCollection = doc(database, 'updates', 'courses');
      setDoc(updateCollection, { lastCoursesUpdate: updateTime });
      const updatedAt = JSON.stringify(updateTime);
      localStorage.setItem('lastCoursesUpdate', updatedAt);

      dispatch(delVideo({ courseId, videoId: video.id }));
    } catch (error) {
      toast({
        description: error.message,
        status: 'error',
        duration: '3000',
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  return {
    uploadVideo,
    updateVideo,
    deleteVideo,
    loading,
  };
};

export default useVideo;
