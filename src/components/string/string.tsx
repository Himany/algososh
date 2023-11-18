import React from "react";
import styles from "./string.module.css";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { ElementStates } from "../../types/element-states";
import { TCircleObjects } from "../../types/string";
import { swap, delay } from "../../utils/utils";
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
    const letters = reverseText.split('');
    const letterObjects: TCircleObjects[]  = [];
    letters.forEach((item) => {
      letterObjects.push({
        letter: item,
        state: ElementStates.Default
      });
    });
    setCircleLetter(letterObjects);
    for (let i = 0, j = letters.length - 1; i <= j; i++, j--) {
      letterObjects[i].state = ElementStates.Changing;
      letterObjects[j].state = ElementStates.Changing;
      setCircleLetter([...letterObjects]);
      await delay(DELAY_IN_MS);

      swap<TCircleObjects>(letterObjects, i, j);

      letterObjects[i].state = ElementStates.Modified;
      letterObjects[j].state = ElementStates.Modified;
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
