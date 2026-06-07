<h2>Here is a quick tool that can be plugged into Vein.js.</h2>

```js
import { v9 } from "./Vein/init.js";

class tags_class{
    static search(module, tag="") {
        let reg = module.get(`tag_registry/${tag}`);
        if (!reg) return [];
        return Object.values(reg);
    }
    static scripts = [
        [
            new v9.script({
                signal: v9.utilities.ssc("scripts_storage/")
                ,fired([,script]){
                    if (script.proto.tags==undefined)return;
                    script.proto.tags.forEach((tag)=>{
                        this.set(`tag_registry/${tag}/${script.id}`, script);
                    })
                }
            })
        ]
        ,[
            new v9.script({
            signal: v9.utilities.ssc("scripts_storage/","del")
                ,fired([script]){
                    if (script.proto.tags==undefined)return;
                    script.proto.tags.forEach((tag)=>{
                        this.del(`tag_registry/${tag}/${script.id}`);
                        if (Object.keys(this.get(`tag_registry/${tag}`)).length == 0){
                            this.del(`tag_registry/${tag}`);
                        }
                    })
                }
            })
        ]
    ]
    static module = class extends v9.module {
        search(tag){
            return tags_class.search(this, tag);
        }
        constructor(files, ...scripts){
            super(files, ...tags_class.scripts, ...scripts);
        }
    }
}

v9.establish(tags_class, "tags");
```
<br>
<h2>And now, an example of using this would be:</h2>
<br>

```js
import { v9 } from "./Vein/init.js";

let test_module = new v9.tags.module(
  {}
  ,[
    new v9.script(
      {
        tags:["test-tag"]
      }
    )
  ]
)

console.log(test_module.search("test-tag")); // Will have an array with 1 script.

test_module.search("test-tag").forEach(function(script){
  test_module.remove(script);
})

console.log(test_module.search("test-tag")); // Will have an empty array.

```


# [Return](../README.md)