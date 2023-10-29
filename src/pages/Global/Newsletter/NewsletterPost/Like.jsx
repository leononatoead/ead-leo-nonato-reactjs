import { useSelector } from "react-redux";
import usePosts from "../../../../hooks/usePosts";

import { Flex, Text, useMediaQuery } from "@chakra-ui/react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

export default function Like({ id }) {
  const { user } = useSelector((state) => state.auth);
  const { posts } = useSelector((state) => state.posts);
  const post = posts?.find((post) => post.id === id);
  const { addLike, removeLike } = usePosts();

  const [isLargerThanLg] = useMediaQuery("(min-width: 1024px)");

  const handleLikePost = () => {
    addLike(id, user.uid);
  };
  const handleDislikePost = () => {
    removeLike(id, user.uid);
  };

  return (
    <Flex className="gap-2 px-4" alignItems={"center"}>
      {user ? (
        <>
          {user?.likedPosts?.includes(post.id) ? (
            <AiFillHeart
              size={isLargerThanLg ? 26 : 20}
              className="cursor-pointer text-primary-600"
              onClick={handleDislikePost}
            />
          ) : (
            <AiOutlineHeart
              size={isLargerThanLg ? 26 : 20}
              className="cursor-pointer text-primary-600"
              onClick={handleLikePost}
            />
          )}
        </>
      ) : (
        <AiOutlineHeart
          size={isLargerThanLg ? 26 : 20}
          className="cursor-pointer text-primary-600"
          onClick={handleLikePost}
        />
      )}
      {!isLargerThanLg && (
        <Text className="text-small text-gray-400">
          {post?.likesCount
            ? `${post.likesCount} ${
                post.likesCount > 1 ? "Curtidas" : "Curtida"
              }`
            : "Nenhuma curtida"}
        </Text>
      )}
    </Flex>
  );
}
