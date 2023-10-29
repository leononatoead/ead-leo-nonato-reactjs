import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts } from "../../../redux/modules/posts/actions";
import { Link } from "react-router-dom";

import PostCard from "./PostCard";
import Pagination from "../../../components/Pagination";
import { Box, Text } from "@chakra-ui/react";
import { MdAddCircleOutline } from "react-icons/md";

export default function Posts() {
  const { posts, pages, currentPage } = useSelector((state) => state.posts);
  const page = pages?.find((page) => page.page === currentPage);

  const dispatch = useDispatch();

  useEffect(() => {
    if (!pages) {
      dispatch(fetchPosts());
    }
  }, []);

  return (
    <Box className="main-container flex flex-col">
      <Box className="flex w-full justify-end lg:mx-auto lg:max-w-5xl">
        <Link to="/dashboard/posts/new" className="add-btn">
          <MdAddCircleOutline size={20} />
          <span className="font-bold">Novo Post</span>
        </Link>
      </Box>

      {page && page.posts.length > 0 ? (
        <ul className="flex flex-grow flex-col gap-4 pt-6 lg:mx-auto lg:max-w-5xl">
          {page.posts?.map((post) => (
            <PostCard post={post} key={post.id} />
          ))}
        </ul>
      ) : (
        <Box>
          <Text>Nenhum post encontrado.</Text>
        </Box>
      )}
      {posts?.length >= 10 && <Pagination />}
    </Box>
  );
}
