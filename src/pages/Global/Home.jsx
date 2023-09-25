import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchBANNERSFromLocalStorage,
  fetchBanners,
} from '../../redux/modules/banners/actions';
import { Link } from 'react-router-dom';

import Navbar from '../../components/Global/Navbar';
import LoginModal from '../../components/Auth/LoginModal';
import VideoCard from '../../components/Global/Home/VideoCard';
import SearchBar from '../../components/Global/SearchBar';
import Banner from '../../components/Global/Home/Banner';
import Footer from '../../components/Global/Footer';
import PostCard from '../../components/Global/Home/PostCard';
import { Box, Heading } from '@chakra-ui/react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

export default function Home() {
  const [openLoginModal, setOpenLoginModal] = useState(false);

  const courses = useSelector((state) => state.courses.courses);
  const { pages } = useSelector((state) => state.posts);
  const { user } = useSelector((state) => state.auth);
  const { banners } = useSelector((state) => state.banners);

  const freeCourses = courses?.filter((course) => !course.isPremium);
  const paidCourses = courses?.filter((course) => course.isPremium);

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
    <main className='h-screen overflow-y-auto bg-[#f0f0f0]'>
      <Navbar title={'Início'} />

      <SearchBar type='course' />

      <Swiper
        spaceBetween={16}
        slidesPerView={1.1}
        className='ml-4 !h-[206px] mt-6'
      >
        {banners?.map((banner) => (
          <SwiperSlide className='w-[95%]' key={banner.id}>
            <Banner data={banner} />
          </SwiperSlide>
        ))}
      </Swiper>

      <section>
        <Box className='px-4'>
          <Box className='flex justify-between items-center pt-4 pb-5'>
            <Heading className='!font-poppins !text-large !leading-6 !font-semibold  !text-primary-600 '>
              Cursos Gratuitos
            </Heading>

            <Link
              to='/courses/free'
              className='font-poppins text-small leading-[18px] text-primary-400/80'
            >
              Ver todos
            </Link>
          </Box>

          {freeCourses && (
            <Swiper
              spaceBetween={16}
              slidesPerView={1.5}
              className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6'
            >
              {freeCourses.map((course) => (
                <SwiperSlide key={course.id} className='!w-40'>
                  <VideoCard
                    courseData={course}
                    setOpenLoginModal={setOpenLoginModal}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          )}
        </Box>

        <Box className='px-4'>
          <Box className='flex justify-between items-center pt-4 pb-5'>
            <Heading className='!font-poppins !text-large !leading-6 !font-semibold  !text-primary-600 '>
              Cursos Premium
            </Heading>

            <Link
              to='/courses/premium'
              className='font-poppins text-small leading-[18px] text-primary-400/80'
            >
              Ver todos
            </Link>
          </Box>

          {paidCourses && (
            <Swiper
              spaceBetween={16}
              slidesPerView={1.5}
              className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6'
            >
              {paidCourses.map((course) => (
                <SwiperSlide key={course.id} className='!w-40'>
                  <VideoCard
                    courseData={course}
                    setOpenLoginModal={setOpenLoginModal}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          )}
        </Box>

        <Box className='flex justify-between items-center pt-4 pb-5 px-4'>
          <Heading className='!font-poppins !text-large !leading-6 !font-semibold  !text-primary-600 '>
            Newsletter
          </Heading>

          <Link
            to='/newsletter'
            className='font-poppins text-small leading-[18px] text-primary-400/80'
          >
            Ver todos
          </Link>
        </Box>

        {pages && (
          <Swiper spaceBetween={1} slidesPerView={1.1} className='pl-4 pb-4'>
            {pages[0]?.posts?.map((post, index) => {
              if (index <= 5) {
                return (
                  <SwiperSlide key={post.id} className='!min-w-[170px]'>
                    <PostCard post={post} />
                  </SwiperSlide>
                );
              }
            })}
          </Swiper>
        )}
        {pages && (
          <Swiper spaceBetween={1} slidesPerView={1.1} className='pl-4'>
            {pages[0]?.posts.map((post, index) => {
              if (index > 5) {
                return (
                  <SwiperSlide key={post.id} className='!min-w-[170px]'>
                    <PostCard post={post} />
                  </SwiperSlide>
                );
              }
            })}
          </Swiper>
        )}
      </section>
      <Footer />
      <LoginModal
        openLoginModal={openLoginModal}
        setOpenLoginModal={setOpenLoginModal}
      />
    </main>
  );
}
