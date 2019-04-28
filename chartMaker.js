class Chart{

    constructor(chart,settings) {
        this._settings = Object.assign(Chart.getDefaultsettings(),chart,settings);
    }

  get init() {
        console.log(this._settings);
        Chart.addTemplate(this._settings);
        Chart.bildCharts(this._settings);
        Chart.renderChart(this._settings);
        return this;
    }


    static addTemplate(settings) {
        let template = Chart.template(settings);
        document.querySelector(settings.charts).insertAdjacentHTML('beforeend', template);
    }

    static template(settings) {
        return ` 
        <div class="chart" data-id="${settings.id}">
         <canvas></canvas>
        </div>`;
    }

    static bildCharts(settings) {

        this.canvas=document.querySelector(`[data-id="${settings.id}"] canvas`);

        this.width=this.canvas.getBoundingClientRect().width*settings.pixelRatio;
        this.heigth=this.canvas.getBoundingClientRect().height*settings.pixelRatio;

        this.canvas.width=this.width;
        this.canvas.height=this.heigth;

        return this;
    }


    static renderChart(settings){

        let chartPoints=settings.FirstLineData;

         let test = chartPoints.slice();

         let filteredData = test
             .filter(item => {return item['value'] !== null})
             .forEach(item => {return (item['value'] = item['value'] * 1)});


        /**
         * @param data - array
         * @param fild - fild in array
         * @param desc === true -> max ferst, === false -> max last
         * @returns {max or min number in array}
         */
        function sortMaxMin(data, fild = 'value', desc = true) {
            try {
                return data.slice().sort((a, b) => {
                    return desc ? b[fild] - a[fild] : a[fild] - b[fild];
                })[0][fild];
            }
            catch (e) {
                console.error(e)
            }
        }

        let max=sortMaxMin(test);
        let min=sortMaxMin(test,'value',false);

        this.scaleX=this.width/chartPoints.length;
        this.scaleY=this.heigth/max;

        console.log(
            'max',max,'\n',
            'min',min,'\n',
            'width',this.width,'\n',
            'heigth',this.heigth,'\n',
            'scaleX',this.scaleX,'\n',
            'scaleY',this.scaleY,'\n',
            'length',chartPoints.length,'\n',
        );



        let context=this.canvas.getContext('2d');

        context.fillStyle=settings.chartBackground;
        context.fillRect(0,0,this.canvas.width,this.canvas.height);

        context.beginPath();

        context.lineJoin = 'bevel';
        context.lineCap = 'butt';

        context.lineWidth = settings.pixelRatio*settings.chartLineWidth;
        context.globalAlpha=settings.globalAlpha;
        context.strokeStyle = settings.SecondLineDataColor;

        chartPoints.forEach((y, x)=>{
                context.lineTo(x*this.scaleX,y['value']*this.scaleY);
        });

        context.stroke();
    }

    static getDefaultsettings() {
        /**
         * Default settings
         */
        return {
            charts: '.charts',
            chart:'.chart',
            id:1,
            chartBackground:'#FFFEFE',
            globalAlpha:1,
            chartLineWidth:2,
            pixelRatio: window.devicePixelRatio,
            SecondLineDataColor:'#7F7E7E',
            FirstLineDataColor:'#1919FF'
        }
    }
}