let idList = {};

export class utilities {
    static generateId = function(length = 28){
        const chars = `abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890-=+_|!@#$%^&*()`;
        let result = ``;
        for (let i=0; i<length-4; i++){
            result+=chars.charAt(Math.floor(Math.random()*chars.length));
        }
        if (idList[result]){
            console.log(`Damn lucky day! `, result);
            result = utilities.generateId(length);
        }
        let gen = Math.floor(Math.random()*(result.length+1));
        result = result.slice(0, gen) + 'gen-' + result.slice(gen);
        idList[result] = true;
        return result;
    }
    static normalize_path(...path){
        let newpath = [];
        path.forEach((part)=>{
            switch(typeof part){
                case `string`:
                    newpath.push(
                        ...part
                            .replaceAll(`.`,`/`)
                            .replaceAll(`[`,`/`)
                            .replaceAll(`]`,``)
                            .split(`/`)
                    )
                    break;
                default:
                    newpath.push(part);
                    break;
            }
        })
        return newpath;
    }
    static system_signal_converter(signal=`/`,type=`set`){
        switch(type){
            case `set`:
                type = "as";
                break;
            case `del`:
                type = "ad";
                break;
            default:
                type = "u";
        }
        return `*v9$:$${type}?{>${utilities.normalize_path(signal).join(`>`)}}*`;
    }
    static default_ctx_func = function(){};
    static ctxUse(script,module,type){
        if (!script.proto[type])return utilities.default_ctx_func;
        return (...args)=>{
            module.set_context(script);
            let call = script.proto[type].call(module,...args);
            module.remove_context();
            if (typeof call != `object`)return;
            if (Array.isArray(call)){
                script.info = call;
                return;
            };
            Object.assign(script,call);
        }
    }
    static ssc = utilities.system_signal_converter
}