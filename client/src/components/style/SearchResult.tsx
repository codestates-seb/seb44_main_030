//{infodata}
import styled from 'styled-components';

const StyledResult = styled.div`
    border: 1px solid black;
    border-radius: 10px;
    box-shadow: 1px 1px 1px 1px rgba(0, 0, 0, 0.4);
    background-color: white;
    width: 300px;
    height: 40px;
`;

const SearchResult = () => {
    return <StyledResult></StyledResult>;
};

export default SearchResult;
