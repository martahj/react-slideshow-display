// @flow
import React, { PureComponent } from 'react';

type SlideControllerProps = {
  children: Object,
  transition: ?string,
  disableArrowKeys: ?boolean,
};

type SlideControllerState = {
  currentSlide: number,
  oneSlideWidth: number,
  shouldNotAnimate: boolean,
};

const DEFAULT_TRANSITION = '500ms ease-in-out';

const incrementSlide = (state: SlideControllerState, props: SlideControllerProps) => ({
  currentSlide: Math.min(state.currentSlide + 1, React.Children.count(props.children) - 1)
});

const decrementSlide = (state: SlideControllerState, props: SlideControllerProps) => ({
  currentSlide: Math.max(state.currentSlide - 1, 0)
})

const enableAnimation = () => ({ shouldNotAnimate: false });

const adjustSlideWidth = width => () => ({
  oneSlideWidth: width,
  shouldNotAnimate: true,
});

class SlideController extends PureComponent<SlideControllerProps, SlideControllerState> {
  constructor(props: SlideControllerProps) {
    super(props);
    this.state = {
      currentSlide: 0,
      oneSlideWidth: 0,
      shouldNotAnimate: false,
    };
  }

  componentWillMount() {
    if (!this.props.disableArrowKeys) this.setUpKeyListener();
    window.addEventListener('resize', this.updateNodeDimensions);
  }

  componentWillReceiveProps(nextProps: SlideControllerProps) {
    if (nextProps.disableArrowKeys && !this.props.disableArrowKeys) {
      this.removeKeyListener();
    }
    if (!nextProps.disableArrowKeys && this.props.disableArrowKeys) {
      this.setUpKeyListener();
    }
  }

  componentDidUpdate(prevProps: SlideControllerProps, prevState: SlideControllerState) {
    if (prevState.shouldNotAnimate) {
      this.setState(enableAnimation);
    }
  }

  componentWillUnmount() {
    if (!this.props.disableArrowKeys) this.removeKeyListener();
    window.removeEventListener('resize', this.updateNodeDimensions);
  }

  handleKeyPress = (event): void => {
    const { keyCode } = event;
    if (keyCode === 39) this.goToNextSlide();
    else if (keyCode ===37) this.goToPreviousSlide();
  }

  setUpKeyListener = (): void => {
    window.addEventListener('keydown', this.handleKeyPress);
  }

  removeKeyListener = (): void => {
    window.removeEventListener('keydown', this.handleKeyPress);
  }

  goToPreviousSlide = (): void => {
    this.setState(decrementSlide);
  }

  goToNextSlide = (): void => {
    this.setState(incrementSlide);
  }

  getNode = (node): void => {
    this.node = node;
    this.updateNodeDimensions();
  }

  updateNodeDimensions = (): void => {
    const { width } = this.node.getBoundingClientRect();
    this.setState(adjustSlideWidth(width));
  }

  render() {
    const { currentSlide, oneSlideWidth, shouldNotAnimate } = this.state;
    const numberSlides = this.props.children.length;
    if (numberSlides === 0) return null;
    const transition = `
      ${shouldNotAnimate ? 'none' : 'right'}
      ${this.props.transition || DEFAULT_TRANSITION}
    `;
    return (
      <div
        style={{ width: '100%', height: '100%', overflow: 'hidden', backgroundColor: 'black'}}
        ref={this.getNode}
        >
        {oneSlideWidth > 0 && (
          <div style={{
            height: '100%',
            width: oneSlideWidth * numberSlides,
            display: 'flex',
            flexWrap: 'nowrap',
            position: 'relative',
            right: currentSlide * oneSlideWidth,
            transition,
          }}>
            {React.Children.toArray(this.props.children).map((child, i) => {
              return (
                <div
                  key={`SLIDE_${i}`}
                  style={{
                    height: '100%',
                    width: oneSlideWidth,
                    display: 'flex',
                  }}
                  >
                    {React.cloneElement(child, {
                      activeSlide: i === currentSlide,
                      goToPreviousSlide: this.goToPreviousSlide,
                      goToNextSlide: this.goToNextSlide,
                    })}
                </div>
              );
            })}
          </div>
        )}
      </div>
    );
  }
}
export default SlideController;
