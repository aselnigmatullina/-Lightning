//делаю молнию
(() => {


    const TWO_PI     = 2 * Math.PI;
    const canvas     = document.createElement('canvas');
    const ctx        = canvas.getContext('2d');
    let w            = canvas.width = innerWidth;
    let h            = canvas.height = innerHeight;
    let canvasColor  = `#232332`;

    let mx           = 0;
    let my           = 0;
    let toggle       = 0;


    let circles      = [];
    let circlesCount = 5;
    const stepLength = 2;
    const maxOffSet  = 6;
    let maxLength    = 800;



    class Circle{
        constructor(x,y){
           this.x = x || Math.random()*w;
           this.y = y || Math.random()*h;
        }
        draw(x,y){
           this.x = x || this.x;
           this.y = y || this.y;

           ctx.lineWidth = 1.5;
           ctx.fillStyle = `white`;
           ctx.strokeStyle = `red`;

           ctx.beginPath();
           ctx.arc(this.x, this.y, 6, 0, TWO_PI);
           ctx.closePath();
           ctx.fill();

           ctx.beginPath();
           ctx.arc(this.x, this.y, 32, 0, TWO_PI);
           ctx.closePath();
           ctx.stroke();

        }
    }

    function createLightning(){
        for(let a = 0; a < circles.length; a++){
            for(let b = a + 1; b < circles.length; b++){
                let dist        = getDistanse(circles[a], circles[b]);
                let chance      = dist/maxLength;
                if(chance > Math.random()) continue;
                let otherColor  = chance * 255;
                let stepsCount  = dist / stepLength;
                let sx          = circles[a].x;
                let sy          = circles[a].y;
                ctx.lineWidth   = 2.5;
                ctx.strokeStyle = `rgb(255, ${otherColor}, ${otherColor})`;
                ctx.beginPath();
                ctx.moveTo(circles[a].x, circles[a].y);
                for(let j = stepsCount; j > 1; j--){

                    let pathLength = getDistanse(circles[a], {x: sx, y: sy});
                    let offset     = Math.sin(pathLength / dist * Math.PI) * maxOffSet;
                    sx += (circles[b].x -sx) / j + Math.random() * offset * 2 - offset;
                    sy += (circles[b].y -sy) / j + Math.random() * offset * 2 - offset;
                    ctx.lineTo(sx,sy);
                }
                ctx.stroke();
            }
        }
    }
    //функция, вычисляющая расстояние от точки до точки

    function getDistanse(a,b){
        return Math.sqrt(Math.pow(b.x-a.x, 2) - Math.pow(b.y -a.y, 2));

    }

    canvas.onmousemove = e => {
        mx = e.x - canvas.getBoundingClientRect().x;
        my = e.y - canvas.getBoundingClientRect().y;

    }
    window.onkeydown = () => {
        toggle == circles.length - 1 ? toggle = 0 : toggle++;
    }

    function init(){
        canvas.style.background = canvasColor;
        document.querySelector(`body`).appendChild(canvas);

        for(let i = 0; i< circlesCount; i++){
            circles.push(new Circle());
        }
    }

    function loop(){
        ctx.clearRect(0,0,w,h);
        createLightning();
        createLightning();

        circles.map( i => { i == circles[toggle]? i.draw(mx,my) : i.draw()});
        requestAnimationFrame(loop);
    }
    init();
    loop();



})();