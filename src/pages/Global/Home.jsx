import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

import Navbar from '../../components/Global/Navbar';
import LoginModal from '../../components/Auth/LoginModal';
import VideoCard from '../../components/Global/Home/VideoCard';
import SearchBar from '../../components/Global/Home/SearchBar';
import Banner from '../../components/Global/Home/Banner';
import Footer from '../../components/Global/Footer';

import { Box, Heading } from '@chakra-ui/react';

export default function Home() {
  const [openLoginModal, setOpenLoginModal] = useState(false);

  const courses = useSelector((state) => state.courses.courses);
  const { user } = useSelector((state) => state.auth);

  const freeCourses = courses?.filter((course) => course.isFree);
  const paidCourses = courses?.filter((course) => !course.isFree);

  return (
    <main className='h-screen overflow-y-auto bg-[#f0f0f0]'>
      <Navbar title={'Início'} />
      <div className='w-full bg-white flex px-4 pb-[6px] mb-6'>
        <SearchBar />
      </div>

      <Swiper spaceBetween={16} slidesPerView={1.1} className='ml-4 !h-[206px]'>
        <SwiperSlide>
          <Banner
            post={{
              image:
                'https://gazetadasemana.com.br/images/colunas/7849/31012022105932_Leo_Nonato.png',
              title: 'Práticas para lucrar no Day Trade',
              description: 'Léo Nonato',
            }}
          />
        </SwiperSlide>
        <SwiperSlide>
          <Banner
            post={{
              image:
                'https://gazetadasemana.com.br/images/colunas/7849/31012022105932_Leo_Nonato.png',
              title: 'Práticas para lucrar no Day Trade',
              description: 'Léo Nonato',
            }}
          />
        </SwiperSlide>
      </Swiper>

      <section className='px-4'>
        <Box className='flex justify-between items-center pt-4 pb-5'>
          <Heading className='!font-poppins !text-large !leading-6 !font-semibold  !text-primary-600'>
            Cursos gratuitos
          </Heading>
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

        <Box className='flex justify-between items-center pt-4 pb-5'>
          <Heading className='!font-poppins !text-large !leading-6 !font-semibold  !text-primary-600 '>
            Cursos pagos
          </Heading>

          <Link
            to='/'
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

        <Box className='flex justify-between items-center pt-4 pb-5'>
          <Heading className='!font-poppins !text-large !leading-6 !font-semibold  !text-primary-600 '>
            Newsletter
          </Heading>

          <Link
            to='/'
            className='font-poppins text-small leading-[18px] text-primary-400/80'
          >
            Ver todos
          </Link>
        </Box>
      </section>
      <Footer />
      <LoginModal
        openLoginModal={openLoginModal}
        setOpenLoginModal={setOpenLoginModal}
      />
    </main>
  );
}
