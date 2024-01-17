var win = [ [1,2,3],
            [4,5,6],
            [7,8,9],
            [1,5,9],
            [3,5,7],
            [1,4,7],
            [2,5,8],
            [3,6,9]];

var horizontal = [0,1,2];
var diagonal = [3,4];
var vertical = [5,6,7];
var k = 1;
var chance = 'x';
var xseq = [];
var oseq = [];
var gameactive = 1;
var iswin;

$(".child").click(function() {
    if(gameactive){
        if($(this).html() != "X" && $(this).html() != "O"){
            if(chance == 'x'){
                $(this).html("X");
                $(this).addClass("x");
                checkwin(chance);
                checkdraw();
                chance = 'o';
            }

            else{
                $(this).html("O");
                $(this).addClass("o");
                checkwin(chance);
                checkdraw();
                chance = 'x';
            }
        }
    }
})



function checkwin(chance){
    if(chance == 'x'){
        for(i = 1;i<=9;i++){
            if($("#grid" + i).hasClass(chance)){
                if(!xseq.includes(i)){
                    xseq.push(i);
                }
            }
        }
        iswin = checkseq(xseq);
        return iswin;
    }
    
    else{
        for(i = 1;i<=9;i++){
            if($("#grid" + i).hasClass(chance)){
                if(!oseq.includes(i)){
                    oseq.push(i);
                }
            }
        }
        iswin = checkseq(oseq);
        return iswin;
    }
}

function checkseq(seq){
    console.log(seq);
    for(i = 0;i<8;i++){
        var toCheck = win[i];
        var count = 0;
        for(j = 0;j<3;j++){
            if(seq.includes(toCheck[j])){
                count++;
            }
            
            if(count == 3){
                winner(chance,i);
                return true;
            }
        }
    }
    return false;
}

function winner(chance,i){
    for(j = 0;j<3;j++){
        $("#grid" + win[i][j]).addClass("win-grid");
        $(".popup").css("visibility","visible");
        $(".restart").css("visibility","visible");
        $(".popup-text").html(chance.toUpperCase() + " Wins");
        gameactive = 0;
    }
}

$(".restart").click(clear);

function clear(){
    xseq = [];
    oseq = [];
    for(i = 1;i<=9;i++){
        $("#grid" + i).html("");
        $("#grid" + i).removeClass("x");
        $("#grid" + i).removeClass("o");
        $("#grid" + i).removeClass("win-grid");
    }
    $(".popup").css("visibility","hidden");
    $(".restart").css("visibility","hidden");
    gameactive = 1;
    chance = 'x';
}

function checkdraw(){
    for(i = 1;i<=9;i++){
            if($("#grid"+i).html() == ""){
                return;
            }
        }
        draw();
}

function draw(){
    if(!checkwin(chance)){   
        $(".popup").css("visibility","visible");
        $(".restart").css("visibility","visible");
        $(".popup-text").html("Draw");
        gameactive = 0;
    }
}