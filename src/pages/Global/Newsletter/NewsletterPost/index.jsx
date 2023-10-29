import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchPost,
  fetchPosts,
  setCurrentPost,
} from "../../../../redux/modules/posts/actions";
import useFormat from "../../../../hooks/useFormat";
import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertFromRaw } from "draft-js";
import { useLocation, useParams } from "react-router-dom";

import Like from "./Like";
import PostComments from "./PostComments";
import Navbar from "../../../../components/Navbar";
import PremiumPost from "../../../../components/PremiumPost";
import ShareBtn from "../../../../components/ShareBtn";
import { Box, Heading, Image, Text } from "@chakra-ui/react";
import { FaRegCommentAlt } from "react-icons/fa";

export default function NewsletterPost() {
  const { id } = useParams();
  const { pathname } = useLocation();
  const url = `${import.meta.env.VITE_VERCEL_APP_URL}${pathname}`;
  const { posts, currentPost } = useSelector((state) => state.posts);
  const { user } = useSelector((state) => state.auth);

  const [editorState, setEditorState] = useState();
  const [openPremiumModal, setOpenPremiumModal] = useState(false);

  const { formatDate } = useFormat();
  const dispatch = useDispatch();

  useEffect(() => {
    const post = posts?.find((post) => post.id === id);

    if (post) {
      dispatch(setCurrentPost(post));
    } else {
      dispatch(fetchPost(id));
    }

    if (currentPost && currentPost.postContent) {
      const data = JSON.parse(currentPost.postContent);
      const contentState = convertFromRaw(data);
      const state = EditorState.createWithContent(contentState);
      setEditorState(state);
    }
  }, [currentPost]);

  useEffect(() => {
    if (!user) {
      const handleScroll = () => {
        const scrollThreshold = 100;

        if (window.scrollY >= scrollThreshold) {
          setOpenPremiumModal(true);
        }
      };
      window.addEventListener("scroll", handleScroll);

      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    }
  }, []);

  const smoothScroll = (e) => {
    e.preventDefault();

    const targetElement = document.getElementById("comments");

    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    if (!posts) {
      dispatch(fetchPosts());
    }
  }, []);

  return (
    <Box className="min-h-[100dvh] pb-6 lg:bg-gray-150">
      <Navbar title={currentPost?.category} />
      <Box className="mx-auto max-w-5xl">
        <Box className="px-4 py-6 lg:mt-8 lg:rounded-lg lg:bg-white">
          <Box className="lg justify-between gap-10 lg:flex lg:items-start">
            <Heading className="!font-poppins !text-large !font-bold !leading-6 text-primary-600 lg:!text-[28px] lg:!leading-9">
              {currentPost?.title}
            </Heading>

            <Box className="hidden items-center gap-4 lg:flex">
              <ShareBtn url={url} />
              {user && <Like id={id} />}
              {user && (
                <a href="#comments" onClick={smoothScroll}>
                  <FaRegCommentAlt size={24} className="text-primary-600" />
                </a>
              )}
            </Box>
          </Box>
          <Box className="flex items-center justify-start gap-2 py-2 text-small leading-4 text-gray-700 lg:text-normal ">
            <Text>{currentPost?.author}</Text>
            {`|`}
            <Text>{formatDate(currentPost?.createdAt)}</Text>
            <Box className="lg:hidden">
              <ShareBtn url={url} />
            </Box>
          </Box>
          <Box className="mb-4 h-[1px] w-full bg-gray-200"></Box>
          <Image
            src={currentPost?.thumb}
            alt="thumbnail"
            className="mb-4 h-52 w-full rounded-2xl object-cover"
          />
          <Editor
            editorState={editorState}
            readOnly={true}
            toolbarHidden={true}
          />
        </Box>

        <Box className="px-4 py-6 lg:mt-8 lg:rounded-lg lg:bg-white">
          {user && <Like id={id} />}
          <div id="comments">{user && <PostComments id={id} />}</div>
          {!user && (
            <PremiumPost open={openPremiumModal} close={setOpenPremiumModal} />
          )}
        </Box>
      </Box>
    </Box>
  );
}
