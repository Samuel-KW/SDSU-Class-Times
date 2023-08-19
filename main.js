class CanvasHandler {
    constructor () {
        this.c = document.createElement('canvas');
        this.ctx = c.getContext('2d');

        this.width = c.width;
        this.height = c.height;
    }


    init () {

        c.addEventListener('resize', () => this.resize());
        this.draw();

        document.body.appendChild(c);
    }

    resize () {
        this.width = c.width;
        this.height = c.height;
    }

    draw () {

    }
}

const Session = new CanvasHandler();