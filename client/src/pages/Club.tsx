import styled from 'styled-components';
import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SubmitHandler } from 'react-hook-form';
import { motion } from 'framer-motion';

import BackgroundImg from '../assets/oceanbeach.png';
import back from '../../public/grouping 1.png';
import ScrollBanner from '../components/common/ScrollBanner';
import { ClubDummyData, Mocktags } from '../../public/clubMockdata.ts';
import ContentsCard from '../components/common/ContentsCard';
import TagSearchSection from '../components/common/TagSearchSection.tsx';
import PopularContentsSection from '../components/common/PopularContentsSection.tsx';

type SearchInput = {
    Keyword: string;
};

function Club() {
    const navigate = useNavigate();
    const [currTag, setCurrTag] = useState<string>(Mocktags[0]);
    const onSubmit: SubmitHandler<SearchInput> = useCallback((data) => {
        //검색 api 요청 추가, Query key로 currTag, searchKeyword, currPage 넣기.
        console.log(data);
    }, []);
    const handleNavigateCreate = () => {
        navigate('/club/create', { state: 'club' });
    };
    return (
        <ClubWarp initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <ScrollBanner bannerImg={BackgroundImg} />
            <ContentContainer>
                <PopularContentsSection />
                <TagSearchSection
                    handleNavigateCreate={handleNavigateCreate}
                    currTag={currTag}
                    setCurrTag={setCurrTag}
                    onSubmit={onSubmit}
                />
                <CardSection>
                    {ClubDummyData.map((data) => {
                        return <ContentsCard key={data.boardClubId} clubProps={data} type={'club'} />;
                    })}
                </CardSection>
            </ContentContainer>
        </ClubWarp>
    );
}

export default Club;

const ClubWarp = styled(motion.div)`
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #ffffff;
    width: 100%;
    background: linear-gradient(to right, #f8fcff, #f8fbff);
`;

const ContentContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    max-width: 1280px;
    margin: 7rem;
    padding-top: 5vh;
`;

const CardSection = styled.section`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
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
