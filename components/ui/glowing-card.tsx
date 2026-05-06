'use client';

interface GlowingCardProps {
  /** Big metric (e.g. "20+", "100%", "750k") */
  value: string;
  /** Caption shown below in uppercase */
  label: string;
}

export function GlowingCard({ value, label }: GlowingCardProps) {
  return (
    <div className="glowing-card-outer">
      <div className="glowing-card-dot" />
      <div className="glowing-card-card">
        <div className="glowing-card-ray" />
        <div className="glowing-card-label">{label}</div>
        <div className="glowing-card-value">{value}</div>
        <div className="glowing-card-line topl" />
        <div className="glowing-card-line leftl" />
        <div className="glowing-card-line bottoml" />
        <div className="glowing-card-line rightl" />
      </div>
    </div>
  );
}
