import styled from 'styled-components';
import { useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import BackgroundImg from '../assets/oceanbeach.png';
import ScrollBanner from '../components/common/ScrollBanner';
import ContentsCard from '../components/common/ContentsCard';
import TagSearchSection from '../components/common/TagSearchSection.tsx';
import useClubBoardData from '../api/ClubApi/ClubDataHooks.ts';
import { ClubBoardData } from '../types/ClubData.ts';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store.tsx';

function Club() {
    const { tag: currTag } = useParams();
    const navigate = useNavigate();
    const scrollPosition = useSelector((state: RootState) => state.scroll);

    const handleNavigateCreate = () => {
        navigate('/club/create', { state: 'club' });
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            window.scrollTo(0, scrollPosition);
        }, 500); // 0.5초 후에 실행
        return () => clearTimeout(timer);
    }, [scrollPosition]);

    const { status, data, error, fetchNextPage, hasNextPage, isFetching, isFetchingNextPage } = useClubBoardData();
    const loadingRef = useRef(null);

    useEffect(() => {
        if (loadingRef.current && hasNextPage) {
            const observer = new IntersectionObserver(
                (entries) => {
                    const first = entries[0];
                    if (first.isIntersecting) {
                        fetchNextPage();
                    }
                },
                { threshold: 0.5 },
            );
            observer.observe(loadingRef.current);

            return () => observer.disconnect();
        }
    }, [hasNextPage, fetchNextPage]);

    return (
        <ClubWarp initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <ScrollBanner bannerImg={BackgroundImg} />
            <ContentContainer>
                <TagSearchSection currTag={currTag} handleNavigateCreate={handleNavigateCreate} />
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
                                // console.log(clubData);
                                return (
                                    <motion.div
                                        key={clubData.boardClubId}
                                        initial={{ opacity: 0, scale: 1.3 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.5 }}
                                        transition={{ duration: 0.5 }}
                                    >
                                        <ContentsCard clubProps={clubData} type={'club'} />
                                    </motion.div>
                                );
                            }),
                        )
                    )}
                    <div ref={loadingRef}>{(isFetching || isFetchingNextPage) && 'Loading more...'}</div>
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
