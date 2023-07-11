import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useForm, SubmitHandler } from 'react-hook-form';
import { CommentInput } from '../pages/ContentsDetail';
interface CommentProps {
    commentData: {
        memberId: number;
        name: string;
        memberProfileImg: string;
        content: string;
        registeredAt: string;
        modifiedAt: string | null;
    };
}
const Comment = ({ commentData }: CommentProps) => {
    const { memberId, name, memberProfileImg, content, registeredAt, modifiedAt } = commentData;
    const navigate = useNavigate();
    const [modifiedDate, setModifiedAt] = useState<string | null>(modifiedAt);
    const [isEditOn, setIsEditOn] = useState<boolean>(false);
    const [commentContent, setCommentContent] = useState<string>(content);

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

    const onSubmit: SubmitHandler<CommentInput> = (data) => {
        // console.log(data);
        // 댓글 수정 patch api 요청
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

    const handleDelete = useCallback(() => {
        alert('댓글을 삭제합니다.');
        // 댓글 삭제 Delete 요청
    }, []);

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
                                <button onClick={handleDelete}>삭제</button>
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