import {ActionTree} from "vuex";
import {RootState} from "./state"
import {MutationTypes} from "./mutations"
import {randomJoke} from "../../../container";

export enum ActionTypes {
    randomJoke = "randomJoke",
}

const actions: ActionTree<RootState, RootState> ={
    async [ActionTypes.randomJoke]({commit}){
        commit(MutationTypes.RANDOM_JOKE_REQUEST);

        await sleep(2000);

        await randomJoke.execute(null, {
            onSuccess: (joke) => {
                commit(MutationTypes.RANDOM_JOKE_SUCCESS, joke);
            },
            onClientError: (error) => {
                commit(MutationTypes.RANDOM_JOKE_ERROR, error);
            },
            onServerError: (error) => {
                commit(MutationTypes.RANDOM_JOKE_ERROR, error);
            }
        });

        function sleep(ms: number) {
            return new Promise((resolve) => setTimeout(resolve, ms));
        }
    }
}


export default actions;
