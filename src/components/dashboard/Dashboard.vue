<template>
  <section class="page">
    <div>
      <ChartLayout
        title="Total Population through the decade"
        :sub-title="lastYear"
        :active-type="totalPopulationChartType"
        @change="changeTotalPopulationChartType"
      >
        <Chart :options="totalChartOptions"></Chart>
      </ChartLayout>
      <ChartLayout
        title="Total Male Female Population through the decade"
        :sub-title="lastYear"
        :active-type="totalPopulationMaleFemaleChartType"
        @change="changeTotalPopulationMaleFemaleChartType"
      >
        <Chart :options="maleFemaleChartOptions"></Chart>
      </ChartLayout>
    </div>
    <div>
      <StatChart :options="totalStatChartOptions"></StatChart>
      <StatChart :options="maleFemaleStatChartOptions"></StatChart>
    </div>
  </section>
</template>

<script setup lang="ts">
  import { computed, ref } from "vue";
  import { useStore } from "vuex";
  import Chart from "../common/chart/Chart.vue";
  import ChartLayout from "../common/chart-layout/ChartLayout.vue";
  import StatChart from "../common/stat-chart/StatChart.vue";
  import { IChart, IPoint } from "../common/chart/chart.types";
  import { IStatChart } from "../common/stat-chart/StatChart.types";

  const store = useStore();
  const totalPopulationChartType = ref("area");
  const totalPopulationMaleFemaleChartType = ref("bar");
  const changeTotalPopulationChartType = (event: string) => {
    totalPopulationChartType.value = event;
  };
  const changeTotalPopulationMaleFemaleChartType = (event: string) => {
    totalPopulationMaleFemaleChartType.value = event;
  };

  const data = computed<{ [key: string]: IPoint[] | number }>(() => store.getters["worldPopulation"]);
  const lastYear = computed(() => (data.value?.lastYear || "").toString());
  const totalChartOptions = computed<IChart>(
    () =>
      ({
        title: {
          text: "World Population",
          position: "top",
        },
        xAxis: [{ type: "category", name: "x", label: "Year" }],
        yAxis: [{ type: "value", name: "y", label: "Population" }],
        series: [
          {
            data: data.value.total,
            type: totalPopulationChartType.value,
            xAxisName: "x",
            yAxisName: "y",
            color: "#33afdf",
          },
        ],
        legend: {
          position: "bottom",
          shape: "disc",
        },
      } as IChart),
  );
  const maleFemaleChartOptions = computed<IChart>(
    () =>
      ({
        title: {
          text: "World Population",
          position: "top",
        },
        xAxis: [{ type: "category", name: "x", label: "Year" }],
        yAxis: [{ type: "value", name: "y", label: "Population" }],
        series: [
          {
            data: data.value.female,
            type: totalPopulationMaleFemaleChartType.value,
            xAxisName: "x",
            yAxisName: "y",
            color: "#DF0404",
          },
          {
            data: data.value.male,
            type: totalPopulationMaleFemaleChartType.value,
            xAxisName: "x",
            yAxisName: "y",
            color: "#079B54",
          },
        ],
        legend: {
          position: "bottom",
          shape: "disc",
        },
      } as IChart),
  );
  const totalStatChartOptions = computed<IStatChart>(() => ({
    title: "Total world population end of the " + data.value.lastYear,
    items: [
      {
        value: new Intl.NumberFormat("en-IN", { maximumSignificantDigits: 3 }).format(
          data.value.lastYearTotal as number,
        ),

        color: "#000000",
      },
    ],
  }));
  const maleFemaleStatChartOptions = computed<IStatChart>(() => ({
    title: "FEMALE / MALE RATIOS",
    items: [
      {
        label: "MEN",
        value: new Intl.NumberFormat("en-IN", { notation: "compact" }).format(
          data.value.lastYearMaleTotal as number,
        ),
        icon: "fa-solid fa-person",
        color: "#33afdf",
      },
      {
        label: "WOMEN",
        value: new Intl.NumberFormat("en-IN", { notation: "compact" }).format(
          data.value.lastYearFemaleTotal as number,
        ),
        icon: "fa-solid fa-person-dress",
        color: "#DF0404",
      },
    ],
  }));
</script>

<style lang="scss" scoped>
  .page {
    & > * {
      width: 100%;
      display: flex;
      justify-content: space-between;
    }
  }
</style>
