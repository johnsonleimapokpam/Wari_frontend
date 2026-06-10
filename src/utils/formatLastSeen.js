export default function formatLastSeen(
  timestamp
) {

  const diff =
    Math.floor(
      (
        Date.now() -
        new Date(timestamp)
      ) / 1000
    );

  if (diff < 60) {
    return `${diff}s ago`;
  }

  if (diff < 3600) {
    return `${Math.floor(
      diff / 60
    )}m ago`;
  }

  return `${Math.floor(
    diff / 3600
  )}h ago`;
}