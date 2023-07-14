import { useDispatch } from 'react-redux';
import { setSelectionInstance } from '../store/selectinfo';
import Map from './Map';
import { setMapInstance } from '../store/map';

const MapContainer = () => {
    const dispatch = useDispatch();

    const initMap = (map: naver.maps.Map) => {
        dispatch(setMapInstance(map));
        naver.maps.Event.addListener(map, 'click', () => {
            //selectInfo =null
            dispatch(setSelectionInstance(null));
        });
    };

    return <Map width="100%" height="600px" initMap={initMap} />;
};

export default MapContainer;
