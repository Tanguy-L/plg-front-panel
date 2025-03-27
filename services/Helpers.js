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
