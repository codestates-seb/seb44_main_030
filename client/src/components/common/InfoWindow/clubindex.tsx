import { Info } from '../../../types/info';
import { useState, useEffect } from 'react';
import './InfoWindow.css';

interface InfoWindowProps {
    map: naver.maps.Map;
    selectInfo: Info | null;
}

const ClubInfoWindow = ({ map, selectInfo }: InfoWindowProps) => {
    const [infoWindow, setInfoWindow] = useState<naver.maps.InfoWindow | null>(null);
    useEffect(() => {
        const _infoWindow = new naver.maps.InfoWindow({
            content: '',
            backgroundColor: 'transparent',
            borderWidth: 0,
            disableAnchor: true,
            pixelOffset: new naver.maps.Point(10, -20), //위치
        });
        setInfoWindow(_infoWindow);
        return () => {
            _infoWindow?.setMap(null);
        };
    }, []);

    useEffect(() => {
        if (!infoWindow || !map) return;
        if (selectInfo) {
            infoWindow.setContent(InfoWindowMaker(selectInfo));
            infoWindow.open(map, selectInfo.position);
        } else {
            infoWindow.close();
        }
    });

    return null;
};

function InfoWindowMaker(selectInfo: Info) {
    const infoWindowBox = document.createElement('div');
    infoWindowBox.className = 'infoBox';

    const infoWindowPlace = document.createElement('div');
    infoWindowPlace.className = 'infoPlaceName';
    infoWindowPlace.innerHTML = `${selectInfo.placeName}`;
    infoWindowBox.appendChild(infoWindowPlace);

    const infoWindowAddress = document.createElement('div');
    infoWindowAddress.className = 'infoAddressName';
    infoWindowAddress.innerHTML = `${selectInfo.addressName}`;
    infoWindowBox.appendChild(infoWindowAddress);

    return infoWindowBox;
}

export default ClubInfoWindow;
