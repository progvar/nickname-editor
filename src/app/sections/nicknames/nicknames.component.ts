import {
    AfterViewInit,
    Component,
    ElementRef,
    OnDestroy,
    ViewChild,
} from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { fromEvent, merge, Observable, ReplaySubject, Subject } from 'rxjs';
import {
    debounceTime,
    filter,
    scan,
    switchMap,
    take,
    takeUntil,
    tap,
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
            fromEvent(this.addBtn.nativeElement, 'click'),
            fromEvent(this.nicknameForm.nativeElement, 'submit'),
        );

        const latestNickname$ = new ReplaySubject(1);

        this.nicknameInput.valueChanges
            .pipe(debounceTime(300), takeUntil(this.destroy$))
            .subscribe(latestNickname$);

        this.nicknames$ = addNickname$.pipe(
            filter(() => this.nicknameInput.valid),
            switchMap(() => latestNickname$.pipe(take(1))),
            scan(this.addNicknameToList, []),
            tap(this.resetInput.bind(this)),
            takeUntil(this.destroy$),
        );
    }

    addNicknameToList(
        nicknamesSoFar: string[],
        nicknameInput: string,
    ): string[] {
        return [nicknameInput, ...nicknamesSoFar];
    }

    resetInput(): void {
        if (this.nicknameInput.pristine) {
            return;
        }

        this.nicknameInput.reset();
        this.nicknameInput.setErrors(null);
    }
}
