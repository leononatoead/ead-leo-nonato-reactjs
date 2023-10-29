import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchVideos } from "../../../../redux/modules/courses/actions";
import { Link, useParams } from "react-router-dom";

import {
  Box,
  Image,
  Heading,
  Text,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionIcon,
  AccordionPanel,
} from "@chakra-ui/react";
import { BiEdit } from "react-icons/bi";
import { MdAddCircleOutline } from "react-icons/md";

export default function CourseDetails() {
  const { id } = useParams();

  const { courses } = useSelector((state) => state.courses);
  const course = courses.find((course) => course.id === id);

  const dispatch = useDispatch();

  useEffect(() => {
    if (!course?.videos) {
      dispatch(fetchVideos(id));
    }
  }, [course, id]);

  return (
    <Box className="main-container flex flex-col !px-0 !py-0 lg:!pb-6">
      <Box className="w-full lg:mx-auto lg:max-w-5xl">
        <Image
          src={course?.imagePath}
          alt="banner"
          className="mb-4 w-full rounded-b-2xl object-cover lg:h-[250px]"
        />
        <Heading className="!w-full !px-4 !text-center !font-poppins !text-large  !font-bold !leading-7 !text-primary-500">
          {course?.name}
        </Heading>
        <Box className="flex items-start justify-start gap-20 p-4">
          <Box className="w-full">
            <Text className="mb-2 !text-base">
              <span className="font-bold text-primary-500">Descrição:</span>{" "}
              {course?.description}
            </Text>
            <Text className="mb-2 !text-base">
              <span className="font-bold text-primary-500">Autor:</span>{" "}
              {course?.author}
            </Text>
            <Text className="mb-2 !text-base">
              <span className="font-bold text-primary-500">Tipo:</span>
              {course?.isPremium ? " Premium" : " Gratuito"}
            </Text>
            <Text className="mb-2 !text-base">
              <span className="font-bold text-primary-500">
                Necessita de cadastro:
              </span>
              {course?.needAuth ? " Sim" : " Não"}
            </Text>
            <Text className="mb-2 !text-base">
              <span className="font-bold text-primary-500">Visibilidade:</span>
              {course?.isHidden ? " Oculto" : " Visível"}
            </Text>

            <Link
              to={`/dashboard/courses/${id}/edit`}
              className="flex items-center justify-center gap-3 rounded-[4px] bg-primary-400 px-3 py-[5px] text-base leading-5 text-white"
            >
              <BiEdit size={18} /> Editar
            </Link>
          </Box>
        </Box>

        <Box
          bg={"white"}
          className="!flex-grow px-4 py-6 lg:mx-4 lg:rounded-lg"
        >
          <Box className="flex w-full justify-between" mb={4}>
            <Heading className="!text-center !font-poppins !text-large !font-bold  !leading-7 !text-primary-500">
              Módulos
            </Heading>
            <Link
              to={`new`}
              className="flex items-center justify-center gap-3 rounded-[4px] bg-primary-400 px-3 py-[5px] text-base leading-5 text-white"
            >
              <MdAddCircleOutline size={18} /> Nova aula
            </Link>
          </Box>
          <Accordion allowToggle>
            {course &&
              course?.sections
                ?.slice()
                .sort((a, b) => a.order - b.order)
                .map((section, i) => (
                  <AccordionItem
                    key={i}
                    className="!border-b-[1px] !border-t-0 !border-gray-200 "
                  >
                    <AccordionButton px={0} py={4} className="hover:!bg-white">
                      <Box
                        as="span"
                        flex="1"
                        textAlign="left"
                        className="!text-base !font-medium !leading-5"
                      >
                        {section.order} {" - "}
                        {section.sectionName}
                      </Box>
                      <AccordionIcon />
                    </AccordionButton>

                    <AccordionPanel pb={4} className="flex flex-col gap-6 ">
                      {course?.videos
                        ?.slice()
                        .sort((a, b) => a.order - b.order)
                        .map((video) => {
                          if (video.section === section.sectionName) {
                            return (
                              <Link
                                to={`/dashboard/courses/${id}/edit/${video.id}`}
                                key={video.id}
                                className="flex items-center justify-between text-small font-semibold leading-4"
                              >
                                <span>
                                  {video.order} {" - "} {video.title}
                                </span>
                                <BiEdit size={18} />
                              </Link>
                            );
                          }
                        })}
                    </AccordionPanel>
                  </AccordionItem>
                ))}
          </Accordion>
        </Box>
      </Box>
    </Box>
  );
}
