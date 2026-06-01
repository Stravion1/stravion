import '../styles/marquee.css'

const ITEMS = [
  'Extensions & Structural Works',
  'Commercial Fit-Outs',
  'Shopfront Installation',
  'Roofing & External Works',
  'Bathrooms & Wet Rooms',
  'Plumbing & Gas',
  'Electrical Works',
  'Plastering & Decorating',
  'Tiling & Flooring',
  'Ventilation Systems',
  'Steel Works',
]

const Dot = () => <span className="marquee-dot">◆</span>

export default function Marquee() {
  const doubled = [...ITEMS, ...ITEMS]
  return (
    <div className="marquee-wrap">
      <div className="marquee-track">
        {doubled.map((item, i) => (
          <span key={i} className="marquee-item">
            {item}
            <Dot />
          </span>
        ))}
      </div>
    </div>
  )
}
