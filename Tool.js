export default class Tool 
{
    constructor(ctx)
    {
        this.ctx = ctx;
    }

    getPoint(e) {
        const {offsetX:x, offsetY:y} = e;
        return {x,y};
    }
}