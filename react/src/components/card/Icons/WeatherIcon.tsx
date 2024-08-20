import React from 'react';
import { WiDaySunny, WiDayCloudy, WiCloud, WiDayHaze, WiRain, WiDayShowers, WiFog, WiNightAltCloudy, WiNightClear, WiNightCloudy, WiNightShowers, WiWindy } from 'react-icons/wi';



interface WeatherIconProps {
    description: string;
    size: number;
    isDay: string;
}

const WeatherIcon = ({ description,size,isDay }:WeatherIconProps) => {
    const desc = description.trim().toLowerCase();
    console.log(isDay);
    switch (desc) {
      case 'clear':
      case 'sunny':
          return isDay === 'yes' ? <WiDaySunny size={size} /> : <WiNightClear size={size} />;
      case 'partly cloudy':
          return isDay === 'yes' ? <WiDayCloudy size={size} /> : <WiNightAltCloudy size={size} />;
      case 'overcast':
          return isDay === 'yes' ? <WiCloud size={size} /> : <WiNightCloudy size={size} />;
      
      case 'moderate rain':
      case 'light rain':
          return <WiRain size={size} />;
      case 'patchy rain nearby':
      case 'patchy light rain':
      case 'rain shower':
      case 'light rain shower':
          return isDay === 'yes' ? <WiDayShowers size={size} /> : <WiNightShowers size={size} />;
      case 'haze':
      case 'mist':
      case 'fog':
          return <WiFog size={size} />;
      default:
          return null; // Para condições não cobertas
    }
  }


export default WeatherIcon;
