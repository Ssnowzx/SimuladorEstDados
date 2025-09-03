// Configurações das estruturas de dados
export const SIMULATIONS = {
  queue: {
    name: "Fila (Queue)",
    description: `
      <h2 class="text-2xl font-bold text-slate-800 mb-2">Fila (Queue)</h2>
      <p class="text-slate-600"><strong class="font-semibold">Princípio:</strong> FIFO (First-In, First-Out) - O primeiro elemento que entra é o primeiro a sair.</p>
      <p class="text-slate-600 mt-2"><strong class="font-semibold">Analogia:</strong> Pense em uma fila de supermercado. Quem chega primeiro, é atendido primeiro.</p>
      <p class="text-slate-600 mt-2"><strong class="font-semibold">Complexidade:</strong> Inserção (enqueue) e Remoção (dequeue) são O(1).</p>
      <p class="text-slate-600 mt-2"><strong class="font-semibold">Uso Comum:</strong> Gerenciamento de tarefas (impressão, processos), buffers de dados.</p>`,
    controls: [
      {
        label: "Adicionar no Fim (Enqueue)",
        action: "enqueue",
        color: "emerald",
      },
      {
        label: "Remover do Início (Dequeue)",
        action: "dequeue",
        color: "rose",
      },
    ],
  },

  stack: {
    name: "Pilha (Stack)",
    description: `
      <h2 class="text-2xl font-bold text-slate-800 mb-2">Pilha (Stack)</h2>
      <p class="text-slate-600"><strong class="font-semibold">Princípio:</strong> LIFO (Last-In, First-Out) - O último elemento que entra é o primeiro a sair.</p>
      <p class="text-slate-600 mt-2"><strong class="font-semibold">Analogia:</strong> Uma pilha de pratos. Você coloca um prato no topo e remove o prato do topo.</p>
      <p class="text-slate-600 mt-2"><strong class="font-semibold">Complexidade:</strong> Inserção (push) e Remoção (pop) são O(1).</p>
      <p class="text-slate-600 mt-2"><strong class="font-semibold">Uso Comum:</strong> Botão "Voltar" em navegadores, funcionalidade de "Desfazer" (Undo), gerenciamento de chamadas de função.</p>`,
    controls: [
      { label: "Empilhar (Push)", action: "push", color: "emerald" },
      { label: "Desempilhar (Pop)", action: "pop", color: "rose" },
    ],
  },

  singlyLinkedList: {
    name: "Lista Encadeada Simples",
    description: `
      <h2 class="text-2xl font-bold text-slate-800 mb-2">Lista Encadeada Simples</h2>
      <p class="text-slate-600"><strong class="font-semibold">Princípio:</strong> Elementos (nós) conectados em sequência através de ponteiros, apenas em uma direção.</p>
      <p class="text-slate-600 mt-2"><strong class="font-semibold">Analogia:</strong> Uma caça ao tesouro, onde cada pista aponta para a próxima.</p>
      <p class="text-slate-600 mt-2"><strong class="font-semibold">Complexidade:</strong> Inserção/Remoção no início é O(1). No fim, é O(n) se não houver ponteiro para a cauda. Acesso/Busca é O(n).</p>
      <p class="text-slate-600 mt-2"><strong class="font-semibold">Uso Comum:</strong> Implementação de outras estruturas (pilhas, filas), gerenciamento de memória dinâmica.</p>`,
    controls: [
      {
        label: "Inserir no Início",
        action: "add_start",
        color: "emerald",
      },
      { label: "Inserir no Fim", action: "add_end", color: "teal" },
      {
        label: "Remover do Início",
        action: "remove_start",
        color: "rose",
      },
    ],
  },

  doublyLinkedList: {
    name: "Lista Duplamente Encadeada",
    description: `
      <h2 class="text-2xl font-bold text-slate-800 mb-2">Lista Duplamente Encadeada</h2>
      <p class="text-slate-600"><strong class="font-semibold">Princípio:</strong> Cada nó aponta para o próximo e também para o anterior, permitindo navegação em ambos os sentidos.</p>
      <p class="text-slate-600 mt-2"><strong class="font-semibold">Analogia:</strong> Um trem com vagões conectados em ambos os lados, permitindo ir para frente e para trás.</p>
      <p class="text-slate-600 mt-2"><strong class="font-semibold">Complexidade:</strong> Inserção/Remoção no início ou fim é O(1). Remoção de um elemento específico (se o nó for conhecido) é O(1).</p>
      <p class="text-slate-600 mt-2"><strong class="font-semibold">Uso Comum:</strong> Listas de "Mais recentes" (MRU), funcionalidade de "Desfazer/Refazer" (Undo/Redo).</p>`,
    controls: [
      {
        label: "Inserir no Início",
        action: "add_start",
        color: "emerald",
      },
      { label: "Inserir no Fim", action: "add_end", color: "teal" },
      {
        label: "Remover do Início",
        action: "remove_start",
        color: "rose",
      },
      { label: "Remover do Fim", action: "remove_end", color: "red" },
    ],
  },

  circularList: {
    name: "Lista Circular",
    description: `
      <h2 class="text-2xl font-bold text-slate-800 mb-2">Lista Circular</h2>
      <p class="text-slate-600"><strong class="font-semibold">Princípio:</strong> Uma lista encadeada onde o último nó aponta de volta para o primeiro, formando um ciclo.</p>
      <p class="text-slate-600 mt-2"><strong class="font-semibold">Analogia:</strong> Um carrossel, onde após o último cavalo, você volta para o primeiro.</p>
      <p class="text-slate-600 mt-2"><strong class="font-semibold">Complexidade:</strong> Permite rotação eficiente. Acesso a qualquer nó a partir de qualquer ponto.</p>
      <p class="text-slate-600 mt-2"><strong class="font-semibold">Uso Comum:</strong> Escalonamento de processos (Round-Robin), playlists de música em modo de repetição.</p>`,
    controls: [
      { label: "Adicionar", action: "add", color: "emerald" },
      { label: "Rotacionar (Próximo)", action: "rotate", color: "sky" },
    ],
  },

  staticList: {
    name: "Lista Estática (Array)",
    description: `
      <h2 class="text-2xl font-bold text-slate-800 mb-2">Lista Estática (Array)</h2>
      <p class="text-slate-600"><strong class="font-semibold">Princípio:</strong> Uma coleção de elementos de tamanho fixo, armazenada em memória contígua.</p>
      <p class="text-slate-600 mt-2"><strong class="font-semibold">Analogia:</strong> Uma caixa de ovos, com um número fixo de espaços.</p>
      <p class="text-slate-600 mt-2"><strong class="font-semibold">Complexidade:</strong> Acesso por índice é muito rápido O(1). Inserção/Remoção no meio é lento O(n) porque exige deslocar elementos.</p>
      <p class="text-slate-600 mt-2"><strong class="font-semibold">Uso Comum:</strong> Quando o tamanho máximo dos dados é conhecido e o acesso rápido por índice é crucial.</p>`,
    controls: [
      {
        label: "Inserir no Fim",
        action: "enqueue",
        color: "emerald",
        needsIndex: false,
      },
      {
        label: "Inserir no Índice",
        action: "insert_at",
        color: "teal",
        needsIndex: true,
      },
      {
        label: "Remover do Índice",
        action: "remove_at",
        color: "rose",
        needsIndex: true,
      },
    ],
  },
};
