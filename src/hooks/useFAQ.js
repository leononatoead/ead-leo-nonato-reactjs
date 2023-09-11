import { useState } from 'react';
import { database } from '../firebase/config';

import { useDispatch } from 'react-redux';

import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  updateDoc,
} from 'firebase/firestore';

import { useToast } from '@chakra-ui/react';
import {
  delQuestion,
  editQuestion,
  newQuestion,
} from '../redux/modules/faq/actions';

const useFAQ = () => {
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const toast = useToast();

  const addQuestion = async (question) => {
    setLoading(true);

    try {
      const res = await addDoc(collection(database, 'faq'), question);

      const data = { id: res.id, ...question };

      dispatch(newQuestion(data));

      toast({
        description: 'Pergunta adicionada com sucesso!',
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

  const updateQuestion = async (id, question) => {
    setLoading(true);

    try {
      const questionRef = doc(database, 'faq', id);
      await updateDoc(questionRef, question);

      const data = { id, ...question };

      dispatch(editQuestion(data));

      toast({
        description: 'Pergunta atualizada com sucesso!',
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

  const deleteQuestion = async (id) => {
    try {
      const questionRef = doc(database, `faq/`, id);
      await deleteDoc(questionRef);

      dispatch(delQuestion(id));

      toast({
        description: 'Pergunta removida com sucesso!',
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

  return { addQuestion, updateQuestion, deleteQuestion, loading };
};

export default useFAQ;
