class Chart{

    constructor(chart,settings) {
        this._settings = Object.assign(Chart.getDefaultsettings,chart,settings);
    }

  get init() {
        this.addTemplate();
        this.makeCanvas();
        this.addCanvasPoints();
        return this;
    }


     addTemplate() {
        let template = this.template(this._settings.id);
        document.querySelector(this._settings.charts).insertAdjacentHTML('beforeend', template);
    }

     template(id) {
        return ` 
        <div class="chart" data-id="${id}">
         <canvas></canvas>
        </div>`;
    }

     makeCanvas() {

        this.canvas=document.querySelector(`[data-id="${this._settings.id}"] canvas`);

        this.width=this.canvas.getBoundingClientRect().width*this._settings.pixelRatio;
        this.heigth=this.canvas.getBoundingClientRect().height*this._settings.pixelRatio;

        this.canvas.width=this.width;
        this.canvas.height=this.heigth;

        return this;
    }

     renderTextsY(points) {
         this.context.font = "12px serif";
         this.canvas.fillStyle = "#ff0000";
         points.forEach((item,i)=>{
                if(i%190==0){
                    this.context.fillText(item['date'], i*this.scaleX, 390);
                }
            });
    }

     addCanvasPoints(){

        this.context=this.canvas.getContext('2d');

        // this.context.fillStyle=this._settings.chartBackground;
        // this.context.fillRect(0,0,this.canvas.width,this.canvas.height);

               for(let points in this._settings){
                   points=='FirstLineData' ? this.bildChart(this._settings[points]) : this.context.strokeStyle = this._settings.FirstLineDataColor;
                   points=='SecondLineData' ? this.bildChart(this._settings[points]) : this.context.strokeStyle = this._settings.SecondLineDataColor;
        }
    }

     bildChart(points){

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

    this.scaleX=this.width/filteredData.length;
    this.scaleY=this.heigth/max;

        this.offsetX=(-0*this.scaleX)+(11*this._settings.pixelRatio);
        this.offsetY=(this.heigth-(min*this.scaleY))*-1;

/*

     console.log(
     'offsetX',this.offsetX,'\n',
     'offsetY',this.offsetY,'\n',
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
    this.context.lineWidth = this._settings.pixelRatio*this._settings.chartLineWidth;

this.renderTextsY(points);

    filteredData.forEach((y, x)=>{
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
            FirstLineDataColor:'#1919FF',
            SecondLineDataColor:'#7F7E7E'
        }
    }
}