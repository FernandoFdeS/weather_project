import {
    WiDirectionUp,
    WiDirectionUpRight,
    WiDirectionRight,
    WiDirectionDownRight,
    WiDirectionDown,
    WiDirectionDownLeft,
    WiDirectionLeft,
    WiDirectionUpLeft,
} from 'react-icons/wi';

interface WindIconProps {
    windDirection: string;
}

const WindIcon = ({ windDirection }:WindIconProps) => {
    const direction = windDirection.slice(0, 2).toUpperCase();
    switch (direction) {
        case 'NN':
        case 'N':
            return <WiDirectionUp size={72} />;
        case 'EN':
        case 'NE':
            return <WiDirectionUpRight size={72} />;
        case 'E':
            return <WiDirectionRight size={72} />;
        case 'SE':
        case 'ES':
            return <WiDirectionDownRight size={72} />;
        case 'SS':
        case 'S':
            return <WiDirectionDown size={72} />;
        case 'SW':
        case 'WS':
            return <WiDirectionDownLeft size={72} />;
        case 'W':
            return <WiDirectionLeft size={72} />;
        case 'NW':
        case 'WN':
            return <WiDirectionUpLeft size={72} />;
        default:
            return null;
    }
};

export default WindIcon;
