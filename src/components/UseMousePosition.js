import { useState, useEffect } from "react";

// useMousePosition Hook
function useMousePosition() {
  const [position, setPosition] = useState({ xm: 0, ym: 0 });
  useEffect(() => {
    const updateMouse = (e) => {
      setPosition({ xm: e.pageX, ym: e.pageY });
    };
    document.addEventListener("mousemove", updateMouse);
    document.addEventListener("onscroll", updateMouse);
    return () => {
      document.removeEventListener("mousemove", updateMouse);
      document.removeEventListener("onscroll", updateMouse);
    };
  });

  return position;
}

export default useMousePosition;
