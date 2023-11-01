import { Link } from "react-router-dom";

import { Box, Image, Text } from "@chakra-ui/react";

export default function Banner({ data }) {
  return (
    <Link
      to={data?.url}
      className="relative h-[206px] w-full overflow-hidden  rounded-[20px] lg:!h-[300px]"
    >
      <Image
        src={data?.imageURL}
        alt="banner"
        className="h-[206px] w-full rounded-[20px] object-cover lg:!h-[300px]"
      />
      <Box className="absolute bottom-3 left-3 px-4 text-base leading-5 text-white">
        <Text className="h-[130px] w-[126px] !font-poppins !text-[22px] !font-semibold !leading-[26px] lg:h-[190px] lg:w-[250px] lg:!text-[28px]">
          {data?.title}
        </Text>
        <Text className="!font-poppins !text-[13px] !font-medium !leading-[13px] !tracking-[0.5px] lg:mb-3 lg:!text-normal">
          {data?.subtitle}
        </Text>
        <Text className="!font-poppins !text-[11px] !font-normal !leading-[11px] !tracking-[0.5px] lg:mb-4 lg:!text-base">
          Assistir agora
        </Text>
      </Box>
    </Link>
  );
}
