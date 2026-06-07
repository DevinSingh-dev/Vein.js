<div align="center">
  <h1>Vein.js</h1>
</div>


**Vein(V9)** is a minimal, low-level reactive system designed to build powerful data-driven engines.  
It emphasizes **manual control**, **signal-based updates**, and **performance**, making it perfect for:

- ⚙️ Game engines
- 📊 Dataflow systems
- 🧠 Reactive backend models
- 🧩 Building blocks for tools like Vue/React—but leaner

<div align="center">
  <h2>Features</h2>
</div>

- 📦 Less than 20KB unminified
- ⚡ No dependency tracking or batching—runs **immediately**
- 🎯 Wildcard signal targeting
- 🔧 Fully modular, component-agnostic

<div align="center">
  <h2>Example</h2>
</div>

```js
import { v9 } from "./Vein/init.js";

const myModule =

new v9.module({}, [
  new v9.script({
    fired() {
      console.log("Script fired.");
    },
    signal: v9.utilities.system_signal_converter(`/`),
  }),
]);

// Will fire any time that some value in the module is changed.
```
<br>
<h3>The idea of v9, is that while it is good for quickly making organized systems, it is also good at plug and play features, including making tools that you can quickly hook up and reuse.<h3>

<br>
See an example of a tool here:

## [Example](examples/tags.md)


<div align="center">
  <h2>License(MIT)</h2>
</div>

<div align="center">
  <p>
We have an MIT License to help make it worry-free to create projects using</p>
  
  <h1>Vein(V9)</h1>
</div>
