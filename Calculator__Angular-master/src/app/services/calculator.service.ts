import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class CalculatorService {
  constructor(private apiService: ApiService) {}

  calculate(expression: string): Observable<string> {
    // İşlemi ve operandları ayıkla
    const match = expression.match(/(-?\d+(?:\.\d+)?)([+\-*/^√])(-?\d+(?:\.\d+)?)?/);
    if (!match) return of('Hata');
    const operand1 = parseFloat(match[1]);
    const operator = match[2];
    const operand2 = match[3] ? parseFloat(match[3]) : undefined;

    switch (operator) {
      case '+':
        return this.apiService.add({ parameter1: operand1, parameter2: operand2 }).pipe(
          map(res => res.result.toString()),
          catchError(() => of('Hata'))
        );
      case '-':
        return this.apiService.subtract({ parameter1: operand1, parameter2: operand2 }).pipe(
          map(res => res.result.toString()),
          catchError(() => of('Hata'))
        );
      case '*':
        return this.apiService.multiply({ parameter1: operand1, parameter2: operand2 }).pipe(
          map(res => res.result.toString()),
          catchError(() => of('Hata'))
        );
      case '/':
        return this.apiService.divide({ parameter1: operand1, parameter2: operand2 }).pipe(
          map(res => res.result.toString()),
          catchError(() => of('Hata'))
        );
      case '^':
        return this.apiService.power({ parameter1: operand1, parameter2: operand2 }).pipe(
          map(res => res.result.toString()),
          catchError(() => of('Hata'))
        );
      case '√':
        return this.apiService.squareRoot({ parameter1: operand1 }).pipe(
          map(res => res.result.toString()),
          catchError(() => of('Hata'))
        );
      default:
        return of('Hata');
    }
  }
} 