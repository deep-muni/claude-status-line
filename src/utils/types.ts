export interface Payload {
  readonly workspace?: {
    readonly current_dir?: string;
    readonly cwd?: string;
  };
  readonly model?: {
    readonly display_name?: string;
    readonly id?: string;
  };
  readonly context_window?: {
    readonly context_window_size?: number;
    readonly used_percentage?: number;
    readonly total_input_tokens?: number;
    readonly total_output_tokens?: number;
  };
  readonly cost?: {
    readonly total_cost_usd?: number | string;
    readonly total_duration_ms?: number;
    readonly total_api_duration_ms?: number;
  };
  readonly rate_limits?: {
    readonly five_hour?: { readonly used_percentage?: number };
    readonly seven_day?: { readonly used_percentage?: number };
  };
}

export interface Segment {
  readonly text: string;
  readonly fg: string;
  readonly bg: string;
  readonly bold?: boolean;
}
