export const getPostedOnInDays = (posted_on: Date | string) => {
  // Convert posted_on to time in ms, and get current time in ms
  const published = new Date(posted_on).getTime();
  const now = new Date().getTime();

  // Calculate a difference between the 2 and convert to days
  const diff = Math.floor((now - published) / (1000 * 3600 * 24));
  // Get the resulting string depending on a result
  if (diff === 0) {
    return ' today';
  } else if (diff === 1) {
    return ' yesterday';
  } else if (diff >= 1 && diff <= 7) {
    return diff + ' days ago';
  } else if (diff >= 7 && diff < 14) {
    return ' a week ago';
  } else if (diff >= 14 && diff <= 31) {
    return Math.floor(diff / 7) + ' weeks ago';
  } else if (diff >= 31 && diff < 62) {
    return 'a month ago';
  } else if (diff >= 62 && diff < 365) {
    return Math.floor(diff / 31) + ' months ago';
  } else if (diff >= 365 && diff < 730) {
    return 'a year ago';
  } else {
    return Math.floor(diff / 365) + ' years ago';
  }
};
