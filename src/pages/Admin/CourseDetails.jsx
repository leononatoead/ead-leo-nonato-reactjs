import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import { fetchVideos } from '../../redux/modules/courses/actions';

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
} from '@chakra-ui/react';

import { BiEdit } from 'react-icons/bi';
import { MdAddCircleOutline } from 'react-icons/md';

export default function CourseDetails() {
  const { id } = useParams();

  const courses = useSelector((state) => state.courses.courses);
  const course = courses.find((course) => course.id === id);

  const dispatch = useDispatch();

  useEffect(() => {
    if (course && !course.videos) {
      dispatch(fetchVideos(id));
    }
  }, [courses, id]);

  return (
    <Box className='main-container !px-0 !pt-0'>
      <Image
        src={course?.imagePath}
        alt='banner'
        className='w-full rounded-b-2xl mb-4'
      />
      <Heading className='!px-4 !text-large !leading-7 !text-primary-500 !font-bold  !w-full !text-center !font-poppins'>
        {course?.name}
      </Heading>
      <Box className='flex justify-start gap-20 items-start p-4'>
        <Box className='w-full'>
          <Text className='mb-2 !text-base'>
            <span className='font-bold text-primary-500'>Autor:</span>{' '}
            {course?.author}
          </Text>
          <Text className='mb-2 !text-base'>
            <span className='font-bold text-primary-500'>Descrição:</span>{' '}
            {course?.description}
          </Text>
          <Text className='mb-2 !text-base'>
            <span className='font-bold text-primary-500'>Gratuito:</span>
            {course?.isFree ? ' Sim' : ' Não'}
          </Text>
          <Text className='mb-2 !text-base'>
            <span className='font-bold text-primary-500'>
              Necessita de cadastro:
            </span>
            {course?.isFree ? ' Sim' : ' Não'}
          </Text>

          <Link
            to={`/dashboard/courses/${id}/edit`}
            className='flex justify-center items-center gap-3 bg-primary-400 rounded-[4px] px-3 py-[5px] text-white text-base leading-5'
          >
            <BiEdit size={18} /> Editar
          </Link>
        </Box>
      </Box>

      <Box px={4} bg={'white'} className='!flex-grow' mt={8}>
        <Box className='w-full flex justify-between' mb={4}>
          <Heading className='!text-large !leading-7 !text-primary-500 !font-bold  !text-center !font-poppins'>
            Aulas
          </Heading>
          <Link
            to={'new'}
            className='flex justify-center items-center gap-3 bg-primary-400 rounded-[4px] px-3 py-[5px] text-white text-base leading-5'
          >
            <MdAddCircleOutline size={18} /> Nova aula
          </Link>
        </Box>
        <Accordion allowToggle>
          {course &&
            course?.videos?.map((section, i) => (
              <AccordionItem
                key={i}
                className='!border-t-0 !border-b-[1px] !border-gray-200 '
              >
                <AccordionButton px={0} py={4} className='hover:!bg-white'>
                  <Box
                    as='span'
                    flex='1'
                    textAlign='left'
                    className='!text-base !font-medium !leading-5'
                  >
                    {section.section}
                  </Box>
                  <AccordionIcon />
                </AccordionButton>

                <AccordionPanel pb={4} className='flex flex-col gap-6 '>
                  {section.videos.map((video) => (
                    <Link
                      to={`/dashboard/courses/${id}/edit/${video.id}`}
                      key={video.id}
                      className='font-semibold text-small leading-4 flex items-center justify-between'
                    >
                      <span> {video.title}</span> <BiEdit size={18} />
                    </Link>
                  ))}
                </AccordionPanel>
              </AccordionItem>
            ))}
        </Accordion>
      </Box>
    </Box>
  );
}
