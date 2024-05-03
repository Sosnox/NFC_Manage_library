const formatDate = (year: number, month: number, day: number, time: string) => {
    const date = new Date(year, month - 1, day);
    return `${date.toISOString().split('T')[0]}T${time}`;
  };