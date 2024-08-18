import React from 'react';

interface WeatherCardProps {
    icon?: React.ReactNode;
    label: string;
    value?: string | number;
}

const WeatherCard = ({ icon, label, value }:WeatherCardProps) => (
    <div className='wf_content__weather_card'>
        <div className='wf_content__weather_card_wrap'>
            {icon && icon}
            <p className='weather_card__text'>{value}</p>
        </div>
        <p className='info_text'>{label}</p>
    </div>
);

export default WeatherCard;