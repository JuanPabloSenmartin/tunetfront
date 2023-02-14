import React from 'react';
import { ratingList } from '../constants';
import CheckboxProton from './checkBoxProton';
import FilterListToggle from './filterListToggle';
import {MyDateRangePicker} from './dateRangePicker';
import '../../Styles/filter.css';
import {FaChevronCircleRight} from 'react-icons/fa'


const FilterPanel = ({
    selectedRating,
    selectRating,
    genre,
    changeChecked,
    selectedRange,
    changeRange,
    selectedDate,
    changeDate,
    refresh
}) => (
  <div>
    <div className='input-group'>
      <p className='labelFilter'>Genre</p>
      {genre.map((genero) => (
        <CheckboxProton
          key={genero.id}
          genero={genero}
          changeChecked={changeChecked}
        />
      ))}
    </div>
    <div className='input-group'>
      <p className='label-range'>Maximum distance (km)</p>
      <input type="number"
                        placeholder="Maximum distance"
                        value={selectedRange}
                        name="distance"
                        onChange={changeRange}/>
      <FaChevronCircleRight className="max-distance-enter-icon" onClick={() => refresh()}/>                  
    </div>
    <div className='input-group'>
      <p className='labelFilter'>Star Rating</p>
      <FilterListToggle
        options={ratingList}
        value={selectedRating}
        selectToggle={selectRating}
      />
    </div>
    <div className='input-group'>
      <p className='labelFilter'>Date range</p>
      <MyDateRangePicker 
        selectedDate={selectedDate}
        changeDate={changeDate}
      />
    </div>
  </div>
  
);

export default FilterPanel;