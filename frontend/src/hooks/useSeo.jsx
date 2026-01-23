import { useEffect } from "react";

const useSeo = ({ title, keywords, description }) => {
  useEffect(() => {
    if (!title) return;

    document.title = title;

    if (keywords) {
      let meta = document.querySelector('meta[name="keywords"]');
      if (!meta) {
        meta = document.createElement("meta");
        meta.name = "keywords";
        document.head.appendChild(meta);
      }
      meta.content = keywords;
    }

    if (description) {
      let meta = document.querySelector('meta[name="description"]');
      if (!meta) {
        meta = document.createElement("meta");
        meta.name = "description";
        document.head.appendChild(meta);
      }
      meta.content = description;
    }
  }, [title, keywords, description]);
};

export default useSeo;
