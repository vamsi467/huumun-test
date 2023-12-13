import { ICountryPopulation } from "@/types/dashboard";

export interface IState {
  population: ICountryPopulation[];
}

export const state: IState = {
  population: [],
};
