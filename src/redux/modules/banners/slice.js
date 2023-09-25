import { createSlice } from '@reduxjs/toolkit';
import { fetchBanners } from './actions';

const bannersReducer = createSlice({
  name: 'banners',
  initialState: {},
  reducers: {
    newBanner: (state, action) => {
      const banners = JSON.parse(JSON.stringify([...state.banners]));

      if (banners) {
        const storageBanners = JSON.stringify([...banners, action.payload]);
        localStorage.setItem('banners', storageBanners);
      } else {
        const storageBanners = JSON.stringify([action.payload]);
        localStorage.setItem('banners', storageBanners);
      }

      const updatedAt = JSON.stringify(new Date());
      localStorage.setItem('lastBannersUpdate', updatedAt);

      return { ...state, banners: [...banners, action.payload] };
    },
    editBanner: (state, action) => {
      const banners = JSON.parse(JSON.stringify([...state.banners]));

      const updateBanners = banners.map((banner) => {
        if (banner.id === action.payload.id) {
          return action.payload;
        } else {
          return banner;
        }
      });

      const storageBanners = JSON.stringify([...updateBanners]);
      localStorage.setItem('banners', storageBanners);

      const updatedAt = JSON.stringify(new Date());
      localStorage.setItem('lastBannersUpdate', updatedAt);

      return { ...state, banners: updateBanners };
    },
    delBanner: (state, action) => {
      const banners = JSON.parse(JSON.stringify([...state.banners]));
      const filterBanners = banners.filter(
        (banner) => banner.id !== action.payload,
      );

      const storageBanners = JSON.stringify([...filterBanners]);
      localStorage.setItem('banners', storageBanners);

      const updatedAt = JSON.stringify(new Date());
      localStorage.setItem('lastBannersUpdate', updatedAt);

      return {
        ...state,
        banners: filterBanners,
      };
    },
    fetchBANNERSFromLocalStorage: (state, action) => {
      return { ...state, banners: action.payload };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchBanners.fulfilled, (state, action) => {
      const storageBanners = JSON.stringify([...action.payload]);
      localStorage.setItem('banners', storageBanners);

      const updatedAt = JSON.stringify(new Date());
      localStorage.setItem('lastBannersUpdate', updatedAt);

      return { ...state, banners: action.payload };
    });
  },
});

export default bannersReducer.reducer;
