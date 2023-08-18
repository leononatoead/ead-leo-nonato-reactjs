import { useState } from 'react';
import { v4 } from 'uuid';

import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL
} from 'firebase/storage';

const useVideo = () => {
  const [videoName, setVideoName] = useState('');
  const [videoPath, setVideoPath] = useState('');
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const uploadVideo = (collection, file) => {
    setLoading(true);

    if (file === null) {
      setError('Envie um arquivo!');
      return;
    }

    // Método do FB para acessar a storage
    const storage = getStorage();
    // Referencia da Storage, passando a coleção e o nome do arquivo que será inserido
    const firestoreFileName = `${collection}/${Date.now()}${v4()}`;

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
        setProgress(`Progresso: ${progressStatus} % completo`);
        switch (snapshot.state) {
          case 'paused':
            setMessage('Envio pausado');
            break;

          default:
            setMessage('Enviando ...');
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
        setVideoPath(res);
        setVideoName(generateName);
      }
    );

    setLoading(false);
  };

  return { uploadVideo, loading, error, progress };
};

export default useVideo;
