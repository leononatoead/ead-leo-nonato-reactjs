import { useState } from "react";
import { database } from "../firebase/config";

import { useDispatch } from "react-redux";

import {
  Timestamp,
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore";

import { useToast } from "@chakra-ui/react";
import { delForm, editForm, newForm } from "../redux/modules/forms/actions";

const useForms = () => {
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const toast = useToast();

  const addForm = async (form) => {
    setLoading(true);

    try {
      const formData = { ...form, createdAt: Timestamp.now() };

      const res = await addDoc(collection(database, "forms"), formData);

      const data = {
        id: res.id,
        ...form,
        createdAt: Timestamp.now().toMillis(),
      };

      dispatch(newForm(data));

      toast({
        description: "Formulário adicionado com sucesso!",
        status: "success",
        duration: "3000",
        isClosable: true,
      });
    } catch (error) {
      toast({
        description: error.message,
        status: "error",
        duration: "3000",
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  const updateForm = async (id, form) => {
    setLoading(true);

    try {
      const formRef = doc(database, "forms", id);
      await updateDoc(formRef, form);

      const data = { id, ...form };

      dispatch(editForm(data));

      toast({
        description: "Formulário atualizado com sucesso!",
        status: "success",
        duration: "3000",
        isClosable: true,
      });
    } catch (error) {
      console.log(error);
      toast({
        description: error.message,
        status: "error",
        duration: "3000",
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  const deleteForm = async (id) => {
    setLoading(true);
    try {
      const formRef = doc(database, `forms`, id);
      await deleteDoc(formRef);

      dispatch(delForm(id));

      toast({
        description: "Formulário removido com sucesso!",
        status: "success",
        duration: "3000",
        isClosable: true,
      });
    } catch (error) {
      toast({
        description: error.message,
        status: "error",
        duration: "3000",
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  const submitForm = async (form, courseId) => {
    setLoading(true);

    try {
      const formData = { ...form, createdAt: Timestamp.now() };

      await addDoc(
        collection(database, "formAnswers/courses", courseId),
        formData,
      );

      toast({
        description: "Resposta enviada com sucesso!",
        status: "success",
        duration: "3000",
        isClosable: true,
      });
    } catch (error) {
      toast({
        description: error.message,
        status: "error",
        duration: "3000",
        isClosable: true,
      });
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return { addForm, updateForm, deleteForm, submitForm, loading };
};

export default useForms;
