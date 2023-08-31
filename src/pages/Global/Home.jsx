import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';

import Navbar from '../../components/Global/Navbar';
import LoginModal from '../../components/Auth/LoginModal';
import VideoCard from '../../components/Global/Home/VideoCard';
import SearchBar from '../../components/Global/Home/SearchBar';

import starIcon from '../../assets/star.svg';
import 'swiper/css';
import 'swiper/css/pagination';
import Banner from '../../components/Global/Home/Banner';

export default function Home() {
  const [openLoginModal, setOpenLoginModal] = useState(false);

  const courses = useSelector((state) => state.courses.courses);
  const { user } = useSelector((state) => state.auth);

  const freeCourses = courses?.filter((course) => course.isFree);
  const paidCourses = courses?.filter((course) => !course.isFree);

  return (
    <main className='h-screen overflow-y-auto bg-[#f0f0f0]'>
      <Navbar title={'Início'} />
      <div className='w-full bg-white flex px-4 py-[6px]'>
        <SearchBar />
      </div>
      {!user?.isPremium && (
        <div className='p-2 bg-[#FFFFFF70] flex items-start gap-1'>
          <img src={starIcon} alt='star' className='w-4' />
          <span className='text-xs'>
            Tenha acesso ilimitado a todo o conteúdo e cresça como investidor.{' '}
            <Link to='/' className='text-primary-600'>
              {' '}
              Se torne um membro
            </Link>
          </span>
        </div>
      )}
      <section className='p-4'>
        <div className='px-3'>
          <Swiper
            modules={[Pagination]}
            spaceBetween={16}
            slidesPerView={1}
            pagination={{ clickable: true }}
            className='!h-[228px] '
          >
            <SwiperSlide>
              <Banner
                post={{
                  image:
                    'https://gazetadasemana.com.br/images/colunas/7849/31012022105932_Leo_Nonato.png',
                  title: 'Como Ficar Rico',
                  description: 'Caminhos Para o Sucesso Financeiro.',
                }}
              />
            </SwiperSlide>
            <SwiperSlide>
              <Banner
                post={{
                  image:
                    'https://gazetadasemana.com.br/images/colunas/7849/31012022105932_Leo_Nonato.png',
                  title: 'Como Ficar Rico',
                  description: 'Caminhos Para o Sucesso Financeiro.',
                }}
              />
            </SwiperSlide>
            <SwiperSlide>
              <Banner
                post={{
                  image:
                    'https://gazetadasemana.com.br/images/colunas/7849/31012022105932_Leo_Nonato.png',
                  title: 'Como Ficar Rico',
                  description: 'Caminhos Para o Sucesso Financeiro.',
                }}
              />
            </SwiperSlide>
            <SwiperSlide>
              <Banner
                post={{
                  image:
                    'https://gazetadasemana.com.br/images/colunas/7849/31012022105932_Leo_Nonato.png',
                  title: 'Como Ficar Rico',
                  description: 'Caminhos Para o Sucesso Financeiro.',
                }}
              />
            </SwiperSlide>
            <SwiperSlide>
              <Banner
                post={{
                  image:
                    'https://gazetadasemana.com.br/images/colunas/7849/31012022105932_Leo_Nonato.png',
                  title: 'Como Ficar Rico',
                  description: 'Caminhos Para o Sucesso Financeiro.',
                }}
              />
            </SwiperSlide>
          </Swiper>
        </div>

        <h2 className='poppins text-lg leading-6 font-bold mt-[32px]'>
          Cursos gratuitos
        </h2>

        {freeCourses && (
          <Swiper
            spaceBetween={16}
            slidesPerView={1.5}
            className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-3'
          >
            {freeCourses.map((course) => (
              <SwiperSlide key={course.id}>
                <VideoCard
                  courseData={course}
                  setOpenLoginModal={setOpenLoginModal}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        )}
        <h2 className='poppins text-lg leading-6 font-bold mt-8'>
          Cursos pagos
        </h2>
        {!user?.isPremium && (
          <div className='flex items-center gap-1 my-3'>
            <img src={starIcon} alt='star' className='w-3' />
            <span className='text-xs text-[#FF8E00]'>
              Disponível para assinantes
            </span>
          </div>
        )}

        {paidCourses && (
          <Swiper
            spaceBetween={16}
            slidesPerView={1.5}
            className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-3'
          >
            {paidCourses.map((course) => (
              <SwiperSlide key={course.id}>
                <VideoCard
                  courseData={course}
                  setOpenLoginModal={setOpenLoginModal}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        )}
        <h2 className='poppins text-lg leading-6 font-bold mt-8'>Newsletter</h2>
      </section>
      <LoginModal
        openLoginModal={openLoginModal}
        setOpenLoginModal={setOpenLoginModal}
      />
    </main>
  );
}
