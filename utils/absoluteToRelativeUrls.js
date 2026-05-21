export const absoluteToRelativeUrls = (htmlString = "") => {
  const baseUrl = process.env.NEXT_PUBLIC_WP_URL;

  if (!baseUrl) return htmlString;

  return htmlString
    .replaceAll(baseUrl, "")
    .replaceAll(baseUrl.replace(/\/$/, ""), "");
};