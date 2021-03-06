const INITIAL = 1000
const VALUES = 100
const PRECISION = 1000000;

const map = r => x => r*x*(1-x);
const round = num => Math.round((num + Number.EPSILON) * PRECISION) / PRECISION;

onmessage = function({data : [r, domainX, domainY]}) {

    let next = map(r);
    let x = 0.5;
    let values = {};

    for (let i = 0; i < INITIAL; i++){
        x = next(x);
    }

    for(let i = 0; i < VALUES; i++){
        let candidate = round(x);
        if(values[candidate]===true) break;
        values[candidate] = true;
        x = next(x);
    }
    let message = Object
    .keys(values)
    .filter(value=>value>domainY[0]&&value<domainY[1])
    .sort()
    message.unshift(domainX)
    message.unshift(r)
    postMessage(message);

}
