import { useState } from 'react';
import { v4 } from 'uuid';

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
  deleteDoc,
  doc,
  getDocs,
  setDoc,
  updateDoc,
} from 'firebase/firestore';
import { database, storage } from '../firebase/config';

import { useToast } from '@chakra-ui/react';
import { useDispatch } from 'react-redux';
import {
  addCourse,
  delCourse,
  editCourse,
} from '../redux/modules/courses/actions';

const useCourse = () => {
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const toast = useToast();

  const addNewCourse = (courseData, docCollection, imageFile) => {
    setLoading(true);

    if (imageFile === null) {
      toast({
        description: 'Envie uma imagem!',
        status: 'error',
        duration: '3000',
        isClosable: true,
      });
      return;
    }

    // Nome do arquivo + path
    const firestoreFileName = `${docCollection}/images/${Date.now()}${v4()}`;
    // Referencia da Storage, passando a coleção e o nome do arquivo que será inserido
    const storageRef = ref(storage, firestoreFileName);
    // Método do FB para Enviar o arquivo, passando a referencia e o arquivo
    const uploadTask = uploadBytesResumable(storageRef, imageFile);
    // Observa mudanças no estado, erros e a finalização do upload
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        // Pega o progresso do upload, incluindo o numero de bytes enviados e o total enviado
        const progressStatus =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        // Atualiza o progresso do upload
        setProgress(progressStatus);
        switch (snapshot.state) {
          case 'paused':
            toast({
              description: 'Envio pausado!',
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
        // Upload completo, agora pegamos a URL
        try {
          const res = await getDownloadURL(uploadTask.snapshot.ref);
          const courseDataUpdated = {
            ...courseData,
            imagePath: res,
            storageRef: firestoreFileName,
            createdAt: Timestamp.now(),
          };

          const updateTime = Timestamp.now();
          const updateCollection = doc(database, 'updates', 'courses');
          setDoc(updateCollection, { lastCoursesUpdate: updateTime });
          const updatedAt = JSON.stringify(updateTime);
          localStorage.setItem('lastCoursesUpdate', updatedAt);

          const courseRes = await addDoc(
            collection(database, docCollection),
            courseDataUpdated,
          );

          dispatch(
            addCourse({
              id: courseRes.id,
              ...courseDataUpdated,
              createdAt: courseDataUpdated.createdAt.toMillis(),
            }),
          );

          toast({
            description: 'Curso adicionado com sucesso',
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
        } finally {
          setLoading(false);
        }
      },
    );
  };

  const editCourseWithImage = (
    oldCourseData,
    updatedCourseData,
    docCollection,
    imageFile,
  ) => {
    setLoading(true);

    if (imageFile === null) {
      toast({
        description: 'Envie uma imagem!',
        status: 'error',
        duration: '3000',
        isClosable: true,
      });
      return;
    }

    // Referencia da Storage, passando a coleção e o nome do arquivo que será inserido
    const firestoreFileName = `${docCollection}/images/${Date.now()}${v4()}`;
    // Referencia da Storage, passando a coleção e o nome do arquivo que será inserido
    const storageRef = ref(storage, firestoreFileName);
    // Método do FB para Enviar o arquivo, passando a referencia e o arquivo
    const uploadTask = uploadBytesResumable(storageRef, imageFile);
    // Observa mudanças no estado, erros e a finalização do upload
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        // Pega o progresso do upload, incluindo o numero de bytes enviados e o total enviado
        const progressStatus =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(progressStatus);
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
        // Upload completo, agora pegamos a URL
        try {
          // Remove a imagem antiga do storage
          const fileRef = ref(storage, oldCourseData.storageRef);
          await deleteObject(fileRef);

          const res = await getDownloadURL(uploadTask.snapshot.ref);
          const courseData = {
            ...oldCourseData,
            ...updatedCourseData,
            createdAt: Timestamp.fromMillis(oldCourseData.createdAt),
            imagePath: res,
            storageRef: firestoreFileName,
          };

          const updateTime = Timestamp.now();
          const updateCollection = doc(database, 'updates', 'courses');
          setDoc(updateCollection, { lastCoursesUpdate: updateTime });
          const updatedAt = JSON.stringify(updateTime);
          localStorage.setItem('lastCoursesUpdate', updatedAt);

          const courseRef = doc(database, 'courses', oldCourseData.id);
          await updateDoc(courseRef, courseData);

          dispatch(
            editCourse({
              ...courseData,
              createdAt: courseData.createdAt.toMillis(),
            }),
          );

          toast({
            description: 'Curso alterado com sucesso!',
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
        } finally {
          setLoading(false);
        }
      },
    );
  };

  const editCourseWithoutImage = async (oldCourseData, updatedCourseData) => {
    setLoading(true);
    try {
      const updateTime = Timestamp.now();
      const updateCollection = doc(database, 'updates', 'courses');
      setDoc(updateCollection, { lastCoursesUpdate: updateTime });
      const updatedAt = JSON.stringify(updateTime);
      localStorage.setItem('lastCoursesUpdate', updatedAt);

      const courseRef = doc(database, 'courses', oldCourseData.id);
      await updateDoc(courseRef, updatedCourseData);

      dispatch(
        editCourse({
          ...oldCourseData,
          ...updatedCourseData,
        }),
      );

      toast({
        description: 'Curso alterado com sucesso!',
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
    } finally {
      setLoading(false);
    }
  };

  const deleteCourse = async (courseData) => {
    setLoading(true);
    try {
      const courseRef = doc(database, `courses/`, courseData.id);
      await deleteDoc(courseRef);

      const fileRef = ref(storage, courseData.storageRef);
      await deleteObject(fileRef);

      courseData.videos?.forEach(async (video) => {
        const fileRef = ref(storage, video.storageRef);
        await deleteObject(fileRef);

        if (video.assets) {
          video.assets.forEach(async (asset) => {
            if (asset.fileStorageRef) {
              const fileRef = ref(storage, asset.fileStorageRef);
              await deleteObject(fileRef);
            }
          });
        }
      });

      // Deleta a subcollection de videos
      const videosSubcollection = collection(
        database,
        `courses/${courseData.id}/videos`,
      );
      const videosQuery = await getDocs(videosSubcollection);

      const deleteVideoSubcollectionPromises = videosQuery.docs.map(
        async (videoDoc) => {
          // Delete documents within lesson subcollection
          const videoDocRef = doc(
            database,
            `courses/${courseData.id}/videos`,
            videoDoc.id,
          );
          await deleteDoc(videoDocRef);
        },
      );

      await Promise.all(deleteVideoSubcollectionPromises);

      const updateTime = Timestamp.now();
      const updateCollection = doc(database, 'updates', 'courses');
      setDoc(updateCollection, { lastCoursesUpdate: updateTime });
      const updatedAt = JSON.stringify(updateTime);
      localStorage.setItem('lastCoursesUpdate', updatedAt);

      dispatch(delCourse(courseData.id));

      toast({
        description: 'Curso removido com sucesso.',
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
    } finally {
      setLoading(false);
    }
  };

  return {
    addNewCourse,
    editCourseWithImage,
    editCourseWithoutImage,
    deleteCourse,
    loading,
    progress,
  };
};

export default useCourse;
