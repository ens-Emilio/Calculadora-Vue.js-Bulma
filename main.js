const { createApp } = Vue;

createApp({
  data() {
    return {
      theme: 'theme-light',
      display: '0',
      current: '',
      operator: null,
      operand: null,
      waitingForOperand: false,
      error: false,
      memoryButtons: [
        { text: 'MC', title: 'Limpar memória (Shift+C)' },
        { text: 'MR', title: 'Recuperar memória (M)' },
        { text: 'M+', title: 'Adicionar à memória (Shift+M)' },
        { text: 'M-', title: 'Subtrair da memória (Shift+N)' },
      ],
      buttons: [
        { text: '7' }, { text: '8' }, { text: '9' },
        { text: '4' }, { text: '5' }, { text: '6' },
        { text: '1' }, { text: '2' }, { text: '3' },
      ],
      activeOperator: null,
      pressedButton: null,
      history: [], // histórico de operações
      lastResult: '',
      animateDisplay: false,
      memory: 0,
    }
  },
  computed: {
    gridButtons() {
      // Ordem: 7 8 9 4 5 6 1 2 3 0
      return [
        { text: '7' }, { text: '8' }, { text: '9' },
        { text: '4' }, { text: '5' }, { text: '6' },
        { text: '1' }, { text: '2' }, { text: '3' },
        { text: '0', style: 'grid-column: 1 / span 2;' },
      ];
    },
    operationDisplay() {
      if (this.operator && this.operand != null && !this.error) {
        return `${this.operand} ${this.operator}`;
      }
      return '';
    }
  },
  mounted() {
    window.addEventListener('keydown', this.handleKey);
    // Foco automático para garantir captura de teclas
    if (document && document.body) {
      document.body.tabIndex = 0;
      document.body.focus();
    }
    // Garantir tema no body ao iniciar
    document.body.classList.remove('theme-light', 'theme-dark', 'theme-color');
    document.body.classList.add(this.theme);
  },
  watch: {
    theme(newTheme, oldTheme) {
      document.body.classList.remove('theme-light', 'theme-dark', 'theme-color');
      document.body.classList.add(newTheme);
    },
  },
  beforeUnmount() {
    window.removeEventListener('keydown', this.handleKey);
  },
  methods: {
    handleKey(e) {
      const key = e.key;
      if (!isNaN(key) && key !== ' ') {
        this.press(key);
      } else if (["+", "-", "*", "/"].includes(key)) {
        this.press(key);
      } else if (key === "Enter" || key === "=") {
        this.press("=");
      } else if (key === "Backspace" || key.toLowerCase() === 'c' || key === "Escape") {
        this.press("C");
      } else if (key === ".") {
        // Suporte a ponto decimal
        if (!this.current.includes('.')) {
          this.current = this.current ? this.current + '.' : '0.';
          this.display = this.current;
        }
      } else if (key === "%" || (key === '5' && e.shiftKey)) {
        this.press('%');
      } else if (key.toLowerCase() === 'm' && !e.shiftKey) {
        this.press('MR');
      } else if (key.toLowerCase() === 'm' && e.shiftKey) {
        this.press('M+');
      } else if (key.toLowerCase() === 'n' && e.shiftKey) {
        this.press('M-');
      } else if (key.toLowerCase() === 'c' && e.shiftKey) {
        this.press('MC');
      } else if (key === "Delete") {
        this.clearHistory();
      } else if (key === "ArrowUp") {
        // Recupera último resultado
        if (this.lastResult) {
          this.current = this.lastResult;
          this.display = this.lastResult;
          this.error = false;
        }
      }
    },
    press(text) {
      if (this.error && !["C", "c"].includes(text)) {
        return; // Bloqueia entrada se erro, exceto limpar
      }
      this.pressedButton = text;
      setTimeout(() => this.pressedButton = null, 120);
      if (!isNaN(text)) {
        if (this.waitingForOperand) {
          this.current = text;
          this.waitingForOperand = false;
        } else {
          this.current = this.current === '0' ? text : this.current + text;
        }
        this.display = this.current;
        this.error = false;
        this.activeOperator = null;
      } else if (["+", "-", "*", "/"].includes(text)) {
        if (this.operator && !this.waitingForOperand) {
          this.calculate();
        } else {
          this.operand = parseFloat(this.current || this.display);
        }
        this.operator = text;
        this.activeOperator = text;
        this.waitingForOperand = true;
        // Feedback visual: exibe operação em andamento
        this.display = this.current || this.display;
      } else if (text === "%") {
        // Porcentagem: divide valor atual por 100
        if (this.current) {
          this.current = (parseFloat(this.current) / 100).toString();
          this.display = this.current;
          this.animateDisplayFeedback();
        } else if (this.display && !isNaN(this.display)) {
          this.display = (parseFloat(this.display) / 100).toString();
          this.current = this.display;
          this.animateDisplayFeedback();
        }
      } else if (text === "=") {
        this.calculate();
        this.operator = null;
        this.activeOperator = null;
      } else if (text === "C") {
        this.clear();
      } else if (text === "MC") {
        this.memory = 0;
        this.animateDisplayFeedback();
      } else if (text === "MR") {
        this.current = this.memory.toString();
        this.display = this.memory.toString();
        this.error = false;
        this.animateDisplayFeedback();
      } else if (text === "M+") {
        if (!isNaN(this.display)) {
          this.memory += parseFloat(this.display);
          this.animateDisplayFeedback();
        }
      } else if (text === "M-") {
        if (!isNaN(this.display)) {
          this.memory -= parseFloat(this.display);
          this.animateDisplayFeedback();
        }
      } else if (text === "-") {
        // Suporte a número negativo
        if (!this.current && !this.operator) {
          this.current = '-';
          this.display = '-';
        }
      }
      // Limita casas decimais
      if (!isNaN(this.display) && this.display.includes('.')) {
        this.display = parseFloat(this.display).toFixed(6).replace(/\.?0+$/, '');
      }
    },
    calculate() {
      const curr = parseFloat(this.current || this.display);
      if (this.operator && this.operand != null) {
        let result = 0;
        let operationStr = `${this.operand} ${this.operator} ${curr}`;
        switch (this.operator) {
          case '+': result = this.operand + curr; break;
          case '-': result = this.operand - curr; break;
          case '*': result = this.operand * curr; break;
          case '/':
            if (curr === 0) {
              this.display = 'Erro: ÷ 0';
              this.error = true;
              this.current = '';
              this.operand = null;
              this.waitingForOperand = false;
              this.history.push(`${operationStr} = Erro`);
              this.lastResult = '';
              this.animateDisplayFeedback();
              return;
            } else {
              result = this.operand / curr;
            }
            break;
        }
        // Limita casas decimais
        if (!Number.isInteger(result)) {
          result = parseFloat(result.toFixed(6));
        }
        this.display = String(result);
        this.current = String(result);
        this.operand = result;
        this.waitingForOperand = true;
        this.error = false;
        this.history.push(`${operationStr} = ${result}`);
        this.lastResult = result;
        this.animateDisplayFeedback();
      }
    },
    clear() {
      this.display = '0';
      this.current = '';
      this.operator = null;
      this.operand = null;
      this.waitingForOperand = false;
      this.error = false;
      this.activeOperator = null;
      // Não limpa histórico ao limpar visor
      this.animateDisplayFeedback();
    },
    clearHistory() {
      this.history = [];
    },
    copyResult() {
      if (!this.error && this.display) {
        navigator.clipboard.writeText(this.display);
        this.animateDisplayFeedback();
      }
    },
    reuseResult(item) {
      // Usa o resultado do histórico (após o '=')
      const match = item.match(/=\s*(-?\d+(?:\.\d+)?)/);
      if (match) {
        this.current = match[1];
        this.display = match[1];
        this.error = false;
        this.animateDisplayFeedback();
      }
    },
    animateDisplayFeedback() {
      this.animateDisplay = false;
      this.$nextTick(() => {
        this.animateDisplay = true;
        setTimeout(() => (this.animateDisplay = false), 350);
      });
    }
  }
}).mount('#app');
