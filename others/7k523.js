/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-12 13:45:12
 * @LastEditTime: 2019-08-12 17:01:14
 * @LastEditors: Please set LastEditors
 */
function randomSort(arr, newArr) {
    if (arr.length == 1) {
        newArr.push(arr[0]);
        return newArr;
    }
    var random = Math.ceil(Math.random() * arr.length) - 1;
    newArr.push(arr[random]); 
    arr.splice(random, 1);
    return randomSort(arr, newArr);
}; 

puke_original = ['A_♠', 'A_♥', 'A_♣', 'A_♦', '2_♠', '2_♥', '2_♣', '2_♦', '3_♠', '3_♥', '3_♣', '3_♦',
'4_♠', '4_♥', '4_♣', '4_♦', '5_♠', '5_♥', '5_♣', '5_♦', '6_♠', '6_♥', '6_♣', '6_♦',
'7_♠', '7_♥', '7_♣', '7_♦','8_♠', '8_♥', '8_♣', '8_♦', '9_♠', '9_♥', '9_♣', '9_♦',
'10_♠', '10_♥', '10_♣', '10_♦','J_♠', 'J_♥', 'J_♣', 'J_♦','Q_♠', 'Q_♥', 'Q_♣', 'Q_♦',
'K_♠', 'K_♥', 'K_♣', 'K_♦','KING', 'QUEEN'];

puke_Weight = {'A_♠': 20, 'A_♥'  : 20, 'A_♣'  : 20, 'A_♦': 20, 
'2_♠' : 40, '2_♥' : 40, '2_♣' : 40, '2_♦': 40,
'3_♠' : 30, '3_♥' : 30, '3_♣' : 30, '3_♦': 30,
'4_♠' : 4, '4_♥'  : 4, '4_♣'  : 4, '4_♦' : 4,
'5_♠' : 50, '5_♥' : 50, '5_♣' : 50, '5_♦': 50,
'6_♠' : 6, '6_♥'  : 6, '6_♣'  : 6, '6_♦' : 6,
'7_♠' : 70, '7_♥' : 70, '7_♣' : 70, '7_♦': 70,
'8_♠' : 8, '8_♥'  : 8, '8_♣'  : 8, '8_♦': 8,
'9_♠' : 9, '9_♥'  : 9, '9_♣'  : 9, '9_♦': 9,
'10_♠': 10, '10_♥': 10, '10_♣': 10, '10_♦': 10,
'J_♠' : 11, 'J_♥' : 11, 'J_♣' : 11, 'J_♦' : 11,
'Q_♠' : 12, 'Q_♥' : 12, 'Q_♣' : 12, 'Q_♦' : 12,
'K_♠' : 13, 'K_♥' : 13, 'K_♣'  : 13, 'K_♦' : 13,
'KING'    : 61, 'QUEEN'  : 60};

puke_Score =  {'A_♠': 0, 'A_♥'  : 0, 'A_♣'  : 0, 'A_♦': 0, 
'2_♠' : 0, '2_♥' : 0, '2_♣' : 0, '2_♦': 0,
'3_♠' : 0, '3_♥' : 0, '3_♣' : 0, '3_♦': 0,
'4_♠' : 0, '4_♥'  : 0, '4_♣'  : 0, '4_♦' : 0,
'5_♠' : 5, '5_♥' : 5, '5_♣' : 5, '5_♦': 5,
'6_♠' : 0, '6_♥'  : 0, '6_♣'  : 0, '6_♦' : 0,
'7_♠' : 0, '7_♥' : 0, '7_♣' : 0, '7_♦': 0,
'8_♠' : 0, '8_♥'  : 0, '8_♣'  : 0, '8_♦': 0,
'9_♠' : 0, '9_♥'  : 0, '9_♣'  : 0, '9_♦': 0,
'10_♠': 10, '10_♥': 10, '10_♣': 10, '10_♦': 10,
'J_♠' : 0, 'J_♥' : 0, 'J_♣' : 0, 'J_♦' : 0,
'Q_♠' : 0, 'Q_♥' : 0, 'Q_♣' : 0, 'Q_♦' : 0,
'K_♠' : 10, 'K_♥' : 10, 'K_♣'  : 10, 'K_♦' : 10,
'KING'    : 0, 'QUEEN'  : 0};

