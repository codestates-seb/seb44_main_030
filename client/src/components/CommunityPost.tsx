import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import LikeIcon from '../assets/Like.svg';
import LikeFilledIcon from '../assets/Like_filled.svg';
import ViewIcon from '../assets/View.svg';
import CommentIcon from '../assets/Comment.svg';
import { useNavigate } from 'react-router-dom';

interface CommunityPostProps {
    postdata: {
        memberId: number;
        memberProfileImg: string; //[작성자 프로필 이미지 소스] 추가: 커뮤니티 게시판 글목록 조회 시 각 게시글 작성자 프로필이미지 표시에 필요합니다.
        name: string; //[작성자 닉네임] API명세 추가: 커뮤니티 게시판 글목록 조회 시 각 게시글 작성자 닉네임 표시에 필요합니다.
        title: string;
        content: string;
        tag: string;
        view: number;
        registeredAt: string;
        modifiedAt: string | null;
        like: number; //[게시글에 대한 좋아요 갯수] 추가: 커뮤니티 게시판 글목록 조회 시 좋아요갯수 표시에 필요합니다.
        commentCount: number; //[게시글에 대한 댓글 갯수] 추가: 커뮤니티 게시판 글목록 조회 시 댓글갯수 표시에 필요합니다.
        memberLiked: Array<number>; //[게시글에 좋아요를 누른 멤버ID배열] 추가: 커뮤니티 게시판 글목록 조회 시 하트색 표시에 필요합니다.(ex. memberLiked 목록에 사용자id 포함 되어있으면 빨간하트로)
        standardId: number; //[게시글 자체에 대한 ID] 추가: 게시판에서 게시글 목록을 구현할 때 게시글에 대한 고유한 ID가 필요합니다. + id를 알아야 상세 게시글 조회 시 요청 보낼 수 있음.
    };
}
const CommunityPost = (props: CommunityPostProps) => {
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
    } = props.postdata;
    const mockMemberId = 1; //useSelector 사용
    const [likeCount, setLikeCount] = useState(like);
    const [isLiked, setIsLiked] = useState(memberLiked.includes(mockMemberId));
    const navigate = useNavigate();
    //props 변경될 때 상태 최신화 위함
    useEffect(() => {
        setLikeCount(like);
        setIsLiked(memberLiked.includes(mockMemberId));
    }, [like, memberLiked, mockMemberId]);

    //좋아요 하트색, 숫자 상태 변경
    const handleLike = () => {
        isLiked ? setLikeCount((prev) => prev - 1) : setLikeCount((prev) => prev + 1);
        setIsLiked((prev) => !prev);
    };

    //게시글 상세페이지로 이동
    const handleNavigateDetail = () => {
        navigate(`/community/detail`, { state: standardId });
    };

    //프로필 페이지로 이동
    const handleNavigateProfile = () => {
        navigate(`/mypage`, { state: memberId });
    };

    // 날짜 어떻게 받을 건지 여쭤봐야함.(포맷팅 된 상태 or Not)
    // 날짜 포맷팅
    const dateStr = modifiedAt || registeredAt;
    const datePart = dateStr.split('T')[0];
    const dateArr = datePart.split('-');
    const newDateStr = dateArr[0].slice(2) + '. ' + dateArr[1] + '. ' + dateArr[2];
    const formattedDate = modifiedAt ? `${newDateStr} (수정됨)` : newDateStr;

    return (
        <PostContainer>
            <LeftSection>
                <div>
                    <IconStyled src={ViewIcon} alt="ViewCount" />
                    {view}
                </div>
                <div>
                    <LikeButton onClick={handleLike}>
                        {isLiked ? (
                            <IconStyled src={LikeFilledIcon} alt="LikeFilled" />
                        ) : (
                            <IconStyled src={LikeIcon} alt="LikeNotFilled" />
                        )}
                    </LikeButton>
                    {likeCount}
                </div>
                <div>
                    <IconStyled src={CommentIcon} alt="CommentCount" />
                    {commentCount}
                </div>
            </LeftSection>
            <MiddleSection>
                <h3 onClick={handleNavigateDetail}>{title}</h3>
                {/* content 잘라서 사용할 지 잘린 채로 받을 지 결정할 것 */}
                <p>{content}</p>
                <div>
                    <span>{tag}</span>
                </div>
            </MiddleSection>
            <RightSection>
                <div>
                    <ProfileImgStyled src={memberProfileImg} alt="profileImage" />
                    <span onClick={handleNavigateProfile}>{name}</span>
                </div>
                <span>{formattedDate}</span>
            </RightSection>
        </PostContainer>
    );
};
const PostContainer = styled.li`
    border-radius: 15px;
    border: 1px solid #696969;
    background: #fff;
    box-shadow: 0px 4px 15px 0px rgba(0, 0, 0, 0.25);
    width: 540px;
    height: 110px;
    display: flex;
    justify-content: space-around;
    &:hover {
        background-color: #eeeeee;
    }
    cursor: default;
`;
const ProfileImgStyled = styled.img`
    width: 17px;
    height: 17px;
    border-radius: 3px;
    margin-right: 3px;
`;
const LeftSection = styled.div`
    display: flex;
    flex-direction: column;
    flex-basis: 55px;
    align-items: start;
    justify-content: center;
    font-size: 12px;
    margin-left: 5px;
    > div {
        display: flex;
        align-items: center;
        > img {
            margin-right: 5px;
        }
        > button {
            margin-right: 5px;
        }
    }
`;
const IconStyled = styled.img`
    width: 15px;
    height: 15px;
`;
const LikeButton = styled.button`
    padding: 0;
    border: none;
    background: none;
    margin: 7px 0 7px 0;
    cursor: pointer;
`;
const MiddleSection = styled.div`
    display: flex;
    flex-basis: 320px;
    flex-direction: column;
    justify-content: center;
    align-items: start;
    > h3 {
        align-self: flex-start;
        margin: 0;
        font-size: 20px;
        &:hover {
            color: #3884d5;
            cursor: pointer;
        }
    }
    > p {
        margin: 10px 0 10px 0;
        font-size: 12px;
    }
    > div > span {
        font-size: 12px;
        background-color: #3884d5;
        color: #ffffff;
        padding: 3px 7px 3px 7px;
        border-radius: 10px;
    }
`;
const RightSection = styled.div`
    display: flex;
    flex-basis: 105px;
    flex-direction: column;
    justify-content: end;
    font-size: 12px;
    margin-bottom: 20px;
    > div > span {
        cursor: pointer;
        &:hover {
            color: #3884d5;
        }
    }
`;
export default CommunityPost;
