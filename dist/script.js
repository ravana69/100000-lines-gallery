function _classPrivateMethodGet(receiver, privateSet, fn) {if (!privateSet.has(receiver)) {throw new TypeError("attempted to get private field on non-instance");}return fn;}function _classPrivateFieldGet(receiver, privateMap) {var descriptor = privateMap.get(receiver);if (!descriptor) {throw new TypeError("attempted to get private field on non-instance");}if (descriptor.get) {return descriptor.get.call(receiver);}return descriptor.value;}function _classPrivateFieldSet(receiver, privateMap, value) {var descriptor = privateMap.get(receiver);if (!descriptor) {throw new TypeError("attempted to set private field on non-instance");}if (descriptor.set) {descriptor.set.call(receiver, value);} else {if (!descriptor.writable) {throw new TypeError("attempted to set read only private field");}descriptor.value = value;}return value;}class _ {
  static limit(value, min, max) {
    return Math.max(min, Math.min(value, max));
  }}



class CanvasUtils {
  static getLinePixels(startX, startY, endX, endY) {
    const pixels = [];
    let x1 = startX;
    let x2 = endX;
    const y1 = startY;
    const y2 = endY;
    const deltaX = x2 - x1;
    const deltaY = y2 - y1;

    if (x2 < x1) {
      [x1, x2] = [x2, x1];
    }

    for (let x = x1; x < x2; x++) {
      const y = startY + deltaY * (x - x1) / deltaX;
      const pixel = [Math.floor(x), Math.floor(y)];

      pixels.push(pixel);
    }

    return pixels;
  }

  static getColorIndices(x, y, width) {
    const red = 4 * (y * width + x);
    const indices = [red, red + 1, red + 2, red + 3];

    return indices;
  }

  static getAverageColor(colors) {
    const N = colors.length;
    const sum = [0, 0, 0];

    for (let i = 0; i < N; i++) {
      sum[0] += colors[i][0];
      sum[1] += colors[i][1];
      sum[2] += colors[i][2];
    }

    const result = [
    sum[0] / N,
    sum[1] / N,
    sum[2] / N];


    return result;
  }}var _root = new WeakMap();var _canvas = new WeakMap();var _hiddenCanvas = new WeakMap();var _context = new WeakMap();var _hiddenContext = new WeakMap();var _images = new WeakMap();var _imageWidth = new WeakMap();var _imageHeight = new WeakMap();var _numberOfImagesLoaded = new WeakMap();var _areAllImagesLoaded = new WeakMap();var _currentImageIndex = new WeakMap();var _imageData = new WeakMap();var _frameRequestId = new WeakMap();var _lastX = new WeakMap();var _lastY = new WeakMap();var _startTime = new WeakMap();var _onLoadCallback = new WeakMap();var _loadImages = new WeakSet();var _initEventListeners = new WeakSet();var _updateSize = new WeakSet();var _onImageLoaded = new WeakSet();var _clear = new WeakSet();var _drawInitialImage = new WeakSet();var _saveImageData = new WeakSet();var _getLineColors = new WeakSet();var _drawLine = new WeakSet();var _startDrawingLoop = new WeakSet();var _stopDrawingLoop = new WeakSet();var _start = new WeakSet();var _stop = new WeakSet();



class Example {























  constructor(root, onLoadCallback) {_stop.add(this);_start.add(this);_stopDrawingLoop.add(this);_startDrawingLoop.add(this);_drawLine.add(this);_getLineColors.add(this);_saveImageData.add(this);_drawInitialImage.add(this);_clear.add(this);_onImageLoaded.add(this);_updateSize.add(this);_initEventListeners.add(this);_loadImages.add(this);_root.set(this, { writable: true, value: void 0 });_canvas.set(this, { writable: true, value: void 0 });_hiddenCanvas.set(this, { writable: true, value: void 0 });_context.set(this, { writable: true, value: void 0 });_hiddenContext.set(this, { writable: true, value: void 0 });_images.set(this, { writable: true, value: void 0 });_imageWidth.set(this, { writable: true, value: void 0 });_imageHeight.set(this, { writable: true, value: void 0 });_numberOfImagesLoaded.set(this, { writable: true, value: void 0 });_areAllImagesLoaded.set(this, { writable: true, value: void 0 });_currentImageIndex.set(this, { writable: true, value: void 0 });_imageData.set(this, { writable: true, value: void 0 });_frameRequestId.set(this, { writable: true, value: void 0 });_lastX.set(this, { writable: true, value: void 0 });_lastY.set(this, { writable: true, value: void 0 });_startTime.set(this, { writable: true, value: void 0 });_onLoadCallback.set(this, { writable: true, value: void 0 });
    _classPrivateFieldSet(this, _root, root);
    _classPrivateFieldSet(this, _onLoadCallback, onLoadCallback);
    _classPrivateFieldSet(this, _canvas, document.createElement('canvas'));
    _classPrivateFieldSet(this, _context, _classPrivateFieldGet(this, _canvas).getContext('2d'));
    _classPrivateFieldSet(this, _hiddenCanvas, document.createElement('canvas'));
    _classPrivateFieldSet(this, _hiddenContext, _classPrivateFieldGet(this, _hiddenCanvas).getContext('2d'));
    _classPrivateFieldGet(this, _root).appendChild(_classPrivateFieldGet(this, _canvas));
    _classPrivateMethodGet(this, _updateSize, _updateSize2).call(this);
    _classPrivateMethodGet(this, _loadImages, _loadImages2).call(this);
    _classPrivateMethodGet(this, _initEventListeners, _initEventListeners2).call(this);
  }




















































































































































































