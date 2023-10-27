import {
  Menu,
  MenuButton,
  MenuList,
  IconButton,
  MenuItem,
  Text,
  Box,
} from "@chakra-ui/react";
import { IoNotifications, IoNotificationsOffOutline } from "react-icons/io5";
import { PiEye, PiEyeSlash } from "react-icons/pi";

export default function NotificationsModal({ notifications }) {
  console.log(notifications);

  return (
    <Menu>
      <MenuButton
        as={IconButton}
        aria-label="Options"
        icon={
          notifications ? <IoNotifications /> : <IoNotificationsOffOutline />
        }
        variant="outline"
        className=" !border-none !bg-transparent !outline-none focus:!border-none"
      />
      <MenuList
        className="!flex !min-w-max !-translate-x-4  !-translate-y-2 !flex-col !items-start !justify-center !gap-2 !border-none !shadow-lg"
        px={2}
        py={2}
      >
        {notifications?.map((notification) => (
          <MenuItem
            key={notification.id}
            className="flex w-full !max-w-[244px] items-center  gap-2 rounded-md !bg-gray-200"
          >
            <Box className="flex w-7 items-center justify-center">
              <PiEye size={20} />
              {/* <PiEyeSlash size={20} /> */}
            </Box>
            <Box className="flex flex-1 flex-col items-start justify-center ">
              <Text className="w-full text-start text-base">
                {notification.title}
              </Text>
              <Text className="!max-w-[184px] !truncate text-start text-small font-normal leading-4">
                {notification.subtitle}
              </Text>
            </Box>
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
}
