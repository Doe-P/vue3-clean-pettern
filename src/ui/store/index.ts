import {createStore} from "vuex";
import Articles from "./Articles"
import Joke from "./Joke"

const store = createStore({
    modules: {
        Articles: Articles,
        Joke: Joke,
    }
})

export default store;
