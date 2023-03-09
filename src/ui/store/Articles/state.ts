import {Articles} from "../../../modules/articles/domain";

export const state = () => ({
    loading: false,
    articles: [] as Articles[],
    error: null as string | null,
})

export type RootState = ReturnType<typeof state>

export default state
