type ImprovementTreeSlideProps = {
  label: string;
  title: string;
  description: string;
  techChips: string[];
  centerImage: string;
};

export function ImprovementTreeSlide({
  label,
  title,
  description,
  techChips,
  centerImage,
}: ImprovementTreeSlideProps) {
  const lines = description.split("\n");

  return (
    <div className="improve-slide">
      <section className="improve-artboard">
        <div className="improve-label">{label}</div>
        <h1 className="improve-title">{title}</h1>

        <div className="improve-hero">
          <p className="improve-desc">
            {lines.map((line, idx) => (
              <span key={`${line}-${idx}`}>
                {line}
                {idx < lines.length - 1 ? <br /> : null}
              </span>
            ))}
          </p>

          <div className="improve-mockups">
            <div className="improve-phone back left">
              <img src={centerImage} alt={`${title} screen left`} />
            </div>
            <div className="improve-phone front">
              <img src={centerImage} alt={`${title} screen center`} />
            </div>
            <div className="improve-phone back right">
              <img src={centerImage} alt={`${title} screen right`} />
            </div>
          </div>
        </div>

        <div className="improve-chips">
          {techChips.map((chip) => (
            <span key={chip} className="improve-chip">
              {chip}
            </span>
          ))}
        </div>
      </section>
    </div>
  );
}
