import React, { useState } from 'react';
import EditVideoModal from './EditVideoModal';
import useVideo from '../../hooks/useVideo';

export default function VideoEditCard({ id, video }) {
  const [openEditVideoModal, setOpenEditVideoModal] = useState(false);

  const { deleteVideo } = useVideo();

  const handleDeleteVideo = (videoId, storageRef, fileList) => {
    deleteVideo(id, videoId, storageRef, fileList);
  };

  return (
    <li key={video.id} className='flex justify-between items-center'>
      <span className='text-xs font-bold'>{video.title}</span>
      <div className='flex gap-4'>
        <EditVideoModal
          courseId={id}
          oldVideoData={video}
          openEditModal={openEditVideoModal}
          setOpenEditModal={setOpenEditVideoModal}
        />
        <button
          onClick={() =>
            handleDeleteVideo(video.id, video.storageRef, video.assets)
          }
          className='px-4 py-2 bg-red-500 rounded-md text-white font-bold'
        >
          Deletar
        </button>
      </div>
    </li>
  );
}
