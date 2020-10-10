import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { VendorModule } from './vendor/vendor.module';
import { SectionsModule } from './sections/sections.module';

@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        VendorModule,
        SectionsModule,
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
