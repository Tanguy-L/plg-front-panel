/**
 * Converts a string from snake_case to camelCase
 * @param {string} str - The snake_case string to convert
 * @return {string} The camelCase version of the string
 */
export function snakeToCamel(str) {
  return str.replace(/_([a-z])/g, (match, letter) => letter.toUpperCase());
}

/**
 * Converts all keys in an object from snake_case to camelCase
 * @param {Object} obj - The object to convert
 * @return {Object} A new object with camelCase keys
 */
export function convertKeysToCamelCase(obj) {
  // Handle non-objects or null
  if (obj === null || typeof obj !== "object" || Array.isArray(obj)) {
    return obj;
  }

  // Create a new object to store the converted keys
  const result = {};

  // Process each key in the object
  Object.keys(obj).forEach((key) => {
    // Convert key from snake_case to camelCase
    const camelKey = snakeToCamel(key);

    // Recursively convert nested objects
    result[camelKey] = convertKeysToCamelCase(obj[key]);
  });

  return result;
}

export function isEmpty(obj) {
  for (const prop in obj) {
    if (Object.hasOwn(obj, prop)) {
      return false;
    }
  }

  return true;
}

export function parseMemberDataForDB(member) {
  const { id, discordId, steamId, isLoggedIn, smokeColor, name, weight } =
    member;
  const memberParsed = {
    id,
    discord_id: discordId,
    steam_id: steamId,
    smoke_color: smokeColor,
    is_logged_in: Number(isLoggedIn),
    discord_name: name,
    weight: weight,
  };
  return memberParsed;
}

export function parseTeamDataForDB(team) {
  const { name, isPlaying, side, channelId, id } = team;

  const teamParsed = {
    id,
    name,
    side,
    channel_id: channelId,
    is_playing: Number(isPlaying),
  };
  return teamParsed;
}
