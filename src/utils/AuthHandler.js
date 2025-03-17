import { apiKey, makeApiRequest } from "./RequestHandler";

export const loginUser = async (username, password) => {
    let isLoggedIn = false;
    try{
        const request = {
            api_key: apiKey,
            username,
            password
        };
        const response = await makeApiRequest(`/user/login`, 'POST',request);
        if(response.success){
            localStorage.setItem("user", JSON.stringify(response.result));
            isLoggedIn = true;
        }else{
            console.error('Something went wrong on login: Response below >>');
            console.error(response);
        }
    }catch(error){
        console.error(error);
    }
    return isLoggedIn;
}

export const logoutUser = () => {
    localStorage.removeItem("user");
}

export const isUserLoggedIn = () => {
    const user = localStorage.getItem("user");
    return !!user;
}

export const getLoggedInUser = () => {
    return isUserLoggedIn() ? JSON.parse(localStorage.getItem('user')) : null;
}

