import { Component, Input, Output, EventEmitter, ViewChild, ElementRef, OnInit } from '@angular/core';
import { OnboardingSlide } from '../../interfaces/OnboardingSlide';
import { OnboardingSlideComponent } from '../onboarding-slide/onboarding-slide.component';
import * as platform from 'tns-core-modules/platform';
import { Page } from 'tns-core-modules/ui/page/page';

@Component({
    moduleId: module.id,
    selector: 'ns-onboarding',
    templateUrl: './onboarding.component.html'
})
export class OnboardingComponent implements OnInit {

    currentIndex = 0;

    animating = false;

    @Input() slides: OnboardingSlide[];
    @Input() disableStatusBar = true;

    @Output() onFinish: EventEmitter<any> = new EventEmitter();
    @Output() onContinue: EventEmitter<any> = new EventEmitter();
    @Output() onSkip: EventEmitter<any> = new EventEmitter();

    @ViewChild('slide') slidesEl: ElementRef;

    constructor(private page: Page) { }

    ngOnInit() {
        if (this.disableStatusBar) {
            this.page.backgroundSpanUnderStatusBar = true;
        }
    }

    /**
     * Continues to the next slide (or emits the finished event)
     * Animates the slide if configured
     */
    continue(): void {
        this.animateSlides.then(
            () => {
                this.incrementSlide();
                this.onContinue.next(this.currentSlide);
            })
            .catch(
            () => {
                this.onFinish.next(false);
            });
    }

    /**
     * Skips the remaining slides
     * Emits the onSkip event and onFinish event hooks
     */
    skip(): void {
        this.onSkip.next(this.currentSlide);
        this.onFinish.next(true);
    }

    translateY(index: number): number {
        const prev = this.getPreviousAnimation(index);
        if (index === 0 || (index === this.currentIndex && prev !== this.currentSlide.animation)) {
            return 0;
        }
        if (this.currentSlide && this.currentSlide.animation) {
            const animation = this.currentSlide.animation;
            if (animation === 'slide_up' || animation === 'stack_under') {
                return platform.screen.mainScreen.heightDIPs;
            }
            else if (animation === 'slide_down' || animation === 'stack_over') {
                return (-1 * platform.screen.mainScreen.heightDIPs);
            }
        }
        return 0;
    }

    translateX(index: number): number {
        const prev = this.getPreviousAnimation(index);
        if (index === 0 || (index === this.currentIndex && prev !== this.currentSlide.animation)) {
            return 0;
        }
        if (this.currentSlide && this.currentSlide.animation) {
            const animation = this.currentSlide.animation;
            if (animation === 'slide_right') {
                return (-1 * platform.screen.mainScreen.widthDIPs);
            }
            else if (animation === 'slide_left') {
                return platform.screen.mainScreen.widthDIPs;
            }
        }
        return 0;
    }

    private getPreviousAnimation(index: number) {
        return index - 1 > 0 ? this.slides[index - 1].animation : null;
    }


    /**
     * Returns the current slide value to emit through the event chain
     */
    private get currentSlide(): OnboardingSlide {
        if (this.slides.length > 0) {
            if (this.slides.length > this.currentIndex) {
                return this.slides[this.currentIndex];
            }
        }
        return null;
    }

    /**
     * Handles animation of the slide (page) transitions
     */
    private get animateSlides(): Promise<any> {
        if (this.currentIndex + 1 < this.slides.length) {
            const slides = this.slidesEl.nativeElement;
            const current = slides.getChildAt(this.currentIndex + 1).getChildAt(0);
            const next = slides.getChildAt(this.currentIndex + 2).getChildAt(0);
            if (this.currentSlide.animation) {
                this.animating = true;
                switch (this.currentSlide.animation) {
                    case 'slide_up':
                    case 'stack_over':
                        return this.animateSlideVertical(current, next, true);
                    case 'slide_down':
                    case 'stack_under':
                        return this.animateSlideVertical(current, next, false);
                    case 'slide_right':
                        return this.animateSlideHorizontal(current, next, false);
                    case 'slide_left':
                        return this.animateSlideHorizontal(current, next, true);
                }
            }
            return Promise.resolve();
        }
        return Promise.reject('slide_end');
    }

    private animateSlideVertical(current: any, next: any, upwards: boolean): Promise<any> {
        return new Promise((resolve, reject) => {
            next.animate({
                translate: {
                    x: 0,
                    y: 0
                },
                delay: 300,
                duration: 1000
            });
            current.animate({
                translate: {
                    x: 0,
                    y: (upwards ? -1 : 1) * platform.screen.mainScreen.heightDIPs
                },
                duration: 1000,
                delay: 300
            }).then(() => {
                this.animating = false;
                resolve(true);
            });
        });
    }

    private animateSlideHorizontal(current: any, next: any, left: boolean): Promise<any> {
        return new Promise((resolve, reject) => {
            next.animate({
                translate: {
                    x: 0,
                    y: 0
                },
                delay: 300,
                duration: 1000
            });
            current.animate({
                translate: {
                    x: (left ? -1 : 1) * platform.screen.mainScreen.widthDIPs,
                    y: 0
                },
                duration: 1000,
                delay: 300
            }).then(() => {
                this.animating = false;
                resolve(true);
            });
        });
    }

    /**
     * Increments the current slide if there is a next slide
     * Emits the finished event if at the end of the stack
     */
    private incrementSlide(): void {
        if (this.hasNext) {
            this.currentIndex++;
        }
        else {
            this.onFinish.next(true);
        }
    }

    /**
     * {true} if there is another slide in the stack, {false} if at the end
     */
    private get hasNext(): boolean {
        return this.currentIndex < this.slides.length;
    }

}
