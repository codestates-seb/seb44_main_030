import React from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';

const CommunityCreate = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = (data: string) => {
        console.log(data);
    };

    return (
        <CreateFormContainer>
            <DetailInfoContainer></DetailInfoContainer>
            <FormContainer onSubmit={handleSubmit(onSubmit)}>
                <Title>
                    <label>제목</label>
                    <input
                        placeholder="글 제목을 입력해주세요"
                        {...register('title', {
                            required: '제목을 입력해주세요',
                            minLength: { value: 5, message: '5자 이상 입력해주세요' },
                            maxLength: { value: 20, message: '20자 이내로 입력해주세요' },
                        })}
                    />
                    {errors.title && <span>{errors.title.message}</span>}
                </Title>
                <Content>
                    <label>내용</label>
                    <textarea
                        placeholder="모임에 대해 소개해주세요!"
                        {...register('content', {
                            required: '내용을 입력해주세요',
                            minLength: { value: 30, message: '30자 이상 입력해주세요' },
                            maxLength: { value: 500, message: '500자 이내로 입력해주세요' },
                        })}
                    />
                    {errors.title && <span>{errors.content.message}</span>}
                </Content>
                <button>취소</button>
                <button type="submit">글 등록</button>
            </FormContainer>
        </CreateFormContainer>
    );
};

export default CommunityCreate;

const CreateFormContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;
const DetailInfoContainer = styled.div``;
const FormContainer = styled.form``;
const Title = styled.div`
    width: 1200px;
    height: 60px;
    border-radius: 15px;
    border: none;
    box-sizing: border-box;
    background: #fff;
    margin: 60px 0 10px 0;
    box-shadow: 0px 4px 15px 0px rgba(0, 0, 0, 0.08);
`;
const Content = styled.div`
    width: 1200px;
    border-radius: 15px;
    border: none;
    box-sizing: border-box;
    background: #fff;
    padding: 80px 120px 80px 120px;
    box-shadow: 0px 4px 15px 0px rgba(0, 0, 0, 0.15);
`;
