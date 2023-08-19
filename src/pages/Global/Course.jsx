import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useFetchDocument from '../../hooks/useFetchDocument';
import useFetchDocuments from '../../hooks/useFetchDocuments';

export default function Course() {
  const [activeVideo, setActiveVideo] = useState();
  const [videoList, setVideoList] = useState();
  const [videoSize, setVideoSize] = useState();
  const { id } = useParams();

  const {
    loadDocument,
    document: course,
    loading
  } = useFetchDocument(`courses`);

  const {
    loadDocuments: loadVideos,
    documents: videos,
    loading: loadingVideos
  } = useFetchDocuments(`courses/${id}/videos/`);

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
    loadDocument(id);
    loadVideos();
  }, []);

  useEffect(() => {
    if (videos) {
      setActiveVideo(videos[0]);

      setVideoList(videos);
    }
  }, [videos]);

  return (
    <main className='mainLayout'>
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
    </main>
  );
}
