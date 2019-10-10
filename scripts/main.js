// Set arrays to hold cards and flipped images
var images = document.querySelectorAll('img');
var flipped = ["images/box4.png", "images/box1.png", "images/box2.png", "images/box10.png", "images/box11.png", "images/box8.png", 
               "images/box3.png", "images/box13.png", "images/box4.png", "images/box5.png", "images/box5.png", "images/box6.png", 
               "images/box17.png", "images/box7.png", "images/box15.png", "images/box8.png", "images/box9.png", "images/box2.png", 
               "images/box10.png", "images/box1.png", "images/box11.png","images/box6.png",  "images/box3.png", "images/box12.png", 
               "images/box14.png", "images/box9.png", "images/box15.png", "images/box13.png", "images/box14.png", "images/box16.png",
               "images/box17.png", "images/box7.png", "images/box18.png","images/box12.png", "images/box16.png", "images/box18.png"];

var which = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

var restart = document.querySelector('.restart');
var solve = document.querySelector('.solve');
var winning = document.querySelector('.won');
var timer = document.querySelector('.timer');

var time = 0;
var lastFlipped;
var lastFlipped_src;
var no_clicks = 0;
var no_solved = 0;
var restarted = 1;

for (let i = 0; i < images.length; i++)
{
    images[i].addEventListener('click', function() {
        if (which[i] === 0)
        {
            images[i].setAttribute('src', flipped[i]);
            no_clicks++;
            if (no_clicks === 2)
            {
                // Compare with last flipped image
                if (lastFlipped_src === flipped[i] && i !== lastFlipped)
                {
                    which[i] = which[lastFlipped] = 1;
                    no_solved++;
                    if (no_solved === 18)
                    {
                        // Display winning message
                        winning.textContent = 'Congratulations you won';
                        restarted = 0;
                        clearInterval(t);
                    }
                }
                else
                {
                    setTimeout(function (){
                        // Un-flip
                        images[i].setAttribute('src', 'images/box.png');
                        images[lastFlipped].setAttribute('src', 'images/box.png');
                    }, 300);
                }
    
                no_clicks = 0;
                lastFlipped_src = "images/box.png";
            }
            else
            {
                lastFlipped = i;
                lastFlipped_src = images[i].getAttribute('src');
            }    
        }
    });
}

var t = setInterval(function() {
    time = time + 0.1;
    time = Math.round(time * 100) / 100;
    timer.textContent = 'Time:  ' + time.toString(10) + '  seconds';
}, 100);

restart.onclick = function() {
    if (restarted === 0)
    {
        for (let i = 0; i < images.length; i++)
        {
            images[i].setAttribute('src', 'images/box.png');
        }
    
        winning.textContent = '';
        no_solved = 0;
        time = 0;
        
        t = setInterval(function() {
            time = time + 0.1;
            time = Math.round(time * 100) / 100;
            timer.textContent = 'Time:  ' + time.toString(10) + '  seconds';
        }, 100);
    
        which = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        restarted = 1;
    }
}

solve.onclick = function() {
    for (let i = 0; i < images.length; i++)
    {
        images[i].setAttribute('src', flipped[i]);
    }

    which = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
    restarted = 0;

    clearInterval(t);
}
