import { useEffect, useState } from "react";
import { convertFromRaw } from "draft-js";

import { Link } from "react-router-dom";

import { Box, Heading, Image, Text, useMediaQuery } from "@chakra-ui/react";

export default function PostCard({ post }) {
  const [description, setDescription] = useState("");
  const [isLargerThanLg] = useMediaQuery("(min-width: 1024px)");

  useEffect(() => {
    const data = JSON.parse(post.postContent);
    const contentState = convertFromRaw(data);

    const blockMap = contentState.getBlockMap();
    let text = "";

    blockMap.forEach((block) => {
      text += block.getText() + "\n";
    });

    setDescription(text);
  }, []);

  return (
    <Link
      to={`/newsletter/post/${post.id}`}
      className="flex h-24 w-full min-w-[320px] items-start gap-3 lg:!h-[144px] lg:gap-4 "
    >
      <Image
        src={post.thumb}
        className="h-24 min-w-[120px] max-w-[120px] rounded-xl object-cover lg:!h-[144px] lg:!w-[56px] lg:rounded-b-none"
      />
      <Box className="flex h-full w-full flex-col justify-between lg:gap-1 lg:pr-4">
        <Heading className="break-title max-h-16 !w-full !font-poppins !text-base !font-bold !leading-5 !text-primary-600 lg:!text-large lg:!leading-6">
          {post.title}
        </Heading>

        <Text
          className={`${
            isLargerThanLg ? "break-description" : "hidden"
          }   text-justify font-poppins text-base leading-4 text-gray-800`}
        >
          {description}
        </Text>

        <Text className="font-poppins text-small text-gray-800 lg:text-normal lg:leading-4">
          {post.author}
        </Text>

        <Text className="max-w-max rounded-2xl bg-gray-250 px-2 py-1 text-small leading-4 text-black lg:hidden">
          {post.category}
        </Text>
      </Box>
    </Link>
  );
}
