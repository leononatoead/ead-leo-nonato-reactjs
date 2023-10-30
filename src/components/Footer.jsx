import { Link } from "react-router-dom";

import { Box, Text, useMediaQuery } from "@chakra-ui/react";
import { AiFillInstagram } from "react-icons/ai";
import { FaLinkedinIn, FaTwitter, FaYoutube } from "react-icons/fa";

export default function Footer() {
  const [isLargerThanLg] = useMediaQuery("(min-width: 1024px)");

  return (
    <Box className="z-10 flex flex-col items-center justify-center gap-[40px] bg-gray-200 lg:fixed lg:bottom-0 lg:left-0 lg:right-0 lg:mx-auto lg:w-full lg:max-w-7xl lg:flex-row-reverse lg:justify-between lg:px-4 lg:py-3">
      <Box className="flex items-center justify-center gap-7 text-normal text-gray-300  lg:justify-end">
        <Link
          to="https://twitter.com/leononatotrade"
          className="rounded-md bg-gray-150 p-[6px]"
        >
          <FaTwitter size={16} />
        </Link>
        <Link
          to="https://www.instagram.com/leononatotrader/"
          className="rounded-md bg-gray-150 p-[6px]"
        >
          <AiFillInstagram size={18} />
        </Link>
        <Link to="" className="rounded-md bg-gray-150 p-[6px]">
          <FaLinkedinIn size={16} />
        </Link>
        <Link
          to="https://www.youtube.com/@LeoNonatoTraderOficial"
          className="rounded-md bg-gray-150 p-[6px]"
        >
          <FaYoutube size={16} />
        </Link>
      </Box>

      <Box className="flex flex-col items-center justify-center text-gray-350">
        <Text className="mb-[10px] font-inter text-normal leading-4 lg:mb-0">
          Copyright © 2023 Léo Nonato
        </Text>
        {!isLargerThanLg && (
          <>
            <Text className="font-inter text-large leading-[18px]" mb={"10px"}>
              All Rights Reserved
            </Text>
            <Text className="">
              <Link className="font-inter text-normal leading-[18px] underline">
                Terms and Conditions
              </Link>
              {" | "}
              <Link className="font-inter text-normal leading-[18px] underline">
                Privacy Policy
              </Link>
            </Text>
          </>
        )}
      </Box>
    </Box>
  );
}
