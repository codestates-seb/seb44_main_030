import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store/store';
import { Info } from '../types/info';
import Marker from './common/Marker';
import InfoWindow from './common/InfoWindow';
import { setSelectionInstance } from '../store/selectinfo';
import { setToast } from '../store/toastState';

interface MarkersContaierProps {
    updateClubMap: (data: any) => void;
    setShowMap: React.Dispatch<React.SetStateAction<boolean>>;
}

const MarkersContainer = ({ updateClubMap, setShowMap }: MarkersContaierProps) => {
    const dispatch = useDispatch();
    const map = useSelector((state: RootState) => state.counter.mapInstance);
    const infos = useSelector((state: RootState) => state.info.infoInstance);
    const selection = useSelector((state: RootState) => state.selection.selection);
    const submitHandler = () => {
        console.log(selection);
        updateClubMap(selection);
        dispatch(setToast('저장되었습니다!'));
        setShowMap(false);
    };
    console.log(selection);
    if (!map || !infos) return null;
    return (
        <div>
            {infos.map((info: Info) => (
                <Marker
                    map={map}
                    key={info.id}
                    position={info.position}
                    content={"<div class='marker'/>"}
                    onClick={() => {
                        dispatch(setSelectionInstance(info));
                    }}
                />
            ))}
            {selection && (
                <Marker
                    map={map}
                    key={selection.id}
                    position={selection.position}
                    content={"<div class='marker select'/>"}
                    onClick={() => {
                        dispatch(setSelectionInstance(null));
                    }}
                />
            )}
            <InfoWindow map={map} selectInfo={selection} onSubmit={submitHandler} />
        </div>
    );
};

export default MarkersContainer;
