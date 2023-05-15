export const fetchMovieList = async (pageNumber) => {
  console.log(pageNumber, "pageNumberpageNumber");
  const response = await fetch(
    `API/CONTENTLISTINGPAGE-PAGE${pageNumber}.json`,
    {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    }
  );
  const result = await response.json();
  return result?.page;
};
