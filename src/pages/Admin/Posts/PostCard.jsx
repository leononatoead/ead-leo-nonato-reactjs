import { Link, useNavigate } from "react-router-dom";
import { convertFromRaw } from "draft-js";

import { Box, Heading, Image, Text } from "@chakra-ui/react";
import { IoMdEye } from "react-icons/io";
import { BiEdit } from "react-icons/bi";

export default function PostCard({ post }) {
  const contentRaw = JSON.parse(post.postContent);
  const contentState = convertFromRaw(contentRaw);
  const postDescription = contentState.getPlainText();

  const navigate = useNavigate();

  const handleEdit = () => {
    navigate(`/dashboard/posts/edit/${post.id}`);
  };

  const handleView = (event) => {
    event.stopPropagation();
  };

  return (
    <Box
      onClick={handleEdit}
      className="flex h-32 w-full items-center gap-3 rounded-lg bg-white p-3 shadow-md"
    >
      <Image
        src={post.thumb}
        alt="thumbnail"
        className="!h-24 !w-40 !min-w-[160px] !max-w-[160px] rounded-sm object-cover"
      />
      <Box className="flex min-h-full w-full flex-col justify-start overflow-hidden">
        <Box className="flex-grow">
          <Heading className="break-title -mt-1 max-h-16 !font-poppins !text-base !font-semibold !leading-5 !text-primary-600">
            {post.title}
          </Heading>
          <Text className="break-title text-small text-gray-700 ">
            {postDescription}
          </Text>
        </Box>
        <Box className="flex w-full items-center justify-between">
          <Text className="rounded-xl bg-gray-200 px-3 py-[2px] text-base font-medium">
            {post.category}
          </Text>
          <Box className="flex flex-1 items-center justify-end gap-2">
            <Box onClick={handleView}>
              <Link to={`/newsletter/post/${post.id}`}>
                <IoMdEye size={18} className="text-primary-600" />
              </Link>
            </Box>
            <Link to={`/dashboard/posts/edit/${post.id}`}>
              <BiEdit size={18} className="text-primary-600" />
            </Link>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
