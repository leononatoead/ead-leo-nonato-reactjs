import React, { useState } from 'react';
import EditVideoModal from './EditVideoModal';
import useVideo from '../hooks/useVideo';

export default function VideoEditCard({ id, video }) {
  const [openEditVideoModal, setOpenEditVideoModal] = useState(false);

  const { deleteVideo } = useVideo();

  const handleDeleteVideo = (videoId, storageRef) => {
    deleteVideo(id, videoId, storageRef);
  };

  return (
    <li key={video.id} className='flex justify-between items-center'>
      <span className='text-xl font-bold'>{video.title}</span>
      <div className='flex gap-4'>
        <EditVideoModal
          courseId={id}
          oldVideoData={video}
          openEditModal={openEditVideoModal}
          setOpenEditModal={setOpenEditVideoModal}
        />
        <button
          onClick={() => handleDeleteVideo(video.id, video.storageRef)}
          className='px-4 py-2 bg-red-500 rounded-md text-white font-bold'
        >
          Deletar
        </button>
      </div>
    </li>
  );
}
