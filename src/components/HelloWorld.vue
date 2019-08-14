<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-12 22:30:09
 * @LastEditTime: 2019-08-14 09:36:28
 * @LastEditors: Please set LastEditors
 -->

<template>
  <div >
    <h2><button v-on:click="ShufflePoker">New Game </button>  
    <button v-on:click="CheatUncover">Cover/Uncover {{poker_sorted.length}}</button> 
    {{ msg }} 
  
    <button v-on:click="NewRound" v-if="!poker_empty && Round.Round_finish">New Round</button>
    </h2>
    <ul v-if="!start_game">
      <li v-for ="item in poker_sorted" :key="item">
          <img :src= "'../static/img/' + item + '.jpg'">
      </li>
    </ul>

    <div v-if="start_game && !game_finished">
      <h4> <span v-if="Round.Round_Role=='A'" class="span_Arrow"> >> </span>
        Visible? <input type="checkbox" v-model="Player_A_Visible"> , Robot Wing, Score now is .. <span>{{Player_A_ScoreSum}}</span> .. , 
        <button v-on:click="Round.Round_A_Giveup=true;A_Play();" v-if="!Round.Round_finish  &&  Round.Round_Role=='A' && !Round.Round_first">Give Up</button> 
        <button v-on:click="A_Play" v-if="!Round.Round_finish  &&  Round.Round_Role=='A'">Play</button> 
        </h4>
      
      <ul>
        <li v-for ="(item, i) in Player_A" :key="i">
            <img :src= "'../static/img/' + item + '.jpg'" v-if="Player_A_Visible" v-on:click="selectPoke('A', i)">
            <img :src= "'../static/img/' + Blank_Pic + '.jpg'" v-if="!Player_A_Visible">
            <input type="checkbox" v-model="Player_A_Selection[i]" v-if="Player_A_Visible">
        </li>
      </ul>
      <h4> <span v-if="Round.Round_Role=='B'"  class="span_Arrow"> >> </span>
        Visible? <input type="checkbox" v-model="Player_B_Visible">, Robot Andy, Score now is .. <span>{{Player_B_ScoreSum}}</span> .. , 
          <button v-on:click="Round.Round_B_Giveup=true;B_Play();" v-if="!Round.Round_finish &&  Round.Round_Role=='B' && !Round.Round_first">Give Up</button> 
          <button v-on:click="B_Play" v-if="!Round.Round_finish &&  Round.Round_Role=='B'">Play</button> 
          </h4>
      <ul>
        <li v-for ="(item, i) in Player_B" :key="i">
            <img :src= "'../static/img/' + item + '.jpg'" v-if="Player_B_Visible" v-on:click="selectPoke('B', i)">
            <img :src= "'../static/img/' + Blank_Pic + '.jpg'" v-if="!Player_B_Visible">
            <input type="checkbox" v-model="Player_B_Selection[i]" v-if="Player_B_Visible">
        </li>
      </ul>  
      <h4  v-if="!Round.Round_finish">Pool ... </h4>
      <h4  v-if="Round.Round_finish">Round winner is Player <span>{{Round.Round_Winner=='A'?'Robot Wing':'Robot Andy'}}</span> , 
      Get Score .. <span> {{Round_ScoreSum}}</span> .. </h4>
      <ul>
        <li v-for ="(item, i) in Round.Round_Pool" :key="i">
            <img :src= "'../static/img/' + item + '.jpg'">
            <p>{{i+1}}</p>
        </li>
      </ul>            
    </div>
    
    <div v-if="game_finished">
      <h2> This 7k523 Game, Winner is:  Player <span>{{ Game_Winner }}</span> </h2>
      <h4> Robot Wing, Score Totle is .. <span>{{Player_A_ScoreSum}}</span> .. </h4>      
      <ul>
        <li v-for ="(item, i) in Player_A_Score" :key="i">
            <img :src= "'../static/img/' + item + '.jpg'">
            <!--<p>{{i+1}}</p>-->
        </li>
      </ul>

      <h4>Robot Andy, Score Totle is .. <span>{{Player_B_ScoreSum}}</span> .. </h4>
      <ul>
        <li v-for ="(item, i) in Player_B_Score" :key="i">
            <img :src= "'../static/img/' + item + '.jpg'">
            <!--<p>{{i+1}}</p>-->
        </li>
      </ul>  
                  
    </div>

  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: "Welcome to Andy and Wing's Poker App！  ",
      poker_sorted : [],
      start_game: false, 
      game_finished : false, 
      Player_A : [],
      Player_B : [], 
      Player_A_Score : [],
      Player_B_Score : [], 
      Player_A_Visible : true,
      Player_B_Visible : true, 
      Blank_Pic: 'BLANK',
      Player_A_Selection : [false, false, false, false, false], 
      Player_B_Selection : [false, false, false, false, false], 

      Round : {
        Round_first : true, 
        Round_finish : false,  
        Round_Role : 'A',                
        Round_A : [],
        Round_B : [],
        Round_Winner : '',
        Round_Score : [],
        Round_Pool : [], 
        Round_A_Giveup : false,
        Round_B_Giveup : false,
      }
    }
  },
  computed: {
    Round_ScoreSum : function(){
      return Calculate_Score(this.Round.Round_Score);
    }, 
    Player_A_ScoreSum : function(){
      return Calculate_Score(this.Player_A_Score);
    }, 
    Player_B_ScoreSum : function(){
      return Calculate_Score(this.Player_B_Score);
    }, 
    Game_Winner : function(){
      let aScore = Calculate_Score(this.Player_A_Score);
      let bScore = Calculate_Score(this.Player_B_Score);
      if(aScore > bScore) return 'Wing';
      if(aScore < bScore) return 'Andy';
      if(aScore == bScore) return 'Wing and Andy';
    }, 
    poker_empty : function(){
      return !this.poker_sorted.length; 
    },     
  },

  methods: {
    
    ShufflePoker: function() {
      function RandomShuffle(arr, newArr) {
      if (arr.length == 1) {
          newArr.push(arr[0]);
          return newArr;
      }
      var random = Math.ceil(Math.random() * arr.length) - 1;
      newArr.push(arr[random]); 
      arr.splice(random, 1);
      return RandomShuffle(arr, newArr);      
    }

    this.start_game  = false;
    this.game_finished = false;
    this.poker_sorted =  [...poker_original];
    this.poker_sorted = RandomShuffle(this.poker_sorted, []);

    this.start_game =  true;
    this.Player_A = [];
    this.Player_B = [];
    this.Player_A_Score = [];
    this.Player_B_Score = [];

    for(let i = 0; i< 5; i++){
      this.Player_A.push(this.poker_sorted.shift(0));
      this.Player_B.push(this.poker_sorted.shift(0));
    }
    //this.Player_A = ['A_♠', 'A_♥', 'A_♣', 'A_♦', 'QUEEN'];
    //this.Player_B = ['K_♥', 'K_♣', 'K_♦', 'KING', '2_♠'];    
    this.$options.methods.initRound(this);
    }, 

    selectPoke : function(flag, i){
      if(flag == 'A') {
        this.Player_A_Selection[i] = !this.Player_A_Selection[i];
        this.Player_A_Selection = [ ...this.Player_A_Selection];
      }
      if(flag == 'B') {
        this.Player_B_Selection[i] = !this.Player_B_Selection[i];
        this.Player_B_Selection = [ ...this.Player_B_Selection];
      }      
    }, 

    A_Play : function(){
      if(this.Round.Round_Role != 'A') return;

      if(this.Round.Round_A_Giveup){
        this.Round.Round_Winner = 'B';
        this.Round.Round_finish = true;
        this.Player_B_Score = this.Player_B_Score.concat(this.Round.Round_Score); 
        this.Round.Round_Role = 'B';

        if(this.poker_empty && this.Player_B.length) {
          this.$options.methods.initRound(this);            
        }else{
          this.Round.Round_A_Giveup = false; 
        }           
        return ;        
      }
      
      let selected = {'selected_value':'', 'selected_count':0, 'check_err':false};
      if(this.Player_A_Selection[0] || this.Player_A_Selection[1] || this.Player_A_Selection[2] 
        || this.Player_A_Selection[3] || this.Player_A_Selection[4] ){
        
        selected = SelectedCheck(this.Player_A, this.Player_A_Selection, this.Round.Round_B);

        this.Player_A_Selection  = [false, false, false, false, false];  
        if(selected.check_err) return;
      }

      // Automatic play 
      if(this.Round.Round_first){
        this.Round.Round_first = false;
        this.Round.Round_A = findPoker_First(this.Player_A, selected);
        this.Round.Round_Role = 'B';

        Collect_Score(this.Round.Round_Score, this.Round.Round_A);
        this.Round.Round_Pool = this.Round.Round_Pool.concat(this.Round.Round_A);
      }else{
        this.Round.Round_A = findPoker_Second(this.Player_A, this.Round.Round_B, this.Round.Round_Score, this.poker_empty, selected);
        if(this.Round.Round_A.length >0 ){
            this.Round.Round_Role = 'B';
            Collect_Score(this.Round.Round_Score, this.Round.Round_A);
            this.Round.Round_Pool = this.Round.Round_Pool.concat(this.Round.Round_A);              
        }else{
            this.Round.Round_Winner = 'B';
            this.Round.Round_finish = true;
            this.Player_B_Score = this.Player_B_Score.concat(this.Round.Round_Score); 
            this.Round.Round_Role = 'B';

            if(this.poker_empty && this.Player_B.length){
                this.$options.methods.initRound(this);             
            }
        } 
      }

      //console.log('A', this.poker_empty, this.Player_A.length, !this.Player_A.length)
      if(this.poker_empty && !this.Player_A.length){
        this.game_finished = true;
        this.Round.Round_Score = [];
        Collect_Score(this.Round.Round_Score, this.Player_B);
        this.Player_A_Score = this.Player_A_Score.concat(this.Round.Round_Score); 
        return ; 
      }  
    },

    B_Play : function(){
      if(this.Round.Round_Role != 'B') return;

      if(this.Round.Round_B_Giveup){
        this.Round.Round_Winner = 'A';
        this.Round.Round_finish = true;
        this.Player_A_Score = this.Player_A_Score.concat(this.Round.Round_Score); 
        this.Round.Round_Role = 'A';

        if(this.poker_empty && this.Player_A.length) {
          this.$options.methods.initRound(this);            
        }else{
          this.Round.Round_B_Giveup = false; 
        }        
        return ;      
      }

      let selected = {'selected_value':'', 'selected_count':0, 'check_err':false};
      if(this.Player_B_Selection[0] || this.Player_B_Selection[1] || this.Player_B_Selection[2] 
        || this.Player_B_Selection[3] || this.Player_B_Selection[4] ){
        
        selected = SelectedCheck(this.Player_B, this.Player_B_Selection, this.Round.Round_A);

        this.Player_B_Selection  = [false, false, false, false, false];  
        if(selected.check_err) return;
      }

      // Automatic play 
     if(this.Round.Round_first){
        this.Round.Round_first = false;
        this.Round.Round_B = findPoker_First(this.Player_B, selected);
        this.Round.Round_Role = 'A';

        Collect_Score(this.Round.Round_Score, this.Round.Round_B);
        this.Round.Round_Pool = this.Round.Round_Pool.concat(this.Round.Round_B);
      }else{
        this.Round.Round_B = findPoker_Second(this.Player_B, this.Round.Round_A, this.Round.Round_Score, this.poker_empty, selected);
        if(this.Round.Round_B.length >0 ){
            this.Round.Round_Role = 'A';
            Collect_Score(this.Round.Round_Score, this.Round.Round_B);
            this.Round.Round_Pool = this.Round.Round_Pool.concat(this.Round.Round_B);   
        }else{
            this.Round.Round_Winner = 'A';
            this.Round.Round_finish = true;
            this.Player_A_Score = this.Player_A_Score.concat(this.Round.Round_Score); 
            this.Round.Round_Role = 'A';

            if(this.poker_empty && this.Player_A.length) {
                this.$options.methods.initRound(this);            
            }
        }               
      }
      if(this.poker_empty && !this.Player_B.length){
          this.game_finished = true;
          this.Round.Round_Score = [];
          Collect_Score(this.Round.Round_Score, this.Player_A);
          this.Player_B_Score = this.Player_B_Score.concat(this.Round.Round_Score); 
          return ; 
      }             
    },

    CheatUncover : function(){
      this.start_game =  !  this.start_game;
    }, 

    NewRound : function(){
      if (!this.poker_sorted.length) return; 

      if(this.Round.Round_Winner == 'A'){
          while(this.poker_sorted.length > 0 && this.Player_A.length < 5){
            this.Player_A.push(this.poker_sorted.shift(0));
          }
          while(this.poker_sorted.length > 0 && this.Player_B.length < 5){
            this.Player_B.push(this.poker_sorted.shift(0));
          }  
      }
      if(this.Round.Round_Winner == 'B'){
          while(this.poker_sorted.length > 0 && this.Player_B.length < 5){
            this.Player_B.push(this.poker_sorted.shift(0));
          }   
          while(this.poker_sorted.length > 0 && this.Player_A.length < 5){
            this.Player_A.push(this.poker_sorted.shift(0));
          }            
      }

      this.$options.methods.initRound(this);
    }, 

    initRound : function(_this){      
      _this.Round.Round_first = true; 
      _this.Round.Round_finish = false;
      //_this.Round.Round_Role = 'A';               
      _this.Round.Round_A = [];
      _this.Round.Round_B = [];
      _this.Round.Round_Winner = '';
      _this.Round.Round_Score = [];
      _this.Round.Round_Pool = []; 
      _this.Round.Round_A_Giveup = false;
      _this.Round.Round_B_Giveup = false;
    }, 
  }
}

