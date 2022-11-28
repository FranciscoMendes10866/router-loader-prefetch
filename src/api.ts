export const getAlbum = async (albumId: string) => {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/albums/${albumId}`
  );
  return await response.json();
};
