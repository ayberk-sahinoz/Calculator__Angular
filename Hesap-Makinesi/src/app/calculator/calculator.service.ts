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

  // Güvenli hesaplama fonksiyonu (dört işlem ve ondalık destekli)
  calculateLocal(expression: string): number {
    // Sadece rakamlar, operatörler ve nokta izinli
    if (!/^[-+*/0-9.() ]+$/.test(expression)) {
      throw new Error('Geçersiz karakter');
    }
    // Çift operatörleri engelle
    if (/([+\-*/]{2,})/.test(expression)) {
      throw new Error('Geçersiz ifade');
    }
    // Parantez dengelemesi
    let stack = 0;
    for (const c of expression) {
      if (c === '(') stack++;
      if (c === ')') stack--;
      if (stack < 0) throw new Error('Parantez hatası');
    }
    if (stack !== 0) throw new Error('Parantez hatası');
    return this.simpleEval(expression);
  }

  // Basit dört işlem parser (sıralı, öncelik yok)
  private simpleEval(expr: string): number {
    while (expr.includes('(')) {
      expr = expr.replace(/\([^()]+\)/g, (sub) => this.simpleEval(sub.slice(1, -1)).toString());
    }
    let md = expr.split(/([+\-])/).map(part => part.trim());
    for (let i = 0; i < md.length; i++) {
      if (md[i].includes('*') || md[i].includes('/')) {
        let tokens = md[i].split(/([*/])/);
        let val = parseFloat(tokens[0]);
        for (let j = 1; j < tokens.length; j += 2) {
          let op = tokens[j];
          let num = parseFloat(tokens[j + 1]);
          if (op === '*') val *= num;
          if (op === '/') val /= num;
        }
        md[i] = val.toString();
      }
    }
    let result = parseFloat(md[0]);
    for (let i = 1; i < md.length; i += 2) {
      let op = md[i];
      let num = parseFloat(md[i + 1]);
      if (op === '+') result += num;
      if (op === '-') result -= num;
    }
    return result;
  }
} 




