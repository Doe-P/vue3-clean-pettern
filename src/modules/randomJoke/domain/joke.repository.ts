import {HttpResult} from "../../../shared/http/HttpResult";
import {Joke} from "./joke.types";

export interface IJokeRepository {
    randomJoke(): HttpResult<Joke>
}
