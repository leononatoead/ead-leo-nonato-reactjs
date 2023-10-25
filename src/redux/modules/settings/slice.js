import { createSlice } from "@reduxjs/toolkit";
import {
  fetchBannerSettings,
  fetchNotificationsSettings,
  fetchRegisterVideoSettings,
  fetchStudantClassesSettings,
  fetchWhatsAppSettings,
} from "./actions";

const settingsReducer = createSlice({
  name: "settings",
  initialState: {},
  reducers: {
    newBanner: (state, action) => {
      const settings = JSON.parse(JSON.stringify(state));

      let updateSettings;

      if (settings) {
        updateSettings = {
          ...settings,
          banners: [...settings.banners, action.payload],
        };
      } else {
        updateSettings = { banners: [action.payload] };
      }
      localStorage.setItem("settings", JSON.stringify(updateSettings));

      return { ...state, banners: updateSettings.banners };
    },
    editBanner: (state, action) => {
      const settings = JSON.parse(JSON.stringify(state));

      const updateBanners = settings.banners.map((banner) => {
        if (banner.id === action.payload.id) {
          return action.payload;
        } else {
          return banner;
        }
      });

      const storageSettings = JSON.stringify({
        ...state,
        banners: updateBanners,
      });
      localStorage.setItem("settings", storageSettings);

      return { ...state, banners: updateBanners };
    },
    delBanner: (state, action) => {
      const settings = JSON.parse(JSON.stringify(state));

      const filterBanners = settings.banners.filter(
        (banner) => banner.id !== action.payload,
      );

      const storageSettings = JSON.stringify({
        ...state,
        banners: filterBanners,
      });
      localStorage.setItem("settings", storageSettings);

      return {
        ...state,
        banners: filterBanners,
      };
    },
    newWhatsAppURL: (state, action) => {
      const settings = JSON.parse(JSON.stringify(state));

      let storageSettings;

      if (settings) {
        storageSettings = JSON.stringify({
          ...settings,
          whatsAppURL: action.payload,
        });
      } else {
        storageSettings = JSON.stringify({ whatsAppURL: action.payload });
      }
      localStorage.setItem("settings", storageSettings);

      return { ...state, whatsAppURL: action.payload };
    },
    fetchSettingsFromLocalStorage: (state, action) => {
      return { ...state, ...action.payload };
    },
    newRegisterVideoURL: (state, action) => {
      const settings = JSON.parse(JSON.stringify(state));

      let storageSettings;

      if (settings) {
        storageSettings = JSON.stringify({
          ...settings,
          registerVideoURL: action.payload,
        });
      } else {
        storageSettings = JSON.stringify({ registerVideoURL: action.payload });
      }
      localStorage.setItem("settings", storageSettings);

      return { ...state, registerVideoURL: action.payload };
    },
    fetchSettingsFromLocalStorage: (state, action) => {
      return { ...state, ...action.payload };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBannerSettings.fulfilled, (state, action) => {
        const settings = JSON.parse(localStorage.getItem("settings"));
        let storageSettings;
        if (settings) {
          storageSettings = JSON.stringify({
            ...settings,
            banners: action.payload,
          });
        } else {
          storageSettings = JSON.stringify({ banners: action.payload });
        }

        localStorage.setItem("settings", storageSettings);

        return { ...state, banners: action.payload };
      })
      .addCase(fetchNotificationsSettings.fulfilled, (state, action) => {
        const settings = JSON.parse(localStorage.getItem("settings"));
        let storageSettings;
        if (settings) {
          storageSettings = JSON.stringify({
            ...settings,
            notifications: action.payload,
          });
        } else {
          storageSettings = JSON.stringify({ notifications: action.payload });
        }

        localStorage.setItem("settings", storageSettings);

        return { ...state, notifications: action.payload };
      })
      .addCase(fetchWhatsAppSettings.fulfilled, (state, action) => {
        const settings = JSON.parse(localStorage.getItem("settings"));
        let storageSettings;
        if (settings) {
          storageSettings = JSON.stringify({
            ...settings,
            whatsAppURL: action.payload,
          });
        } else {
          storageSettings = JSON.stringify({ whatsAppURL: action.payload });
        }

        localStorage.setItem("settings", storageSettings);

        return { ...state, whatsAppURL: action.payload };
      })
      .addCase(fetchRegisterVideoSettings.fulfilled, (state, action) => {
        const settings = JSON.parse(localStorage.getItem("settings"));
        let storageSettings;
        if (settings) {
          storageSettings = JSON.stringify({
            ...settings,
            registerVideoURL: action.payload,
          });
        } else {
          storageSettings = JSON.stringify({
            registerVideoURL: action.payload,
          });
        }

        localStorage.setItem("settings", storageSettings);

        return { ...state, registerVideoURL: action.payload };
      })
      .addCase(fetchStudantClassesSettings.fulfilled, (state, action) => {
        const settings = JSON.parse(localStorage.getItem("settings"));
        let storageSettings;
        if (settings) {
          storageSettings = JSON.stringify({
            ...settings,
            studantClasses: action.payload,
          });
        } else {
          storageSettings = JSON.stringify({ studantClasses: action.payload });
        }

        localStorage.setItem("settings", storageSettings);

        return { ...state, studantClasses: action.payload };
      });
  },
});

export default settingsReducer.reducer;
