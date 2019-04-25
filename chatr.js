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

let promise=new FetchHttp();

promise.get(partToData)
    .then(answer=>console.log(answer))
    .catch(err => console.error(err));



