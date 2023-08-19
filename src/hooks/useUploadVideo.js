import { useState } from 'react';
import { v4 } from 'uuid';

import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL
} from 'firebase/storage';
import { database } from '../firebase/config';
import { Timestamp, addDoc, collection } from '@firebase/firestore';
import { toast } from 'react-hot-toast';

const useUploadVideo = () => {
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(false);

  const uploadVideo = (data, docCollection, file, setOpenVideoModal) => {
    setLoading(true);

    if (file === null) {
      toast.error('Envie um arquivo!');
      return;
    }

    // Método do FB para acessar a storage
    const storage = getStorage();
    // Referencia da Storage, passando a coleção e o nome do arquivo que será inserido
    const firestoreFileName = `${docCollection}/${Date.now()}${v4()}`;

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
          const videoData = {
            ...data,
            videoPath: res,
            storageRef: firestoreFileName,
            createdAt: Timestamp.now()
          };

          await addDoc(collection(database, docCollection), videoData);

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

  return { uploadVideo, loading, progress };
};

export default useUploadVideo;
