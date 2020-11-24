import { URL } from "../base-components/Home";
import apiFacade, { handleHttpErrors } from "../base-facades/apiFacade";

const memeFacade = () => {
  
  const getfunnyMeme = () => {
    return fetch(URL + "/api/memes/funny", apiFacade.makeOptions("GET", true))
    .then(handleHttpErrors);
  };

  return { getfunnyMeme };
};

const facade = memeFacade();
export default facade;
