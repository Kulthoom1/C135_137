objects=[]
status1 = ""
video = ""

function preload(){
    video = createVideo('video.mp4');
    
}

function setup() {
    canvas = createCanvas(480, 380);
    canvas.center();
    video.hide();
}

function gotResult(error, results) {
    if(error){
        console.log(error)
    }
    console.log(results)
    objects=results
}

function start()
{
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status: Detecting Objects"
    object_name = document.getElementById("object_name").value
}

function modelLoaded() {
    console.log("modelLoaded");
    status1 = true;

}
function draw() {
    image(video, 0, 0, 480, 380);
    if(status1 !=""){
        objectDetector.detect(video, gotResult)
        for(i=0;i<objects.length;i++) {
            document.getElementById("status").innerHTML="Status:  Objects Detected";
            //document.getElementById("number_of_objects").innerHTML="Number of Objects Detected are "+objects.length;
            fill("#FF0000");
            p=floor(objects[i].confidence*100);
            text(objects[i].label+" "+p+"%",objects[i].x,objects[i].y);
            noFill()
            stroke("#FF0000")
            rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);
            if(objects[i]== object_name){
                video.stop();
                document.getElementById("object_status").innerHTML=object_name + " Found";
                synth = window.speechSynthesis;
                utterThis = new SpeechSynthesisUtterance(object_name + "Found");
                synth.speak(utterThis);
            }
            else{
                document.getElementById("object_status").innerHTML=object_name + " not Found";
            }

        }
    }
}