function findPuke_First(arr) {
	if(arr.length == 0) return [];
	
	var pMin = arr[0];
	var pMinNum = findPuke_Times(arr, pMin);	
	
	for (var i = 1; i <arr.length; i++){
        if(puke_Weight[pMin] * findPuke_Times(arr, arr[i])  > puke_Weight[arr[i]] * pMinNum ){
            pMin = arr[i];
            pMinNum = findPuke_Times(arr, arr[i]);	
        }
        /*
        else if (puke_Weight[pMin] == puke_Weight[arr[i]] ) 
        {
            pMinNum ++;
        }
        */
    }

    var outArr = [];
    i = 0;
	while (i < arr.length){
        if(puke_Weight[pMin] == puke_Weight[arr[i]] ) {
            outArr.push(arr[i]);
            arr.splice(i, 1);
        }else{
            i++;
        }
    }
    
    return outArr;
}

function findPuke_Times(arr, poke) {
	var pMinNum = 0;	

	for (var i = 0; i <arr.length; i++){
        if(puke_Weight[poke] == puke_Weight[arr[i]] ){
            pMinNum ++;	
        }
    }    
    //console.log(poke, pMinNum);
    return pMinNum;
}


function findPuke_Second(arr, arrA, arrScore) {
    if(arr.length == 0) return [];
    if(arrA.length == 0) return findPuke_First(arr); 
	
	var pMin_A = arrA[0];
	var pMinNum_A = arrA.length;	
    var pMin = [];
    var pMinNum = 0;

	for (var i = 0; i <arr.length; i++){
        if(puke_Weight[pMin_A] < puke_Weight[arr[i]] ){
            var tmp_num = findPuke_Times(arr, arr[i]);
            if(pMinNum_A <= tmp_num){
                if(pMin.length == 0){
                    pMin = arr[i];
                    pMinNum = tmp_num;
                }else{
                    if( pMinNum > tmp_num) 
                    {
                        pMin = arr[i];
                        pMinNum = tmp_num;                        
                    }
                    else {
                        if((puke_Weight[pMin] > puke_Weight[arr[i]]) && (pMinNum == tmp_num))
                        {
                            pMin = arr[i];
                            pMinNum = tmp_num;
                        }
                    }
                }                
            }
        }
    }
    var outArr = [];
    if(pMin.length){
        i = 0;
        var count = 0;
        while (i < arr.length){
            if(puke_Weight[pMin] == puke_Weight[arr[i]] ) {
                outArr.push(arr[i]);
                arr.splice(i, 1);

                count++;
                if(count++ >= pMinNum_A) break;
            }else{
                i++;
            }
        }

        if(arrScore.length == 0 ){
            if(puke_Weight[outArr[0]] > 50){
                outArr = [];
            }
        }
    }

    return outArr;
}

function Collect_Score(arr, arr_round) {
    if(arr_round.length == 0) return;

    for (var i = 0; i <arr_round.length; i++){
        if(puke_Score[arr_round[i]]){
            arr.push(arr_round[i]);
        }
    }
}

function Calculate_Score(arr) {
    if(arr.length == 0) return 0;
    var score = 0;

    for (var i = 0; i <arr.length; i++){
        score += puke_Score[arr[i]];
    }
    return score;
}

puke_sorted = [];
randomSort(puke_original, puke_sorted);
console.log("Puke initial: ", puke_sorted);

Player_A = [];
Player_B = [];
Player_A.push(puke_sorted.pop(0));
Player_B.push(puke_sorted.pop(0));
Player_A.push(puke_sorted.pop(0));
Player_B.push(puke_sorted.pop(0));
Player_A.push(puke_sorted.pop(0));
Player_B.push(puke_sorted.pop(0));
Player_A.push(puke_sorted.pop(0));
Player_B.push(puke_sorted.pop(0));
Player_A.push(puke_sorted.pop(0));
Player_B.push(puke_sorted.pop(0));

//Player_A = [ '4_♦', 'A_♦', 'K_♠', '4_♥', '10_♦' ];
//Player_B = [ '7_♠', '10_♦', '9_♦', '9_♠', '4_♠' ];

var Round_role = 'A';
var Player_A_Score = [];
var Player_B_Score = [];

