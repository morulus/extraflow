extraflow
==

*Self-expandable sequence flow.*

Each enhancers can return a function, that will be appended to the end of the current sequence flow, thereby extend it.

Thus you can return nested functions to make sure your enhancer will be called last. This allows you to compose enhancers that can affect the target simultaneously at different stages of its formation.

```js
import extraflow from 'extraflow';

const enhancer = extraflow(
  () => () => () => (target) => target.join(' '),
  () => () => (target) => target.concat(['Web']),
  () => (target) => target.concat(['Wide']),
  (target) => target.concat(['World'])
)

enhancer([]); // World Wide Web
```

Point
--

Allows you to create the composition of enhancers the order of applying of which can be corrected by the amplifiers themselves.

This is useful when enhancers are connected in series, but their logic must work with certain stages of the target's assembly.

License
--

MIT, 2018, Vladimir Morulus <vladimirmorulus@gmail.com>
