"use client";

const Globe = () => {
  return (
    <video
      muted
      autoPlay
      onEnded={(e) => {
        e.currentTarget.currentTime = 0;
        e.currentTarget.play();
      }}
      src="/animations/globe.mp4"
      className="size-full aspect-square object-cover"
      poster="transparent.png"
    />
  );
};

export default Globe;
