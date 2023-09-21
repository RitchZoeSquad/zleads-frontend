class Stack {
    constructor() {
      this.items = [];
    }
  
    // Push an element onto the stack
    push(element) {
      this.items.push(element);
    }
  
    // Pop the top element from the stack and return it
    pop() {
      if (this.isEmpty()) {
        return "Stack is empty";
      }
      return this.items.pop();
    }
  
    // Peek at the top element without removing it
    peek() {
      if (this.isEmpty()) {
        return null;
      }
      return this.items[this.items.length - 1];
    }
  
    // Check if the stack is empty
    isEmpty() {
      return this.items.length === 0;
    }
  
    // Get the size of the stack
    size() {
      return this.items.length;
    }
  
    // Clear the stack
    clear() {
      this.items = [];
    }
  }
  export {Stack};