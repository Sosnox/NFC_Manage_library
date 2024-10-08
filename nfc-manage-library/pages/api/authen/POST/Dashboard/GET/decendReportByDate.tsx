

const endpoint = process.env.NEXT_PUBLIC_API_URL_AUTH + '/dash/decendReportByDate';


const dateReportDateByDate = async (data : any): Promise<any> => {
    const formData = new FormData();
    formData.append('date', data);

    try {
        const response = await fetch(`${endpoint}/${data}`, {
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

export default dateReportDateByDate;
