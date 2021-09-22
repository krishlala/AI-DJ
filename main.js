song = "";
leftWristX=0;
leftWristY=0;
rightWristX=0;
rightWristY=0;
score_leftwrist = 0;
score_rightwrist = 0;

function setup() {
    canvas = createCanvas(600, 500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function modelLoaded() {
    console.log('Posenet is Intialized');
}

function draw() {
    image(video, 0, 0, 600, 500);
    fill('red');
    stroke('red');
    if(score_rightwrist > 0.2)
    {
        circle(rightWristX, rightWristY, 20);

    if(rightWristY >0 && rightWristY<= 100)
    {
        document.getElementById("speed").innerHTML = "Speed = 0.5";
        song.rate(0.5);
    }
    else if(rightWristY >100 && rightWristY<= 200)
    {
        document.getElementById("speed").innerHTML = "Speed = 1x";
        song.rate(1);
    }
    else if(rightWristY >200 && rightWristY<= 300)
    {
        document.getElementById("speed").innerHTML = "Speed = 1.5x";
        song.rate(1.5);
    }
    else if(rightWristY >300 && rightWristY<= 400)
    {
        document.getElementById("speed").innerHTML = "Speed = 2x";
        song.rate(2);
    }
    else if(rightWristY >400 && rightWristY<= 500)
    {
        document.getElementById("speed").innerHTML = "Speed = 2.5x";
        song.rate(2.5);
    }
    }
    

    if(score_leftwrist > 0.2) {
    circle(leftWristX, leftWristY, 20);
    InNumberleftWristY = Number(leftWristY);
    removedecimal = floor(InNumberleftWristY);
    volume = removedecimal/500;
    document.getElementById("volume").innerHTML = "Volume = " + volume;
    song.setVolume(volume);
    }
}

function preload() {
    song = loadSound("music.mp3");
    
}

function play()
{
    song.play();
    song.setVolume(1);
    song.rate(1);
}

function stop()
{
    song.stop();
}

function gotPoses(results) {
    if(results.length > 0) {
        console.log(results);
        score_leftwrist = results[0].pose.keypoints[9].score;
        console.log("Scoreleftwrist = " + score_leftwrist);
        score_rightwrist = results[0].pose.keypoints[10].score;
        console.log("Scorerightwrist = " + score_rightwrist);
        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("leftwristX = " + leftWristX + "leftwristY = " + leftWristY + "rightwristX = " + rightWristX + "rightwristY = " + rightWristY);
    }
}