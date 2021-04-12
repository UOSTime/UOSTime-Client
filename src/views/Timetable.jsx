import React from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { semesterState } from '../states/Semester';
import { userIDState } from '../states/User';
import Login from '@views/login';

export default function Timetable() {
  const userID = useRecoilValue(userIDState);
  const [semester, setSemester] = useRecoilState(semesterState);

  if (!userID) {
    return <Login />;
  }

  return (
    <>
      <h1>Timetable</h1>
      <p>Hello, {userID}</p>
      <p>{semester.year}-{semester.term}</p>
    </>
  );
}
