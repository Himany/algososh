import { ElementStates } from "./element-states";

export type TListCircleObjects = {
  letter: number | string;
  state: ElementStates;
  headElement: number | string | null;
  tailElement: number | string | null;
}