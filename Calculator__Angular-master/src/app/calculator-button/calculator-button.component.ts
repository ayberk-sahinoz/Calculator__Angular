import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'calculator-button',
  standalone: true,
  template: `<button (click)="onClick()">{{ label }}</button>`,
  styleUrls: ['./calculator-button.component.scss']
})
export class CalculatorButtonComponent {
  @Input() label: string = '';
  @Output() buttonClick = new EventEmitter<string>();

  onClick() {
    this.buttonClick.emit(this.label);
  }
} 