import React from 'react';

interface WeatherBadgeProps {
    icon?: React.ReactNode;
    value: string | number;
    label: string;
}

const WeatherBadge: React.FC<WeatherBadgeProps> = ({ icon, value, label }) => {
    return (
        <span className='card_badge'>
            {icon} {value}
            <p>{label}</p>
        </span>
    );
}

export default WeatherBadge;
