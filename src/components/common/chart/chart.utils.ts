import { ref, watch, onMounted, onUnmounted, reactive, Ref, computed, ComputedRef } from "vue";
import * as d3 from "d3";
import { IChart, ISeries, ILegend, IScale, IScalesMap, IAxis, IPoint } from "./chart.types";

function useLegend(legendOptions: ILegend, seriesRef: Ref<ISeries[]>) {
  const legendItems = ref([]);

  watch(
    seriesRef,
    (newSeries) => {
      updateLegend(newSeries);
    },
    { immediate: true },
  );

  function updateLegend(series: ISeries[]) {
    legendItems.value = series.map((s) => ({
      name: s.name,
      color: s.color || "black",
    }));
  }

  return { legendItems };
}

function useTooltip() {
  const isVisible = ref(false);
  const tooltipContent = reactive({ title: "", value: 0 });
  const tooltipPosition = reactive({ x: 0, y: 0 });

  function showTooltip(title: string | number | Date, value: number, x: number, y: number) {
    console.log("here");
    if (typeof title === "string") {
      tooltipContent.title = title;
    } else if (typeof title === "number") {
      tooltipContent.title = title.toString();
    } else {
      tooltipContent.title = title.toLocaleString();
    }
    tooltipContent.value = value;
    tooltipPosition.x = x;
    tooltipPosition.y = y;
    isVisible.value = true;
  }

  function hideTooltip() {
    isVisible.value = false;
  }

  return { isVisible, tooltipContent, tooltipPosition, showTooltip, hideTooltip };
}

function drawLineSeries(
  series: ISeries,
  g: d3.Selection<SVGGElement, unknown, null, undefined>,
  xScale: IScale,
  yScale: IScale,
  showTooltip: (title: string | number | Date, value: number, x: number, y: number) => void,
  hideTooltip: () => void,
) {
  const line = d3
    .line<IPoint>()
    .defined((d) => d.value !== undefined && d.name !== undefined)
    .x((d) => {
      const xValue = typeof d.name === "string" ? new Date(d.name) : d.name.toString();

      return xScale(xValue as any) ?? 0;
    })
    .y((d) => {
      return yScale(d.value as any) ?? 0;
    });

  const lineGroup = g.append("g").attr("class", "line-chart-group");
  lineGroup
    .append("path")
    .datum(series.data)
    .attr("class", "line")
    .attr("d", line)
    .attr("stroke", series.color);

  // Add circles for points and tooltip interactions
  lineGroup
    .selectAll(".dot")
    .data(series.data)
    .enter()
    .append("circle")
    .attr("class", "dot")
    .attr("cx", (d) => {
      const xValue = typeof d.name === "string" ? new Date(d.name) : d.name.toString();
      return xScale(xValue as any) ?? 0;
    })
    .attr("cy", (d) => yScale(d.value as any) ?? 0)
    .attr("r", 5)
    .on("mouseover", (event, d) => {
      const title = d.name instanceof Date ? d.name.toLocaleDateString() : d.name.toString();
      showTooltip(title, d.value, event.pageX, event.pageY);
    })
    .on("mouseout", hideTooltip);
}

function drawBarSeries(
  series: ISeries,
  g: d3.Selection<SVGGElement, unknown, null, undefined>,
  xScale: IScale, // Typically ScaleBand for bar charts
  yScale: IScale, // Typically ScaleLinear for bar charts
  showTooltip: (title: string | number | Date, value: number, x: number, y: number) => void,
  hideTooltip: () => void,
) {
  g.append("g")
    .attr("class", "bar-chart-group")
    .selectAll(".bar")
    .data(series.data)
    .enter()
    .append("rect")
    .attr("class", "bar")
    .attr("x", (d) => xScale(d.name.toString() as any) ?? 0)
    .attr("y", (d) => yScale(d.value as any) ?? 12)
    .attr("width", 24)
    .attr("height", (d) => yScale.range()[0] - (yScale(d.value as any) ?? 0))
    .attr("fill", series.color)
    .on("mouseover", (event, d) => {
      const title = d.name instanceof Date ? d.name.toLocaleDateString() : d.name.toString();
      showTooltip(title, d.value, event.pageX, event.pageY);
    })
    .on("mouseout", hideTooltip);
}

