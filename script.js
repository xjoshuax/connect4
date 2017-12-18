// This is giving me a list of all slots 0-45
// starting top left and counting downwards easch column
var slots = $('.slot');
var turn = 'p1';

// setting all slots to 'empty'
for (var i = 0; i < slots.length; i++){
    slots[i].classList.add("empty");
}

/* --------------------- Main event handlers --------------------- */

// clicking event
$('.column').on('click',function(e){
    var slotIndex;
    for (var i = 0; i < slots.length; i++){
        if(e.target == slots[i]){
            slotIndex = i;
        }
    }
    var  currentColumn = $(e.currentTarget).children();
    // dropping coing
    var rowIndex = coinDrop(currentColumn);
    //checking victory
    verticalVictory(currentColumn, turn);
    horizontalVictory(rowIndex, turn);
    diagonalVictory(slotIndex, turn);
    // switching player
    switchPlayer();
});

/* --------------------- Gameplay --------------------- */

function coinDrop(array){
    for (var i = array.length - 1; i > -1; i--){
        if(array[i].classList.contains("empty")){
            array[i].classList.remove("empty");
            // If it's p1's turn drop a red coin, else drop a black coin
            if (turn == 'p1'){
                array[i].classList.add("p1");
            } else {
                array[i].classList.add("p2");
            }
            // Once an empty slot is found, we want to exit the function
            // We are keeping track of i because this is the row in which we can check for a victory
            drop.play();
            return i;
        }
    }
    console.log('It seems as if this column is already full');
    switchPlayer();
}

function switchPlayer (){
    if (turn == 'p1'){
        turn = 'p2';
    } else {
        turn = 'p1';
    }
}

/* --------------------- Victory --------------------- */

function verticalVictory(column, currentPlayer){
    var winningCount = 0;
    for (var i = 0; i < column.length; i++){
        if(column[i].classList.contains(currentPlayer)){
            winningCount++;
            if (winningCount >= 4){
                winning();
                console.log(currentPlayer + ' wins!');
            }
        } else {
            winningCount = 0;
        }
    }
}

function horizontalVictory(rowIndex, currentPlayer){
    var winningCount = 0;
    var rows = $('.row' + rowIndex);
    for (var i = 0; i < rows.length; i++){
        if(rows[i].classList.contains(currentPlayer)){
            winningCount++;
            if (winningCount >= 4){
                winning();
                console.log(currentPlayer + ' wins!');
            }
        } else {
            winningCount = 0;
        }
    }
}

function diagonalVictory(slotIndex, currentPlayer){
    var winningCount = 0;
    // Check diagonal up
    for (var i = 0; i <  slots.length; i++){
        if(slots[i].classList.contains(currentPlayer)){
            for(var j = i; j < slots.length; j = j + 5){
                try{
                    if(slots[j].classList.contains(currentPlayer) && slots[j].parentNode != slots[j + 5].parentNode){
                        winningCount++;
                        if (winningCount >= 4){
                            winning();
                            console.log(currentPlayer + ' wins!');
                        }
                    } else{
                        winningCount = 0;
                    }
                } catch (e){
                    winningCount = 0;
                }
            }
        } else {
            winningCount = 0;
        }
    }
    // Check diagonal down
    for (var x = 0; x < slots.length; x++){
        if(slots[x].classList.contains(currentPlayer)){
            for(var y = x; y < slots.length; y = y + 7){
                try{
                    if(slots[y].classList.contains(currentPlayer) && slots[y].parentNode != slots[y + 7].parentNode){
                        winningCount++;
                        if (winningCount >= 4){
                            winning();
                            console.log(currentPlayer + ' wins!');
                        }
                    } else{
                        winningCount = 0;
                    }
                } catch (e){
                    winningCount = 0;
                }
            }
        } else {
            winningCount = 0;
        }
    }
}

// Winning
function winning(){
    win.play();
    confetti();

    var timeout = setTimeout(function(){
        callModal();
    }, 2000);
}

/* ---------------------------------------------------- */

// All the stuff below here is not core to the functionality of the game

/* ---------------------------------------------------- */


/* --------------------- Audio --------------------- */
var drop = $('.drop')[0];
var win = $('.win')[0];

/* --------------------- Hovering --------------------- */

