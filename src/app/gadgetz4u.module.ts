import { NgModule } from '@angular/core';
import { BrowserModule, Title } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularFireModule } from 'angularfire2';
import { Gadgetz4uAppComponent } from './gadgetz4u.component';
import { routing, gadgetz4uRoutingProviders } from './gadgetz4u.routing';
import { HomeComponent } from './home.component';
import { ProductsComponent } from './products.component';
import { ContactComponent } from './contact.component';
import { AboutComponent } from './about.component';
import { HowdyComponent } from './howdy.component';
import { LoginComponent } from './login.component';

// Must export the config
export const firebaseConfig = {
    apiKey: "AIzaSyAhazzDCJPH0ADelG3bZ_HJyy8PMKlmfiY",
    authDomain: "gadgetz-3396f.firebaseapp.com",
    databaseURL: "https://gadgetz-3396f.firebaseio.com",
    storageBucket: "gadgetz-3396f.appspot.com",
};

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        routing,
        AngularFireModule.initializeApp(firebaseConfig)
    ],
    providers: [
        gadgetz4uRoutingProviders,
        HomeComponent,
        Title
    ],
    declarations: [
        Gadgetz4uAppComponent,
        HomeComponent,
        LoginComponent,
        HowdyComponent,
        ProductsComponent,
        AboutComponent,
        ContactComponent
    ],
    bootstrap: [Gadgetz4uAppComponent]
})

export class Gadgetz4uModule {
}