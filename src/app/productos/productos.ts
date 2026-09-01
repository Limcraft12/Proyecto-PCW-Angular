import { Component, signal } from '@angular/core';
import { ProductosServices } from './productos.services';
import { take } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Producto {
  id: number;
  nombre: string;
}

@Component({
  selector: 'app-productos',
  imports: [CommonModule,FormsModule],
  template: `
    <h2>{{ title() }}</h2>
    <ul>
      @for (item of data(); track item.id) {
        <li>{{ item.nombre }}</li>
      }
    </ul>
  `,
  styles: [
    `
      h2 { margin-bottom: 1rem; }
      ul { padding-left: 1.25rem; }
    `,
  ],
})
export class Productos {
  protected readonly title = signal('gracias por su compra');
  public readonly data = signal<Producto[]>([]);
  public productocrear = {
    descripcion: '',
    precio: 0,
  };

  constructor(private productosServices: ProductosServices) {
    this.getproductos();
  }

  getproductos() {
    this.productosServices.getProductos()
      .pipe(take(1))
      .subscribe((data: any) => {
        const productos = data as Producto[];
        console.log(productos);
        this.data.set(productos);
      });
  }
  crearproducto(){

    console.log(this.productocrear)
    this.productosServices.crearproducto(this.productocrear).pipe(take(1)).subscribe((res:  any)=>{
      console.log(res)
      this.getproductos()
      this.productocrear = {
        descripcion: '',
        precio: 0
      }
    })
  }

  public productoEditar: any = {
    id_producto: 0,
    descripcion: '',
    precio: 0,
  };

  setproducto(producto: any) {
    this.productoEditar = {
      id_producto: producto.id_producto,
      descripcion: producto.descripcion,
      precio: producto.precio,
    };
  }
}
