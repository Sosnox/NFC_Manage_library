

const endpoint = process.env.NEXT_PUBLIC_API_URL_AUTH + '/dash/countCardScan';

const CountCardScan = async (): Promise<any> => {

    try {
        const response = await fetch(endpoint, {
            method: "GET",
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

export default CountCardScan;
