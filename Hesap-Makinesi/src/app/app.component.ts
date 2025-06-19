import { Component } from '@angular/core';
import { CalculatorComponent } from './calculator/calculator.component';
import { HistoryComponent } from './calculator/history.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CalculatorComponent, HistoryComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {} 