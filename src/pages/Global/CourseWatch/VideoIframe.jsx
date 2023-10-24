import { useRef, useState, useEffect } from "react";

import { Box } from "@chakra-ui/react";

export default function VideoIframe({ videoPlayer }) {
  const iframeRef = useRef(null);
  //   const [tempoTotal, setTempoTotal] = useState(0);
  //   const [tempoAtual, setTempoAtual] = useState(0);

  //   useEffect(() => {
  //     const iframe = iframeRef.current;

  //     if (iframe) {
  //       console.log(iframe);
  //       iframe.addEventListener("load", () => {
  //         iframe.addEventListener("click", () => {
  //           console.log("click");
  //         });
  //         // const video = iframe.contentDocument.querySelector("video");
  //         // console.log(video);

  //         // video.addEventListener("play", () => {
  //         //   console.log("O vídeo foi iniciado!");
  //         // });

  //         // video.addEventListener("timeupdate", () => {
  //         //   setTempoTotal(video.duration);
  //         //   setTempoAtual(video.currentTime);
  //         // });
  //       });
  //     }
  //   }, []);

  //   console.log(tempoAtual);
  //   console.log(tempoTotal);

  return (
    <div>
      <Box className="flex min-h-[246px] flex-col items-start justify-between p-4">
        {videoPlayer?.active?.videoFrame ? (
          <iframe
            ref={iframeRef}
            className="max-h-[80vh] min-h-[246px] w-full rounded-lg md:min-h-[400px]"
            id={videoPlayer?.active?.videoFrame?.id}
            src={videoPlayer?.active?.videoFrame?.src}
            allow="accelerometer;gyroscope;autoplay;encrypted-media;picture-in-picture"
            allowFullScreen={true}
          ></iframe>
        ) : (
          <iframe
            ref={iframeRef}
            className="max-h-[80vh] min-h-[246px] w-full rounded-lg md:min-h-[400px]"
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
