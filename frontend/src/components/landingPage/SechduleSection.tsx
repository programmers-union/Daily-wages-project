import React, { useEffect, useRef, useState } from "react";
// import calVideo from "../../assets/Screen Recording 2024-07-03 131739.mp4";
import calendarS from '../../assets/calendarS.png'
import { Link } from "react-router-dom";

const ScheduleSection: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const [playbackRate, setPlaybackRate] = useState(2);

  useEffect(() => {
    const videoElement = videoRef.current;

    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          if (videoElement) {
            videoElement.play();
          }
        } else {
          if (videoElement) {
            videoElement.pause();
          }
        }
      });
    };

    observerRef.current = new IntersectionObserver(handleIntersection, {
      threshold: 0.5,
    });

    if (videoElement) {
      observerRef.current.observe(videoElement);
    }

    return () => {
      if (observerRef.current && videoElement) {
        observerRef.current.unobserve(videoElement);
      }
    };
  }, []);

  useEffect(() => {
    const videoElement = videoRef.current;

    if (videoElement) {
      const handleEnded = () => {
        setTimeout(() => {
          videoElement.play();
        }, 3000);
      };

      videoElement.addEventListener('ended', handleEnded);

      return () => {
        if (videoElement) {
          videoElement.removeEventListener('ended', handleEnded);
        }
      };
    }
  }, []);

  useEffect(() => {
    const videoElement = videoRef.current;
    if (videoElement) {
      videoElement.playbackRate = playbackRate;
    }
  }, [playbackRate]);

  return (
    <div className="flex justify-center items-center gap-10 h-screen px-10">
      <div className="w-full">
        {/* <video ref={videoRef} width="100%" height="100%" loop muted>
          <source src={calVideo} type="video/mp4" />
          Your browser does not support the video tag.
        </video> */}
        <img className="w-full h-full" src={calendarS} alt="" />
      </div>
      <div className="w-full">
        <h1 className="text-slate-900 font-normal text-2xl">
          Lorem ipsum dolor sit amet.
        </h1>
        <p className="w-3/4 font-light mt-10">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis
          aspernatur est distinctio voluptas doloribus modi!
        </p>
        <Link to='/worker-calendar'>
        <button className="px-6 py-1 bg-custom-gradient text-sm border rounded-full mt-6">
          Schedule
        </button>
        </Link>
      </div>
    </div>
  );
};

export default ScheduleSection;
