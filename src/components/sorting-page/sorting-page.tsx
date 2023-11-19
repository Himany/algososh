import React from "react";
import styles from "./sorting-page.module.css";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { RadioInput } from "../ui/radio-input/radio-input";
import { Button } from "../ui/button/button"; 
import { Direction } from "../../types/direction";
import { Column } from "../ui/column/column";
import { randomArr, swap, delay } from "../../utils/utils";
import { ElementStates } from "../../types/element-states";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { TColumnObjects } from "../../types/sorting";

export const SortingPage: React.FC = () => {
  const [numbersArray, setNumbersArray] = React.useState<TColumnObjects[]>(randomArr().map((item) => {return({index: item, state: ElementStates.Default})}));
  const [sortingType, setSortingType] = React.useState<string>("select");
  const [sortingDirection, setSortingDirection] = React.useState<Direction>(Direction.Ascending);
  const [isLoader, setIsLoader] = React.useState(false);

  const onChangeRadio = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setSortingType(e.target.value);
  }
  const changeSorting = async (type: Direction) => {
    setSortingDirection(type);
    setIsLoader(true);
    if (sortingType === 'select') {
      await sortingArraySelect(type);
    } else {
      await sortingBubbleSelect(type);
    }
    
    setIsLoader(false);
  }
  const onClick = () => {
    setNumbersArray(randomArr().map((item) => {return({index: item, state: ElementStates.Default})}));
  }

  const sortingArraySelect = async (type: Direction) => {
    const numbersArrayCopy = [...numbersArray];
    for (let i = 0; i < numbersArray.length; i++) {
      numbersArrayCopy[i].state = ElementStates.Changing;
      let current = i;
      for (let j = i + 1; j < numbersArray.length; j++) {
        numbersArrayCopy[j].state = ElementStates.Changing;
        if (
            ((type === Direction.Descending) && (numbersArrayCopy[current].index < numbersArrayCopy[j].index)) ||
            ((type === Direction.Ascending) && (numbersArrayCopy[current].index > numbersArrayCopy[j].index))
          ) {current = j};

        setNumbersArray([...numbersArrayCopy]);
        await delay(SHORT_DELAY_IN_MS);
        numbersArrayCopy[j].state = ElementStates.Default;
        setNumbersArray([...numbersArrayCopy]);
      }
      swap<TColumnObjects>(numbersArrayCopy, i, current);

      numbersArrayCopy[current].state = ElementStates.Default;
      numbersArrayCopy[i].state = ElementStates.Modified;
      setNumbersArray([...numbersArrayCopy]);
      console.log(numbersArrayCopy);
    }
  }

  const sortingBubbleSelect = async (type: Direction) => {
    const numbersArrayCopy = [...numbersArray];
    for (let i = 0; i < numbersArray.length; i++) {
      for (let j = 0; j < numbersArray.length - i - 1; j++) {
        numbersArrayCopy[j].state = ElementStates.Changing;
        numbersArrayCopy[j + 1].state = ElementStates.Changing;
        if (
            ((type === Direction.Descending) && (numbersArrayCopy[j].index < numbersArrayCopy[j + 1].index)) ||
            ((type === Direction.Ascending) && (numbersArrayCopy[j].index > numbersArrayCopy[j + 1].index))
          ) {
            swap(numbersArrayCopy, j, j + 1);
          };

        setNumbersArray([...numbersArrayCopy]);
        await delay(SHORT_DELAY_IN_MS);
        numbersArrayCopy[j].state = ElementStates.Default;
        numbersArrayCopy[j + 1].state = ElementStates.Default;
      }
      numbersArrayCopy[numbersArray.length - i - 1].state = ElementStates.Modified;
    }
  }

  return (
    <SolutionLayout title="Сортировка массива">
      <section className={styles.mainSection}>
        <div className={styles.topContainer}>
          <div className={styles.topLeftContainer}>
            <RadioInput 
              label="Выбор"
              name="sorting"
              value="select"
              onChange={onChangeRadio}
              checked={sortingType === "select"}
            />
            <RadioInput 
              label="Пузырёк"
              name="sorting"
              value="bubble"
              onChange={onChangeRadio}
              checked={sortingType === "bubble"}
            />
          </div>
          <div className={styles.topMidContainer}>
            <Button
              text="По возрастанию"
              sorting={Direction.Ascending}
              onClick={() => {changeSorting(Direction.Ascending)}}
              isLoader={isLoader && (sortingDirection === Direction.Ascending)}
              disabled={isLoader}
            />
            <Button
              text="По убыванию"
              sorting={Direction.Descending}
              onClick={() => {changeSorting(Direction.Descending)}}
              isLoader={isLoader && (sortingDirection === Direction.Descending)}
              disabled={isLoader}
            />
          </div>
          <Button
            text="Новый массив"
            onClick={onClick}
            disabled={isLoader}
          />
        </div>
        <div className={styles.bottomContainer}>
          {numbersArray.map((item, index) => {
            return (
              <Column
                {...item}
                key={index}
              />
            );
          })
            
          }
        </div>
      </section>
    </SolutionLayout>
  );
};
