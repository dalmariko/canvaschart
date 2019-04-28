class Chart{

    constructor(chart,settings) {
        this._settings = Object.assign(Chart.getDefaultsettings,chart,settings);
    }

  get init() {
        Chart.addTemplate(this._settings);
        Chart.makeCanvas(this._settings);
        Chart.addCanvasPoints(this._settings);
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

    static makeCanvas(settings) {

        this.canvas=document.querySelector(`[data-id="${settings.id}"] canvas`);

        this.width=this.canvas.getBoundingClientRect().width*settings.pixelRatio;
        this.heigth=this.canvas.getBoundingClientRect().height*settings.pixelRatio;

        this.canvas.width=this.width;
        this.canvas.height=this.heigth;

        return this;
    }

    static addCanvasPoints(settings) {

        this.context=this.canvas.getContext('2d');

        this.context.fillStyle='#FFFEFE';
        this.context.fillRect(0,0,this.canvas.width,this.canvas.height);

               for(let points in settings){
                   points=='FirstLineData' ? Chart.bildChart(settings[points]): this.context.strokeStyle = '#7F7E7E';
                   points=='SecondLineData' ? Chart.bildChart(settings[points]): this.context.strokeStyle = '#1919FF';
        }

    }

    static bildChart(points){

    let chartPoints=points;

    let filteredData = chartPoints.filter( item => {return item['value'] !== null} );

    /**
     * @param data - array
     * @param fild - fild in array
     * @param desc === true -> max ferst, === false -> max last
     * @returns {max or min number in array}
     */
    function sortMaxMin(data, fild = 'value', desc = true) {
        try {
            return data.slice().filter(item => {return item['value'] !== null}).sort((a, b) => {
                return desc ? b[fild] - a[fild] : a[fild] - b[fild];
            });
        }
        catch (e) {
            console.error(e)
        }
    }

    let max=sortMaxMin(chartPoints)[0]['value']*1;

    let min=sortMaxMin(chartPoints,'value',false)[0]['value']*1;

    this.scaleX=this.width/chartPoints.length;
    this.scaleY=this.heigth/max;



/*
     console.log(
     'max',max,'\n',
     'min',min,'\n',
     'width',this.width,'\n',
     'heigth',this.heigth,'\n',
     'scaleX',this.scaleX,'\n',
     'scaleY',this.scaleY,'\n',
     'length',filteredData.length,'\n',
     );
*/



    this.context.beginPath();

    this.context.lineJoin = 'bevel';
    this.context.lineCap = 'butt';

    this.context.globalAlpha=1;
    this.context.lineWidth = window.devicePixelRatio*2;


    chartPoints.forEach((y, x)=>{
        this.context.lineTo( x*this.scaleX,y['value']*this.scaleY );
    });

    this.context.stroke();
}



    static get getDefaultsettings() {
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