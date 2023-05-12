import { Button } from '@mui/material';
import Popover from '@mui/material/Popover';
import moment from 'moment';
import { useState } from 'react';
import { DateRange } from 'react-date-range';


const DatePicker = (props) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [change, setChange] = useState(false);

  return (
    <>
      <Button
        variant="contained"
        color="secondary"
        onClick={(event) => setAnchorEl(event.currentTarget)}
        sx={{ width: '210px' }}
      >
        {moment(props.ranges[0].startDate).format('ll')} -{' '}
        {moment(props.ranges[0].endDate).format('ll')}
      </Button>

      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={() => {
          setAnchorEl(null);
          props.ranges[0].startDate !== props.ranges[0].endDate &&
            change &&
            props.setFiltered &&
            props.setFiltered(true);
          setChange(false);
        }}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
      >
        <DateRange
          editableDateInputs={true}
          maxDate={moment().toDate()}
          onChange={(item) => {
            props.setDateRanges([item.selection]);
            setChange(true);
          }}
          moveRangeOnFirstSelection={false}
          ranges={props.ranges}
          showDateDisplay={false}
        />
      </Popover>
    </>
  );
};

export default DatePicker;
