import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { useForm, SubmitHandler } from 'react-hook-form';
import axios from 'axios';
import ConfirmModal from './common/ConfirmModal';
import { usePostHeader } from '../api/getHeader';
import moment from 'moment';
type CommentProps = {
    commentData: {
        memberId?: number;
        nickname?: string;
        profileImageUrl?: string;
        content: string;
        createdAt: string;
        modifiedAt: string;
        boardClubCommentId?: number;
        boardStandardCommentId?: number;
    };
    boardStandardClubId: number;
};
type CommentInput = {
    Content: string;
};
type payloadType = {
    content: string;
    boardStandardId?: number;
    boardClubId?: number;
};
const Comment = ({ commentData, boardStandardClubId }: CommentProps) => {
    const {
        memberId,
        nickname,
        profileImageUrl,
        content,
        createdAt,
        boardClubCommentId = 0,
        boardStandardCommentId = 0,
    } = commentData;
    const navigate = useNavigate();
    const [isEditOn, setIsEditOn] = useState<boolean>(false);
    const [commentContent, setCommentContent] = useState<string>(content);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const headers = usePostHeader();
    const location = useLocation();
    const boardType = location.pathname.split('/')[1] === 'community' ? 'standardcomments' : 'clubcomments';
    const boardCommentId = boardClubCommentId || boardStandardCommentId;
    // const loginId = 3; //storage사용

    // const loginId = 3; //storage사용

    const { register, handleSubmit, reset } = useForm<CommentInput>({
        mode: 'onSubmit',
        defaultValues: {
            Content: '',
        },
    });

    // 모달 창 닫기
    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    // 댓글 수정 patch api 요청
    const onSubmit: SubmitHandler<CommentInput> = async (data) => {
        // console.log(data);
        const payload: payloadType = {
            content: `${data.Content}`,
        };
        if (boardType === 'standardcomments') {
            payload.boardStandardId = Number(boardStandardClubId);
        }
        if (boardType === 'clubcomments') {
            payload.boardClubId = Number(boardStandardClubId);
        }

        const API_URL = import.meta.env.VITE_KEY;
        try {
            const response = await axios.patch(`${API_URL}/${boardType}/${boardCommentId}`, payload, headers);
            if (response.status === 200 || response.status === 201) {
                alert('댓글수정 완료!');
            }
        } catch (error: unknown) {
            if (axios.isAxiosError(error)) {
                if (error.message === 'Request failed with status code 403') {
                    alert('잘못된 요청입니다');
                }
            }
        }
        console.log(payload);
        setCommentContent(data.Content);
        reset();
        setIsEditOn((prev) => !prev);
    };

    const handleNavigateProfile = () => {
        navigate(`/mypage`, { state: memberId });
    };

    const handleEdit = () => {
        setIsEditOn((prev) => !prev);
        reset({ Content: commentContent });
    };

    // 댓글 삭제 Delete 요청
    const handleDelete = async () => {
        try {
            const response = await axios.delete(`${import.meta.env.VITE_KEY}/${boardType}/${boardCommentId}`, headers);
            if (response.status === 200 || response.status === 204) {
                window.location.reload();
            }
        } catch (error: unknown) {
            if (axios.isAxiosError(error)) {
                handleCloseModal();
                if (error.message === 'Request failed with status code 403') {
                    alert('잘못된 요청입니다');
                }
            } else {
                console.log('Error occurred while creating the patch', error);
            }
        }
    };

    const handleCancelEdit = () => {
        reset();
        setIsEditOn((prev) => !prev);
    };

    return (
        <CommentContainer>
            <UserInfoBox>
                <img
                    src={`https://splashzone-upload.s3.ap-northeast-2.amazonaws.com/${profileImageUrl}`}
                    alt="profile_image"
                />
                <div title={`${nickname}`} onClick={handleNavigateProfile}>
                    {nickname}
                </div>
            </UserInfoBox>
            {isEditOn ? (
                <form onSubmit={handleSubmit(onSubmit)}>
                    <textarea
                        id="commentInput"
                        placeholder="수정할 댓글 내용을 입력해주세요"
                        {...register('Content', {
                            required: true,
                        })}
                    />
                    <div>
                        <button type="submit">수정</button>
                        <button type="button" onClick={handleCancelEdit}>
                            취소
                        </button>
                    </div>
                </form>
            ) : (
                <ContentBox>{commentContent}</ContentBox>
            )}
            <DateBox>
                {/* memberId === loginId &&  */}
                {
                    <div className="edit">
                        {isEditOn || (
                            <div>
                                <button onClick={handleEdit}>수정</button>
                                <button onClick={() => setIsModalOpen(true)}>삭제</button>
                                {isModalOpen && (
                                    <ConfirmModal
                                        handleCloseModal={handleCloseModal}
                                        handleConfirm={handleDelete}
                                        text="정말 삭제할까요?"
                                    />
                                )}
                            </div>
                        )}
                    </div>
                }
                <div>{moment(createdAt).format('YYYY-MM-DD')}</div>
            </DateBox>
        </CommentContainer>
    );
};
export default Comment;
const CommentContainer = styled.div`
    margin-top: 20px;
    border-bottom: 1px solid #d9d9d9;
    padding-bottom: 20px;
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
            > button {
                width: 50px;
                height: 30px;
                background-color: #3884d5;
                color: #ffffff;
                border-radius: 5px;
                margin-top: 5px;
            }
        }
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
`;
const UserInfoBox = styled.div`
    display: flex;
    align-items: center;
    img {
        width: 17px;
        height: 17px;
        border-radius: 3px;
        margin-right: 3px;
    }
    > div {
        font-weight: 600;

        &:hover {
            color: #3884d5;
            cursor: pointer;
        }
    }
`;
const ContentBox = styled.p`
    line-height: 25px;
`;
const DateBox = styled.div`
    display: flex;
    align-items: center;
    justify-content: end;
    width: 100%;
    font-size: 14px;
    > div {
        color: #696969;
    }
    > div.edit {
        display: flex;
        align-items: center;

        > div > button {
            font-size: 14px;
            font-weight: 600;

            padding: 0 5px 0 0;
            background: none;
            border: none;
            color: #696969;
            &:hover {
                color: #3884d5;
                cursor: pointer;
            }
        }
    }
`;
