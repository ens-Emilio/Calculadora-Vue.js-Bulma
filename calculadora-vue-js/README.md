# Calculadora Vue + Bulma

Projeto de uma calculadora moderna feita com Vue 3 (Composition API), Bulma e JavaScript puro.

## Estrutura

- `src/components` — componentes Vue (display, botões, teclado, histórico)
- `src/composables` — lógica reutilizável (`useCalculator`, `useKeyboard`)
- `src/utils` — função `safeEvaluate` e `parser`
- `src/styles.css` — estilos adicionais

## Executar localmente

Pré-requisitos: `pnpm` (ou `npm`/`yarn`).

Instalar dependências:

```bash
pnpm install
```

Iniciar servidor de desenvolvimento:

```bash
pnpm dev
```

## Build

```bash
pnpm build
pnpm preview
```

## Commit & Push

Este repositório pode ser inicializado localmente e comitado. Se quiser enviar para um remote, adicione o `remote` e faça push:

```bash
git remote add origin <URL-do-repositório>
git push -u origin main
```

## Notas

- A avaliação de expressões usa um sanitizador básico (`src/utils/parser.js`) e `Function` para avaliação controlada; não exponha entradas não confiáveis em produção.
- Ajuste `jsconfig.json` se usar caminhos personalizados.

---
Feito com ❤️ — pronto para personalizar e melhorar (modo científico, temas, testes).
# Calculadora Vue.js + Bulma

## English

### Overview
This is a responsive calculator web application built with Vue.js 3 and Bulma CSS framework. It features light, dark, and colorful themes with smooth neumorphic/glassmorphic effects, history panel, memory buttons, and keyboard support.

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/ens-Emilio/Calculadora-Vue.js-Bulma.git
   cd Calculadora-Vue.js-Bulma
   ```
2. Serve locally:
   ```bash
   npx serve -l 5173
   ```

### Usage
- Switch themes using the dropdown (Claro, Escuro, Colorido).
- Use buttons or keyboard (numbers, +, -, *, /, Enter, C, %, etc.).
- Memory functions: MC, MR, M+, M-.
- History panel displays past operations; click to reuse a result.

### Code Structure
- `index.html`: HTML layout, Vue mount point, theme binding.
- `style.css`: Custom CSS variables per theme, neumorphic/glass effects, responsive grid, title styling via CSS variables.
- `main.js`: Vue application logic, data properties (display, theme, history, memory), methods for input handling, calculations, keyboard events, and theme watch.

## Português

### Visão Geral
Aplicativo de calculadora responsiva desenvolvido com Vue.js 3 e Bulma CSS. Possui temas claro, escuro e colorido com efeitos neumórficos/glassmórficos, painel de histórico, botões de memória e suporte a teclado.

### Instalação
1. Clone o repositório:
   ```bash
   git clone https://github.com/ens-Emilio/Calculadora-Vue.js-Bulma.git
   cd Calculadora-Vue.js-Bulma
   ```
2. Inicie localmente:
   ```bash
   npx serve -l 5173
   ```

### Uso
- Alterne temas via dropdown (Claro, Escuro, Colorido).
- Use botões ou teclado (números, +, -, *, /, Enter, C, %, etc.).
- Funções de memória: MC, MR, M+, M-.
- Painel de histórico mostra operações; clique para reutilizar resultado.

### Estrutura de Código
- `index.html`: layout HTML, ponto de montagem Vue, binding de tema.
- `style.css`: variáveis CSS por tema, efeitos neumórficos/glass, grid responsiva, estilo do título via variáveis.
- `main.js`: lógica Vue, propriedades de dados (display, tema, histórico, memória), métodos de tratamento de entrada, cálculos, eventos de teclado e watch de tema.

## Español

### Descripción General
Aplicación de calculadora responsive construida con Vue.js 3 y Bulma CSS. Incluye temas claro, oscuro y colorido con efectos neumórficos/glassmórficos, panel de historial, botones de memoria y soporte de teclado.

### Instalación
1. Clona el repositorio:
   ```bash
   git clone https://github.com/ens-Emilio/Calculadora-Vue.js-Bulma.git
   cd Calculadora-Vue.js-Bulma
   ```
2. Servir localmente:
   ```bash
   npx serve -l 5173
   ```

### Uso
- Cambia temas desde el dropdown (Claro, Oscuro, Colorido).
- Usa botones o teclado (números, +, -, *, /, Enter, C, %, etc.).
- Funciones de memoria: MC, MR, M+, M-.
- El panel de historial muestra operaciones anteriores; haz clic para reutilizar un resultado.

### Estructura de Código
- `index.html`: diseño HTML, punto de montaje de Vue, binding de tema.
- `style.css`: variables CSS por tema, efectos neumórficos/glass, grid responsivo, estilo del título con variables.
- `main.js`: lógica de la aplicación Vue, propiedades de datos (display, tema, historial, memoria), métodos para manejar entrada, cálculos, eventos de teclado y watch de tema.

---

Licensed under the MIT License.

© 2025 ens-Emilio.

*This project is under development and open for improvements and contributions.*
# calculadora-vue-js

This template should help get you started developing with Vue 3 in Vite.

## Recommended IDE Setup

[VS Code](https://code.visualstudio.com/) + [Vue (Official)](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Recommended Browser Setup

- Chromium-based browsers (Chrome, Edge, Brave, etc.):
  - [Vue.js devtools](https://chromewebstore.google.com/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd)
  - [Turn on Custom Object Formatter in Chrome DevTools](http://bit.ly/object-formatters)
- Firefox:
  - [Vue.js devtools](https://addons.mozilla.org/en-US/firefox/addon/vue-js-devtools/)
  - [Turn on Custom Object Formatter in Firefox DevTools](https://fxdx.dev/firefox-devtools-custom-object-formatters/)

## Customize configuration

See [Vite Configuration Reference](https://vite.dev/config/).

## Project Setup

```sh
pnpm install
```

### Compile and Hot-Reload for Development

```sh
pnpm dev
```

### Compile and Minify for Production

```sh
pnpm build
```
