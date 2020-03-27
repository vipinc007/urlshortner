export const apiurl =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3002/"
    : "https://urlshortner007api.herokuapp.com/";
