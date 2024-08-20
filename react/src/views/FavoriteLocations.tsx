import { useEffect, useState } from 'react'
import WeatherHeader from '../components/header/Header'
import axiosClient from '../axios';
import FavoriteItem from '../components/favorite-item/FavoriteItem';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import FavoriteInfo from '../components/favorite-info/FavoriteInfo';
import FavoriteItemSkeleton from '../components/favorite-item/FavoriteItemSkeleton';

type ViewMode = 'favorites' | 'compare';

const FavoriteLocations = () => {
    const [viewMode, setViewMode] = useState<ViewMode>('favorites'); 
    const [favorites,setFavorites] = useState<Array<any>>([]);
    const [isLoadingFavorites,setIsLoadignFavorites] = useState(false);

    
    useEffect(()=>{
        fetchFavorites();
    },[]);
    
    function fetchFavorites (){
        setIsLoadignFavorites(true);
        axiosClient.get('/locations')
        .then(({data})=>{
            setFavorites(data);
            setIsLoadignFavorites(false);
        })
        .catch(({error})=>{
            setIsLoadignFavorites(false);
            console.log(error);
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
                        {!isLoadingFavorites ? (                            
                            favorites && favorites.length  ?
                            favorites.map((item)=>(
                                    <FavoriteItem key={item.id} location={item.location} id={item.id} removeFavoriteFromArray={removeFavoriteFromArray}/>                               
                                ))
                                
                            : null                            
                        ):(
                            <>
                                <FavoriteItemSkeleton/>
                                <FavoriteItemSkeleton/>
                                <FavoriteItemSkeleton/>
                            </>
                        )}
                    
                    
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