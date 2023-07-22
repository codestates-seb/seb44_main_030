import React from 'react';
import styled from 'styled-components';
interface PageButtonProps {
    data: {
        value?: string | number;
        page?: number;
    };
    onClick?: (event: React.MouseEvent<HTMLLIElement, MouseEvent>) => void;
}
interface PageButtonStyledProps {
    $isCurrPage: boolean;
}
const PageButton = ({ data, onClick }: PageButtonProps) => {
    const { value, page } = data;
    return (
        <PageButtonStyled onClick={onClick} $isCurrPage={page === value}>
            {value}
        </PageButtonStyled>
    );
};

export default PageButton;

const PageButtonStyled = styled.li<PageButtonStyledProps>`
    width: 40px;
    height: 40px;
    border-radius: 15px;
    border: 1px solid #696969;
    background-color: ${(props) => (props.$isCurrPage ? '#3884D5' : '#fff')};
    color: ${(props) => (props.$isCurrPage ? '#ffffff' : '#000000')};
    box-shadow: 0px 4px 15px 0px rgba(0, 0, 0, 0.25);
    display: flex;
    align-items: center;
    justify-content: center;
    &:hover {
        cursor: pointer;
    }
    font-weight: 600;
`;
