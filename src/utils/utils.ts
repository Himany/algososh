import { TCircleObjects } from '../types/string'

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