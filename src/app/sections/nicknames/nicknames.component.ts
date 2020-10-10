import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { NicknameService } from 'src/app/services/nicknames/nickname.service';
import { BehaviorSubject, Subject } from 'rxjs';
import { debounceTime, takeUntil } from 'rxjs/operators';

@Component({
    selector: 'app-nicknames-section',
    templateUrl: 'nicknames.component.html',
    styleUrls: ['./nicknames.component.scss'],
})
export class NicknamesSectionComponent implements OnInit, OnDestroy {
    newNickname = new FormControl('');
    nicknames: string[] = [];
    nicknames$ = new BehaviorSubject(this.nicknames);

    private destroy$ = new Subject();

    constructor(private nicknameService: NicknameService) {}

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }

    ngOnInit(): void {
        this.newNickname.valueChanges.pipe(debounceTime(300), takeUntil(this.destroy$)).subscribe(console.log);
    }

    addNickname(nickname: string): void {
        this.nicknames = [nickname, ...this.nicknames];
        this.nicknames$.next(this.nicknames);
        this.newNickname.setValue('');
    }
}
