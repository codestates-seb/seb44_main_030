import React, { useState, useCallback, useEffect } from 'react';
import styled from 'styled-components';
import { useParams, useNavigate } from 'react-router-dom';
import backgroundImg from '../assets/Community_background.png';
import DetailCommentSection from '../components/DetailCommentSection.tsx';
import DetailContentSection from '../components/DetailContentSection.tsx';
import { Loading } from '../components/Lodaing.tsx';
import { useQuery } from '@tanstack/react-query';
import { getDetailCommunityPost } from '../api/CommunityApi/CommunityApi.ts';
import { RouteParams } from '../types/CommunityTypes.ts';

type BackgroundStyledProps = {
    $image: string;
};

const CommunityDetail = () => {
    const { standardId } = useParams<RouteParams>();
    if (!standardId) {
        throw new Error('해당 게시글에 대한 ID가 존재하지 않습니다.');
    }
    const mockMemberId = 1; //useSelector 사용
    const navigate = useNavigate();

    const {
        isLoading,
        error: errorData,
        data,
    } = useQuery(
        ['communityDetail', standardId],
        () => {
            console.log(`게시글ID:${standardId}데이터를 가져옵니다.`);
            return getDetailCommunityPost(standardId);
        },
        {
            staleTime: 10000, // 10초
        },
    );
    const detailCommunityData = data || undefined;

    // 좋아요 구현 시 사용
    // const handleLike = useCallback(() => {
    //     isLiked ? setLikeCount((prev) => prev - 1) : setLikeCount((prev) => prev + 1);
    //     setIsLiked((prev) => !prev);
    // }, [isLiked]);

    const hanldeNavigatePrev = useCallback(() => {
        navigate(-1);
    }, []);

    const handleNavigateProfile = useCallback(() => {
        navigate(`/mypage`);
    }, [detailCommunityData?.member?.memberId]);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    if (isLoading) {
        return <Loading />;
    }

    if (errorData) {
        console.log(errorData);
        return <div>게시글을 불러올 수 없습니다.</div>;
    }
    return (
        <Background $image={backgroundImg}>
            <PostContainer>
                <TitleSection>
                    <button onClick={hanldeNavigatePrev}>목록</button>
                    <h1>{detailCommunityData?.title}</h1>
                    <div>
                        <div>
                            <h3>관련태그: </h3>
                            <span className="tag">{/* {tag} */}</span>{' '}
                        </div>
                        <div>
                            <span className="date">{detailCommunityData?.createdAt}</span>
                            {/* <img src={memberProfileImg} /> */}
                            <span className="name" onClick={handleNavigateProfile}>
                                {detailCommunityData?.name}
                            </span>
                        </div>
                    </div>
                </TitleSection>
                <DetailContentSection
                    title={detailCommunityData?.title}
                    commentCount={detailCommunityData?.commentCount}
                    view={detailCommunityData?.view}
                    content={detailCommunityData?.content}
                    handleLike={detailCommunityData?.handleLike}
                    isLiked={detailCommunityData?.isLiked}
                    likeCount={detailCommunityData?.likeCount}
                    memberId={detailCommunityData?.member?.memberId}
                    standardId={detailCommunityData?.standardId}
                    tag={detailCommunityData?.tag}
                />
                <DetailCommentSection comment={detailCommunityData?.comment} />
            </PostContainer>
        </Background>
    );
};

export default CommunityDetail;

const Background = styled.div<BackgroundStyledProps>`
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