const poker_original = ['A_♠', 'A_♥', 'A_♣', 'A_♦', '2_♠', '2_♥', '2_♣', '2_♦', '3_♠', '3_♥', '3_♣', '3_♦',
'4_♠', '4_♥', '4_♣', '4_♦', '5_♠', '5_♥', '5_♣', '5_♦', '6_♠', '6_♥', '6_♣', '6_♦',
'7_♠', '7_♥', '7_♣', '7_♦', '8_♠', '8_♥', '8_♣', '8_♦', '9_♠', '9_♥', '9_♣', '9_♦',
'10_♠', '10_♥', '10_♣', '10_♦', 'J_♠', 'J_♥', 'J_♣', 'J_♦', 'Q_♠', 'Q_♥', 'Q_♣', 'Q_♦',
'K_♠', 'K_♥', 'K_♣', 'K_♦', 'KING', 'QUEEN'];

 /* for speed up test only
const poker_original = ['A_♠', 'A_♥', 'A_♣', 'A_♦', '2_♠', '2_♥', '2_♣', '2_♦', '3_♠', '3_♥', '3_♣', '3_♦',
'4_♠', '4_♥', '4_♣', '4_♦', '5_♠'];
*/

const poker_Weight = {'A_♠': 20, 'A_♥'  : 20, 'A_♣'  : 20, 'A_♦': 20, 
'2_♠' : 40, '2_♥' : 40, '2_♣' : 40, '2_♦': 40,
'3_♠' : 30, '3_♥' : 30, '3_♣' : 30, '3_♦': 30,
'4_♠' : 4, '4_♥'  : 4, '4_♣'  : 4, '4_♦' : 4,
'5_♠' : 50, '5_♥' : 50, '5_♣' : 50, '5_♦': 50,
'6_♠' : 6, '6_♥'  : 6, '6_♣'  : 6, '6_♦' : 6,
'7_♠' : 1000, '7_♥' : 1000, '7_♣' : 1000, '7_♦': 1000,
'8_♠' : 8, '8_♥'  : 8, '8_♣'  : 8, '8_♦': 8,
'9_♠' : 9, '9_♥'  : 9, '9_♣'  : 9, '9_♦': 9,
'10_♠': 10, '10_♥': 10, '10_♣': 10, '10_♦': 10,
'J_♠' : 11, 'J_♥' : 11, 'J_♣' : 11, 'J_♦' : 11,
'Q_♠' : 12, 'Q_♥' : 12, 'Q_♣' : 12, 'Q_♦' : 12,
'K_♠' : 13, 'K_♥' : 13, 'K_♣'  : 13, 'K_♦' : 13,
'KING' : 200.1, 'QUEEN'  : 200};

