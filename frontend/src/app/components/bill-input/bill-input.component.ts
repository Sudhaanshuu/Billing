import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-bill-input',
  templateUrl: './bill-input.component.html',
  styleUrls: ['./bill-input.component.scss']
})
export class BillInputComponent {
  items = [
    { id: 1, name: 'Chicken Biryani', quantity: 4, price: 395, shared: false },
    { id: 2, name: 'Apple Milkshake', quantity: 1, price: 355, shared: false },
    { id: 3, name: 'Penne Pasta Veg', quantity: 1, price: 375, shared: false },
    { id: 4, name: 'Veg Biryani', quantity: 1, price: 325, shared: false },
    { id: 5, name: 'French Fries', quantity: 2, price: 175, shared: true },
    { id: 6, name: 'Water', quantity: 5, price: 20, shared: true }
  ];

  people = [
    { name: 'Person A', items: [1] },
    { name: 'Person B', items: [1] },
    { name: 'Person C', items: [1] },
    { name: 'Person D', items: [1] },
    { name: 'Person E', items: [3] },
    { name: 'Person F', items: [2, 4] }
  ];

  result: any;

  constructor(private http: HttpClient) {}

  calculateBill() {
    this.http.post('http://localhost:3000/calculate', { items: this.items, people: this.people })
      .subscribe(res => {
        this.result = res;
      });
  }
}
