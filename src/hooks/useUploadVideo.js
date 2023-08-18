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

const useUploadVideo = () => {
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const uploadVideo = (data, docCollection, file) => {
    setLoading(true);

    if (file === null) {
      setError('Envie um arquivo!');
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
        setProgress(`Progresso: ${progressStatus.toFixed(0)}%`);
        switch (snapshot.state) {
          case 'paused':
            // setMessage('Envio pausado');
            break;

          default:
            // setMessage('Enviando ...');
            break;
        }
      },
      (e) => {
        switch (e.code) {
          case 'storage/unauthorized':
            setError('O usuário não tem autorização para acessar o objeto.');
            break;
          case 'storage/canceled':
            setError('O usuário cancelou o upload');
            break;
          default:
            setError('Ocorreu um erro, tente novamente.');
            break;
        }
      },
      async () => {
        // Upload completo, agora pegamos a URL
        const res = await getDownloadURL(uploadTask.snapshot.ref);

        console.log(firestoreFileName);
        console.log(res);
        const videoData = {
          ...data,
          videoPath: res,
          storageRef: firestoreFileName,
          createdAt: Timestamp.now()
        };

        await addDoc(collection(database, docCollection), videoData);
      }
    );

    setLoading(false);
  };

  return { uploadVideo, loading, error, progress };
};

export default useUploadVideo;
