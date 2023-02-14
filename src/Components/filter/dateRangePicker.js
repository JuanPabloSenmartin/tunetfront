import * as React from 'react';
import { DateRange } from 'react-date-range';

import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file

export const MyDateRangePicker = ({selectedDate, changeDate}) => {
  
    return (
        <DateRange
            editableDateInputs={true}
            onChange={item => changeDate([item.selection])}
            moveRangeOnFirstSelection={false}
            ranges={selectedDate}
/>
      );
  }