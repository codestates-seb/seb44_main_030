import React, { useState, useCallback } from 'react';
import styled from 'styled-components';
import { useLocation, useNavigate } from 'react-router-dom';
import backgroundImg from '../assets/Community_background.png';
import { CommunityDetailMockdata } from '../assets/mockdata.ts';
import LikeIcon from '../assets/Like.svg';
import LikeFilledIcon from '../assets/Like_filled.svg';
import ViewIcon from '../assets/View.svg';
import CommentIcon from '../assets/Comment.svg';
import { IconStyled, LikeButton } from '../components/CommunityPost.tsx';
import { useForm, SubmitHandler } from 'react-hook-form';
import Comment from '../components/Comment.tsx';

interface BackgroundProps {
    $image: string;
}

export interface CommentInput {
    Content: string;
}

const ContentsDetail = () => {
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
    const [isLiked, setIsLiked] = useState(memberLiked.includes(mockMemberId)); //실제 구현 시 데이터 받고나서 데이터 설정할 것.
    const [commentCount, setCommentCount] = useState(comment.length);

    const { register, handleSubmit, reset } = useForm<CommentInput>({ mode: 'onSubmit' });

    const onSubmit: SubmitHandler<CommentInput> = (data) => {
        // console.log(data);
        // 댓글 작성 post api 요청
        reset();
        alert('댓글작성 완료!');
    };
    //standardId 이용해서 API 요청
    const hanldeNavigatePrev = useCallback(() => {
        navigate('/community');
        //이동했을 때, 이전 페이지 상태(스크롤위치, 페이지번호, 태그상태)를 유지해야한다.
        //router기능 이용하거나, redux에 저장해서 구현할 것.
    }, []);
    const handleLike = useCallback(() => {
        isLiked ? setLikeCount((prev) => prev - 1) : setLikeCount((prev) => prev + 1);
        setIsLiked((prev) => !prev);
    }, [isLiked]);
    const handleNavigateProfile = useCallback(() => {
        navigate(`/mypage`, { state: memberId });
    }, [memberId]);
    const handleEdit = useCallback(() => {
        navigate('/community/create');
    }, []);
    const handleDelete = useCallback(() => {
        alert('게시글을 삭제합니다.');
        // 게시글 삭제 API 요청
    }, []);
    // 날짜 어떻게 받을 건지 상의 필요.(포맷팅 된 상태 or Not)
    // 날짜 포맷팅 임의로
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
                <ContentSection>
                    <h1>내용</h1>
                    <p>{content}</p>
                    <div>
                        <EditContainer>
                            <button onClick={handleEdit}>수정</button>
                            <button onClick={handleDelete}>삭제</button>
                        </EditContainer>
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
                    </div>
                </ContentSection>
                <CommentSection>
                    <CreateCommentSpace>
                        <label htmlFor="commentInput">댓글작성</label>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <textarea
                                id="commentInput"
                                placeholder="댓글 내용을 입력해주세요"
                                {...register('Content', {
                                    required: true,
                                })}
                            />
                            <div>
                                <button type="submit">작성</button>
                            </div>
                        </form>
                    </CreateCommentSpace>
                    <div>
                        {comment.map((commentData) => (
                            <Comment commentData={commentData} />
                        ))}
                    </div>
                </CommentSection>
            </PostContainer>
        </Background>
    );
};

export default ContentsDetail;

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
const ContentSection = styled.section`
    > h1 {
        font-size: 20px;
        font-weight: 600;
    }
    > div {
        display: flex;
        align-items: center;
        justify-content: end;
        margin-right: 10px;
        > div {
            margin: 0 5px 0 5px;
            display: flex;
            align-items: center;
            > button {
                display: flex;
                align-items: center;
            }
            img {
                margin-right: 3px;
            }
            color: #696969;
            font-size: 14px;
        }
    }
    > p {
        line-height: 25px;
    }
    padding-bottom: 15px;
    border-bottom: 1px solid #d9d9d9;
`;
const EditContainer = styled.div`
    display: flex;
    align-items: center;
    font-size: 14px;
    > button {
        font-weight: 600;

        background: none;
        border: none;
        color: #696969;
        padding: 0 5px 0 0;
        &:hover {
            color: #3884d5;
            cursor: pointer;
        }
    }
`;
const CommentSection = styled.section`
    border-bottom: 1px solid #d9d9d9;
`;
const CreateCommentSpace = styled.div`
    border-bottom: 1px solid #d9d9d9;
    margin-top: 20px;
    padding-bottom: 15px;
    form {
        display: flex;
        justify-content: center;
        flex-direction: column;
        align-items: center;
        width: 750px;
        > div {
            width: 750px;
            display: flex;
            justify-content: end;
        }
    }
    label {
        font-size: 20px;
        font-weight: 600;
    }
    textarea {
        width: 750px;
        height: 100px;
        display: flex;
        align-items: start;
        padding: 8px 8px 8px 8px;
        border-radius: 5px;
        margin-top: 10px;
        resize: none;
        &:focus {
            outline: solid 1px #3884d5;
        }
    }
    button {
        width: 50px;
        height: 30px;
        background-color: #3884d5;
        color: #ffffff;
        border-radius: 5px;
        margin-top: 5px;
    }
`;
