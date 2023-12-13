import { MutationTree } from "vuex";
import { IState } from "./state";

export const mutations: MutationTree<IState> = {
  SET_POPULATION: (state, data) => {
    state.population = data;
  },
};
