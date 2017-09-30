import { Component, Input, Output, EventEmitter, AfterViewInit, OnChanges, SimpleChanges, ViewChild, ElementRef } from '@angular/core';
import { Page } from 'tns-core-modules/ui/page/page';
import { Color } from 'tns-core-modules/color/color';
import * as gestures from 'tns-core-modules/ui/gestures';
import * as platform from 'tns-core-modules/platform';
import * as app from 'tns-core-modules/application';

@Component({
    moduleId: module.id,
    selector: 'ns-onboarding-slide',
    templateUrl: './onboarding-slide.component.html',
    styleUrls: ['./onboarding-slide.component.css']
})
export class OnboardingSlideComponent implements OnChanges, AfterViewInit {

    @Input() okButtonText: string;
    @Input() skipButtonText: string;

    @Input() title: string;
    @Input() description: string;
    @Input() imageUrl: string;

    @Input() backgroundColor = '#8A63B3';
    @Input() visible = true;

    @Input() translateY = 0;
    @Input() translateX = 0;
    @Input() interactive = true;
    @Input() hasNext = false;

    @Output() onSkip: EventEmitter<any> = new EventEmitter();
    @Output() onContinue: EventEmitter<any> = new EventEmitter();

    @ViewChild('slide') slideEl: ElementRef;
    @ViewChild('continueBtn') continueBtn: ElementRef;
    @ViewChild('skipBtn') skipBtn: ElementRef;

    constructor(private page: Page) {
        page.actionBarHidden = true;
    }

    ngAfterViewInit() {
        if (platform.isAndroid) {
            this.animateBtn(this.continueBtn.nativeElement);
            if (this.skipBtn) {
                this.animateBtn(this.skipBtn.nativeElement);
            }
        }
    }

    ngOnChanges(changes: SimpleChanges) {
        const visibility = changes.visible;
        if (visibility && visibility.currentValue === true) {
            this.setPageBackground();
        }
    }

    get navBarHeight(): number {
        if (app.android) {
            let result = 0;
            const resourceId = app.android.currentContext
                .getResources()
                .getIdentifier('navigation_bar_height', 'dimen', 'android');
            if (resourceId > 0) {
                result = app.android.currentContext
                    .getResources()
                    .getDimensionPixelSize(resourceId);
                result =
                    result /
                    app.android.currentContext.getResources().getDisplayMetrics().density;
            }
            return result;
        }
        return 0;
    }

    private animateBtn(el: any) {
        el.on('tap', (args: gestures.GestureEventData) => {
            el.animate({
                opacity: 0.5,
                duration: 200
            }).then(() => el.animate({ opacity: 1, duration: 200 }));
        });
    }

    private setPageBackground(): void {
        this.page.backgroundColor = new Color(this.backgroundColor);
    }

}