  restart() {
    _classPrivateMethodGet(this, _stop, _stop2).call(this);
    _classPrivateMethodGet(this, _start, _start2).call(this);
  }}var _loadImages2 = function _loadImages2() {const width = _classPrivateFieldGet(this, _canvas).width;const height = _classPrivateFieldGet(this, _canvas).height;_classPrivateFieldSet(this, _images, []);_classPrivateFieldSet(this, _imageWidth, width);_classPrivateFieldSet(this, _imageHeight, height);const urls = [`https://picsum.photos/id/95/${width}/${height}`, `https://picsum.photos/id/545/${width}/${height}`, `https://picsum.photos/id/354/${width}/${height}`, `https://picsum.photos/id/154/${width}/${height}`];urls.forEach(url => {const image = document.createElement('img');image.crossOrigin = 'Anonymous';image.src = url;_classPrivateFieldGet(this, _images).push(image);});};var _initEventListeners2 = function _initEventListeners2() {window.addEventListener('resize', _classPrivateMethodGet(this, _updateSize, _updateSize2).bind(this));_classPrivateFieldGet(this, _images).forEach(image => {image.addEventListener('load', _classPrivateMethodGet(this, _onImageLoaded, _onImageLoaded2).bind(this));});};var _updateSize2 = function _updateSize2() {const width = window.innerWidth;const height = window.innerHeight;_classPrivateFieldGet(this, _canvas).width = width;_classPrivateFieldGet(this, _canvas).height = height;_classPrivateFieldGet(this, _hiddenCanvas).width = width;_classPrivateFieldGet(this, _hiddenCanvas).height = height;this.restart();};var _onImageLoaded2 = function _onImageLoaded2() {var _this$numberOfImagesL;_classPrivateFieldSet(this, _numberOfImagesLoaded, _classPrivateFieldGet(this, _numberOfImagesLoaded) || 0);_classPrivateFieldSet(this, _numberOfImagesLoaded, (_this$numberOfImagesL = +_classPrivateFieldGet(this, _numberOfImagesLoaded)) + 1), _this$numberOfImagesL;if (_classPrivateFieldGet(this, _numberOfImagesLoaded) === _classPrivateFieldGet(this, _images).length) {_classPrivateFieldSet(this, _areAllImagesLoaded, true);_classPrivateMethodGet(this, _clear, _clear2).call(this);_classPrivateFieldGet(this, _onLoadCallback).call(this);this.restart();}};var _clear2 = function _clear2() {_classPrivateFieldGet(this, _context).fillStyle = '#6d597a';_classPrivateFieldGet(this, _context).fillRect(0, 0, _classPrivateFieldGet(this, _canvas).width, _classPrivateFieldGet(this, _canvas).height);};var _drawInitialImage2 = function _drawInitialImage2() {const height = _classPrivateFieldGet(this, _hiddenCanvas).height;const width = _classPrivateFieldGet(this, _hiddenCanvas).width;const m = Math.min(width, height);_classPrivateFieldSet(this, _currentImageIndex, _classPrivateFieldGet(this, _currentImageIndex) || 0);if (_classPrivateFieldGet(this, _areAllImagesLoaded)) {_classPrivateFieldGet(this, _hiddenContext).drawImage(_classPrivateFieldGet(this, _images)[_classPrivateFieldGet(this, _currentImageIndex)], 0, 0, _classPrivateFieldGet(this, _imageWidth), _classPrivateFieldGet(this, _imageHeight), 0, 0, width, height);_classPrivateFieldSet(this, _currentImageIndex, (_classPrivateFieldGet(this, _currentImageIndex) + 1) % _classPrivateFieldGet(this, _images).length);}_classPrivateFieldSet(this, _startTime, performance.now());};var _saveImageData2 = function _saveImageData2() {const width = _classPrivateFieldGet(this, _hiddenCanvas).width;const height = _classPrivateFieldGet(this, _hiddenCanvas).height;_classPrivateFieldSet(this, _imageData, _classPrivateFieldGet(this, _hiddenContext).getImageData(0, 0, width, height));};var _getLineColors2 = function _getLineColors2(startX, startY, endX, endY) {const pixels = CanvasUtils.getLinePixels(startX, startY, endX, endY);const colors = [];const numberOfPixels = pixels.length;const width = _classPrivateFieldGet(this, _canvas).width;for (let i = 0; i < numberOfPixels; i++) {const x = pixels[i][0];const y = pixels[i][1];const colorIndices = CanvasUtils.getColorIndices(x, y, width);const r = _classPrivateFieldGet(this, _imageData).data[colorIndices[0]];const g = _classPrivateFieldGet(this, _imageData).data[colorIndices[1]];const b = _classPrivateFieldGet(this, _imageData).data[colorIndices[2]];const color = [r, g, b];colors.push(color);}return colors;};var _drawLine2 = function _drawLine2() {const startTime = _classPrivateFieldGet(this, _startTime) || 1;const time = performance.now();const deltaTime = time - startTime;const sizeModifier = _.limit(1 / (deltaTime / 500), 0.05, 0.3);const width = _classPrivateFieldGet(this, _canvas).width;const height = _classPrivateFieldGet(this, _canvas).height;const startX = _classPrivateFieldGet(this, _lastX) || 0;const startY = _classPrivateFieldGet(this, _lastY) || 0;const angle = Math.random() * 2 * Math.PI;const maxLength = 0.1 * Math.max(width, height) * devicePixelRatio;const length = _.limit(sizeModifier * maxLength, 1, maxLength);const endX = _.limit(startX + length * Math.cos(angle), 0, width);const endY = _.limit(startY + length * Math.sin(angle), 0, height);const lineColors = _classPrivateMethodGet(this, _getLineColors, _getLineColors2).call(this, startX, startY, endX, endY);const averageColor = CanvasUtils.getAverageColor(lineColors);const r = averageColor[0];const g = averageColor[1];const b = averageColor[2];const strokeStyle = `rgb(${r}, ${g}, ${b})`;const lineWidth = length;_classPrivateFieldGet(this, _context).strokeStyle = strokeStyle;_classPrivateFieldGet(this, _context).lineWidth = lineWidth;_classPrivateFieldGet(this, _context).lineCap = 'round';_classPrivateFieldGet(this, _context).beginPath();_classPrivateFieldGet(this, _context).moveTo(startX, startY);_classPrivateFieldGet(this, _context).lineTo(endX, endY);_classPrivateFieldGet(this, _context).stroke();_classPrivateFieldSet(this, _lastX, endX);_classPrivateFieldSet(this, _lastY, endY);};var _startDrawingLoop2 = function _startDrawingLoop2() {if (_classPrivateFieldGet(this, _frameRequestId)) {return;}const drawFrame = () => {const linesPerFrame = 133;for (let i = 0; i < linesPerFrame; i++) {_classPrivateMethodGet(this, _drawLine, _drawLine2).call(this);}requestAnimationFrame(drawFrame);};requestAnimationFrame(drawFrame);};var _stopDrawingLoop2 = function _stopDrawingLoop2() {cancelAnimationFrame(_classPrivateFieldGet(this, _frameRequestId));_classPrivateFieldSet(this, _frameRequestId, null);};var _start2 = function _start2() {_classPrivateMethodGet(this, _drawInitialImage, _drawInitialImage2).call(this);_classPrivateMethodGet(this, _saveImageData, _saveImageData2).call(this);_classPrivateMethodGet(this, _startDrawingLoop, _startDrawingLoop2).call(this);};var _stop2 = function _stop2() {_classPrivateMethodGet(this, _stopDrawingLoop, _stopDrawingLoop2).call(this);};


function main() {
  const root = document.getElementById('root');
  const example = new Example(root, () => {
    setTimeout(() => {
      root.classList.remove('-hidden');
    }, 100);

    setInterval(() => {
      example.restart();
    }, 1000 * Math.PI * 4);
  });
}

document.addEventListener('DOMContentLoaded', main);