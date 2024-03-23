import classes from "./CodecBadge.module.css";

interface BadgeProps {
  codec_type: "audio" | "video" | "subtitle";
  codec_name: string;
}

export function CodecBadge({ codec_name, codec_type }: BadgeProps) {
  return (
    <span className={`${classes["badge"]}`}>
      <label className={classes["badge-label"]}>{codec_type}</label>
      <span className={`${classes["badge-value"]} ${classes[codec_type]}`}>
        {codec_name}
      </span>
    </span>
  );
}

export function CodecBadgeShort({ codec_name, codec_type }: BadgeProps) {
  return (
    <span className={`${classes["badge"]}`}>
      <span className={`${classes["badge-value"]} ${classes[codec_type]}`}>
        {codec_name}
      </span>
    </span>
  );
}
