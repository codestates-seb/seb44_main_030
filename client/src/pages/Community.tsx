import React, { useState, useCallback, useEffect } from 'react';
import CommunityPost from '../components/CommunityPost';
import styled from 'styled-components';
import { useForm, SubmitHandler } from 'react-hook-form';
import SearchIcon from '../assets/Search.svg';
import backgroundImg from '../assets/Community_background.png';
import PageButton from '../components/PageButton';
import { useNavigate, useParams } from 'react-router-dom';
import { CommunityAllMockdata, CommunityPopularMockdata, Mocktags } from '../assets/mockdata.ts';
import ScrollBanner from '../components/common/ScrollBanner.tsx';
import ContentsCard from '../components/common/ContentsCard.tsx';
import Tag from '../components/common/Tag.tsx';
import PopularContentsSection from '../components/common/PopularContentsSection.tsx';
import TagSearchSection from '../components/common/TagSearchSection.tsx';
import { motion } from 'framer-motion';
import axios from 'axios';
type SearchInput = {
    Keyword: string;
};

const Community = () => {
    //인기게시물은 useQuery 사용 시 stale time 길게 설정
    const { page: pageStr } = useParams();
    const page = Number(pageStr);
    const [size, setSize] = useState<number>(6);
    const [currTag, setCurrTag] = useState<string>(Mocktags[0]);
    const [totalPageArr, setTotalPageArr] = useState([]);
    const [pageArr, setPageArr] = useState<Array<number>>([]);
    const [data, setData] = useState([]);
    const navigate = useNavigate();

    const onSubmit: SubmitHandler<SearchInput> = useCallback((data) => {
        //검색 api 요청 추가, Query key로 currTag, searchKeyword, currPage 넣기.
        console.log(data);
    }, []);

    // const {
    //     isLoading,
    //     error,
    //     data: CommunityTotalData,
    //   } = useQuery(
    //     ["community", query],
    //     ({ pageParam = null }) => {
    //       console.log("Fetching data");
    //       return youtube.search(query, pageParam);
    //     },
    //     {
    //       getNextPageParam: (lastPage, allPages) =>{
    //         console.log(lastPage)//lastPage는 이전에 받은 데이터를 가리킨다.
    //         return lastPage.nextPageToken || undefined},
    //     }
    //   );
    // 데이터 요청
    const fetchTotalCommunityPost = async () => {
        const response = await axios.get('http://13.209.142.240:8080/standards', {
            params: {
                page: page,
                size: size,
            },
        });
        console.log(response.data);
        // response.data
        setData(response.data.data);
        const totalPageNum = response.data.pageInfo.totalPages;
        setTotalPageArr(() => {
            const totalPageArr = [...Array(totalPageNum).keys()].map((x) => x + 1);
            setPageArr([...totalPageArr.slice(0, page - 1)]);
            return totalPageArr;
        });
    };

    useEffect(() => {
        fetchTotalCommunityPost();
    }, []);

    const handlePageList = (e: React.MouseEvent<HTMLLIElement>) => {
        if (e.currentTarget.innerText === '다음') {
            setPageArr((prev) => {
                const nextPageArr = [...prev].map((el) => el + 5);
                return [...nextPageArr];
            });
        }

        if (e.currentTarget.innerText === '이전' && page !== 1) {
            setPageArr((prev) => {
                const prevPageArr = [...prev].map((el) => el - 5);
                return [...prevPageArr];
            });
        }
    };
    const handleNavigateCreate = () => {
        navigate('/community/create', { state: 'community' });
    };
    const handleCurrPage = (e: React.MouseEvent<HTMLLIElement>) => {
        const clickedPageNum = Number(e.currentTarget.innerText);
        navigate(`/community/${clickedPageNum}`);
    };
    // useEffect(()=>{

    // },[])
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
                        {data.map((item) => (
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
