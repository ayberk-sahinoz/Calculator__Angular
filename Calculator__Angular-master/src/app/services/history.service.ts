import { Injectable } from '@angular/core';

export interface CalculationHistory {
  expression: string;
  result: string;
  timestamp: Date;
}

@Injectable({ providedIn: 'root' })
export class HistoryService {
  private history: CalculationHistory[] = [];

  getHistory(): CalculationHistory[] {
    return this.history;
  }

  addHistory(item: CalculationHistory): void {
    this.history.unshift(item);
    if (this.history.length > 10) {
      this.history.pop();
    }
  }

  clearHistory(): void {
    this.history = [];
  }
} 