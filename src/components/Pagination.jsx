import { useDispatch, useSelector } from "react-redux";
import { changePage, fetchMorePosts } from "../redux/modules/posts/actions";

import { Box } from "@chakra-ui/react";
import { RiArrowLeftSLine, RiArrowRightSLine } from "react-icons/ri";

export default function Pagination() {
  const { pages, currentPage } = useSelector((state) => state.posts);
  const page = pages?.find((page) => page.page === currentPage);

  const dispatch = useDispatch();

  const handleLoadMore = () => {
    const verifyIfPageAlreadyLoaded = pages?.find(
      (page) => page.page === currentPage + 1,
    );

    if (verifyIfPageAlreadyLoaded) {
      dispatch(changePage(currentPage + 1));
    } else {
      const id = page.posts[page.posts.length - 1].id;
      dispatch(fetchMorePosts(id));
    }
  };

  const handleBackPage = () => {
    dispatch(changePage(currentPage - 1));
  };
  return (
    <Box className="flex w-full items-center justify-center gap-6 pt-4 text-small">
      {currentPage > 1 && (
        <button
          onClick={handleBackPage}
          //   className='w-full bg-primary-400 px-4 py-2 mt-2 text-white font-bold rounded-md'
          className="flex items-center gap-1 font-bold text-primary-600 "
        >
          <RiArrowLeftSLine size={15} /> Voltar
        </button>
      )}
      {page?.posts.length > 0 && (
        <button
          onClick={handleLoadMore}
          className="flex items-center gap-1 font-bold text-primary-600 "
        >
          Próximo <RiArrowRightSLine size={15} />
        </button>
      )}
    </Box>
  );
}
