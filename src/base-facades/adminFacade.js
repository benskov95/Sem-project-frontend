import { URL } from "../components/Funny";
import apiFacade, { handleHttpErrors } from "./apiFacade";

const adminFacade = () => {
  const getUsers = () => {
    return fetch(URL + "/api/users", apiFacade.makeOptions("GET", true)).then(
      handleHttpErrors
    );
  };

  const deleteUser = (userName) => {
    return fetch(
      URL + `/api/users/${userName}`,
      apiFacade.makeOptions("DELETE", true)
    ).then(handleHttpErrors);
  };

  const banUser = (userName) => {
    return fetch(
      URL + `/api/users/ban/${userName}`,
      apiFacade.makeOptions("POST", true)
    ).then(handleHttpErrors);
  };

  const unbanUser = (userName) => {
    return fetch(
      URL + `/api/users/unban/${userName}`,
      apiFacade.makeOptions("POST", true)
    ).then(handleHttpErrors);
  };

  const getReportedMemes = () => {
    return fetch(URL + "/api/memes/reports", apiFacade.makeOptions("GET", true))
      .then(handleHttpErrors);
  };

  return { getUsers, deleteUser, banUser, unbanUser, getReportedMemes };
};

const facade = adminFacade();
export default facade;
