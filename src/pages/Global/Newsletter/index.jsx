import { useState } from "react";
import { useSelector } from "react-redux";

import PostCard from "./PostCard";
import CategoriesFilter from "./CategoriesFilter";
import Navbar from "../../../components/Navbar";
import Pagination from "../../../components/Pagination";
import SearchBar from "../../../components/SearchBar";
import LoginModal from "../../../components/LoginModal";
import { Box, Flex, Image, Text } from "@chakra-ui/react";
import { IoMdStar } from "react-icons/io";
import background from "../../../assets/auth-background.png";
import Footer from "../../../components/Footer";

export default function Newsletter() {
  const { user } = useSelector((state) => state.auth);
  const { posts, selectedCategory, pages, currentPage } = useSelector(
    (state) => state.posts,
  );
  const page = pages?.find((page) => page.page === currentPage);
  const [openLoginModal, setOpenLoginModal] = useState(false);

  return (
    <Box className="flex min-h-[100dvh] flex-col justify-between bg-gray-200 pb-6">
      <Box>
        <Navbar title="Newsletter" />

        <Box>
          <Image
            src={background}
            alt="background"
            className="hidden h-[120px] w-full rounded-bl-[16px] rounded-br-[16px] object-cover lg:block"
          />
          {!user && (
            <Flex className="!hidden !items-start gap-1 rounded bg-gray-250 p-2 lg:mx-auto lg:mt-4 lg:!flex lg:max-w-5xl">
              <IoMdStar size={20} className="-mt-[2px] text-orange" />
              <Text className=" text-small leading-4">
                Tenha acesso ilimitado a todo o conteúdo e cresça como
                investidor.{" "}
                <button
                  className="text-primary-400"
                  onClick={() => setOpenLoginModal(true)}
                >
                  Entre ou cadastre-se agora.
                </button>
              </Text>
            </Flex>
          )}
        </Box>

        <Box className="flex w-full bg-white px-4 pb-[6px] lg:hidden">
          <SearchBar type="post" />
        </Box>

        <Box className="lg:mx-auto lg:max-w-5xl lg:pt-8">
          <Box className="hidden px-4 lg:block">
            <SearchBar type="post" />
          </Box>

          {!user && (
            <Flex className="!items-start gap-1 bg-gray-250 p-2 lg:!hidden">
              <IoMdStar size={20} className="-mt-[2px] text-orange" />
              <Text className=" text-small leading-4">
                Tenha acesso ilimitado a todo o conteúdo e cresça como
                investidor.{" "}
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
      </Box>
      <Box className="hidden lg:block">
        <Footer />
      </Box>
    </Box>
  );
}
