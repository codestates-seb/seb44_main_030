import styled from 'styled-components';

interface WrapperProps {
    height: string;
    width: string;
}

const StyledWrapper = styled.div<WrapperProps>`
    width: ${(props) => props.width};
    height: ${(props) => props.height};
    border: 1px solid black;
    box-shadow: 1px 1px 1px 1px rgba(0, 0, 0, 0.5);
    border-radius: 20px;
`;

const Wrapper = ({ height, width }: WrapperProps) => {
    return <StyledWrapper height={height} width={width}></StyledWrapper>;
};

export default Wrapper;
