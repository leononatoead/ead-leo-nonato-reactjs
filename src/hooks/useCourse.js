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

  const addNewCourse = (data, docCollection, file, setOpenCourseModal) => {
    setLoading(true);

    if (file === null) {
      toast.error('Envie um arquivo!');
      return;
    }

    // Método do FB para acessar a storage
    const storage = getStorage();
    // Referencia da Storage, passando a coleção e o nome do arquivo que será inserido
    const firestoreFileName = `${docCollection}/images/${Date.now()}${v4()}`;

    // Referencia da Storage, passando a coleção e o nome do arquivo que será inserido
    const storageRef = ref(storage, firestoreFileName);
    // Método do FB para Enviar o arquivo, passando a referencia e o arquivo
    const uploadTask = uploadBytesResumable(storageRef, file);

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
          const res = await getDownloadURL(uploadTask.snapshot.ref);
          const courseData = {
            ...data,
            imagePath: res,
            storageRef: firestoreFileName,
            createdAt: Timestamp.now()
          };

          const courseRes = await addDoc(
            collection(database, docCollection),
            courseData
          );

          dispatch(
            addCourse({
              id: courseRes.id,
              ...courseData,
              createdAt: courseData.createdAt.toMillis()
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
    course,
    newData,
    docCollection,
    file,
    setOpenEditModal
  ) => {
    setLoading(true);

    if (file === null) {
      toast.error('Envie um arquivo!');
      return;
    }

    // Método do FB para acessar a storage
    const storage = getStorage();
    // Referencia da Storage, passando a coleção e o nome do arquivo que será inserido
    const firestoreFileName = `${docCollection}/images/${Date.now()}${v4()}`;

    // Referencia da Storage, passando a coleção e o nome do arquivo que será inserido
    const storageRef = ref(storage, firestoreFileName);
    // Método do FB para Enviar o arquivo, passando a referencia e o arquivo
    const uploadTask = uploadBytesResumable(storageRef, file);

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
          const fileRef = ref(storage, course.storageRef);
          await deleteObject(fileRef);

          const res = await getDownloadURL(uploadTask.snapshot.ref);
          const courseData = {
            ...course,
            ...newData,
            createdAt: Timestamp.fromMillis(course.createdAt),
            imagePath: res,
            storageRef: firestoreFileName
          };

          const courseRef = doc(database, 'courses', course.id);
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
    course,
    courseData,
    setOpenEditModal
  ) => {
    setLoading(true);
    try {
      const courseRef = doc(database, 'courses', course.id);
      await updateDoc(courseRef, courseData);

      dispatch(
        editCourse({
          ...course,
          ...courseData
        })
      );
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

      if (courseData.videos?.length > 0) {
        const courseStorage = ref(storage, `courses/${courseData.id}/videos`);
        const list = await listAll(courseStorage);

        const deletePromises = list.items.map(async (item) => {
          await deleteObject(item);
        });

        await Promise.all(deletePromises);
      }

      dispatch(delCourse(courseData.id));
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
