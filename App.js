import CircleTool from "./circleTool.js";
import LineTool from "./Line.js";
import RectTool from "./RectTool.js";

class App 
{
    constructor()
    {
        this.toolIndex = 0;
        const ctx = this.ctx = document.querySelector("#myCanvas").getContext("2d");

        this.toolList = [
            new LineTool(ctx),
            new RectTool(ctx),
            new CircleTool(ctx)
        ];

        this.addEvent();
    }

    addEvent() 
    {
        this.ctx.canvas.addEventListener("mousedown", this.downHandle);
        this.ctx.canvas.addEventListener("mousemove", this.moveHandle);
        this.ctx.canvas.addEventListener("mouseup", this.upHandle);

        document.querySelector(".menu").addEventListener("click", e => {
            if(e.target.classList.contains("menu-btn")){
                document.querySelector(`.menu > .menu-btn[data-idx="${this.toolIndex}"]`)
                        .classList.remove("active");
                this.toolIndex = e.target.dataset.idx * 1; //숫자로 만들어주기
                e.target.classList.add("active");
            }
        });
    }

    downHandle = e => {
        const tool = this.toolList[this.toolIndex];
        if(tool.downHandle === undefined) return; //없는 기능이면 리턴
        tool.downHandle(e);
    }

    upHandle = e => {
        const tool = this.toolList[this.toolIndex];
        if(tool.upHandle === undefined) return; //없는 기능이면 리턴
        tool.upHandle(e);
    }

    moveHandle = e => {
        const tool = this.toolList[this.toolIndex];
        if(tool.moveHandle === undefined) return; //없는 기능이면 리턴
        tool.moveHandle(e);
    }
}

window.onload = ()=>{
    let app = new App();
}