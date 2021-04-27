import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

/* UTC format: YYYY-MM-DDThh:mm:ss.xxxZ */

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
