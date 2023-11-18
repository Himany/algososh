import React from "react";
import styles from "./queue-page.module.css"
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Queue } from "./queue";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { ElementStates } from "../../types/element-states";
import { TQueueCircleObjects } from "../../types/queue";
import { delay } from "../../utils/utils";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";

export const QueuePage: React.FC = () => {
  const queueeSize = 6;
  const [queue, setQueue] = React.useState(new Queue<string>(queueeSize));
  const [queueData, setQueueData] = React.useState<TQueueCircleObjects[]>(Array(queueeSize).fill(null).map((item, index, array) => {return({letter: item, state: ElementStates.Default})}));
  const [inputText, setInputText] = React.useState('');

  const onChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setInputText(e.target.value);
  }

  const push = async () => {
    const array = queue.getElements().map((item, index, array) => {return({letter: item, state: ElementStates.Default})});

    array[queue.getTail()].state = ElementStates.Changing;
    setQueueData([...array]);
    await delay(SHORT_DELAY_IN_MS);
    
    queue.enqueue(inputText);
    setInputText('');
    setQueueData([...queue.getElements().map((item, index, array) => {return({letter: item, state: ElementStates.Default})})]);
  };

  const pop = async () => {
    const array = queue.getElements().map((item, index, array) => {return({letter: item, state: ElementStates.Default})});
    
    array[queue.getHead()].state = ElementStates.Changing;
    setQueueData([...array]);
    await delay(SHORT_DELAY_IN_MS);
    
    queue.dequeue();
    setQueueData([...queue.getElements().map((item, index, array) => {return({letter: item, state: ElementStates.Default})})]);
  };

  const clear = () => {
    queue.clear();
    setQueueData([...queue.getElements().map((item, index, array) => {return({letter: item, state: ElementStates.Default})})]);
  };

  return (
    <SolutionLayout title="Очередь">
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
            disabled={(queue.isEmpty())}
          />
          <Button 
            text="Очистить"
            onClick={clear}
            extraClass={styles.buttonLeft}
            disabled={(queue.isEmpty())}
          />
        </div>
        <div className={styles.bottomContainer}>
          {
            queueData.map((item, index, array) => {
              return(
                <Circle
                  {...item}
                  index={index}
                  letter={item.letter ? item.letter : ""}
                  head={((index === queue.getHead()) && !(queue.isEmpty())) ? "head" : ""}
                  tail={((index === queue.getLastElementIndex()) && !(queue.isEmpty())) ? "tail" : ""}
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
