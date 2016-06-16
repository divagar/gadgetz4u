import { Component } from '@angular/core';
import { HomeComponent } from './home.component';
import { ProductsComponent } from './products.component';
import { ContactComponent } from './contact.component';
import { AboutComponent } from './about.component';
import { HowdyComponent } from './howdy.component';
import { Routes, Router, ROUTER_DIRECTIVES, ROUTER_PROVIDERS } from '@angular/router';

@Component({
  moduleId: module.id,
  selector: 'gadgetz4u',
  templateUrl: 'gadgetz4u.component.html',
  styleUrls: ['gadgetz4u.component.css'],
  directives: [ROUTER_DIRECTIVES],
  providers: [ROUTER_PROVIDERS]
})

@Routes([
  {
    path: '/', component: HomeComponent
  },
  {
    path: '/home', component: HomeComponent
  },
  {
    path: '/products', component: ProductsComponent
  },
  {
    path: '/contact', component: ContactComponent
  },
  {
    path: '/about', component: AboutComponent
  },
  {
    path: '/howdy', component: HowdyComponent
  }
])

export class Gadgetz4uAppComponent {

  public constructor(public router: Router) { };


}