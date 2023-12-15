import { ActionTree } from "vuex";
import { IState } from "./state";

export const actions: ActionTree<IState, any> = {
  setPopulation: ({ commit }, data) => {
    commit("SET_POPULATION", data);
  },
};
