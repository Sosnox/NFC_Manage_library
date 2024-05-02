
interface User {
    username: string;
    password: string;
}
const endpoint = process.env.NEXT_PUBLIC_API_URL_AUTH + '/auth/login';

const loginAuth = async (data: User): Promise<any> => {
    const formData = new FormData();
    formData.append('username', data.username);
    formData.append('password', data.password);

    try {
        const response = await fetch(endpoint, {
            method: "POST",
            body: formData,
        });
        const responseData = await response.json();
        if (response.ok) {
            return responseData;
        }
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export default loginAuth;
