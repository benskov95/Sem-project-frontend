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

  const getColdList = () => {
    return fetch(URL + "/api/memes/cold", apiFacade.makeOptions("GET", true))
      .then(handleHttpErrors)
  }

  const getHotList = () => {
    return fetch(URL + "/api/memes/hot", apiFacade.makeOptions("GET", true))
      .then(handleHttpErrors)
  }
  const getFavoriteList = (user) => {
    return fetch(URL + `/api/memes/favorite/${user}`, apiFacade.makeOptions("GET", true))
      .then(handleHttpErrors)
  }

  return { getMeme, getCat, getYon, getDogs, getColdList, getHotList, getFavoriteList };
};

const facade = memeFacade();
export default facade;
