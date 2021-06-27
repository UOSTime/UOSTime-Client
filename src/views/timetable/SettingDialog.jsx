import React from 'react';
import { useRecoilState } from 'recoil';
import CustomDialog from '@components/CustomDialog';
import { Checkbox, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from '@material-ui/core';
import { showNightTimesState, showSaturdayState, timeFormatState } from '@states/TimeTable';

const TIME_FORMAT_12 = '12';
const TIME_FORMAT_24 = '24';

export default function SettingDialog(props) {
  // props
  const { open, onClose } = props;

  // states
  const [timeFormat, setTimeFormat] = useRecoilState(timeFormatState);
  const [showNightTimes, setShowNightTimes] = useRecoilState(showNightTimesState);
  const [showSaturday, setShowSaturday] = useRecoilState(showSaturdayState);

  return (
    <CustomDialog
      open={open}
      title="시간표 설정"
      onClose={onClose}
      buttons={[]}
      fullWidth
    >
      <FormControl component="fieldset" fullWidth>
        <FormLabel component="legend">시간 형식</FormLabel>
        <RadioGroup row aria-label="time format" name="time format" value={timeFormat} onChange={e => setTimeFormat(e.target.value)}>
          <FormControlLabel value={TIME_FORMAT_12} control={<Radio />} label="12시간" />
          <FormControlLabel value={TIME_FORMAT_24} control={<Radio />} label="24시간" />
        </RadioGroup>
      </FormControl>

      <FormControl fullWidth>
        <FormControlLabel
          control={(
            <Checkbox
              checked={showNightTimes}
              onChange={e => setShowNightTimes(e.target.checked)}
              name="show night times"
              color="primary"
            />
          )}
          label={`${timeFormat === TIME_FORMAT_12 ? '오후 6시' : '18시'} 이후 표시`}
        />
      </FormControl>

      <FormControl fullWidth>
        <FormControlLabel
          control={(
            <Checkbox
              checked={showSaturday}
              onChange={e => setShowSaturday(e.target.checked)}
              name="show saturday"
              color="primary"
            />
          )}
          label="토요일 표시하기"
        />
      </FormControl>
    </CustomDialog>
  );
}
