import React from 'react';
import styled from 'styled-components';

export default function PopularContentsCard() {
    return (
        <CardWarp>
            <TitleContentsTagWarp>
                <TitleContainer></TitleContainer>
                <ContentsContainer></ContentsContainer>
            </TitleContentsTagWarp>
            <InfoContainer>
                <UserInfo></UserInfo>
                <ContentsInfo></ContentsInfo>
            </InfoContainer>
        </CardWarp>
    );
}

const CardWarp = styled.div``;
const TitleContentsTagWarp = styled.div``;
const TitleContainer = styled.div``;
const ContentsContainer = styled.div``;
const InfoContainer = styled.div``;
const UserInfo = styled.div``;
const ContentsInfo = styled.div``;
