import { useEffect, useState } from "react";

import NotificationModal from "./NotificationModal";
import {
  Menu,
  MenuButton,
  MenuList,
  IconButton,
  MenuItem,
} from "@chakra-ui/react";
import { VscBell, VscBellDot } from "react-icons/vsc";

export default function NotificationsMenu({ notifications }) {
  const [readNotifications, setReadNotifications] = useState(false);
  const [updater, setUpdater] = useState(false);

  useEffect(() => {
    const storageNotifications = JSON.parse(
      localStorage.getItem("readNotifications"),
    );

    if (storageNotifications) {
      const verify = [];
      storageNotifications.map((ntf) => {
        const find = notifications?.find((n) => n.id === ntf);

        if (find) {
          verify.push(find);
        }
      });

      if (verify && verify.length === notifications.length) {
        setReadNotifications(true);
      } else {
        setReadNotifications(false);
      }
    }
  }, [notifications, updater]);

  return (
    <Menu>
      <MenuButton
        as={IconButton}
        aria-label="Options"
        icon={readNotifications ? <VscBell /> : <VscBellDot />}
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
            <NotificationModal
              notification={notification}
              updater={setUpdater}
            />
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
}
