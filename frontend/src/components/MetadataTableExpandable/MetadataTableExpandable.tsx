import Accordion from "@components/Accordion/Accordion";
import classes from "./MetadataTableExpandable.module.css";

interface Props {
  tags: Record<string, string>;
}

export default function MetadataTableExpandable({ tags }: Props): JSX.Element {
  return (
    <Accordion heading="Metadata">
      <table className={classes["meta-table"]}>
        <tbody>
          {Object.entries(tags).map(([key, value]) => (
            <tr key={key}>
              <td>{key}</td>
              <td>{value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Accordion>
  );
}
