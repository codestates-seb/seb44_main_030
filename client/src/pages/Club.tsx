import styled from 'styled-components';
import { useCallback, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { SubmitHandler } from 'react-hook-form';
import { motion } from 'framer-motion';

import BackgroundImg from '../assets/oceanbeach.png';
import ScrollBanner from '../components/common/ScrollBanner';
import { ClubDummyData, Mocktags } from '../../public/clubMockdata.ts';
import ContentsCard from '../components/common/ContentsCard';
import TagSearchSection from '../components/common/TagSearchSection.tsx';
import PopularContentsSection from '../components/common/PopularContentsSection.tsx';
import useClubBoardData from '../api/ClubApi/ClubDataHooks.ts';
import { ClubBoardData } from '../types/ClubData.ts';

import { reset } from '../store/scroll.ts';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store/store.tsx';

type SearchInput = {
    Keyword: string;
};

function Club() {
    const [currTag, setCurrTag] = useState<string>(Mocktags[0]);
    const navigate = useNavigate();
    const scrollPosition = useSelector((state: RootState) => state.scroll);
    const dispatch = useDispatch();
    const onSubmit: SubmitHandler<SearchInput> = useCallback((data) => {
        //검색 api 요청 추가, Query key로 currTag, searchKeyword, currPage 넣기.
        console.log(data);
    }, []);

    const handleNavigateCreate = () => {
        navigate('/club/create', { state: 'club' });
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            window.scrollTo(0, scrollPosition);
        }, 300); // 0.3초 후에 실행
        dispatch(reset());
        return () => clearTimeout(timer);
    }, []);

    const { status, data, error, fetchNextPage, hasNextPage, isFetching, isFetchingNextPage } = useClubBoardData();
    console.log(data);

    useEffect(() => {
        let fetching = false;
        const onScroll = async () => {
            const { scrollHeight, scrollTop, clientHeight } = document.documentElement;

            if (!fetching && scrollHeight - scrollTop <= clientHeight) {
                fetching = true;
                console.log('fetching more data, hasNextPage:', hasNextPage);
                if (hasNextPage) await fetchNextPage();
                fetching = false;
            }
        };

        document.addEventListener('scroll', onScroll);
        return () => {
            document.removeEventListener('scroll', onScroll);
        };
    }, [hasNextPage, fetchNextPage]);

    console.log(data);

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
                    {status === 'loading' ? (
                        <div>Loading...</div>
                    ) : status === 'error' ? (
                        <div>Error: {error.message}</div>
                    ) : (
                        data &&
                        data.pages &&
                        data.pages.map((page) =>
                            page.data.map((clubData: ClubBoardData) => {
                                console.log(clubData);
                                return <ContentsCard key={clubData.boardClubId} clubProps={clubData} type={'club'} />;
                            }),
                        )
                    )}
                    {(isFetching || isFetchingNextPage) && 'Loading more...'}
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
