import React from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from "./fibonacci-page.module.css";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { delay, getFibonacciNumbers } from "../../utils/utils";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";

export const FibonacciPage: React.FC = () => {
  const [fibNum, setFibNum] = React.useState(0);
  const [fibNumArray, setFibNumArray] = React.useState<number[]>([]);
  const [isLoader, setIsLoader] = React.useState(false);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setFibNum(Number(e.target.value));
  }
  const onClick = async (): Promise<void> => {
    if ((fibNum > 0) && (fibNum <= 19)) {
      setIsLoader(true);
      await fibonacciRender(fibNum);
      setIsLoader(false);
    }
  }

  const fibonacciRender = async (num: number) => {
    const nums: number[] = getFibonacciNumbers(num);
    const numsRender: number[] = [];
    for (let i = 0; i <= num; i++) {
      numsRender.push(nums[i]);
      setFibNumArray([...numsRender]);
      await delay(SHORT_DELAY_IN_MS);
    }
  }

  return (
    <SolutionLayout title="Последовательность Фибоначчи">
      <section className={styles.mainSection}>
        <div className={styles.topContainer}>
          <Input 
            max={19}
            isLimitText={true}
            onChange={onChange}
            type="number"
          />
          <Button 
            text="Рассчитать"
            onClick={onClick}
            isLoader={isLoader}
          />
        </div>
        <div className={styles.bottomContainer}>
          {fibNumArray.map((item, index) => {
              return(
                <Circle 
                  letter={String(item)}
                  index={index}
                  key={index}
                />
              )
            })
          }
        </div>
      </section>
    </SolutionLayout>
  );
};
