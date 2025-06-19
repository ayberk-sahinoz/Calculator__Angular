import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CalculatorService } from './calculator/calculator.service';

interface CalculationHistory {
  expression: string;
  result: string;
  timestamp: Date;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected title = 'Hesap-Makinesi';
  protected display: string = '';
  protected history: CalculationHistory[] = [];
  protected showHistory: boolean = false;

  constructor(private calculatorService: CalculatorService) {}

  protected appendOperatorToDisplay(operator: string): void {
    if (this.display === '') {
      this.display = operator;
    } else {
      const lastChar = this.display.slice(-1);
      const operators = ['+', '-', '*', '/'];

      if (operators.includes(lastChar)) {
        this.display = this.display.slice(0, -1) + operator;
      } else {
        this.display += operator;
      }
    }
  }

  calculateSqrt(): void {
    const value = parseFloat(this.display);
    if (!isNaN(value)) this.display = Math.sqrt(value).toString();
  }

  protected appendToDisplay(value: string): void {
    this.display += value;
  }

  protected clear(): void {
    this.display = '';
  }

  protected backspace(): void {
    this.display = this.display.slice(0, -1);
  }

  protected calculate(): void {
    try {
      const expression = this.display;
      const result = this.calculatorService.calculateLocal(expression);
      this.display = result.toString();
      this.history.unshift({
        expression: expression,
        result: result.toString(),
        timestamp: new Date()
      });
      if (this.history.length > 10) {
        this.history.pop();
      }
    } catch (error) {
      this.display = 'Hata';
      setTimeout(() => {
        this.clear();
      }, 1000);
    }
  }

  protected toggleHistory(): void {
    this.showHistory = !this.showHistory;
  }

  protected useHistoryItem(item: CalculationHistory): void {
    this.display = item.expression;
  }

  protected formatTimestamp(date: Date): string {
    return date.toLocaleTimeString();
  }
}
