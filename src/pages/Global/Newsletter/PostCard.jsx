import { convertFromRaw } from "draft-js";
import { Link } from "react-router-dom";

import { Box, Heading, Image, Text, useMediaQuery } from "@chakra-ui/react";

export default function PostCard({ post }) {
  const contentRaw = JSON.parse(post.postContent);
  const contentState = convertFromRaw(contentRaw);
  const postDescription = contentState.getPlainText();
  const [isLargerThanLg] = useMediaQuery("(min-width: 1024px)");

  return (
    <Link
      to={`/newsletter/post/${post.id}`}
      className="h-289 flex w-full cursor-pointer items-center gap-3 rounded-lg bg-white p-2 shadow-md lg:h-[180px] lg:gap-4 lg:p-4"
    >
      <Image
        src={post.thumb}
        alt="thumbnail"
        h={"104px"}
        className="!h-24 !w-40 !min-w-[160px] !max-w-[160px] rounded-sm object-cover lg:!max-h-[144px] lg:!min-h-[144px] lg:!min-w-[240px] lg:!max-w-[240px]"
      />
      <Box className="flex min-h-full flex-col justify-start overflow-hidden">
        <Box className="flex-grow">
          <Heading className="break-title -mt-1 max-h-16 !font-poppins !text-base !font-semibold !leading-5 !text-primary-600 lg:!text-normal lg:!leading-5">
            {post.title}
          </Heading>
          <Text
            className={`text-small text-gray-700 lg:text-base ${
              isLargerThanLg ? "break-description " : "break-title"
            }`}
          >
            {postDescription}
          </Text>
        </Box>
        <Box className="flex w-full  items-center justify-between">
          <Text className="rounded-xl bg-gray-200 px-3 py-[2px] text-base font-medium">
            {post.category}
          </Text>
        </Box>
      </Box>
    </Link>
  );
}
