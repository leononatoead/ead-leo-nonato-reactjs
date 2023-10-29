import { Link } from "react-router-dom";

import { Box, Image, Text } from "@chakra-ui/react";

export default function Banner({ data }) {
  return (
    <Link
      to={data?.url}
      className="relative h-[145px] w-[390px] overflow-hidden  rounded-[20px] "
    >
      <Image
        src={data?.imageURL}
        alt="banner"
        className=" h-[145px] w-[390px] rounded-[20px] object-cover "
      />
      <Box className="absolute bottom-3 left-3 flex h-[80%] flex-col px-4 text-base leading-5 text-white">
        <Text className="flex-grow !font-poppins !text-[14px] !font-semibold !leading-5">
          {data?.title}
        </Text>
        <Text className="!font-poppins !text-small !font-medium !leading-3 !tracking-[0.5px]">
          {data?.subtitle}
        </Text>
        <Text className="!font-poppins !text-[11px] !font-normal !leading-[11px] !tracking-[0.5px]">
          Assistir agora
        </Text>
      </Box>
    </Link>
  );
}
