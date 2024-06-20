import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'app';
  constructor(private router: Router) {}
  isNotHomePage(): boolean {
    return (this.router.url as string) !== '/';
  }
}
