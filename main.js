import "./style.css";

const form = document.querySelector(".form");
const input = document.querySelector("input");

// console.log(query.value);

const searchPhotos = (query) => {};

form.addEventListener("submit", (event) => {
  event.preventDefault();
  searchPhotos(input.value);
});
