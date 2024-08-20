import React, { useEffect, useState } from 'react'
import WeatherHeader from '../components/header/Header'
import { WiThermometer } from 'react-icons/wi';
import axiosClient from '../axios';
import FavoriteItem from '../components/favorite-item/FavoriteItem';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import FavoriteInfo from '../components/favorite-info/FavoriteInfo';

type ViewMode = 'favorites' | 'compare';

const FavoriteLocations = () => {
    const [viewMode, setViewMode] = useState<ViewMode>('favorites'); 
    const [favorites,setFavorites] = useState<Array<any>>([]);

    
    useEffect(()=>{
        fetchFavorites();
    },[]);
    
    function fetchFavorites (){
        axiosClient.get('/locations')
        .then(({data})=>{
            console.log(data);
            setFavorites(data);
            console.log(favorites);
        })
        .catch(({response})=>{
            console.log(response);
        });
    }

    function removeFavoriteFromArray(id:number){
        setFavorites(prevFavorites => prevFavorites.filter(item => item.id !== id));
    }

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
                    {
                        favorites && favorites.length  ?
                        favorites.map((item)=>(
                                <FavoriteItem key={item.id} location={item.location} id={item.id} removeFavoriteFromArray={removeFavoriteFromArray}/>                               
                            ))
                        : null
                    }
                    
                </div>
            }
            { viewMode==='compare' &&
            <div className='compare_container mt-2 row'>
                <FavoriteInfo key={"location-1"} favorites={favorites}/>
                <FavoriteInfo key={"location-2"} favorites={favorites}/>
            </div>
        }
        <ToastContainer />
        </div>
    )
}

export default FavoriteLocations