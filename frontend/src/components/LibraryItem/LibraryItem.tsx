export default function LibraryItem(props: { item: Record<string, string> }) {
  return <div>{props.item.name}</div>;
}
