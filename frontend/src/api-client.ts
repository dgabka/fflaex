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
