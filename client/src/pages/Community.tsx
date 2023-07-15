import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import backgroundImg from '../assets/Community_background.png';
import PageButton from '../components/PageButton';
import { useNavigate, useParams } from 'react-router-dom';
import ScrollBanner from '../components/common/ScrollBanner.tsx';
import ContentsCard from '../components/common/ContentsCard.tsx';
import PopularContentsSection from '../components/common/PopularContentsSection.tsx';
import TagSearchSection from '../components/common/TagSearchSection.tsx';
import { motion } from 'framer-motion';
import { getTotalCommunityPost } from '../api/CommunityApi/CommunityApi.ts';
import { useQuery } from '@tanstack/react-query';
import { CommunityPostData } from '../types/CommunityTypes.ts';
import { savePosition } from '../store/scroll.ts';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store/store.tsx';

//한 화면에 나타낼 페이지버튼 갯수
const PAGE_COUNT = 5;

type Params = {
    page: string;
    tag: string;
    keyword: string;
  };

const Community = () => {
    const { page: pageStr, tag: currTag, keyword } = useParams<Params>();
    const page = Number(pageStr);
    const [size, setSize] = useState<number>(6);
    const [totalPageArr, setTotalPageArr] = useState<Array<number>>([]);
    const [pageArr, setPageArr] = useState<Array<number>>([]);
    const navigate = useNavigate();
    const scrollPosition = useSelector((state: RootState) => state.scroll);
    const dispatch = useDispatch();

    console.log(scrollPosition);
    const {
        isLoading,
        error: errorData,
        data: allCommunityData,
    } = useQuery(
        ['community', page],
        () => {
            console.log(`${page}페이지의 데이터를 가져옵니다.`);
            return getTotalCommunityPost(page, size);
        },
        {
            staleTime: 10000, // 10초
        },
    );

    //페이지버튼 관련 상태 업데이트
    useEffect(() => {
        if (allCommunityData) {
            const totalPageNum = allCommunityData.pageInfo.totalPages;
            const totalPageArr = [...Array(totalPageNum).keys()].map((x) => x + 1);
            //ex) 한 화면에서 보여지는 페이지번호가 1~5일 때 firstPageNum => 1
            const firstPageNum = Math.floor((page - 1) / PAGE_COUNT) * PAGE_COUNT + 1;
            //ex) 한 화면에서 보여지는 페이지번호가 1~5일 때 lastPageNum => 5
            //ex) 총 번호갯수 8이라고 할 때, 다음버튼 눌렀을 때 5~10이 아닌 5~8이 보여야함.
            const lastPageNum =
                totalPageNum > Math.ceil(page / PAGE_COUNT) * PAGE_COUNT
                    ? Math.ceil(page / PAGE_COUNT) * PAGE_COUNT
                    : totalPageNum;
            setTotalPageArr(totalPageArr);
            setPageArr([...totalPageArr.slice(firstPageNum - 1, lastPageNum)]);
        }
    }, [allCommunityData, page]);

    useEffect(() => {
        const timer = setTimeout(() => {
            window.scrollTo(0, scrollPosition);
        }, 500); // 0.5초 후에 실행
        return () => clearTimeout(timer);
    }, []);

    //다음|이전 버튼 클릭 시, 페이지 변경
    const handlePageList = (e: React.MouseEvent<HTMLLIElement>) => {
        if (
            e.currentTarget.innerText === '다음' &&
            pageArr[pageArr.length - 1] !== totalPageArr[totalPageArr.length - 1]
        ) {
            dispatch(savePosition(window.scrollY));
            navigate(`/community/${pageArr[pageArr.length - 1] + 1}/${currTag}/${keyword}`);
        }

        if (e.currentTarget.innerText === '이전' && !pageArr.includes(1)) {
            dispatch(savePosition(window.scrollY));
            navigate(`/community/${pageArr[0] - PAGE_COUNT}/${currTag}/${keyword}`);
        }
    };

    const handleNavigateCreate = () => {
        navigate('/community/create', { state: 'community' });
    };

    //페이지번호 버튼 클릭 시, 페이지 변경
    const handleCurrPage = (e: React.MouseEvent<HTMLLIElement>) => {
        dispatch(savePosition(window.scrollY));
        const clickedPageNum = Number(e.currentTarget.innerText);
        navigate(`/community/${clickedPageNum}/${currTag}/${keyword}`);
    };

    if (isLoading) {
        return <div>로딩중..!</div>;
    }
    if (errorData) {
        return <div>에러발생..!</div>;
    }

    return (
        <CommunityWarp initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <ScrollBanner bannerImg={backgroundImg} />
            <CommunityContainer>
                <PopularContentsSection />
                <TagSearchSection currTag={currTag} handleNavigateCreate={handleNavigateCreate} />
                <BottomSection>
                    <AllPostContainer>
                        {allCommunityData?.postData.map((item: CommunityPostData) => (
                            <ContentsCard key={`all_${item.standardId}`} communityProps={item} type={'community'} />
                        ))}
                    </AllPostContainer>
                    <PageContainer>
                        <PageButton onClick={handlePageList} data={{ value: '이전', page }} />
                        {pageArr.map((value, idx) => (
                            <PageButton key={idx} onClick={handleCurrPage} data={{ value, page }} />
                        ))}
                        <PageButton onClick={handlePageList} data={{ value: '다음', page }} />
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
    min-width: 1280px;
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
