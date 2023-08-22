import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { v4 } from 'uuid';

import { addVideo, delVideo } from '../redux/modules/courses/actions';

import { database, storage } from '../firebase/config';
import {
  getStorage,
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
  deleteDoc
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

          setOpenVideoModal(false);
          toast.success('Aula adicionada com sucesso!');
        } catch (error) {
          toast.error(error.message);
        } finally {
          setLoading(false);
        }
      }
    );
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

  return { uploadVideo, deleteVideo, loading, progress };
};

export default useVideo;
