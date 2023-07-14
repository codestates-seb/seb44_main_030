import React, { useState, useCallback, useEffect } from 'react';
import styled from 'styled-components';
import { useParams, useNavigate } from 'react-router-dom';
import backgroundImg from '../assets/Community_background.png';
import { CommunityDetailMockdata } from '../assets/mockdata.ts';
import DetailCommentSection from '../components/DetailCommentSection.tsx';
import DetailContentSection from '../components/DetailContentSection.tsx';
import axios from 'axios';
import { CommunityPostData } from '../types/CommunityTypes.ts';
import { Loading } from '../components/Lodaing.tsx';
type BackgroundProps = {
    $image: string;
};

export type CommentInput = {
    Content: string;
};

const CommunityDetail = () => {
    const { standardId } = useParams();
    const mockMemberId = 1; //useSelector 사용
    const navigate = useNavigate();

    const [detailData, setDetailData] = useState<CommunityPostData>({
        standardId: 0,
        title: '',
        content: '',
        view: 0,
        createdAt: '',
        modifiedAt: '',
        member: { memberId: 0, name: '', email: '', nickname: '', bio: '' },
    });
    const [isLoading, setIsLoading] = useState(false);
    const getCommunityDetailData = async () => {
        setIsLoading(true);
        try {
            const response = await axios.get(`${import.meta.env.VITE_KEY}/standards/${standardId}`);
            setDetailData(response.data.data);
        } catch (error) {
            console.error('Failed to fetch data:', error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        getCommunityDetailData();
    }, []);

    // const handleLike = useCallback(() => {
    //     isLiked ? setLikeCount((prev) => prev - 1) : setLikeCount((prev) => prev + 1);
    //     setIsLiked((prev) => !prev);
    // }, [isLiked]);

    const hanldeNavigatePrev = useCallback(() => {
        navigate(-1);
    }, []);

    const handleNavigateProfile = useCallback(() => {
        navigate(`/mypage`);
    }, [detailData?.memberId]);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    if (isLoading || !detailData.standardId) {
        return <Loading/>;
    }
    return (
        <Background $image={backgroundImg}>
            <PostContainer>
                <TitleSection>
                    <button onClick={hanldeNavigatePrev}>목록</button>
                    <h1>{detailData?.title}</h1>
                    <div>
                        <div>
                            <h3>관련태그: </h3>
                            <span className="tag">{/* {tag} */}</span>{' '}
                        </div>
                        <div>
                            <span className="date">{detailData?.createdAt}</span>
                            {/* <img src={memberProfileImg} /> */}
                            <span className="name" onClick={handleNavigateProfile}>
                                {detailData?.name}
                            </span>
                        </div>
                    </div>
                </TitleSection>
                <DetailContentSection
                    commentCount={detailData?.commentCount}
                    view={detailData?.view}
                    content={detailData?.content}
                    handleLike={detailData?.handleLike}
                    isLiked={detailData?.isLiked}
                    likeCount={detailData?.likeCount}
                    memberId={detailData?.member?.memberId}
                    standardId={detailData?.standardId}
                    clubId={detailData?.clubId}
                />
                <DetailCommentSection comment={detailData?.comment} />
            </PostContainer>
        </Background>
    );
};

export default CommunityDetail;

const Background = styled.div<BackgroundProps>`
    * {
        box-sizing: border-box;
    }
    background-image: url(${(props) => props.$image});
    background-size: cover;
    background-position: center center;
    background-repeat: no-repeat;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
`;
const PostContainer = styled.div`
    width: 1200px;
    border-radius: 15px;
    border: none;
    box-sizing: border-box;
    background: #fff;
    margin: 60px 0 60px 0;
    padding: 80px 120px 80px 120px;
    box-shadow: 0px 4px 15px 0px rgba(0, 0, 0, 0.25);
`;
const TitleSection = styled.section`
    > button {
        font-weight: 600;
        color: #696969;
        background: none;
        border: none;
        cursor: pointer;
        &:hover {
            color: #3884d5;
        }
    }
    > h1 {
        font-size: 35px;
    }
    img {
        width: 17px;
        height: 17px;
        border-radius: 3px;
        margin: 0 2px 0 20px;
    }
    > div {
        display: flex;
        align-items: center;
        justify-content: space-between;
        > span {
            font-size: 20px;
            font-weight: 600;
        }
        > div {
            display: flex;
            align-items: center;
            > span.date {
                color: #696969;
                font-size: 14px;
            }
            > span.tag {
                font-size: 12px;
                background-color: #3884d5;
                color: #ffffff;
                padding: 5px 8px 5px 8px;
                border-radius: 20px;
                list-style: none;
                white-space: nowrap;
                margin: 0px 0px 0px 5px;
                font-size: 15px;
            }
            > span.name {
                font-weight: 600;
                &:hover {
                    color: #3884d5;
                    cursor: pointer;
                }
            }
        }
    }
    border-bottom: 1px solid #d9d9d9;
`;
