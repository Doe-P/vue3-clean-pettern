import {Articles, IArticleRepository} from "../domain";
import {combine} from "../../../shared/result";
import {HttpResult} from "../../../shared/http/HttpResult";
import {IHttpService} from "../../../shared/http/HttpService";
import * as ArticleDTO from './ActicleParser'


export function ArticleService(httpService: IHttpService): IArticleRepository{
    return {
        getArticles,
    }

    async function getArticles(): HttpResult<Articles[]> {
        function parseTo(articlesDTO: ArticleDTO.IArticlesDTO[]){
            const objOfJokeResult =  articlesDTO.map(ArticleDTO.toDomain)
            return combine(objOfJokeResult)
        }

        return await httpService.get<ArticleDTO.IArticlesDTO[], Articles[]>(
            {url: '/posts'},
            {parseTo}
        );
    }
}

