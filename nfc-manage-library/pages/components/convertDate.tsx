const formatDate = (year: number, month: number, day: number, time: string) => {
  // Validate individual date components
  if (typeof year !== 'number' || year < 1000 || year > 3000 ||
      typeof month !== 'number' || month < 1 || month > 12 ||
      typeof day !== 'number' || day < 1 || day > 31 ||
      typeof time !== 'string' || !time.match(/^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/)) {
      console.error('Invalid date parameters:', {year, month, day, time});
      return null;  // Return null or a similar placeholder to indicate an error
  }

  // Adjust month index because JavaScript months are 0-indexed
  const date = new Date(year, month - 1, day);

  // Ensure date is valid
  if (isNaN(date.getTime())) {
      console.error('Constructed date is invalid:', date);
      return null;
  }

  return `${date.toISOString().split('T')[0]}T${time}`;
};

export default formatDate;
