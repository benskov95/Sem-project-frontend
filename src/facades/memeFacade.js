import { URL } from "../components/Funny";
import apiFacade, { handleHttpErrors } from "../base-facades/apiFacade";

const memeFacade = () => {

  const getMeme = () => {
    return fetch(URL + "/api/memes/funny", apiFacade.makeOptions("GET", true))
      .then(handleHttpErrors)
  };

  const getCat = () => {
    return fetch(URL + "/api/memes/cat", apiFacade.makeOptions("GET", true))
      .then(handleHttpErrors)
  }

  const getYon = () => {
    return fetch(URL + "/api/memes/yesorno", apiFacade.makeOptions("GET", true))
      .then(handleHttpErrors)
  }

  const getDogs = () => {
    return fetch(URL + "/api/memes/dog", apiFacade.makeOptions("GET", true))
      .then(handleHttpErrors)
  }

  const getComments = (id ,meme) => {
    return fetch(URL + `/api/memes/comment/${id}`, apiFacade.makeOptions("GET", true, meme))
    .then(handleHttpErrors)
  }

  const addComment = (meme) => {
    return fetch(URL + `/api/memes/comment`, apiFacade.makeOptions("POST", true, meme))
  }

  return { getMeme, getCat, getYon, getDogs, getComments, addComment };
};

const facade = memeFacade();
export default facade;
