import { useState } from 'react';
import { v4 } from 'uuid';

import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
  listAll
} from 'firebase/storage';
import {
  Timestamp,
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  updateDoc
} from 'firebase/firestore';
import { database, storage } from '../firebase/config';

import { toast } from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import {
  addCourse,
  delCourse,
  editCourse
} from '../redux/modules/courses/actions';

const useCourse = () => {
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const addNewCourse = (
    courseData,
    docCollection,
    imageFile,
    setOpenCourseModal
  ) => {
    setLoading(true);

    if (imageFile === null) {
      toast.error('Envie uma imagem!');
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
            toast.promise('Envio pausado');
            break;
          default:
            // toast.loading('Enviando ...');
            break;
        }
      },
      (error) => {
        switch (error.code) {
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
        // Upload completo, agora pegamos a URL
        try {
          const res = await getDownloadURL(uploadTask.snapshot.ref);
          const courseDataUpdated = {
            ...courseData,
            imagePath: res,
            storageRef: firestoreFileName,
            createdAt: Timestamp.now()
          };

          const courseRes = await addDoc(
            collection(database, docCollection),
            courseDataUpdated
          );

          dispatch(
            addCourse({
              id: courseRes.id,
              ...courseDataUpdated,
              createdAt: courseDataUpdated.createdAt.toMillis()
            })
          );

          toast.success('Curso criado com sucesso!');
        } catch (error) {
          toast.error(error.message);
          console.log(error);
        } finally {
          setOpenCourseModal(false);
          setLoading(false);
        }
      }
    );
  };

  const editCourseWithImage = (
    oldCourseData,
    updatedCourseData,
    docCollection,
    imageFile,
    setOpenEditModal
  ) => {
    setLoading(true);

    if (imageFile === null) {
      toast.error('Envie um arquivo!');
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
            toast.promise('Envio pausado');
            break;
          default:
            // toast.loading('Enviando ...');
            break;
        }
      },
      (error) => {
        switch (error.code) {
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
            storageRef: firestoreFileName
          };

          const courseRef = doc(database, 'courses', oldCourseData.id);
          await updateDoc(courseRef, courseData);

          dispatch(
            editCourse({
              ...courseData,
              createdAt: courseData.createdAt.toMillis()
            })
          );

          toast.success('Curso editado com sucesso!');
        } catch (error) {
          toast.error(error.message);
          console.log(error);
        } finally {
          setOpenEditModal(false);
          setLoading(false);
        }
      }
    );
  };

  const editCourseWithoutImage = async (
    oldCourseData,
    updatedCourseData,
    setOpenEditModal
  ) => {
    setLoading(true);
    try {
      const courseRef = doc(database, 'courses', oldCourseData.id);
      await updateDoc(courseRef, updatedCourseData);

      dispatch(
        editCourse({
          ...oldCourseData,
          ...updatedCourseData
        })
      );

      toast.success('Curso editado com sucesso!');
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    } finally {
      setOpenEditModal(false);
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

      // Deleta os videos do storage
      if (courseData.videos?.length > 0) {
        const courseStorage = ref(storage, `courses/${courseData.id}/videos`);
        const list = await listAll(courseStorage);

        const deletePromises = list.items.map(async (item) => {
          await deleteObject(item);
        });

        await Promise.all(deletePromises);
      }

      // Deleta a subcollection de videos
      const videosSubcollection = collection(
        database,
        `courses/${courseData.id}/videos`
      );
      const videosQuery = await getDocs(videosSubcollection);

      const deleteVideoSubcollectionPromises = videosQuery.docs.map(
        async (videoDoc) => {
          // Delete documents within lesson subcollection
          const videoDocRef = doc(
            database,
            `courses/${courseData.id}/videos`,
            videoDoc.id
          );
          await deleteDoc(videoDocRef);
        }
      );

      await Promise.all(deleteVideoSubcollectionPromises);

      dispatch(delCourse(courseData.id));
      toast.success('Curso removido com sucesso.');
    } catch (error) {
      console.log(error);
      toast.error(error.message);
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
    progress
  };
};

export default useCourse;
