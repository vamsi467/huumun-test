// types.ts
export interface IChart {
  title: ITitle;
  xAxis: IAxis[];
  yAxis: IAxis[];
  series: ISeries[];
  legend: ILegend;
}

export interface ITitle {
  text: string;
  position: "top" | "bottom";
}

export interface IAxis {
  type: "category" | "value" | "date";
  name: string;
  label: string;
}

export interface ISeries {
  data: IPoint[];
  type: "area" | "line" | "bar";
  color: string;
  xAxisName: string;
  yAxisName: string;
}

export interface IPoint {
  name: string | number | Date;
  value: number;
}

export interface ILegend {
  shape: "disc" | "square" | "round";
  position: "top" | "left" | "right" | "bottom";
}

export type IScale = d3.ScaleLinear<number, number> | d3.ScalePoint<string> | d3.ScaleTime<number, number>;
export type IScalesMap = Map<string, IScale>;
