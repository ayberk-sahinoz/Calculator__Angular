import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment'; // Token buradan gelecek

const BASE_URL = 'http://s1.divlop.com:5001';

export interface TokenEntity {
  token: string;
  username: string;
  expirationTime: string;
  useCount: number;
}

export interface CalculateRequestDto {
  parameter1: number;
  parameter2?: number;
}

export interface ResultDto {
  result: number;
  operation: 'ADDITION' | 'SUBTRACTION' | 'MULTIPLICATION' | 'DIVISION' | 'SQUARE_ROOT' | 'POWER';
}

export interface HistoryEntity {
  operation: 'ADDITION' | 'SUBTRACTION' | 'MULTIPLICATION' | 'DIVISION' | 'SQUARE_ROOT' | 'POWER';
  parameter1: number;
  parameter2?: number;
  result: number;
  date: string;
}

@Injectable({ providedIn: 'root' })
export class ApiService {
  constructor(private http: HttpClient) {}

  getTokens(): Observable<TokenEntity[]> {
    return this.http.get<TokenEntity[]>(`${BASE_URL}/api/tokens`);
  }

  addToken(tokens: TokenEntity[]): Observable<boolean[]> {
    return this.http.post<boolean[]>(`${BASE_URL}/api/tokens/add`, tokens);
  }

  checkToken(token: string): Observable<boolean> {
    return this.http.get<boolean>(`${BASE_URL}/api/tokens/check/${token}`);
  }

  removeToken(token: string): Observable<boolean> {
    return this.http.delete<boolean>(`${BASE_URL}/api/tokens/remove/${token}`);
  }

  add(params: CalculateRequestDto): Observable<ResultDto> {
    return this.http.post<ResultDto>(`${BASE_URL}/api/calculator/add`, params);
  }

  subtract(params: CalculateRequestDto): Observable<ResultDto> {
    return this.http.post<ResultDto>(`${BASE_URL}/api/calculator/subtract`, params);
  }

  multiply(params: CalculateRequestDto): Observable<ResultDto> {
    return this.http.post<ResultDto>(`${BASE_URL}/api/calculator/multiply`, params);
  }

  divide(params: CalculateRequestDto): Observable<ResultDto> {
    return this.http.post<ResultDto>(`${BASE_URL}/api/calculator/divide`, params);
  }

  power(params: CalculateRequestDto): Observable<ResultDto> {
    return this.http.post<ResultDto>(`${BASE_URL}/api/calculator/power`, params);
  }

  squareRoot(params: CalculateRequestDto): Observable<ResultDto> {
    return this.http.post<ResultDto>(`${BASE_URL}/api/calculator/squareRoot`, params);
  }

  getHistory(): Observable<HistoryEntity[]> {
    return this.http.get<HistoryEntity[]>(`${BASE_URL}/api/history/getHistory`);
  }

  clearHistory(): Observable<any> {
    return this.http.delete(`${BASE_URL}/api/history/clearHistory`);
  }
}
