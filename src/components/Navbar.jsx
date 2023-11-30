import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../redux/modules/auth/actions";
import { Link, useNavigate, useLocation, NavLink } from "react-router-dom";

import NotificationsMenu from "./NotificationsMenu";
import LoginModal from "./LoginModal";
import ShareBtn from "./ShareBtn";
import SearchBar from "./SearchBar";
import {
  Box,
  Flex,
  IconButton,
  Image,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import { GiHamburgerMenu } from "react-icons/gi";
import { RiArrowLeftSLine } from "react-icons/ri";
import {
  IoHelpSharp,
  IoLogOutOutline,
  IoLogInOutline,
  IoPersonCircleOutline,
} from "react-icons/io5";
import { IoMdSettings } from "react-icons/io";
import { BiBook, BiNews } from "react-icons/bi";
import { MdContentPaste, MdOutlineSpaceDashboard } from "react-icons/md";
import { BsPersonAdd } from "react-icons/bs";
import { FiUsers } from "react-icons/fi";
import { PiTelevisionSimpleBold } from "react-icons/pi";
import { AiOutlineBarChart } from "react-icons/ai";
import logo from "../assets/auth-logo-black.svg";

export default function Navbar({ title }) {
  const user = useSelector((state) => state.auth.user);
  const { notifications } = useSelector((state) => state.settings);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { pathname } = useLocation();

  const [openLoginModal, setOpenLoginModal] = useState(false);

  const handleBackBtn = () => {
    if (
      pathname === "/profile" ||
      pathname === "/courses/all" ||
      pathname === "/courses/my-courses" ||
      pathname === "/courses/free" ||
      pathname === "/courses/premium" ||
      pathname === "/faq" ||
      pathname === "/dashboard" ||
      pathname === "/dashboard/statistics" ||
      pathname === "/dashboard/settings" ||
      pathname === "/dashboard/courses" ||
      pathname === "/dashboard/faq" ||
      pathname === "/dashboard/posts" ||
      pathname === "/dashboard/users" ||
      pathname === "/dashboard/forms"
    ) {
      navigate("/");
    } else if (
      pathname === "/dashboard/faq/new" ||
      pathname.includes("/dashboard/faq/edit")
    ) {
      navigate("/dashboard/faq");
    } else if (pathname === "/dashboard/courses/new") {
      navigate("/dashboard/courses");
    } else if (
      pathname === "/dashboard/posts/new" ||
      pathname.includes("/dashboard/posts/edit")
    ) {
      navigate("/dashboard/posts");
    } else if (
      pathname === "/dashboard/forms/new" ||
      pathname.includes("/dashboard/forms/edit")
    ) {
      navigate("/dashboard/forms");
    } else if (pathname.includes("/dashboard/statistics/class")) {
      navigate("/dashboard/statistics");
    } else if (pathname.includes("/dashboard/forms/courses/")) {
      const path = pathname.split("/");
      path.pop();
      if (path.length === 4) {
        path.pop();
      }
      const newPath = path.join("/");

      navigate(newPath);
    } else {
      let pathParams = pathname.split("/").filter((value) => value !== "");
      pathParams.pop();

      const newPath = pathParams.join("/");
      navigate(`/${newPath}`);
    }
  };

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/");
  };

  return (
    <header className="flex h-12 w-full items-center justify-center bg-white px-4 py-1 font-bold lg:h-16">
      <Box className="flex h-12 w-full items-center justify-center bg-white px-4 py-1 font-bold lg:hidden">
        {pathname !== "/" && (
          <button onClick={handleBackBtn} className="-ml-2">
            <RiArrowLeftSLine size={25} />
          </button>
        )}
        {pathname === "/" ? (
          <Flex
            alignItems={"center"}
            justifyContent={"space-between"}
            className="flex-1"
          >
            <Link
              to="/"
              className="poppins block text-left font-poppins text-large font-bold leading-6"
            >
              Leo Nonato
            </Link>
            {user && notifications?.length > 0 && (
              <NotificationsMenu notifications={notifications} />
            )}
          </Flex>
        ) : (
          <>
            <span className="block flex-1 px-1 text-center font-poppins text-[17px] font-normal leading-[22px]">
              {title}
            </span>
          </>
        )}

        {pathname === "/" ? (
          <Menu>
            <MenuButton
              as={IconButton}
              aria-label="Options"
              icon={<GiHamburgerMenu size={18} />}
              variant="outline"
              className="-mr-[10px] !border-none !bg-transparent !outline-none focus:!border-none"
            />
            <MenuList className="!flex !min-w-max !-translate-y-2 !flex-col !items-start !justify-center !gap-2 !border-none !p-3 !shadow-lg">
              {!user && (
                <>
                  <MenuItem
                    className="flex !w-full items-center gap-3 rounded-md !border-none !p-2 font-normal leading-[14px]  !outline-none"
                    onClick={() => setOpenLoginModal(true)}
                  >
                    <IoLogInOutline size={20} />
                    <span className="ml-3 font-normal leading-[14px]">
                      Login
                    </span>
                  </MenuItem>
                  <MenuItem className="!bg-transparent !p-0">
                    <Link
                      to="/register"
                      className="flex w-full items-center gap-3 rounded-md p-2 font-normal leading-[14px]"
                    >
                      <BsPersonAdd size={20} />
                      Cadastro
                    </Link>
                  </MenuItem>
                </>
              )}
              {user && user.admin && (
                <>
                  <MenuItem className="!bg-transparent !p-0">
                    <Link
                      to="/dashboard"
                      className="flex items-center gap-3 rounded-md p-2 font-normal leading-[14px]"
                    >
                      <MdOutlineSpaceDashboard size={20} />
                      Painel Admin
                    </Link>
                  </MenuItem>
                </>
              )}

              <MenuItem className="!bg-transparent !p-0">
                <Link
                  to="/courses/all"
                  className="flex w-full items-center gap-3 rounded-md p-2 font-normal leading-[14px]"
                >
                  <PiTelevisionSimpleBold size={20} />
                  Cursos
                </Link>
              </MenuItem>
              <MenuItem className="!bg-transparent !p-0">
                <Link
                  to="/newsletter"
                  className="flex w-full items-center gap-3 rounded-md p-2 font-normal leading-[14px]"
                >
                  <BiNews size={20} />
                  Newsletter
                </Link>
              </MenuItem>
              <MenuItem className="!bg-transparent !p-0">
                <Link
                  to="/faq"
                  className="flex w-full items-center gap-3 rounded-md p-2 font-normal leading-[14px]"
                >
                  <IoHelpSharp size={20} />
                  FAQ
                </Link>
              </MenuItem>

              {user && (
                <>
                  <MenuItem className="!bg-transparent !p-0">
                    <Link
                      to="/courses/my-courses"
                      className="flex w-full items-center gap-3 rounded-md p-2 font-normal leading-[14px]"
                    >
                      <BiBook size={20} />
                      Meus Cursos
                    </Link>
                  </MenuItem>

                  <MenuItem className="!bg-transparent !p-0">
                    <Link
                      to="/profile"
                      className="flex w-full items-center gap-3 rounded-md p-2 font-normal leading-[14px]"
                    >
                      <IoPersonCircleOutline size={20} />
                      Perfil
                    </Link>
                  </MenuItem>
                </>
              )}

              {user && (
                <MenuItem
                  className="flex w-full items-center gap-3 rounded-md !border-none font-normal leading-[14px] !outline-none focus:!bg-white"
                  onClick={handleLogout}
                >
                  <IoLogOutOutline size={20} />
                  <span>Sair</span>
                </MenuItem>
              )}
            </MenuList>
          </Menu>
        ) : pathname.includes("dashboard") ? (
          <Menu>
            <MenuButton
              as={IconButton}
              aria-label="Options"
              icon={<GiHamburgerMenu size={18} />}
              variant="outline"
              className="-mr-[10px] !border-none !bg-transparent !outline-none focus:!border-none"
            />
            <MenuList className="!flex !min-w-max !-translate-y-2 !flex-col !items-start !justify-center !gap-2 !border-none !p-3 !shadow-lg">
              <MenuItem className="!bg-transparent !p-0">
                <Link
                  to="/dashboard/settings"
                  className="flex w-full items-center gap-3 rounded-md p-2 font-normal leading-[14px]"
                >
                  <IoMdSettings size={20} />
                  Configurações
                </Link>
              </MenuItem>
              <MenuItem className="!bg-transparent !p-0">
                <Link
                  to="/dashboard/courses"
                  className="flex w-full items-center gap-3 rounded-md p-2 font-normal leading-[14px]"
                >
                  <PiTelevisionSimpleBold size={20} />
                  Cursos
                </Link>
              </MenuItem>
              <MenuItem className="!bg-transparent !p-0">
                <Link
                  to="/dashboard/posts"
                  className="flex w-full items-center gap-3 rounded-md p-2 font-normal leading-[14px]"
                >
                  <BiNews size={20} />
                  Newsletter
                </Link>
              </MenuItem>

              <MenuItem className="!bg-transparent !p-0">
                <Link
                  to="/dashboard/forms"
                  className="flex w-full items-center gap-3 rounded-md p-2 font-normal leading-[14px]"
                >
                  <MdContentPaste size={20} />
                  Formulários
                </Link>
              </MenuItem>
              <MenuItem className="!bg-transparent !p-0">
                <Link
                  to="/dashboard/users"
                  className="flex w-full items-center gap-3 rounded-md p-2 font-normal leading-[14px]"
                >
                  <FiUsers size={20} />
                  Usuários
                </Link>
              </MenuItem>
              <MenuItem className="!bg-transparent !p-0">
                <Link
                  to="/dashboard/statistics"
                  className="flex w-full items-center gap-3 rounded-md p-2 font-normal leading-[14px]"
                >
                  <AiOutlineBarChart size={20} />
                  Estatísticas
                </Link>
              </MenuItem>
              <MenuItem className="!bg-transparent !p-0">
                <Link
                  to="/dashboard/faq"
                  className="flex w-full items-center gap-3 rounded-md p-2 font-normal leading-[14px]"
                >
                  <IoHelpSharp size={20} />
                  FAQ
                </Link>
              </MenuItem>
            </MenuList>
          </Menu>
        ) : (
          <>
            {pathname.includes("/course/") ? (
              <ShareBtn
                url={`${import.meta.env.VITE_VERCEL_APP_URL}${pathname}`}
              />
            ) : (
              <Box className="w-[17px] text-transparent">'</Box>
            )}
          </>
        )}
      </Box>
      {/* NAVBAR WEB */}
      <Box className="mx-auto !hidden w-full max-w-7xl items-center justify-between lg:!flex lg:h-16">
        <Link to="/" className="pl-4">
          <Image src={logo} />
        </Link>
        <Box className="flex w-full max-w-[500px] items-center justify-around">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `border-b-[3px]  pb-1 font-poppins text-normal font-normal leading-5 hover:border-primary-400 ${
                isActive ? "border-primary-400" : "border-transparent"
              }`
            }
          >
            Início
          </NavLink>
          <NavLink
            to="/courses/all"
            className={({ isActive }) =>
              `border-b-[3px]  pb-1 font-poppins text-normal font-normal leading-5 hover:border-primary-400 ${
                isActive ? "border-primary-400" : "border-transparent"
              }`
            }
          >
            Cursos
          </NavLink>
          <NavLink
            to="/newsletter"
            className={({ isActive }) =>
              `border-b-[3px]  pb-1 font-poppins text-normal font-normal leading-5 hover:border-primary-400 ${
                isActive ? "border-primary-400" : "border-transparent"
              }`
            }
          >
            Newsletter
          </NavLink>
        </Box>
        {pathname.includes("newsletter") ? (
          <SearchBar type={"post"} navbar={true} />
        ) : (
          <SearchBar type={"course"} navbar={true} />
        )}
        <Box className="flex min-w-max items-center gap-4">
          {user && notifications?.length > 0 && (
            <NotificationsMenu notifications={notifications} />
          )}
          {!pathname.includes("dashboard") ? (
            <Menu>
              <MenuButton
                as={IconButton}
                aria-label="Options"
                icon={<GiHamburgerMenu size={18} />}
                variant="outline"
                className="-mr-[10px] !border-none !bg-transparent !outline-none focus:!border-none"
              />
              <MenuList className="!flex !min-w-max !-translate-y-2 !flex-col !items-start !justify-center !gap-[5px] !border-none !p-3 !shadow-lg">
                {!user && (
                  <>
                    <MenuItem
                      className="w-full rounded-md !border-none !p-3 !outline-none hover:bg-gray-150 focus:!bg-gray-150"
                      onClick={() => setOpenLoginModal(true)}
                    >
                      <IoLogInOutline size={20} />
                      <span className="ml-3 font-normal leading-[14px]">
                        Login
                      </span>
                    </MenuItem>
                    <Link
                      to="/register"
                      className="flex w-full items-center gap-3 rounded-md !border-none !p-3 font-normal leading-[14px] !outline-none hover:bg-gray-150 focus:!bg-gray-150"
                    >
                      <BsPersonAdd size={20} />
                      Cadastro
                    </Link>
                  </>
                )}
                {user && user.admin && (
                  <>
                    <Link
                      to="/dashboard"
                      className="flex w-full items-center gap-3 rounded-md !border-none !p-3 font-normal leading-[14px] !outline-none hover:bg-gray-150 focus:!bg-gray-150"
                    >
                      <MdOutlineSpaceDashboard size={20} />
                      Painel Admin
                    </Link>
                  </>
                )}
                <Link
                  to="/faq"
                  className="flex w-full items-center gap-3 rounded-md !border-none !p-3 font-normal leading-[14px] !outline-none hover:bg-gray-150 focus:!bg-gray-150"
                >
                  <IoHelpSharp size={20} />
                  FAQ
                </Link>

                {user && (
                  <>
                    <MenuItem className="!bg-transparent !p-0">
                      <Link
                        to="/courses/my-courses"
                        className="flex w-full items-center gap-3 rounded-md !border-none !p-3 font-normal leading-[14px] !outline-none hover:bg-gray-150 focus:!bg-gray-150"
                      >
                        <BiBook size={20} />
                        Meus Cursos
                      </Link>
                    </MenuItem>
                    <MenuItem className="!bg-transparent !p-0">
                      <Link
                        to="/profile"
                        className="flex w-full items-center gap-3 rounded-md !border-none !p-3 font-normal leading-[14px] !outline-none hover:bg-gray-150 focus:!bg-gray-150"
                      >
                        <IoPersonCircleOutline size={20} />
                        Perfil
                      </Link>
                    </MenuItem>
                  </>
                )}

                {user && (
                  <MenuItem
                    className="flex w-full items-center gap-3 rounded-md !border-none !p-3 font-normal leading-[14px] !outline-none hover:bg-gray-150 focus:!bg-gray-150"
                    onClick={handleLogout}
                  >
                    <span className="flex items-center gap-3 font-normal leading-[14px]">
                      <IoLogOutOutline size={20} />
                      Sair
                    </span>
                  </MenuItem>
                )}
              </MenuList>
            </Menu>
          ) : (
            <Menu>
              <MenuButton
                as={IconButton}
                aria-label="Options"
                icon={<GiHamburgerMenu size={18} />}
                variant="outline"
                className="-mr-[10px] !border-none !bg-transparent !outline-none focus:!border-none"
              />
              <MenuList className="!flex !min-w-max !-translate-y-2 !flex-col !items-start !justify-center !gap-[5px] !border-none !p-3 !shadow-lg">
                <MenuItem className="!bg-transparent !p-0">
                  <Link
                    to="/dashboard/settings"
                    className="flex w-full items-center gap-3 rounded-md !border-none !p-3 font-normal leading-[14px] !outline-none hover:bg-gray-150 focus:!bg-gray-150"
                  >
                    <IoMdSettings size={20} />
                    Configurações
                  </Link>
                </MenuItem>
                <MenuItem className="!bg-transparent !p-0">
                  <Link
                    to="/dashboard/courses"
                    className="flex w-full items-center gap-3 rounded-md !border-none !p-3 font-normal leading-[14px] !outline-none hover:bg-gray-150 focus:!bg-gray-150"
                  >
                    <PiTelevisionSimpleBold size={20} />
                    Cursos
                  </Link>
                </MenuItem>
                <MenuItem className="!bg-transparent !p-0">
                  <Link
                    to="/dashboard/posts"
                    className="flex w-full items-center gap-3 rounded-md !border-none !p-3 font-normal leading-[14px] !outline-none hover:bg-gray-150 focus:!bg-gray-150"
                  >
                    <BiNews size={20} />
                    Newsletter
                  </Link>
                </MenuItem>
                <MenuItem className="!bg-transparent !p-0">
                  <Link
                    to="/dashboard/forms"
                    className="flex w-full items-center gap-3 rounded-md !border-none !p-3 font-normal leading-[14px] !outline-none hover:bg-gray-150 focus:!bg-gray-150"
                  >
                    <MdContentPaste size={20} />
                    Formulários
                  </Link>
                </MenuItem>
                <MenuItem className="!bg-transparent !p-0">
                  <Link
                    to="/dashboard/users"
                    className="flex w-full items-center gap-3 rounded-md !border-none !p-3 font-normal leading-[14px] !outline-none hover:bg-gray-150 focus:!bg-gray-150"
                  >
                    <FiUsers size={20} />
                    Usuários
                  </Link>
                </MenuItem>
                <MenuItem className="!bg-transparent !p-0">
                  <Link
                    to="/dashboard/statistics"
                    className="flex w-full items-center gap-3 rounded-md !border-none !p-3 font-normal leading-[14px] !outline-none hover:bg-gray-150 focus:!bg-gray-150"
                  >
                    <AiOutlineBarChart size={20} />
                    Estatísticas
                  </Link>
                </MenuItem>
                <MenuItem className="!bg-transparent !p-0">
                  <Link
                    to="/dashboard/faq"
                    className="flex w-full items-center gap-3 rounded-md !border-none !p-3 font-normal leading-[14px] !outline-none hover:bg-gray-150 focus:!bg-gray-150"
                  >
                    <IoHelpSharp size={20} />
                    FAQ
                  </Link>
                </MenuItem>
              </MenuList>
            </Menu>
          )}
        </Box>
        <LoginModal
          openLoginModal={openLoginModal}
          setOpenLoginModal={setOpenLoginModal}
        />
      </Box>
    </header>
  );
}
