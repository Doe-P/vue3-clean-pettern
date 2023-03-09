import {Joke} from "../../../modules/randomJoke/domain";

export const state = () =>({
    loading: false,
    joke: {} as Joke,
    error: null as string | null,
})

export type RootState = ReturnType<typeof state>

export default state
