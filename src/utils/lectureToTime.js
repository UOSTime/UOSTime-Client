import { day2Num } from '@components/home/TimeTable';

export default function lectureToTime(lecture, index) {
  const { _id: id, subject_nm: name } = lecture;

  return lecture.class_nm.split(', ').map(s => {
    const time = s.match(/^[^/]*/)[0];
    const day = day2Num[time[0]];
    const hours = time.slice(1).split(',').map(t => parseInt(t));
    const place = s.slice(time.length + 1);
    const color = index || 'preview';
    return { id, name, day, hours, place, color };
  });
}
