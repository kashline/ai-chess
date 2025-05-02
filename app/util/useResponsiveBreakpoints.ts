import React from "react";
import { useMediaQuery } from "react-responsive";

// Creates state objects for responsive design breakpoints using useEffect so we don't run into hydration errors from SSR
export default function useResponsiveBreakpoints() {
  const initMobile = useMediaQuery({ query: "(max-width: 980px)" });
  const initPortrait = useMediaQuery({ query: "(orientation: portrait)" });
  const [isMobile, setIsMobile] = React.useState(false);
  const [isPortrait, setIsPortrait] = React.useState(false);
  React.useEffect(() => {
    setIsMobile(initMobile);
    setIsPortrait(initPortrait);
  }, [initMobile, initPortrait]);
  return [isMobile, isPortrait];
}
