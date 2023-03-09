import {IJokeRepository, Joke} from "../domain";
import {HttpResult} from "../../../shared/http/HttpResult";
import {IHttpService} from "../../../shared/http/HttpService";
import * as JokeDTO from "./JokeParser"

export function JokeService(httpService: IHttpService): IJokeRepository {
    return {
        randomJoke,
    }

    async function randomJoke(): HttpResult<Joke> {
        return await httpService.get<JokeDTO.IJokeDTO, Joke>({url: '/random_joke'}, {parseTo: (joke: JokeDTO.IJokeDTO) => JokeDTO.toDomain(joke)});
    }
}
