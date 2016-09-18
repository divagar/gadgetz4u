import { Component, AfterViewInit } from '@angular/core';

declare var jQuery: any;

@Component({
  selector: 'gadgetz4u',
  templateUrl: 'gadgetz4u.component.html',
  styleUrls: ['gadgetz4u.component.css'],
})

export class Gadgetz4uAppComponent implements AfterViewInit {

  public constructor() { };

  ngAfterViewInit() {
    try {
      //click event for navbar
      jQuery(document).on('click', '.navbar-collapse.in', function (e) {
        if (jQuery(e.target).is('a') && jQuery(e.target).attr('class') != 'dropdown-toggle') {
          jQuery(this).collapse('hide');
        }
      });
    }
    catch (e) {
      console.log("Gadget4u ngAfterViewInit: error - " + e);
    }
  }
}