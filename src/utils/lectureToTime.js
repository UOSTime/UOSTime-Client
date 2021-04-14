import { day2Num } from '@components/TimeTable';

export default function lectureToTime(lecture, idx) {
    const name = lecture.subject_nm;
                
    const dayStrings = lecture.class_nm.split(', ');

    const lectureInfos = dayStrings.map(dayStr => {
        const parts = dayStr.split('/');
        const time = parts[0];
        const place = parts.slice(1).join('/');

        const day = day2Num[time.charAt(0)];
        const times = time.substring(1).split(',').map(t => parseInt(t));
        const color = idx!==undefined ? String(idx) : 'preview';

        return { day, times, place, name, color };
    });

    return lectureInfos;
}