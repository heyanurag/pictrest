import "./style.css";

const form = document.querySelector(".form");
const input = document.querySelector("input");
const container = document.querySelector(".container");
const template = document.getElementById("template");
const imgTemplate = template.content.querySelector("img");

const getCanvasElement = () => {
  const canvas = document.createElement("div");
  canvas.id = "canvas";
  return canvas;
};

const displayPhotos = (photos) => {
  const canvas = getCanvasElement();

  photos.forEach((photo) => {
    const card = document.createElement("div");
    card.classList.add("card");

    const imgTag = imgTemplate.cloneNode(true);
    imgTag.src = photo.url;
    imgTag.alt = photo.description;

    card.appendChild(imgTag);
    canvas.appendChild(card);
  });

  container.appendChild(canvas);
};

const getPhotos = async (query) => {
  const response = await fetch("/.netlify/functions/getPhotos", {
    method: "POST",
    body: JSON.stringify({
      query,
    }),
  });

  const photos = await response.json();
  console.log(photos);

  return photos;
};

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  if (document.getElementById("canvas")) {
    document.getElementById("canvas").remove();
  }
  const photos = await getPhotos(input.value);
  displayPhotos(photos);
});
