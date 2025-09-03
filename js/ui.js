import { SIMULATIONS } from './structures.js';

// Classe para gerenciar a renderização da interface
export class UIRenderer {
  constructor(state) {
    this.state = state;
    this.initializeElements();
  }

  // Inicializa elementos DOM
  initializeElements() {
    this.select = document.getElementById("structure-select");
    this.controlsContainer = document.getElementById("controls-container");
    this.indexInputContainer = document.getElementById("index-input-container");
    this.indexInput = document.getElementById("index-input");
    this.explanationText = document.getElementById("explanation-text");
    this.taskContainer = document.getElementById("task-container");
    this.structureTitle = document.getElementById("structure-title");
    this.conceptExplanation = document.getElementById("concept-explanation");
    this.actionContainer = document.getElementById("action-container");
    this.logContainer = document.getElementById("log-container");
    this.waitingListContainer = document.getElementById("waiting-list-container");
  }

  // Atualiza a explicação
  updateExplanation(text) {
    this.explanationText.textContent = text;
  }

  // Adiciona entrada ao log
  addToLog(message) {
    if (this.state.log.length === 0) this.logContainer.innerHTML = "";

    const logEntry = document.createElement("p");
    logEntry.className = "py-1 px-2 rounded bg-slate-100";
    logEntry.textContent = message;
    this.logContainer.prepend(logEntry);
  }

  // Renderiza um elemento da tarefa
  renderTaskElement(el, index) {
    const currentSim = SIMULATIONS[this.select.value];
    const taskEl = document.createElement("div");
    taskEl.id = `task-${el.id}`;
    taskEl.className = "task p-3 bg-white rounded-lg shadow flex items-center justify-between transition-all duration-300";

    let pointers = "";
    if (currentSim.name.includes("Encadeada")) {
      pointers = `<span class="text-2xl text-slate-400 font-mono">${index < this.state.elements.length - 1 ? "→" : "→Ø"
        }</span>`;
    }
    if (currentSim.name.includes("Duplamente")) {
      pointers = `<span class="text-2xl text-slate-400 font-mono">${index > 0 ? "←" : "Ø←"
        }</span> ${pointers}`;
    }
    if (currentSim.name.includes("Circular") && this.state.elements.length > 1) {
      if (index === this.state.elements.length - 1) {
        pointers = `<span class="text-2xl text-violet-500 font-mono">→</span>`;
      } else {
        pointers = `<span class="text-2xl text-slate-400 font-mono">→</span>`;
      }
    }

    taskEl.innerHTML = `
      <div class="flex items-center">
        <span class="text-xs font-bold text-indigo-500 bg-indigo-100 rounded-full w-6 h-6 flex items-center justify-center mr-3">${index}</span>
        <span class="font-mono text-lg">${el.value}</span>
      </div>
      <div class="font-mono">${pointers}</div>
    `;
    return taskEl;
  }

  // Renderiza todas as tarefas
  renderTasks() {
    this.taskContainer.innerHTML = "";
    this.state.elements.forEach((el, index) => {
      this.taskContainer.appendChild(this.renderTaskElement(el, index));
    });

    if (this.select.value === "staticList") {
      for (let i = this.state.elements.length; i < this.state.maxSize; i++) {
        this.taskContainer.innerHTML += `
          <div class="p-3 bg-slate-100 border-2 border-dashed border-slate-300 rounded-lg flex items-center">
            <span class="text-xs font-bold text-slate-400 bg-slate-200 rounded-full w-6 h-6 flex items-center justify-center mr-3">${i}</span>
            <span class="font-mono text-lg text-slate-400">vazio</span>
          </div>`;
      }
    }
  }

  // Renderiza a lista de espera
  renderWaitingList() {
    if (this.state.actionQueue.length === 0) {
      this.waitingListContainer.innerHTML = "";
      return;
    }

    let html = '<h4 class="text-sm font-semibold text-indigo-700 mb-1">Próximos na fila:</h4><ul class="text-xs space-y-1">';
    this.state.actionQueue.slice(0, 5).forEach((task) => {
      html += `<li class="bg-indigo-200 text-indigo-800 p-1 rounded-sm">${task.label}</li>`;
    });
    if (this.state.actionQueue.length > 5) {
      html += `<li class="text-slate-500 p-1">+ ${this.state.actionQueue.length - 5} mais...</li>`;
    }
    html += "</ul>";
    this.waitingListContainer.innerHTML = html;
  }

