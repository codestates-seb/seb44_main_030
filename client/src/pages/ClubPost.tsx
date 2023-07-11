import React from 'react';
import styled from 'styled-components';

export default function ClubPost() {
    return (
        <PostRegisterWarpContainer>
            <PostInfoContainer>
                <ul>
                    <li></li>
                    <li></li>
                </ul>
                <ul>
                    <li></li>
                </ul>
            </PostInfoContainer>
            <PostRegisterContainer></PostRegisterContainer>
            <SubmitButton></SubmitButton>
        </PostRegisterWarpContainer>
    );
}

const PostRegisterWarpContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const PostInfoContainer = styled.div``;
const PostRegisterContainer = styled.div``;
const SubmitButton = styled.div``;
