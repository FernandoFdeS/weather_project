import React from 'react';
import { StarIcon } from '@heroicons/react/24/solid';

const WeatherHeader = () => (
    <div className='wf_header'>
        <h3 className='wf_header__title'>
            Weather<span className='wf_header__title--bold'>APP</span>
        </h3>
        <button className='wf_header__button button'>
            <StarIcon />
        </button>
    </div>
);

export default WeatherHeader;