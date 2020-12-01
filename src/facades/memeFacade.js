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


  const getColdList = () => {
    return fetch(URL + "/api/memes/cold", apiFacade.makeOptions("GET", true))
      .then(handleHttpErrors)
  }

  const getHotList = () => {
    return fetch(URL + "/api/memes/hot", apiFacade.makeOptions("GET", true))
      .then(handleHttpErrors)
  }


  const upvoteMeme = (username, meme) => {
    return fetch(URL + `/api/memes/upvote/${username}`, 
    apiFacade.makeOptions("POST", true, meme))
    .then(handleHttpErrors);
  }

  const downvoteMeme = (username, meme) => {
    return fetch(URL + `/api/memes/downvote/${username}`, 
    apiFacade.makeOptions("POST", true, meme))
    .then(handleHttpErrors);
  }

  return { 
    getMeme, 
    getCat, 
    getYon, 
    getDogs, 
    upvoteMeme, 
    downvoteMeme, 
    getColdList, 
    getHotList,
    getComments,
    addComment, 
  };
};


 const facade = memeFacade();
 export default facade;
