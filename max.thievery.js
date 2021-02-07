/* 
Array to temporarily hold the value of combination of objects that are within the weight provided
*/
let _ = [];
/* 
Final value to be computed from maximum value contained in temporary array above
*/
let maxThieveryValue;

/* 
Recursive function
*/
function maxThievery(items, weight) {

    let weights = items.map(item => item.weight);
    let values = items.map(item => item.value);

    for (let i = 0; i < items.length + 1; i++) {

        /* Base Case */
        if (items.length == 1) {
            /* Check for highest value held in temporary array of combinations */
            maxThieveryValue = _.reduce(function (x, y) {
                return Math.max(x, y);
            })
            return maxThieveryValue;
        } else {
            /* Dynamically compute combination of values */
            for (let indice = 0; indice < values.length + 1; indice++) {
                /* Limit item combinations to that which falls within knapsack weight parameters */
                if ((weights[0] + weights[indice + 1]) <= weight) {
                    _.push(values[0] + values[indice + 1])
                } else {
                    continue;
                }
            }
            /* Remove first element from array of items in consideration */
            items.shift();
            /* 
            Array of items satisfies a non base case
            Call function recursively
            */
            return maxThievery(items, weight);
        }
    }
    return maxThieveryValue;
}

let thieveryItems = [{ "weight": 5, "value": 10 }, { "weight": 4, "value": 40 }, { "weight": 6, "value": 30 }, { "weight": 4, "value": 50 }];
let knapSackWeight = 10;

console.log(maxThievery(thieveryItems, knapSackWeight));



