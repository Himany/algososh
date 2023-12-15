import { Direction } from '../types/direction';
import { TCircleObjects } from '../types/string';
import { TColumnObjects } from '../types/sorting';
import { ElementStates } from "../types/element-states";

export const swap = <T>(array: T[], firstI: number, secondI: number): void => {
  const tmp = array[firstI];
  array[firstI] = array[secondI];
  array[secondI] = tmp;
};

export const getFibonacciNumbers = (num: number): number[] => {
  const nums: number[] = [];
  for (let i = 0; i <= num; i++) {
    if (i < 2) {
      nums.push(1);
    } else {
      nums.push(nums[i - 2] + nums[i - 1]);
    }
  }
  return(nums);
};

export const delay = (ms: number) => {        
  return new Promise(resolve => setTimeout(resolve, ms));
};

export const randomArr = (min: number = 3, max: number = 17): number[] => {
  const count = Math.floor(Math.random() * (max - min)) + min;
  const numbers = [];
  for (let i = 0; i < count; i++) {
    numbers.push(Math.floor(Math.random() * 100));
  }
  return (numbers);
};

export const reverseString = (text: string) => {
  const resultArray = [];
  const textArray = text.split('');
  resultArray.push(textArray.slice());
  for (let i = 0, j = textArray.length - 1; i <= j; i++, j--) {
    const tmp = textArray;
    swap<String>(tmp, i, j);
    resultArray.push(tmp.slice());
  }
  return(resultArray);
};

export const sortingBubble = (array: TColumnObjects[], type: Direction) => {
  const numbersArrayCopy = [...array];
  const result = [];

  for (let i = 0; i < numbersArrayCopy.length; i++) {
    for (let j = 0; j < numbersArrayCopy.length - i - 1; j++) {
      numbersArrayCopy[j].state = ElementStates.Changing;
      numbersArrayCopy[j + 1].state = ElementStates.Changing;
      if (
        ((type === Direction.Descending) && (numbersArrayCopy[j].index < numbersArrayCopy[j + 1].index)) ||
        ((type === Direction.Ascending) && (numbersArrayCopy[j].index > numbersArrayCopy[j + 1].index))
      ) {
        swap(numbersArrayCopy, j, j + 1);
      };

      result.push(numbersArrayCopy.map(item => ({...item})));
      numbersArrayCopy[j].state = ElementStates.Default;
      numbersArrayCopy[j + 1].state = ElementStates.Default;
    }
    numbersArrayCopy[numbersArrayCopy.length - i - 1].state = ElementStates.Modified;
  }

  if (numbersArrayCopy.length > 0) {result.push(numbersArrayCopy.map(item => ({...item, state: ElementStates.Modified})));}
  return(result);
}

export const sortingSelect = (array: TColumnObjects[], type: Direction) => {
  const numbersArrayCopy = [...array];
  const result = [];

  for (let i = 0; i < numbersArrayCopy.length; i++) {
    numbersArrayCopy[i].state = ElementStates.Changing;
    let current = i;
    for (let j = i + 1; j < numbersArrayCopy.length; j++) {
      numbersArrayCopy[j].state = ElementStates.Changing;
      if (
        ((type === Direction.Descending) && (numbersArrayCopy[current].index < numbersArrayCopy[j].index)) ||
        ((type === Direction.Ascending) && (numbersArrayCopy[current].index > numbersArrayCopy[j].index))
      ) {current = j};

      result.push(numbersArrayCopy.map(item => ({...item})));
      numbersArrayCopy[j].state = ElementStates.Default;
    }
    swap<TColumnObjects>(numbersArrayCopy, i, current);

    numbersArrayCopy[current].state = ElementStates.Default;
    numbersArrayCopy[i].state = ElementStates.Modified;
    result.push(numbersArrayCopy.map(item => ({...item})));
  }

  return(result);
}