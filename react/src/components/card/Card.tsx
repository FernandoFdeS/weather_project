import React from 'react';

interface WeatherCardProps {
    icon?: React.ReactNode;
    label: string;
    value?: string | number;
    unity?: string;
}

const WeatherCard = ({ icon, label, value, unity }:WeatherCardProps) => (
    <div className='wf_content__weather_card'>
        <div className='wf_content__weather_card_wrap'>
            {icon}
            <p className='weather_card__text'>{value} <small>{unity}</small></p>
        </div>
        <p className='info_text'>{label}</p>
    </div>
);

export default WeatherCard;