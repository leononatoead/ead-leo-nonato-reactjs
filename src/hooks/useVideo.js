import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { v4 } from 'uuid';

import {
  addVideo,
  delVideo,
  editVideo
} from '../redux/modules/courses/actions';

import { database, storage } from '../firebase/config';
import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject
} from 'firebase/storage';
import {
  Timestamp,
  addDoc,
  collection,
  doc,
  deleteDoc,
  updateDoc
} from '@firebase/firestore';

import { toast } from 'react-hot-toast';

const useVideo = () => {
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const uploadVideo = (
    videoData,
    docCollection,
    videoFile,
    setOpenVideoModal
  ) => {
    setLoading(true);

    if (videoFile === null) {
      toast.error('Envie um arquivo!');
      return;
    }

    // Referencia da Storage, passando a coleção e o nome do arquivo que será inserido
    const firestoreFileName = `${docCollection}/${Date.now()}${v4()}`;
    // Referencia da Storage, passando a coleção e o nome do arquivo que será inserido
    const storageRef = ref(storage, firestoreFileName);
    // Método do FB para Enviar o arquivo, passando a referencia e o arquivo
    const uploadTask = uploadBytesResumable(storageRef, videoFile);
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
        // Upload completo, agora pegamos a URL
        try {
          const res = await getDownloadURL(uploadTask.snapshot.ref);
          const videoDataUpdated = {
            ...videoData,
            videoPath: res,
            storageRef: firestoreFileName,
            createdAt: Timestamp.now()
          };

          const videoRes = await addDoc(
            collection(database, docCollection),
            videoDataUpdated
          );

          dispatch(
            addVideo({
              courseRef: docCollection
                .replace('courses/', '')
                .replace('/videos', ''),
              id: videoRes.id,
              ...videoDataUpdated,
              createdAt: videoDataUpdated.createdAt.toMillis()
            })
          );

          toast.success('Aula adicionada com sucesso!');
        } catch (error) {
          toast.error(error.message);
        } finally {
          setLoading(false);
          setOpenVideoModal(false);
        }
      }
    );
  };

  const editVideoChangingVideoFile = (
    oldVideoData,
    updatedVideoData,
    docCollection,
    videoFile,
    setOpenEditModal
  ) => {
    setLoading(true);

    if (videoFile === null) {
      toast.error('Envie um arquivo!');
      return;
    }

    // Referencia da Storage, passando a coleção e o nome do arquivo que será inserido
    const firestoreFileName = `${docCollection}/${Date.now()}${v4()}`;
    // Referencia da Storage, passando a coleção e o nome do arquivo que será inserido
    const storageRef = ref(storage, firestoreFileName);
    // Método do FB para Enviar o arquivo, passando a referencia e o arquivo
    const uploadTask = uploadBytesResumable(storageRef, videoFile);
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
          const fileRef = ref(storage, oldVideoData.storageRef);
          await deleteObject(fileRef);

          const res = await getDownloadURL(uploadTask.snapshot.ref);
          const videoData = {
            ...oldVideoData,
            ...updatedVideoData,
            createdAt: Timestamp.fromMillis(oldVideoData.createdAt),
            videoPath: res,
            storageRef: firestoreFileName
          };

          const videoRef = doc(database, docCollection, oldVideoData.id);
          await updateDoc(videoRef, videoData);

          dispatch(
            editVideo({
              ...videoData,
              createdAt: videoData.createdAt.toMillis()
            })
          );

          toast.success('Video editado com sucesso!');
        } catch (error) {
          toast.error(error.message);
          console.log(error);
        } finally {
          setLoading(false);
          setOpenEditModal(false);
        }
      }
    );
  };

  const editVideoWithoutChangeVideo = async (
    oldVideoData,
    updatedVideoData,
    docCollection,
    setOpenEditModal
  ) => {
    setLoading(true);
    try {
      const videoData = {
        ...oldVideoData,
        ...updatedVideoData,
        createdAt: Timestamp.fromMillis(oldVideoData.createdAt)
      };

      const videoRef = doc(database, docCollection, oldVideoData.id);
      await updateDoc(videoRef, videoData);

      dispatch(
        editVideo({
          ...videoData,
          createdAt: videoData.createdAt.toMillis()
        })
      );

      toast.success('Video editado com sucesso!');
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    } finally {
      setOpenEditModal(false);
      setLoading(false);
    }
  };

  const deleteVideo = async (courseId, videoId, storageRef) => {
    setLoading(true);
    try {
      const videoRef = doc(database, `courses/${courseId}/videos/`, videoId);
      await deleteDoc(videoRef);

      const fileRef = ref(storage, storageRef);
      await deleteObject(fileRef);

      dispatch(delVideo({ courseId, videoId }));
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return {
    uploadVideo,
    editVideoChangingVideoFile,
    editVideoWithoutChangeVideo,
    deleteVideo,
    loading,
    progress
  };
};

export default useVideo;
