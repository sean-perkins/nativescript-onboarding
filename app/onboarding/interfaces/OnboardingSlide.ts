export interface OnboardingSlide {

    title?: string;

    description?: string;

    okButtonText?: string;

    skipButtonText?: string;

    imageUrl?: string;

    backgroundColor?: string;

    translateX?: number;

    translateY?: number;

    animation?: 'slide_up' | 'slide_down' | 'slide_left' | 'slide_right' | 'stack_over' | 'stack_under';

}
