import { MagnifyingGlassIcon } from '@heroicons/react/24/solid';
import { VscThreeBars } from 'react-icons/vsc';
import { Link, useLocation } from 'react-router-dom';

const WeatherHeader = () => {
    const path = useLocation();

    return(
        <div className='header'>
            <h3 className='header__title'>
                Weather<span className='header__title--bold'>APP</span>
            </h3>
           
                {path.pathname == "/" ?
                    <Link to="/favorite" className='header__button button'>
                        <VscThreeBars color='white'/>
                    </Link>
                    :
                    <Link to="/"  className='header__button button'>
                        <MagnifyingGlassIcon color='white'/>
                    </Link>
                }
            
        </div>
    )
};

export default WeatherHeader;