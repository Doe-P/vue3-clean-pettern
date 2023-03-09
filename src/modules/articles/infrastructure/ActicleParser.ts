import {Articles} from "../domain";
import {ParseError} from "../../../shared/parseError";
import {ok,Result} from "../../../shared/result";

export type IArticlesDTO = {
    title: string
    slug: string
    body: string
    createdAt: Date
    favorite: boolean
}


export function toDomain(dto: IArticlesDTO): Result<Articles, ParseError>{
    return ok({
        title: dto.title,
        slug: dto.slug,
        createdAt: new Date(dto.createdAt),
        body: dto.body,
        favorite: dto.favorite,
    })
}


export function fromDomain(dto: Articles):IArticlesDTO{
    return {
        title: dto.title,
        slug: dto.slug,
        createdAt:  dto.createdAt,
        body: dto.body,
        favorite: dto.favorite,
    } as IArticlesDTO
}
