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
    <Box className="flex w-full items-center justify-center gap-6 pt-4 text-small lg:text-base">
      {currentPage > 1 && (
        <button
          onClick={handleBackPage}
          className="flex items-center gap-1 font-bold leading-3 text-primary-600 lg:leading-4"
        >
          <RiArrowLeftSLine size={16} /> Voltar
        </button>
      )}
      {page?.posts.length > 0 && (
        <button
          onClick={handleLoadMore}
          className="flex items-center gap-1 font-bold leading-3 text-primary-600 lg:leading-4"
        >
          Próximo <RiArrowRightSLine size={16} />
        </button>
      )}
    </Box>
  );
}
