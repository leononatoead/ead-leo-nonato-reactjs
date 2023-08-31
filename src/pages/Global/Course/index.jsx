import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  fetchVideos,
  selectLesson,
} from '../../../redux/modules/courses/actions';
import { useDispatch, useSelector } from 'react-redux';

import Navbar from '../../../components/Global/Navbar';

import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from '@chakra-ui/react';
import { Box } from '@chakra-ui/layout';

export default function Course() {
  const { id } = useParams();
  const { user } = useSelector((state) => state.auth);

  const courses = useSelector((state) => state.courses.courses);
  const course = courses.find((course) => course.id === id);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const course = courses.find((course) => course.id === id);

    if (!course.videos) {
      dispatch(fetchVideos(id));
    }
  }, []);

  const handleSelectLesson = (video) => {
    dispatch(selectLesson(video));
    navigate(`/course/${id}/${video.id}`);
  };

  return (
    <Box className='min-h-screen bg-gray-200 flex flex-col'>
      <Navbar title={course?.name} />

      <Accordion allowToggle>
        {course &&
          course?.videos?.map((section, i) => (
            <AccordionItem key={i}>
              <AccordionButton>
                <Box as='span' flex='1' textAlign='left'>
                  {section.section}
                </Box>
                <AccordionIcon />
              </AccordionButton>

              <AccordionPanel pb={4}>
                {section.videos.map((video) => (
                  <li key={video.id} onClick={() => handleSelectLesson(video)}>
                    {video.title}
                  </li>
                ))}
              </AccordionPanel>
            </AccordionItem>
          ))}
      </Accordion>
    </Box>
  );
}
