class CanvasHandler {
    constructor () {
        this.c = document.createElement('canvas');
        this.ctx = this.c.getContext('2d');

        this.width = this.c.width;
        this.height = this.c.height;
    }


    init () {

        this.resize();
        document.body.appendChild(this.c);
    }

    resize () {
        this.width = this.c.width;
        this.height = this.c.height;

        this.draw();
    }

    timeToIncrement (time) {
        const [, hour, minute, meridiem] = time.match(/(\d{1,2}):(\d{1,2})(AM|PM)/);
        return Number(minute) + (Number(hour) % 12 * 60) + (meridiem == 'PM' ? 720 : 0);
    }

    draw () {

        const sMaxHeight = 1440;
        const sMaxWidth = 5;

        const boxWidth = this.width / sMaxWidth;

        const dayIndex = {
            Monday: 0,
            Tuesday: 1,
            Wednesday: 2,
            Thursday: 3,
            Friday: 4
        }

        let colors = ['#000000', '#eb3434', '#de9733', '#ebdc0c', '#3cd611', '#16d9c2', '#1246e3', '#b417e8', '#e30b9f'];

        // Draw grid lines
        const xInc = this.width / sMaxWidth;
        const yInc = this.height / 24;

        this.ctx.strokeStyle = '#0000003A';
        for (let w = 0; w <= 5; ++w) {
            this.ctx.beginPath();
            this.ctx.moveTo(w * xInc, 0);
            this.ctx.lineTo(w * xInc, this.height);
            this.ctx.stroke();
        }

        for (let h = 0; h <= 24; ++h) {
            this.ctx.beginPath();
            this.ctx.moveTo(0, h * yInc);
            this.ctx.lineTo(this.width, h * yInc);
            this.ctx.stroke();
        }


        
        this.ctx.lineJoin = 'bevel';
        this.ctx.lineWidth = 1;

        this.ctx.font = "14px Arial";

        // Draw classes
        for (let className in classData) {
            const data = classData[className];
            if (data.classTimes && data.classDays) {

                this.ctx.fillStyle = colors.pop();

                for (let day of data.classDays) {
                    const [minStart, minEnd] = data.classTimes.map(e => this.timeToIncrement(e));

                    const rect = [
                        dayIndex[day] * boxWidth, 
                        (minStart / sMaxHeight) * this.height,
                        boxWidth,
                        ((minEnd - minStart) / sMaxHeight) * this.height
                    ]

                    // Draw rectangle
                    this.ctx.fillRect(...rect);

                    // Draw outline
                    this.ctx.setLineDash([5, 5]);
                    this.ctx.strokeRect(...rect);

                    this.ctx.save();
                    this.ctx.fillStyle = '#000';
                    this.ctx.fillText(className, rect[0] + 2, rect[1] + 14);
                    this.ctx.restore();
                    
                }
            }

            console.log(className, data);
        }

    }
}

const Session = new CanvasHandler();

Session.c.width = window.innerWidth;
Session.c.height = window.innerHeight;

Session.init();

