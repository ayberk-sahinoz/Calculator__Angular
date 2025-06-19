import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalculatorService, CalculationHistory } from './calculator.service';

@Component({
  selector: 'history',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit {
  history: CalculationHistory[] = [];

  constructor(private calculatorService: CalculatorService) {}

  ngOnInit() {
    this.calculatorService.getHistory().subscribe(data => {
      this.history = data;
    });
  }
} 