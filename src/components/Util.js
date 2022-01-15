export const filterMovies = (movies, filterCategory, filterText) => {
  const types = {
    title: "string",
    year: "number",
    genre: "string",
  };

  if (filterText !== "") {
    return movies.filter((movie) => {
      if (types[filterCategory] === "string") {
        movie[filterCategory] = `${movie[filterCategory]}`;
        return (
          movie[filterCategory] &&
          movie[filterCategory].toLowerCase().includes(filterText.toLowerCase())
        );
      } else {
        return movie[filterCategory] && movie[filterCategory] == filterText;
      }
    });
  }
  return movies;
};

export const dbName = "movies-list";
export const dbFirestoreName = "movies-wishlist";
