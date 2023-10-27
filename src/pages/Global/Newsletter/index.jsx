import { useState } from "react";
import { useSelector } from "react-redux";

import PostCard from "../../../components/Global/Newsletter/PostCard";
import CategoriesFilter from "../../../components/Global/Newsletter/CategoriesFilter";
import Navbar from "../../../components/Navbar";
import Pagination from "../../../components/Pagination";
import SearchBar from "../../../components/SearchBar";
import LoginModal from "../../../components/LoginModal";
import { Box, Flex, Text } from "@chakra-ui/react";
import { IoMdStar } from "react-icons/io";

export default function Newsletter() {
  const { user } = useSelector((state) => state.auth);
  const { posts, selectedCategory, pages, currentPage } = useSelector(
    (state) => state.posts,
  );
  const page = pages?.find((page) => page.page === currentPage);
  const [openLoginModal, setOpenLoginModal] = useState(false);

  return (
    <Box className="min-h-[100dvh] bg-gray-200">
      <Navbar title="Newsletter" />
      <SearchBar type="post" />

      {!user && (
        <Flex className="!items-start gap-1 bg-gray-250 p-2">
          <IoMdStar size={20} className="-mt-[2px] text-orange" />
          <Text className=" text-small leading-4">
            Tenha acesso ilimitado a todo o conteúdo e cresça como investidor.{" "}
            <button
              className="text-primary-400"
              onClick={() => setOpenLoginModal(true)}
            >
              Entre ou cadastre-se agora.
            </button>
          </Text>
        </Flex>
      )}

      <CategoriesFilter />

      <Box className="px-4 py-6">
        {selectedCategory ? (
          <ul className="flex flex-grow flex-col gap-4">
            {selectedCategory?.map((post) => (
              <PostCard post={post} key={post.id} />
            ))}
          </ul>
        ) : page && page.posts.length > 0 ? (
          <ul className="flex flex-grow flex-col gap-4">
            {page.posts?.map((post) => (
              <PostCard post={post} key={post.id} />
            ))}
          </ul>
        ) : (
          <Box>
            <Text>Nenhum post encontrado.</Text>
          </Box>
        )}

        {!selectedCategory && posts?.length >= 10 && <Pagination />}
      </Box>
      <LoginModal
        openLoginModal={openLoginModal}
        setOpenLoginModal={setOpenLoginModal}
      />
    </Box>
  );
}
