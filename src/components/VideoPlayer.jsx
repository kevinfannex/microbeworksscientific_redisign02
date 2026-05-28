import { AnimatePresence, motion, useSpring } from "framer-motion";
import { Play, Plus } from "lucide-react";
import {
  MediaControlBar,
  MediaController,
  MediaMuteButton,
  MediaPlayButton,
  MediaSeekBackwardButton,
  MediaSeekForwardButton,
  MediaTimeDisplay,
  MediaTimeRange,
  MediaVolumeRange,
} from "media-chrome/react";
import React, { useState } from "react";
import { cn } from "../lib/utils";

export const VideoPlayer = ({ style, className, ...props }) => (
  <MediaController
    className={cn("bg-transparent", className)}
    style={{
      ...style,
    }}
    {...props}
  />
);

export const VideoPlayerControlBar = (props) => (
  <MediaControlBar {...props} />
);

export const VideoPlayerTimeRange = ({
  className,
  ...props
}) => (
  <MediaTimeRange
    className={cn(
      "[--media-range-thumb-opacity:0] [--media-range-track-height:2px]",
      className,
    )}
    {...props}
  />
);

export const VideoPlayerTimeDisplay = ({
  className,
  ...props
}) => (
  <MediaTimeDisplay className={cn("p-2.5", className)} {...props} />
);

export const VideoPlayerVolumeRange = ({
  className,
  ...props
}) => (
  <MediaVolumeRange className={cn("p-2.5", className)} {...props} />
);

export const VideoPlayerPlayButton = ({
  className,
  ...props
}) => (
  <MediaPlayButton className={cn("", className)} {...props} />
);

export const VideoPlayerSeekBackwardButton = ({
  className,
  ...props
}) => (
  <MediaSeekBackwardButton className={cn("p-2.5", className)} {...props} />
);

export const VideoPlayerSeekForwardButton = ({
  className,
  ...props
}) => (
  <MediaSeekForwardButton className={cn("p-2.5", className)} {...props} />
);

export const VideoPlayerMuteButton = ({
  className,
  ...props
}) => (
  <MediaMuteButton className={cn("", className)} {...props} />
);

export const VideoPlayerContent = ({
  className,
  ...props
}) => (
  <video className={cn("mb-0 mt-0", className)} {...props} />
);

export const MicrobVideoSection = ({ videoSrc, thumbnailSrc }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className="relative w-full rounded-[24px] md:rounded-[40px] overflow-hidden bg-white dark:bg-black aspect-video group">
      {!isPlaying ? (
        <div
          onClick={() => setIsPlaying(true)}
          className="w-full h-full cursor-pointer relative flex items-center justify-center"
        >
          <img
            src={thumbnailSrc}
            alt="Video thumbnail"
            className="absolute inset-0 w-full h-full object-cover dark:object-contain scale-[1.15] dark:scale-100 opacity-90 group-hover:opacity-100 transition-all duration-700"
          />
          <div className="relative z-10 w-20 h-20 rounded-full bg-[#4fa9e2]/90 flex items-center justify-center border border-white/20 group-hover:scale-110 group-hover:bg-[#4fa9e2] transition-all duration-300 shadow-[0_0_20px_rgba(79,169,226,0.3)]">
            <Play className="w-8 h-8 text-white ml-1" />
          </div>
        </div>
      ) : (
        <VideoPlayer className="bg-transparent" style={{ width: "100%", height: "100%" }}>
          <VideoPlayerContent
            src={videoSrc}
            autoPlay
            slot="media"
            className="w-full h-full object-cover bg-transparent"
          />
          <VideoPlayerControlBar className="absolute bottom-0 left-0 right-0 flex w-full items-center justify-between px-6 py-4 bg-gradient-to-t from-black/80 to-transparent">
            <div className="flex items-center gap-4 flex-1">
              <VideoPlayerPlayButton className="h-6 w-6 bg-transparent text-white hover:text-accent transition-colors" />
              <VideoPlayerTimeRange className="flex-1 bg-transparent" />
            </div>
            <div className="flex items-center gap-4 ml-4">
              <VideoPlayerMuteButton className="h-6 w-6 bg-transparent text-white hover:text-accent transition-colors" />
            </div>
          </VideoPlayerControlBar>
        </VideoPlayer>
      )}
    </div>
  );
};
