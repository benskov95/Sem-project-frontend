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

  const upvoteMeme = (username, imageUrl) => {
    return fetch(URL + `/api/memes/upvote/${username}`, 
    apiFacade.makeOptions("POST", true, {imageUrl: imageUrl}))
    .then(handleHttpErrors);
  }

  const downvoteMeme = (username, imageUrl) => {
    return fetch(URL + `/api/memes/downvote/${username}`, 
    apiFacade.makeOptions("POST", true, {imageUrl: imageUrl}))
    .then(handleHttpErrors);
  }

  return { getMeme, getCat, getYon, getDogs, upvoteMeme, downvoteMeme };
};

const facade = memeFacade();
export default facade;
