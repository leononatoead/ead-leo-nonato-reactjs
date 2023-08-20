import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchVideos } from '../../redux/modules/courses/actions';
import { useDispatch, useSelector } from 'react-redux';

export default function Course() {
  const [activeVideo, setActiveVideo] = useState();
  const [videoList, setVideoList] = useState();
  const [videoSize, setVideoSize] = useState();
  const { id } = useParams();

  const dispatch = useDispatch();

  const courses = useSelector((state) => state.courses.courses);

  const handleSelectVideo = (id) => {
    const newActive = videoList.find((video) => video.id === id);
    setActiveVideo(newActive);
  };

  const handleSetVideoSize = () => {
    if (videoSize === 'full') {
      setVideoSize('[800px]');
    } else {
      setVideoSize('full');
    }
  };

  useEffect(() => {
    const course = courses.find((course) => course.id === id);

    if (!course.videos) {
      dispatch(fetchVideos(id));
    }
  }, [courses, id]);

  useEffect(() => {
    const course = courses.find((course) => course.id === id);
    if (course.videos) {
      setActiveVideo(course?.videos[0]);
      setVideoList(course?.videos);
    }
  }, [courses, id]);

  return (
    <main className='mainLayout'>
      {videoList?.length === 0 ? (
        <h1>Nenhuma aula.</h1>
      ) : (
        <div className='flex items-start justify-between'>
          <div className={`w-${videoSize}`}>
            <video
              src={activeVideo?.videoPath}
              controls
              className='w-full max-h-[80vh]'
            />
            <button
              onClick={() => handleSetVideoSize()}
              className='bg-sky-400 p-4 text-white font-bold mt-2'
            >
              {videoSize === 'full' ? 'Diminuir' : 'Expandir'}
            </button>
          </div>
          {videoSize !== 'full' && (
            <ul className='p-8 flex flex-col gap-4'>
              {videoList?.map((video) => (
                <li
                  key={video.id}
                  onClick={() => handleSelectVideo(video.id)}
                  className={`cursor-pointer font-bold ${
                    activeVideo?.id === video.id && 'text-sky-400'
                  }`}
                >
                  {video.title}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </main>
  );
}
