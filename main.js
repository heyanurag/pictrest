import "./style.css";

const form = document.querySelector(".form");
const input = document.querySelector("input");

// console.log(query.value);

const searchPhotos = async (query) => {
  const response = await fetch("/.netlify/functions/getPhotos", {
    method: "POST",
    body: JSON.stringify({
      query,
    }),
  });
  const json = await response.json();
  console.log(json);
};

form.addEventListener("submit", (event) => {
  event.preventDefault();
  searchPhotos(input.value);
});
