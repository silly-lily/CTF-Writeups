### Elf Minder 9000
Assist Poinsettia McMittens with playing a game of Elf Minder 9000.<br>
Solved: Silver, Gold

---

**Basic Gameplay:**

Instructions
- Draw a path for the elf.
- Collect all crates.
- Head to the checkered flag.

Path Rotation
- Click on a path segment to rotate it. 
- You cannot rotate paths on an occupied cell.

Tunnels
- Tunnels teleport the elf.
- Tunnels come in pairs.
- You can only dig one tunnel.

Springs
- When stepped on, springs launch the elf in the current direction of travel. If there isn't a path in that direction, the elf will skip the spring.

---

#### Silver Solution

The path is formed by a series of segments, where each segment connects a pair of points. Each pair of points creates a segment, and together, all the segments form the complete path.

We can use the JavaScript Console to draw a path for the elf:

```JavaScript
> game.segments = [[Point1,Point2], [Point3,Point4],...]
```

---

##### Sandy Start
<div align="center">
  <video width="1000" controls>
    <source src="sandy_start.mp4" type="video/mp4">
  </video>
</div><br>

```JavaScript
> game.segments = [[[1,5],[2,5]],[[2,5],[3,5]],[[3,5],[3,4]],[[3,4],[3,3]],[[3,3],[4,3]],[[4,3],[5,3]],[[5,3],[5,4]],[[5,4],[5,5]],[[5,5],[5,6]],[[5,6],[5,7]],[[5,7],[6,7]],[[6,7],[7,7]],[[7,7],[8,7]],[[8,7],[9,7]],[[9,7],[10,7]],[[10,7],[11,7]],[[11,7],[11,6]],[[11,6],[11,5]]];
> startBtn.click();
```

---

#### Waves and Crates
<div align="center">
  <video width="1000" controls>
    <source src="waves_and_crates.mp4" type="video/mp4">
  </video>
</div><br>

```JavaScript
> game.segments = [[[1,5],[2,5]],[[2,5],[3,5]],[[3,5],[3,4]],[[3,4],[3,3]],[[3,3],[4,3]],[[4,3],[5,3]],[[5,3],[6,3]],[[6,3],[7,3]],[[7,3],[7,4]],[[7,4],[7,5]],[[7,5],[7,6]],[[7,6],[7,7]],[[7,7],[6,7]],[[6,7],[5,7]],[[5,7],[5,8]],[[5,8],[5,9]],[[5,9],[6,9]],[[6,9],[7,9]],[[7,9],[8,9]],[[8,9],[9,9]],[[9,9],[10,9]],[[10,9],[11,9]],[[11,9],[11,8]],[[11,8],[11,7]],[[11,7],[11,6]],[[11,6],[11,5]]];
> startBtn.click();
```

---

#### Tidal Treasures
<div align="center">
  <video width="1000" controls>
    <source src="tidal_treasures.mp4" type="video/mp4">
  </video>
</div><br>

```JavaScript
> game.segments = [[[1,5],[1,4]],[[1,4],[1,3]],[[1,3],[2,3]],[[2,3],[3,3]],[[3,3],[3,4]],[[3,4],[3,5]],[[3,5],[3,6]],[[3,6],[3,7]],[[3,7],[2,7]],[[2,7],[1,7]],[[1,7],[1,8]],[[1,8],[1,9]],[[1,9],[2,9]],[[2,9],[3,9]],[[3,9],[4,9]],[[4,9],[5,9]],[[5,9],[6,9]],[[6,9],[7,9]],[[7,9],[8,9]],[[8,9],[9,9]],[[9,9],[10,9]],[[10,9],[11,9]],[[11,9],[11,8]],[[11,8],[11,7]],[[11,7],[11,6]],[[11,6],[11,5]]];
> startBtn.click();
```

---

We can also use the JavaScript Console to add springs:

```JavaScript
> game.entities.push([x, y, 7]);
```

---

#### Dune Dash
<div align="center">
  <video width="1000" controls>
    <source src="dune_dash.mp4" type="video/mp4">
  </video>
</div><br>

```JavaScript
> game.segments = [[[1,1],[1,2]],[[1,2],[1,3]],[[1,3],[1,4]],[[1,4],[1,5]],[[1,5],[1,6]],[[1,6],[1,7]],[[1,7],[1,8]],[[1,8],[1,9]],[[6,9],[5,9]],[[5,9],[5,8]],[[5,8],[5,7]],[[1,9],[2,9]],[[2,9],[3,9]],[[5,5],[6,5]],[[6,5],[7,5]],[[7,5],[8,5]],[[8,5],[9,5]],[[9,5],[10,5]],[[10,5],[11,5]],[[11,5],[11,6]],[[11,6],[11,7]],[[11,7],[11,8]],[[11,8],[11,9]],[[6,9],[7,9]]];
> game.entities.push([3, 9, 7]);
> game.entities.push([5, 7, 7]);
> startBtn.click();
```

