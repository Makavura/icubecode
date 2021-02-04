

/* 

Dart
4 Concentric circles

Boundaries = -10, -10, 10, 10
*/

export default function score(x, y){

    let innerradius = 1, // 10 Points
        middleradius = 5, //  5 Points.
        outerradisu = 10, // 1 Point.  > 10 --> loser
        finalscore = 0;

    if(x >10 || y >10 || x < -10 || y < -10 ) { // outside target
        finalscore = 0;
    } else { //within target
        finalscore += 0;
    }

}