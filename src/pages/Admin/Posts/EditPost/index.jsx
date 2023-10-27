import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts } from "../../../../redux/modules/posts/actions";
import usePosts from "../../../../hooks/usePosts";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { PostSchema } from "../NewPost/PostSchema";
import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertFromRaw, convertToRaw } from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { useNavigate, useParams } from "react-router-dom";

import Input from "../../../../components/Input";
import ButtonSubmit from "../../../../components/ButtonSubmit";
import ConfirmModal from "../../../../components/ConfirmModal";
import { Box, Flex } from "@chakra-ui/react";

export default function EditPost() {
  const { id } = useParams();
  const { posts, pages, currentPage } = useSelector((state) => state.posts);
  const post = posts?.find((post) => post.id === id);

  const [openConfirmModal, setOpenConfirmModal] = useState();
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const handleEditorChange = (newEditorState) => {
    setEditorState(newEditorState);
  };

  const {
    handleSubmit,
    register,
    watch,
    reset,
    formState: { errors },
  } = useForm({ resolver: zodResolver(PostSchema) });

  const { updatePost, deletePost, loading } = usePosts();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleEditPost = (formData) => {
    const contentState = editorState.getCurrentContent();
    const contentRaw = convertToRaw(contentState);
    const contentStr = JSON.stringify(contentRaw);

    const searchStr = formData.title
      .toLowerCase()
      .replace(/[áàãâä]/g, "a")
      .replace(/[éèêë]/g, "e")
      .replace(/[íìîï]/g, "i")
      .replace(/[óòõôö]/g, "o")
      .replace(/[úùûü]/g, "u")
      .replace(/ç/g, "c")
      .replace(/[^\w\s]/gi, "")
      .split(" ");

    const data = { ...formData, postContent: contentStr, searchStr };
    updatePost(id, data);
  };

  const handleDeletePost = () => {
    const page = pages?.find((page) => page.page === currentPage);
    const lastPostId = page.posts[page.posts.length - 1].id;
    deletePost(id, lastPostId);
    navigate("/dashboard/posts");
  };

  useEffect(() => {
    if (post) {
      const contentRaw = JSON.parse(post?.postContent);
      const contentState = convertFromRaw(contentRaw);
      setEditorState(EditorState.createWithContent(contentState));
    }
  }, [post]);

  useEffect(() => {
    if (!posts) {
      dispatch(fetchPosts());
    }
  }, []);

  return (
    <Box className="main-container flex flex-col bg-gray-200">
      <form
        id="newPostForm"
        className="flex flex-col gap-[10px] pb-[10px]"
        onSubmit={handleSubmit(handleEditPost)}
      >
        <Box>
          <label
            htmlFor={"category"}
            className="mb-[9px] block text-base leading-5"
          >
            Tipo
          </label>
          <select
            defaultValue={post?.category}
            id="category"
            {...register("category")}
            className={`w-full rounded-[4px] bg-white px-3 py-[5px] text-base leading-5 shadow-sm shadow-gray-900/50 outline-none placeholder:text-gray-900`}
          >
            <option value="Ações">Ações</option>
            <option value="Dólar">Dólar</option>
            <option value="Fundos">Fundos</option>
            <option value="Investimentos">Investimentos</option>
          </select>
          {errors?.category?.message ? (
            <span className="-mt-1 text-small text-red-500">
              {errors?.category?.message}
            </span>
          ) : (
            errors?.placeholder?.message && (
              <span className="-mt-1 text-small text-transparent">a</span>
            )
          )}
        </Box>
        <Input
          theme={"light"}
          type={"text"}
          label={"Thumbnail"}
          placeholder={"Digite aqui"}
          register={register}
          id={"thumb"}
          error={errors?.thumb?.message}
          watch={watch}
          defaultValue={post?.thumb}
        />
        <Input
          theme={"light"}
          type={"text"}
          label={"Título"}
          placeholder={"Digite aqui"}
          register={register}
          id={"title"}
          error={errors?.title?.message}
          watch={watch}
          defaultValue={post?.title}
        />
        <Input
          theme={"light"}
          type={"text"}
          label={"Autor"}
          placeholder={"Digite aqui"}
          register={register}
          id={"author"}
          error={errors?.author?.message}
          watch={watch}
          defaultValue={post?.author}
        />
      </form>
      <Box className="flex flex-grow flex-col overflow-hidden rounded-md pb-4">
        <label className="mb-[9px] text-base leading-5">Post</label>
        <Editor
          editorState={editorState}
          onEditorStateChange={handleEditorChange}
          toolbarClassName="w-full flex flex-wrap items-center justify-start border-none rounded-md shadow-sm shadow-gray-900/50 !font-poppins"
          editorClassName="px-4 min-h-[200px] bg-white border-none rounded-md shadow-sm shadow-gray-900/50 !font-poppins"
          toolbar={{
            options: [
              "fontSize",
              "inline",
              "textAlign",
              "image",
              "list",
              "colorPicker",
            ],
            inline: {
              options: ["bold", "italic", "underline"],
              bold: {
                className:
                  "w-8 h-8 !rounded-lg bg-gray-200 !rounded-lg bg-gray-200",
              },
              italic: {
                className:
                  "w-8 h-8 !rounded-lg bg-gray-200 !rounded-lg bg-gray-200",
              },
              underline: {
                className:
                  "w-8 h-8 !rounded-lg bg-gray-200 !rounded-lg bg-gray-200",
              },
            },
            fontSize: {
              options: [
                8, 9, 10, 11, 12, 14, 16, 18, 24, 30, 36, 48, 60, 72, 96,
              ],
              className: "h-8 !rounded-lg bg-gray-200",
            },
            list: {
              options: ["unordered", "ordered"],
              unordered: { className: "w-8 h-8 !rounded-lg bg-gray-200" },
              ordered: { className: "w-8 h-8 !rounded-lg bg-gray-200" },
            },
            textAlign: {
              inDropdown: false,
              options: ["left", "center", "right", "justify"],
              left: { className: "w-8 h-8 !rounded-lg bg-gray-200" },
              center: { className: "w-8 h-8 !rounded-lg bg-gray-200" },
              right: { className: "w-8 h-8 !rounded-lg bg-gray-200" },
              justify: { className: "w-8 h-8 !rounded-lg bg-gray-200" },
            },
            link: {
              inDropdown: false,
              showOpenOptionOnHover: true,
              defaultTargetOption: "_self",
              options: ["link", "unlink"],
              link: { className: "w-8 h-8 !rounded-lg bg-gray-200" },
              unlink: { className: "w-8 h-8 !rounded-lg bg-gray-200" },
            },

            image: {
              urlEnabled: true,
              uploadEnabled: true,
              alignmentEnabled: true,
              previewImage: false,
              inputAccept: "image/gif,image/jpeg,image/jpg,image/png,image/svg",
              alt: { present: false, mandatory: false },
              defaultSize: {
                height: "auto",
                width: "auto",
              },
              className: "w-8 h-8 !rounded-lg bg-gray-200",
            },
            colorPicker: {
              className: "w-8 h-8 !rounded-lg bg-gray-200",
            },
          }}
        />
      </Box>

      <Flex flexDirection={"column"} gap={2}>
        <ButtonSubmit
          form="newPostForm"
          disabled={loading}
          text={"Editar Post"}
          loading={loading}
        />
        <ConfirmModal
          deleteFunction={handleDeletePost}
          open={openConfirmModal}
          setOpen={setOpenConfirmModal}
        />
      </Flex>
    </Box>
  );
}
