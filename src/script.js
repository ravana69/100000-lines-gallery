class _ {
    static limit(value, min, max) {
        return Math.max(min, Math.min(value, max));
    }
}


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
            sum[2] / N
        ];

        return result;
    }
}


class Example {
    #root;

    #canvas;
    #hiddenCanvas;
    #context;
    #hiddenContext;

    #images;
    #imageWidth;
    #imageHeight;
    #numberOfImagesLoaded;
    #areAllImagesLoaded;
    #currentImageIndex;
    #imageData;

    #frameRequestId;

    #lastX;
    #lastY;

    #startTime;
    #onLoadCallback;

    constructor(root, onLoadCallback) {
        this.#root = root;
        this.#onLoadCallback = onLoadCallback;
        this.#canvas = document.createElement('canvas');
        this.#context = this.#canvas.getContext('2d');
        this.#hiddenCanvas = document.createElement('canvas');
        this.#hiddenContext = this.#hiddenCanvas.getContext('2d');
        this.#root.appendChild(this.#canvas);
        this.#updateSize();
        this.#loadImages();
        this.#initEventListeners();
    }

    #loadImages() {
        const width = this.#canvas.width;
        const height = this.#canvas.height;

        this.#images = [];
        this.#imageWidth = width;
        this.#imageHeight = height;

        const urls = [
            `https://picsum.photos/id/95/${width}/${height}`,
            `https://picsum.photos/id/545/${width}/${height}`,
            `https://picsum.photos/id/354/${width}/${height}`,
            `https://picsum.photos/id/154/${width}/${height}`,
        ];

        urls.forEach((url) => {
            const image = document.createElement('img');

            image.crossOrigin = 'Anonymous';
            image.src = url;

            this.#images.push(image);
        });
    }

    #initEventListeners() {
        window.addEventListener('resize', this.#updateSize.bind(this));

        this.#images.forEach((image) => {
            image.addEventListener('load', this.#onImageLoaded.bind(this));
        });
    }

    #updateSize() {
        const width = window.innerWidth;
        const height = window.innerHeight;

        this.#canvas.width = width;
        this.#canvas.height = height;
        this.#hiddenCanvas.width = width;
        this.#hiddenCanvas.height = height;

        this.restart();
    }

    #onImageLoaded() {
        this.#numberOfImagesLoaded = this.#numberOfImagesLoaded || 0;
        this.#numberOfImagesLoaded++;

        if (this.#numberOfImagesLoaded === this.#images.length) {
            this.#areAllImagesLoaded = true;
            this.#clear();
            this.#onLoadCallback();
            this.restart();
        }
    }

    #clear() {
        this.#context.fillStyle = '#6d597a';
        this.#context.fillRect(0, 0, this.#canvas.width, this.#canvas.height);
    }

    #drawInitialImage() {
        const height = this.#hiddenCanvas.height;
        const width = this.#hiddenCanvas.width;
        const m = Math.min(width, height);

        this.#currentImageIndex = this.#currentImageIndex || 0;

        if (this.#areAllImagesLoaded) {
            this.#hiddenContext.drawImage(
                this.#images[this.#currentImageIndex],
                0, 0, this.#imageWidth, this.#imageHeight,
                0, 0, width, height
            );

            this.#currentImageIndex =
                (this.#currentImageIndex + 1) % this.#images.length;
        }

        this.#startTime = performance.now();
    }

    #saveImageData() {
        const width = this.#hiddenCanvas.width;
        const height = this.#hiddenCanvas.height;

        this.#imageData = this.#hiddenContext.getImageData(0, 0, width, height);
    }

    #getLineColors(startX, startY, endX, endY) {
        const pixels = CanvasUtils.getLinePixels(startX, startY, endX, endY);
        const colors = [];
        const numberOfPixels = pixels.length;
        const width = this.#canvas.width;

        for (let i = 0; i < numberOfPixels; i++) {
            const x = pixels[i][0];
            const y = pixels[i][1];
            const colorIndices = CanvasUtils.getColorIndices(x, y, width);
            const r = this.#imageData.data[colorIndices[0]];
            const g = this.#imageData.data[colorIndices[1]];
            const b = this.#imageData.data[colorIndices[2]];
            const color = [r, g, b];

            colors.push(color);
        }

        return colors;
    }

    #drawLine() {
        const startTime = this.#startTime || 1;
        const time = performance.now();
        const deltaTime = time - startTime;
        const sizeModifier = _.limit(1 / (deltaTime / 500), 0.05, 0.3);
        const width = this.#canvas.width;
        const height = this.#canvas.height;
        const startX = this.#lastX || 0;
        const startY = this.#lastY || 0;
        const angle = Math.random() * 2 * Math.PI;
        const maxLength = 0.1 * Math.max(width, height) * devicePixelRatio;
        const length = _.limit(sizeModifier * maxLength, 1, maxLength);
        const endX = _.limit(startX + length * Math.cos(angle), 0, width);
        const endY = _.limit(startY + length * Math.sin(angle), 0, height);
        const lineColors = this.#getLineColors(startX, startY, endX, endY);
        const averageColor = CanvasUtils.getAverageColor(lineColors);
        const r = averageColor[0];
        const g = averageColor[1];
        const b = averageColor[2];
        const strokeStyle = `rgb(${r}, ${g}, ${b})`;
        const lineWidth = length;

        this.#context.strokeStyle = strokeStyle;
        this.#context.lineWidth = lineWidth;
        this.#context.lineCap = 'round';
        this.#context.beginPath();
        this.#context.moveTo(startX, startY);
        this.#context.lineTo(endX, endY);
        this.#context.stroke();

        this.#lastX = endX;
        this.#lastY = endY;
    }

    #startDrawingLoop() {
        if (this.#frameRequestId) {
            return;
        }

        const drawFrame = () => {
            const linesPerFrame = 133;

            for (let i = 0; i < linesPerFrame; i++) {
                this.#drawLine();
            }

            requestAnimationFrame(drawFrame);
        };

        requestAnimationFrame(drawFrame);
    }

    #stopDrawingLoop() {
        cancelAnimationFrame(this.#frameRequestId);

        this.#frameRequestId = null;
    }

    #start() {
        this.#drawInitialImage();
        this.#saveImageData();
        this.#startDrawingLoop();
    }

    #stop() {
        this.#stopDrawingLoop();
    }

    restart() {
        this.#stop();
        this.#start();
    }
}

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