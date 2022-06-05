import { createApi } from "unsplash-js";

const unsplash = createApi({
  accessKey: process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY as string,
});

const getPhotos = async (page: number, query = "cats and dogs") => {
  const photos = await unsplash.search.getPhotos({
    query: query,
    page: page,
    perPage: 8,
    orientation: "portrait",
  });
  const results = photos.response?.results ?? [];

  return results as Array<any>;
};

export default getPhotos;
