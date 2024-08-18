import React from 'react';
import { WiDaySunny, WiDayCloudy, WiCloud, WiDayHaze, WiRain, WiDayShowers, WiFog } from 'react-icons/wi';



interface WeatherIconProps {
    description: string;
}

const WeatherIcon = ({ description }:WeatherIconProps) => {
    const desc = description.toLowerCase();
      
    switch (desc) {
        case 'clear':
        case 'sunny':
        return <WiDaySunny size={42}/>;
          case 'partly cloudy':
            return <WiDayCloudy size={42}/>;
          case 'overcast':
            return <WiCloud size={42}/>;
          case 'haze':
            return <WiDayHaze size={42}/>;
          case 'moderate rain':
          case 'light rain':
            return <WiRain size={42}/>;
          case 'patchy rain nearby':
          case 'light rain shower':
            return <WiDayShowers size={42}/>;
          case 'mist':
            return <WiFog size={42}/>;
          default:
            return null; // Para condições não cobertas
        }
    }


export default WeatherIcon;
