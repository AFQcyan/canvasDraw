import Tool from "./Tool.js";
export default class StrokeTool extends Tool
{
    constructor(ctx)
    {
        super(ctx);
        this.before = {x:0, y:0};
        this.lineWidthInput = document.querySelector("#lineWidthInput");
        this.color = document.querySelector("#colorPicker");
        this.ctx.lineCap = "round";
        this.draw = false;
    }

    downHandle(e){
        const ctx = this.ctx;
        this.before = this.getPoint(e); //이전 좌표 알아내고
        ctx.strokeStyle = this.color.value;
        ctx.lineWidth = this.lineWidthInput.value;
        ctx.setLineDash([5,10])
        this.draw = true;
    }

    upHandle(e)
    {
        this.draw = false;
        this.ctx.setLineDash([]);
    }

    moveHandle(e)
    {
        if(!this.draw) return;
        
        const ctx = this.ctx;

        ctx.beginPath();
        const {x:bx, y:by} = this.before;
        ctx.moveTo(bx, by);
        const {x, y} = this.getPoint(e);
        ctx.lineTo(x,y);
        ctx.stroke();
        this.before = {x,y};
    }
}