// mouseover event
$('.column').on('mouseover',function(e){
    var  currentRow = $(e.currentTarget).children();
    hover(currentRow);
});
// mouseout event
$('.column').on('mouseout',function(e){
    var  currentRow = $(e.currentTarget).children();
    unHover(currentRow);
});

function hover(array){
    for (var i = array.length - 1; i > -1; i--){
        if(array[i].classList.contains("empty")){
            array[i].classList.add("hover");
        }
    }
}

function unHover(array){
    for (var i = array.length - 1; i > -1; i--){
        if(array[i].classList.contains("hover")){
            array[i].classList.remove("hover");
        }
    }
}

/* --------------------- Modal --------------------- */
function callModal() {
    if (turn == 'p1'){
        console.log('PLAYER 1');
        $('<h3>Player 1 wins!</h3>').insertBefore("#restart");
    } else if (turn == 'p2'){
        $('<h3>Player 1 wins!</h3>').insertBefore("#restart");
    }

    var modal = setTimeout(function (){
        $('.modalElement').fadeIn();
    }, 1000);
}

$('#closeModal').on('click', function(){
    $('.modalElement').fadeOut();
});

/* --------------------- Restart button --------------------- */
$('#restart').on('click',function(e){
    var reload = setTimeout(function (){
        location.reload();
    }, 1000);
});

/* --------------------- Start animation --------------------- */

$( document ).ready(function(){
    var timeout = setTimeout(function(){
        $('.startup').fadeOut();
    }, 1500);
});
/* --------------------- Confetti --------------------- */
function confetti(){
    //canvas init
    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");

    //canvas dimensions
    var W = window.innerWidth;
    var H = window.innerHeight;
    canvas.width = W;
    canvas.height = H;

    //snowflake particles
    var mp = 25; //max particles
    var particles = [];
    for(var i = 0; i < mp; i++)
    {
        particles.push({
            x: Math.random()*W, //x-coordinate
            y: Math.random()*H, //y-coordinate
            r: Math.random()*4+1, //radius
            d: Math.random()*mp, //density
            color: "rgba(" + Math.floor((Math.random() * 255)) +", " + Math.floor((Math.random() * 255)) +", " + Math.floor((Math.random() * 255)) + ", 0.8)"
        })
    }

    //Lets draw the flakes
    function draw()
    {
        ctx.clearRect(0, 0, W, H);

        for(var i = 0; i < mp; i++)
        {
            var p = particles[i];
            ctx.beginPath();
            ctx.fillStyle = p.color;
            ctx.moveTo(p.x, p.y);
            ctx.arc(p.x, p.y, p.r, 0, Math.PI*2, true);
            ctx.fill();
        }

        update();
    }

    //Function to move the snowflakes
    //angle will be an ongoing incremental flag. Sin and Cos functions will be applied to it to create vertical and horizontal movements of the flakes
    var angle = 0;
    function update()
    {
        angle += 0.01;
        for(var i = 0; i < mp; i++)
        {
            var p = particles[i];
            //Updating X and Y coordinates
            //We will add 1 to the cos function to prevent negative values which will lead flakes to move upwards
            //Every particle has its own density which can be used to make the downward movement different for each flake
            //Lets make it more random by adding in the radius
            p.y += Math.cos(angle+p.d) + 1 + p.r/2;
            p.x += Math.sin(angle) * 2;

            //Sending flakes back from the top when it exits
            //Lets make it a bit more organic and let flakes enter from the left and right also.
            if(p.x > W+5 || p.x < -5 || p.y > H)
            {
                if(i%3 > 0) //66.67% of the flakes
                {
                    particles[i] = {x: Math.random()*W, y: -10, r: p.r, d: p.d, color : p.color};
                }
                else
                {
                    //If the flake is exitting from the right
                    if(Math.sin(angle) > 0)
                    {
                        //Enter from the left
                        particles[i] = {x: -5, y: Math.random()*H, r: p.r, d: p.d, color: p.color};
                    }
                    else
                    {
                        //Enter from the right
                        particles[i] = {x: W+5, y: Math.random()*H, r: p.r, d: p.d, color : p.color};
                    }
                }
            }
        }
    }
    //animation loop
    setInterval(draw, 33);
}
