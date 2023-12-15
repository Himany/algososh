import { sortingBubble } from "../utils/utils";
import { Direction } from '../types/direction';
import { ElementStates } from "../types/element-states";

describe('Sorting bubble array', () => {
  it('пустой массив', () => {
    const result = sortingBubble([], Direction.Ascending);
    expect(result).toEqual([]);
  }); 
  it('Массив из одного элемента', () => {
    const result = sortingBubble([{index: 1, state: ElementStates.Default}], Direction.Ascending);
    expect(result[result.length - 1]).toEqual([{index: 1, state: ElementStates.Modified}]);
  }); 
  it('Массив из нескольких элементов', () => {
    const result = sortingBubble([{index: 2, state: ElementStates.Default},{index: 3, state: ElementStates.Default},{index: 1, state: ElementStates.Default}], Direction.Ascending);
    expect(result[result.length - 1]).toEqual([{index: 1, state: ElementStates.Modified},{index: 2, state: ElementStates.Modified},{index: 3, state: ElementStates.Modified}]);
  }); 
});