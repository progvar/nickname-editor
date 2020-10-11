import {
    AfterViewInit,
    Component,
    ElementRef,
    OnDestroy,
    ViewChild,
} from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { BehaviorSubject, fromEvent, merge, Subject } from 'rxjs';
import { ValidationService } from 'src/app/services/validation/validation.service';

@Component({
    selector: 'app-nicknames-section',
    templateUrl: 'nicknames.component.html',
    styleUrls: ['./nicknames.component.scss'],
})
export class NicknamesSectionComponent implements AfterViewInit, OnDestroy {
    @ViewChild('addBtn', { read: ElementRef }) addBtn: ElementRef;
    @ViewChild('nicknameForm') nicknameForm: ElementRef;

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

    ngAfterViewInit(): void {
        merge(
            fromEvent(this.addBtn.nativeElement, 'click'),
            fromEvent(this.nicknameForm.nativeElement, 'submit'),
        ).subscribe(this.addNickname.bind(this));
    }

    addNickname(): void {
        if (!this.newNickname.valid) {
            return;
        }

        this.nicknames = [this.newNickname.value, ...this.nicknames];
        this.nicknames$.next(this.nicknames);
        this.newNickname.reset('');
        this.newNickname.setErrors(null);
    }
}
