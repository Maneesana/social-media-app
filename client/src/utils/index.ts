export function isValidDate(d: Date | undefined) {
  return d instanceof Date && !isNaN(d as any);
}

export const calculateDateAgo = (reqDate: Date | string): string | null => {
  if (typeof reqDate === 'string') {
    reqDate = new Date(reqDate);
  }
  if (!isValidDate(reqDate)) return null;

  const timeDiff = new Date().getTime() - reqDate.getTime();
  const minutesAgo = Math.floor(timeDiff / (1000 * 60));
  const hoursAgo = Math.floor(minutesAgo / 60);
  const daysAgo = Math.floor(hoursAgo / 24);
  const monthsAgo = Math.floor(daysAgo / 30);
  const yearsAgo = Math.floor(daysAgo / 365);
  if (timeDiff <= 0) return '1 min';
  if (minutesAgo < 60) {
    return minutesAgo === 1 ? `${minutesAgo} min ` : `${minutesAgo} mins `;
  } else if (hoursAgo < 24) {
    return hoursAgo === 1 ? `${hoursAgo} hour ` : `${hoursAgo} hours `;
  } else if (daysAgo < 30) {
    return daysAgo === 1 ? `${daysAgo} day` : `${daysAgo} days `;
  } else if (monthsAgo < 12) {
    return monthsAgo === 1 ? `${monthsAgo} month ` : `${monthsAgo} months `;
  } else if (yearsAgo >= 1) {
    return yearsAgo === 1 ? `${yearsAgo} year ` : `${yearsAgo} years `;
  }
  return null;
};
