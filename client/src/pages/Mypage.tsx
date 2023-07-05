import styled from 'styled-components';
const Mypage = () => {
    return (
        <Background>
            <Mypagecontainer>
                <Styledprofile></Styledprofile>
                <Styledcontent></Styledcontent>
                <Styledcontent></Styledcontent>
                <Styledcontent></Styledcontent>
                <Styledcontent></Styledcontent>
                <Styledcontent></Styledcontent>
                <div></div>
                <Styledcontent></Styledcontent>
            </Mypagecontainer>
        </Background>
    );
};

export default Mypage;

const Background = styled.div`
    background-image: url('../../public/mypage.png');
    background-size: cover;
    height: 100vh;
    background-position-y: 20%;
    box-shadow: 5px 2px 2px 2px;
    position: relative;
`;

const Mypagecontainer = styled.div`
    border: 1px solid rgba(181, 242, 255, 1);
    background: linear-gradient(to right, rgba(181, 242, 255, 1), rgba(112, 178, 255, 0.81));
    border-radius: 30px;
    width: 80%;
    height: 80%;
    position: absolute;
    box-sizing: border-box;
    top: 10%;
    left: 10%;
    padding: 30px;
    gap: 10px;
    display: grid;
    grid-template-columns: 30% 70%;
    grid-template-rows: 30% 10% 10% 50%;
`;

const Styledprofile = styled.div`
    width: 100%;
    height: 100%;
    border-radius: 50%;
    border: 1px solid black;
    background-color: white;
`;

const Styledcontent = styled.div`
    height: 95%;
    border-radius: 10px;
    border: 1px solid black;
    background-color: white;
`;
