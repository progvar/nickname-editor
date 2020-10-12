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
        const nickname = nicknameControl.value.trim();
        const isValid = nickname[0] === 'a';

        return of(
            isValid
                ? null
                : {
                      message: `${nickname} doesn't start with an 'a'`,
                  },
        ).pipe(
            delay(1000),
            tap(() => nicknameControl.markAsTouched()),
        );
    }
}
