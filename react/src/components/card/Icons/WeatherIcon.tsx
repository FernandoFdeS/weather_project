import React from 'react';
import { WiDaySunny, WiDayCloudy, WiCloud, WiDayHaze, WiRain, WiDayShowers, WiFog } from 'react-icons/wi';



interface WeatherIconProps {
    description: string;
    size: number;
}

const WeatherIcon = ({ description,size }:WeatherIconProps) => {
    const desc = description.toLowerCase();
      
    switch (desc) {
        case 'clear':
        case 'sunny':
        return <WiDaySunny size={size}/>;
          case 'partly cloudy':
            return <WiDayCloudy size={size}/>;
          case 'overcast':
            return <WiCloud size={size}/>;
          case 'haze':
            return <WiDayHaze size={size}/>;
          case 'moderate rain':
          case 'light rain':
            return <WiRain size={size}/>;
          case 'patchy rain nearby':
          case 'light rain shower':
            return <WiDayShowers size={size}/>;
          case 'mist':
            return <WiFog size={size}/>;
          default:
            return null; // Para condições não cobertas
        }
    }


export default WeatherIcon;
