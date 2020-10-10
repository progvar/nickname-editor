import { NgModule } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';

const materialModules = [MatDividerModule];

@NgModule({
    imports: materialModules,
    exports: materialModules,
})
export class MaterialModule {}
