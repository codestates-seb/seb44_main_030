import MapContainer from '../components/Mapcontainer';
import MarkersContainer from '../components/MarkersContainer';
import Wrapper from '../components/style/Wrapper';
import Fetching from './SearchEngine';
import styled from 'styled-components';

interface MapProps {
    updateClubMap: (data: any) => void;
    setShowMap: React.Dispatch<React.SetStateAction<boolean>>;
}

const Map = ({ setShowMap, updateClubMap }: MapProps) => {
    return (
        <StyledModal>
            <div className="modal" style={{ position: 'relative' }}>
                <MapContainer></MapContainer>
                <MarkersContainer updateClubMap={updateClubMap} setShowMap={setShowMap}></MarkersContainer>
                <div style={{ position: 'absolute', top: '0px', right: '0%' }}>
                    <Fetching />
                    <StyledButton
                        style={{ position: 'absolute', top: '0px', right: '0px' }}
                        onClick={() => setShowMap(false)}
                    >
                        ❌
                    </StyledButton>
                </div>
                <Wrapper width="900px" height="200px">
                    <h3>Tip</h3>
                    <p>STEP1 근처 역 혹은 지역이름을 키워드로 검색합니다.</p>
                    <p>STEP2 줌을통해 지역을 확인후 마커를 클릭해 장소를 등록합니다.</p>
                </Wrapper>
            </div>
        </StyledModal>
    );
};

const StyledModal = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    backdrop-filter: blur(10px);
    background-color: rgba(66, 65, 65, 0.2);
    z-index: 9999;

    .modal {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        z-index: 9999;
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 1000px;
        height: 600px;
        background-color: white;
        padding: 10px;
        border-radius: 5px;
    }
`;

const StyledButton = styled.button`
    background-color: #ced6df;
    border: 1px solid rgba(0, 0, 0, 0.1);
    color: white;
    cursor: pointer;
`;

export default Map;
