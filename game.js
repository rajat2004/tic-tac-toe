var play_board = ["", "", "", "", "", "", "", "", ""];

var player = "X";
var computer = "O";
var player_name = "";

var board_full = false;

var board_container = document.querySelector(".play-area");
var winner_statement = document.getElementById("winner");
var debug = document.getElementById("debug");

function render_board() {
    board_container.innerHTML = "";
    for(i=0; i<9; i++) {
        board_container.innerHTML += `<div id="block_${i}" class="block" onclick="addPlayerMove(${i})"> ${play_board[i]} </div>`;
    }
}

function set_player_name(name) {
    player_name = name;
}

function addPlayerMove(i) {
    if (!board_full && play_board[i]=="") {
        play_board[i] = player;
        update();
        addComputerMove();
    }
}

function addComputerMove() {
    var selected = 0;
    if (!board_full) {
        do {
            selected = Math.floor(Math.random() * 9);
            // console.log(selected);
        } while (play_board[selected]!="");

        play_board[selected] = computer;
        update();
    }
}

function check_board_complete() {
    var flag = true;
    for(i=0; i<9; i++) {
        if (play_board[i]=="") {
            flag = false;
            break;
        }
    }
    // console.log(flag);
    board_full = flag;
}

function update() {
    render_board();
    check_board_complete();
    update_winner();
}

function check_line(a, b, c) {
    return (
        play_board[a] == play_board[b] &&
        play_board[b] == play_board[c] &&
        (play_board[a]==computer || play_board[a]==player)
    );
}

function check_winner() {
    // Check rows
    for(i=0; i<9; i+=3) {
        if(check_line(i, i+1, i+2)) {
            return play_board[i];
        }
    }

    // Check columns
    for(i=0; i<3; i++) {
        if(check_line(i, i+3, i+6)) {
            return play_board[i];
        }
    }

    // Check diag
    if(check_line(0,4,8)) {
        return play_board[0];
    }
    if(check_line(2,4,6)) {
        return play_board[2];
    }

    return "";
}

function update_winner() {
    var res = check_winner();
    if(res == player) {
        if (player_name == "")
            showWinnerMessage("Player Wins!");
       else
            showWinnerMessage(player_name + " Wins!");
        board_full = true;
    }
    else if (res == computer) {
        showWinnerMessage("Computer Wins");
        board_full = true;
    }
    else if (board_full) {
        showWinnerMessage("Draw");
    }
}

// Android functions
function showWinnerMessage(s) {
    console.log("Winner");
    // winner_statement.innerText = s;
    Android.showToast(s);
}

function on_close() {
    console.log("Closing");
    Android.close();
}

function open_url() {
    console.log("Opening URL");
    Android.open("https://www.google.com");
}

function getScreenSize() {
    console.log("Fetching display metrics");
    var metrics = Android.getScreenSize();
    console.log(metrics);
    debug.innerText = metrics;
}

function getOrientation() {
    var orientation = Android.getOrientation();
    console.log(orientation);
    debug.innerText = orientation;
}



function reset_board() {
    for(i=0; i<9; i++) {
        play_board[i] = "";
    }
    board_full = false;
    winner_statement.innerText = "";
    render_board();
}

render_board()
getScreenSize()
getOrientation()
