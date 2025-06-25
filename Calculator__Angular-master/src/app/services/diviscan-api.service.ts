import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const BASE_URL = 'http://s1.divlop.com:5001';

@Injectable({ providedIn: 'root' })
export class DiviscanApiService {
  constructor(private http: HttpClient) {}

  getAccountAddress(account: string): Observable<any> {
    return this.http.get(`${BASE_URL}/accountaddress/${account}`);
  }

  getAccountDetails(account?: string): Observable<any> {
    return this.http.get(`${BASE_URL}/account-details/${account || ''}`);
  }

  getAddress(address: string): Observable<any> {
    return this.http.get(`${BASE_URL}/address/${address}`);
  }

  getAddressUtxos(address: string): Observable<any> {
    return this.http.get(`${BASE_URL}/address_utxos/${address}`);
  }

  getAddrsByAccount(account: string): Observable<any> {
    return this.http.get(`${BASE_URL}/addrsbyaccount/${account}`);
  }

  getBalance(account: string): Observable<any> {
    return this.http.get(`${BASE_URL}/balance/${account}`);
  }

  getBlock(hash: string): Observable<any> {
    return this.http.get(`${BASE_URL}/block/${hash}`);
  }

  getBlockCount(): Observable<any> {
    return this.http.get(`${BASE_URL}/blockcount`);
  }

  getConnectionCount(): Observable<any> {
    return this.http.get(`${BASE_URL}/connectioncount`);
  }

  decodeRawTx(hex: string): Observable<any> {
    return this.http.get(`${BASE_URL}/decode-raw-tx/${hex}`);
  }

  getAccountByAddress(address: string): Observable<any> {
    return this.http.get(`${BASE_URL}/getaccount/${address}`);
  }

  getReceived(address: string): Observable<any> {
    return this.http.get(`${BASE_URL}/getreceived/${address}`);
  }

  getInfo(): Observable<any> {
    return this.http.get(`${BASE_URL}/info`);
  }

  getMasternodes(): Observable<any> {
    return this.http.get(`${BASE_URL}/masternodes`);
  }

  createNewAddress(account: string): Observable<any> {
    return this.http.get(`${BASE_URL}/newaddress/${account}`);
  }

  getPrice(): Observable<any> {
    return this.http.get(`${BASE_URL}/price`);
  }

  sendFrom(from: string, to: string, amount: number): Observable<any> {
    return this.http.get(`${BASE_URL}/sendfrom/${from}/${to}/${amount}`);
  }

  getTx(txid: string): Observable<any> {
    return this.http.get(`${BASE_URL}/tx/${txid}`);
  }
} 