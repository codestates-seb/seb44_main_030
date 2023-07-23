import { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import Tag from './Tag';
import ViewsIcon from '../../../public/view.png';
import MessageIcon from '../../../public/bubble-chat.png';
import LikeIcon from '../../assets/heart (1).png';
import LikeFilledIcon from '../../assets/Like_filled.svg';
import { savePosition } from '../../store/scroll.ts';
import { useDispatch } from 'react-redux';

// interface PostProps {
//     memberId: number;
//     title: string;
//     content: string;
//     view: number;
//     commentCount: number;
//     type: string;
//     profileImageUrl: string;
//     nickname: string;
// }

// interface CommunityPostProps extends PostProps {
//     communityProps: {
//         memberProfileImg: string; //[작성자 프로필 이미지 소스]
//         name: string; //[작성자 닉네임]
//         tag: string;
//         registeredAt: string;
//         modifiedAt: string | null;
//         like: number; //[게시글에 대한 좋아요 갯수]
//         memberLiked: Array<number>; //[게시글에 좋아요를 누른 멤버ID배열]
//         boardStandardId: number; //[게시글 자체에 대한 ID]
//     };
// }

// interface ClubPostProps extends PostProps {
//     clubProps: {
//         boardClubId: number;
//         tags: { tagName: string }[];
//         dueDate: string;
//         boardClubStatus: string;
//         likeCount: number;
//         memberLiked: Array<number>;
//     };
// }

// type CardProps = CommunityPostProps | ClubPostProps;

export default function ContentsCard({ memberId, communityProps, clubProps, type }: any) {
    const {
        // memberId: communityMemberId,
        title: communityTitle,
        content: communityContent,
        view: communityView,
        commentCount: communityCommentCount,
        nickname: communityNickname,
        profileImageUrl: communitProfileImageUrl,
        // member,
        tags: communityTags,
        // registeredAt,
        // modifiedAt,
        like,
        memberLiked = [],
        boardStandardId,
    } = communityProps || {};

    const {
        title: clubTitle,
        content: clubContent,
        view: clubView,
        commentCount: clubCommentCount,
        nickname: clubNickname,
        profileImageUrl: clubProfileImageUrl,
        boardClubId,
        tags,
        dueDate,
        boardClubStatus,
        likeCount: clubLikeCount = 0, //[게시글에 대한 좋아요 갯수]
        memberLiked: clubMemberLiked = [],
    } = clubProps || {};

    console.log(communityProps);
    console.log(clubProps);

    const [clubStatus, setClubStatus] = useState(boardClubStatus);
    useEffect(() => {
        const now = new Date();
        now.setDate(now.getDate() - 1);
        const due = new Date(dueDate);

        if (now > due && clubStatus !== 'BOARD_CLUB_CANCEL') {
            setClubStatus('BOARD_CLUB_COMPLETED');
        }
    }, [dueDate, clubStatus]);
    const isCompleted = clubStatus === 'BOARD_CLUB_COMPLETED';

    const dispatch = useDispatch();
    const loginId = 1; //useSelector 사용
    const [likeCount, setLikeCount] = useState(like || clubLikeCount);
    const [isLiked, setIsLiked] = useState((memberLiked || clubMemberLiked).includes(loginId));
    const navigate = useNavigate();
    //props 변경될 때 상태 최신화 위함
    useEffect(() => {
        setLikeCount(like || clubLikeCount);
        setIsLiked((memberLiked || clubMemberLiked).includes(loginId));
    }, [like, clubLikeCount, memberLiked, clubMemberLiked, loginId]);

    const moveToDetail = () => {
        if (type === 'community') {
            dispatch(savePosition(window.scrollY));
            navigate(`/community/detail/${boardStandardId}`);
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
    // const dateStr = modifiedAt || registeredAt || '';
    // const datePart = dateStr.split('T')[0];
    // const dateArr = datePart.split('-');
    // const newDateStr = dateArr[0].slice(2) + '. ' + dateArr[1] + '. ' + dateArr[2];

    return (
        <CardWarp isCompleted={isCompleted}>
            <TitleContentsTagWarp>
                <TitleContainer onClick={moveToDetail}>
                    <h3>{communityProps ? communityTitle : clubTitle}</h3>
                </TitleContainer>
                <ContentsContainer onClick={moveToDetail}>
                    <p>{communityProps ? communityContent : clubContent}</p>
                </ContentsContainer>
                <TagContainer>
                    {communityProps &&
                        communityTags.map((tag: { tagName: string }) => (
                            <Tag key={tag.tagName} tag={tag.tagName} className="tag-component" />
                        ))}
                    {clubProps &&
                        tags.map((tag: { tagName: string }) => (
                            <Tag key={tag.tagName} tag={tag.tagName} className="tag-component" />
                        ))}
                </TagContainer>
            </TitleContentsTagWarp>
            <InfoContainer>
                <UserInfo>
                    <img
                        src={`https://splashzone-upload.s3.ap-northeast-2.amazonaws.com/${
                            communitProfileImageUrl || clubProfileImageUrl
                        }`}
                        className="user-icon"
                    />
                    <span onClick={handleNavigateProfile}>{clubNickname || communityNickname}</span>
                </UserInfo>
                <ContentsInfo>
                    {isLiked ? (
                        <>
                            <img src={LikeFilledIcon} onClick={handleLike} />
                            <span>{likeCount}</span>
                        </>
                    ) : (
                        <>
                            <img src={LikeIcon} onClick={handleLike} />
                            <span>{likeCount}</span>
                        </>
                    )}
                    <img src={ViewsIcon} />
                    <span>{communityProps ? communityView : clubView}</span>
                    <img src={MessageIcon} />
                    <span>{communityProps ? communityCommentCount || 0 : clubCommentCount || 0}</span>
                </ContentsInfo>
            </InfoContainer>
        </CardWarp>
    );
}

const CardWarp = styled.div<{ isCompleted: boolean }>`
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: white;
    border-radius: 2rem;
    width: 360px;
    height: 270px;
    margin: 2rem;
    padding: 1.7rem;
    transition: 0.3s;
    border: ${(props) => (props.isCompleted ? '2px solid rgba(0,0,0,0.5)' : '1px solid rgba(56, 132, 213, 1);')};
    box-shadow: ${(props) =>
        props.isCompleted ? '0px 0px 10px 5px rgba(0,0,0,0.2)' : '0 0 10px rgba(117, 117, 117, 0.3)'};
    opacity: ${(props) => (props.isCompleted ? 0.2 : 1)};

    &:hover {
        border: 3px solid rgba(226, 240, 254, 0.8);
        background-color: rgba(56, 132, 213, 1);
        transform: scale(1.2);
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
    flex-basis: 80%;
    justify-content: space-between;
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
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    width: 300px;
    height: 77px;

    overflow: hidden;
    text-overflow: ellipsis;

    &:hover {
        color: #c1daf5;
        cursor: pointer;
    }
    > p {
        display: flex;
        align-items: center;
        word-wrap: break-word;
    }
`;

const TagContainer = styled.div`
    display: flex;
    margin-top: 20px;
`;

const InfoContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-top: 1px solid #696969;
    width: 105%;
    margin-top: 7px;
    padding: 4px 2px 0 2px;
    ${CardWarp}:hover & {
        border-top: 1px solid #ffffff;
    }
    flex-basis: 20%;
`;

const UserInfo = styled.div`
    display: flex;
    align-items: center;
    padding-top: 10px;
    > img {
        width: 20px;
        height: 20px;
    }
    > span {
        width: 130px;
        margin-left: 10px;
        font-weight: 500;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
        &:hover {
            cursor: pointer;
        }
    }
`;

const ContentsInfo = styled.div`
    display: flex;
    align-items: center;
    padding-top: 10px;
    > img {
        width: 20px;
        height: 20px;
        margin-left: 20px;
        filter: opacity(0.4) drop-shadow(0 0 0 #565656);
    }
    > span {
        margin-left: 5px;
        font-weight: 500;
    }
`;
