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

  // Renderiza um elemento da tarefa (nó genérico usado por vários layouts)
  renderTaskElement(el, index) {
    const currentSim = SIMULATIONS[this.select.value];
    const taskEl = document.createElement("div");
    taskEl.id = `task-${el.id}`;
    taskEl.className = "node-box p-3 bg-white rounded-lg shadow flex items-center justify-between min-w-[5.5rem]";

    // badge de índice
    const badge = `<span class="text-xs font-bold text-indigo-500 bg-indigo-100 rounded-full w-6 h-6 flex items-center justify-center mr-3">${index}</span>`;

    // indica topo para pilha
    let topLabel = "";
    if (this.select.value === 'stack' && index === this.state.elements.length - 1) {
      topLabel = `<span class="top-label ml-3 text-sm font-semibold text-emerald-700">Topo</span>`;
    }

    taskEl.innerHTML = `
      <div class="flex items-center">
        ${badge}
        <span class="font-mono text-lg">${el.value}</span>
      </div>
      <div>${topLabel}</div>
    `;
    return taskEl;
  }

  // Renderiza todas as tarefas com layout específico por estrutura
  renderTasks() {
    this.taskContainer.innerHTML = "";

    const sim = this.select.value;

    // Queue: horizontal com setas
    if (sim === 'queue') {
      this.taskContainer.className = 'flex items-center space-x-3 overflow-x-auto p-2';
      this.state.elements.forEach((el, index) => {
        const node = this.renderTaskElement(el, index);
        node.classList.add('push-anim');
        this.taskContainer.appendChild(node);
        if (index < this.state.elements.length - 1) {
          const arrow = document.createElement('div');
          arrow.className = 'arrow text-2xl text-slate-400 font-mono';
          arrow.innerHTML = '&#8594;'; // →
          this.taskContainer.appendChild(arrow);
        }
      });
      return;
    }

    // Stack: vertical, topo no topo (visualizar como pilha)
    if (sim === 'stack') {
      this.taskContainer.className = 'flex flex-col-reverse items-center space-y-3 space-y-reverse p-2';
      // Renderiza os elementos da pilha
      this.state.elements.forEach((el, index) => {
        const node = this.renderTaskElement(el, index);
        node.classList.add('push-anim');
        this.taskContainer.appendChild(node);
      });
      // Renderiza slots vazios se pilha não estiver cheia
      for (let i = this.state.elements.length; i < this.state.maxSize; i++) {
        const emptySlot = document.createElement('div');
        emptySlot.className = 'node-box p-3 bg-slate-100 rounded-lg shadow flex items-center justify-center min-w-[5.5rem] text-slate-400';
        emptySlot.innerHTML = `<span class="font-mono">vazio</span>`;
        this.taskContainer.appendChild(emptySlot);
      }
      // Mensagem de pilha cheia/vazia
      if (this.state.elements.length === 0) {
        this.updateExplanation('Pilha vazia.');
      } else if (this.state.elements.length >= this.state.maxSize) {
        this.updateExplanation('Pilha cheia!');
      }
      return;
    }

    // Linked lists (singly / doubly / circular): horizontal com setas; doubly com setas bidirecionais
    if (sim === 'singlyLinkedList' || sim === 'doublyLinkedList' || sim === 'circularList') {
      this.taskContainer.className = 'flex items-center space-x-3 overflow-x-auto p-2 relative';
      this.state.elements.forEach((el, index) => {
        const node = this.renderTaskElement(el, index);
        node.classList.add('push-anim');
        node.dataset.index = index;
        this.taskContainer.appendChild(node);

        // seta entre nós
        if (index < this.state.elements.length - 1) {
          const arrow = document.createElement('div');
          if (sim === 'doublyLinkedList') {
            arrow.className = 'arrow text-2xl text-slate-400 font-mono';
            arrow.innerHTML = '&#8656;&#8212;&#8658;'; // ←—→ visual
          } else {
            arrow.className = 'arrow text-2xl text-slate-400 font-mono';
            arrow.innerHTML = '&#8594;'; // →
          }
          this.taskContainer.appendChild(arrow);
        }
      });

      // se circular, desenha conector curvo entre último e primeiro
      if (sim === 'circularList' && this.state.elements.length > 1) {
        this.drawCircularConnector();
      } else {
        // remove possível conector existente
        const old = document.getElementById('circular-connector');
        if (old) old.remove();
      }

      return;
    }

    // Static list (array): mostra caixas indexadas até maxSize
    if (sim === 'staticList') {
      this.taskContainer.className = 'grid grid-cols-4 gap-3 p-2';
      for (let i = 0; i < this.state.maxSize; i++) {
        const cell = document.createElement('div');
        cell.className = 'node-box p-3 bg-white rounded-lg shadow flex flex-col items-center justify-center min-h-[4rem]';
        const idx = `<div class="text-xs font-bold text-slate-500 mb-1">${i}</div>`;
        const content = i < this.state.elements.length ? `<div class="font-mono text-lg">${this.state.elements[i].value}</div>` : `<div class="text-slate-400 font-mono">vazio</div>`;
        cell.innerHTML = `${idx}${content}`;
        if (i < this.state.elements.length) cell.classList.add('push-anim');
        this.taskContainer.appendChild(cell);
      }
      return;
    }

    // Fallback: lista vertical padrão
    this.taskContainer.className = '';
    this.state.elements.forEach((el, index) => {
      const node = this.renderTaskElement(el, index);
      node.classList.add('push-anim');
      this.taskContainer.appendChild(node);
    });
  }

  // Desenha um conector SVG curvo entre o último e o primeiro nó da lista circular
  drawCircularConnector() {
    // Removido: para evitar qualquer artefato visual (pontas/arestas) o conector SVG foi desativado.
    const existing = document.getElementById('circular-connector');
    if (existing) existing.remove();
    return; // sem desenho
  }

  // Anima a operação 'rotate' (move o primeiro elemento visualmente para o fim)
  animateRotate(firstElement, onComplete) {
    const original = document.getElementById(`task-${firstElement.id}`);
    if (!original) { onComplete(); return; }

    // calcula destino (posição do último elemento)
    const nodes = Array.from(this.taskContainer.querySelectorAll('.node-box'));
    let lastNode = nodes[nodes.length - 1];
    // se apenas 1 nó, simplesmente pulse
    if (!lastNode || nodes.length < 2) {
      original.classList.add('push-anim');
      setTimeout(() => onComplete(), 400);
      return;
    }

    const origRect = original.getBoundingClientRect();
    const lastRect = lastNode.getBoundingClientRect();
    const containerRect = this.taskContainer.getBoundingClientRect();

    // clone para animar
    const clone = original.cloneNode(true);
    clone.style.position = 'absolute';
    clone.style.left = `${origRect.left - containerRect.left}px`;
    clone.style.top = `${origRect.top - containerRect.top}px`;
    clone.style.margin = '0';
    clone.style.zIndex = '999';
    this.taskContainer.appendChild(clone);

    // transforma para destino
    const translateX = (lastRect.left - origRect.left);
    const translateY = (lastRect.top - origRect.top);
    clone.style.transition = 'transform 600ms cubic-bezier(.2,.8,.2,1), opacity 300ms';
    requestAnimationFrame(() => {
      clone.style.transform = `translate(${translateX}px, ${translateY}px)`;
      clone.style.opacity = '0.95';
    });

    clone.addEventListener('transitionend', () => {
      clone.remove();
      // pequena espera para sensação de continuidade
      setTimeout(() => onComplete(), 80);
    }, { once: true });
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
    let needsMaxSize = false;

    simConfig.controls.forEach((control) => {
      // Detecta se é controle de tamanho máximo da pilha
      if (control.action === "set_max_size" && simName === "stack") {
        needsMaxSize = true;
      }
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

    // Campo para definir tamanho máximo da pilha
    if (needsMaxSize) {
      const maxSizeDiv = document.createElement("div");
      maxSizeDiv.className = "mt-4 flex items-center gap-2";
      maxSizeDiv.innerHTML = `<label for='max-size-input' class='text-sm font-medium text-slate-700'>Tamanho Máximo:</label><input id='max-size-input' type='number' min='1' max='99' value='${this.state.maxSize}' class='w-20 px-2 py-1 border border-slate-300 rounded-md text-sm' />`;
      this.controlsContainer.appendChild(maxSizeDiv);
      // Atualiza ao mudar
      maxSizeDiv.querySelector('#max-size-input').addEventListener('change', (e) => {
        const val = parseInt(e.target.value, 10);
        if (!isNaN(val) && val >= 1 && val <= 99) {
          onActionCallback('set_max_size', { max: val });
          // Atualiza visual imediatamente
          this.state.maxSize = val;
          this.renderTasks();
        }
      });
    }

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
