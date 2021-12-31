const pics = document.getElementsByClassName("tableCell");
const picsArray = [...pics].map((picElem) => ({ elem: picElem, closed: true, imgUrl: null, guessed: false, timestart:true }));

const imgArr = [
    "images/gameicon01.png","images/gameicon02.png","images/gameicon03.png","images/gameicon04.png","images/gameicon05.png",
    "images/gameicon06.png","images/gameicon07.png","images/gameicon08.png","images/gameicon09.png","images/gameicon10.png",
    "images/gameicon11.png","images/gameicon12.png","images/gameicon13.png","images/gameicon14.png","images/gameicon15.png",
    "images/gameicon16.png","images/gameicon17.png","images/gameicon18.png","images/gameicon01.png","images/gameicon02.png",
    "images/gameicon03.png","images/gameicon04.png","images/gameicon05.png","images/gameicon06.png","images/gameicon07.png",
    "images/gameicon08.png","images/gameicon09.png","images/gameicon10.png","images/gameicon11.png","images/gameicon12.png",
    "images/gameicon13.png","images/gameicon14.png","images/gameicon15.png","images/gameicon16.png","images/gameicon17.png",
    "images/gameicon18.png",
]

let min = 0;
let won = 0;
let sec = 0;
let timestart = true;
let time;

picsArray.forEach((picObj) => {
    picObj.elem.onclick = () => {
        
        if (timestart === true) {
            time = setInterval(timer, 1000);
        }
        timestart = false;
        const imgTag = picObj.elem.getElementsByTagName("img")[0];
        
        const setPicAmount = picsArray.filter((pic)=>{
            return !pic.closed && !pic.guessed;
        }).length;

        if (setPicAmount === 2) return;
        
        if (picObj.closed) {
            if (picObj.imgUrl) {
                imgTag.setAttribute("src", picObj.imgUrl);
        
            } else {
                const imgNumber = Math.ceil(Math.random() * imgArr.length) - 1;
                imgTag.setAttribute("src", imgArr[imgNumber]);
                picObj.imgUrl = imgArr.splice(imgNumber, 1)[0];
            }
        } else {
            imgTag.setAttribute("src", "images/tableicon.png");
        }
        
        if (setPicAmount === 1){
            if (picObj.closed){
                const openedPicture = picsArray.find(pic => !pic.closed && !pic.guessed);
                const openedPictureUrl = openedPicture.imgUrl;

                console.log(picObj.imgUrl, openedPictureUrl);

                if (picObj.imgUrl === openedPictureUrl) {
                    console.log("STILL OPEN");
                    won = won + 2;
                    if (won == 36) {
                        alert("you winner");
                        clearInterval(time);
                    }
                    [openedPicture, picObj].forEach(pic => {
                        pic.elem.classList.add("guessed");
                        pic.guessed = true;
                    });
                } else {
                    setTimeout(() => {
                        picsArray.filter(pic => !pic.guessed).forEach((pic)=>{
                            pic.closed = true;
                            const imgTag = pic.elem.getElementsByTagName("img")[0];
                            imgTag.setAttribute("src", "images/tableicon.png");
                        })
                    }, 2000);
                }
            }
        }
        picObj.closed = !picObj.closed;
    }

})

function timer (){
    sec = sec + 1;
    
    if (sec == 60) {
        min = min + 1;
        sec = 0;
    }

    const formattedMin = min < 10 ? "0" + min : min;
    const formattedSec = sec < 10 ? "0" + sec : sec;

    document.getElementById("timer").innerHTML = formattedMin + " : " + formattedSec;

}
