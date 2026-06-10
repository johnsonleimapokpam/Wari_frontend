import formatLastSeen
from "../../utils/formatLastSeen";

export default function PresenceBadge({
  presence
}) {

  if (!presence) {
    return null;
  }

  if (presence.isOnline) {
    return (
      <span>
        🟢 Online
      </span>
    );
  }

  if (!presence.lastSeen) {
    return (
      <span>
        Offline
      </span>
    );
  }

  return (
    <span>
      Last seen{" "}
      {
        formatLastSeen(
          presence.lastSeen
        )
      }
    </span>
  );
}