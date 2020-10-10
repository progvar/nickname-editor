import { Component } from '@angular/core';

@Component({
    selector: 'app-details-section',
    templateUrl: 'details.component.html',
    styleUrls: ['./details.component.scss'],
})
export class DetailsSectionComponent {
    address: string;
    description: string;

    constructor() {}
}
