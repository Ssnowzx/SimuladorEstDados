import { AppState } from './state.js';
import { DataStructureOperations } from './operations.js';
import { UIRenderer } from './ui.js';
import { SIMULATIONS } from './structures.js';

// Classe principal da aplicação
class DataStructureSimulator {
  constructor() {
    this.state = new AppState();
    this.operations = new DataStructureOperations(this.state);
    this.ui = new UIRenderer(this.state);
    this.processInterval = null;

    this.initializeEventListeners();
    this.setupSimulation(this.ui.select.value);
  }

  // Inicializa eventos
  initializeEventListeners() {
    // Controle de velocidade
    const speedSlider = document.getElementById("speed-slider");
    speedSlider.addEventListener("input", (e) => {
      this.state.processingSpeed = 3000 - parseInt(e.target.value, 10);
      if (this.processInterval) {
        this.startProcessing();
      }
    });

    // Mudança de estrutura
    this.ui.select.addEventListener("change", (e) => {
      this.setupSimulation(e.target.value);
    });
  }

  // Adiciona ação à fila
  queueAction(action, params = {}) {
    const simConfig = SIMULATIONS[this.ui.select.value];
    const control = simConfig.controls.find((c) => c.action === action);
    this.state.addToQueue(action, params, control.label);

    this.ui.updateExplanation(`Ação "${control.label}" adicionada à fila de processamento.`);
    this.ui.renderWaitingList();

    if (!this.processInterval) {
      this.startProcessing();
    }

    // Scroll para visualização em mobile
    if (window.innerWidth < 1024) {
      const visualizationArea = document.getElementById("explanation-box");
      if (visualizationArea) {
        setTimeout(() => {
          visualizationArea.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }, 100);
      }
    }
  }

  // Inicia processamento
  startProcessing() {
    if (this.processInterval) clearInterval(this.processInterval);
    this.processInterval = setInterval(() => {
      this.processNextInQueue();
    }, this.state.processingSpeed);
  }

  // Processa próxima ação da fila
  processNextInQueue() {
    if (this.state.isProcessing || !this.state.hasActions()) {
      return;
    }

    this.state.isProcessing = true;
    const task = this.state.getNextAction();

    this.ui.updateExplanation(`Processando: "${task.label}"...`);
    this.ui.renderWaitingList();

    // Executa a operação
    const result = this.operations.processOperation(
      this.ui.select.value,
      task.action,
      task.params
    );

    if (!result.success) {
      this.ui.updateExplanation(result.message);
      this.ui.renderTasks();
      this.state.isProcessing = false;
      return;
    }

    // Verifica se precisa de animação de remoção
    const needsAnimation = task.action.includes("remove") ||
      task.action.includes("pop") ||
      task.action.includes("dequeue");

    if (!needsAnimation || !result.removed) {
      this.ui.renderTasks();
      this.state.isProcessing = false;
    } else {
      // Anima remoção
      this.ui.animateAndRemove(result.removed, result.message, () => {
        this.state.isProcessing = false;
      });
    }
  }

  // Configura simulação
  setupSimulation(simName) {
    this.state.reset();
    if (this.processInterval) {
      clearInterval(this.processInterval);
      this.processInterval = null;
    }

    this.ui.setupSimulation(simName, (action, params) => {
      this.queueAction(action, params);
    });
  }
}

// Inicializa a aplicação quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', () => {
  new DataStructureSimulator();
});
