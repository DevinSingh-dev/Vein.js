export class script {
    #defaults = {
        fired:function(){}
        ,signal: `script`
    }
    constructor(config){
        Object.assign(this,this.#defaults,config);
    }
}