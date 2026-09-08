type SectionHeadingProps = { kicker: string; title: string; text?: string; light?: boolean; centered?: boolean }

export function SectionHeading({ kicker, title, text, light = false, centered = false }: SectionHeadingProps) {
  return <div className={`section-heading ${light ? 'heading-light' : ''} ${centered ? 'heading-centered' : ''}`}><div className="eyebrow"><span className="eyebrow-line" /> {kicker}</div><h2>{title}</h2>{text && <p>{text}</p>}</div>
}