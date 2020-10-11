import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { BehaviorSubject, Subject } from 'rxjs';
import { debounceTime, filter, takeUntil } from 'rxjs/operators';
import { ValidationService } from 'src/app/services/validation/validation.service';

@Component({
    selector: 'app-nicknames-section',
    templateUrl: 'nicknames.component.html',
    styleUrls: ['./nicknames.component.scss'],
})
export class NicknamesSectionComponent implements OnInit, OnDestroy {
    nicknames: string[] = [];
    nicknames$ = new BehaviorSubject(this.nicknames);
    newNickname = new FormControl(
        '',
        Validators.required,
        this.validationService.nickname,
    );

    private destroy$ = new Subject();

    constructor(private validationService: ValidationService) {}

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }

    ngOnInit(): void {
        this.newNickname.valueChanges
            .pipe(
                debounceTime(300),
                filter((value) => value),
                takeUntil(this.destroy$),
            )
            .subscribe(console.log);
    }

    addNickname(nickname: string): void {
        if (!this.newNickname.valid) {
            return;
        }

        this.nicknames = [nickname, ...this.nicknames];
        this.nicknames$.next(this.nicknames);
        this.newNickname.reset('');
        this.newNickname.setErrors(null);
    }
}
