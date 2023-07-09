import React from 'react';
import styled from 'styled-components';
import ClubTag from './ClubTag';

import Profile from '../../public/profile.png';
import Views from '../../public/view.png';
import Message from '../../public/bubble-chat.png';

export default function ClubCard() {
    return (
        <CardWarp>
            <TitleContainer>
                <span>제목을 적을겁니다. 오전 수영 모임 모집합니다 많은 관심 부탁드립니다!</span>
            </TitleContainer>
            <TagContainer>
                <ClubTag $incard={true} />
                <ClubTag $incard={true} />
                <ClubTag $incard={true} />
            </TagContainer>
            <InfoContainer>
                <UserInfo>
                    <img src={Profile} />
                    <span>리노리노</span>
                </UserInfo>
                <ContentsInfo>
                    <img src={Views} />
                    <span>120</span>
                    <img src={Message} />
                    <span>10</span>
                </ContentsInfo>
            </InfoContainer>
        </CardWarp>
    );
}

const CardWarp = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    border: 1px solid #696969;
    border-radius: 2rem;
    width: 400px;
    height: 270px;
    margin: 2rem;
`;

const TitleContainer = styled.div`
    font-size: 1.3rem;
    font-family: 'KimjungchulGothic-Bold';
    padding: 30px;
`;
const TagContainer = styled.div`
    display: flex;
`;
const InfoContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-top: 1px solid #696969;
    margin-top: 30px;
    width: 90%;
    padding-top: 14px;
`;

const UserInfo = styled.div`
    display: flex;
    align-items: center;
    > img {
        width: 30px;
        height: 30px;
    }
    > span {
        margin-left: 10px;
        font-weight: 500;
    }
`;

const ContentsInfo = styled.div`
    display: flex;
    align-items: center;
    > img {
        width: 30px;
        height: 30px;
        margin-left: 20px;
        filter: opacity(0.4) drop-shadow(0 0 0 #565656);
    }
    > span {
        margin-left: 6px;
        font-weight: 500;
    }
`;
