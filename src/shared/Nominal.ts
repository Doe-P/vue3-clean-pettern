
export type Nominal<Type, Token = unknown> = Type &{
    readonly __type__: Token
}