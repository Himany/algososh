export class LinkedListNode<T> {
  value: T
  next: LinkedListNode<T> | null
  constructor(value: T, next?: LinkedListNode<T> | null) {
    this.value = value;
    this.next = (next === undefined ? null : next);
  }
}

export interface ILinkedList<T> {
  prepend: (element: T) => void;
  append: (element: T) => void;
  addByIndex: (element: T, position: number) => void;
  deleteByIndex: (position: number) => void;
  deleteHead: () => void;
  deleteTail: () => void;
  toArray: () => T[];
  getSize: () => number;
  print: () => void;
}

export class LinkedList<T> implements ILinkedList<T> {
  private head: LinkedListNode<T> | null;
  private size: number;
  constructor(initialArray?: T[]) {
    this.head = null;
    this.size = 0;

    if (initialArray) {
      for (let i = 0; i < initialArray.length; i++) {
        this.append(initialArray[i]);
      }
    }
  }

  prepend = (element: T): void => {
    const node = new LinkedListNode(element);
    
    node.next = this.head;
    
    this.head = node;
    this.size++;
  }

  append = (element: T): void => {
    const node = new LinkedListNode(element);

    if (!this.head) {
      this.head = node;
    } else {
      let current = this.head;
      while (current.next) {
        current = current.next;
      }
      current.next = node;
    }
    this.size++;
  }

  addByIndex = (element: T, index: number): void => {
    if (index < 0 || index > this.size) {
      console.log('Enter a valid index');
      return;
    }
    if (index === 0) {
      this.prepend(element);
      return;
    }

    const node = new LinkedListNode(element);

    let current = this.head;
    for (let i = 0; i < index - 1; i++) {
      if (current) {
        current = current.next;
      }
    }
    if (!current) {return}

    let tmp = current.next;
    current.next = node;
    node.next = tmp;

    this.size++;
  }

  deleteByIndex = (index: number): void => {
    if (index < 0 || index > this.size) {
      console.log('Enter a valid index');
      return;
    }
    if (index === 0) {
      this.deleteHead();
      return;
    }
    
    let current = this.head;
    for (let i = 0; i < index - 1; i++) {
      if (current) {
        current = current.next;
      }
    }
    if (!current) {return}
    if (!current.next) {return}

    current.next = current.next.next;
    this.size--;
  }

  deleteHead = (): void => {
    if (!this.head) {return}
    this.head = this.head.next;
    this.size--;
  }

  deleteTail = (): void => {
    this.deleteByIndex(this.size - 1);
  }

  toArray = (): T[] => {
    const array: T[] = [];
    let current = this.head;

    while (current) {
      array.push(current.value);
      current = current.next;
    }

    return (array);
  };

  getSize() {
    return this.size;
  }

  print() {
    let current = this.head;
    while (current) {
      console.log(current.value);
      current = current.next;
    }
  }
}