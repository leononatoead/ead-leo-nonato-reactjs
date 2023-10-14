import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchBanners,
  fetchBannersFromLocalStorage,
} from '../../../redux/modules/banners/actions';
import { Link } from 'react-router-dom';

import BannerCardAdmin from '../../../components/Admin/BannerCardAdmin';
import { Box } from '@chakra-ui/react';
import { MdAddCircleOutline } from 'react-icons/md';
import useCheckUpdate from '../../../hooks/useCheckUpdate';

export default function HomePanel() {
  const { banners } = useSelector((state) => state.banners);

  const { verifyBannersUpdate } = useCheckUpdate();

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchBannersData = async () => {
      try {
        const firestoreBannersUpdate = await verifyBannersUpdate();
        const lastBannersUpdate =
          new Date(JSON.parse(localStorage.getItem('lastBannersUpdate'))) || 0;

        const calcCourse = firestoreBannersUpdate - lastBannersUpdate;

        if (calcCourse !== 0) {
          dispatch(fetchBanners());
        } else {
          const banners = JSON.parse(localStorage.getItem('banners'));
          dispatch(fetchBannersFromLocalStorage(banners));
        }
      } catch (error) {
        console.error(
          'Erro ao buscar a última atualização dos banners:',
          error,
        );
      }
    };

    fetchBannersData();
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
        {banners
          ?.slice()
          .sort((a, b) => a.order - b.order)
          .map((banner) => (
            <BannerCardAdmin key={banner.id} cardData={banner} />
          ))}
      </ul>
    </Box>
  );
}
