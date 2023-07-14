import { useEffect } from 'react';

interface MapProps {
    width: string;
    height: string;
    initMap?: (map: naver.maps.Map) => void;
}

const Map = ({ width, height, initMap }: MapProps) => {
    useEffect(() => {
        const mapOptions = {
            center: new naver.maps.LatLng(37.3595704, 127.105399),
            zoom: 12,
            scaleControl: false,
            logoControl: false,
            mapDataControl: false,
            zoomControl: true,
            minZoom: 6,
        };

        const map = new naver.maps.Map('map', mapOptions);
        if (initMap) {
            initMap(map);
        }
    }, []);
    return <div id="map" style={{ width, height }}></div>;
};

export default Map;
