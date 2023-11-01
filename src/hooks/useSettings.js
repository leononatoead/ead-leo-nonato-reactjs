import { useState } from "react";
import { database } from "../firebase/config";

import { useDispatch } from "react-redux";

import {
  Timestamp,
  addDoc,
  collection,
  deleteDoc,
  doc,
  setDoc,
  updateDoc,
} from "firebase/firestore";

import { useToast } from "@chakra-ui/react";
import {
  delBanner,
  editBanner,
  newBanner,
  newWhatsAppURL,
  newRegisterVideoURL,
  newStudantClass,
  newNotification,
  editNotification,
  delNotification,
} from "../redux/modules/settings/actions";

const useSettings = () => {
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const toast = useToast();

  const addBanner = async (banner) => {
    setLoading(true);

    try {
      const res = await addDoc(
        collection(database, "settings", "data", "banners"),
        banner,
      );

      const data = { id: res.id, ...banner };

      const updateTime = Timestamp.now();
      const updateCollection = doc(database, "updates", "settings");
      setDoc(updateCollection, { lastSettingsUpdate: updateTime });
      const updatedAt = JSON.stringify(new Date(updateTime.toMillis()));
      localStorage.setItem("lastSettingsUpdate", updatedAt);

      dispatch(newBanner(data));

      toast({
        description: "Banner adicionado com sucesso!",
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

  const updateBanner = async (id, banner) => {
    setLoading(true);

    try {
      const settingsRef = doc(database, "settings", "data", "banners", id);
      await updateDoc(settingsRef, banner);

      const data = { id, ...banner };

      const updateTime = Timestamp.now();
      const updateCollection = doc(database, "updates", "settings");
      setDoc(updateCollection, { lastSettingsUpdate: updateTime });
      const updatedAt = JSON.stringify(new Date(updateTime.toMillis()));
      localStorage.setItem("lastSettingsUpdate", updatedAt);

      dispatch(editBanner(data));

      toast({
        description: "Banner atualizado com sucesso!",
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

  const deleteBanner = async (id) => {
    try {
      const settingsRef = doc(database, "settings", "data", "banners", id);
      await deleteDoc(settingsRef);

      dispatch(delBanner(id));

      const updateTime = Timestamp.now();
      const updateCollection = doc(database, "updates", "settings");
      setDoc(updateCollection, { lastSettingsUpdate: updateTime });
      const updatedAt = JSON.stringify(new Date(updateTime.toMillis()));
      localStorage.setItem("lastSettingsUpdate", updatedAt);

      toast({
        description: "Banner removido com sucesso!",
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

  const addNotification = async (notification, notificationList) => {
    setLoading(true);

    try {
      const notificationData = {
        ...notification,
        createdAt: Timestamp.now().toMillis(),
      };

      const res = await addDoc(
        collection(database, "settings", "data", "notifications"),
        notificationData,
      );

      const data = {
        id: res.id,
        ...notification,
        createdAt: notificationData.createdAt,
      };

      const updateTime = Timestamp.now();
      const updateCollection = doc(database, "updates", "settings");
      setDoc(updateCollection, { lastSettingsUpdate: updateTime });
      const updatedAt = JSON.stringify(new Date(updateTime.toMillis()));
      localStorage.setItem("lastSettingsUpdate", updatedAt);

      if (notificationList?.length === 5) {
        const deleteRef = doc(
          database,
          "settings",
          "data",
          "notifications",
          notificationList[4].id,
        );
        await deleteDoc(deleteRef);
      }

      dispatch(newNotification(data));

      toast({
        description: "Notificação adicionada com sucesso!",
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

  const updateNotification = async (id, notification) => {
    setLoading(true);

    try {
      const settingsRef = doc(
        database,
        "settings",
        "data",
        "notifications",
        id,
      );
      await updateDoc(settingsRef, notification);

      const data = { id, ...notification };

      const updateTime = Timestamp.now();
      const updateCollection = doc(database, "updates", "settings");
      setDoc(updateCollection, { lastSettingsUpdate: updateTime });
      const updatedAt = JSON.stringify(new Date(updateTime.toMillis()));
      localStorage.setItem("lastSettingsUpdate", updatedAt);

      dispatch(editNotification(data));

      toast({
        description: "Notificação atualizada com sucesso!",
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

  const deleteNotification = async (id) => {
    try {
      const settingsRef = doc(
        database,
        "settings",
        "data",
        "notifications",
        id,
      );
      await deleteDoc(settingsRef);

      dispatch(delNotification(id));

      const updateTime = Timestamp.now();
      const updateCollection = doc(database, "updates", "settings");
      setDoc(updateCollection, { lastSettingsUpdate: updateTime });
      const updatedAt = JSON.stringify(new Date(updateTime.toMillis()));
      localStorage.setItem("lastSettingsUpdate", updatedAt);

      toast({
        description: "Notificação removida com sucesso!",
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

  const addWhatsAppURL = async (url) => {
    setLoading(true);

    try {
      const whatsAppRef = collection(database, "settings/data/whatsAppURL/");
      const whatsAppDoc = doc(whatsAppRef, "whatsAppURLid");
      await setDoc(whatsAppDoc, { url: url });

      const data = { id: "whatsAppURLid", url: url };

      const updateTime = Timestamp.now();
      const updateCollection = doc(database, "updates", "settings");
      setDoc(updateCollection, { lastSettingsUpdate: updateTime });
      const updatedAt = JSON.stringify(new Date(updateTime.toMillis()));
      localStorage.setItem("lastSettingsUpdate", updatedAt);

      dispatch(newWhatsAppURL(data));

      toast({
        description: "URL do WhatsApp adicionado com sucesso!",
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

  const addRegisterVideoURL = async (data) => {
    setLoading(true);

    try {
      const registerVideoRef = collection(
        database,
        "settings/data/registerVideoURL/",
      );
      const registerVideoDoc = doc(registerVideoRef, "registerVideoURLid");
      await setDoc(registerVideoDoc, { url: data });

      const data = { id: "registerVideoURLid", url: data };

      const updateTime = Timestamp.now();
      const updateCollection = doc(database, "updates", "settings");
      setDoc(updateCollection, { lastSettingsUpdate: updateTime });
      const updatedAt = JSON.stringify(new Date(updateTime.toMillis()));
      localStorage.setItem("lastSettingsUpdate", updatedAt);

      dispatch(newRegisterVideoURL(data));

      toast({
        description: "Video de cadastro adicionado com sucesso!",
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

  const addNewClass = async (title) => {
    setLoading(true);

    try {
      const studantClassRef = collection(
        database,
        "settings/data/studantClasses",
      );
      const studantClassData = {
        title,
        createdAt: Timestamp.now(),
      };

      const res = await addDoc(studantClassRef, studantClassData);

      const data = {
        id: res.id,
        title,
        createdAt: studantClassData.createdAt.toMillis(),
      };

      const updateTime = Timestamp.now();
      const updateCollection = doc(database, "updates", "settings");
      setDoc(updateCollection, { lastSettingsUpdate: updateTime });
      const updatedAt = JSON.stringify(new Date(updateTime.toMillis()));
      localStorage.setItem("lastSettingsUpdate", updatedAt);

      dispatch(newStudantClass(data));

      toast({
        description: "Turma adicionada com sucesso!",
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

  return {
    addBanner,
    updateBanner,
    deleteBanner,
    addWhatsAppURL,
    addRegisterVideoURL,
    addNewClass,
    addNotification,
    updateNotification,
    deleteNotification,
    loading,
  };
};

export default useSettings;
