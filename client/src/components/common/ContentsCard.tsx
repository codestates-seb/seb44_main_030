import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { useNavigate, useParams } from 'react-router-dom';

import Tag from './Tag';

import Profile from '../../../public/profile.png';
import ViewsIcon from '../../../public/view.png';
import MessageIcon from '../../../public/bubble-chat.png';
import LikeIcon from '../../assets/Like.svg';
import LikeFilledIcon from '../../assets/Like_filled.svg';
import { title } from 'process';
import { savePosition } from '../../store/scroll.ts';
import { useDispatch } from 'react-redux';
interface PostProps {
    memberId: number;
    title: string;
    content: string;
    view: number;
    commentCount: number;
    type: string;
}

interface CommunityPostProps extends PostProps {
    communityProps: {
        memberProfileImg: string; //[작성자 프로필 이미지 소스]
        name: string; //[작성자 닉네임]
        tag: string;
        registeredAt: string;
        modifiedAt: string | null;
        like: number; //[게시글에 대한 좋아요 갯수]
        memberLiked: Array<number>; //[게시글에 좋아요를 누른 멤버ID배열]
        standardId: number; //[게시글 자체에 대한 ID]
    };
}

interface ClubPostProps extends PostProps {
    clubProps: {
        boardClubId: number;
        tags: { tagName: string }[];
        dueDate: string;
        boardClubStatus: string;
    };
}

type CardProps = CommunityPostProps | ClubPostProps;

export default function ContentsCard({
    memberId,
    title,
    content,
    view,
    commentCount,
    communityProps,
    clubProps,
    type,
}: CardProps) {
    const {
        memberId: communityMemberId,
        title: communityTitle,
        content: communityContent,
        view: communityView,
        commentCount: communityCommentCount,
        name,
        memberProfileImg,
        tag,
        registeredAt,
        modifiedAt,
        like,
        memberLiked = [],
        standardId,
    } = communityProps || {};

    const {
        memberId: clubMemberId,
        title: clubTitle,
        content: clubContent,
        view: clubView,
        commentCount: clubCommentCount,
        boardClubId,
        tags,
        dueDate,
        boardClubStatus,
    } = clubProps || {};

    // console.log(communityProps);
    const dispatch = useDispatch();
    const loginId = 1; //useSelector 사용
    const [likeCount, setLikeCount] = useState(like);
    const [isLiked, setIsLiked] = useState(memberLiked.includes(loginId));
    const navigate = useNavigate();
    //props 변경될 때 상태 최신화 위함
    useEffect(() => {
        setLikeCount(like);
        setIsLiked(memberLiked.includes(loginId));
    }, [like, memberLiked, loginId]);

    const moveToDetail = () => {
        if (type === 'community') {
            dispatch(savePosition(window.scrollY));
            navigate(`/community/detail/${standardId}`);
        } else if (type) {
            dispatch(savePosition(window.scrollY));
            navigate(`/club/detail/${boardClubId}`);
        }
    };

    //좋아요 하트색,숫자 상태 변경 + API 요청 추가 필요
    const handleLike = useCallback(() => {
        isLiked ? setLikeCount((prev: number) => prev - 1) : setLikeCount((prev: number) => prev + 1);
        setIsLiked((prev: boolean) => !prev);
    }, [isLiked]);

    //프로필 페이지로 이동
    const handleNavigateProfile = useCallback(() => {
        navigate(`/mypage`, { state: memberId });
    }, [memberId]);

    // 날짜 어떻게 받을 건지 상의 필요.(포맷팅 된 상태 or Not)
    // 날짜 포맷팅 임의로
    const dateStr = modifiedAt || registeredAt || '';
    const datePart = dateStr.split('T')[0];
    const dateArr = datePart.split('-');
    const newDateStr = dateArr[0].slice(2) + '. ' + dateArr[1] + '. ' + dateArr[2];
    const formattedDate = modifiedAt ? `${newDateStr} (수정됨)` : newDateStr;

    return (
        <CardWarp>
            <TitleContentsTagWarp>
                <TitleContainer onClick={moveToDetail}>
                    <h3>{communityProps ? communityTitle : clubTitle}</h3>
                </TitleContainer>
                <ContentsContainer onClick={moveToDetail}>
                    <span>{communityProps ? communityContent : clubContent}</span>
                </ContentsContainer>
                <TagContainer>
                    {communityProps && <Tag tag={tag} className="tag-component" />}
                    {clubProps &&
                        tags.map((tag: { tagName: string }) => (
                            <Tag key={tag.tagName} tag={tag.tagName} className="tag-component" />
                        ))}
                </TagContainer>
            </TitleContentsTagWarp>
            <InfoContainer>
                <UserInfo>
                    <img src={memberProfileImg} className="user-icon" />
                    <span onClick={handleNavigateProfile}>{name}</span>
                </UserInfo>
                <ContentsInfo>
                    {communityProps?.like &&
                        (isLiked ? (
                            <>
                                <img src={LikeFilledIcon} onClick={handleLike} />
                                <span>{likeCount}</span>
                            </>
                        ) : (
                            <>
                                <img src={LikeIcon} onClick={handleLike} />
                                <span>{likeCount}</span>
                            </>
                        ))}
                    <img src={ViewsIcon} />
                    <span>{communityProps ? communityView : clubView}</span>
                    <img src={MessageIcon} />
                    <span>{communityProps ? communityCommentCount : clubCommentCount}</span>
                </ContentsInfo>
            </InfoContainer>
        </CardWarp>
    );
}

const CardWarp = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: white;
    border: 1px solid #d0d0d0;
    border-radius: 2rem;
    width: 360px;
    height: 270px;
    margin: 2rem;
    padding: 1.7rem;
    transition: 0.3s;
    box-shadow: 0 0 10px rgba(145, 145, 145, 0.3);

    &:hover {
        border: 3px solid rgba(226, 240, 254, 0.8);
        background-color: rgba(56, 132, 213, 1);
        transform: scale(1.1);
        box-shadow: 0 5px 15px #bccbf9;
        color: #ffffff;

        *:not(.user-icon) {
            color: #ffffff;
        }
        .tag-component {
            border-color: #ffffff;
        }
        img.user-icon {
            filter: none;
        }
        img:not(.user-icon) {
            filter: invert(1);
        }
    }
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
            color: #c1daf5;
            cursor: pointer;
        }
    }
`;
const ContentsContainer = styled.div`
    margin-bottom: 0.5rem;
    font-size: 1rem;
    margin-bottom: 1rem;
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
    margin-top: 1rem;
    padding:10px 2px 0 2px;
    ${CardWarp}:hover & {
        border-top: 1px solid #ffffff;
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
