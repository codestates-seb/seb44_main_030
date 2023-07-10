import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { useNavigate, useParams } from 'react-router-dom';

import ClubTag from './ClubTag';

import Profile from '../../public/profile.png';
import ViewsIcon from '../../public/view.png';
import MessageIcon from '../../public/bubble-chat.png';
import LikeIcon from '../assets/Like.svg';
import LikeFilledIcon from '../assets/Like_filled.svg';
import { title } from 'process';

interface CommunityPostProps {
    communityProps: {
        memberId: number;
        memberProfileImg: string; //[작성자 프로필 이미지 소스]
        name: string; //[작성자 닉네임]
        title: string;
        content: string;
        tag: string;
        view: number;
        registeredAt: string;
        modifiedAt: string | null;
        like: number; //[게시글에 대한 좋아요 갯수]
        commentCount: number;
        memberLiked: Array<number>; //[게시글에 좋아요를 누른 멤버ID배열]
        standardId: number; //[게시글 자체에 대한 ID]
    };
}

interface ClubPostProps {
    postdata: {
        memberId: number;
        memberProfileImg: string; //[작성자 프로필 이미지 소스]
        name: string; //[작성자 닉네임]
        title: string;
        content: string;
        tag: string;
        view: number;
        registeredAt: string;
        modifiedAt: string | null;
        like: number; //[게시글에 대한 좋아요 갯수]
        commentCount: number;
        memberLiked: Array<number>; //[게시글에 좋아요를 누른 멤버ID배열]
        standardId: number; //[게시글 자체에 대한 ID]
    };
}

export default function ClubCard({ communityProps }: CommunityPostProps) {
    const {
        memberId,
        memberProfileImg,
        name,
        title,
        content,
        tag,
        view,
        registeredAt,
        modifiedAt,
        like,
        commentCount,
        memberLiked,
        standardId,
    } = communityProps;

    // console.log(communityProps);

    const loginId = 1; //useSelector 사용
    const [likeCount, setLikeCount] = useState(like);
    const [isLiked, setIsLiked] = useState(memberLiked.includes(loginId));
    const navigate = useNavigate();
    const { community, club } = useParams();
    //props 변경될 때 상태 최신화 위함
    useEffect(() => {
        setLikeCount(like);
        setIsLiked(memberLiked.includes(loginId));
    }, [like, memberLiked, loginId]);

    //좋아요 하트색,숫자 상태 변경 + API 요청 추가 필요
    const handleLike = useCallback(() => {
        isLiked ? setLikeCount((prev) => prev - 1) : setLikeCount((prev) => prev + 1);
        setIsLiked((prev) => !prev);
    }, [isLiked]);

    //게시글 상세페이지로 이동
    const handleNavigateDetail = useCallback(() => {
        navigate(`/community/detail`, { state: standardId });
    }, [standardId]);

    //프로필 페이지로 이동
    const handleNavigateProfile = useCallback(() => {
        navigate(`/mypage`, { state: memberId });
    }, [memberId]);

    // 날짜 어떻게 받을 건지 상의 필요.(포맷팅 된 상태 or Not)
    // 날짜 포맷팅 임의로
    const dateStr = modifiedAt || registeredAt;
    const datePart = dateStr.split('T')[0];
    const dateArr = datePart.split('-');
    const newDateStr = dateArr[0].slice(2) + '. ' + dateArr[1] + '. ' + dateArr[2];
    const formattedDate = modifiedAt ? `${newDateStr} (수정됨)` : newDateStr;

    return (
        <CardWarp>
            <TitleContentsTagWarp>
                <TitleContainer>
                    <h3>{title}</h3>
                </TitleContainer>
                <ContentsContainer>
                    <span>{content}</span>
                </ContentsContainer>
                <TagContainer>
                    <ClubTag $incard={true} tag={tag} />
                </TagContainer>
            </TitleContentsTagWarp>
            <InfoContainer>
                <UserInfo>
                    <img src={memberProfileImg} />
                    <span>{name}</span>
                </UserInfo>
                <ContentsInfo>
                    {/* {param === 'community' && <img src={LikeIcon} />}
                        {param === 'community' && <span>{like}</span>} */}
                    <img src={ViewsIcon} />
                    <span>{view}</span>
                    <img src={MessageIcon} />
                    <span>{commentCount}</span>
                </ContentsInfo>
            </InfoContainer>
        </CardWarp>
    );
}

const CardWarp = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    border: 1px solid #696969;
    border-radius: 2rem;
    width: 350px;
    height: 250px;
    margin: 2rem;
    padding: 1.7rem;
`;

const TitleContentsTagWarp = styled.div`
    display: flex;
    flex-direction: column;
    align-items: start;
`;
const TitleContainer = styled.div`
    font-size: 1.3rem;
    font-family: 'KimjungchulGothic-Bold';
    margin-bottom: 0.5rem;
    > h3 {
        max-width: 300px;
        align-self: flex-start;
        margin: 0;
        font-size: 20px;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
        &:hover {
            color: #3884d5;
            cursor: pointer;
        }
    }
`;
const ContentsContainer = styled.div`
    margin-bottom: 0.5rem;
    font-size: 1rem;
`;

const TagContainer = styled.div`
    display: flex;
`;

const InfoContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-top: 1px solid #696969;
    width: 107%;
    margin-top: 5px;
`;

const UserInfo = styled.div`
    display: flex;
    align-items: center;
    padding-top: 10px;
    > img {
        width: 30px;
        height: 30px;
    }
    > span {
        margin-left: 10px;
        font-weight: 500;
    }
`;

const ContentsInfo = styled.div`
    display: flex;
    align-items: center;
    padding-top: 10px;
    > img {
        width: 30px;
        height: 30px;
        margin-left: 20px;
        filter: opacity(0.4) drop-shadow(0 0 0 #565656);
    }
    > span {
        margin-left: 6px;
        font-weight: 500;
    }
`;
