import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import usePosts from "../../../../../hooks/usePosts";
import useFormat from "../../../../../hooks/useFormat";
import { fetchComments } from "../../../../../redux/modules/posts/actions";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CommentSchema } from "./CommentSchema";

import Input from "../../../../../components/Input";
import ButtonSubmit from "../../../../../components/ButtonSubmit";
import { Box, Heading, Text } from "@chakra-ui/react";

import { IoTrashBinSharp } from "react-icons/io5";

export default function PostComments({ id }) {
  const { user } = useSelector((state) => state.auth);
  const { posts } = useSelector((state) => state.posts);
  const post = posts?.find((post) => post.id === id);
  const { addComment, deleteComment, loading } = usePosts();
  const { formatDate } = useFormat();

  const dispatch = useDispatch();

  const {
    handleSubmit,
    register,
    watch,
    reset,
    formState: { errors },
  } = useForm({ resolver: zodResolver(CommentSchema) });

  const handleAddComment = (formData) => {
    const data = {
      user: user.uid,
      username: user.name,
      comment: formData.comment,
    };

    addComment(post.id, data);
    reset({ comment: "" });
  };

  const handleDeleteComment = (commentId) => {
    deleteComment(id, commentId);
  };

  useEffect(() => {
    if (post && !post.comments) {
      dispatch(fetchComments(post.id));
    }
  }, [post]);

  return (
    <Box className="px-4 pb-6 lg:px-0 lg:pb-0" id="comments">
      <Box className="py-4 lg:py-0">
        <Heading className="!font-poppins !text-large !font-semibold !leading-6  !text-primary-600 ">
          Comentários
        </Heading>

        <form
          id="addCommentForm"
          onSubmit={handleSubmit(handleAddComment)}
          className="flex flex-col gap-1"
        >
          <Input
            theme={"light"}
            type={"textarea"}
            label={""}
            placeholder={"Digite seu comentário aqui"}
            register={register}
            id={"comment"}
            error={errors?.comment?.message}
            watch={watch}
          />

          <ButtonSubmit
            form="addCommentForm"
            disabled={loading}
            text={"Adicionar Comentário"}
            loading={loading}
          />
        </form>

        {post?.comments?.length > 0 && (
          <ul className="flex flex-col gap-2 py-6 lg:pb-0">
            {post?.comments?.map((comment) => (
              <li
                key={comment.id}
                className="rounded-xl border-[1px] border-gray-250 p-2 shadow-sm"
              >
                <Box className="flex items-center justify-between">
                  <Heading className="!font-poppins !text-base !font-semibold !leading-6  !text-primary-600 ">
                    {comment.username}
                  </Heading>
                  {user.uid === comment.user ? (
                    <button onClick={() => handleDeleteComment(comment.id)}>
                      <IoTrashBinSharp className="text-red-500" />
                    </button>
                  ) : user.admin ? (
                    <button onClick={() => handleDeleteComment(comment.id)}>
                      <IoTrashBinSharp className="text-red-500" />
                    </button>
                  ) : (
                    ""
                  )}
                </Box>
                <Text className="text-base">{comment.comment}</Text>
                <Text className="text-end text-small text-gray-400">
                  {formatDate(comment.createdAt)}
                </Text>
              </li>
            ))}
          </ul>
        )}
      </Box>
    </Box>
  );
}
