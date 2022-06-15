var listImage = [
    {
        src: "family.jpg",
        alt: "familia",
        act: true
    },
    {
        src: "family2.jpg",
        alt: "familia",
        act: false
    },
    {
        src: "avengers-endgame-poster-records.webp",
        alt: "familia",
        act: false
    }
]

var cont=document.getElementById("imagenes");
let cargarImagenes =()=>{
    cont.innerHTML="";
    listImage.map(elm =>( cont.innerHTML+=`
    <img class="imgM ${ elm["act"] ? "active" : ""}" src="${elm["src"]}"/>    
    `))
    
}
cargarImagenes();
var contss=document.querySelectorAll(".imgM");
var img_main = document.querySelector("#img")
contss.forEach(elm =>{
    elm.addEventListener("click",function(){
        const active = document.querySelector(".active")
        active.classList.remove("active")
        this.classList.add("active")
        img_main.src=this.src;
        [].forEach.call(document.querySelectorAll(".rect"), function(regla){
            regla.parentNode.removeChild(regla);
        });
    } )
})

const inpFile = document.getElementById("fileUpload");
const startBot = document.getElementById("startFunc");
inpFile.addEventListener("change", function () {
    var img = document.getElementById('img');
    const file = this.files[0];
    if (file) {
        const reader = new FileReader();        
        reader.addEventListener("load", function () {
            img.src = this.result;  
            listImage.push({src:this.result, alt:"alt",act:false});
            [].forEach.call(document.querySelectorAll(".rect"), function(regla){
                regla.parentNode.removeChild(regla);
            });           
            cargarImagenes() 
        })        
        reader.readAsDataURL(file);        
    }
})
startBot.addEventListener("click",function(){
    cargarImagenes()    
    rect();
})

function rect(){
    var img = document.getElementById('img');
    var tracker = new tracking.ObjectTracker(['face', 'eye', 'mouth']);
    tracker.setStepSize(1.7);

    tracking.track('#img', tracker);

    tracker.on('track', function (event) {
        event.data.forEach(function (rect) {
            window.plot(rect.x, rect.y, rect.width, rect.height);
        });
    });

    window.plot = function (x, y, w, h) {
        var rect = document.createElement('div');
        document.querySelector('.demo-container').appendChild(rect);
        rect.classList.add('rect');
        rect.style.width = w + 'px';
        rect.style.height = h + 'px';
        rect.style.left = (img.offsetLeft + x) + 'px';
        rect.style.top = (img.offsetTop + y) + 'px';
    };
};
