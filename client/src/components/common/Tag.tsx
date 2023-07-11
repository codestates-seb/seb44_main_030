import React from 'react';
import styled from 'styled-components';

interface ClubTagProps {
    tag: string;
    $isSelected?: boolean;
    onClick?: (event: React.MouseEvent<HTMLLIElement>) => void;
}

export default function Tag({ tag, $isSelected, onClick }: ClubTagProps) {
    return (
        <TagWarp $isSelected={$isSelected} onClick={onClick}>
            {tag}
        </TagWarp>
    );
}

const TagWarp = styled.li<ClubTagProps>`
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
    ${({ $isSelected }) =>
        $isSelected &&
        `
        background-color: #3884d5;
        color: #dddddd;
    `}
`;
