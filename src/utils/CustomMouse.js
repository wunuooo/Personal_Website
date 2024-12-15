import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";

const CustomCursor = () => {
  const cursorRef = useRef(null); // 用于引用鼠标元素

  useEffect(() => {
    const cursor = cursorRef.current;

    const handleMouseMove = (e) => {
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.3, // 动画时长
        ease: "power3.out", // 缓动效果
      });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return <div className="custom-cursor" ref={cursorRef} />;
};

export default CustomCursor;
