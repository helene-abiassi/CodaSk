export const getPostedOnInDays = (posted_on: string) => {
  // Convert posted_on to time in ms, and get current time in ms
  const published = new Date(posted_on).getTime();
  const now = new Date().getTime();

  // Calculate a difference between the 2 and convert to days
  const diff = Math.floor((now - published) / (1000 * 3600 * 24));
  // Get the resulting string depending on a result
  if (diff === 0) {
    return 'today';
  } else if (diff === 1) {
    return 'yesterday';
  } else {
    return diff + ' days ago';
  }
};
