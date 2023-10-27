import {
  Menu,
  MenuButton,
  MenuList,
  IconButton,
  MenuItem,
} from "@chakra-ui/react";
import { VscBell, VscBellDot } from "react-icons/vsc";
import NotificationModal from "./NotificationModal";

export default function NotificationsMenu({ notifications }) {
  return (
    <Menu>
      <MenuButton
        as={IconButton}
        aria-label="Options"
        icon={notifications ? <VscBellDot /> : <VscBell />}
        variant="outline"
        className=" !border-none !bg-transparent !outline-none focus:!border-none"
      />
      <MenuList
        className="!flex !min-w-max  !-translate-y-2 !flex-col !items-start !justify-center !gap-2 !border-none !shadow-lg"
        px={2}
        py={2}
      >
        {notifications?.map((notification) => (
          <MenuItem key={notification.id} p={0}>
            <NotificationModal notification={notification} />
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
}
