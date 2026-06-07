import { utilities } from "../../utilities.js";

export class base_module{
    #context = [];
    #files = {
        scripts_storage:{}
        ,signals_storage:{}
    };
    get id(){
        return this.#files[`id`];
    }
    get context(){
        return this.#context[this.#context.length-1];
    }
    set_context(context){
        return this.#context.push(context);
    }
    remove_context(){
        return this.#context.pop();
    }
    system_set(path=[],value=0){
        let current = this.#files
        let oldValue;
        for (let part = 0; part<path.length-1; part++){
            if (typeof current[path[part]] != `object`)current[path[part]]={};
            current = current[path[part]];
        }
        oldValue = current[path[path.length-1]];
        current[path[path.length-1]] = value;
        return [oldValue,value,...path];
    }
    system_del(path=[]){
        let current = this.#files
        let oldValue;
        for (let part = 0; part<path.length-1; part++){
            if (typeof current[path[part]] != `object`)return [undefined,false,...path];
            current = current[path[part]];
        }
        oldValue = current[path[path.length-1]];
        delete current[path[path.length-1]];
        return [oldValue,true,...path];
    }
    system_get(path=[]){
        let current = this.#files
        for (let part = 0; part<path.length-1; part++){
            if (typeof current[path[part]] != `object`)return;
            current = current[path[part]];
        }
        return current[path[path.length-1]];
    }
    qset(normalized_path, value){
        let change = this.system_set(normalized_path,value);
        if (change[0]==value)return;
        let newpath = ``;
        this.emit(`*v9$:$as?{>>}*`,change);
        normalized_path.forEach((part)=>{
            newpath+=`>${part}`;
            this.emit(`*v9$:$as?{${newpath}>}*`,change);
        })
        this.emit(`*v9$:$as?{${newpath}}*`,change);
    }
    qget(normalized_path){
        return this.system_get(normalized_path);
    }
    qdel(normalized_path){
        let change = this.system_del(normalized_path);
        if (!change[1])return;
        let newpath = ``;
        this.emit(`*v9$:$ad?{>>}*`,change);
        normalized_path.forEach((part)=>{
            newpath+=`>${part}`;
            this.emit(`*v9$:$ad?{${newpath}>}*`,change)
        })
        this.emit(`*v9$:$ad?{${newpath}}*`,change);
    }
    qzset(normalized_path, value){
        let change = this.system_set(normalized_path,value);
        if (change[0]==value)return;
        return this.emit(`*v9$:$as?{>${normalized_path.join(">")}}*`,change);
    }
    qzdel(normalized_path){
        let change = this.system_del(normalized_path);
        if (!change[1])return;
        return this.emit(`*v9$:$ad?{>${normalized_path.join(">")}}*`,change);
    }
    set(...path){
        let value = path.pop();
        let normalized_path = utilities.normalize_path(...path);
        return this.qset(normalized_path, value);
    }
    get(...path){
        return this.system_get(utilities.normalize_path(...path));
    }
    del(...path){
        let normalized_path = utilities.normalize_path(...path);
        return this.qdel(normalized_path);
    }
    zset(...path){
        let value = path.pop();
        let normalized_path = utilities.normalize_path(...path);
        return this.qzset(normalized_path, value);
    }
    zdel(...path){
        let normalized_path = utilities.normalize_path(...path);
        return this.qzdel(normalized_path);
    }
    wset(...path){
        let value = path.pop();
        let normalized_path = utilities.normalize_path(...path);
        return this.system_set(normalized_path, value);
    }
    wdel(...path){
        let normalized_path = utilities.normalize_path(...path);
        return this.system_del(normalized_path);
    }
    vset(path, value){
        return this.system_set(path, value);
    }
    vget(path){
        return this.system_get(path);
    }
    vdel(path){
        return this.system_del(path);
    }
    constructor(config,...scripts){
        Object.assign(this.#files,config,{scripts_storage:{},signals_storage:{},id:utilities.generateId()});
        let possible_setup_function = scripts.pop();
        scripts.forEach((script)=>{
            this.insert(...script);
        })
        if (typeof possible_setup_function == 'function'){
            possible_setup_function.call(this);
            return;
        }
        this.insert(...possible_setup_function);
    }
}