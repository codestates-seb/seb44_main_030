//type 일반게시글 이거나 모임게시글이거나
import styled from 'styled-components';
import { useQuery } from '@tanstack/react-query';
import moment from 'moment';
import { useState } from 'react';
import { Loading } from './Lodaing';
import PageButton from './PageButton';
import { Link } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import axios from 'axios';

//클럽,일반게시글 따라서 다르게 보여주기. type을 지정해서
//체크박스로 전체삭제같은거 구현할수있게하기

type Data = {
    standardId: number;
    title: string;
    content: string;
    view?: number;
    createdAt: string;
    modifiedAt: string;
    member: {
        memberId: number;
        name: string;
        email: string;
        nickname: string;
        profileImageUrl: null;
        bio: string;
        memberStatus: string;
    };
};

interface CommunityData {
    post: Data;
}

const Table = () => {
    const [pagenumber, setPageNumber] = useState(1);
    const [cookies] = useCookies(['AuthorizationToken', 'RefreshToken']);
    const authorizationToken = cookies.AuthorizationToken;
    const refreshToken = cookies.RefreshToken;

    const getCommunity = (page: number) => {
        const API_URL = import.meta.env.VITE_KEY;
        return axios
            .get(`${API_URL}/members/mypage/standards/1?page=${page}&size=20`, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `${decodeURIComponent(authorizationToken)}`,
                    Refresh: `${refreshToken}`,
                    withCredentials: true,
                },
            })
            .then((response) => {
                return { postData: response.data.data, pageInfo: response.data.pageInfo };
            });
    };
    const { data, isLoading, isError } = useQuery<any, Error>({
        queryKey: ['mycommunity', pagenumber],
        queryFn: () => getCommunity(pagenumber),
    });

    if (isLoading) return <Loading />;

    if (isError)
        return (
            <>
                <p>아직 작성한 게시글이 없습니다!</p>
            </>
        );
    const totalElements = data.pageInfo.totalElements;
    const Maxpage = Math.ceil(totalElements / 20);
    const MaxpageArray = Array.from({ length: Maxpage }, (_, index) => index + 1);
    console.log(MaxpageArray);

    const NextpageHandler = () => {
        if (pagenumber < Maxpage) {
            setPageNumber((previous) => previous + 1);
        }
    };

    const PreviouspageHandler = () => {
        if (pagenumber > 1) {
            setPageNumber((previous) => previous - 1);
        }
    };

    const CurrentPageHandler = (number: number) => {
        setPageNumber(number);
    };

    return (
        <div>
            <Styledwrapper>
                <div></div>
                <div>제목</div>
                <div>작성일</div>
                <div>조회</div>
            </Styledwrapper>
            {data.postData.map((post: Data) => {
                return <Tablecontent post={post} key={post.standardId}></Tablecontent>;
            })}
            <PageContainer>
                <PageButton data={{ value: '이전' }} onClick={PreviouspageHandler} />
                {MaxpageArray.map((value, idx) => (
                    <PageButton
                        key={idx}
                        data={{ value }}
                        onClick={() => {
                            CurrentPageHandler(value);
                        }}
                    />
                ))}

                <PageButton data={{ value: '다음' }} onClick={NextpageHandler} />
            </PageContainer>
        </div>
    );
};
export default Table;

const Tablecontent = ({ post }: CommunityData) => {
    const url = `/community/detail/${post.standardId}`;
    return (
        <Styledwrapper>
            <div>{post.standardId}</div>
            <StyledLink to={url}>{post.title}</StyledLink>
            <div>{moment(post.createdAt).format('YYYY-MM-DD')}</div>
            <div>{post.view}</div>
        </Styledwrapper>
    );
};

const Styledwrapper = styled.div`
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    width: 800px;
    height: 30px;
    font-size: 1rem;
    display: grid;
    grid-template-columns: 3fr 14fr 6fr 5fr;
    vertical-align: center;
`;

const StyledLink = styled(Link)`
    text-decoration: none;
    color: black;
    &:hover {
        color: rgba(0, 0, 0, 0.5);
    }
`;

const PageContainer = styled.ul`
    padding: 0;
    position: absolute;
    right: 10%;
    width: 700px;
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
    > li {
        margin: 0 3px 0 3px;
        border: none;
    }
`;
