import React from "react";
import styles from "./stack-page.module.css"
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { ElementStates } from "../../types/element-states";
import { TCircleObjects } from "../../types/string";
import { delay } from "../../utils/utils";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { Stack } from "./stack";


export const StackPage: React.FC = () => {
  const [stack, setStack] = React.useState(new Stack<string>());
  const [stackData, setStackData] = React.useState<TCircleObjects[]>([]);
  const [inputText, setInputText] = React.useState('');

  const onChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setInputText(e.target.value);
  }

  const push = async () => {
    stack.push(inputText);
    setInputText('');

    const array = stack.getElements().map((item, index, array) => {return({letter: item, state: ElementStates.Default})});
    
    array[array.length - 1].state = ElementStates.Changing;
    setStackData([...array]);
    await delay(SHORT_DELAY_IN_MS);
    array[array.length - 1].state = ElementStates.Default;
    setStackData([...array]);
  };

  const pop = async () => {
    const array = stack.getElements().map((item, index, array) => {return({letter: item, state: ElementStates.Default})});
    
    array[array.length - 1].state = ElementStates.Changing;
    setStackData([...array]);
    await delay(SHORT_DELAY_IN_MS);

    stack.pop();
    setStackData(stack.getElements().map((item, index, array) => {return({letter: item, state: ElementStates.Default})}))
  };

  const clear = () => {
    stack.clear();
    setStackData(stack.getElements().map((item, index, array) => {return({letter: item, state: ElementStates.Default})}))
  };

  return (
    <SolutionLayout title="Стек">
      <section className={styles.mainSection}>
        <div className={styles.topContainer}>
          <Input 
            maxLength={4}
            isLimitText={true}
            value={inputText}
            onChange={onChange}
          />
          <Button 
            text="Добавить"
            onClick={push}
            disabled={!(inputText.length > 0)}
          />
          <Button 
            text="Удалить"
            onClick={pop}
            disabled={!(stack.getSize() > 0)}
          />
          <Button 
            text="Очистить"
            onClick={clear}
            extraClass={styles.buttonLeft}
            disabled={!(stack.getSize() > 0)}
          />
        </div>
        <div className={styles.bottomContainer}>
          {
            stackData.map((item, index, array) => {
              return(
                <Circle
                  {...item}
                  head={(index === array.length - 1) ? "top" : ""}
                  tail={`${index}`}
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
