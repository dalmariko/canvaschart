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


 let promise=new FetchHttp();

 promise.get(partToData)
 .then( answer => {
     new Chart(answer).init;
 })
 .catch(err => console.error(err));


/*

function randomInteger(min, max) {
    let rand = min - 0.5 + Math.random() * (max - min + 1);
    rand = Math.round(rand);
    return rand;
}
let data={SecondLineDataColor:[]};
for(let i=0;i<2500;i++){
    let x= {value:randomInteger(1,10000)};
    data.SecondLineDataColor.push(x);
};

new Chart(data).init;
*/

/*

My variand format points of data charts

let data = [
    {
        x:[123123123,123123123,1231231231,123123123],
        y: [1, 2, 3, 4, 5, 6],
        chartName:'ferstChart',
        chartColor:'#ffff',
    },
    {
        x:[123123123,123123123,1231231231,123123123],
        y: [10, 20, 30, 40, 50, 60],
        chartName:'secondChart',
        chartColor:'#00000',
    }
];*/
