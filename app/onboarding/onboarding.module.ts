import { NO_ERRORS_SCHEMA } from '@angular/core';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OnboardingComponent } from './components/onboarding/onboarding.component';
import { OnboardingSlideComponent } from './components/onboarding-slide/onboarding-slide.component';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        OnboardingComponent,
        OnboardingSlideComponent
    ],
    exports: [
        OnboardingComponent,
        OnboardingSlideComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class OnboardingModule { }
