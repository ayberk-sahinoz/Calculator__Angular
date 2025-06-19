import { Component } from '@angular/core';
import { CalculatorService } from './calculator.service';
import { CalculatorButtonComponent } from './calculator-button.component';

@Component({
  selector: 'calculator',
  standalone: true,
  imports: [CalculatorButtonComponent],
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.scss']
})
export class CalculatorComponent {
  display: string = '0';
  buttons: string[] = [
    '7', '8', '9', '/',
    '4', '5', '6', '*',
    '1', '2', '3', '-',
    '0', '.', '=', '+',
    'C'
  ];

  constructor(private calculatorService: CalculatorService) {}

  handleButtonClick(label: string) {
    if (label === 'C') {
      this.display = '';
    } else if (label === '=') {
      this.calculatorService.calculate(this.display).subscribe(res => {
        this.display = res.result;
      }, err => {
        this.display = 'Hata';
      });
    } else {
      this.display += label;
    }
  }
} 