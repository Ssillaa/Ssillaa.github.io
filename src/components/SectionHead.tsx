export function SectionHead({ number, title }: { number: string; title: string }) {
  return (
    <div className="split__head">
      <span className="eyebrow">{number}</span>
      <h2 className="h2">{title}</h2>
    </div>
  )
}
