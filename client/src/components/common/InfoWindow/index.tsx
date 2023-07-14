import { Info } from '../../../types/info';
import { useState, useEffect } from 'react';
import './InfoWindow.css';

interface InfoWindowProps {
    map: naver.maps.Map;
    selectInfo: Info | null;
    onSubmit?: () => void;
}

const InfoWindow = ({ map, selectInfo, onSubmit }: InfoWindowProps) => {
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
            infoWindow.setContent(InfoWindowMaker(selectInfo, onSubmit));
            infoWindow.open(map, selectInfo.position);
        } else {
            infoWindow.close();
        }
    }, [selectInfo]);

    return null;
};

function InfoWindowMaker(selectInfo: Info, onSubmit?: () => void) {
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

    if (onSubmit) {
        const infoWindowButton = document.createElement('div');
        infoWindowButton.className = 'infoSubmit';
        infoWindowButton.innerHTML = '등록';
        infoWindowButton.onclick = onSubmit;
        infoWindowBox.appendChild(infoWindowButton);
    }
    return infoWindowBox;
}

export default InfoWindow;
