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
} from "../redux/modules/settings/actions";

const useBanner = () => {
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

  return { addBanner, updateBanner, deleteBanner, loading };
};

export default useBanner;
