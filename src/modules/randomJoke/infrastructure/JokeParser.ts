import {Joke} from "../domain";
import {ParseError} from "../../../shared/parseError";
import {ok, Result} from "../../../shared/result";

export type IJokeDTO = {
    id: number,
    type: string,
    setup: string,
    punchline: string,
}

export function toDomain(dto:IJokeDTO): Result<Joke, ParseError>{
    return ok({
        id: dto.id,
        type: dto.type,
        setup: dto.setup,
        punchline: dto.punchline,
    })
}

export function fromDomain(dto:Joke): IJokeDTO{
    return {
        id: dto.id,
        type: dto.type,
        setup: dto.setup,
        punchline: dto.punchline,
    }as IJokeDTO
}
