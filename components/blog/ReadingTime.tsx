interface ReadingTimeProps {
  minutes: number;
  className?: string;
}

export default function ReadingTime({ minutes, className }: ReadingTimeProps) {
  return (
    <span className={className}>
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
      {minutes} min read
    </span>
  );
}
