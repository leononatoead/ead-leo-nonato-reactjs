import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../redux/modules/auth/actions";
import { Link, useNavigate, useLocation } from "react-router-dom";

import LoginModal from "./LoginModal";
import ShareBtn from "./ShareBtn";
import {
  Box,
  IconButton,
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
import {
  MdContentPaste,
  MdOutlineNotificationsNone,
  MdOutlineSpaceDashboard,
} from "react-icons/md";
import { BsPersonAdd } from "react-icons/bs";
import { FiUsers } from "react-icons/fi";
import { PiTelevisionSimpleBold } from "react-icons/pi";

export default function Navbar({ title }) {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const path = useLocation();

  const [openLoginModal, setOpenLoginModal] = useState(false);

  const handleBackBtn = () => {
    const URL = path.pathname;

    const URLParamsArray = URL.split("/");

    let removeBlank = URLParamsArray.filter((value) => value !== "");

    removeBlank.pop();

    if (
      removeBlank.includes("edit") ||
      removeBlank.includes("whatsapp") ||
      removeBlank.includes("registervideo") ||
      removeBlank.includes("studantclasses")
    ) {
      removeBlank.pop();
    }

    if (removeBlank.includes("course") && removeBlank.length === 1) {
      removeBlank.pop();
    }

    if (removeBlank.includes("post") && removeBlank.length === 2) {
      removeBlank.pop();
    }

    if (removeBlank.includes("banners") && removeBlank.length === 3) {
      removeBlank.pop();
    }

    if (removeBlank.length > 0) {
      const newURL = removeBlank.join("/");
      const path = `/${newURL}`;
      navigate(path);
    } else {
      navigate("/");
    }
  };

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/");
  };

  return (
    <header className="flex h-12 w-full items-center justify-center bg-white px-4 py-1 font-bold">
      {path.pathname !== "/" && (
        <button onClick={handleBackBtn} className="-ml-2">
          <RiArrowLeftSLine size={25} />
        </button>
      )}
      {path.pathname === "/" ? (
        <Link
          to="/"
          className="poppins block flex-1 text-left font-poppins text-large font-bold leading-6"
        >
          Leo Nonato
        </Link>
      ) : (
        <span className="block flex-1 px-1 text-center font-poppins text-[17px] font-normal leading-[22px]">
          {title}
        </span>
      )}

      {path.pathname === "/" ? (
        <Menu>
          <MenuButton
            as={IconButton}
            aria-label="Options"
            icon={<GiHamburgerMenu />}
            variant="outline"
            className="-mr-[10px] !border-none !bg-transparent !outline-none focus:!border-none"
          />
          <MenuList
            className="!flex !min-w-max !-translate-y-2 !flex-col !items-start !justify-center !gap-[5px] !border-none !shadow-lg"
            px={3}
            py={2}
          >
            {!user && (
              <>
                <MenuItem
                  className="!border-none !outline-none focus:!bg-white"
                  px={"6px"}
                  py={"3px"}
                  onClick={() => setOpenLoginModal(true)}
                >
                  <IoLogInOutline size={20} />
                  <span className="ml-3 font-normal leading-[14px]">Login</span>
                </MenuItem>
                <MenuItem
                  px={"6px"}
                  py={"3px"}
                  className="!border-none !outline-none focus:!bg-white"
                >
                  <Link
                    to="/register"
                    className="flex items-center gap-3 font-normal leading-[14px]"
                  >
                    <BsPersonAdd size={20} />
                    Cadastro
                  </Link>
                </MenuItem>
              </>
            )}
            {user && user.admin && (
              <>
                <MenuItem
                  px={"6px"}
                  py={"3px"}
                  className="!border-none !outline-none focus:!bg-white"
                >
                  <Link
                    to="/dashboard"
                    className="flex items-center gap-3 font-normal leading-[14px]"
                  >
                    <MdOutlineSpaceDashboard size={20} />
                    Painel Admin
                  </Link>
                </MenuItem>
              </>
            )}

            <MenuItem
              px={"6px"}
              py={"3px"}
              className="!border-none !outline-none focus:!bg-white"
            >
              <Link
                to="/courses/all"
                className="flex items-center gap-3 font-normal leading-[14px]"
              >
                <PiTelevisionSimpleBold size={20} />
                Cursos
              </Link>
            </MenuItem>
            <MenuItem
              px={"6px"}
              py={"3px"}
              className="!border-none !outline-none focus:!bg-white"
            >
              <Link
                to="/newsletter"
                className="flex items-center gap-3 font-normal leading-[14px]"
              >
                <BiNews size={20} />
                Newsletter
              </Link>
            </MenuItem>
            <MenuItem
              px={"6px"}
              py={"3px"}
              className="!border-none !outline-none focus:!bg-white"
            >
              <Link
                to="/faq"
                className="flex items-center gap-3 font-normal leading-[14px]"
              >
                <IoHelpSharp size={20} />
                FAQ
              </Link>
            </MenuItem>

            {user && (
              <>
                <MenuItem
                  px={"6px"}
                  py={"3px"}
                  className="!border-none !outline-none focus:!bg-white"
                >
                  <Link
                    to="/courses/my-courses"
                    className="flex items-center gap-3 font-normal leading-[14px]"
                  >
                    <BiBook size={20} />
                    Meus Cursos
                  </Link>
                </MenuItem>

                <MenuItem
                  px={"6px"}
                  py={"3px"}
                  className="!border-none !outline-none focus:!bg-white"
                >
                  <Link
                    to="/profile"
                    className="flex items-center gap-3 font-normal leading-[14px]"
                  >
                    <IoPersonCircleOutline size={20} />
                    Perfil
                  </Link>
                </MenuItem>
              </>
            )}

            {user && (
              <MenuItem
                className="flex items-center gap-3 !border-none font-normal leading-[14px] !outline-none focus:!bg-white"
                px={"6px"}
                py={"3px"}
                onClick={handleLogout}
              >
                <IoLogOutOutline size={20} />
                <span>Sair</span>
              </MenuItem>
            )}
          </MenuList>

          <LoginModal
            openLoginModal={openLoginModal}
            setOpenLoginModal={setOpenLoginModal}
          />
        </Menu>
      ) : path.pathname.includes("dashboard") ? (
        <Menu>
          <MenuButton
            as={IconButton}
            aria-label="Options"
            icon={<GiHamburgerMenu />}
            variant="outline"
            className="-mr-[10px] !border-none !bg-transparent !outline-none focus:!border-none"
          />
          <MenuList
            className="!flex !min-w-max !-translate-y-2 !flex-col !items-start !justify-center !gap-[5px] !border-none !shadow-lg"
            px={3}
            py={2}
          >
            <MenuItem
              px={"6px"}
              py={"3px"}
              className="!border-none !outline-none focus:!bg-white"
            >
              <Link
                to="/dashboard/settings"
                className="flex items-center gap-3 font-normal leading-[14px]"
              >
                <IoMdSettings size={20} />
                Configurações
              </Link>
            </MenuItem>
            <MenuItem
              px={"6px"}
              py={"3px"}
              className="!border-none !outline-none focus:!bg-white"
            >
              <Link
                to="/dashboard/courses"
                className="flex items-center gap-3 font-normal leading-[14px]"
              >
                <PiTelevisionSimpleBold size={20} />
                Cursos
              </Link>
            </MenuItem>
            <MenuItem
              px={"6px"}
              py={"3px"}
              className="!border-none !outline-none focus:!bg-white"
            >
              <Link
                to="/dashboard/posts"
                className="flex items-center gap-3 font-normal leading-[14px]"
              >
                <BiNews size={20} />
                Newsletter
              </Link>
            </MenuItem>

            <MenuItem
              px={"6px"}
              py={"3px"}
              className="!border-none !outline-none focus:!bg-white"
            >
              <Link
                to="/dashboard/forms"
                className="flex items-center gap-3 font-normal leading-[14px]"
              >
                <MdContentPaste size={20} />
                Formulários
              </Link>
            </MenuItem>
            <MenuItem
              px={"6px"}
              py={"3px"}
              className="!border-none !outline-none focus:!bg-white"
            >
              <Link
                to="/dashboard/users"
                className="flex items-center gap-3 font-normal leading-[14px]"
              >
                <FiUsers size={20} />
                Usuários
              </Link>
            </MenuItem>
            <MenuItem
              px={"6px"}
              py={"3px"}
              className="!border-none !outline-none focus:!bg-white"
            >
              <Link
                to="/dashboard/faq"
                className="flex items-center gap-3 font-normal leading-[14px]"
              >
                <IoHelpSharp size={20} />
                FAQ
              </Link>
            </MenuItem>
          </MenuList>
        </Menu>
      ) : (
        <>
          {path.pathname.includes("/course/") ? (
            <ShareBtn
              url={`${import.meta.env.VITE_VERCEL_APP_URL}${path.pathname}`}
            />
          ) : (
            <Box className="w-[17px] text-transparent">'</Box>
          )}
        </>
      )}
    </header>
  );
}
