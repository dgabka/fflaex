import { queryOptions } from "@tanstack/react-query";
import axios from "axios";

export const fetchLibrary = async () => {
  const res = await axios.get<Array<FileData>>(
    "http://localhost:8000/api/file",
    {
      headers: {
        Accept: "application/json",
      },
    },
  );

  return res.data;
};

export const libraryQueryOptions = queryOptions({
  queryKey: ["library"],
  queryFn: fetchLibrary,
});

const fetchLibraryItem = async (itemId: number) => {
  const res = await axios.get<FileData>(
    `http://localhost:8000/api/file/${itemId}`,
    {
      headers: {
        Accept: "application/json",
      },
    },
  );

  return res.data;
};

export const libraryItemQueryOptions = (itemId: number) =>
  queryOptions({
    queryKey: ["library", { itemId }],
    queryFn: () => fetchLibraryItem(itemId),
  });
