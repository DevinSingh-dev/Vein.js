import { module } from "./v9/module/module.js";
import { utilities } from "./v9/utilities.js";
import { script } from "./v9/script.js";

export class v9 {
    static module = module;
    static utilities = utilities;
    static script = script;

    static establish(tool={}, name="undefined_tool", setup=function(){}){
        v9[name] = tool;
        setup.call(tool);
    }
}