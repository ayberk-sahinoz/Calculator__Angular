import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService, ResultDto } from '../services/api.service';

@Component({
  selector: 'calculator',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.scss']
})
export class CalculatorComponent {
  display: string = '';
  showHistory: boolean = false;
  history: { expression: string; result: string; timestamp: Date }[] = [];
  private lastOperator: string | null = null;
  private firstOperand: number | null = null;

  constructor(private apiService: ApiService) {}

  clear() {
    this.display = '';
    this.firstOperand = null;
    this.lastOperator = null;
  }

  backspace() {
    this.display = this.display.slice(0, -1);
  }

  appendOperatorToDisplay(op: string) {
    if (this.display && !isNaN(Number(this.display))) {
      this.firstOperand = parseFloat(this.display);
      this.display = '';
      this.lastOperator = op;
    }
  }

  appendToDisplay(val: string) {
    this.display += val;
  }

  calculate() {
    if (this.lastOperator && this.firstOperand !== null) {
      this.calculateWithApi();
    }
  }

  calculateSqrt() {
    if (this.display && !isNaN(Number(this.display))) {
      this.firstOperand = parseFloat(this.display);
      this.lastOperator = '√';
      this.calculateWithApi();
    }
  }

  toggleHistory() {
    this.showHistory = !this.showHistory;
  }

  useHistoryItem(item: { expression: string; result: string; timestamp: Date }) {
    this.display = item.expression;
  }

  formatTimestamp(date: Date): string {
    const d = new Date(date);
    return d.toLocaleString('tr-TR');
  }

  handleButtonClick(label: string) {
    if (label === 'C') {
      this.clear();
    } else if (label === '=') {
      this.calculate();
    } else if (['+', '-', '*', '/', '^'].includes(label)) {
      this.appendOperatorToDisplay(label);
    } else if (label === '√') {
      this.calculateSqrt();
    } else {
      this.appendToDisplay(label);
    }
  }

  private calculateWithApi() {
    if (this.firstOperand === null || !this.lastOperator) return;
    const secondOperand = this.display ? parseFloat(this.display) : undefined;
    let expression = '';
    switch (this.lastOperator) {
      case '+':
      case '-':
      case '*':
      case '/':
      case '^':
        if (secondOperand === undefined || isNaN(secondOperand)) {
          this.display = 'Hata';
          this.firstOperand = null;
          this.lastOperator = null;
          return;
        }
        break;
    }
    switch (this.lastOperator) {
      case '+':
        expression = `${this.firstOperand}+${secondOperand}`;
        this.apiService.add({ parameter1: this.firstOperand, parameter2: secondOperand! })
          .subscribe((res: ResultDto) => this.handleResult(expression, res.result), (_: any) => this.display = 'Hata');
        break;
      case '-':
        expression = `${this.firstOperand}-${secondOperand}`;
        this.apiService.subtract({ parameter1: this.firstOperand, parameter2: secondOperand! })
          .subscribe((res: ResultDto) => this.handleResult(expression, res.result), (_: any) => this.display = 'Hata');
        break;
      case '*':
        expression = `${this.firstOperand}*${secondOperand}`;
        this.apiService.multiply({ parameter1: this.firstOperand, parameter2: secondOperand! })
          .subscribe((res: ResultDto) => this.handleResult(expression, res.result), (_: any) => this.display = 'Hata');
        break;
      case '/':
        expression = `${this.firstOperand}/${secondOperand}`;
        this.apiService.divide({ parameter1: this.firstOperand, parameter2: secondOperand! })
          .subscribe((res: ResultDto) => this.handleResult(expression, res.result), (_: any) => this.display = 'Hata');
        break;
      case '^':
        expression = `${this.firstOperand}^${secondOperand}`;
        this.apiService.power({ parameter1: this.firstOperand, parameter2: secondOperand! })
          .subscribe((res: ResultDto) => this.handleResult(expression, res.result), (_: any) => this.display = 'Hata');
        break;
      case '√':
        expression = `√${this.firstOperand}`;
        this.apiService.squareRoot({ parameter1: this.firstOperand })
          .subscribe((res: ResultDto) => this.handleResult(expression, res.result), (_: any) => this.display = 'Hata');
        break;
    }
    this.firstOperand = null;
    this.lastOperator = null;
  }

  private handleResult(expression: string, result: number) {
    this.display = result.toString();
    this.history.unshift({ expression, result: result.toString(), timestamp: new Date() });
    if (this.history.length > 10) this.history.pop();
  }
} 