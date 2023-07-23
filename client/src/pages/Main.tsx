import styled from 'styled-components';
import Splashzone from '../../public/Splashzone.png';
import { useState } from 'react';
import { motion } from 'framer-motion';
import ContentsCard from '../components/common/ContentsCard';
import { useQuery } from '@tanstack/react-query';
import { getMaincommunity } from '../api/MainApi/MainClubApi';
import getMainclub from '../api/MainApi/MainClubApi';
import { Loading } from '../components/Lodaing';
import { CommunityPostData } from '../types/CommunityTypes';
import { ClubBoardData } from '../types/ClubData';

const Main = () => {
    const [page, setPage] = useState(1);
    const { data: community } = useQuery({
        queryKey: ['maincommunity'],
        queryFn: () => getMaincommunity(),
    });
    const {
        data: Club,
        isLoading,
        isError,
        error,
    } = useQuery<any, Error>({
        queryKey: ['mainClub', page],
        queryFn: () => getMainclub(page),
    });

    const Comudata = community?.postData;

    if (isLoading) return <Loading />;

    if (isError)
        return (
            <>
                <h3>Oops, someting went wrong</h3> <p>{error.toString()}</p>
            </>
        );

    return (
        <motion.div style={{ width: '100%' }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <StyledMain>
                <StyledContent>물위에서의 재미와 도전 그리고 열정을 공유하는</StyledContent>
                <StyledImg src={Splashzone}></StyledImg>
            </StyledMain>
            <StyledClub>
                <div style={{ display: 'flex' }}>
                    {Club.map((clubData: ClubBoardData) => {
                        return <ContentsCard key={clubData.boardClubId} clubProps={clubData} type={'club'} />;
                    })}
                </div>
                <div style={{ display: 'flex' }}>
                    {Comudata &&
                        Comudata.map((item: CommunityPostData) => (
                            <ContentsCard key={`all_${item.standardId}`} communityProps={item} type={'community'} />
                        ))}
                </div>
            </StyledClub>
        </motion.div>
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
    font-size: 70px;
    color: white;
    min-width: 443px;
    min-height: 650px;
    text-shadow: 1px 1px 1px #000;
    @media (max-width: 1024px) {
        font-size: 40px;
    }
`;

const StyledContent = styled.div`
    grid-column: 3 / 8;
    margin-top: 250px;
`;

const StyledImg = styled.img`
    margin-top: 250px;
`;

const StyledClub = styled.div`
    width: 100%;
    height: 100%;
    display: grid;
    grid-template-columns: 1fr 1fr;
`;
