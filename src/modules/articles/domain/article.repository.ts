import {HttpResult} from "../../../shared/http/HttpResult";
import {Articles} from "./article.types";


export interface IArticleRepository{
    getArticles(): HttpResult<Articles[]>
}