const poker_Score =  {'A_♠': 0, 'A_♥'  : 0, 'A_♣'  : 0, 'A_♦': 0, 
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

function findPoker_First(arr, selected) {
  if(arr.length == 0) return [];
	let pMin = arr[0];
  let pMinNum = findPoker_Times(arr, pMin);	
  
  if(!selected.check_err && selected.selected_count > 0){
      pMin = selected.selected_value;
      pMinNum = selected.selected_count;
  }else{
    for (let i = 1; i <arr.length; i++){
      if(poker_Weight[pMin] * findPoker_Times(arr, arr[i])  > poker_Weight[arr[i]] * pMinNum){
        pMin = arr[i];
        pMinNum = findPoker_Times(arr, arr[i]);	
      }
    }
  }

  let outArr = [];
  let i = 0;
	while (i < arr.length){
    if(Math.abs(poker_Weight[pMin] - poker_Weight[arr[i]]) < 0.9 ) {
      outArr.push(arr[i]);
      arr.splice(i, 1);
      if (outArr.length >= pMinNum) break;
    }else{
      i++;
    }
  }   

  return outArr;
}

function findPoker_Times(arr, poke) {
	let pMinNum = 0;	

	for (let i = 0; i <arr.length; i++){
    if(Math.abs(poker_Weight[poke] - poker_Weight[arr[i]]) < 0.9){
      pMinNum ++;	
    }
  }    
  return pMinNum;
}

function findPoker_Second(arr, arrA, arrScore, empty, selected) {
  if(arr.length == 0) return [];
  if(arrA.length == 0) return findPoker_First(arr); 
	
	let pMin_A = arrA[0];
	let pMinNum_A = arrA.length;	
  let pMin = [];
  let pMinNum = 0;
  let outArr = [];

  let manualSel = false; 
  if(!selected.check_err && selected.selected_count >0){
    pMin = selected.selected_value;
    pMinNum = selected.selected_count;

    if(pMinNum >= pMinNum_A && poker_Weight[pMin] > poker_Weight[pMin_A]){
      manualSel = true;
    }else{
      return [];
    }
  }else{
    for (let i = 0; i <arr.length; i++){
          if(poker_Weight[pMin_A] < poker_Weight[arr[i]] ){
              let tmp_num = findPoker_Times(arr, arr[i]);
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
                          if((poker_Weight[pMin] > poker_Weight[arr[i]]) && (pMinNum == tmp_num))
                          {
                              pMin = arr[i];
                              pMinNum = tmp_num;
                          }
                      }
                  }                
              }
          }
      }
    }


    if(pMin.length){
        let i = 0;
        let count = 0;
        while (i < arr.length){
            if(Math.abs(poker_Weight[pMin] - poker_Weight[arr[i]]) < 0.9) {
              if(arrScore.length == 0 && (poker_Weight[arr[i]] > 50) && !empty && !manualSel){
                  ;
              }else{
                outArr.push(arr[i]);
                arr.splice(i, 1);
              }
              count++;
              if(count++ >= pMinNum_A) break;
              
            }else{
                i++;
            }
        }
    }
    return outArr;
}

