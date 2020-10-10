import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class NicknameService {
    isValid(nickname: string): Observable<boolean> {
        return of(nickname[0] === 'a');
    }
}
