import {Joke, IJokeRepository} from "../domain";
import {HttpError, isHttpError} from "../../../shared/http/HttpError";
import {HttpStatusCode} from "../../../shared/http/HttpStatusCode";

type Service = {
    randomJokeService: IJokeRepository,
}

type Parameters = null;
type Callbacks = {
    onSuccess: (joke: Joke) => void,
    onClientError: (e: HttpError) => void
    onServerError: (e: HttpError) => void
}

export function randomJoke({randomJokeService}: Service ): AsyncUseCase<Parameters, Callbacks>{
    return {execute}

    async function execute(_: Parameters, {onSuccess, onClientError, onServerError}: Callbacks){
        const result = await randomJokeService.randomJoke();
        result.map((joke) => {
            const myJoke: Joke = joke;
            onSuccess(myJoke);
        }).mapErr((err) => {
            if(isHttpError(err)){
                if(err.isClientError()){
                    onClientError(err);
                    return;
                }
                onServerError(err);
            }

            if(isHttpError(err)){
                switch (err.status) {
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

        result.fold((item) => console.log(item), (err) => console.error(err))
    }
}
