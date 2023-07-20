import Marker from './common/Marker';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import MapContainer from './Mapcontainer';
import ClubInfoWindow from './common/InfoWindow/clubindex';
import { useEffect } from 'react';

const ClubMapContainer = () => {
    const map = useSelector((state: RootState) => state.counter.mapInstance);

    const data = {
        id: 1,
        addressName: '서울 용산구 동자동 43-205',
        placeName: '서울역',
        position: {
            lat: 37.5546788388674,
            lng: 126.970606917394,
        },
    };

    const newcenter = new naver.maps.LatLng(data.position.lat, data.position.lng);
    useEffect(() => {
        if (map) {
            map.setCenter(newcenter);
            console.log('센터바뀜');
        }
    }, [map]);

    return (
        <div style={{ width: '600px' }}>
            <MapContainer></MapContainer>
            <Marker map={map} position={data.position} content={"<div class='marker'/>"} />
            <ClubInfoWindow map={map} selectInfo={data} />
        </div>
    );
};

export default ClubMapContainer;
