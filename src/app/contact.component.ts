import { Component} from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
    moduleId: module.id,
    selector: 'contact',
    templateUrl: 'contact.component.html',
    styleUrls: ['contact.component.css']
})

export class ContactComponent {
    public constructor(private titleService: Title) {
        //Set page title
        this.titleService.setTitle("Gadgetz4u India | Contact Us");
    }
}