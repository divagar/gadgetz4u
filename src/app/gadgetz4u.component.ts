import { Component, AfterViewInit } from '@angular/core';
import { HomeComponent } from './home.component';
import { ProductsComponent } from './products.component';
import { ContactComponent } from './contact.component';
import { AboutComponent } from './about.component';
import { HowdyComponent } from './howdy.component';
import { LoginComponent } from './login.component';
import { Routes, Router, ROUTER_DIRECTIVES, ROUTER_PROVIDERS } from '@angular/router';

declare var FB: any;
declare var twttr: any;

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
    path: '/login', component: LoginComponent
  },
  {
    path: '/howdy', component: HowdyComponent
  },
  {
    path: '/home', component: HomeComponent
  },
  {
    path: '/products', component: ProductsComponent
  },
  {
    path: '/products/:', component: ProductsComponent
  },
  {
    path: '/contact', component: ContactComponent
  },
  {
    path: '/about', component: AboutComponent
  },
  {
    path: '/', component: HomeComponent
  }
])

export class Gadgetz4uAppComponent implements AfterViewInit {

  public constructor(public router: Router) { };

  ngAfterViewInit() {
    //share button
    FB.XFBML.parse()
    twttr.widgets.load()
  }

  isRouteActive(path: string) {
    let currentRoute = this.router.urlTree.firstChild(this.router.urlTree.root);
    let segment = currentRoute == null ? '/' : currentRoute.segment;
    return segment == path;
  }
}