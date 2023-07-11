import React from 'react';
import styled from 'styled-components';
import Comment from '../components/Comment.tsx';
import { useForm, SubmitHandler } from 'react-hook-form';
export interface CommentInput {
    Content: string;
}
const DetailCommentSection = ({comment}:{comment:string[]}) => {
    const { register, handleSubmit, reset } = useForm<CommentInput>({ mode: 'onSubmit' });
    const onSubmit: SubmitHandler<CommentInput> = (data) => {
        // console.log(data);
        // 댓글 작성 post api 요청
        reset();
        alert('댓글작성 완료!');
    };
    return (
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
    );
};

export default DetailCommentSection;

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
