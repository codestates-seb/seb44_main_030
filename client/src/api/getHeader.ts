import { useCookies } from 'react-cookie';
type PostHeader = {
    headers: {
        Authorization: string;
        Refresh: string;
        withCredentials: boolean;
    };
};

export const usePostHeader = ():PostHeader => {
    const [cookies] = useCookies(['AuthorizationToken', 'RefreshToken']);
    const authorizationToken = cookies.AuthorizationToken;
    const refreshToken = cookies.RefreshToken;

    return ({
        headers: {
            Authorization: `${decodeURIComponent(authorizationToken)}`,
            Refresh: `${refreshToken}`,
            withCredentials: true
        }
    })
}