export default function SteamField({ soft = false, puffs = [1, 2, 3, 4], style }) {
  return (
    <div
      className={`steam-field absolute inset-0 overflow-hidden pointer-events-none${soft ? " steam-field--soft" : ""}`}
      style={style}
      aria-hidden="true"
    >
      {puffs.map((n) => (
        <span key={n} className={`steam-puff steam-puff--${n}`} />
      ))}
    </div>
  );
}
