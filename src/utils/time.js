import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

/* UTC format: YYYY-MM-DDThh:mm:ss.xxxZ */
export const TIME_FORMAT_12 = '12';
export const TIME_FORMAT_24 = '24';

dayjs.extend(utc);

export function getToday() {
  const today = dayjs();
  return {
    year: today.year(),
    month: today.month(),
    date: today.date(),
    day: today.day(),
  };
}

export function getUTCNow() {
  return convertYYYYMMDDtoUTC();
}

export function convertUTCtoYYYYMMDD(t) {
  return dayjs(t).format('YYYY-MM-DD');
}

export function convertYYYYMMDDtoUTC(t) {
  // append milliseconds as '000'
  return dayjs(t).utc().format().replace('Z', '.000Z');
}

export function getFormattedHour(hour, timeFormat) {
  if (hour <= 12 || timeFormat === TIME_FORMAT_24) return hour;
  return (hour > 12 ? hour - 12 : hour);
}
