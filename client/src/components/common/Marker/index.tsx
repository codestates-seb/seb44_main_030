import { useEffect } from 'react';
import './Marker.css';

interface MarkerProps {
    map: naver.maps.Map | null;
    position: {
        lat: number;
        lng: number;
    };
    content: string;
    loading?: boolean;
    onClick?: () => void;
}

const Marker = ({ map, position, content, onClick, loading }: MarkerProps) => {
    useEffect(() => {
        let marker: naver.maps.Marker | null = null;

        if (map) {
            marker = new naver.maps.Marker({
                map,
                position: new naver.maps.LatLng(position),
                icon: {
                    content,
                },
            });
            // const bounds =new naver.maps.LatLngBounds(
            //     new naver.maps.LatLng(0,0),
            //     new naver.maps.LatLng(0,0)
            // )
        }

        if (onClick) {
            if (map) {
                naver.maps.Event.addListener(marker, 'click', onClick);
                map.panTo(position);
            }
        }

        return () => {
            marker?.setMap(null);
        };
    }, [map, loading]);
    return null;
};

export default Marker;
