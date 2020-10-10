import { Component } from '@angular/core';
import { NicknameService } from 'src/app/services/nicknames/nickname.service';

@Component({
    selector: 'app-nicknames-section',
    templateUrl: 'nicknames.component.html',
    styleUrls: ['./nicknames.component.scss'],
})
export class NicknamesSectionComponent {
    nicknames: string[];

    constructor(private nicknameService: NicknameService) {}
}
