import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "../../../redux/modules/users/actions";
import { Link } from "react-router-dom";

import { Box, Flex, Text } from "@chakra-ui/react";

import { IoIosSearch, IoMdEye } from "react-icons/io";
import { MdAdminPanelSettings } from "react-icons/md";

export default function Users() {
  const [search, setSearch] = useState("");
  const { userList } = useSelector((state) => state.usersData);
  const dispatch = useDispatch();

  const searchResults = userList?.filter((user) =>
    user.name.toLowerCase().includes(search.toLowerCase()),
  );

  useEffect(() => {
    if (!userList) {
      dispatch(fetchUsers());
    }
  }, [userList]);

  return (
    <Box className="main-container flex flex-col gap-2 bg-gray-200 p-4">
      <Box className="flex w-full  pb-[6px] lg:mx-auto lg:max-w-5xl">
        <Box className="relative w-full">
          <form className="relative w-full" id="search">
            <IoIosSearch
              className="absolute left-2 top-2 cursor-pointer text-gray-800"
              size={20}
            />
            <input
              id="searchField"
              type="text"
              placeholder="Pesquisar"
              onChange={(e) => setSearch(e.target.value)}
              className="h-9 w-full rounded-xl bg-white pl-9 pr-4 outline-none placeholder:text-gray-700"
            />
          </form>
        </Box>
      </Box>
      <Box className="flex w-full flex-col gap-2 lg:mx-auto lg:max-w-5xl">
        {!search
          ? userList?.map((user) => (
              <Link
                key={user.id}
                to={`/dashboard/users/${user.id}/`}
                className="flex w-full items-center justify-between rounded-md bg-white px-4 py-2 font-medium"
              >
                <Flex alignItems={"center"} gap={3}>
                  <Text>{user.name}</Text>
                  {user.admin && (
                    <Flex
                      alignItems={"center"}
                      gap={1}
                      className="flex w-20 items-center justify-center rounded-full bg-green-200  text-white"
                    >
                      <MdAdminPanelSettings className="text-white" />
                      <Text className="text-base font-normal">Admin</Text>
                    </Flex>
                  )}
                </Flex>
                <IoMdEye size={18} className="text-primary-600" />
              </Link>
            ))
          : searchResults.map((user) => (
              <Link
                key={user.id}
                to={`/dashboard/users/${user.id}/`}
                className="flex w-full items-center justify-between rounded-md bg-white px-4 py-2 font-medium"
              >
                <Flex alignItems={"center"} gap={3}>
                  <Text>{user.name}</Text>
                  {user.admin && (
                    <Flex
                      alignItems={"center"}
                      gap={1}
                      className="flex w-20 items-center justify-center rounded-full bg-green-200  text-white"
                    >
                      <MdAdminPanelSettings className="text-white" />
                      <Text className="text-base font-normal">Admin</Text>
                    </Flex>
                  )}
                </Flex>
                <IoMdEye size={18} className="text-primary-600" />
              </Link>
            ))}
      </Box>
    </Box>
  );
}
