import { Suspense } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import { queryClient } from "../App";
import { getAlbum } from "../api";

export const albumLoader = async ({ params }) => {
  const albumId = params.albumId;
  await queryClient.prefetchQuery({
    queryKey: [`album/${albumId}`],
    queryFn: async () => await getAlbum(albumId),
  });
};

const useAlbum = (albumId) => {
  return useQuery({
    queryKey: [`album/${albumId}`],
    queryFn: async () => await getAlbum(albumId),
    suspense: true,
  });
};

const PageContent = () => {
  const params = useParams();
  const { data } = useAlbum(params.albumId);

  return (
    <pre>
      <code>{JSON.stringify(data)}</code>
    </pre>
  );
};

const RandomAlbum = () => {
  return (
    <div>
      <h1>This is the "Random Album" Page</h1>

      <Suspense fallback={<p>Loading...</p>}>
        <PageContent />
      </Suspense>
    </div>
  );
};

export default RandomAlbum;
