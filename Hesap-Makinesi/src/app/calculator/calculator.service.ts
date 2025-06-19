import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface CalculationHistory {
  expression: string;
  result: string;
  timestamp: Date;
}

@Injectable({ providedIn: 'root' })
export class CalculatorService {
  private apiUrl = 'http://localhost:3000'; // API adresiniz

  constructor(private http: HttpClient) {}

  calculate(expression: string): Observable<{ result: string }> {
    return this.http.post<{ result: string }>(`${this.apiUrl}/calculate`, { expression });
  }

  getHistory(): Observable<CalculationHistory[]> {
    return this.http.get<CalculationHistory[]>(`${this.apiUrl}/history`);
  }
} 