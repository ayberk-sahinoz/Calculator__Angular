import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-calculator',
  standalone: true,
  imports: [CommonModule], 
  templateUrl: './calculator.html',
  styleUrls: ['./calculator.scss']
})

export class CalculatorComponent {
  expression: string = '';
  buttons: string[][] = [
    ['C', '←', '+/-', '/'],
    ['7', '8', '9', '×'],
    ['4', '5', '6', '−'],
    ['1', '2', '3', '+'],
    ['Geçmişi Göster', '0', '=']
  ];

  press(value: string) {
    if (value === 'C') {
      this.expression = '';
    } else if (value === '=') {
      this.calculate();
    } else if (value === '←') {
      this.expression = this.expression.slice(0, -1);
    } else if (value === '+/-') {
      if (this.expression) {
        if (this.expression.startsWith('-')) {
          this.expression = this.expression.slice(1);
        } else {
          this.expression = '-' + this.expression;
        }
      }
    } else if (value === 'Geçmişi Göster') {
      alert('Geçmiş gösterilecek!');
    } else {
      this.expression += value.replace('×', '*').replace('−', '-');
    }
  }

  calculate() {
    try {
      this.expression = this.safeEval(this.expression);
    } catch (e) {
      this.expression = 'HATA';
    }
  }

  safeEval(expr: string): string {
    if (!/^[0-9+\-*/().\s]+$/.test(expr)) return 'HATA';
    try {
      expr = expr.replace(/×/g, '*').replace(/−/g, '-');
      return (new Function('return ' + expr))().toString();
    } catch {
      return 'HATA';
    }
  }
} 