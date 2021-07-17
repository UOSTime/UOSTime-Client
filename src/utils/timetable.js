export const days = ['월', '화', '수', '목', '금', '토', '일'];
export const times = [9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21];

export function lectureToTime(lecture, colorIndex = 'preview') {
  if (!lecture) return [];

  const { _id: id, subject_nm: name } = lecture;

  return lecture.class_nm.split(', ').map(s => {
    const time = s.match(/^[^/]*/)[0];
    const day = days.indexOf(time[0]);
    const hours = time.slice(1).split(',').map(t => parseInt(t));
    const place = s.slice(time.length + 1);
    return { id, name, day, hours, place, color: colorIndex };
  });
}
