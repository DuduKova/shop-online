import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs'
import {Company} from "../_models";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private citiesSubject = new BehaviorSubject(['Tel Aviv','Afula','Haifa','Jerusalem','Lod','Ramat Gan','Beersheba','Nazareth Illit','Holon']);
  cities = this.citiesSubject.asObservable();

  private imgsSubject = new BehaviorSubject([]);
  imgs = this.citiesSubject.asObservable();

  constructor() { }

  changeCities(cities) {
    this.citiesSubject.next(cities);
  }
}

//
//
// getAll() {
//   return this.http.get<Company[]>('http://localhost:3000/companies')
//     .pipe(map((companies) => {
//       localStorage.setItem('companies', JSON.stringify(companies));
//       this.companiesSubject.next(companies);
//       companies.map((company , index) => {
//         this.products.push(companies[index].products);
//         console.log(this.products);
//         this.productService.changeAllProducts(this.products);
//       })
//     }));
// }
