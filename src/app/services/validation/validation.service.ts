import { Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { delay, tap } from 'rxjs/operators';

@Injectable({
    providedIn: 'root',
})
export class ValidationService {
    nickname(
        nicknameControl: AbstractControl,
    ): Observable<{ message: string }> | Observable<null> {
        const isValid = nicknameControl.value[0] === 'a';

        return of(
            isValid
                ? null
                : {
                      message: `${nicknameControl.value} doesn't start with an 'a'`,
                  },
        ).pipe(
            delay(1000),
            tap(() => nicknameControl.markAsTouched()),
        );
    }
}
