import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchBanners,
  fetchBANNERSFromLocalStorage,
} from '../../../redux/modules/banners/actions';
import { Link } from 'react-router-dom';

import BannerCardAdmin from '../../../components/Admin/BannerCardAdmin';
import { Box } from '@chakra-ui/react';
import { MdAddCircleOutline } from 'react-icons/md';

export default function HomePanel() {
  const { banners } = useSelector((state) => state.banners);

  const dispatch = useDispatch();

  useEffect(() => {
    const lastBannersUpdate = new Date(
      JSON.parse(localStorage.getItem('lastBannersUpdate')),
    );
    const actualBannerTime = new Date();
    const verifyBannerUpdate = Math.abs(actualBannerTime - lastBannersUpdate);
    const bannersMinutesDifference = Math.floor(verifyBannerUpdate / 60000);

    if (bannersMinutesDifference > 60) {
      dispatch(fetchBanners());
    } else {
      const courses = JSON.parse(localStorage.getItem('banners'));
      dispatch(fetchBANNERSFromLocalStorage(courses));
    }
  }, []);

  return (
    <Box className='main-container bg-gray-200'>
      <Box className='w-full flex justify-end'>
        <Link to='/dashboard/home/banners/new' className='add-btn'>
          <MdAddCircleOutline size={20} />
          <span className='font-bold'>Novo banner</span>
        </Link>
      </Box>

      <ul className='flex flex-col gap-4 py-6 '>
        {banners?.map((banner) => (
          <BannerCardAdmin key={banner.id} cardData={banner} />
        ))}
      </ul>
    </Box>
  );
}
