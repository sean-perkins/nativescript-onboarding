import { NO_ERRORS_SCHEMA } from '@angular/core';
import { NgModule } from '@angular/core';
import { HomeRoutingModule } from './home.routing';
import { HomeComponent } from './components/home/home.component';
import { OnboardingModule } from '../onboarding/onboarding.module';

@NgModule({
    imports: [
        HomeRoutingModule,
        OnboardingModule
    ],
    declarations: [
        HomeComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class HomeModule { }
