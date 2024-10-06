export function truncateString(str, maxLength) {
  if (str.length <= maxLength) {
    return str;
  }
  return str.slice(0, maxLength) + '...';
}


export const getTimeZone = () => {
  return Intl.DateTimeFormat().resolvedOptions().timeZone;
};