  // Configura a simulação
  setupSimulation(simName, onActionCallback) {
    const simConfig = SIMULATIONS[simName];

    this.structureTitle.textContent = simConfig.name;
    this.conceptExplanation.innerHTML = simConfig.description;
    // Insere o snippet de exemplo logo abaixo da explicação
    if (simConfig.example) {
      this.conceptExplanation.innerHTML += simConfig.example;
    }
    // Adiciona botão de copiar para o último bloco <pre> se existir
    setTimeout(() => {
      const pre = this.conceptExplanation.querySelector('pre');
      if (!pre) return;
      // Evita adicionar múltiplos botões
      if (pre.querySelector('.copy-btn')) return;
      const btn = document.createElement('button');
      btn.className = 'copy-btn';
      btn.textContent = 'Copiar';
      btn.title = 'Copiar código';
      btn.onclick = async (e) => {
        const codeEl = pre.querySelector('code');
        if (!codeEl) return;
        const text = codeEl.textContent;
        try {
          await navigator.clipboard.writeText(text);
          btn.textContent = 'Copiado!';
          btn.classList.add('copied');
          setTimeout(() => { btn.textContent = 'Copiar'; btn.classList.remove('copied'); }, 1500);
        } catch (err) {
          btn.textContent = 'Erro';
          setTimeout(() => { btn.textContent = 'Copiar'; }, 1500);
        }
      };
      pre.style.position = 'relative';
      pre.appendChild(btn);
    }, 50);
    this.updateExplanation("Selecione uma ação no painel de controle.");
    this.actionContainer.innerHTML = `<p class="text-slate-500">Aguardando ação...</p>`;
    this.logContainer.innerHTML = `<p class="text-slate-400">Nenhuma operação ainda.</p>`;
    this.renderWaitingList();

    this.controlsContainer.innerHTML = "";
    let needsIndex = false;

    simConfig.controls.forEach((control) => {
      const button = document.createElement("button");
      button.textContent = control.label;
      button.className = `w-full bg-${control.color}-500 hover:bg-${control.color}-600 text-white font-bold py-3 px-4 rounded-lg shadow-md transition-transform transform hover:scale-105`;
      button.onclick = () => {
        const params = control.needsIndex
          ? { idx: parseInt(this.indexInput.value, 10) }
          : {};
        onActionCallback(control.action, params);
      };
      this.controlsContainer.appendChild(button);
      if (control.needsIndex) needsIndex = true;
    });

    // Adiciona botão de limpar
    const hr = document.createElement("hr");
    hr.className = "my-3 border-slate-300";
    this.controlsContainer.appendChild(hr);

    const clearButton = document.createElement("button");
    clearButton.textContent = "Limpar Lista";
    clearButton.className = "w-full bg-slate-500 hover:bg-slate-600 text-white font-bold py-2 px-3 rounded-lg shadow-md";
    clearButton.onclick = () => {
      this.state.elements = [];
      this.state.actionQueue = [];
      this.state.taskId = 0;
      this.state.addToLog("🧹 Lista limpa.");
      this.addToLog("🧹 Lista limpa.");
      this.renderTasks();
    };
    this.controlsContainer.appendChild(clearButton);

    this.indexInputContainer.classList.toggle("hidden", !needsIndex);
    this.renderTasks();
  }

  // Anima e remove elemento
  animateAndRemove(removedElement, logMessage, onComplete) {
    this.state.addToLog(`➡️ ${logMessage}`);
    this.addToLog(`➡️ ${logMessage}`);

    const originalEl = document.getElementById(`task-${removedElement.id}`);
    if (originalEl) originalEl.classList.add("processing-out");

    const clone = this.renderTaskElement(
      removedElement,
      this.state.elements.indexOf(removedElement)
    );
    clone.id = "";
    clone.classList.add("highlight-op");

    this.actionContainer.innerHTML = "";
    this.actionContainer.appendChild(clone);
    this.renderWaitingList();

    setTimeout(() => {
      this.renderTasks();
      this.actionContainer.innerHTML = `<p class="text-slate-500">Aguardando ação...</p>`;
      onComplete();
    }, 1500);
  }
}
