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



/*
let test = answer['FirstLineData'].slice();

let filteredData = test.filter(item => {
    return item['value'] !== null
});
filteredData.forEach(item => {
    return (item['value'] = item['value'] * 1)
});
*/


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


 let promise=new FetchHttp();

 promise.get(partToData)
 .then( answer => {
     new Chart(answer).init;
 })
 .catch(err => console.error(err));


// const data = {
//     FirstLineData: [
//         {
//             "date": "2010-01-01",
//             "value": null
//         },
//         {
//             "date": "2010-11-19",
//             "value": "73.5927309188227"
//         }
//     ],
//     SecondLineData: [
//         {
//             "date": "2010-01-01",
//             "value": "1115.09997558594"
//         },
//         {
//             "date": "2010-03-23",
//             "value": "1174.17004394531"
//         }
//     ],
//     ArrowsData: [
//         {
//             "type_of_rho": "direct",
//             "min_period_id": "2010-11-15",
//             "max_period_id": "2010-11-18",
//             "tau": 2
//         },
//         {
//             "type_of_rho": "reverse",
//             "min_period_id": "2010-11-19",
//             "max_period_id": "2010-11-25",
//             "tau": 9
//         }
//     ]
// };

/*
function randomInteger(min, max) {
    let rand = min - 0.5 + Math.random() * (max - min + 1);
    rand = Math.round(rand);
    return rand;
}
let data={SecondLineData:[]};
for(let i=0;i<500;i++){
    let x= {value:randomInteger(1,1500)};
    data.SecondLineData.push(x);
};

new Chart(data).init;*/
