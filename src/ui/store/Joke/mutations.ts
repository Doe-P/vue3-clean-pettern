import {Joke} from "../../../modules/randomJoke/domain";
import {MutationTree} from "vuex";
import {RootState} from "./state"

export enum MutationTypes {
    RANDOM_JOKE_REQUEST = 'RANDOM_JOKE_REQUEST',
    RANDOM_JOKE_SUCCESS = 'RANDOM_JOKE_SUCCESS',
    RANDOM_JOKE_ERROR = 'RANDOM_JOKE_ERROR',
}

const mutations: MutationTree<RootState> ={
    [MutationTypes.RANDOM_JOKE_REQUEST](state){
        state.loading = true;
        state.error =null;
    },

    [MutationTypes.RANDOM_JOKE_SUCCESS](state, joke: Joke){
        state.loading = false;
        state.joke = joke;
        state.error =null;
    },
    [MutationTypes.RANDOM_JOKE_ERROR](state,  error){
        state.loading = false;
        state.error = error;
    }
}

export default mutations;
