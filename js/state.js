// Classe para gerenciar o estado global da aplicação
export class AppState {
  constructor() {
    this.elements = [];
    this.actionQueue = [];
    this.log = [];
    this.isProcessing = false;
    this.taskId = 0;
    this.maxSize = 8;
    this.processingSpeed = 1500;
  }

  // Limpa o estado
  reset() {
    this.elements = [];
    this.actionQueue = [];
    this.log = [];
    this.taskId = 0;
    this.isProcessing = false;
    // Mantém maxSize atual (não reseta para 8)
  }

  // Adiciona um elemento
  addElement(value) {
    return { id: this.taskId++, value };
  }

  // Gera um valor aleatório para os elementos
  generateRandomValue() {
    return Math.floor(Math.random() * 900) + 100;
  }

  // Adiciona uma ação à fila
  addToQueue(action, params, label) {
    this.actionQueue.push({ action, params, label });
  }

  // Remove a próxima ação da fila
  getNextAction() {
    return this.actionQueue.shift();
  }

  // Verifica se há ações na fila
  hasActions() {
    return this.actionQueue.length > 0;
  }

  // Adiciona entrada ao log
  addToLog(message) {
    this.log.unshift(message);
    if (this.log.length > 50) {
      this.log.pop();
    }
  }
}
