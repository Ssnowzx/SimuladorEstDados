import { SIMULATIONS } from './structures.js';

// Classe para gerenciar as operações das estruturas de dados
export class DataStructureOperations {
  constructor(state) {
    this.state = state;
  }

  // Processa operações da fila
  processQueue(action, params, select) {
    if (action === "enqueue") {
      if (
        this.state.elements.length >= this.state.maxSize &&
        select.value === "staticList"
      ) {
        return { success: false, message: "Erro: A lista estática está cheia!" };
      }
      const value = this.state.generateRandomValue();
      this.state.elements.push(this.state.addElement(value));
      this.state.addToLog(`✅ Adicionado ${value} ao fim.`);
      return { success: true };
    } else if (action === "dequeue") {
      if (this.state.elements.length === 0) {
        return { success: false, message: "A estrutura está vazia." };
      }
      const removed = this.state.elements.shift();
      return { success: true, removed, message: `Removido ${removed.value} do início.` };
    }
  }

  // Processa operações da pilha
  processStack(action, params = {}) {
    // Permite definir tamanho máximo da pilha
    if (action === "set_max_size") {
      const max = parseInt(params.max, 10);
      if (isNaN(max) || max < 1 || max > 99) {
        return { success: false, message: "Tamanho inválido. Escolha entre 1 e 99." };
      }
      this.state.maxSize = max;
      this.state.addToLog(`🔧 Tamanho máximo da pilha definido para ${max}.`);
      return { success: true, message: `Tamanho máximo da pilha definido para ${max}.` };
    }
    // Push: verifica limite
    if (action === "push") {
      if (this.state.elements.length >= this.state.maxSize) {
        return { success: false, message: "Erro: Pilha cheia!" };
      }
      const value = this.state.generateRandomValue();
      this.state.elements.push(this.state.addElement(value));
      this.state.addToLog(`✅ Empilhado ${value}.`);
      return { success: true };
    } else if (action === "pop") {
      if (this.state.elements.length === 0) {
        return { success: false, message: "Erro: Pilha vazia!" };
      }
      const removed = this.state.elements.pop();
      return { success: true, removed, message: `Desempilhado ${removed.value} do topo.` };
    }
  }

  // Processa operações da lista encadeada simples
  processSinglyLinkedList(action) {
    const value = this.state.generateRandomValue();
    if (action === "add_start") {
      this.state.elements.unshift(this.state.addElement(value));
      this.state.addToLog(`✅ Inserido ${value} no início.`);
    } else if (action === "add_end") {
      this.state.elements.push(this.state.addElement(value));
      this.state.addToLog(`✅ Inserido ${value} no fim.`);
    } else if (action === "remove_start") {
      if (this.state.elements.length === 0) {
        return { success: false, message: "A lista está vazia." };
      }
      const removed = this.state.elements.shift();
      return { success: true, removed, message: `Removido ${removed.value} do início.` };
    }
    return { success: true };
  }

  // Processa operações da lista duplamente encadeada
  processDoublyLinkedList(action) {
    const value = this.state.generateRandomValue();
    if (action === "add_start") {
      this.state.elements.unshift(this.state.addElement(value));
      this.state.addToLog(`✅ Inserido ${value} no início.`);
    } else if (action === "add_end") {
      this.state.elements.push(this.state.addElement(value));
      this.state.addToLog(`✅ Inserido ${value} no fim.`);
    } else if (action === "remove_start") {
      if (this.state.elements.length === 0) {
        return { success: false, message: "A lista está vazia." };
      }
      const removed = this.state.elements.shift();
      return { success: true, removed, message: `Removido ${removed.value} do início.` };
    } else if (action === "remove_end") {
      if (this.state.elements.length === 0) {
        return { success: false, message: "A lista está vazia." };
      }
      const removed = this.state.elements.pop();
      return { success: true, removed, message: `Removido ${removed.value} do fim.` };
    }
    return { success: true };
  }

  // Processa operações da lista circular
  processCircularList(action) {
    if (action === "add") {
      const value = this.state.generateRandomValue();
      this.state.elements.push(this.state.addElement(value));
      this.state.addToLog(`✅ Adicionado ${value}.`);
    } else if (action === "rotate") {
      if (this.state.elements.length < 2) {
        return { success: false, message: "Precisa de pelo menos 2 elementos para rotacionar." };
      }
      const first = this.state.elements.shift();
      this.state.elements.push(first);
      this.state.addToLog(`🔄 Lista rotacionada. ${first.value} foi para o fim.`);
    }
    return { success: true };
  }

  // Processa operações da lista estática
  processStaticList(action, params) {
    if (action === "enqueue") {
      return this.processQueue(action, params, { value: "staticList" });
    } else if (action === "insert_at") {
      if (this.state.elements.length >= this.state.maxSize) {
        return { success: false, message: "Erro: A lista está cheia!" };
      }
      if (
        isNaN(params.idx) ||
        params.idx < 0 ||
        params.idx > this.state.elements.length
      ) {
        return { success: false, message: "Índice inválido." };
      }
      const value = this.state.generateRandomValue();
      this.state.elements.splice(params.idx, 0, this.state.addElement(value));
      this.state.addToLog(`✅ Inserido ${value} no índice ${params.idx}.`);
    } else if (action === "remove_at") {
      if (
        isNaN(params.idx) ||
        params.idx < 0 ||
        params.idx >= this.state.elements.length
      ) {
        return { success: false, message: "Índice inválido." };
      }
      const removed = this.state.elements.splice(params.idx, 1)[0];
      return { success: true, removed, message: `Removido ${removed.value} do índice ${params.idx}.` };
    }
    return { success: true };
  }

  // Método principal para processar qualquer operação
  processOperation(structureType, action, params = {}) {
    switch (structureType) {
      case 'queue':
        return this.processQueue(action, params, { value: structureType });
      case 'stack':
        return this.processStack(action);
      case 'singlyLinkedList':
        return this.processSinglyLinkedList(action);
      case 'doublyLinkedList':
        return this.processDoublyLinkedList(action);
      case 'circularList':
        return this.processCircularList(action);
      case 'staticList':
        return this.processStaticList(action, params);
      default:
        return { success: false, message: "Estrutura não reconhecida." };
    }
  }
}
