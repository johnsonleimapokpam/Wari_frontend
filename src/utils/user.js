const AVATAR_TONES = ["cobalt", "marigold", "clay", "moss", "plum"];

export function getInitials(person) {
  if (!person) return "?";

  const initials = `${person.firstName?.[0] ?? ""}${person.lastName?.[0] ?? ""}`.toUpperCase();
  if (initials) return initials;

  return person.email?.[0]?.toUpperCase() ?? "?";
}

export function getAvatarTone(id = "") {
  let hash = 0;

  for (let index = 0; index < id.length; index += 1) {
    hash = (hash * 31 + id.charCodeAt(index)) >>> 0;
  }

  return AVATAR_TONES[hash % AVATAR_TONES.length];
}

export function getAvatarClass(id = "") {
  return `av-${getAvatarTone(id)}`;
}
