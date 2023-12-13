// usePieOrDonutChart.js
import { ref, onMounted, onUnmounted, watch, ComputedRef } from "vue";
import * as d3 from "d3";
import { IPieChart, IPoint } from "../chart.types";

export function useChart(options: ComputedRef<IPieChart>) {
  const chartContainerRef = ref(null);
  let resizeObserver: ResizeObserver;

  const drawChart = () => {
    const element = chartContainerRef.value;
    if (!element) return;
    d3.select(element).select("svg").remove();
    const margin = { top: 20, right: 20, bottom: 20, left: 20 };
    const width = chartContainerRef?.value?.clientWidth - margin.left - margin.right;
    const height = chartContainerRef?.value?.clientHeight - margin.top - margin.bottom;
    const radius = Math.min(width, height) / 2;

    const pie = d3
      .pie<IPoint>()
      .sort(null)
      .value((d) => d.value);

    const arc = d3
      .arc<d3.PieArcDatum<IPoint>>()
      .innerRadius(options.value.type === "donut" ? radius / 2 : 0)
      .outerRadius(radius);

    const labelArc = d3
      .arc<d3.PieArcDatum<IPoint>>()
      .outerRadius(radius - 40)
      .innerRadius(radius - 40);

    const svg = d3
      .select(element)
      .append("svg")
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", `translate(${width / 2}, ${height / 2})`);

    const slices = pie(options.value.data);

    svg
      .selectAll("path.slice")
      .data(slices)
      .enter()
      .append("path")
      .attr("class", "slice")
      .attr("d", arc)
      .attr("fill", (d, i) => options.value.colors[i % options.value.colors.length]);

    // Draw the slice labels
    svg
      .selectAll("text.slice-label")
      .data(slices)
      .enter()
      .append("text")
      .attr("class", "slice-label")
      .attr("transform", (d) => `translate(${labelArc.centroid(d)})`)
      .attr("dy", "0.35em")
      .attr("text-anchor", "middle")
      .text((d) => `${((d.data.value / d3.sum(options.value.data, (p) => p.value)) * 100).toFixed(2)}%`);
  };

  onMounted(() => {
    setupResizeObserver();
  });
  watch(options, () => {
    console.log(options);
    drawChart();
  });
  function setupResizeObserver() {
    resizeObserver = new ResizeObserver(() => {
      drawChart();
    });
    if (chartContainerRef.value) {
      resizeObserver.observe(chartContainerRef.value);
    }
  }
  onUnmounted(() => {
    if (resizeObserver) resizeObserver.disconnect();
  });
  return { chartContainerRef };
}
