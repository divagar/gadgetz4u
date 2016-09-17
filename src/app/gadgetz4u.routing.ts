import { HomeComponent } from './home.component';
import { ProductsComponent } from './products.component';
import { ContactComponent } from './contact.component';
import { AboutComponent } from './about.component';
import { HowdyComponent } from './howdy.component';
import { LoginComponent } from './login.component';
import { Routes, RouterModule } from '@angular/router';

const gadgetz4uRoutes: Routes = [
  {
    path: 'login', component: LoginComponent
  },
  {
    path: 'howdy', component: HowdyComponent
  },
  {
    path: 'home', component: HomeComponent
  },
  {
    path: 'products', component: ProductsComponent
  },
  {
    path: 'products/**', component: ProductsComponent
  },
  {
    path: 'contact', component: ContactComponent
  },
  {
    path: 'about', component: AboutComponent
  },
  {
    path: '', component: HomeComponent
  },
  {
    path: '**', component: HomeComponent
  }
];

export const gadgetz4uRoutingProviders: any[] = [

];

export const routing = RouterModule.forRoot(gadgetz4uRoutes);
