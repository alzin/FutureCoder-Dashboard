
export function truncateString(str, maxLength) {
  if (str.length <= maxLength) {
    return str;
  }
  return str.slice(0, maxLength) + '...';
}


export const getTimeZone = () => {
  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  console.log(timeZone)
  return timeZone
};
