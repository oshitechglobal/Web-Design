export default function Starfield({ count = 24 }) {
  const stars = Array.from({ length: count }, (_, i) => {
    const seed = i * 97.17;
    const left = (seed * 13) % 100;
    const top = (seed * 7) % 100;
    const delay = (i % 10) * 0.37;
    return { left, top, delay, key: i };
  });

  return (
    <div className="starfield" aria-hidden="true">
      {stars.map((s) => (
        <span
          key={s.key}
          style={{ left: `${s.left}%`, top: `${s.top}%`, animationDelay: `${s.delay}s` }}
        />
      ))}
    </div>
  );
}
