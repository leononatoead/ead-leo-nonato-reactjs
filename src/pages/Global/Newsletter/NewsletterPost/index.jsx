import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchPost,
  fetchPosts,
  setCurrentPost,
} from '../../../../redux/modules/posts/actions';
import { useLocation, useParams } from 'react-router-dom';
import useFormat from '../../../../hooks/useFormat';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, convertFromRaw } from 'draft-js';

import Navbar from '../../../../components/Global/Navbar';
import PostComments from '../../../../components/Global/Newsletter/PostComments';
import PremiumPost from '../../../../components/Global/PremiumPost';
import { Box, Heading, Image, Text } from '@chakra-ui/react';
import Like from '../../../../components/Global/Newsletter/Like';
import ShareBtn from '../../../../components/Global/ShareBtn';

export default function NewsletterPost() {
  const { id } = useParams();
  const { pathname } = useLocation();
  const url = `${import.meta.env.VITE_VERCEL_APP_URL}${pathname}`;
  const { posts, currentPost } = useSelector((state) => state.posts);
  const { user } = useSelector((state) => state.auth);

  const [editorState, setEditorState] = useState();
  const [openPremiumModal, setOpenPremiumModal] = useState(false);

  const { formatDate } = useFormat();
  const dispatch = useDispatch();

  useEffect(() => {
    const post = posts?.find((post) => post.id === id);

    if (post) {
      dispatch(setCurrentPost(post));
    } else {
      dispatch(fetchPost(id));
    }

    if (currentPost && currentPost.postContent) {
      const data = JSON.parse(currentPost.postContent);
      const contentState = convertFromRaw(data);
      const state = EditorState.createWithContent(contentState);
      setEditorState(state);
    }
  }, [currentPost]);

  useEffect(() => {
    if (!user) {
      const handleScroll = () => {
        const scrollThreshold = 100;

        if (window.scrollY >= scrollThreshold) {
          setOpenPremiumModal(true);
        }
      };
      window.addEventListener('scroll', handleScroll);

      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }
  }, []);

  useEffect(() => {
    if (!posts) {
      dispatch(fetchPosts());
    }
  }, []);

  return (
    <Box className='min-h-screen'>
      <Navbar title={currentPost?.category} />
      <Box className='px-4 py-6'>
        <Heading className='!font-poppins !text-large !font-bold !leading-6 text-primary-600'>
          {currentPost?.title}
        </Heading>
        <Box className='flex items-center justify-start gap-2 text-small leading-4 text-gray-700 py-2'>
          <Text>{currentPost?.author}</Text>
          {`|`}
          <Text>{formatDate(currentPost?.createdAt)}</Text>
          <ShareBtn url={url} />
        </Box>
        <Box className='w-full bg-gray-200 h-[1px] mb-4'></Box>
        <Image
          src={currentPost?.thumb}
          alt='thumbnail'
          className='h-52 w-full object-cover rounded-2xl mb-4'
        />
        <Editor
          editorState={editorState}
          readOnly={true}
          toolbarHidden={true}
        />
      </Box>

      {user && <Like id={id} />}
      {user && <PostComments id={id} />}
      {!user && (
        <PremiumPost open={openPremiumModal} close={setOpenPremiumModal} />
      )}
    </Box>
  );
}
