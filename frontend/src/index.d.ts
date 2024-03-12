interface BaseStream {
  avg_frame_rate: string;
  codec_long_name: string;
  codec_name: string;
  codec_tag: string;
  codec_tag_string: string;
  codec_type: "video" | "audio";
  disposition: {
    attached_pic: number;
    captions: number;
    clean_effects: number;
    comment: number;
    default: number;
    dependent: number;
    descriptions: number;
    dub: number;
    forced: number;
    hearing_impaired: number;
    karaoke: number;
    lyrics: number;
    metadata: number;
    non_diegetic: number;
    original: number;
    still_image: number;
    timed_thumbnails: number;
    visual_impaired: number;
  };
  extradata_size: number;
  index: number;
  profile: string;
  r_frame_rate: string;
  start_pts: number;
  start_time: string;
  tags: Record<string, string>;
  time_base: string;
}

interface VideoStream extends BaseStream {
  chroma_location: string;
  closed_captions: number;
  codec_type: "video";
  coded_height: number;
  coded_width: number;
  color_range: string;
  display_aspect_ratio: string;
  field_order: string;
  film_grain: number;
  has_b_frames: number;
  height: number;
  level: number;
  pix_fmt: string;
  refs: number;
  sample_aspect_ratio: string;
  width: number;
}

interface AudioStream extends BaseStream {
  bits_per_sample: string;
  channel_layout: string;
  channels: number;
  codec_type: "audio";
  initial_padding: number;
  sample_fmt: string;
  sample_rate: string;
}

type MediaStream = VideoStream | AudioStream;

interface Format {
  bit_rate: string;
  duration: string;
  filename: string;
  format_long_name: string;
  format_name: string;
  nb_programs: number;
  nb_streams: number;
  probe_score: number;
  size: string;
  start_time: string;
  tags: Record<string, string>;
}

interface FileData {
  id: number;
  filepath: string;
  streams: Array<VideoStream | AudioStream>;
  format: Format;
}
