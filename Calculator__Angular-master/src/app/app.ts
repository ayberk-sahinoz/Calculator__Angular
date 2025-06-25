import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CalculatorComponent } from './calculator/calculator.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, CalculatorComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected title = 'Hesap-Makinesi';
  protected display: string = '';
  protected history: { expression: string; result: string; timestamp: Date }[] = [];
  protected showHistory: boolean = false;

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
    console.log('calculateeeee');
    try {
      const expression = this.display;
      // Basit ve güvenli bir local eval fonksiyonu
      // Sadece dört işlem ve parantez destekliyor
      // Güvenlik için sadece rakamlar, operatörler ve parantez izinli
      if (!/^[-+*/0-9.() ]+$/.test(expression)) throw new Error('Geçersiz karakter');
      // Çift operatörleri engelle
      if (/([+\-*/]{2,})/.test(expression)) throw new Error('Geçersiz ifade');
      // Parantez dengelemesi
      let stack = 0;
      for (const c of expression) {
        if (c === '(') stack++;
        if (c === ')') stack--;
        if (stack < 0) throw new Error('Parantez hatası');
      }
      if (stack !== 0) throw new Error('Parantez hatası');
      // eslint-disable-next-line no-eval
      const result = Function(`"use strict";return (${expression})`)();
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

  protected useHistoryItem(item: { expression: string }): void {
    this.display = item.expression;
  }

  protected formatTimestamp(date: Date): string {
    return date.toLocaleTimeString();
  }
}
