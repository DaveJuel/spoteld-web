import { makeApiRequest } from "./RequestHandler";

export const loginUser = async (username, password) => {
    let isLoggedIn = false;
    try{
        const request = {
            email: username,
            password
        };
        const response = await makeApiRequest(`/api/auth/login/`, 'POST',request);
        if(response.token){
            localStorage.setItem("loginToken", response.token);
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
    localStorage.removeItem("loginToken");
}

export const isUserLoggedIn = () => {
    const user = localStorage.getItem("loginToken");
    return !!user;
}

export const getLoggedInToken = () => {
    return isUserLoggedIn() ? localStorage.getItem('loginToken'): null;
}

