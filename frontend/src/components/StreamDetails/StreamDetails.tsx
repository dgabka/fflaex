export default function StreamDetails(props: {
  data: VideoStream | AudioStream;
}) {
  const tags = props.data.tags;
  return (
    <div>
      <p>
        <label>Id: </label>
        {props.data.index}
      </p>
      <p>
        <label>Title: </label>
        {tags.title}
      </p>
    </div>
  );
}
