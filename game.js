var play_board = ["", "", "", "", "", "", "", "", ""];

var player = "X";
var computer = "O";
var player_name = "";

var board_full = false;

var board_container = document.querySelector(".play-area");
var winner_statement = document.getElementById("winner");
var debug = document.getElementById("debug");

var size = "";

var totalSeconds = 0;
var timeout = 10; // 10s timeout
var timer_label = document.getElementById("timer");
var close_btn = document.getElementById("close-btn");
var replay_btn = document.getElementById("replay-btn");
var logo = document.getElementById("ad-logo");


// Events triggered by App
var ready = new Event('ready');
var resume = new Event('resume');
var pause = new Event('pause');
var orientation = new Event("orientation");

window.addEventListener("ready", onAppReady);
window.addEventListener("resume", onAppResume);
window.addEventListener("pause", onAppPause);
window.addEventListener("orientation", onAppOrientationChange);



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
    registerClick();
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
    if (res == "") {
        // No winner till now
        if (replay_btn.style.display == 'block') {
            replay_btn.style.display = 'none';
        }

        return;
    }

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

    // Show replay button
    replay_btn.style.display = 'block';
}

function reset_board() {
    for(i=0; i<9; i++) {
        play_board[i] = "";
    }
    board_full = false;
    winner_statement.innerText = "";
    render_board();
}

// function toggleLogo() {
//     if(logo.style.display == 'block') {
//         logo.style.display = 'none';
//         board_container.style.display = 'true';
//     }
//     else {
//         logo.style.display = 'block';
//         board_container.style.display = 'none';
//     }
//     // logo.style.display = 'none';
// }

function displayLogo() {
    logo.style.display = 'block';
    // board_container.style.display = 'none';
}

function hideLogo() {
    logo.style.display = 'none';
    // board_container.style.display = 'block';
}


// Event handlers
function onAppReady() {
    render_board();

    // Show image for 2 second
    displayLogo();
    setTimeout(hideLogo, 5*1000);
    // logo.style.display = 'none';

    // Hide close button, show timer
    close_btn.style.display = 'none';

    // Hide Replay buttton
    replay_btn.style.display = 'none';

    // Measure time spent in ad
    setInterval(setTime, 1000);

    // After 10 seconds, hide timer and show close btn
    setTimeout(toggleCloseButton, timeout*1000);
}


function onAppOrientationChange() {
    getOrientation();
    getScreenSize();
    setAdSize();
    render_board();
}

function onAppPause() {
    console.log("App Paused");
}

function onAppResume() {
    console.log("App Resumed");
}

function setAdSize() {
    // Hacky solution to extract width, height
    // String format - Point(w, h)
    var width = parseInt( size.slice(size.indexOf("(")+1, size.indexOf(",")) );
    var height = parseInt( size.slice(size.indexOf(",")+2, size.length-1) );
    console.log("Width: " + width.toString());
    window.resizeTo(width, height);
}

function setTime() {
    ++totalSeconds;
    timeout--;
    // timer_label.innerText = totalSeconds.toString();
    // timer_label.innerHTML = "<h2>" + totalSeconds.toString() + "</h2>";
    timer_label.innerHTML = "<h2>" + timeout.toString() + "</h2>";
    console.log("setTime called: " + totalSeconds);
}

function toggleCloseButton() {
    var display_setting = close_btn.style.display;
    console.log("Close btn diplay setting: " + display_setting);
    if (display_setting == 'block') {
        // Button is visible, hide it
        close_btn.style.display = 'none';

        // Show timer
        timer_label.style.display = 'block';
    }
    else {
        // Button is hidden, show it
        close_btn.style.display = 'block';

        // Hide timer
        timer_label.style.display = 'none';
    }
}



// Android functions
function showWinnerMessage(s) {
    console.log("Winner: " + s);
    winner_statement.innerText = s;
    // Android.showToast(s);
}

function on_close() {
    console.log("Closing: Time-" + totalSeconds.toString());
    Android.close();
}

function open_url() {
    console.log("Opening URL");
    Android.open("https://www.google.com");
}

function getScreenSize() {
    console.log("Fetching display metrics");
    size = Android.getScreenSize();
    console.log(size);
    // debug.innerText = size;
}

function getOrientation() {
    var orientation = Android.getOrientation();
    console.log("Orientation" + orientation);
    // debug.innerText = orientation;
}

function registerClick() {
    console.log("Click!");
    Android.registerClick();
}

function replay() {
    console.log("Replaying");
    Android.registerReplay();
    reset_board();
}

// render_board()
// getScreenSize()
// getOrientation()
