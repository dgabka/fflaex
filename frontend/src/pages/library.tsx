import LibraryItem from "../components/LibraryItem/LibraryItem";

export default function LibraryPage() {
  const items: Array<Record<string, string>> = [];

  return items.map((item) => <LibraryItem item={item} />);
}
