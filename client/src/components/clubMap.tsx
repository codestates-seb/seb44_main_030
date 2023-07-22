import Marker from './common/Marker';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import MapContainer from './Mapcontainer';
import ClubInfoWindow from './common/InfoWindow/clubindex';
import { useEffect } from 'react';

interface ClubMapProps {
    mapdata: {
        addressName: string;
        placeName: string;
        latitude: number;
        longitude: number;
    };
}

const ClubMapContainer = ({ mapdata }: ClubMapProps) => {
    const map = useSelector((state: RootState) => state.counter.mapInstance);
    console.log(mapdata);
    const { addressName, placeName, latitude: lat, longitude: lng } = mapdata;

    const data = {
        // id: 1,
        addressName,
        placeName,
        position: {
            lat,
            lng,
        },
    };

    console.log(data);

    const newcenter = new naver.maps.LatLng(data.position.lat, data.position.lng);
    useEffect(() => {
        if (map) {
            map.setCenter(newcenter);
            console.log('센터바뀜');
        }
    }, [map]);

    return (
        <div style={{ width: '960px' }}>
            <MapContainer></MapContainer>

            <Marker map={map} position={data.position} content={"<div class='marker'/>"} />

            <ClubInfoWindow map={map} selectInfo={data} />
        </div>
    );
};

export default ClubMapContainer;
