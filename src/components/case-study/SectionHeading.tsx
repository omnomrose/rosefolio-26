// Eyebrow label (desktop/label-lg, surface-150) + heading (desktop/title-xl, surface-200).
export function SectionHeading({
  id,
  label,
  title,
  gap,
}: {
  id: string;
  label: string;
  title: string;
  /** Spacing token between label and title — varies per section in Figma. */
  gap: string;
}) {
  return (
    <div className={`flex flex-col ${gap}`}>
      <h2 id={id} className="type-label-lg text-surface-150 uppercase">
        {label}
      </h2>
      <p className="type-title-xl text-surface-200">{title}</p>
    </div>
  );
}
