import {
    AfterViewInit,
    Component,
    ElementRef,
    OnDestroy,
    ViewChild,
} from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { fromEvent, merge, Observable, Subject } from 'rxjs';
import {
    filter,
    map,
    scan,
    takeUntil,
    tap,
    withLatestFrom,
} from 'rxjs/operators';
import { ValidationService } from 'src/app/services/validation/validation.service';

@Component({
    selector: 'app-nicknames-section',
    templateUrl: 'nicknames.component.html',
    styleUrls: ['./nicknames.component.scss'],
})
export class NicknamesSectionComponent implements AfterViewInit, OnDestroy {
    @ViewChild('addBtn', { read: ElementRef }) addBtn: ElementRef;
    @ViewChild('nicknameForm') nicknameForm: ElementRef;

    nicknames$: Observable<any>;
    nicknameInput = new FormControl(
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
        const addNickname$ = merge(
            ...[
                fromEvent(this.addBtn.nativeElement, 'click'),
                fromEvent(this.nicknameForm.nativeElement, 'submit'),
            ],
        );

        const inputValue$ = this.nicknameInput.valueChanges.pipe(
            takeUntil(this.destroy$),
            filter((inputValue) => !!inputValue),
        );

        this.nicknames$ = addNickname$.pipe(
            withLatestFrom(inputValue$),
            filter(() => this.nicknameInput.valid),
            map(([_, inputValue]) => inputValue),
            scan(this.addNicknameToList, []),
            tap(this.resetInput.bind(this)),
            takeUntil(this.destroy$),
        );
    }

    addNicknameToList(
        nicknamesSoFar: string[],
        nicknameInput: string,
    ): string[] {
        console.log('input', nicknameInput);
        return nicknameInput && !nicknamesSoFar.includes(nicknameInput)
            ? [nicknameInput, ...nicknamesSoFar]
            : [...nicknamesSoFar];
    }

    resetInput(): void {
        if (this.nicknameInput.dirty) {
            this.nicknameInput.reset('');
            this.nicknameInput.setErrors(null);
        }
    }
}
