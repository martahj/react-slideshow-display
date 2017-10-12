## Installation

ReactSlideshowDisplay is available [on npm](https://www.npmjs.com/package/react-slideshow-display).

```
yarn add react-slideshow-display
```

## Usage

```javascript
import React from 'react';
import ReactSlideshowDisplay from 'react-slideshow-display';
import Slide1 from './Slide1';
import Slide2 from './Slide2';
import Slide3 from './Slide3';

const SlideshowComponent = () => (
  <ReactSlideshowDisplay>
    <Slide1 />
    <Slide2 />
    <Slide3 />
  </ReactSlideshowDisplay>
);

export default SlideshowComponent;
```

## Behavior

### Navigation between slides

ReactSlideshowDisplay sets up listeners for when the user presses the left or right arrow keys, and changes the slide accordingly.

#### Disabling keyboard navigation

Navigation using the arrow keys can be disabled by passing the `disableArrowKeys`
prop.

```javascript
  <ReactSlideshowDisplay disableArrowKeys>
```

#### Custom navigation

The ReactSlideshowDisplay component passes two props to its children that can be
used for creating custom navigation, such as left/right buttons, in the slides:

* `goToPreviousSlide` moves one slide to the left
* `goToNextSlide` moves one slide to the right

### Slide transitions

By default the transition between the slides
is set to `500ms ease-in-out`, but you can pass in a custom transition as a prop:

```javascript
  <ReactSlideshowDisplay transition="200ms linear">
```

### Active slide

Like a typical slideshow, only one slide is fully visible at once. However, all
the slides will mount when the ReactSlideshowDisplay component mounts. Each child
slide will be passed a boolean `activeSlide` prop to indicate whether that slide
is the active slide or not.
