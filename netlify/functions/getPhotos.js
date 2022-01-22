import fetch from "node-fetch";
import { createApi } from "unsplash-js";

const api = createApi({
  accessKey: process.env.UNSPLASH_ACCESS_KEY,
  fetch: fetch,
});

exports.handler = async (event, context) => {
  const eventBody = JSON.parse(event.body);

  const result = await api.search.getPhotos({
    query: eventBody.query,
  });

  const data = result.response;

  return {
    statusCode: 200,
    body: JSON.stringify(data),
  };
};
