import { Component, AfterViewInit } from '@angular/core';
import { Routes, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

declare var jQuery: any;

@Component({
    selector: 'home',
    templateUrl: 'home.component.html',
    styleUrls: ['home.component.css']
})

export class HomeComponent implements AfterViewInit {
    public constructor(private titleService: Title) {
        //Set page title
        this.titleService.setTitle("Gadgetz4u India | Home");
    }

    ngAfterViewInit() {
        jQuery(".hSlickCarousel").slick({
            dots: true,
            arrows: true,
            autoplay: true,
            autoplaySpeed: 2000,
        });
    }
}