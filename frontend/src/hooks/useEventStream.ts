import { useEffect } from "react";
import { useLibraryStore } from "./useLibraryStore";

type Message = LibraryItemUpdatedMessage;

interface LibraryItemUpdatedMessage {
  topic: "library_item_updated";
  data: FileData;
}

export const useEventStream = () => {
  const { upsertItem } = useLibraryStore();
  useEffect(() => {
    const eventSource = new EventSource("http://localhost:8000/stream");

    // attaching a handler to receive message events
    eventSource.onmessage = (event) => {
      const msg = JSON.parse(event.data) as Message;
      console.log(msg);

      if (msg.topic === "library_item_updated") {
        upsertItem(msg.data);
      }
    };

    // terminating the connection on component unmount
    return () => eventSource.close();
  }, [upsertItem]);
};
