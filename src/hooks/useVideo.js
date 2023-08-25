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

import { toast } from 'react-hot-toast';

const useVideo = () => {
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const uploadVideo = async (
    videoData,
    docCollection,
    videoFile,
    assetsList,
    setOpenVideoModal,
  ) => {
    setLoading(true);

    if (videoFile === null) {
      toast.error('Envie um arquivo de vídeo!');
      return;
    }

    const assets = [];

    const uploadAsset = async (assetFile) => {
      if (assetFile.fileURL) {
        assets.push(assetFile);
      } else {
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
                toast.promise('Envio pausado');
                break;
              default:
                break;
            }
          },
          (e) => {
            switch (e.code) {
              case 'storage/unauthorized':
                toast.error(
                  'O usuário não tem autorização para acessar o objeto.',
                );
                break;
              case 'storage/canceled':
                toast.error('O usuário cancelou o upload');
                break;
              default:
                toast.error('Ocorreu um erro, tente novamente.');
                break;
            }
          },
          async () => {
            try {
              const fileURL = await getDownloadURL(
                uploadAssetTask.snapshot.ref,
              );

              const fileObject = {
                fileName: assetFile.fileName,
                fileURL,
                fileStorageRef: firestoreAssetFileName,
              };
              assets.push(fileObject);
            } catch (error) {
              console.log(error);
              toast.error(error.message);
            }
          },
        );
      }
    };

    for (const assetFile of assetsList) {
      await uploadAsset(assetFile);
    }

    const firestoreVideoFileName = `${docCollection}/${Date.now()}${v4()}`;
    const videoStorageRef = ref(storage, firestoreVideoFileName);
    const uploadVideoTask = uploadBytesResumable(videoStorageRef, videoFile);

    uploadVideoTask.on(
      'state_changed',
      (snapshot) => {
        const progressStatus =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(progressStatus);
        switch (snapshot.state) {
          case 'paused':
            toast.promise('Envio pausado');
            break;
          default:
            break;
        }
      },
      (e) => {
        switch (e.code) {
          case 'storage/unauthorized':
            toast.error('O usuário não tem autorização para acessar o objeto.');
            break;
          case 'storage/canceled':
            toast.error('O usuário cancelou o upload');
            break;
          default:
            toast.error('Ocorreu um erro, tente novamente.');
            break;
        }
      },
      async () => {
        try {
          const res = await getDownloadURL(uploadVideoTask.snapshot.ref);
          const videoDataUpdated = {
            ...videoData,
            videoPath: res,
            storageRef: firestoreVideoFileName,
            createdAt: Timestamp.now(),
            assets: assets,
          };

          const videoRes = await addDoc(
            collection(database, docCollection),
            videoDataUpdated,
          );

          dispatch(
            addVideo({
              courseRef: docCollection
                .replace('courses/', '')
                .replace('/videos', ''),
              id: videoRes.id,
              ...videoDataUpdated,
              createdAt: videoDataUpdated.createdAt.toMillis(),
            }),
          );

          toast.success('Aula adicionada com sucesso!');
        } catch (error) {
          console.log(error);
          toast.error(error.message);
        } finally {
          setOpenVideoModal(false);
          setLoading(false);
        }
      },
    );
  };

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
                toast.promise('Envio pausado');
                break;
              default:
                break;
            }
          },
          (e) => {
            switch (e.code) {
              case 'storage/unauthorized':
                toast.error(
                  'O usuário não tem autorização para acessar o objeto.',
                );
                break;
              case 'storage/canceled':
                toast.error('O usuário cancelou o upload');
                break;
              default:
                toast.error('Ocorreu um erro, tente novamente.');
                break;
            }
          },
          async () => {
            try {
              const fileURL = await getDownloadURL(
                uploadAssetTask.snapshot.ref,
              );

              const fileObject = {
                fileName: assetFile.fileName,
                fileURL,
                fileStorageRef: firestoreAssetFileName,
              };
              resolve(fileObject);
            } catch (error) {
              reject(error);
              toast.error(error.message);
            }
          },
        );
      });
    } else return;
  };

  const updateVideo = async (
    courseId,
    setOpenEditModal,
    oldVideoData,
    updatedVideoData,
    docCollection,
    fileList,
    newVideo = null,
  ) => {
    setLoading(true);

    const filesToRemove = oldVideoData.assets.filter(
      (item1) => !fileList.some((item2) => item2.fileURL === item1.fileURL),
    );

    if (filesToRemove.length > 0) {
      filesToRemove.forEach(async (file) => {
        const fileRef = ref(storage, file.fileStorageRef);
        await deleteObject(fileRef);
      });
    }

    if (newVideo !== null) {
      const firestoreFileName = `${docCollection}/${Date.now()}${v4()}`;
      const storageRef = ref(storage, firestoreFileName);
      const uploadTask = uploadBytesResumable(storageRef, newVideo);

      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progressStatus =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setProgress(progressStatus);
          switch (snapshot.state) {
            case 'paused':
              toast.promise('Envio pausado');
              break;
            default:
              break;
          }
        },
        (error) => {
          switch (error.code) {
            case 'storage/unauthorized':
              toast.error(
                'O usuário não tem autorização para acessar o objeto.',
              );
              break;
            case 'storage/canceled':
              toast.error('O usuário cancelou o upload');
              break;
            default:
              toast.error('Ocorreu um erro, tente novamente.');
              break;
          }
        },
        async () => {
          try {
            const updatedAssets = await Promise.all(
              fileList.map(uploadAssetFile),
            );

            const fileRef = ref(storage, oldVideoData.storageRef);
            await deleteObject(fileRef);

            const res = await getDownloadURL(uploadTask.snapshot.ref);
            const videoData = {
              ...oldVideoData,
              ...updatedVideoData,
              courseRef: courseId,
              assets: updatedAssets,
              createdAt: Timestamp.fromMillis(oldVideoData.createdAt),
              videoPath: res,
              storageRef: firestoreFileName,
            };

            const videoRef = doc(database, docCollection, oldVideoData.id);
            await updateDoc(videoRef, videoData);

            dispatch(
              editVideo({
                ...videoData,
                createdAt: videoData.createdAt.toMillis(),
              }),
            );

            toast.success('Video editado com sucesso!');
          } catch (error) {
            toast.error(error.message);
            console.log(error);
          } finally {
            setOpenEditModal(false);
            setLoading(false);
          }
        },
      );
    } else {
      try {
        const updatedAssets = await Promise.all(fileList.map(uploadAssetFile));

        const videoData = {
          ...oldVideoData,
          ...updatedVideoData,
          courseRef: courseId,
          assets: updatedAssets,
          createdAt: Timestamp.fromMillis(oldVideoData.createdAt),
        };

        const videoRef = doc(database, docCollection, oldVideoData.id);
        await updateDoc(videoRef, videoData);

        dispatch(
          editVideo({
            ...videoData,
            createdAt: videoData.createdAt.toMillis(),
          }),
        );

        toast.success('Video editado com sucesso!');
      } catch (error) {
        console.log(error);
        toast.error(error.message);
      } finally {
        setOpenEditModal(false);
        setLoading(false);
      }
    }
  };

  const deleteVideo = async (courseId, videoId, storageRef, fileList) => {
    setLoading(true);
    try {
      const videoRef = doc(database, `courses/${courseId}/videos/`, videoId);
      await deleteDoc(videoRef);

      const fileRef = ref(storage, storageRef);
      await deleteObject(fileRef);

      fileList.forEach(async (file) => {
        if (file.fileStorageRef) {
          const fileRef = ref(storage, file.fileStorageRef);
          await deleteObject(fileRef);
        }
      });

      dispatch(delVideo({ courseId, videoId }));
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return {
    uploadVideo,
    updateVideo,
    deleteVideo,
    loading,
    progress,
  };
};

export default useVideo;
