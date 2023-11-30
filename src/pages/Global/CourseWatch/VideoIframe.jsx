import { Box } from "@chakra-ui/react";

export default function VideoIframe({ videoPlayer }) {
  return (
    <div>
      <Box className="flex min-h-[246px] w-full flex-col items-start justify-between p-4 lg:max-h-[516px] lg:min-h-[516px] lg:min-w-[600px]">
        {videoPlayer?.active?.videoFrame ? (
          <iframe
            className="max-h-[80vh] min-h-[246px] w-full !min-w-max rounded-lg md:min-h-[400px] lg:max-h-[500px] lg:min-h-[500px]"
            id={videoPlayer?.active?.videoFrame?.id}
            src={videoPlayer?.active?.videoFrame?.src}
            allow="accelerometer;gyroscope;autoplay;encrypted-media;picture-in-picture"
            allowFullScreen
          ></iframe>
        ) : (
          <iframe
            className="max-h-[80vh] min-h-[246px] w-full !min-w-max rounded-lg md:min-h-[400px] lg:max-h-[500px] lg:min-h-[500px]"
            src={videoPlayer.active.videoPath}
            title={videoPlayer.active.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          ></iframe>
        )}
      </Box>
    </div>
  );
}
