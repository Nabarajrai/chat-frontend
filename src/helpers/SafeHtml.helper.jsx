import DOMPurify from "dompurify";

export const sanitizeHtml = (html) => {
  return DOMPurify.sanitize(html, {
    USE_PROFILES: { html: true },
    ADD_ATTR: ["target"],
    FORBID_TAGS: ["script", "iframe"],
    FORBID_CONTENTS: ["javascript:", "data:text/html"],
  });
};
