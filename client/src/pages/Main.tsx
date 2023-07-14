import styled from 'styled-components';
import Splashzone from '../../public/Splashzone.png';
import ClubCard from '../components/ClubCard';
import CommunityPost from '../components/CommunityPost';

const Main = () => {
    return (
        <div style={{ width: '100%' }}>
            <StyledMain>
                <StyledContent>물위에서의 재미와 도전 그리고 열정을 공유하는</StyledContent>
                <StyledImg src={Splashzone}></StyledImg>
            </StyledMain>

            <CardSection>
                <ClubCard />
                <ClubCard />
                <ClubCard />
                <ClubCard />
                <ClubCard />
                <ClubCard />
            </CardSection>
        </div>
    );
};

export default Main;

const StyledMain = styled.div`
    background-image: url('../../public/image 2.png');
    background-size: cover;
    box-shadow: 5px 2px 2px 2px;

    display: grid;
    height: 100vh;
    grid-template-columns: repeat(12, minmax(0, 1fr));
    font-family: 'Anybody';
    font-size: 4.5rem;
    color: white;
    text-shadow: 1px 1px 1px #000;
`;

const StyledContent = styled.div`
    grid-column: 3 / 8;
    margin-top: 250px;
`;

const StyledImg = styled.img`
    margin-top: 250px;
`;

const CardSection = styled.div`
    width: 100%;
    display: grid;
    grid-template-columns: repeat(3, 420px);
    grid-auto-rows: 330px;
    flex-grow: 1;
    width: 100%;
    height: 50%;
    @media (max-width: 1024px) {
        grid-template-columns: repeat(2, 1fr);
    }

    @media (max-width: 768px) {
        grid-template-columns: repeat(1, 1fr);
    }
`;
