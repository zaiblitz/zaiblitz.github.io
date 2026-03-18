import { marqueeItems } from '../data/boot'

export default function BottomBar() {
  // Duplicate items for seamless loop
  const doubled = [...marqueeItems, ...marqueeItems]

  return (
    <footer className="bottom-bar">
      <div className="marquee">
        <div className="marquee__inner">
          {doubled.map((item, i) => (
            <span key={i}>{item}</span>
          ))}
        </div>
      </div>
    </footer>
  )
}
