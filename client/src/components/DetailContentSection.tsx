import React, { useCallback, useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import LikeIcon from '../assets/Like.svg';
import LikeFilledIcon from '../assets/Like_filled.svg';
import ViewIcon from '../assets/View.svg';
import CommentIcon from '../assets/Comment.svg';

const DetailContentSection = ({ view, content, commentCount, handleLike, isLiked, likeCount }) => {
    const mockMemberId = 1;

    const navigate = useNavigate();
    const handleEdit = useCallback(() => {
        navigate('/community/create');
    }, []);
    const handleDelete = useCallback(() => {
        alert('게시글을 삭제합니다.');
        // 게시글 삭제 API 요청
    }, []);

    return (
        <ContentSection>
            <h1>내용</h1>
            <p>{content}</p>
            <div>
                <EditContainer>
                    <button onClick={handleEdit}>수정</button>
                    <button onClick={handleDelete}>삭제</button>
                </EditContainer>
                <div>
                    <img src={ViewIcon} alt="ViewCount" />
                    {view}
                </div>
                <div>
                    <LikeButton onClick={handleLike}>
                        {isLiked ? (
                            <img src={LikeFilledIcon} alt="LikeFilled" />
                        ) : (
                            <img src={LikeIcon} alt="LikeNotFilled" />
                        )}
                    </LikeButton>
                    {likeCount}
                </div>
                <div>
                    <img src={CommentIcon} alt="CommentCount" />
                    {commentCount}
                </div>
            </div>
        </ContentSection>
    );
};
export default DetailContentSection;

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
export const LikeButton = styled.button`
    padding: 0;
    border: none;
    background: none;
    margin: 7px 0 7px 0;
    cursor: pointer;
`;