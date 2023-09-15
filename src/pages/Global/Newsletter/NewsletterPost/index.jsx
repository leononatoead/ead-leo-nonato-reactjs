import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import {
  fetchPost,
  fetchPosts,
  setCurrentPost,
} from '../../../../redux/modules/posts/actions';

export default function NewsletterPost() {
  const { id } = useParams();
  const { posts, currentPost } = useSelector((state) => state.posts);

  const dispatch = useDispatch();

  useEffect(() => {
    const post = posts?.find((post) => post.id === id);

    if (post) {
      dispatch(setCurrentPost(post));
    } else {
      dispatch(fetchPost(id));
    }
  }, [currentPost]);

  useEffect(() => {
    if (!posts) {
      dispatch(fetchPosts());
    }
  }, []);

  console.log(currentPost);

  return <Box>index</Box>;
}