---

#### Coral Cove
<div align="center">
  <video width="1000" controls>
    <source src="coral_cove.mp4" type="video/mp4">
  </video>
</div><br>

```JavaScript
> game.segments = [[[11,1],[10,1]],[[10,1],[9,1]],[[9,1],[8,1]],[[8,1],[7,1]],[[7,1],[7,2]],[[7,2],[7,3]],[[7,3],[8,3]],[[8,3],[9,3]],[[9,3],[9,4]],[[9,4],[9,5]],[[9,5],[9,6]],[[9,6],[9,7]],[[9,7],[8,7]],[[8,7],[7,7]],[[7,7],[6,7]],[[6,7],[5,7]],[[5,7],[5,6]],[[5,6],[5,5]],[[5,5],[4,5]],[[4,5],[3,5]],[[3,5],[3,4]],[[3,4],[3,3]],[[3,3],[3,2]],[[3,2],[3,1]],[[3,1],[2,1]],[[2,1],[1,1]],[[1,1],[1,2]],[[1,2],[1,3]],[[1,7],[1,8]],[[1,8],[1,9]],[[1,9],[2,9]],[[2,9],[3,9]],[[3,9],[4,9]],[[4,9],[5,9]],[[5,9],[6,9]],[[6,9],[7,9]],[[7,9],[8,9]],[[8,9],[9,9]],[[9,9],[10,9]],[[10,9],[11,9]]];
> game.entities.push([1,3,7]);
> startBtn.click();
```
---

We can also use the JavaScript Console to add tunnels:

```JavaScript
game.entities.push([x1, y1, 6],[x2, y2, 6]);
```

---

#### Shell Seekers
<div align="center">
  <video width="1000" controls>
    <source src="shell_seekers.mp4" type="video/mp4">
  </video>
</div><br>

```JavaScript
> game.segments = [[[11,5],[11,6]],[[11,6],[11,7]],[[11,7],[11,8]],[[11,8],[11,9]],[[1,9],[1,8]],[[1,8],[1,7]],[[1,7],[1,6]],[[1,6],[1,5]],[[1,5],[1,4]],[[1,4],[1,3]],[[1,3],[1,2]],[[1,2],[1,1]],[[1,1],[2,1]],[[2,1],[3,1]],[[3,1],[4,1]],[[4,1],[5,1]],[[5,1],[5,2]],[[5,2],[5,3]],[[5,3],[5,4]],[[5,4],[5,5]],[[5,5],[5,6]],[[5,6],[5,7]],[[5,7],[5,8]],[[5,8],[5,9]],[[5,9],[6,9]],[[6,9],[7,9]],[[7,9],[7,8]],[[7,8],[7,7]],[[7,7],[8,7]],[[8,7],[9,7]],[[9,7],[9,6]],[[9,6],[9,5]],[[9,5],[9,4]],[[9,4],[9,3]],[[9,1],[10,1]],[[10,1],[11,1]],[[11,1],[11,2]],[[11,2],[11,3]]];
> game.entities.push([9,3,7]);
> game.entities.push([11,5,6],[9,1,6]);
> startBtn.click();
```

---

#### Palm Grove Shuffle
<div align="center">
  <video width="1000" controls>
    <source src="palm_grove_shuffle.mp4" type="video/mp4">
  </video>
</div><br>

```JavaScript
> game.segments = [[[11,7],[11,8]],[[11,8],[11,9]],[[1,1],[2,1]],[[2,1],[3,1]],[[3,1],[3,2]],[[3,2],[3,3]],[[3,3],[4,3]],[[4,3],[5,3]],[[5,3],[5,4]],[[5,4],[5,5]],[[5,5],[5,6]],[[5,6],[5,7]],[[5,7],[4,7]],[[4,7],[3,7]],[[3,7],[2,7]],[[2,7],[1,7]],[[1,7],[1,8]],[[1,8],[1,9]],[[1,9],[2,9]],[[2,9],[3,9]],[[7,9],[8,9]],[[8,9],[9,9]],[[9,9],[9,8]],[[9,8],[9,7]],[[9,7],[9,6]],[[9,6],[9,5]],[[7,1],[8,1]],[[8,1],[9,1]],[[9,1],[10,1]],[[10,1],[11,1]],[[9,5],[9,4]],[[9,4],[9,3]]];
> game.entities.push([3,9,7],[9,3,7]);
> game.entities.push([11,7,6],[11,1,6]);
> startBtn.click();
```

---

#### Tropical Tangle
<div align="center">
  <video width="1000" controls>
    <source src="tropical_tangle.mp4" type="video/mp4">
  </video>
