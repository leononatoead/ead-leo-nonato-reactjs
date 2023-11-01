import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Box } from "@chakra-ui/react";
import { IoIosSearch } from "react-icons/io";

export default function SearchBar({ type, navbar, searchPage }) {
  const [search, setSearch] = useState("");

  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();

    const searchURL = search
      .toLowerCase()
      .replace(/[áàãâä]/g, "a")
      .replace(/[éèêë]/g, "e")
      .replace(/[íìîï]/g, "i")
      .replace(/[óòõôö]/g, "o")
      .replace(/[úùûü]/g, "u")
      .replace(/ç/g, "c")
      .replace(/[^\w\s]/gi, "")
      .replace(" ", "-");

    if (type === "course") {
      navigate(`/courses/search/${searchURL}`);
    } else if (type === "post") {
      navigate(`/newsletter/search/${searchURL}`);
    }
  };

  return (
    <Box className={`relative w-full  ${navbar && "lg:max-w-[290px]"}`}>
      <form
        className={`relative w-full  ${navbar && "lg:max-w-[290px]"}`}
        onSubmit={handleSearch}
        id="search"
      >
        <IoIosSearch
          className="absolute left-2 top-2 cursor-pointer text-gray-800"
          size={20}
          onClick={handleSearch}
        />
        <input
          id="searchField"
          type="text"
          placeholder="Pesquisar"
          onChange={(e) => setSearch(e.target.value)}
          className={`h-9 w-full rounded-xl bg-gray-150 pl-9 pr-4 font-medium outline-none placeholder:text-gray-700 ${
            navbar
              ? "placeholder:font-medium lg:max-w-[290px] lg:bg-gray-150"
              : "lg:bg-white"
          } ${searchPage && "!bg-white"}`}
        />
      </form>
    </Box>
  );
}
