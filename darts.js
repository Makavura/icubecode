/* 

Dart
4 Concentric circles

Boundaries = -10, -10, 10, 10
*/

function score(x, y) {

    let innerradius = 1, // 10 Points
        middleradius = 5, //  5 Points.
        outerradisu = 10, // 1 Point.  > 10 --> loser
        finalscore = 0;

    if (x > 10 || y > 10 ) { // outside target
        finalscore = 0;
    } else { //within target
        finalscore += 0;
        if (x >= 5 && x < 10 && y >= 5 && y < 10) {  // outermost
            finalscore += 1;
        } else if (x >= 1 && x < 5 && y >= 1 && y < 5) { // middlemost
            finalscore += 5;
        } else if (x < 1 && y < 1 ) { // innermost
            finalscore += 10;
        }
    }

    console.log(finalscore);
}

score(0, 10);
score(5, 5);
score(4, 2);
score(0,0);
score(1,1);