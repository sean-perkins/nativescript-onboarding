# NativeScript Onboarding App
Instruct your users with a beautiful interface that quickly showcases how to use your application. On-board new users to your NativeScript application with ease.

---

**Current Version**: 1.0.0

**Release Date**: 09/30/2017

**Last Updated**: 09/30/2017

**Author**: Sean Perkins _(<sean@devonite.com>)_, Devonite

---

### Features
- Supports iOS and Android
- Pre-built Animations (`slide_up`, `slide_down`, `slide_left`, `slide_right`, `stack_over`, `stack_under`)
- Configurable Properties for: background color, title, description, skip button text, continue button text and image url.

### Demo Images

|iOS|Android|
|:---:|:---:|
|<img src="https://user-images.githubusercontent.com/13732623/31042945-54725d58-a581-11e7-8197-316814619283.gif" width="100%" />|<img src="https://user-images.githubusercontent.com/13732623/31042991-2dd086a6-a582-11e7-93a6-10c00a406600.gif" width="100%" />|

### Requirements
1. `nativescript-angular@~4.2.0`
2. `tns-core-modules@3.1.0`
3. Underscore named image paths (for Android)

## Integrating Into Your Application
You can easily integrate this module and functionality into your existing application by following these instructions:

1. Copy the fonts located in `app/fonts` into your project.
2. Copy the `onboarding` folder and contents into your project.
3. Import `OnboardingModule` into your project's feature module.
4. Copy over any asset images desired into your `App_Resources` directories for each platform.

### Recommended Component Usage

_example.component.html_

```html
<ns-onboarding
    [slides]="slides"
    (onFinish)="finish()"></ns-onboarding>
```

_example.component.ts_

```js
slides = [
    {
        title: 'Example Title',
        description: 'Example Description',
        okButtonText: 'Continue',
        skipButtonText: 'Skip',
        backgroundColor: '#8A63B3',
        imageUrl: 'res://slide_1',
        animation: 'slide_left'
    }
];
```

### Experimental Component Usage

This is not a recommended usage, but you may use the individual slide component directly. Animations are not expected to work with this method. You may try manage the `translateX` and `translateY` properties directly.

_example.component.html_

```html
<ns-onboarding-slide
    [interactive]="true"
    [visible]="true"
    title="Example Title"
    description="Example Description"
    okButtonText="Continue"
    skipButtonText="Skip"
    imageUrl="res://slide_1"
    backgroundColor="#8A63B3"
    [hasNext]="false"></ns-onboarding-slide>

```

## Animations

There are **6** supported animation types that can be passed as an option to the onboarding component.

1. `slide_up` - The slides will animate from the bottom towards the top.
2. `slide_down` - The slides will animate from the top towards the bottom.
3. `slide_left` - The slides will animate from the right towards the left.
4. `slide_right` - The slides will animate from the left towards the right.
5. `stack_over` - The current slide will animate down while the next slide will animate down over.
6. `stack_under` - The current slide will animate up while the next slide will animate under from the bottom.

**Note**: For `slide_left` and `slide_right` animations, the status bar background will animate cleanly across. If desired, you can disable the transparent status bar by passing `disableStatusBar` as false to the `ns-onboarding` component.

```html
<ns-onboarding
    [slides]="slides"
    [disableStatusBar]="false"></ns-onboarding>
```

### Event Hooks
1. `ns-onboarding`

This component has two hooks for `(onSkip)` and `(onFinish)`.

onSkip - When the user selects the skip option. The `$event` object contains the slide that was skipped.

onFinish - When the user has completed all slides or skipped the onboarding. The `$event` object contains the boolean value of if the onboarding was skipped.

## Example App

The example app includes the appropriate configuration to handle both `SASS` stylesheets as well as webpack builds.

To get started, install all needed NPM dependencies:

- `npm install`

You may leverage the stock NativeScript CLI commands to run the example app:

- `tns run ios`
- `tns run android`

To leverage the webpack build, you may run:

- `npm run start-ios-bundle`
- `npm run start-android-bundle`

Please refer to the respective repositories and/or the `package.json` for additional CLI commands.


## Technical Support

Contact the developer directly: sean@devonite.com with a brief description of your problem and how to quickly re-produce it.


### Contributors

[<img alt="Sean perkins" src="https://avatars1.githubusercontent.com/u/13732623?v=3&s=117" width="117">](https://github.com/sean-perkins) |
:---:
|[Sean Perkins](https://github.com/sean-perkins)|


### Image Rights

- Icon images are a snapshot of animated sequences created by [Virgil Pana](https://dribbble.com/virgilpana).
