import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { interval, timer } from 'rxjs';

interface Coin {
  id: string;
  name: string;
  symbol: string;
  image: string;
  current_price: number;
  price_change_percentage_24h: number;
  
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  coins: Coin[] = [];
  titles: string[] = ['#', 'Coin', 'Price', 'Price_Change', 'Price'];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    
    setInterval(() => {
      this.http
      .get<Coin[]>(
        'https://api.coingecko.com/api/v3/coins/markets?vs_currency=eur&order=market_cap_desc&per_page=100&page=1&sparkline=false'
      )
      .subscribe(
        (res) => {
          console.log(res);
          this.coins = res;

          this.coins.splice(20, this.coins.length)
          // console.log(this.coins);
        },
        (err) => console.log(err)
      );
    },10000);
    
  }
}
