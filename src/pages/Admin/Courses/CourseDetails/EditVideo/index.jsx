import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchVideos } from "../../../../../redux/modules/courses/actions";
import useVideo from "../../../../../hooks/useVideo";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AddVideoSchema } from "../NewVideo/addVideoSchema";
import { useLocation, useNavigate } from "react-router-dom";

import ButtonSubmit from "../../../../../components/Global/ButtonSubmit";
import Input from "../../../../../components/Global/Input";
import Assets from "../../../../../components/Admin/NewVideo/Assets";
import Advertisement from "../../../../../components/Admin/NewVideo/Advertisement";
import Quiz from "../../../../../components/Admin/NewVideo/Quiz";
import Survey from "../../../../../components/Admin/NewVideo/Survey";
import { Box, Flex, Switch, Text } from "@chakra-ui/react";
import ConfirmModal from "../../../../../components/Global/ConfirmModal";

export default function EditVideo() {
  const { pathname } = useLocation();
  const path = pathname.split("/");
  const id = path[3];
  const videoId = path[5];

  const { courses } = useSelector((state) => state.courses);
  const course = courses?.find((course) => course.id === id);
  const video = course?.videos?.find((video) => video.id === videoId);

  const [openConfirmModal, setOpenConfirmModal] = useState();
  const [videoData, setVideoData] = useState();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    resolver: zodResolver(AddVideoSchema),
  });

  const { updateVideo, deleteVideo, loading } = useVideo();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSwitch = (type) => {
    if (type === "videoType") {
      setVideoData((prev) => ({
        ...prev,
        video: { video: null, videoType: !prev.video.videoType },
      }));
    } else if (type === "hasAssets") {
      setVideoData((prev) => ({
        ...prev,
        assets: { ...prev.assets, hasAssets: !prev.assets.hasAssets },
      }));
    } else if (type === "assetType") {
      setVideoData((prev) => ({
        ...prev,
        assets: { ...prev.assets, assetType: !prev.assets.assetType },
      }));
    } else if (type === "hasAdvertisement") {
      setVideoData((prev) => ({
        ...prev,
        advertisement: {
          ...prev.advertisement,
          hasAdvertisement: !prev.advertisement.hasAdvertisement,
        },
      }));
    } else if (type === "hasQuiz") {
      setVideoData((prev) => ({
        ...prev,
        quiz: {
          ...prev.quiz,
          hasQuiz: !prev.quiz.hasQuiz,
        },
      }));
    } else if (type === "hasSurvey") {
      setVideoData((prev) => ({
        ...prev,
        survey: {
          ...prev.survey,
          hasSurvey: !prev.survey.hasSurvey,
        },
      }));
    }
  };

  const handleVideoInputChange = (e) => {
    setVideoData((prev) => ({
      ...prev,
      video: { ...prev.video, videoFile: e.target.files[0] },
    }));
  };

  const handlEditVideo = (formData) => {
    let data = { ...video, ...formData };

    if (videoData.assets.hasAssets) {
      data = {
        ...data,
        assetsList: [...videoData.assets.assetsList],
      };
    }

    if (videoData.advertisement.hasAdvertisement) {
      data = {
        ...data,
        advertisementList: [...videoData.advertisement.advertisementList],
      };
    }

    if (videoData.quiz.hasQuiz) {
      data = {
        ...data,
        questionsList: [...videoData.quiz.questionsList],
      };
    }

    if (videoData.survey.hasSurvey) {
      data = {
        ...data,
        survey: videoData.survey.survey,
      };
    }

    if (formData.videoPath && formData.videoPath.includes("pandavideo")) {
      const idMatch = formData.videoPath.match(/id="([^"]+)"/);
      const srcMatch = formData.videoPath.match(/src="([^"]+)"/);

      const id = idMatch ? idMatch[1] : "Nenhum ID encontrado";
      const src = srcMatch ? srcMatch[1] : "Nenhum SRC encontrado";

      data = {
        ...data,
        videoFrame: { id, src },
        videoPath: null,
        storageRef: null,
      };
    } else if (formData.videoPath && formData.videoPath.includes("youtube")) {
      try {
        const urlObj = new URL(formData.videoPath);
        const check =
          urlObj.protocol === "http:" || urlObj.protocol === "https:";
        if (!check) {
          return;
        }

        data = {
          ...data,
          videoPath: formData.videoPath,
          storageRef: null,
        };
      } catch {
        return toast({
          description: "Adicione uma URL válida",
          status: "error",
          duration: "3000",
          isClosable: true,
        });
      }
    } else if (videoData.video.videoType) {
      data = {
        ...data,
        videoFile: videoData.video.videoFile,
      };
    }

    if (!formData.videoPath) {
      delete data.videoPath;
      delete data.videoFrame;
      delete data.storageRef;
    }

    updateVideo(id, video, data, `courses/${id}/videos`);
  };

  const handleDeleteVideo = () => {
    deleteVideo(id, video);
    navigate(`/dashboard/courses/${id}`);
  };

  useEffect(() => {
    if (!course?.videos) {
      dispatch(fetchVideos(id));
    }
  }, [course, id]);

  useEffect(() => {
    if (video) {
      setVideoData({
        video: {
          videoFile: null,
          videoType: video?.videoPath ? false : true,
          videoFrame: video.videoFrame ? video.videoFrame : null,
        },
        assets: {
          hasAssets: video?.assetsList ? true : false,
          assetsList: video?.assetsList ? video.assetsList : [],
          assetFile: null,
          assetType: true,
        },
        quiz: {
          hasQuiz: video?.questionsList ? true : false,
          questionsList: video?.questionsList ? video.questionsList : [],
        },
        survey: {
          hasSurvey: video?.survey ? true : false,
          survey: video?.survey ? video.survey : null,
        },
        advertisement: {
          hasAdvertisement: video?.advertisementList ? true : false,
          advertisementList: video?.advertisementList
            ? video.advertisementList
            : [],
        },
      });
    }
  }, [video]);

  return (
    <Box className="main-container">
      <Box className="flex items-center justify-start gap-4" mb={"5px"}>
        <Text className="text-base font-bold text-primary-600">
          Tipo de vídeo:
        </Text>
        <Box className="flex items-center justify-start gap-4">
          <Switch
            id="videoType"
            onChange={() => handleSwitch("videoType")}
            isChecked={videoData?.video.videoType}
          />
          <label htmlFor={"videoType"} className="text-base leading-5">
            {videoData?.video.videoType ? "Arquivo" : "URL"}
          </label>
        </Box>
      </Box>
      <form
        onSubmit={handleSubmit(handlEditVideo)}
        id="editVideoForm"
        className="flex flex-col gap-[10px] pb-4 pt-2"
      >
        {videoData?.video.videoType ? (
          <Box className="mb-4">
            <label
              htmlFor={"videoFile"}
              className="mb-[9px] block text-base leading-5"
            >
              Vídeo
            </label>
            <input
              type="file"
              name="videoFile"
              onChange={handleVideoInputChange}
              multiple={false}
              accept="video/*"
              title="Selecione um vídeo"
              className="w-full text-base outline-none"
            />
          </Box>
        ) : (
          <Input
            theme={"light"}
            type={"code"}
            label={"IFrame Panda ou Youtube Embed URL"}
            placeholder={
              "<iframe id={...} src={...}></iframe> ou www.youtube.com/embed/"
            }
            register={register}
            id={"videoPath"}
            error={errors?.videoPath?.message}
            watch={watch}
          />
        )}
        <Box className="pb-[5px]">
          <label
            htmlFor={"section"}
            className="mb-[9px] block text-base leading-5"
          >
            Seção
          </label>
          <select
            id="section"
            {...register("section")}
            className={`w-full rounded-[4px] bg-white px-3 py-[5px] text-base leading-5 shadow-sm shadow-gray-900/50 outline-none placeholder:text-gray-900`}
            defaultValue={video?.section}
          >
            {course?.sections?.map((section, i) => (
              <option key={i} value={section.sectionName}>
                {section.sectionName}
              </option>
            ))}
          </select>
        </Box>
        <Input
          theme={"light"}
          type={"number"}
          label={"Ordem"}
          placeholder={"Digite aqui"}
          register={register}
          id={"order"}
          error={errors?.order?.message}
          watch={watch}
          defaultValue={video?.order}
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
          defaultValue={video?.title}
        />
        <Input
          theme={"light"}
          type={"text"}
          label={"Descrição"}
          placeholder={"Digite aqui"}
          register={register}
          id={"description"}
          error={errors?.description?.message}
          watch={watch}
          defaultValue={video?.description}
        />
      </form>
      <Box className="flex items-center justify-start gap-4" mb={"5px"}>
        <Text className="text-base font-bold text-primary-600">
          Material Complementar
        </Text>
        <Box className="flex items-center justify-start gap-4">
          <Switch
            id="hasAssets"
            onChange={() => handleSwitch("hasAssets")}
            isChecked={videoData?.assets?.hasAssets}
          />
        </Box>
      </Box>
      {videoData?.assets?.hasAssets && (
        <>
          <Box className="flex items-center justify-start gap-4" my={"16px"}>
            <Text className="text-base font-bold text-primary-600">
              Tipo de material:
            </Text>
            <Box className="flex items-center justify-start gap-4">
              <Switch
                id="assetType"
                onChange={() => handleSwitch("assetType")}
                defaultChecked
              />
              <label htmlFor={"assetType"} className="text-base leading-5">
                {videoData?.assets?.assetType ? "Arquivo" : "URL"}
              </label>
            </Box>
          </Box>
          <Assets videoData={videoData} setVideoData={setVideoData} />
        </>
      )}
      <Box className="flex items-center justify-start gap-4" my={"16px"}>
        <Text className="text-base font-bold text-primary-600">Anúncios</Text>
        <Box className="flex items-center justify-start gap-4">
          <Switch
            id="hasAdvertisement"
            onChange={() => handleSwitch("hasAdvertisement")}
            isChecked={videoData?.advertisement.hasAdvertisement}
          />
        </Box>
      </Box>
      {videoData?.advertisement.hasAdvertisement && (
        <Advertisement videoData={videoData} setVideoData={setVideoData} />
      )}
      <Box className="flex items-center justify-start gap-4" my={"16px"}>
        <Text className="text-base font-bold text-primary-600">
          Questionário
        </Text>
        <Box className="flex items-center justify-start gap-4">
          <Switch
            id="hasQuiz"
            onChange={() => handleSwitch("hasQuiz")}
            isChecked={videoData?.quiz.hasQuiz}
          />
        </Box>
      </Box>
      {videoData?.quiz.hasQuiz && (
        <Quiz videoData={videoData} setVideoData={setVideoData} />
      )}
      <Box className="flex items-center justify-start gap-4" my={"16px"}>
        <Text className="text-base font-bold text-primary-600">Enquete</Text>
        <Box className="flex items-center justify-start gap-4">
          <Switch
            id="hasSurvey"
            onChange={() => handleSwitch("hasSurvey")}
            isChecked={videoData?.survey.hasSurvey}
          />
        </Box>
      </Box>
      {videoData?.survey.hasSurvey && (
        <Survey videoData={videoData} setVideoData={setVideoData} />
      )}

      <Flex flexDirection={"column"} gap={2}>
        <ButtonSubmit
          form="editVideoForm"
          disabled={loading}
          text={"Editar"}
          loading={loading}
        />
        <ConfirmModal
          deleteFunction={handleDeleteVideo}
          open={openConfirmModal}
          setOpen={setOpenConfirmModal}
        />
      </Flex>
    </Box>
  );
}
