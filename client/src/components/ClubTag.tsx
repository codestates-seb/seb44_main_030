import React from 'react';
import styled from 'styled-components';

interface ClubTagProps {
    $incard?: boolean;
    tag: string;
}

export default function ClubTag({ tag, handleTagSelect, currTag }) {
    return <TagWarp onClick={handleTagSelect}>{tag}</TagWarp>;
}

const TagWarp = styled.span<ClubTagProps>`
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid #696969;
    border-radius: 1.6rem;
    min-width: 60px;
    height: 40px;
    font-family: 'KimjungchulGothic-Bold';
    font-size: 1.1rem;
    color: #696969;
    padding: 15px;
    margin: 5px 5px 5px 0;
    > span {
        font-size: 17px;
        background-color: #696969;
        color: #ffffff;
        padding: 5px 9px 5px 9px;
        border-radius: 20px;
        list-style: none;
        white-space: nowrap;
        margin: 5px 0px 5px 5px;
        box-shadow: 0px 0px 2px 0px rgba(0, 0, 0, 0.75);
        -webkit-box-shadow: 0px 0px 2px 0px rgba(0, 0, 0, 0.75);
        -moz-box-shadow: 0px 0px 2px 0px rgba(0, 0, 0, 0.75);
        &:hover {
            cursor: pointer;
        }
        &:active {
            box-shadow: 0px -1px 9px 0px rgba(0, 0, 0, 0.75) inset;
            -webkit-box-shadow: 0px -1px 9px 0px rgba(0, 0, 0, 0.75) inset;
            -moz-box-shadow: 0px -1px 9px 0px rgba(0, 0, 0, 0.75) inset;
        }
        &:focus {
            box-shadow: 0px 0px 2px 0px rgba(0, 0, 0, 0.75) inset;
            -webkit-box-shadow: 0px 0px 2px 0px rgba(0, 0, 0, 0.75) inset;
            -moz-box-shadow: 0px 0px 2px 0px rgba(0, 0, 0, 0.75) inset;
        }
    }

    > span.true {
        background-color: #3884d5;
    }
`;