</div><br>

```JavaScript
> game.segments = [[[11,9],[10,9]],[[10,9],[9,9]],[[9,9],[9,8]],[[9,8],[9,7]],[[9,7],[8,7]],[[8,7],[7,7]],[[7,7],[6,7]],[[6,7],[5,7]],[[5,7],[5,8]],[[5,8],[5,9]],[[5,9],[4,9]],[[4,9],[3,9]],[[3,9],[2,9]],[[2,9],[1,9]],[[1,9],[1,8]],[[1,8],[1,7]],[[1,7],[1,6]],[[1,6],[1,5]],[[1,5],[2,5]],[[2,5],[3,5]],[[3,5],[4,5]],[[4,5],[5,5]],[[5,5],[5,4]],[[1,1],[1,2]],[[1,2],[1,3]],[[1,3],[2,3]],[[2,3],[3,3]],[[3,3],[4,3]],[[4,3],[5,3]],[[5,3],[5,2]],[[5,2],[5,1]],[[5,1],[6,1]],[[6,1],[7,1]],[[11,3],[11,4]],[[11,4],[11,5]]];
> game.entities.push([5,4,7]);
> game.entities.push([7,1,6],[11,3,6]);
> startBtn.click();
```

---


We can also use the JavaScript Console to rotate a segment:

```JavaScript
> game.addClick([x,y]);
```

---

#### Cate Craper
<div align="center">
  <video width="1000" controls>
    <source src="tropical_tangle.mp4" type="video/mp4">
  </video>
</div><br>

```JavaScript
> game.segments = [[[5,1],[5,2]],[[5,2],[5,3]],[[5,3],[5,4]],[[5,4],[5,5]],[[7,5],[6,5]],[[5,9],[5,8]],[[5,8],[5,7]],[[5,7],[5,6]],[[3,5],[4,5]],[[11,1],[10,1]],[[10,1],[9,1]],[[9,9],[10,9]],[[10,9],[11,9]]];
> game.entities.push([9,1,7]);
> game.entities.push([5,5,6],[11,9,6]);
> startBtn.click();
> async function rotate() {
  while(true) {

    const r = game.hero.cell.every((v, i) => v === [9, 9][i]);
    const delay = r ? 1000:0;

    await new Promise((resolve) => {
      if (r) {
        game.addClick([5,5]);
      }
    setTimeout(() => {resolve();}, delay);});

  }
}

rotate();
```

---

Additionally, we can rotate a segment to block the elf from retracing the entire path.

---

#### Shoreline Shuffle
<div align="center">
  <video width="1000" controls>
    <source src="shoreline_shuffle.mp4" type="video/mp4">
  </video>
</div><br>

```JavaScript
> game.segments = [[[1,4],[1,5]],[[1,5],[1,6]],[[1,3],[1,4]],[[1,9],[1,8]],[[1,8],[1,7]],[[2,7],[3,7]],[[3,7],[4,7]],[[4,7],[5,7]],[[5,6],[5,5]],[[5,4],[5,3]],[[9,4],[9,5]],[[9,5],[9,6]],[[9,6],[9,7]],[[8,7],[7,7]],[[7,7],[6,7]],[[9,8],[9,9]],[[9,9],[10,9]],[[10,9],[11,9]],[[9,3],[9,4]],[[5,4],[5,5]],[[1,7],[2,7]],[[8,7],[9,7]],[[5,6],[5,7]]];
> startBtn.click();
> async function rotate() {

  let c = 0;

  while(true) {

    const r = game.hero.cell.every((v, i) => v === [5,7][i]);
    const delay = r ? 1000:0;

    await new Promise((resolve) => {

      if (r) {

        c++;

      }

      if (r && c == 5) {

        const t = game.EMMEHGERDTICKSTHERESTICKSEVERYWHEREARHGHAHGREHUHGHH;
        game.clicks.push([[1,7], t+1],[[1,7],t+2],[[1,7],t+3],[[5,5],t+4])

      } else if (r && c == 8) {

        const t = game.EMMEHGERDTICKSTHERESTICKSEVERYWHEREARHGHAHGREHUHGHH;
        game.clicks.push([[5,7],t+1])

      } else if (r && c == 13) {

        const t = game.EMMEHGERDTICKSTHERESTICKSEVERYWHEREARHGHAHGREHUHGHH;
        game.clicks.push([[9,7],t+1],[[9,7],t+2],[[9,7],t+3])

      }

      setTimeout(() => {resolve();}, delay);});

  }
}

rotate();
```

---

#### Beachy Bounty
<div align="center">
  <video width="1000" controls>
    <source src="beach_bounty.mp4" type="video/mp4">
  </video>
</div><br>

