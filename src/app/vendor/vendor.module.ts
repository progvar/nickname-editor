import { NgModule } from '@angular/core';
import { MaterialModule } from './material.module';

const vendorModules = [MaterialModule];

@NgModule({
    imports: vendorModules,
    exports: vendorModules,
})
export class VendorModule {}
