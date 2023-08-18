import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useFetchDocument from '../../hooks/useFetchDocument';
import useUploadVideo from '../../hooks/useUploadVideo';
import useFetchDocuments from '../../hooks/useFetchDocuments';

export default function CourseDetails() {
  const [title, setTitle] = useState('');
  const [video, setVideo] = useState();

  const { id } = useParams();

  const { document, loadDocument, loading } = useFetchDocument('courses');
  const {
    documents: videos,
    loadDocuments: loadVideos,
    loading: loadingVideos
  } = useFetchDocuments(`courses/${id}/videos/`);
  const { uploadVideo, progress } = useUploadVideo();

  useEffect(() => {
    console.log('load');
    loadDocument(id);
    loadVideos();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    uploadVideo({ title }, `courses/${id}/videos`, video);
  };

  useEffect(() => {
    console.log(progress);
  }, [progress]);

  console.log(videos);

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type='text'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input type='file' onChange={(e) => setVideo(e.target.files[0])} />
        <button
          type='submit'
          className='bg-zinc-300 py-2 px-8 font-bold rounded-md'
        >
          Add
        </button>
      </form>
      <h1>{document?.name}</h1>
      <p>{document?.author}</p>
      <p>{document?.isFree ? 'Gratis' : 'Pago'}</p>

      <ul>
        {videos?.map((video) => (
          <li key={video.title}>
            <video controls={true} src={video.videoPath} />
          </li>
        ))}
      </ul>
    </div>
  );
}
