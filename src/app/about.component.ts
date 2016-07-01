import { Component, AfterViewInit} from '@angular/core';

declare var FB: any;
declare var twttr: any;

@Component({
    moduleId: module.id,
    selector: 'about',
    templateUrl: 'about.component.html',
    styleUrls: ['about.component.css']
})

export class AboutComponent implements AfterViewInit {

  ngAfterViewInit() {
    //share button
    FB.XFBML.parse()
    twttr.widgets.load()
  }

}