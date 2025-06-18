import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

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
      const result = Function('"use strict";return (' + expression + ')')();
      this.display = result.toString();
      
      // Geçmişe ekle
      this.history.unshift({
        expression: expression,
        result: result.toString(),
        timestamp: new Date()
      });

      // Geçmişi 10 işlemle sınırla
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
