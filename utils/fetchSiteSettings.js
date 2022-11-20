export const fetchSiteSettings = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/getSiteSettings`
  );

  const data = await res.json();
  const siteSettings = data.siteSettings;
  // console.log("fetching", siteSettings);

  return siteSettings;
};
