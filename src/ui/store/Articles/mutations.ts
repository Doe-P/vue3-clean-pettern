import {Articles} from "../../../modules/articles/domain";
import {MutationTree} from "vuex";
import {RootState} from "./state";

export enum MutationTypes{
    GET_ARTICLES_REQUEST = 'GET_ARTICLES_REQUEST',
    GET_ARTICLES_SUCCESS = 'GET_ARTICLES_SUCCESS',
    GET_ARTICLES_ERROR = 'GET_ARTICLES_ERROR',
}

const mutations: MutationTree<RootState> = {
    [MutationTypes.GET_ARTICLES_REQUEST](state){
        state.loading = true;
        state.error = null;
    },

    [MutationTypes.GET_ARTICLES_SUCCESS](state, articles: Articles[]){
        state.loading = false;
        state.error = null;
        state.articles = articles;
    },

    [MutationTypes.GET_ARTICLES_ERROR](state, error){
        state.loading = false;
        state.error = error;
    }
}

export default mutations;
