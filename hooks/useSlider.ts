import { useAnimation } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const useSlider = (): [
  containerRef: typeof containerRef,
  containerWidth: typeof containerWidth,
  scrollWidth: typeof scrollWidth,
  animation: typeof animation
] => {
  const containerRef = useRef<HTMLElement>(null);
  const [containerWidth, setContainerWidth] = useState(0);
  const [scrollWidth, setScrollWidth] = useState(0);
  const animation = useAnimation();

  const getWidthElements = () => {
    const slider = containerRef.current;
    if (slider) {
      setContainerWidth(slider?.clientWidth);
      setScrollWidth(slider?.scrollWidth);
    }
  };

  useEffect(() => {
    window.addEventListener("resize", getWidthElements);
    getWidthElements();

    return () => {
      window.removeEventListener("resize", getWidthElements);
    };
  }, []);

  return [containerRef, containerWidth, scrollWidth, animation];
};

export default useSlider;
