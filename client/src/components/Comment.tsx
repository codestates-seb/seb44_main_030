import { useState, useEffect, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { useForm, SubmitHandler } from 'react-hook-form';
import axios, { AxiosError } from 'axios';
import ConfirmModal from './common/ConfirmModal';
import { usePostHeader } from '../api/getHeader';
type CommentProps = {
    commentData: {
        memberId: number;
        commentId: number;
        name: string;
        memberProfileImg: string;
        content: string;
        registeredAt: string;
        modifiedAt: string | null;
    };
    boardStandardId: string;
};
type CommentInput = {
    Content: string;
};
const Comment = ({ commentData, boardStandardId }: CommentProps) => {
    const { commentId, memberId, name, memberProfileImg, content, registeredAt, modifiedAt } = commentData;
    const navigate = useNavigate();
    const [modifiedDate, setModifiedAt] = useState<string | null>(modifiedAt);
    const [isEditOn, setIsEditOn] = useState<boolean>(false);
    const [commentContent, setCommentContent] = useState<string>(content);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const headers = usePostHeader();
    const location = useLocation();
    const boardType = location.pathname.split('/')[1] === 'community' ? 'boardcomments' : 'clubcomments';

    const loginId = 1; //useSelector 사용

    const { register, handleSubmit, reset } = useForm<CommentInput>({
        mode: 'onSubmit',
        defaultValues: {
            Content: '',
        },
    });

    useEffect(() => {
        setModifiedAt(modifiedAt);
    }, [modifiedAt]);

    // 모달 창 닫기
    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    // 댓글 수정 patch api 요청
    const onSubmit: SubmitHandler<CommentInput> = async (data) => {
        // console.log(data);
        const payload = {
            boardStandardId: Number(boardStandardId),
            content: `${data.Content}`,
        };
        const API_URL = import.meta.env.VITE_KEY;
        try {
            //commentId가 club, community 별로 나눠져서 관리 되는지? 합쳐서 관리되는지? 잘모름. 일단 임의로 작성.
            const response = await axios.patch(`${API_URL}/${boardType}/${commentId}`, payload, headers);
            if (response.status === 200 || response.status === 201) {
                console.log('수정 성공');
            } else {
                // 오류 처리
                console.log('수정 요청을 실패했습니다');
            }
        } catch (error: unknown) {
            if (axios.isAxiosError(error)) {
                console.log('Axios Error occurred while creating the patch', (error as AxiosError).response?.data);
            } else {
                console.log('Error occurred while creating the patch', error);
            }
        }
        console.log(payload);
        setCommentContent(data.Content);
        reset();
        setIsEditOn((prev) => !prev);
        alert('댓글수정 완료!');
    };

    const handleNavigateProfile = useCallback(() => {
        navigate(`/mypage`, { state: memberId });
    }, [memberId]);

    const handleEdit = useCallback(() => {
        setIsEditOn((prev) => !prev);
        reset({ Content: commentContent });
    }, [commentContent]);

    // 댓글 삭제 Delete 요청
    const handleDelete = async () => {
        try {
            const response = await axios.delete(`${import.meta.env.VITE_KEY}/${boardType}/${commentId}`, headers);
            if (response.status === 200 || response.status === 204) {
                console.log('삭제 성공');
            } else {
                // 오류 처리
                console.log('삭제 요청을 실패했습니다');
            }
        } catch (error: unknown) {
            if (axios.isAxiosError(error)) {
                console.log('Axios Error occurred while creating the patch', (error as AxiosError).response?.data);
            } else {
                console.log('Error occurred while creating the patch', error);
            }
        }
    };

    const handleCancelEdit = useCallback(() => {
        reset();
        setIsEditOn((prev) => !prev);
    }, []);

    // 날짜 어떻게 받을 건지 상의 필요.(포맷팅 된 상태 or Not)
    // 날짜 포맷팅 임의로
    const dateStr = modifiedDate || registeredAt;
    const datePart = dateStr.split('T')[0];
    const dateArr = datePart.split('-');
    const newDateStr = dateArr[0].slice(2) + '. ' + dateArr[1] + '. ' + dateArr[2];
    const formattedDate = modifiedDate ? `${newDateStr} (수정됨)` : newDateStr;

    return (
        <CommentContainer>
            <UserInfoBox>
                <img src={memberProfileImg} alt="profile_image" />
                <div title={`${name}`} onClick={handleNavigateProfile}>
                    {name}
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
                {memberId === loginId && (
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
                )}
                <div>{formattedDate}</div>
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