```JavaScript
> game.segments = [[[1,5],[1,4]],[[1,4],[1,3]],[[1,3],[1,2]],[[1,2],[1,1]],[[1,1],[2,1]],[[2,1],[3,1]],[[3,1],[4,1]],[[4,1],[5,1]],[[5,1],[6,1]],[[6,1],[7,1]],[[7,1],[7,2]],[[7,2],[7,3]],[[7,3],[7,4]],[[7,4],[7,5]],[[7,5],[6,5]],[[6,5],[5,5]],[[8,5],[9,5]],[[9,5],[9,6]],[[9,6],[9,7]],[[9,7],[9,8]],[[9,8],[9,9]],[[9,9],[10,9]],[[10,9],[11,9]],[[11,9],[11,8]],[[11,8],[11,7]],[[11,7],[11,6]],[[11,6],[11,5]]];
> startBtn.click();
> async function rotate() {

  let c = 0;

  while(true) {

    const r = game.hero.cell.every((v, i) => v === [7,5][i]);
    const delay = r ? 1000:0;

    await new Promise((resolve) => {

      if (r) {

        c++;

      }

      if (r && c == 5) {

        const t = game.EMMEHGERDTICKSTHERESTICKSEVERYWHEREARHGHAHGREHUHGHH;
        game.clicks.push([[7,5], t+1],[[7,3],t+2])

      }
      setTimeout(() => {resolve();}, delay);});

  }
}

rotate();
```

---

#### Driftwood Dunes
<div align="center">
  <video width="1000" controls>
    <source src="driftwood_dunes.mp4" type="video/mp4">
  </video>
</div><br>

```JavaScript
> game.segments = [[[1,9],[2,9]],[[2,9],[3,9]],[[3,9],[3,8]],[[3,8],[3,7]],[[3,7],[3,6]],[[3,6],[3,5]],[[3,5],[3,4]],[[3,4],[3,3]],[[3,3],[4,3]],[[4,3],[5,3]],[[5,3],[5,2]],[[5,2],[5,1]],[[5,1],[6,1]],[[6,1],[7,1]],[[7,1],[8,1]],[[8,1],[9,1]],[[9,1],[9,2]],[[9,2],[9,3]],[[9,3],[9,4]],[[9,4],[9,5]],[[9,5],[8,5]],[[8,5],[7,5]],[[7,5],[7,6]],[[7,6],[7,7]],[[7,7],[7,8]],[[7,8],[7,9]],[[7,9],[8,9]],[[8,9],[9,9]],[[9,9],[10,9]],[[10,9],[11,9]]];
> startBtn.click();
```
---

***Poinsettia McMittens***
> Congratulations! You’ve completed all levels!<br>
That said, there is one level even our best Elf Minders have struggled to complete.<br>
It’s “A Real Pickle”, to be sure.<br>
We’re not even sure it’s solvable with our current tools.<br>
I’ve added “A Real Pickle” to your level list on the main menu.<br>
Can you give it a try?

---

#### Gold Solution
The source code checks if the spring's target point is a tunnel or spring:
```JavaScript
// guide.js getSpringTarget()
entityHere = this.entities.find(
  entity =>
    ~[
      EntityTypes.PORTAL,
      EntityTypes.SPRING,
    ].indexOf(entity[2]) && searchIndex &&
    entity[0] === nextPoint[0] &&
    entity[1] === nextPoint[1]);
```

If the target is a tunnel or spring, the spring target is set to the first segment that the user draws:
```JavaScript
// guide.js getSpringTarget()
if (entityHere) return this.segments[0][0]; // fix this
```

We can make the first segment in our path lead to the end flag. Next, we add a spring, where the target of the spring is another spring, causing the spring to send us to our first segment:

##### A Real Pickle
<div align="center">
  <video width="1000" controls>
    <source src="pickle.mp4" type="video/mp4">
  </video>
</div><br>

```JavaScript
> game.segments = [[[10,9],[11,9]]]
> game.segments.push([[1,1],[2,1]],[[2,1],[3,1]],[[7,1],[8,1]],[[8,1],[9,1]],[[9,1],[9,2]],[[9,2],[9,3]],[[9,3],[8,3]],[[6,3],[5,3]],[[5,3],[5,4]],[[5,4],[5,5]],[[5,5],[6,5]],[[6,5],[7,5]],[[7,5],[7,6]],[[7,6],[7,7]],[[7,7],[6,7]],[[6,7],[5,7]],[[5,7],[4,7]],[[4,7],[3,7]],[[3,7],[3,6]],[[3,6],[3,5]],[[3,5],[3,4]])

> game.entities.push([3, 1, 6],[7,1,6]);
> game.entities.push([8,3,7],[3,4,7]);
> startBtn.click();
```
