import fetch from "node-fetch";
import { createApi } from "unsplash-js";

const api = createApi({
  accessKey: process.env.UNSPLASH_ACCESS_KEY,
  fetch: fetch,
});

exports.handler = async (event, context) => {
  const eventBody = JSON.parse(event.body);
  console.log(eventBody);
  const response = await api.search.getPhotos({
    query: eventBody.query,
    page: eventBody.pageNo,
    perPage: 20,
  });

  const results = response.response.results;

  const photos = results.map((photo) => ({
    description: photo.description,
    url: photo.urls.regular,
  }));

  return {
    statusCode: response.status,
    body: JSON.stringify(photos),
  };
};
