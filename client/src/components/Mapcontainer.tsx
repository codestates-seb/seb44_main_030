import { useDispatch } from 'react-redux';
import Map from './Map';
import { setMapInstance } from '../store/map';

const MapContainer = () => {
    const dispatch = useDispatch();
    const initMap = (map: naver.maps.Map) => {
        dispatch(setMapInstance(map));
        naver.maps.Event.addListener(map, 'click', () => {
            console.log('클릭');
        });
    };

    return <Map width="100%" height="800px" initMap={initMap} />;
};

export default MapContainer;
