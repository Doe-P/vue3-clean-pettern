import {ActionTree} from "vuex";
import {getArticles} from "../../../container";
import {RootState} from "./state";
import {MutationTypes} from "./mutations";

export enum ActionTypes {
    getArticles = 'getArticles',
}

const actions: ActionTree<RootState, RootState> = {
    async [ActionTypes.getArticles]({commit}){
        commit(MutationTypes.GET_ARTICLES_REQUEST);

        await sleep(2000);

        await getArticles.execute(null, {
           onSuccess: (articles) => {
               commit(MutationTypes.GET_ARTICLES_SUCCESS, articles);
           },
            onClientError: (error) => {
               commit(MutationTypes.GET_ARTICLES_ERROR, `oops I fucked up with a ${error.status} error!: ${error.message}`)
            },
            onServerError: (error) => {
                commit(
                    MutationTypes.GET_ARTICLES_ERROR,
                    `heheeh it is on them ${error.name}`
                )
            }
        })

        function sleep(ms: number) {
            return new Promise((resolve) => setTimeout(resolve, ms));
        }
    }
}

export default actions;
