

/* 

Dart
4 Concentric circles

Boundaries = -10, -10, 10, 10
*/

export default function score(x, y) {

    let innerradius = 1, // 10 Points
        middleradius = 5, //  5 Points.
        outerradisu = 10, // 1 Point.  > 10 --> loser
        finalscore = 0;

    if (x > 10 || y > 10 || x < -10 || y < -10) { // outside target
        finalscore = 0;
    } else { //within target
        finalscore += 0;
        if (x >= 5 && x < 10 || y >= 5 && y < 10 || x <= -5 && x > 10 || y <= -5 && y > 10) {  // outermost
            finalscore += 1;
        } else if (x >= 1 && x < 5 || y >= 1 && y < 5 || x > -5 && x <= -1 || y > -5 && y <= -1) { // middlemost
            finalscore += 5;
        } else if (x < 1 && y < 1 || x > -1 && y > -1) { // innermost
            finalscore += 10;
        }
    }

}