while (true)
{
    console.log(" ");
    console.log("------- Round  Started ---------, Remaining Poke :   ", puke_sorted.length);
    console.log("Player A:" , Player_A);
    console.log("Player B:" , Player_B);

    var Round_first = true;
    var Round_A = [], Round_B = [];
    var Round_count = 0;
    var Round_Win = 'A';

    var Round_Score = [];

    while(true){
        if (Round_count % 2 == 0){
            console.log("----- Play round -----  ",  Round_count/2);
        }
        Round_count ++;
        
        if(Round_first){
            Round_first = false;
            
            if(Round_role == 'A'){
                Round_Win = 'A';

                Round_A = findPuke_First(Player_A);
                if(Round_A.length >0 ){
                    Collect_Score(Round_Score, Round_A);
                    console.log("Round A:" , Round_A, Player_A);
                    Round_role = 'B';
                    continue;      
                }else{
                    break;
                }
            }else{
                Round_Win = 'B';

                Round_B = findPuke_First(Player_B);
                if(Round_B.length >0 ){
                    Collect_Score(Round_Score, Round_B);
                    console.log("Round B:" , Round_B, Player_B);
                    Round_role = 'A';
                    continue;      
                }else{
                    break;
                }
            }        
        }

        if(Round_role == 'A'){
            Round_A = findPuke_Second(Player_A, Round_B, Round_Score);
            if(Round_A.length >0 ){
                Collect_Score(Round_Score, Round_A);
                console.log("Round A:" , Round_A, Player_A);
                Round_role = 'B';
                continue;      
            }else{
                Round_Win = 'B';
                break;
            }
        }else{
            Round_B = findPuke_Second(Player_B, Round_A, Round_Score);
            if(Round_B.length >0 ){
                Collect_Score(Round_Score, Round_B);
                console.log("Round B:" , Round_B, Player_B);
                Round_role = 'A';
                continue;      
            }else{
                Round_Win = 'A';
                break;
            }
        }   
    }

    console.log("---- Round Result ---- " );
    console.log("Winner: " , Round_Win);
    console.log("Round Score Puke: " , Round_Score);
    console.log("Round Score: " , Calculate_Score(Round_Score));

    if(puke_sorted.length == 0)
    {
        if(Round_Win == 'A')
        {
            Player_A_Score = Player_A_Score.concat(Round_Score); 
            Round_role = 'A';
        }
        if(Player_A.length == 0){
            Round_Score = [];
            Collect_Score(Round_Score, Player_B);
            console.log("Player B Remained Puke: " , Player_B);
            console.log("Round Score Puke: " , Round_Score);
            Player_A_Score = Player_A_Score.concat(Round_Score); 
            break;
        }

        if(Round_Win == 'B')
        {
            Player_B_Score = Player_B_Score.concat(Round_Score); 
            Round_role = 'B';
        }
        if(Player_B.length == 0){
            Round_Score = [];
            Collect_Score(Round_Score, Player_A);
            console.log("Player A Remained Puke: " , Player_A);
            console.log("Round Score Puke: " , Round_Score);
            Player_B_Score = Player_B_Score.concat(Round_Score); 

            break;
        }
        
    } else {
        if(Round_Win == 'A'){
            Player_A_Score = Player_A_Score.concat(Round_Score); 
            Round_role = 'A';

            while(puke_sorted.length>0 && Player_A.length <5){
                Player_A.push(puke_sorted.pop(0));
            }
            while(puke_sorted.length>0 && Player_B.length <5){
                Player_B.push(puke_sorted.pop(0));
            }
        }
        if(Round_Win == 'B'){
            Player_B_Score = Player_B_Score.concat(Round_Score); 
            Round_role = 'B';

            while(puke_sorted.length>0 && Player_B.length <5){
                Player_B.push(puke_sorted.pop(0));
            }
            while(puke_sorted.length>0 && Player_A.length <5){
                Player_A.push(puke_sorted.pop(0));
            }            
        }
    }
}



console.log("---- Play Finished Result ---- " );
console.log("Player A Score Puke: " , Player_A_Score);
console.log("Player A Score: " , Calculate_Score(Player_A_Score));
console.log("Player B Score Puke: " , Player_B_Score);
console.log("Player B Score: " , Calculate_Score(Player_B_Score));
if(Calculate_Score(Player_A_Score) > Calculate_Score(Player_B_Score)) {
    console.log("Player A Win! ");
}
if(Calculate_Score(Player_A_Score) < Calculate_Score(Player_B_Score)) {
    console.log("Player B Win! ");
}
if(Calculate_Score(Player_A_Score) == Calculate_Score(Player_B_Score)) {
    console.log("Player A and Player B Equal! ");
}

//♠ ♣ ♦ ♥