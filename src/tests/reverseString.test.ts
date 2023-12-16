import { reverseString } from "../utils/utils";

describe('Reverse string', () => {
  it('Чётное количество символов', () => {
    const result = reverseString("1234");
    expect(result[result.length - 1]).toEqual(['4','3','2','1']);
  }); 
  it('Нечётное количество символов', () => {
    const result = reverseString("123");
    expect(result[result.length - 1]).toEqual(['3','2','1']);
  }); 
  it('Нечётное количество символов', () => {
    const result = reverseString("1");
    expect(result[result.length - 1]).toEqual(['1']);
  }); 
  it('Нечётное количество символов', () => {
    const result = reverseString("");
    expect(result[result.length - 1]).toEqual([]);
  }); 
});