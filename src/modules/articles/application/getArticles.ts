import {Articles, IArticleRepository} from "../domain";
import {HttpError, isHttpError} from "../../../shared/http/HttpError";
import {HttpStatusCode} from "../../../shared/http/HttpStatusCode";

type Services = {
    articleService: IArticleRepository
}


type Parameters = null;
type Callbacks = {
    onSuccess: (articles: Articles[]) => void
    onClientError: (e: HttpError) => void
    onServerError: (e: HttpError) => void
};

export function getArticles({articleService}: Services): AsyncUseCase<Parameters, Callbacks> {
    return {execute}

    async function execute(_: Parameters, {onSuccess, onClientError, onServerError}: Callbacks) {
        const result = await articleService.getArticles();

        result.map(item => {
            const articles: Articles[] = item;
            onSuccess(articles);
        }).mapErr((error) => {
            if (isHttpError(error)) {
                if (error.isClientError()) {
                    onClientError(error);
                    return;
                }
                onServerError(error);
            }

            if (isHttpError(error)) {
                switch (error.status) {
                    case HttpStatusCode.BAD_REQUEST:
                        console.warn('BadRequestError!')
                        break
                    case HttpStatusCode.UNAUTHORIZED:
                        console.warn('UnauthorizedError!')
                        break
                    case HttpStatusCode.NOT_FOUND:
                        console.warn('NotFoundError!')
                        break
                    case HttpStatusCode.INTERNAL_SERVER_ERROR:
                        console.warn('ServerError!')
                        break
                    default:
                        console.warn('yoquese')
                }
            }
        })

        result.fold((item) => console.log(item), (error) => console.warn(error))
    }
}
