import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService, HistoryEntity } from '../services/api.service';

@Component({
  selector: 'history',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit {
  history: HistoryEntity[] = [];

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.apiService.getHistory().subscribe((data: HistoryEntity[]) => {
      this.history = data;
    });
  }
} 