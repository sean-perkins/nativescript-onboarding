import { Component, OnInit } from '@angular/core';
import { OnboardingSlide } from '../../../onboarding';

import * as dialogs from 'tns-core-modules/ui/dialogs';

@Component({
    moduleId: module.id,
    selector: 'app-home',
    templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {

    slides: OnboardingSlide[] = [];

    ngOnInit() {
        this.slides = [
            {
                title: 'Find out if college is a right choice for you',
                description: 'College is a good investment for most people, but is it a good investment for you?',
                okButtonText: 'Continue',
                skipButtonText: 'Skip',
                backgroundColor: '#8A63B3',
                imageUrl: 'res://slide_1',
                animation: 'slide_left'
            },
            {
                title: 'We can help you to find your own university',
                description: 'Choosing the right college can seem overwhelming! Take our quiz to narrow down the options.',
                okButtonText: 'Continue',
                skipButtonText: 'Skip',
                backgroundColor: '#41A9CC',
                imageUrl: 'res://slide_2',
                animation: 'slide_up'
            },
            {
                title: 'See how you compare with other students',
                description: 'Explore our test scores, which allows you to compare your performance to other students.',
                okButtonText: 'Continue',
                skipButtonText: 'Skip',
                backgroundColor: '#E1615D',
                imageUrl: 'res://slide_3',
                animation: 'slide_down'
            },
            {
                title: 'Expert corner',
                description: 'Get professional consultance from our experts.',
                okButtonText: 'I GOT IT!',
                skipButtonText: 'Skip',
                backgroundColor: '#FDBD57',
                imageUrl: 'res://slide_4',
                animation: 'slide_right'
            }
        ];
    }

    finish(): void {
        dialogs.alert('You finished the onboarding!');
    }

}
