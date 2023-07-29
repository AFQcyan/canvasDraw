import Tool from './Tool.js'

export default class RectTool extends Tool 
{
    constructor(ctx)
    {
        super(ctx);
        this.start = {x:0, y:0};
        this.lineWidthInput = document.querySelector("#lineWidthInput");
        this.color = document.querySelector("#colorPicker");
        this.draw = false;

        this.btx = null;
        this.init();
    }

    init() 
    {
        const canvas = document.createElement("canvas");//백업용 캔버스 제작
        canvas.width = this.ctx.canvas.width;
        canvas.height = this.ctx.canvas.height;

        this.btx = canvas.getContext("2d");//백업캔버스에 그리기 위한 도구
    }

    drawScreen(e)
    {
        const {ctx, btx} = this;
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        ctx.drawImage(btx.canvas, 0, 0);
        const {x, y} = this.start;
        const {x:tx, y:ty} = this.getPoint(e);
        this.ctx.strokeRect(x, y, tx - x, ty - y);
    }

    downHandle(e) {
        const {ctx, btx} = this;
        btx.clearRect(0, 0, btx.canvas.width, btx.canvas.height);
        btx.drawImage(ctx.canvas, 0, 0); //백업 캔버스에 현재 캔버스를 복사
        this.start = this.getPoint(e);
        ctx.strokeStyle = this.color.value;
        ctx.lineWidth = this.lineWidthInput.value;
        ctx.setLineDash([5, 10]); //5픽셀 길이 점선으로 10픽셀씩 떨어뜨리면서 그린다.
        this.draw = true;
    }

    upHandle(e)
    {
        this.draw = false;
        this.ctx.setLineDash([]); //라인대쉬 설정을 지운다.
        this.drawScreen(e);
    }
    moveHandle(e)
    {
        if(!this.draw) return;
        this.drawScreen(e);
    }


}