function drawAreaSeries(
  series: ISeries,
  g: d3.Selection<SVGGElement, unknown, null, undefined>,
  xScale: IScale, // Typically ScaleTime or ScaleLinear for area charts
  yScale: IScale, // Typically ScaleLinear for area charts
  showTooltip: (title: string | number | Date, value: number, x: number, y: number) => void,
  hideTooltip: () => void,
  height: number,
) {
  const area = d3
    .area<IPoint>()
    .defined((d) => d.value !== undefined && d.name !== undefined)
    .x((d) => {
      const xValue = typeof d.name === "string" ? new Date(d.name) : d.name.toString();
      return xScale(xValue as any) ?? 0;
    })
    .y0(() => height)
    .y1((d) => yScale(d.value as any) ?? 0);

  const areaGroup = g.append("g").attr("class", "area-chart-group");

  areaGroup
    .append("path")
    .datum(series.data)
    .attr("class", "area")
    .attr("d", area)
    .attr("fill", series.color)
    .attr("fill-opacity", 0.2)
    .attr("stroke", series.color);

  areaGroup
    .selectAll(".dot")
    .data(series.data)
    .enter()
    .append("circle")
    .attr("class", "dot")
    .attr("cx", (d) => {
      const xValue = typeof d.name === "string" ? new Date(d.name) : d.name.toString();
      return xScale(xValue as any) ?? 0;
    })
    .attr("cy", (d) => yScale(d.value as any) ?? 0)
    .attr("r", 5)
    .on("mouseover", (event, d) => {
      const title = d.name instanceof Date ? d.name.toLocaleDateString() : d.name.toString();
      showTooltip(title, d.value, event.pageX, event.pageY);
    })
    .on("mouseout", hideTooltip);
}

function drawLegend(legendItems: never[], svgElement: SVGSVGElement, width: number) {
  const legend = svgElement
    .selectAll(".legend")
    .data(legendItems)
    .enter()
    .append("g")
    .attr("class", "legend")
    .attr("transform", (d, i) => `translate(0, ${i * 20})`);

  legend
    .append("rect")
    .attr("x", width - 18)
    .attr("width", 18)
    .attr("height", 18)
    .style("fill", (d) => d.color);

  legend
    .append("text")
    .attr("x", width - 24)
    .attr("y", 9)
    .attr("dy", ".35em")
    .style("text-anchor", "end")
    .text((d) => d.name);
}

function createDateScale(axis: IAxis, series: ISeries[], width: number): d3.ScaleTime<number, number> {
  const seriesData = series.find((s) => s.xAxisName === axis.name)?.data || [];
  const dates = seriesData.map((d) => new Date(d.name));
  const domain = d3.extent(dates) as [Date, Date];

  return d3.scaleTime().domain(domain).range([0, width]);
}

function createValueScale(axis: IAxis, series: ISeries[], height: number): d3.ScaleLinear<number, number> {
  const seriesData = series.find((s) => s.yAxisName === axis.name)?.data || [];
  const domain = [0, d3.max(seriesData, (d) => d.value) || 0];

  return d3.scaleLinear().domain(domain).range([height, 0]);
}
function createCategoryScale(axis: IAxis, series: ISeries[], width: number): d3.ScalePoint<string> {
  const seriesData = series.find((s) => s.xAxisName === axis.name)?.data || [];
  const categories = seriesData.map((d) => d.name.toString());

  return d3.scalePoint().domain(categories).range([0, width]).padding(0.1);
}

