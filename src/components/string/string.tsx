import React from "react";
import styles from "./string.module.css";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { ElementStates } from "../../types/element-states";
import { TCircleObjects } from "../../types/string";
import { swap, delay, reverseString } from "../../utils/utils";
import { DELAY_IN_MS } from "../../constants/delays";

export const StringComponent: React.FC = () => {
  const [reverseText, setReverseText] = React.useState('');
  const [circleLetter, setCircleLetter] = React.useState<TCircleObjects[]>([]);
  const [isLoader, setIsLoader] = React.useState(false);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setReverseText(e.target.value);
  }
  const onClick = async (): Promise<void> => {
    setIsLoader(true);
    await reverseTextAction(reverseText);
    setIsLoader(false);
  }

  const reverseTextAction = async (text: string) => {
    const result = reverseString(text);
    console.log(result);

    for (let min = 0; min < result.length; min++) {
      const current = result[min];
      const max = (text.length - 1) - min;
      let letterObjects: TCircleObjects[]  = [];

      current.forEach((item, index) => {
        letterObjects.push({
          letter: item,
          state: (index < min || index > max) ? ElementStates.Modified : ((index === min || index === max) ? ElementStates.Changing : (ElementStates.Default))
        });
      });
      setCircleLetter(letterObjects);
      await delay(DELAY_IN_MS);

      swap<TCircleObjects>(letterObjects, min, max);
      letterObjects[min].state = ElementStates.Modified;
      letterObjects[max].state = ElementStates.Modified;
      setCircleLetter([...letterObjects]);
      await delay(DELAY_IN_MS);
    }
  };

  return (
    <SolutionLayout title="Строка">
      <section className={styles.mainSection}>
        <div className={styles.topContainer}>
          <Input 
            maxLength={11}
            isLimitText={true}
            onChange={onChange}
            value={reverseText}
          />
          <Button 
            text="Развернуть"
            onClick={onClick}
            isLoader={isLoader}
            disabled={isLoader || reverseText === ''}
          />
        </div>
        <div className={styles.bottomContainer}>
          {circleLetter.map((item, index) => {
              return(
                <Circle 
                  {...item}
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
