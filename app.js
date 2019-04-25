const partToData = 'data.json';
class FetchHttp {
    get(url) {
        return new Promise((resolve, reject) => {
            fetch(url)
                .then(response => response.json())
                .then(answer => resolve(answer))
                .catch(err => reject(err));
        });
    }
}

/*

JSON data of charts prototype

const data = {
    FirstLineData: [
        {
        "date": "2010-01-01",
        "value": null
    },
        {
            "date": "2010-11-19",
            "value": "73.5927309188227"
        }
        ],
    SecondLineData: [
        {
        "date": "2010-01-01",
        "value": "1115.09997558594"
    },
        {
        "date": "2010-03-23",
        "value": "1174.17004394531"
    }
    ],
    ArrowsData: [
        {
            "type_of_rho": "direct",
            "min_period_id": "2010-11-15",
            "max_period_id": "2010-11-18",
            "tau": 2
        },
        {
            "type_of_rho": "reverse",
            "min_period_id": "2010-11-19",
            "max_period_id": "2010-11-25",
            "tau": 9
        }
        ]
};
*/

function sorteg(data, fild = 'value', {asc = true}={}) {
    data.sort((a, b) => {
        return asc ? (a[fild].localeCompare(b[fild])) : (b[fild].localeCompare(a[fild]))
    });
   return data[0];
};


let promise=new FetchHttp();

promise.get(partToData)
    .then(answer=> {
        let test = answer['FirstLineData'].slice();

        console.log(sorteg(test,'value'));

          /*  let chartContainer = document.createElement('div');
            chartContainer.classList.add('tchart');
            document.getElementById('charts').appendChild(chartContainer);*/

        /*    let chart = new ChartMaker(chartContainer);
            chart.setData(line);
            charts.push(chart);*/


    })
    .catch(err => console.error(err));


