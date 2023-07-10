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
import ClubCard from '../components/ClubCard.tsx';

type SearchInput = {
    Keyword: string;
};
interface BackgroundProps {
    $image: string;
}
const Community = () => {
    //인기게시물은 useQuery 사용 시 stale time 길게 설정

    const [currTag, setCurrTag] = useState<string>(Mocktags[0]);
    const [pageArr, setPageArr] = useState<Array<number>>([1, 2, 3, 4, 5]);
    const [currPage, setCurrPage] = useState<number>(1);
    const navigate = useNavigate();
    const handleTagSelect = useCallback((e: React.MouseEvent<HTMLLIElement>) => {
        setCurrTag(e.currentTarget.innerText);
    }, []);
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
        navigate('/community/create');
    };
    const handleCurrPage = (e: React.MouseEvent<HTMLLIElement>) => {
        console.log(Number(e.currentTarget.innerText));
        setCurrPage(Number(e.currentTarget.innerText));
    };
    return (
        <CommunityWarp>
            <ScrollBanner bannerImg={backgroundImg} />
            <CommunityContainer>
                <TopSection>
                    <h2>인기게시물</h2>
                    <PopularPostContainer>
                        {CommunityPopularMockdata.map((item) => (
                            <CommunityPost key={`popular_${item.standardId}`} postdata={item} />
                        ))}
                    </PopularPostContainer>
                </TopSection>
                <MiddleSection>
                    <TagSpace>
                        {Mocktags.map((tagName, idx) => (
                            <li key={idx} className={`${currTag === tagName}`} tabIndex={0} onClick={handleTagSelect}>
                                {tagName}
                            </li>
                        ))}
                    </TagSpace>
                    <SearchSpace>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <label htmlFor="searchInput" />
                            <div>
                                <input
                                    id="searchInput"
                                    type="text"
                                    placeholder="Search..."
                                    {...register('Keyword', {
                                        required: true,
                                        validate: (value) => value.trim().length >= 2 || '두 글자 이상 입력해주세요',
                                    })}
                                />
                                {/* {errors.Keyword ? <span>{errors.Keyword.message}</span> : <span></span>} 모달로 대체 */}
                                <button>
                                    <img src={SearchIcon} alt="searchIcon" />
                                </button>
                            </div>
                        </form>
                    </SearchSpace>
                    <button onClick={handleNavigateCreate}>글 작성</button>
                </MiddleSection>
                <BottomSection>
                    <AllPostContainer>
                        {CommunityAllMockdata.map((item) => (
                            <ClubCard key={`all_${item.standardId}`} communityProps={item} />
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

const CommunityWarp = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #ffffff;
    width: 100%;
`;

const CommunityContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    button {
        border: none;
        &:active {
            box-shadow: 0px -1px 9px 0px rgba(0, 0, 0, 0.75) inset;
            -webkit-box-shadow: 0px -1px 9px 0px rgba(0, 0, 0, 0.75) inset;
            -moz-box-shadow: 0px -1px 9px 0px rgba(0, 0, 0, 0.75) inset;
        }
    }
`;
const TopSection = styled.section`
    width: 1345px;
    height: 507px;
    border-radius: 15px;
    // border: 1px solid #696969;
    background-color: #fff;
    box-shadow: 0px 4px 15px 0px rgba(0, 0, 0, 0.25);
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 50px;
`;
const PopularPostContainer = styled.ul`
    display: flex;
    justify-content: center;
    padding: 0;
    flex-wrap: wrap;
    > li {
        margin: 0 20px 20px 20px;
    }
`;
const MiddleSection = styled.section`
    width: 1347px;
    margin-top: 30px;
    margin-bottom: 20px;
    height: 100px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    > button {
        width: 60px;
        height: 45px;
        border-radius: 5px;
        background-color: #3884d5;
        color: #ffffff;
        box-shadow: 0px 4px 15px 0px rgba(0, 0, 0, 0.25);

        &:hover {
            cursor: pointer;
            background-color: #5797dc;
        }
    }
`;
const TagSpace = styled.ul`
    width: 550px;
    height: 90px;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    padding: 5px 0 5px 0;
    align-items: center;
    border-radius: 15px;
    // border: 1px solid #696969;
    background: #fff;
    box-shadow: 0px 4px 15px 0px rgba(0, 0, 0, 0.25);
    > li {
        font-size: 17px;
        background-color: #696969;
        color: #ffffff;
        padding: 5px 9px 5px 9px;
        border-radius: 20px;
        list-style: none;
        white-space: nowrap;
        margin: 5px 0px 5px 5px;
        box-shadow: 0px 0px 2px 0px rgba(0, 0, 0, 0.75);
        -webkit-box-shadow: 0px 0px 2px 0px rgba(0, 0, 0, 0.75);
        -moz-box-shadow: 0px 0px 2px 0px rgba(0, 0, 0, 0.75);
        &:hover {
            cursor: pointer;
        }
        &:active {
            box-shadow: 0px -1px 9px 0px rgba(0, 0, 0, 0.75) inset;
            -webkit-box-shadow: 0px -1px 9px 0px rgba(0, 0, 0, 0.75) inset;
            -moz-box-shadow: 0px -1px 9px 0px rgba(0, 0, 0, 0.75) inset;
        }
        &:focus {
            box-shadow: 0px 0px 2px 0px rgba(0, 0, 0, 0.75) inset;
            -webkit-box-shadow: 0px 0px 2px 0px rgba(0, 0, 0, 0.75) inset;
            -moz-box-shadow: 0px 0px 2px 0px rgba(0, 0, 0, 0.75) inset;
        }
    }

    > li.true {
        background-color: #3884d5;
    }
`;
const SearchSpace = styled.div`
    > form {
        display: flex;
        flex-direction: column;
        align-items: center;
        > div {
            width: 400px;
            height: 40px;
            display: flex;
            > input {
                height: 100%;
                border-radius: 15px 0 0 15px;
                border: none;
                background: #fff;
                box-shadow: 0px 4px 15px 0px rgba(0, 0, 0, 0.25);
                padding-left: 15px;
                font-size: 20px;
                flex-basis: 90%;
                &:focus {
                    outline: solid 2px #3884d5;
                }
            }
        }
    }

    button {
        width: 44.5px;
        height: 43px;
        font-size: 20px;
        flex-basis: 10%;
        border-radius: 0 15px 15px 0;
        background-color: #3884d5;
        display: flex;
        justify-content: center;
        align-items: center;
        box-shadow: 0px 4px 15px 0px rgba(0, 0, 0, 0.25);
        &:hover {
            cursor: pointer;
            background-color: #5797dc;
        }
        > img {
            width: 30px;
            height: 30px;
        }
    }
`;
const AllPostContainer = styled.ul`
    display: flex;
    justify-content: center;
    padding: 0;
    flex-wrap: wrap;
    > li {
        margin: 0 20px 20px 20px;
    }
`;

const BottomSection = styled.section`
    height: 700px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const PageContainer = styled.ul`
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

export default Community;
