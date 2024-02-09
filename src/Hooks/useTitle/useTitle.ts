import { useEffect } from "react";

const useTitle = (title: string) => {
  useEffect(() => {
    return () => {
      document.title = `CraftersCollective- ${title}`;
    };
  }, [title]);
};

export default useTitle;
