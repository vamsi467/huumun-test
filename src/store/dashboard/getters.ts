import { GetterTree } from "vuex";
import { IState } from "./state";
import { IPoint } from "@/components/common/chart/chart.types";

export const getters: GetterTree<IState, any> = {
  worldPopulation: (state) => {
    const worldPopulationDataMap = {} as { [key: string]: IPoint };
    const worldMalePopulationDataMap = {} as { [key: string]: IPoint };
    const worldFemalePopulationDataMap = {} as { [key: string]: IPoint };
    state.population.forEach((ele) => {
      const yearString = ele.year.toString();
      if (worldPopulationDataMap[yearString]) {
        worldPopulationDataMap[yearString].value = worldPopulationDataMap[yearString].value + ele.total;
      } else {
        worldPopulationDataMap[yearString] = { value: ele.total, name: ele.year };
      }

      if (worldMalePopulationDataMap[yearString]) {
        worldMalePopulationDataMap[yearString].value =
          worldMalePopulationDataMap[yearString].value + ele.male_total;
      } else {
        worldMalePopulationDataMap[yearString] = { value: ele.male_total, name: ele.year };
      }

      if (worldFemalePopulationDataMap[yearString]) {
        worldFemalePopulationDataMap[yearString].value =
          worldFemalePopulationDataMap[yearString].value + ele.female_total;
      } else {
        worldFemalePopulationDataMap[yearString] = { value: ele.female_total, name: ele.year };
      }
    });

    console.log(worldPopulationDataMap, worldMalePopulationDataMap, worldFemalePopulationDataMap);
    const lastYear = Object.keys(worldPopulationDataMap).pop()!;

    return {
      total: Object.values(worldPopulationDataMap),
      male: Object.values(worldMalePopulationDataMap),
      female: Object.values(worldFemalePopulationDataMap),
      lastYear,
      lastYearTotal: worldPopulationDataMap[lastYear]?.value,
      lastYearMaleTotal: worldMalePopulationDataMap[lastYear]?.value,
      lastYearFemaleTotal: worldFemalePopulationDataMap[lastYear]?.value,
    };
  },
};
