import React from "react";
import styles from "./list-page.module.css"
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { ElementStates } from "../../types/element-states";
import { randomArr, delay } from "../../utils/utils";
import { DELAY_IN_MS } from "../../constants/delays";
import { LinkedList } from "./list";
import { ArrowIcon } from "../ui/icons/arrow-icon";
import { TListCircleObjects } from "../../types/list";

export const ListPage: React.FC = () => {
  const getRenderArray = (): TListCircleObjects[] => {
    const renderArray = list.toArray().map((item) => {
      return(
          {
            letter: item,
            state: ElementStates.Default,
            headElement: null,
            tailElement: null
          }
        )
    });
    return([...renderArray]);
  };

  const [list, setList] = React.useState(new LinkedList<string>(randomArr(3, 6).map((item) => {return(String(item))})));
  const [listData, setListData] = React.useState<TListCircleObjects[]>(getRenderArray());
  const [inputElement, setInputElement] = React.useState('');
  const [inputIndex, setInputIndex] = React.useState('');
  const [isLoad, setIsLoad] = React.useState('');

  const onChangeElement = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setInputElement(e.target.value);
  }
  const onChangeIndex = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setInputIndex(e.target.value);
  }

  const prepend = async () => {
    if (inputElement === '') {return};
    setIsLoad('prepend');
    const saveElement = inputElement;
    setInputElement('');

    const renderArray1 = getRenderArray();
    renderArray1[0].headElement = saveElement;

    setListData(renderArray1);
    await delay(DELAY_IN_MS);

    list.prepend(saveElement);

    const renderArray2 = getRenderArray();
    renderArray2[0].state = ElementStates.Modified;
    setListData(renderArray2);
    await delay(DELAY_IN_MS);

    setListData(getRenderArray());
    setIsLoad('');
  };
  const append = async () => {
    if (inputElement === '') {return};
    setIsLoad('append');
    const saveElement = inputElement;
    setInputElement('');

    const renderArray1 = getRenderArray();
    renderArray1[list.getSize() - 1].headElement = saveElement;

    setListData(renderArray1);
    await delay(DELAY_IN_MS);

    list.append(saveElement);

    const renderArray2 = getRenderArray();
    renderArray2[list.getSize() - 1].state = ElementStates.Modified;
    setListData(renderArray2);
    await delay(DELAY_IN_MS);

    setListData(getRenderArray());
    setIsLoad('');
  };
  const deleteHead = async () => {
    if (list.getSize() <= 0) {return};
    setIsLoad('deleteHead');

    const renderArray = getRenderArray();
    renderArray[0].tailElement = renderArray[0].letter;
    renderArray[0].letter = "";

    setListData(renderArray);
    await delay(DELAY_IN_MS);

    list.deleteHead();
    setListData(getRenderArray());
    setIsLoad('');
  };
  const deleteTail = async () => {
    if (list.getSize() <= 0) {return};
    setIsLoad('deleteTail');

    const renderArray = getRenderArray();
    renderArray[list.getSize() - 1].tailElement = renderArray[list.getSize() - 1].letter;
    renderArray[list.getSize() - 1].letter = "";

    setListData(renderArray);
    await delay(DELAY_IN_MS);

    list.deleteTail();
    setListData(getRenderArray());
    setIsLoad('');
  };
  const addByIndex = async () => {
    const index = Number(inputIndex);
    const saveElement = inputElement;
    if (index < 0 || index >= list.getSize() || saveElement === '') {return};
    setIsLoad('addByIndex');
    setInputElement('');
    setInputIndex('');

    const renderArray1 = getRenderArray();
    for (let i = 0; i <= index; i++) {
      const prevIndex = i - 1;
      renderArray1[i].headElement = saveElement;
      if (prevIndex >= 0) {
        renderArray1[prevIndex].headElement = '';
        renderArray1[prevIndex].state = ElementStates.Changing;
      }
      setListData([...renderArray1]);
      await delay(DELAY_IN_MS);
    }

    list.addByIndex(inputElement, Number(inputIndex));

    const renderArray2 = getRenderArray();
    renderArray2[index].state = ElementStates.Modified;
    setListData(renderArray2);

    await delay(DELAY_IN_MS);
    setListData(getRenderArray());
    setIsLoad('');
  };
  const deleteByIndex = async () => {
    const index = Number(inputIndex);
    if (index < 0 || index >= list.getSize()) {return};
    setIsLoad('deleteByIndex');
    setInputIndex('');

    const renderArray1 = getRenderArray();
    for (let i = 0; i <= index; i++) {
      renderArray1[i].state = ElementStates.Changing;
      setListData([...renderArray1]);
      await delay(DELAY_IN_MS);
    }

    const saveElement = renderArray1[index].letter;
    renderArray1[index].state = ElementStates.Default;
    renderArray1[index].letter = '';
    renderArray1[index].tailElement = saveElement;
    setListData([...renderArray1]);
    await delay(DELAY_IN_MS);

    list.deleteByIndex(index);
    setListData(getRenderArray());
    setIsLoad('');
  };

  return (
    <SolutionLayout title="Связный список">
      <section className={styles.mainSection}>
        <div className={styles.topContainer}>
          <Input 
            type="text"
            maxLength={4}
            isLimitText={true}
            onChange={onChangeElement}
            value={inputElement}
            extraClass={styles.inputSize}
          />
          <Button 
            text="Добавить в head"
            onClick={prepend}
            isLoader={(isLoad === 'prepend') ? true : false}
            disabled={!(isLoad === '') || (inputElement === '')}
          />
          <Button 
            text="Добавить в tail"
            onClick={append}
            isLoader={(isLoad === 'append') ? true : false}
            disabled={!(isLoad === '') || (inputElement === '')}
          />
          <Button 
            text="Удалить из head"
            onClick={deleteHead}
            isLoader={(isLoad === 'deleteHead') ? true : false}
            disabled={!(isLoad === '') || (list.getSize() <= 0)}
          />
          <Button 
            text="Удалить из tail"
            onClick={deleteTail}
            isLoader={(isLoad === 'deleteTail') ? true : false}
            disabled={!(isLoad === '') || (list.getSize() <= 0)}
          />
        </div>
        <div className={styles.midContainer}>
          <Input 
            type="number"
            onChange={onChangeIndex}
            value={inputIndex}
            extraClass={styles.inputSize}
          />
          <Button 
            text="Добавить по индексу"
            onClick={addByIndex}
            extraClass={styles.buttonSize}
            isLoader={(isLoad === 'addByIndex') ? true : false}
            disabled={!(isLoad === '') || (inputIndex === '') || (inputElement === '') || (Number(inputIndex) > (listData.length - 1))}
          />
          <Button 
            text="Удалить по индексу"
            onClick={deleteByIndex}
            extraClass={styles.buttonSize}
            isLoader={(isLoad === 'deleteByIndex') ? true : false}
            disabled={!(isLoad === '') || (inputIndex === '') || (Number(inputIndex) > (listData.length - 1))}
          />
        </div>
        <ul className={styles.bottomContainer}>
          {
            listData.map((item, index, array) => {
              return(
                <li className={styles.containerItem} key={index}>
                  <Circle
                    state={item.state}
                    index={index}
                    letter={item.letter ? `${item.letter}` : ""}
                    head={((index === 0) || (item.headElement)) ? ((item.headElement) ? (<Circle letter={`${item.headElement}`} isSmall={true} state={ElementStates.Changing} />) : "head") : ""}
                    tail={((index === (array.length - 1)) || (item.tailElement)) ? ((item.tailElement) ? (<Circle letter={`${item.tailElement}`} isSmall={true} state={ElementStates.Changing} />) : "tail") : ""}
                  />
                  {(index < (array.length - 1)) &&
                    <ArrowIcon />
                  }
                </li>
              );
            })
          }
        </ul>
      </section>
    </SolutionLayout>
  );
};