function Collect_Score(arr, arr_round) {
    if(arr_round.length == 0) return;

    for (let i = 0; i <arr_round.length; i++){
        if(poker_Score[arr_round[i]]){
            arr.push(arr_round[i]);
        }
    }
}

function Calculate_Score(arr) {
    if(arr.length == 0) return 0;
    let score = 0;

    for (var i = 0; i <arr.length; i++){
        score += poker_Score[arr[i]];
    }
    return score;
}

function SelectedCheck(arr, arrselect, arrA){
  let selected_value ='';
  let check_err = false;
  let selected_count = 0;

  for(let i=0; i <5; i++){
    if(arrselect[i]){
      if(!selected_value) {
        selected_value = arr[i];
        selected_count = 1;
        continue;
      }
      if(Math.abs(poker_Weight[selected_value] - poker_Weight[arr[i]]) > 0.9){
        check_err = true;
        break;
      }
      selected_count ++;
    }
  }

  if(!check_err && arrA.length>=0){
    let pMin_A = arrA[0];
    let pMinNum_A = arrA.length;
    check_err = selected_count < pMinNum_A || poker_Weight[selected_value] <= poker_Weight[pMin_A];
  }

  return {'selected_value':selected_value, 'selected_count':selected_count, 'check_err':check_err};
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}

button {
    background-color: #4CAF50; /* Green */
    border: none;
    color: white;
    padding: 15px 32px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
}

span {
    background-color: #008CBA; /* Green */
    padding: 8px 16px;
    color: white;
    text-align: center;
    text-decoration: none;
    font-size: 16px;
}

.span_Arrow {
    Margin : 8px;
    background-color: #4CAF50; /* Green */
    padding: 1px 8px;
    color: white;
    text-align: center;
    text-decoration: none;
    font-size: 16px;
}
</style>
