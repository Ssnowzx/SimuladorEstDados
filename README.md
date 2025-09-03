# 📊 Simulador de Estruturas de Dados

Um simulador interativo e educativo para visualizar e compreender o funcionamento de diferentes estruturas de dados fundamentais da ciência da computação.

## 🎯 Objetivo

Este projeto foi desenvolvido para ajudar estudantes e profissionais a compreender visualmente como funcionam as principais estruturas de dados, suas operações e características através de simulações interativas e animadas.

## ✨ Funcionalidades

### 🏗️ Estruturas de Dados Implementadas

1. **Fila (Queue)** - FIFO (First In, First Out)
   - Operações: Enqueue (adicionar) e Dequeue (remover)
   - Analogia: Fila de supermercado

2. **Pilha (Stack)** - LIFO (Last In, First Out)
   - Operações: Push (empilhar) e Pop (desempilhar)
   - Analogia: Pilha de pratos

3. **Lista Encadeada Simples**
   - Operações: Inserir no início/fim, remover do início
   - Visualização de ponteiros direcionais

4. **Lista Duplamente Encadeada**
   - Operações: Inserir/remover do início e fim
   - Visualização de ponteiros bidirecionais

5. **Lista Circular**
   - Operações: Adicionar e rotacionar elementos
   - Visualização do ciclo circular

6. **Lista Estática (Array)**
   - Operações: Inserir/remover por índice
   - Tamanho fixo com visualização de espaços vazios

### 🎮 Recursos Interativos

- **Interface Responsiva**: Funciona perfeitamente em desktop e mobile
- **Animações Suaves**: Visualização clara das operações em tempo real
- **Controle de Velocidade**: Ajuste a velocidade das animações
- **Log de Operações**: Histórico detalhado de todas as ações realizadas
- **Fila de Processamento**: Sistema de fila para executar operações em sequência
- **Explicações Detalhadas**: Descrições completas de cada estrutura com:
  - Princípios de funcionamento
  - Analogias do mundo real
  - Complexidade computacional
  - Casos de uso comuns

## 🏗️ Estrutura do Projeto

```
SimuladorEstDados/
├── index.html              # Arquivo principal HTML (versão modular)
├── simuladorDados.html     # Versão monolítica (legado)
├── README.md               # Documentação
├── css/
│   └── styles.css          # Estilos customizados
└── js/
    ├── app.js              # Classe principal da aplicação
    ├── state.js            # Gerenciamento de estado
    ├── operations.js       # Operações das estruturas
    ├── ui.js               # Renderização da interface
    └── structures.js       # Configurações das estruturas
```

### 🔧 Arquitetura Modular

- **`app.js`**: Classe principal que coordena toda a aplicação
- **`state.js`**: Gerencia o estado global (elementos, fila de ações, log)
- **`operations.js`**: Implementa as operações específicas de cada estrutura
- **`ui.js`**: Responsável pela renderização e interface do usuário
- **`structures.js`**: Configurações e definições das estruturas de dados
- **`styles.css`**: Estilos customizados e animações

### 📦 Vantagens da Nova Arquitetura

- **Separação de responsabilidades**: Cada módulo tem uma função específica
- **Manutenibilidade**: Código mais fácil de modificar e expandir
- **Reutilização**: Componentes podem ser reutilizados em outros projetos
- **Testabilidade**: Módulos podem ser testados independentemente
- **Legibilidade**: Código mais organizado e fácil de entender

## 🚀 Como Usar

### Versão Modular (Recomendada)
Abra o arquivo `index.html` com um servidor local para melhor compatibilidade:

```bash
# Clone o repositório
git clone https://github.com/Ssnowzx/SimuladorEstDados.git

# Entre no diretório
cd SimuladorEstDados

# Opção 1: Python
python -m http.server 8000

# Opção 2: Node.js (live-server)
npx live-server

# Opção 3: PHP
php -S localhost:8000

# Acesse http://localhost:8000
```

### Versão Monolítica (Legado)
Para compatibilidade máxima, você pode usar `simuladorDados.html` diretamente no navegador.

## 📱 Interface do Usuário

### Painel de Controle
- **Seletor de Estrutura**: Escolha qual estrutura de dados visualizar
- **Botões de Ação**: Operações específicas para cada estrutura
- **Controle de Velocidade**: Slider para ajustar a velocidade das animações
- **Campo de Índice**: Para operações que requerem posição específica

### Área de Visualização
- **Caixa da Estrutura**: Mostra os elementos e suas conexões
- **Painel de Ação**: Exibe animações das operações em execução
- **Fila de Espera**: Lista das próximas operações a serem executadas

### Log de Operações
- Histórico completo de todas as ações realizadas
- Indicadores visuais para diferentes tipos de operações
- Limitado a 50 entradas para performance

## 🎨 Tecnologias Utilizadas

- **HTML5**: Estrutura semântica e acessível
- **CSS3**: Estilização moderna com animações suaves
- **JavaScript ES6+**: Lógica interativa e gerenciamento de estado
- **Tailwind CSS**: Framework CSS utilitário para design responsivo
- **Google Fonts**: Tipografia Inter para melhor legibilidade

## 🎯 Público-Alvo

- **Estudantes** de Ciência da Computação, Sistemas de Informação ou áreas relacionadas
- **Professores** que precisam de uma ferramenta visual para ensinar estruturas de dados
- **Desenvolvedores** que querem revisar conceitos fundamentais
- **Curiosos** interessados em aprender sobre programação e algoritmos

## 📚 Conteúdo Educacional

Cada estrutura de dados inclui:

### Explicações Teóricas
- **Princípio**: Como a estrutura funciona
- **Analogia**: Comparação com situações do cotidiano
- **Complexidade**: Análise de Big O das operações
- **Uso Comum**: Aplicações práticas no mundo real

### Exemplos Visuais
- Representação gráfica dos elementos
- Indicadores de posição (índices)
- Setas direcionais para ponteiros
- Cores diferenciadas para estados

## 🔧 Características Técnicas

- **Responsivo**: Adaptado para diferentes tamanhos de tela
- **Acessível**: Estrutura HTML semântica
- **Performance**: Otimizado para animações suaves
- **Escalável**: Código modular e extensível
- **Cross-browser**: Compatible com navegadores modernos

## 🤝 Contribuições

Contribuições são bem-vindas! Algumas ideias para melhorias:

- Novas estruturas de dados (árvores, grafos, hash tables)
- Mais operações para as estruturas existentes
- Tradução para outros idiomas
- Testes de acessibilidade
- Melhorias de performance

## 📄 Licença

Este projeto é de código aberto e está disponível sob a licença MIT.

## 👨‍💻 Autor

Desenvolvido com ❤️ para facilitar o aprendizado de estruturas de dados.

---

*Aprenda, visualize e domine as estruturas de dados fundamentais da computação!* 🚀
