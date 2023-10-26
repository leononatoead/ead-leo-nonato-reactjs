import { createAsyncThunk } from "@reduxjs/toolkit";
import { database } from "../../../firebase/config";
import {
  collection,
  doc,
  getDoc,
  limit,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";

export const fetchBannerSettings = createAsyncThunk(
  "settings/fetchBannerSettings",
  async () => {
    const bannersRef = collection(database, "settings", "data", "banners");

    try {
      const q = query(bannersRef, orderBy("order", "asc"));

      const settingsUpdate = doc(database, "updates", "settings");
      const document = await getDoc(settingsUpdate);

      return new Promise((resolve, reject) => {
        onSnapshot(
          q,
          (querySnapshot) => {
            const data = querySnapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            }));
            resolve(data);

            localStorage.setItem(
              "lastSettingsUpdate",
              JSON.stringify(
                new Date(document.data()?.lastSettingsUpdate?.toMillis()),
              ),
            );
          },
          (error) => {
            reject(error);
          },
        );
      });
    } catch (error) {
      console.log(error.message);
    }
  },
);

export const fetchNotificationsSettings = createAsyncThunk(
  "settings/fetchNotificationsSettings",
  async () => {
    const notificationsRef = collection(
      database,
      "settings",
      "data",
      "notifications",
    );

    try {
      const q = query(notificationsRef, orderBy("order", "asc"));

      const settingsUpdate = doc(database, "updates", "settings");
      const document = await getDoc(settingsUpdate);

      return new Promise((resolve, reject) => {
        onSnapshot(
          q,
          (querySnapshot) => {
            const data = querySnapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            }));
            resolve(data);

            console.log(data);

            localStorage.setItem(
              "lastSettingsUpdate",
              JSON.stringify(
                new Date(document.data()?.lastSettingsUpdate?.toMillis()),
              ),
            );
          },
          (error) => {
            reject(error);
          },
        );
      });
    } catch (error) {
      console.log(error.message);
    }
  },
);

export const fetchWhatsAppSettings = createAsyncThunk(
  "settings/fetchWhatsAppSettings",
  async () => {
    const whatsAppRef = collection(database, "settings", "data", "whatsAppURL");

    try {
      const q = query(whatsAppRef);

      const settingsUpdate = doc(database, "updates", "settings");
      const document = await getDoc(settingsUpdate);

      return new Promise((resolve, reject) => {
        onSnapshot(
          q,
          (querySnapshot) => {
            const data = querySnapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            }));
            resolve(data[0]);

            localStorage.setItem(
              "lastSettingsUpdate",
              JSON.stringify(
                new Date(document.data()?.lastSettingsUpdate?.toMillis()),
              ),
            );
          },
          (error) => {
            reject(error);
          },
        );
      });
    } catch (error) {
      console.log(error.message);
    }
  },
);

export const fetchRegisterVideoSettings = createAsyncThunk(
  "settings/fetchRegisterVideoSettings",
  async () => {
    const registerVideoRef = collection(
      database,
      "settings",
      "data",
      "registerVideoURL",
    );

    try {
      const q = query(registerVideoRef);

      const settingsUpdate = doc(database, "updates", "settings");
      const document = await getDoc(settingsUpdate);

      return new Promise((resolve, reject) => {
        onSnapshot(
          q,
          (querySnapshot) => {
            const data = querySnapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            }));
            resolve(data[0]);

            localStorage.setItem(
              "lastSettingsUpdate",
              JSON.stringify(
                new Date(document.data()?.lastSettingsUpdate?.toMillis()),
              ),
            );
          },
          (error) => {
            reject(error);
          },
        );
      });
    } catch (error) {
      console.log(error.message);
    }
  },
);

export const fetchStudantClassesSettings = createAsyncThunk(
  "settings/fetchStudantClassesSettings",
  async () => {
    const StudantClasses = collection(
      database,
      "settings",
      "data",
      "studantClasses",
    );

    try {
      const q = query(StudantClasses, orderBy("createdAt", "desc"), limit(5));

      const settingsUpdate = doc(database, "updates", "settings");
      const document = await getDoc(settingsUpdate);

      return new Promise((resolve, reject) => {
        onSnapshot(
          q,
          (querySnapshot) => {
            const data = querySnapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
              createdAt: doc.data().createdAt.toMillis(),
            }));
            resolve(data);

            localStorage.setItem(
              "lastSettingsUpdate",
              JSON.stringify(
                new Date(document.data()?.lastSettingsUpdate?.toMillis()),
              ),
            );
          },
          (error) => {
            reject(error);
          },
        );
      });
    } catch (error) {
      console.log(error.message);
    }
  },
);

export const newBanner = (data) => async (dispatch) => {
  dispatch({
    type: "settings/newBanner",
    payload: data,
  });
};

export const editBanner = (data) => async (dispatch) => {
  dispatch({
    type: "settings/editBanner",
    payload: data,
  });
};

export const delBanner = (data) => async (dispatch) => {
  dispatch({
    type: "settings/delBanner",
    payload: data,
  });
};

export const newWhatsAppURL = (data) => async (dispatch) => {
  dispatch({
    type: "settings/newWhatsAppURL",
    payload: data,
  });
};

export const newRegisterVideoURL = (data) => async (dispatch) => {
  dispatch({
    type: "settings/newRegisterVideoURL",
    payload: data,
  });
};

export const newStudantClass = (data) => async (dispatch) => {
  dispatch({
    type: "settings/newStudantClass",
    payload: data,
  });
};

export const fetchSettingsFromLocalStorage = (data) => async (dispatch) => {
  dispatch({
    type: "settings/fetchSettingsFromLocalStorage",
    payload: data,
  });
};
