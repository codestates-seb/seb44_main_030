import MapContainer from '../components/Mapcontainer';
import MarkersContainer from '../components/MarkersContainer';
import Fetching from './fetching';

const Map = () => {
    return (
        <div>
            <MapContainer></MapContainer>
            <MarkersContainer></MarkersContainer>
            <Fetching />
        </div>
    );
};

export default Map;
