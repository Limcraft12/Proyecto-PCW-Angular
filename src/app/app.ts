import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
titulo() {
throw new Error('Method not implemented.');
}
  protected readonly title = signal('GESTIÓN DE CLIENTES');
}
