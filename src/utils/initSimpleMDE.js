import SimpleMDE from "simplemde";
import axios from "@/api/backend.js";

export default ({ element, uniqueId, onChange, onKeyDown }) => {
  const simplemde = new SimpleMDE({
    element,
    spellChecker: false,
    autosave: {
      enabled: true,
      uniqueId,
      delay: 3000,
    },
    status: false,
    toolbar: [
      "bold",
      "italic",
      "heading-1",
      "heading-2",
      "heading-3",
      "|",
      "quote",
      "unordered-list",
      "ordered-list",
      "|",
      "fullscreen",
      "preview",
    ],
    previewRender: (markdown, preview) => {
      const formData = new FormData(); // backend accepts only form-encoded data
      formData.append("content", markdown);
      axios.post("/api/v2/markdownx/markdownify/", formData).then((result) => (preview.innerHTML = result.data));
    },
  });
  simplemde.codemirror.on("change", onChange);
  simplemde.codemirror.on("keydown", onKeyDown);

  return simplemde;
};
