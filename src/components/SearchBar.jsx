import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Box } from "@chakra-ui/react";
import { IoIosSearch } from "react-icons/io";

export default function SearchBar({ type }) {
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
    <Box className="relative w-full">
      <form className="relative w-full" onSubmit={handleSearch} id="search">
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
          className="h-9 w-full rounded-xl bg-gray-150 pl-9 pr-4 outline-none placeholder:text-gray-700 lg:bg-white"
        />
      </form>
    </Box>
  );
}
