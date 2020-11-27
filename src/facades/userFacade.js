import { URL } from "../components/Funny";
import apiFacade, { handleHttpErrors } from "../base-facades/apiFacade";

const userFacade = () => {

    const changeProfilePicture = (user) => {
        return fetch(`${URL}/api/users`, apiFacade.makeOptions("PUT", true, user))
        .then(handleHttpErrors);
    }
    
    const changePassword = (passwords, user) => {
        return fetch(`${URL}/api/users/change-pw/${passwords.oldPw}/${passwords.newPw}`,
        apiFacade.makeOptions("PUT", true, user))
        .then(handleHttpErrors);
    }

    return (
        {changeProfilePicture, changePassword}
    )
}

const facade = userFacade();
export default facade;