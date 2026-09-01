import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductosServices {
    constructor(
        private httpclient: HttpClient
    ) { }

    getProductos(): Observable<any> {
        return this.httpclient.get('http://localhost:4000/productos/getall');
    }

    editarproducto(producto: any): Observable<any> {
        return this.httpclient.post('http://localhost:4000/productos/save', producto);
    }
}
