import React, { useState } from 'react'
import WeatherHeader from '../components/header/Header'
import { MagnifyingGlassIcon, TrashIcon } from '@heroicons/react/24/solid'
import { WiThermometer } from 'react-icons/wi';

type ViewMode = 'favorites' | 'compare';

const FavoriteLocations = () => {
    const [viewMode, setViewMode] = useState<ViewMode>('favorites'); 


    return (
        <div className='favorites_containter'>
            <WeatherHeader/>

            <div className='favorites_select'>
                <div className={`favorites_select__option ${viewMode === 'favorites' ? '--active': '' }`} onClick={()=>setViewMode('favorites')}>
                    Favoritos
                </div>
                <div className={`favorites_select__option ${viewMode === 'compare' ? '--active': '' }`} onClick={()=>setViewMode('compare')}>
                    Comparar
                </div>
            </div>

            { viewMode==='favorites' &&
                <div className='favorites_list row'>
                    <div className='favorite_list__item col-12 mt-2'>
                        <span> 1 | Localidade</span>
                        <div className='favorite_list__item_buttons'>
                            <button className='button'><MagnifyingGlassIcon width={18}/></button>
                            <button className='del_button button'><TrashIcon width={18}/></button>
                        </div>
                    </div>
                </div>
            }
            { viewMode==='compare' &&
            <div className='compare_container mt-2 row'>

                <div className='compare_container__card_wrap col-6'>
                    <div className='compare_container__select'>
                        <select className='form-group form-select'>
                            <option>Localidade 1</option>
                        </select>
                    </div>
                    <div className='compare_container__card mt-2'>
                        <p className='compare_container_card_title'>Localidade</p>
                        <span className='card_badge'><WiThermometer size={22}/>Temperatura</span>
                    </div>
                </div>

                <div className='compare_container__card_wrap col-6'>
                    <div className='compare_container__select'>
                        <select className='form-group form-select'>
                            <option>Localidade 1</option>
                        </select>
                    </div>
                    <div className='compare_container__card mt-2'>
                        <p className='compare_container_card_title'>Localidade</p>
                        <span className='card_badge'><WiThermometer size={22}/>Temperatura</span>
                    </div>
                </div>

            </div>
        }

        </div>
    )
}

export default FavoriteLocations