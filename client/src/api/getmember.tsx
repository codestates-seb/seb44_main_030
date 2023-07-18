import axios from 'axios';
interface member {
    memberId: number;
    name: string;
    email: string;
    nickname: string;
    bio: string;
}

export const getInfos = (id: number) => axios.get(`http://13.209.142.240:8080/members/${id}`);

export const patchInfos = (id: number, edit: member) => axios.patch(`http://13.209.142.240:8080/members/${id}`, edit);

const Button = () => {
    return (
        <button
            onClick={() => {
                getInfos(3);
            }}
        ></button>
    );
};

export default Button;
