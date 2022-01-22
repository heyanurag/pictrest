import "./style.css";

const form = document.querySelector(".form");
const input = document.querySelector("input");
const container = document.querySelector(".container");
const template = document.getElementsByTagName("template")[0].content;
const imgTemplate = template.querySelector("img");

// console.log(query.value);

const getCanvasElement = () => {
  const canvas = document.createElement("div");
  canvas.id = "canvas";
  return canvas;
};

const displayPhotos = (photos) => {
  const canvas = getCanvasElement();
  console.log(photos);
  photos.forEach((photo) => {
    const card = document.createElement("div");
    card.classList.add("card");

    imgTemplate.src = photo.url;
    imgTemplate.alt = photo.description;

    const imgTag = document.importNode(template, true);

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
