import { appUrl } from "./RequestHandler";

export const loginUser = async (username, password) => {
    let isLoggedIn = false;
    try{
        const request = {
            email: username,
            password
        };
        const result = await fetch(`${appUrl}/api/auth/login/`, {
            headers: {
                "Content-Type": "application/json"
              },
            method: "POST", 
            body: JSON.stringify(request)
        });
    
        if (!result.ok) {
            throw new Error(`HTTP error! status: ${result.status}`);
        }
        const response= await result.json();
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
    window.location.href = "/login";
}

export const isUserLoggedIn = () => {
    const user = localStorage.getItem("loginToken");
    return !!user;
}

export const getLoggedInToken = () => {
    return isUserLoggedIn() ? localStorage.getItem('loginToken'): null;
}

