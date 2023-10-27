import { Link } from "react-router-dom";

import { Box, Heading, Image, Text } from "@chakra-ui/react";
import { BiEdit } from "react-icons/bi";

export default function NotificationCard({ cardData }) {
  return (
    <Link
      to={`/dashboard/settings/notifications/edit/${cardData.id}`}
      className="flex h-32 w-full items-center gap-3 rounded-lg bg-white p-3 shadow-md"
    >
      <Image
        src={cardData.imageURL}
        alt="thumbnail"
        className="h-[104px] min-w-[120px] max-w-[120px] rounded-sm object-cover"
      />
      <Box className="flex min-h-full w-full flex-col justify-start overflow-hidden">
        <Box className="flex-grow">
          <Heading className="break-title -mt-1 max-h-16 !font-poppins !text-base !font-semibold !leading-5 !text-primary-600">
            {cardData.title}
          </Heading>
          <Text className="break-title text-small text-gray-700 ">
            {cardData.subtitle}
          </Text>
        </Box>
        <Box className="flex w-full items-center justify-end">
          <BiEdit size={18} className="text-primary-600" />
        </Box>
      </Box>
    </Link>
  );
}
