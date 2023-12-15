import HttpService, { IListParams } from "@/services/http.service";
import { ICountryPopulation } from "@/types/dashboard";
import { AxiosError } from "axios";
import { reactive } from "vue";
import { useStore } from "vuex";

interface IFetchState {
  loading: boolean;
  error: null | string;
}
interface IDashboardParams {
  year_gte: number;
  year_lte: number;
  country_name: string;
}

export const useCountryPopulation = () => {
  const api = new HttpService<ICountryPopulation>("country");
  const { dispatch } = useStore();

  const fetchState = reactive({
    loading: false,
    error: null,
  } as IFetchState);

  const fetch = async ({ year_gte, year_lte, country_name }: IDashboardParams) => {
    fetchState.loading = true;
    try {
      const params: IListParams = {
        _sort: "year",
        _order: "asc",
        year_gte,
        year_lte,
      };
      if (country_name !== "All") {
        params.country_name = country_name;
      }
      const res = await api.list(params);

      dispatch("setPopulation", res.data);

      fetchState.loading = false;
    } catch (error: any) {
      const axiosError = error as AxiosError;
      fetchState.error = axiosError.response?.data.message;
      fetchState.loading = false;
    }
  };

  return { fetch, fetchState };
};
