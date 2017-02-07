var ticTacToeModule = +function () {
    'use strict';
    // Variables
    var board = document.getElementsByClassName('board')[0];
    var startButton = document.getElementById('start-button');
    var screenStartDiv = document.getElementById('start');
    var screenWin1Div = document.getElementsByClassName('screen-win-one')[0];
    var screenWin2Div = document.getElementsByClassName('screen-win-two')[0];
    var drawScreen = document.getElementsByClassName('screen-win-tie')[0];
    var playerListItem1 = document.getElementById("player1");
    var playerListItem2 = document.getElementById("player2");
    // A box, when selected, will be pushed to a player's checked boxes array
    var boxes = Array.prototype.slice.call(document.getElementsByClassName("box"));
    var newGameWin1 = document.getElementsByClassName('button-win-1')[0];
    var newGameWin2 = document.getElementsByClassName('button-win-2')[0];
    var newGameDraw = document.getElementsByClassName('button-draw')[0];

    // When the page loads, the start screen should appear. Hide the other screens
    window.onload = function () {
        board.style.display = 'none';
        screenWin1Div.style.display = 'none';
        screenWin2Div.style.display = 'none';
        drawScreen.style.display = 'none';
    };

    // When the start button is clicked, display the board and hide the start screen. Player 1 is active
    startButton.addEventListener("click", function (event) {
        screenStartDiv.style.display = 'none';
        board.style.display = 'block';
        playerListItem1.classList.add('active');
    });

    // Player object. List item is the current player as displayed at the top left and right of screen
    function PlayerObject(name, listitem) {
        this.name = name;
        this.turn = false;
        this.listitem = document.getElementById(listitem);
    }

    // Player X contructor function; inherits from player object.
    function Player1(name, listitem) {
        PlayerObject.call(this, name, listitem);
    }

    Player1.prototype = Object.create(PlayerObject.prototype);

    // Player O constructor function; inherits from player object.
    function Player2(name, listitem) {
        PlayerObject.call(this, name, listitem);
    }

    Player2.prototype = Object.create(PlayerObject.prototype);

    // Instantiating player objects "X" and "O".
    var playerX = new Player1("X", "player1");
    var playerO = new Player2("O", "player2");

    // If it's X's turn, set O turn to false; vice versa.
    // The current player is indicated at the top of the page -- the box with the symbol O or X 
    // is highlighted for the current player.
    playerX.turn = true;

    // The game ends when one player has three of their symbols in a row either horizontally, vertically or diagonally.
    // Arrays to hold the indices of the selected boxesx
    var playerXCheckedBoxes = [];
    var playerOCheckedBoxes = [];

    var winningCombos = [
        // Horizontally
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        // Vertically
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        // Diagonally
        [0, 4, 8], [2, 4, 6]
    ];

    // Function to call on the new game button when game ends and user wants to start a new game
    var newGame = function () {
        // Looping through the boxes collection and removing its classes
        for (i = 0; i < boxes.length; i++) {
            var boxFilled = boxes[i];
            if (boxFilled.classList) {
                boxFilled.classList.remove("box-filled-1");
                boxFilled.classList.remove("box-filled-2");
            }
        }
        playerListItem1.classList.add('active');
        playerListItem2.classList.remove('active');
        playerX.turn = true;
        playerO.turn = false;
        board.style.display = 'block';
        screenWin1Div.style.display = 'none';
        screenWin2Div.style.display = 'none';
        drawScreen.style.display = 'none';
        playerXCheckedBoxes = [];
        playerOCheckedBoxes = [];
    };

    // Function to check if the board is completely filled up so that it can be reset when game is over
    var boardIsFilled = function () {
        var isFilled = playerXCheckedBoxes.length + playerOCheckedBoxes.length == 9;
        return isFilled;
    };

    // Function to check if a player wins; if one does, the game is over. This gets called in the click add event listener
    var isGameOver = function () {
        var hasPlayerWon = false;
        // Loop through the winning combinations and select one to match against player's selected box array
        for (var i = 0; i < winningCombos.length; i++) {
            var winningCombo = winningCombos[i];
            var playerXCounter = 0;
            var playerOCounter = 0;

            // Loop through the players checkedboxes array and see if the index matches one of the indexes for
            // a winning combo. If it does, increment the counter by 1. Then if the length of the counter is 
            // equal to the length of the winning combo, the player wins and game ends
            for (var j = 0; j < playerXCheckedBoxes.length; j++) {
                var player1SelectedBox = playerXCheckedBoxes[j];
                if (winningCombo.includes(player1SelectedBox)) {
                    playerXCounter++;
                }
                if (playerXCounter == 3) {
                    // player wins
                    hasPlayerWon = true;
                    board.style.display = 'none';
                    screenWin1Div.style.display = 'block';
                }
            }

            for (var n = 0; n < playerOCheckedBoxes.length; n++) {
                var player2SelectedBox = playerOCheckedBoxes[n];
                if (winningCombo.includes(player2SelectedBox)) {
                    playerOCounter++;
                }
                if (playerOCounter == 3) {
                    // player wins
                    hasPlayerWon = true;
                    board.style.display = 'none';
                    screenWin2Div.style.display = 'block';
                }
            }
        }

        // If all of the squares are filled and no players have three in a row, the game is a tie
        if (boardIsFilled() && !hasPlayerWon) {
            // display draw screen
            drawScreen.style.display = 'block';
        }
    };

    // When user clicks on new game button, new game begins
    newGameWin1.addEventListener('click', function (event) {
        newGame();
    });

    newGameWin2.addEventListener('click', function (event) {
        newGame();
    });

    newGameDraw.addEventListener('click', function (event) {
        newGame();
    });

    // Hover function
    var hover = function () {
        if (playerX.turn && playerListItem1.className == 'players active' && this.className != 'box box-filled-2' && this.className != 'box box-filled-1') {
            this.classList.add('xSVG');
        }
        if (playerO.turn && playerListItem2.className == 'players active' && this.className != 'box box-filled-2' && this.className != 'box box-filled-1') {
            this.classList.add('oSVG');
        }
    };

    // Hover out function
    var hoverOut = function () {
        if (this.className != 'box-filled-2' || this.className != 'box-filled-1') {
            this.classList.remove('xSVG');
            this.classList.remove('oSVG');
        }
    };

    var boxClick = function () {
        if (playerX.turn && playerListItem1.className == 'players active') {
            if (this.className != 'box box-filled-2' && this.className != 'box box-filled-1') {
                // add the symbol by adding the CSS class
                this.classList.add('box-filled-1');
                // remove SVG hover so user cannot click same box again without mousing out
                this.classList.remove('xSVG');
                // switch active players
                playerListItem1.classList.remove('active');
                playerListItem2.classList.add('active');
                playerX.turn = false;
                playerO.turn = true;
                playerXCheckedBoxes.push(boxes.indexOf(this));
                isGameOver();
            }
        } else if (playerO.turn && playerListItem2.className == 'players active') {
            if (this.className != 'box box-filled-1' && this.className != 'box box-filled-2') {
                // add the symbol by adding the CSS class
                this.classList.add('box-filled-2');
                // remove SVG hover so user cannot click same box again without mousing out
                this.classList.remove('oSVG');
                // switch active players
                playerListItem2.classList.remove('active');
                playerListItem1.classList.add('active');
                playerO.turn = false;
                playerX.turn = true;
                playerOCheckedBoxes.push(boxes.indexOf(this));
                isGameOver();
            }
        }
    };

    // Loop over the boxes; when user is hovering over one, add the CSS class to that box
    // When the user clicks a box, add class to selected box and switch active player and hover state
    for (var i = 0; i < boxes.length; i++) {
        var box = boxes[i];
        box.addEventListener('mouseover', hover, false);
        box.addEventListener('mouseout', hoverOut, false);
        box.addEventListener('click', boxClick, false);
    }
} ();