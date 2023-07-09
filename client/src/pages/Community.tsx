import React, { useState, useCallback } from 'react';
import CommunityPost from '../components/CommunityPost';
import ProfileImg from '../assets/ProfileImg.png';
import styled from 'styled-components';
import { useForm, SubmitHandler } from 'react-hook-form';
import SearchIcon from '../assets/Search.svg';
import backgroundImg from '../assets/Community_background.png';
import PageButton from '../components/PageButton';
import { useNavigate } from 'react-router-dom';
type SearchInput = {
    Keyword: string;
};
interface BackgroundProps {
    $image: string;
}
const Community = () => {
    const mockdata = [
        {
            memberId: 1,
            memberProfileImg: ProfileImg,
            name: '닉네임1',
            title: '아무제목이나제목이길어진다면~~~~~~~~~~~~',
            content: '가나다라마바사아자차가나다라마바사아자차가나다라마...',
            tag: '카이트서핑',
            view: 200,
            registeredAt: '2023-06-16T13:42:42.528845',
            modifiedAt: '2023-06-16T13:42:42.528845',
            like: 5,
            commentCount: 3,
            memberLiked: [1, 2, 3],
            standardId: 1,
        },
        {
            memberId: 1,
            memberProfileImg: ProfileImg,
            name: '닉네임1',
            title: '아무제목이나~~',
            content: '가나다라마바사아자차가나다라마바사아자차가나다라마...',
            tag: '스쿠버다이빙',
            view: 110,
            registeredAt: '2023-06-16T13:42:42.528845',
            modifiedAt: '2023-06-16T13:42:42.528845',
            like: 5,
            commentCount: 3,
            memberLiked: [2, 3],
            standardId: 2,
        },
        {
            memberId: 3,
            memberProfileImg: ProfileImg,
            name: '닉네임1',
            title: '아무제목이나~~',
            content: '가나다라마바사아자차가나다라마바사아자차가나다라마...',
            tag: '카약&카누',
            view: 123,
            registeredAt: '2023-06-16T13:42:42.528845',
            modifiedAt: null,
            like: 5,
            commentCount: 3,
            memberLiked: [1, 2, 3],
            standardId: 3,
        },
        {
            memberId: 1,
            memberProfileImg: ProfileImg,
            name: '닉네임1',
            title: '아무제목이나~~',
            content: '가나다라마바사아자차가나다라마바사아자차가나다라마...',
            tag: '카이트서핑',
            view: 200,
            registeredAt: '2023-06-16T13:42:42.528845',
            modifiedAt: '2023-06-16T13:42:42.528845',
            like: 5,
            commentCount: 3,
            memberLiked: [1, 2, 3],
            standardId: 4,
        },
        {
            memberId: 1,
            memberProfileImg: ProfileImg,
            name: '닉네임1',
            title: '아무제목이나~~',
            content: '가나다라마바사아자차가나다라마바사아자차가나다라마...',
            tag: '스쿠버다이빙',
            view: 110,
            registeredAt: '2023-06-16T13:42:42.528845',
            modifiedAt: '2023-06-16T13:42:42.528845',
            like: 5,
            commentCount: 3,
            memberLiked: [2, 3],
            standardId: 5,
        },
        {
            memberId: 3,
            memberProfileImg: ProfileImg,
            name: '닉네임1',
            title: '아무제목이나~~',
            content: '가나다라마바사아자차가나다라마바사아자차가나다라마...',
            tag: '카약&카누',
            view: 123,
            registeredAt: '2023-06-16T13:42:42.528845',
            modifiedAt: null,
            like: 5,
            commentCount: 3,
            memberLiked: [1, 2, 3],
            standardId: 6,
        },
        {
            memberId: 1,
            memberProfileImg: ProfileImg,
            name: '닉네임1',
            title: '아무제목이나~~',
            content: '가나다라마바사아자차가나다라마바사아자차가나다라마...',
            tag: '카이트서핑',
            view: 200,
            registeredAt: '2023-06-16T13:42:42.528845',
            modifiedAt: '2023-06-16T13:42:42.528845',
            like: 5,
            commentCount: 3,
            memberLiked: [1, 2, 3],
            standardId: 7,
        },
        {
            memberId: 1,
            memberProfileImg: ProfileImg,
            name: '닉네임1',
            title: '아무제목이나~~',
            content: '가나다라마바사아자차가나다라마바사아자차가나다라마...',
            tag: '스쿠버다이빙',
            view: 110,
            registeredAt: '2023-06-16T13:42:42.528845',
            modifiedAt: '2023-06-16T13:42:42.528845',
            like: 5,
            commentCount: 3,
            memberLiked: [2, 3],
            standardId: 8,
        },
        {
            memberId: 3,
            memberProfileImg: ProfileImg,
            name: '닉네임1',
            title: '아무제목이나~~',
            content: '가나다라마바사아자차가나다라마바사아자차가나다라마...',
            tag: '카약&카누',
            view: 123,
            registeredAt: '2023-06-16T13:42:42.528845',
            modifiedAt: null,
            like: 5,
            commentCount: 3,
            memberLiked: [1, 2, 3],
            standardId: 9,
        },
        {
            memberId: 1,
            memberProfileImg: ProfileImg,
            name: '닉네임1',
            title: '아무제목이나~~',
            content: '가나다라마바사아자차가나다라마바사아자차가나다라마...',
            tag: '카이트서핑',
            view: 200,
            registeredAt: '2023-06-16T13:42:42.528845',
            modifiedAt: '2023-06-16T13:42:42.528845',
            like: 5,
            commentCount: 3,
            memberLiked: [1, 2, 3],
            standardId: 10,
        },
        {
            memberId: 1,
            memberProfileImg: ProfileImg,
            name: '닉네임1',
            title: '아무제목이나~~',
            content: '가나다라마바사아자차가나다라마바사아자차가나다라마...',
            tag: '스쿠버다이빙',
            view: 110,
            registeredAt: '2023-06-16T13:42:42.528845',
            modifiedAt: '2023-06-16T13:42:42.528845',
            like: 5,
            commentCount: 3,
            memberLiked: [2, 3],
            standardId: 11,
        },
        {
            memberId: 3,
            memberProfileImg: ProfileImg,
            name: '닉네임1',
            title: '아무제목이나~~',
            content: '가나다라마바사아자차가나다라마바사아자차가나다라마...',
            tag: '카약&카누',
            view: 123,
            registeredAt: '2023-06-16T13:42:42.528845',
            modifiedAt: null,
            like: 5,
            commentCount: 3,
            memberLiked: [1, 2, 3],
            standardId: 12,
        },
    ];
    //인기게시물은 useQuery 사용 시 stale time 길게 설정
    const popularMockdata = [
        {
            memberId: 1,
            memberProfileImg: ProfileImg,
            name: '닉네임이길어어어어',
            title: '아무제목이나~~',
            content: '가나다라마바사아자차가나다라마바사아자차가나다라마...',
            tag: '카이트서핑',
            view: 200,
            registeredAt: '2023-06-16T13:42:42.528845',
            modifiedAt: '2023-06-16T13:42:42.528845',
            like: 5,
            commentCount: 3,
            memberLiked: [1, 2, 3],
            standardId: 1,
        },
        {
            memberId: 1,
            memberProfileImg: ProfileImg,
            name: '닉네임1',
            title: '아무제목이나~~',
            content: '가나다라마바사아자차가나다라마바사아자차가나다라마...',
            tag: '스쿠버다이빙',
            view: 110,
            registeredAt: '2023-06-16T13:42:42.528845',
            modifiedAt: '2023-06-16T13:42:42.528845',
            like: 5,
            commentCount: 3,
            memberLiked: [2, 3],
            standardId: 2,
        },
        {
            memberId: 3,
            memberProfileImg: ProfileImg,
            name: '닉네임1',
            title: '아무제목이나~~',
            content: '가나다라마바사아자차가나다라마바사아자차가나다라마...',
            tag: '카약&카누',
            view: 123,
            registeredAt: '2023-06-16T13:42:42.528845',
            modifiedAt: null,
            like: 5,
            commentCount: 3,
            memberLiked: [1, 2, 3],
            standardId: 3,
        },
        {
            memberId: 1,
            memberProfileImg: ProfileImg,
            name: '닉네임1',
            title: '아무제목이나~~',
            content: '가나다라마바사아자차가나다라마바사아자차가나다라마...',
            tag: '카이트서핑',
            view: 200,
            registeredAt: '2023-06-16T13:42:42.528845',
            modifiedAt: '2023-06-16T13:42:42.528845',
            like: 5,
            commentCount: 3,
            memberLiked: [1, 2, 3],
            standardId: 4,
        },
        {
            memberId: 1,
            memberProfileImg: ProfileImg,
            name: '닉네임1',
            title: '아무제목이나~~',
            content: '가나다라마바사아자차가나다라마바사아자차가나다라마...',
            tag: '스쿠버다이빙',
            view: 110,
            registeredAt: '2023-06-16T13:42:42.528845',
            modifiedAt: '2023-06-16T13:42:42.528845',
            like: 5,
            commentCount: 3,
            memberLiked: [2, 3],
            standardId: 5,
        },
        {
            memberId: 3,
            memberProfileImg: ProfileImg,
            name: '닉네임1',
            title: '아무제목이나~~',
            content: '가나다라마바사아자차가나다라마바사아자차가나다라마...',
            tag: '카약&카누',
            view: 123,
            registeredAt: '2023-06-16T13:42:42.528845',
            modifiedAt: null,
            like: 5,
            commentCount: 3,
            memberLiked: [1, 2, 3],
            standardId: 6,
        },
    ]; 
    const tags = [
        '전체',
        '다이빙',
        '스노클링',
        '플라이보드',
        '웨이크보드',
        '패들보드',
        '플라이피시',
        '수상스키',
        '바나나보트',
        '카이트서핑',
        '카약&카누',
    ];
    const [currTag, setCurrTag] = useState<string>(tags[0]);
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
        <Background $image={backgroundImg}>
            <CommunityContainer>
                <TopSection>
                    <h2>인기게시물</h2>
                    <PopularPostContainer>
                        {popularMockdata.map((item) => (
                            <CommunityPost key={`popular_${item.standardId}`} postdata={item} />
                        ))}
                    </PopularPostContainer>
                </TopSection>
                <MiddleSection>
                    <TagSpace>
                        {tags.map((tagName, idx) => (
                            <li key={idx} className={`${currTag === tagName}`} onClick={handleTagSelect}>
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
                        {mockdata.map((item) => (
                            <CommunityPost key={`all_${item.standardId}`} postdata={item} />
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
        </Background>
    );
};

const Background = styled.div<BackgroundProps>`
    background-image: url(${(props) => props.$image});
    background-size: cover;
    background-position: center center;
    background-repeat: no-repeat;
    width: 100%;
`;
const CommunityContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;
const TopSection = styled.section`
    width: 1345px;
    height: 507px;
    border-radius: 15px;
    border: 1px solid #696969;
    background: #fff;
    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
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
    border: 1px solid #696969;
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
        &:hover {
            cursor: pointer;
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
        > div {
            width: 400px;
            height: 40px;
            display: flex;
            box-size: border-box;
            > input {
                height: 100%;
                border-radius: 15px 0 0 15px;
                border: 1px solid #696969;
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
        height: 44.5px;
        font-size: 20px;
        flex-basis: 10%;
        border-radius: 0 15px 15px 0;
        background-color: #3884d5;
        display: flex;
        justify-content: center;
        align-items: center;
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
    }
`;

export default Community;
