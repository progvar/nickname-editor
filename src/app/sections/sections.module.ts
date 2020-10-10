import { NgModule } from '@angular/core';
import { DetailsSectionComponent } from './details/details.component';
import { NicknamesSectionComponent } from './nicknames/nicknames.component';

@NgModule({
    declarations: [DetailsSectionComponent, NicknamesSectionComponent],
    exports: [DetailsSectionComponent, NicknamesSectionComponent],
})
export class SectionsModule {}