function createScales(
  chartOptions: IChart,
  width: number,
  height: number,
): {
  xScales: IScalesMap;
  yScales: IScalesMap;
} {
  const xScales = new Map<string, IScale>();
  const yScales = new Map<string, IScale>();

  chartOptions.xAxis.forEach((axis) => {
    let scale: IScale;
    switch (axis.type) {
      case "date":
        scale = createDateScale(axis, chartOptions.series, width);
        break;
      case "value":
        scale = createValueScale(axis, chartOptions.series, width);
        break;
      case "category":
        scale = createCategoryScale(axis, chartOptions.series, width);
        break;
    }
    xScales.set(axis.name, scale);
  });

  chartOptions.yAxis.forEach((axis) => {
    let scale: IScale;
    switch (axis.type) {
      case "date":
        scale = createDateScale(axis, chartOptions.series, height);
        break;
      case "value":
        scale = createValueScale(axis, chartOptions.series, height);
        break;
      case "category":
        scale = createCategoryScale(axis, chartOptions.series, height);
        break;
    }
    yScales.set(axis.name, scale);
  });

  return { xScales, yScales };
}

function renderAxes(
  g: d3.Selection<SVGGElement, unknown, null, undefined>,
  xScales: IScalesMap,
  yScales: IScalesMap,
  height: number,
) {
  // Render X axes
  xScales.forEach((scale, name) => {
    if ("bandwidth" in scale) {
      g.append("g")
        .attr("transform", `translate(0,${height})`)
        .call(d3.axisBottom(scale as d3.ScaleBand<string>));
    } else {
      g.append("g")
        .attr("transform", `translate(0,${height})`)
        .call(d3.axisBottom(scale as d3.AxisScale<number>));
    }
  });

  // Render Y axes
  yScales.forEach((scale, name) => {
    if ("bandwidth" in scale) {
      g.append("g")
        .attr("transform", `translate(0,${0})`)
        .call(d3.axisLeft(scale as d3.ScaleBand<string>));
    } else {
      g.append("g")
        .attr("transform", `translate(0,${0})`)
        .call(d3.axisLeft(scale as d3.AxisScale<number>).ticks(10, "s"));
    }
  });
}

export function useChart(options: ComputedRef<IChart>, chartContainerRef: Ref<null | HTMLElement>) {
  const svg = ref<SVGSVGElement | null>(null);
  let resizeObserver: ResizeObserver;

  const { showTooltip, hideTooltip, isVisible, tooltipContent, tooltipPosition } = useTooltip();
  const { legendItems } = useLegend(options.value.legend, ref(options.value.series));
  onMounted(() => {
    console.log(options);
    createChart();
    updateChart();
    setupResizeObserver();
  });

  onUnmounted(() => {
    if (resizeObserver) resizeObserver.disconnect();
  });

  watch(options, () => {
    console.log(options);
    updateChart();
  });

  function setupResizeObserver() {
    resizeObserver = new ResizeObserver(() => {
      updateChart();
    });
    if (chartContainerRef.value) {
      resizeObserver.observe(chartContainerRef.value);
    }
  }

  function createChart() {
    if (!chartContainerRef.value) return;

    svg.value = d3
      .select(chartContainerRef.value)
      .append("svg")
      .attr("width", chartContainerRef.value.clientWidth)
      .attr("height", chartContainerRef.value.clientHeight);
  }

  function updateChart() {
    if (!svg.value) return;
    if (!chartContainerRef.value) return;

    svg.value.selectAll("*").remove(); // Clear previous chart

    const margin = { top: 20, right: 20, bottom: 30, left: 50 };
    const width = chartContainerRef.value.clientWidth - margin.left - margin.right;
    const height = chartContainerRef.value.clientHeight - margin.top - margin.bottom;

    const g = svg.value.append("g").attr("transform", `translate(${margin.left},${margin.top})`);

    const { xScales, yScales } = createScales(options.value, width, height);
    options.value.series.forEach((series: ISeries) => {
      const xScale = xScales.get(series.xAxisName);
      const yScale = yScales.get(series.yAxisName);

      if (!xScale || !yScale) {
        return;
      }

      switch (series.type) {
        case "line":
          drawLineSeries(series, g, xScale, yScale, showTooltip, hideTooltip);
          break;
        case "bar":
          drawBarSeries(series, g, xScale, yScale, showTooltip, hideTooltip);
          break;
        case "area":
          drawAreaSeries(series, g, xScale, yScale, showTooltip, hideTooltip, height);
          break;
      }
    });

    renderAxes(g, xScales, yScales, height);
    // drawLegend(legendItems.value, svg.value, width);
  }

  return { isVisible, tooltipContent, tooltipPosition };
}
