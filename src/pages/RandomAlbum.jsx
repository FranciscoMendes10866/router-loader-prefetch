import { Suspense } from "react";
import { defer, useLoaderData, Await } from "react-router-dom";

import { queryClient } from "../App";
import { getAlbum, getPhotosByAlbumId } from "../api";

export const albumLoader = async ({ params }) => {
  const albumId = params.albumId;

  const album = await queryClient.fetchQuery({
    queryKey: [`album::${albumId}`],
    queryFn: async () => await getAlbum(albumId),
  });

  const photosPromise = queryClient.fetchQuery({
    queryKey: [`photos::${albumId}`],
    queryFn: async () => await getPhotosByAlbumId(albumId),
  });

  return defer({ album, photosPromise });
};

const RandomAlbum = () => {
  const { album, photosPromise } = useLoaderData();

  return (
    <section>
      <h2>{album.title}</h2>
      <br />

      <Suspense fallback={<small>Loading Photos...</small>}>
        <Await resolve={photosPromise}>
          {(photos) =>
            photos.map((photo, photoIndex) => {
              if (photoIndex === 0) {
                return <img key={photo.id} src={photo.url} alt={photo.title} />;
              }
            })
          }
        </Await>
      </Suspense>
    </section>
  );
};

export default RandomAlbum;
