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

export const VideoPlayer = ({ style, ...props }) => (
  <MediaController
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

export const MicrobVideoSection = ({ videoSrc }) => {
  const [showVideoPopOver, setShowVideoPopOver] = useState(false);

  const SPRING = {
    mass: 0.1,
  };

  const x = useSpring(0, SPRING);
  const y = useSpring(0, SPRING);
  const opacity = useSpring(0, SPRING);

  const handlePointerMove = (e) => {
    opacity.set(1);
    const bounds = e.currentTarget.getBoundingClientRect();
    x.set(e.clientX - bounds.left);
    y.set(e.clientY - bounds.top);
  };

  return (
    <div className="relative w-full rounded-[24px] md:rounded-[40px] overflow-hidden bg-black aspect-video mb-24">
      <AnimatePresence>
        {showVideoPopOver && (
          <VideoPopOver videoSrc={videoSrc} setShowVideoPopOver={setShowVideoPopOver} />
        )}
      </AnimatePresence>
      <div
        onMouseMove={handlePointerMove}
        onMouseLeave={() => {
          opacity.set(0);
        }}
        onClick={() => setShowVideoPopOver(true)}
        className="w-full h-full cursor-none relative"
      >
        <motion.div
          style={{ x, y, opacity }}
          className="absolute z-20 flex select-none items-center justify-center gap-2 p-4 text-sm text-white mix-blend-exclusion pointer-events-none bg-white/10 backdrop-blur-md rounded-full border border-white/20"
        >
          <Play className="size-4 fill-white" /> Play Experience
        </motion.div>
        
        <video
          autoPlay
          muted
          playsInline
          loop
          className="h-full w-full object-cover opacity-60 hover:opacity-80 transition-opacity duration-700"
        >
          <source src={videoSrc} />
        </video>

        <div className="absolute inset-0 flex flex-col items-center justify-center text-white pointer-events-none">
          <span className="text-xs uppercase tracking-[0.3em] opacity-60 mb-4 font-mono">Click to play video</span>
        </div>
      </div>
    </div>
  );
};

const VideoPopOver = ({
  videoSrc,
  setShowVideoPopOver,
}) => {
  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-10">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="absolute inset-0 bg-black/95 backdrop-blur-2xl"
        onClick={() => setShowVideoPopOver(false)}
      ></motion.div>
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{
          duration: 0.5,
          type: "spring",
          stiffness: 100,
          damping: 20,
        }}
        className="relative aspect-video w-full max-w-6xl z-10 rounded-[20px] md:rounded-[30px] overflow-hidden shadow-2xl border border-white/10"
      >
        <VideoPlayer style={{ width: "100%", height: "100%" }}>
          <VideoPlayerContent
            src={videoSrc}
            autoPlay
            slot="media"
            className="w-full h-full object-cover"
          />

          <button
            onClick={() => setShowVideoPopOver(false)}
            className="absolute right-4 top-4 z-20 cursor-pointer rounded-full bg-white/10 hover:bg-white/20 p-2 backdrop-blur-md border border-white/20 transition-all hover:scale-110 active:scale-95"
          >
            <Plus className="size-6 rotate-45 text-white" />
          </button>
          
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
      </motion.div>
    </div>
  );
};
