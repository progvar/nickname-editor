import { NgModule } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DetailsSectionComponent } from './details/details.component';
import { NicknamesSectionComponent } from './nicknames/nicknames.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@NgModule({
    imports: [
        CommonModule,
        MatListModule,
        FormsModule,
        ReactiveFormsModule,
        MatCardModule,
        MatButtonModule,
        MatFormFieldModule,
        MatInputModule,
        MatProgressSpinnerModule,
    ],
    declarations: [DetailsSectionComponent, NicknamesSectionComponent],
    exports: [DetailsSectionComponent, NicknamesSectionComponent],
})
export class SectionsModule {}
