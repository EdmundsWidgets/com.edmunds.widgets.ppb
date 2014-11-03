/**
 * Created by Pavel_Karpovich on 06/11/2014.
 */
define(function () {
    return Slider = function () {
        "use strict";
        var controlsContainer,
            slider,
            sliderList,
            currentActive,
            mainSlider,
            firstSlider,
            lastSlider,
            containerWidth,
            containerHeight,
            stepWidth,
            stepHeight,
            counter = 0,
            counterSlider = 0;

        function init() {
            controlsContainer = document.querySelector('.slider-controls');
            slider = controlsContainer.querySelector('ul');
            sliderList = slider.querySelectorAll('li');
            currentActive = sliderList[0];
            firstSlider = sliderList[0];
            lastSlider = sliderList[2];
            mainSlider = document.querySelector('.slider-viewport');
            containerWidth = controlsContainer.offsetWidth;
            containerHeight = controlsContainer.offsetHeight;
            stepWidth = containerWidth / 3;
            stepHeight = containerHeight / 3;
            if(currentActive && currentActive.classList && firstSlider && firstSlider.classList && lastSlider && lastSlider.classList){
                firstSlider.classList.add('first-element');
                currentActive.classList.add('active');
                lastSlider.classList.add('last-element');
                showMainSlider();
            }
            showMainSlider();
        }

        function switchActive() {
            currentActive.classList.remove('active');
            sliderList[counter].classList.add('active');
            currentActive = sliderList[counter];
            showMainSlider();
        }

        function showMainSlider() {
            mainSlider.innerHTML = currentActive.innerHTML;
        }

        function Slider() {
            init();
        }

        Slider.prototype = {
            constructor: Slider,
            moveLeft: function () {
                if (counter > 0 && currentActive.classList.contains('first-element')) {
                    counterSlider--;
                    slider.style.left = -stepWidth * counterSlider - 5 * counterSlider + 'px';
                    currentActive.classList.remove('first-element');
                    sliderList[counter - 1].classList.add('first-element');
                    sliderList[counter + 2].classList.remove('last-element');
                    sliderList[counter + 1].classList.add('last-element');
                    switchActive();
                } else if (counter > 0 && currentActive.classList.contains('last-element') || counter > 0 && counter < 2) {
                    counter--;
                    switchActive();
                } else if (counter > 0 && !currentActive.classList.contains('first-element') && !currentActive.classList.contains('last-element')) {
                    counter--;
                    counterSlider--;
                    slider.style.left = -stepWidth * counterSlider - 5 * counterSlider + 'px';
                    sliderList[counter].classList.remove('first-element');
                    sliderList[counter - 1].classList.add('first-element');
                    sliderList[counter + 2].classList.remove('last-element');
                    sliderList[counter + 1].classList.add('last-element');
                    switchActive();
                }
            },
            moveRight: function () {
                if (counter < sliderList.length - 1 && currentActive.classList.contains('last-element')) {
                    counterSlider++;
                    slider.style.left = -stepWidth * counterSlider - 5 * counterSlider + 'px';
                    currentActive.classList.remove('last-element');
                    sliderList[counter + 1].classList.add('last-element');
                    sliderList[counter - 2].classList.remove('first-element');
                    sliderList[counter - 1].classList.add('first-element');
                    switchActive();
                } else if (counter < sliderList.length - 1 && currentActive.classList.contains('first-element') || counter < sliderList.length - 1 && counter > sliderList.length - 3) {
                    counter++;
                    switchActive();
                } else if (counter < sliderList.length - 1 && !currentActive.classList.contains('first-element') && !currentActive.classList.contains('last-element')) {
                    counter++;
                    counterSlider++;
                    slider.style.left = -stepWidth * counterSlider - 5 * counterSlider + 'px';
                    sliderList[counter].classList.remove('last-element');
                    sliderList[counter + 1].classList.add('last-element');
                    sliderList[counter - 2].classList.remove('first-element');
                    sliderList[counter - 1].classList.add('first-element');
                    switchActive();
                }
            },
            moveUp: function () {
                if (counter > 0 && currentActive.classList.contains('first-element')) {
                    counterSlider--;
                    slider.style.top = -stepHeight * counterSlider - 5 * counterSlider + 'px';
                    currentActive.classList.remove('first-element');
                    sliderList[counter - 1].classList.add('first-element');
                    sliderList[counter + 2].classList.remove('last-element');
                    sliderList[counter + 1].classList.add('last-element');
                    switchActive();
                } else if (counter > 0 && currentActive.classList.contains('last-element') || counter > 0 && counter < 2) {
                    counter--;
                    switchActive();
                } else if (counter > 0 && !currentActive.classList.contains('first-element') && !currentActive.classList.contains('last-element')) {
                    counter--;
                    counterSlider--;
                    slider.style.top = -stepHeight * counterSlider - 5 * counterSlider + 'px';
                    sliderList[counter].classList.remove('first-element');
                    sliderList[counter - 1].classList.add('first-element');
                    sliderList[counter + 2].classList.remove('last-element');
                    sliderList[counter + 1].classList.add('last-element');
                    switchActive();
                }
            },
            moveDown: function () {
                if (counter < sliderList.length - 1 && currentActive.classList.contains('last-element')) {
                    counterSlider++;
                    slider.style.top = -stepHeight * counterSlider - 5 * counterSlider + 'px';
                    currentActive.classList.remove('last-element');
                    sliderList[counter + 1].classList.add('last-element');
                    sliderList[counter - 2].classList.remove('first-element');
                    sliderList[counter - 1].classList.add('first-element');
                    switchActive();
                } else if (counter < sliderList.length - 1 && currentActive.classList.contains('first-element') || counter < sliderList.length - 1 && counter > sliderList.length - 3) {
                    counter++;
                    switchActive();
                } else if (counter < sliderList.length - 1 && !currentActive.classList.contains('first-element') && !currentActive.classList.contains('last-element')) {
                    counter++;
                    counterSlider++;
                    slider.style.top = -stepHeight * counterSlider - 5 * counterSlider + 'px';
                    sliderList[counter].classList.remove('last-element');
                    sliderList[counter + 1].classList.add('last-element');
                    sliderList[counter - 2].classList.remove('first-element');
                    sliderList[counter - 1].classList.add('first-element');
                    switchActive();
                }
            },
            onClickChange: function (e) {
                var target = e.currentTarget;
                if (currentActive.classList.contains('last-element') && target.classList.contains('first-element') && counter === 2) {
                    counter -= 2;
                } else if (currentActive.classList.contains('last-element') && target.classList.contains('first-element')) {
                    counter -= 2;
                    counterSlider--;
                    if (containerWidth === 447) {
                        slider.style.left = -stepWidth * counterSlider - 5 * counterSlider + 'px';
                    } else {
                        slider.style.top = -stepHeight * counterSlider - 5 * counterSlider + 'px';
                    }
                    sliderList[counter].classList.remove('first-element');
                    sliderList[counter - 1].classList.add('first-element');
                    sliderList[counter + 2].classList.remove('last-element');
                    sliderList[counter + 1].classList.add('last-element');
                } else if (currentActive.classList.contains('first-element') && target.classList.contains('last-element') && counter !== 0) {
                    counter += 2;
                } else if (currentActive.classList.contains('first-element') && target.classList.contains('last-element') && counter === 0) {
                    counter += 2;
                    counterSlider++;
                    if (containerWidth === 447) {
                        slider.style.left = -stepWidth * counterSlider - 5 * counterSlider + 'px';
                    } else {
                        slider.style.top = -stepHeight * counterSlider - 5 * counterSlider + 'px';
                    }
                    sliderList[counter].classList.remove('last-element');
                    sliderList[counter + 1].classList.add('last-element');
                    sliderList[counter - 2].classList.remove('first-element');
                    sliderList[counter - 1].classList.add('first-element');
                } else if (currentActive.classList.contains('last-element') && !target.classList.contains('active') || !currentActive.classList.contains('last-element') && target.classList.contains('first-element') && counter === 1) {
                    counter--;
                } else if (currentActive.classList.contains('first-element') && !target.classList.contains('active') && !target.classList.contains('last-element') || !currentActive.classList.contains('first-element') && target.classList.contains('last-element') && counter === sliderList.length - 2) {
                    counter++;
                } else if (!currentActive.classList.contains('first-element') && !currentActive.classList.contains('last-element') && target.classList.contains('last-element')) {
                    counter++;
                    counterSlider++;
                    if (containerWidth === 447) {
                        slider.style.left = -stepWidth * counterSlider - 5 * counterSlider + 'px';
                    } else {
                        slider.style.top = -stepHeight * counterSlider - 5 * counterSlider + 'px';
                    }
                    sliderList[counter].classList.remove('last-element');
                    sliderList[counter + 1].classList.add('last-element');
                    sliderList[counter - 2].classList.remove('first-element');
                    sliderList[counter - 1].classList.add('first-element');
                } else if (!currentActive.classList.contains('last-element') && !currentActive.classList.contains('first-element') && target.classList.contains('first-element')) {
                    counter--;
                    counterSlider--;
                    if (containerWidth === 447) {
                        slider.style.left = -stepWidth * counterSlider - 5 * counterSlider + 'px';
                    } else {
                        slider.style.top = -stepHeight * counterSlider - 5 * counterSlider + 'px';
                    }
                    sliderList[counter].classList.remove('first-element');
                    sliderList[counter - 1].classList.add('first-element');
                    sliderList[counter + 2].classList.remove('last-element');
                    sliderList[counter + 1].classList.add('last-element');
                }
                switchActive();
            },
            resetSlider: function () {
                controlsContainer = document.querySelector('.slider-controls');
                slider = controlsContainer.querySelector('ul');
                sliderList = slider.querySelectorAll('li');
                mainSlider = document.querySelector('.slider-viewport');
                currentActive = sliderList[0];
                firstSlider = sliderList[0];
                lastSlider = sliderList[2];
                counter = 0;
                counterSlider = 0;
                if(currentActive && currentActive.classList && firstSlider && firstSlider.classList && lastSlider && lastSlider.classList){
                    firstSlider.classList.add('first-element');
                    currentActive.classList.add('active');
                    lastSlider.classList.add('last-element');
                    showMainSlider();
                }
                showMainSlider();
            }
        };
        return new Slider();
    };
});