import {useRefreshTokenMutation} from "../api/tokenApi";

export const useRefreshToken = () => {
    const [refreshTokenMutation] = useRefreshTokenMutation();

    const refreshToken = async (refreshToken) => {
        try {
            const result = await refreshTokenMutation({refreshToken}).unwrap();
            return result;
        } catch (error) {
            console.error("Ошибка при обновлении токена:", error);
            throw error;
        }
    };

    return refreshToken;
};