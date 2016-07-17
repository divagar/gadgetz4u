import { Component, AfterViewInit } from '@angular/core';
import { Routes, Router, RouteSegment, ROUTER_DIRECTIVES, ROUTER_PROVIDERS } from '@angular/router';
import { Title } from '@angular/platform-browser';

declare var jQuery: any;

@Component({
    moduleId: module.id,
    selector: 'home',
    templateUrl: 'home.component.html',
    styleUrls: ['home.component.css'],
    directives: [ROUTER_DIRECTIVES]
})

export class HomeComponent implements AfterViewInit {
    public constructor(private titleService: Title) {
        //Set page title
        this.titleService.setTitle("Gadgetz4u India | Home");
    }

    ngAfterViewInit() {
        jQuery("#owl").owlCarousel({
            // Most important owl features
            items: 3,

            //Basic Speeds
            slideSpeed: 100,

            //Autoplay
            autoPlay: true,
            stopOnHover: true,
        });
    }
}