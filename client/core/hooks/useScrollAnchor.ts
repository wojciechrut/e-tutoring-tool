import { RefObject, useEffect } from "react";

export const useScrollAnchor = (elementRef: RefObject<HTMLElement>) => {
  const scrollInto = () => elementRef.current?.scrollIntoView();

  useEffect(() => {
    elementRef.current?.scrollIntoView();
  }, [elementRef]);

  return scrollInto;
};
