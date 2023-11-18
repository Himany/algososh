interface IQueue<T> {
  enqueue: (item: T) => void;
  dequeue: () => void;
  peak: () => T | null;
  clear: () => void;
  isEmpty: () => boolean;
  getElements: () => (T | null)[];
  getHead: () => number;
  getTail: () => number;
  getLastElementIndex: () => number;
}

export class Queue<T> implements IQueue<T> {
  private container: (T | null)[];
  private head = 0;
  private tail = 0;
  private readonly size: number;
  private length: number = 0;

  constructor(size: number) {
    this.size = size;
    this.container = Array(size).fill(null);
  }

  enqueue = (item: T) => {
    if (this.length >= this.size) {
      throw new Error("Maximum length exceeded");
    }

    this.container[this.tail % this.size] = item;
    
    this.length++;
    this.tail++;
  };

  dequeue = () => {
    if (this.isEmpty()) {
      throw new Error("No elements in the queue");
    }

    this.container[this.head % this.size] = null;

    this.length--;
    this.head++;
  };

  peak = (): T | null => {
    if (this.isEmpty()) {
      throw new Error("No elements in the queue");
    }
     return (this.container[this.head]);
  };

  clear = (): void => {
    this.container = Array(this.size).fill(null);
    this.head = 0;
    this.tail = 0;
    this.length = 0;
  }

  isEmpty = () => this.length === 0;
  getElements = () => this.container;
  getHead = () => ((this.head) % this.size);
  getTail = () => ((this.tail) % this.size);
  getLastElementIndex = () => ((this.tail - 1) % this.size);
}