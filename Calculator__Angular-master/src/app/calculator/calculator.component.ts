import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService, ResultDto, HistoryEntity } from '../services/api.service';

@Component({
  selector: 'calculator',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.scss']
})
export class CalculatorComponent implements OnInit {
  display: string = '';
  showHistory: boolean = false;
  history: HistoryEntity[] = [];
  private lastOperator: string | null = null;
  private firstOperand: number | null = null;

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.loadHistory();
  }

  loadHistory() {
    this.apiService.getHistory().subscribe((data: HistoryEntity[]) => {
      this.history = data;
    });
  }

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

  useHistoryItem(item: HistoryEntity) {
    if (item.operation === 'SQUARE_ROOT') {
      this.display = `√${item.parameter1}`;
    } else if (item.parameter2 !== undefined) {
      let op = '';
      switch (item.operation) {
        case 'ADDITION': op = '+'; break;
        case 'SUBTRACTION': op = '-'; break;
        case 'MULTIPLICATION': op = '*'; break;
        case 'DIVISION': op = '/'; break;
        case 'POWER': op = '^'; break;
      }
      this.display = `${item.parameter1}${op}${item.parameter2}`;
    } else {
      this.display = `${item.parameter1}`;
    }
  }

  getOpSymbol(op: string): string {
    switch (op) {
      case 'ADDITION': return '+';
      case 'SUBTRACTION': return '-';
      case 'MULTIPLICATION': return '*';
      case 'DIVISION': return '/';
      case 'POWER': return '^';
      default: return '';
    }
  }

  formatTimestamp(date: string): string {
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
          .subscribe((res: ResultDto) => this.handleResult('ADDITION', this.firstOperand!, secondOperand!, res.result), (_: any) => this.display = 'Hata');
        break;
      case '-':
        expression = `${this.firstOperand}-${secondOperand}`;
        this.apiService.subtract({ parameter1: this.firstOperand, parameter2: secondOperand! })
          .subscribe((res: ResultDto) => this.handleResult('SUBTRACTION', this.firstOperand!, secondOperand!, res.result), (_: any) => this.display = 'Hata');
        break;
      case '*':
        expression = `${this.firstOperand}*${secondOperand}`;
        this.apiService.multiply({ parameter1: this.firstOperand, parameter2: secondOperand! })
          .subscribe((res: ResultDto) => this.handleResult('MULTIPLICATION', this.firstOperand!, secondOperand!, res.result), (_: any) => this.display = 'Hata');
        break;
      case '/':
        expression = `${this.firstOperand}/${secondOperand}`;
        this.apiService.divide({ parameter1: this.firstOperand, parameter2: secondOperand! })
          .subscribe((res: ResultDto) => this.handleResult('DIVISION', this.firstOperand!, secondOperand!, res.result), (_: any) => this.display = 'Hata');
        break;
      case '^':
        expression = `${this.firstOperand}^${secondOperand}`;
        this.apiService.power({ parameter1: this.firstOperand, parameter2: secondOperand! })
          .subscribe((res: ResultDto) => this.handleResult('POWER', this.firstOperand!, secondOperand!, res.result), (_: any) => this.display = 'Hata');
        break;
      case '√':
        expression = `√${this.firstOperand}`;
        this.apiService.squareRoot({ parameter1: this.firstOperand })
          .subscribe((res: ResultDto) => this.handleResult('SQUARE_ROOT', this.firstOperand!, undefined, res.result), (_: any) => this.display = 'Hata');
        break;
    }
    this.firstOperand = null;
    this.lastOperator = null;
  }

  private handleResult(operation: string, parameter1: number, parameter2: number | undefined, result: number) {
    this.display = result.toString();
    const historyItem: HistoryEntity = {
      operation: operation as any,
      parameter1,
      parameter2,
      result,
      date: new Date().toISOString()
    };
    this.apiService.addHistory(historyItem).subscribe(() => {
      this.loadHistory();
    });
  }
} 