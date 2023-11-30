import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchSettingsFromLocalStorage,
  fetchBannerSettings,
  fetchNotificationsSettings,
} from "../../../redux/modules/settings/actions";
import useCheckUpdate from "../../../hooks/useCheckUpdate";
import { Link } from "react-router-dom";

import Navbar from "../../../components/Navbar";
import LoginModal from "../../../components/LoginModal";
import CourseCard from "./CourseCard";
import SearchBar from "../../../components/SearchBar";
import Banner from "./Banner";
import Footer from "../../../components/Footer";
import PostCard from "./PostCard";
import { Box, Heading, useMediaQuery } from "@chakra-ui/react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css/navigation";
import "swiper/css";

export default function Home() {
  const [openLoginModal, setOpenLoginModal] = useState(false);
  const [isLargerThanLg] = useMediaQuery("(min-width: 1024px)");

  const { pages } = useSelector((state) => state.posts);
  const { courses } = useSelector((state) => state.courses);
  const settings = useSelector((state) => state.settings);

  const freeCourses = courses?.filter(
    (course) => !course.isPremium && !course.isHidden,
  );
  const paidCourses = courses?.filter(
    (course) => course.isPremium && !course.isHidden,
  );

  const { verifySettingsUpdate } = useCheckUpdate();

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchSettingsData = async () => {
      try {
        const fireStoreSettingsUpdate = await verifySettingsUpdate();
        const lastSettingsUpdate =
          new Date(JSON.parse(localStorage.getItem("lastSettingsUpdate"))) || 0;

        const calcCourse = fireStoreSettingsUpdate - lastSettingsUpdate;
        const localSettings = JSON.parse(localStorage.getItem("settings"));

        if (calcCourse !== 0 && !localSettings) {
          dispatch(fetchBannerSettings());
          dispatch(fetchNotificationsSettings());
        } else {
          dispatch(fetchSettingsFromLocalStorage(localSettings));

          if (!settings.notifications && !localSettings.notifications) {
            dispatch(fetchNotificationsSettings());
          }

          if (!settings.banners && !localSettings.banners) {
            dispatch(fetchBannerSettings());
          }
        }
      } catch (error) {
        console.error(
          "Erro ao buscar a última atualização dos banners:",
          error,
        );
      }
    };

    fetchSettingsData();
  }, []);

  return (
    <main className="flex h-[100dvh] flex-col overflow-y-auto bg-gray-200">
      <Navbar title={"Início"} />
      <Box className="flex-1 pb-20 lg:mx-auto lg:max-w-7xl lg:pb-0">
        <Box className="flex w-full bg-white px-4 pb-[6px] lg:hidden">
          <SearchBar type="course" />
        </Box>

        <Swiper
          navigation={true}
          modules={[Navigation]}
          // spaceBetween={16}
          slidesPerView={1}
          className="ml-4 mt-6 !h-[206px] lg:!h-[300px]"
        >
          {settings?.banners
            ?.slice()
            .sort((a, b) => a.order - b.order)
            .map((banner) => (
              <SwiperSlide className="w-[95%]" key={banner.id}>
                <Banner data={banner} />
              </SwiperSlide>
            ))}
        </Swiper>

        <section>
          <Box className="px-4">
            {freeCourses?.length > 0 && (
              <>
                <Box className="flex items-center justify-between gap-6 pb-5 pt-4 lg:justify-start lg:pt-10">
                  <Heading className="!font-poppins !text-large !font-semibold !leading-6  !text-primary-600 lg:!text-[24px] lg:!leading-6 ">
                    Cursos Gratuitos
                  </Heading>

                  <Link
                    to="/courses/free"
                    className="font-poppins text-small leading-[18px] text-primary-400/80 lg:!text-base lg:!leading-6"
                  >
                    Ver todos
                  </Link>
                </Box>
                <Swiper
                  spaceBetween={16}
                  slidesPerView={1.5}
                  className="mb-6 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4"
                >
                  {freeCourses.map((course) => (
                    <SwiperSlide key={course.id} className="!w-40 lg:!w-60">
                      <CourseCard
                        courseData={course}
                        setOpenLoginModal={setOpenLoginModal}
                      />
                    </SwiperSlide>
                  ))}
                </Swiper>
              </>
            )}
          </Box>

          <Box className="px-4">
            {paidCourses?.length > 0 && (
              <>
                <Box className="flex items-center justify-between gap-6 pb-5 pt-4 lg:justify-start">
                  <Heading className="!font-poppins !text-large !font-semibold !leading-6  !text-primary-600 lg:!text-[24px] lg:!leading-6 ">
                    Cursos Premium
                  </Heading>

                  <Link
                    to="/courses/premium"
                    className="font-poppins text-small leading-[18px] text-primary-400/80 lg:!text-base lg:!leading-6"
                  >
                    Ver todos
                  </Link>
                </Box>
                <Swiper
                  spaceBetween={16}
                  slidesPerView={1.5}
                  className="mb-6 grid grid-cols-1 gap-6 md:grid-cols-2  lg:grid-cols-4"
                >
                  {paidCourses.map((course) => (
                    <SwiperSlide key={course.id} className="!w-40 lg:!w-60">
                      <CourseCard
                        courseData={course}
                        setOpenLoginModal={setOpenLoginModal}
                      />
                    </SwiperSlide>
                  ))}
                </Swiper>
              </>
            )}
          </Box>

          {pages && (
            <Box className="flex items-center justify-between gap-6 px-4 pb-5 pt-4 lg:justify-start">
              <Heading className="!font-poppins !text-large !font-semibold !leading-6  !text-primary-600 lg:!text-[24px] lg:!leading-6 ">
                Newsletter
              </Heading>

              <Link
                to="/newsletter"
                className="font-poppins text-small leading-[18px] text-primary-400/80 lg:!text-base lg:!leading-6"
              >
                Ver todos
              </Link>
            </Box>
          )}

          {pages && (
            <Swiper
              spaceBetween={1}
              slidesPerView={isLargerThanLg ? 2 : 1.1}
              className="pb-4 pl-4"
            >
              {pages[0]?.posts?.map((post, index) => {
                if (index <= 5) {
                  return (
                    <SwiperSlide
                      key={post.id}
                      className="!min-w-[170px] lg:!mr-6"
                    >
                      <PostCard post={post} />
                    </SwiperSlide>
                  );
                }
              })}
            </Swiper>
          )}
        </section>
      </Box>
      <Footer />
      <LoginModal
        openLoginModal={openLoginModal}
        setOpenLoginModal={setOpenLoginModal}
      />
    </main>
  );
}
