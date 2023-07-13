import React, { useState, useCallback } from 'react';
import CommunityPost from '../components/CommunityPost';
import styled from 'styled-components';
import { useForm, SubmitHandler } from 'react-hook-form';
import SearchIcon from '../assets/Search.svg';
import backgroundImg from '../assets/Community_background.png';
import PageButton from '../components/PageButton';
import { useNavigate } from 'react-router-dom';
import { CommunityAllMockdata, CommunityPopularMockdata, Mocktags } from '../assets/mockdata.ts';
import ScrollBanner from '../components/common/ScrollBanner.tsx';
import ContentsCard from '../components/common/ContentsCard.tsx';
import Tag from '../components/common/Tag.tsx';
import PopularContentsSection from '../components/common/PopularContentsSection.tsx';
import TagSearchSection from '../components/common/TagSearchSection.tsx';
import { motion } from 'framer-motion';

type SearchInput = {
    Keyword: string;
};

const Community = () => {
    //인기게시물은 useQuery 사용 시 stale time 길게 설정

    const [currTag, setCurrTag] = useState<string>(Mocktags[0]);
    const [pageArr, setPageArr] = useState<Array<number>>([1, 2, 3, 4, 5]);
    const [currPage, setCurrPage] = useState<number>(1);
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<SearchInput>();
    // const keywordWatched = watch("Keyword")
    const onSubmit: SubmitHandler<SearchInput> = useCallback((data) => {
        //검색 api 요청 추가, Query key로 currTag, searchKeyword, currPage 넣기.
        console.log(data);
    }, []);
    const handlePageList = (e: React.MouseEvent<HTMLLIElement>) => {
        if (e.currentTarget.innerText === '다음') {
            setPageArr((prevPageArr) => {
                const updatedPageArr = [...prevPageArr].map((el) => el + 5);
                setCurrPage(updatedPageArr[0]);
                return updatedPageArr;
            });
        }

        if (e.currentTarget.innerText === '이전') {
            currPage === 1 ||
                setPageArr((prevPageArr) => {
                    const updatedPageArr = [...prevPageArr].map((el) => el - 5);
                    setCurrPage(updatedPageArr[0]);
                    return updatedPageArr;
                });
        }
    };
    const handleNavigateCreate = () => {
        navigate('/community/create', { state: 'community' });
    };
    const handleCurrPage = (e: React.MouseEvent<HTMLLIElement>) => {
        console.log(Number(e.currentTarget.innerText));
        setCurrPage(Number(e.currentTarget.innerText));
    };
    return (
        <CommunityWarp initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <ScrollBanner bannerImg={backgroundImg} />
            <CommunityContainer>
                <PopularContentsSection />
                <TagSearchSection
                    currTag={currTag}
                    setCurrTag={setCurrTag}
                    onSubmit={onSubmit}
                    handleNavigateCreate={handleNavigateCreate}
                />
                <BottomSection>
                    <AllPostContainer>
                        {CommunityAllMockdata.map((item) => (
                            <ContentsCard key={`all_${item.standardId}`} communityProps={item} type={'community'} />
                        ))}
                    </AllPostContainer>
                    <PageContainer>
                        <PageButton onClick={handlePageList} data={{ value: '이전', currPage }} />
                        {pageArr.map((value, idx) => (
                            <PageButton key={idx} onClick={handleCurrPage} data={{ value, currPage }} />
                        ))}
                        <PageButton onClick={handlePageList} data={{ value: '다음', currPage }} />
                    </PageContainer>
                </BottomSection>
            </CommunityContainer>
        </CommunityWarp>
    );
};

export default Community;

const CommunityWarp = styled(motion.div)`
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #ffffff;
    width: 100%;
    background: linear-gradient(to right, #f8fcff, #f8fbff);
    margin-bottom: 40px;
`;

const CommunityContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    max-width: 1280px;
    button {
        border: none;
        &:active {
            box-shadow: 0px -1px 9px 0px rgba(0, 0, 0, 0.75) inset;
            -webkit-box-shadow: 0px -1px 9px 0px rgba(0, 0, 0, 0.75) inset;
            -moz-box-shadow: 0px -1px 9px 0px rgba(0, 0, 0, 0.75) inset;
        }
    }
`;

const AllPostContainer = styled.ul`
    padding: 0;
    margin: 0;
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

const BottomSection = styled.section`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const PageContainer = styled.ul`
    padding: 0;
    width: 385px;
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
    > li {
        margin: 0 3px 0 3px;
        border: none;
    }
`;
