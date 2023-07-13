import React, { useState, useCallback, useEffect } from 'react';
import styled from 'styled-components';
import { useLocation, useNavigate } from 'react-router-dom';
import backgroundImg from '../assets/Community_background.png';
import { CommunityDetailMockdata } from '../assets/mockdata.ts';
import ViewsIcon from '../../public/view.png';
import MessageIcon from '../../public/bubble-chat.png';
import LikeIcon from '../assets/Like.svg';
import LikeFilledIcon from '../assets/Like_filled.svg';
import { useForm, SubmitHandler } from 'react-hook-form';
import DetailCommentSection from '../components/DetailCommentSection.tsx';
import DetailContentSection from '../components/DetailContentSection.tsx';
interface BackgroundProps {
    $image: string;
}

export interface CommentInput {
    Content: string;
}

const CommunityDetail = () => {
    const location = useLocation();
    const standardId = location.state; //데이터 요청 시 사용
    const mockMemberId = 1; //useSelector 사용
    const navigate = useNavigate();
    const {
        memberId,
        memberProfileImg,
        name,
        title,
        content,
        tag,
        view,
        like,
        memberLiked,
        comment,
        registeredAt,
        modifiedAt,
    } = CommunityDetailMockdata;
    const [likeCount, setLikeCount] = useState(like); //실제 구현 시 데이터 받고나서 데이터 설정할 것.
    const [isLiked, setIsLiked] = useState(memberLiked?.includes(mockMemberId)); //실제 구현 시 데이터 받고나서 데이터 설정할 것.
    const [commentCount, setCommentCount] = useState(comment.length);
    const handleLike = useCallback(() => {
        isLiked ? setLikeCount((prev) => prev - 1) : setLikeCount((prev) => prev + 1);
        setIsLiked((prev) => !prev);
    }, [isLiked]);

    const hanldeNavigatePrev = useCallback(() => {
        navigate(-1);
        //이동했을 때, 이전 페이지 상태(스크롤위치, 페이지번호, 태그상태)를 유지해야한다.
        //router기능 이용하거나, redux에 저장해서 구현할 것.
    }, []);

    const handleNavigateProfile = useCallback(() => {
        navigate(`/mypage`, { state: memberId });
    }, [memberId]);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const dateStr = modifiedAt || registeredAt;
    const datePart = dateStr.split('T')[0];
    const dateArr = datePart.split('-');
    const newDateStr = dateArr[0].slice(2) + '. ' + dateArr[1] + '. ' + dateArr[2];
    const formattedDate = modifiedAt ? `${newDateStr} (수정됨)` : newDateStr;
    return (
        <Background $image={backgroundImg}>
            <PostContainer>
                <TitleSection>
                    <button onClick={hanldeNavigatePrev}>목록</button>
                    <h1>{title}</h1>
                    <div>
                        <div>
                            <h3>관련태그: </h3>
                            <span className="tag">{tag}</span>{' '}
                        </div>
                        <div>
                            <span className="date">{formattedDate}</span>
                            <img src={memberProfileImg} />
                            <span className="name" onClick={handleNavigateProfile}>
                                {name}
                            </span>
                        </div>
                    </div>
                </TitleSection>
                <DetailContentSection
                    commentCount={commentCount}
                    view={view}
                    content={content}
                    handleLike={handleLike}
                    isLiked={isLiked}
                    likeCount={likeCount}
                />
                <DetailCommentSection comment={comment} />
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