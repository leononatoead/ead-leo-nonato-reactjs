import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { searchPosts } from "../../redux/modules/posts/actions";
import { useParams } from "react-router-dom";

import Navbar from "../../components/Navbar";
import PostCard from "../../components/Global/Newsletter/PostCard";
import SearchBar from "../../components/SearchBar";
import { Box, Text } from "@chakra-ui/react";

export default function SearchResults() {
  const { id } = useParams();
  const { searchResults } = useSelector((state) => state.posts);

  const dispatch = useDispatch();

  useEffect(() => {
    const search = id
      .toLowerCase()
      .replace(/[áàãâä]/g, "a")
      .replace(/[éèêë]/g, "e")
      .replace(/[íìîï]/g, "i")
      .replace(/[óòõôö]/g, "o")
      .replace(/[úùûü]/g, "u")
      .replace(/ç/g, "c")
      .replace(/[^\w\s]/gi, "")
      .split("-");

    dispatch(searchPosts(search));
  }, [id]);

  return (
    <Box className="flex min-h-[100dvh] flex-col bg-gray-200">
      <Navbar title={"Pesquisa"} />

      <SearchBar type="post" />

      {searchResults?.length > 0 ? (
        <ul className="flex flex-col gap-4 px-4 py-6">
          {searchResults.map((post) => (
            <PostCard post={post} key={post.id} />
          ))}
        </ul>
      ) : (
        <Box className="flex flex-1 flex-col items-center justify-center gap-4 px-4 py-6">
          <Text>Nenhuma postagem encontrada.</Text>
        </Box>
      )}
    </Box>
  );
}
