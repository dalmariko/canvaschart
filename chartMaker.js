class Chart{

    constructor(chart,settings) {
        this._settings = Object.assign(Chart.getDefaultsettings(),chart,settings);
    }

  get init() {
        Chart.addTemplate(this._settings);
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




    static renderChart(settings){
        let pixelRatio= window.devicePixelRatio;
        let lineWidth=1 * pixelRatio;

        let chartPoints=settings.SecondLineData;



         let test = chartPoints.slice();

         let filteredData = test.filter(item => {
         return item['value'] !== null
         });
         filteredData.forEach(item => {
         return (item['value'] = item['value'] * 1)
         });


        /**
         * @param data - array
         * @param fild - fild in array
         * @param desc === true - max ferst, === false - max last
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



        let canvas=document.querySelector(`[data-id="${settings.id}"] canvas `);

        let width=canvas.getBoundingClientRect().width*pixelRatio;
        let heigth=canvas.getBoundingClientRect().height*pixelRatio;

        console.log(max,min,max-min);
        let scaleX=width/chartPoints.length;
        let scaleY=heigth/max;

        console.log(
            'width',width,'\n',
            'heigth',heigth,'\n',
            'scaleX',scaleX,'\n',
            'scaleY',scaleY,'\n',
            'length',chartPoints.length,'\n',
        );





        let context=canvas.getContext('2d');

        context.beginPath();
        context.lineJoin = 'bevel';
        context.lineCap = 'butt';
        context.lineWidth = lineWidth;
        context.globalAlpha=settings.globalAlpha;
        context.strokeStyle = settings.chartColor;

        chartPoints.forEach((y, x)=>{
            context.lineTo(x*scaleX,y['value']*scaleY);
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
            globalAlpha:1,
            chartColor:'#0e26ff',
        }
    }
}