import {useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import LikeIcon from '../assets/Like.svg';
import LikeFilledIcon from '../assets/Like_filled.svg';
import ViewIcon from '../assets/View.svg';
import CommentIcon from '../assets/Comment.svg';
import { useDeletePost } from '../api/useMutationPost';
import { useDispatch } from 'react-redux';
import { savePostData } from '../store/editData';
import ConfirmModal from '../components/common/ConfirmModal';
type DetailProps = {
    title: string;
    view: number;
    content: string;
    commentCount: number;
    memberId: number;
    clubId?: number;
    boardStandardId?: number;
    likeCount?: number;
    handleLike?: () => void;
    isLiked?: boolean;
    tag: string;
};

const DetailContentSection = ({
    title,
    view,
    content,
    commentCount,
    handleLike,
    isLiked,
    likeCount,
    memberId,
    boardStandardId,
    clubId,
    tag,
}: DetailProps) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const postId = boardStandardId || clubId; //club데이터일 때는 clubId
    if (!postId) {
        throw new Error('해당 게시글에 대한 ID가 존재하지 않습니다.');
    }

    const { handleDeletePost, boardType } = useDeletePost(postId);
    const mockMemberId = 2; //로그인아이디로 변경
    const navigate = useNavigate();
    const dispatch = useDispatch();

    //게시글 수정: store에 데이터를 저장하고, create 페이지로 이동.
    const handleEdit = () => {
        dispatch(savePostData({ postId, tag, title, content }));
        const boardTypeParam = boardType === 'standards' ? 'community' : 'club';
        navigate(`/${boardTypeParam}/create`, { state: 'EditMode' });
    };

    return (
        <ContentSection>
            <h1>내용</h1>
            <p>{content}</p>
            <div>
                {memberId === mockMemberId && (
                    <EditContainer>
                        <button onClick={handleEdit}>수정</button>
                        <button onClick={() => setIsModalOpen(true)}>삭제</button>
                        {isModalOpen && (
                            <ConfirmModal
                                handleCloseModal={() => setIsModalOpen(false)}
                                handleConfirm={handleDeletePost}
                                text="정말 삭제하시겠습니까?"
                            />
                        )}
                    </EditContainer>
                )}
                <div>
                    <img src={ViewIcon} alt="ViewCount" />
                    {view}
                </div>
                {boardType === 'standards' && (
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
                )}
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
        word-wrap: break-word;
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
