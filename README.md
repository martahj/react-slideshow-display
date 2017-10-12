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

ReactSlideshowDisplay sets up listeners for when the user presses the left or right arrows, and changes the slide accordingly.
