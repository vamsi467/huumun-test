export interface IStatChart {
  title: string;
  items: IStatItem[];
}
export interface IStatItem {
  label?: string;
  subLabel?: string;
  value: string | number;
  icon?: string;
  color: string;
}
