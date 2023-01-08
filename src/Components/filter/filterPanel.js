import React from 'react';
import { ratingList } from '../constants';
import CheckboxProton from './checkBoxProton';
import FilterListToggle from './filterListToggle';
import SliderProton from './sliderProton';
import '../../Styles/filter.css';

const FilterPanel = ({
  selectedRating,
  selectRating,
  genre,
  changeChecked,
  selectedRange,
  changeRange,
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
      <p className='label-range'>Proximity Range (km)</p>
      <SliderProton value={selectedRange} changeRange={changeRange} />
    </div>
    <div className='input-group'>
      <p className='labelFilter'>Star Rating</p>
      <FilterListToggle
        options={ratingList}
        value={selectedRating}
        selectToggle={selectRating}
      />
    </div>
  </div>
);

export default FilterPanel;