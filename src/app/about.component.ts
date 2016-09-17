import { Component, AfterViewInit} from '@angular/core';
import { Title } from '@angular/platform-browser';

declare var FB: any;
declare var twttr: any;

@Component({
  selector: 'about',
  templateUrl: 'about.component.html',
  styleUrls: ['about.component.css']
})

export class AboutComponent implements AfterViewInit {
  public constructor(private titleService: Title) {
    //Set page title
    this.titleService.setTitle("Gadgetz4u India | About Us");
  }
  ngAfterViewInit() {
    try {
      //share button
      FB.XFBML.parse()
      twttr.widgets.load()
    }
    catch (e) {
      console.log("ngAfterViewInit: error!");
    }
  }

}