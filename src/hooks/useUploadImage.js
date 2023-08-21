import { useState } from 'react';
import { v4 } from 'uuid';

import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL
} from 'firebase/storage';
import { Timestamp, addDoc, collection } from 'firebase/firestore';
import { database } from '../firebase/config';

import { toast } from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { addCourse } from '../redux/modules/courses/actions';

const useUploadImage = () => {
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const uploadImage = (data, docCollection, file, setOpenCourseModal) => {
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
          const imageData = {
            ...data,
            imagePath: res,
            storageRef: firestoreFileName,
            createdAt: Timestamp.now()
          };

          const courseData = await addDoc(
            collection(database, docCollection),
            imageData
          );

          dispatch(
            addCourse({
              id: courseData.id,
              ...imageData,
              createdAt: imageData.createdAt.toMillis()
            })
          );

          setOpenCourseModal(false);
          toast.success('Curso criado com sucesso!');
        } catch (error) {
          toast.error(error.message);
        }
      }
    );

    setLoading(false);
  };

  return { uploadImage, loading, progress };
};

export default useUploadImage;
