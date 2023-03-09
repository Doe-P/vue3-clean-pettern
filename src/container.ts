import {HttpService} from "./shared/http/HttpService";

// for Article
import {ArticleService as makeArticleService} from "./modules/articles/infrastructure/ArticleService";
import { getArticles as makeGetArticles} from "./modules/articles/application/getArticles";

// for Joke
import {JokeService as makeJokeService} from "./modules/randomJoke/infrastructure/JokeService";
import {randomJoke as makeRandomJoke} from "./modules/randomJoke/application/randomJoke";


enum ENDPOINTS {
      JOKE_API = 'https://official-joke-api.appspot.com',
    CORE = 'https://jsonplaceholder.typicode.com',
}
// for Core api
const coreHttpService = new HttpService(ENDPOINTS.CORE)
// for Joke api
 const coreJokeHttpService = new HttpService(ENDPOINTS.JOKE_API);

// infra repository
const articleService = makeArticleService(coreHttpService);
const randomJokeService = makeJokeService(coreJokeHttpService);

// application
export const getArticles = makeGetArticles({articleService});
export const randomJoke = makeRandomJoke({randomJokeService});
