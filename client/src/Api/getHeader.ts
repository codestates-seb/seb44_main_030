import { useCookies } from 'react-cookie';

export const usePostHeader = () => {
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