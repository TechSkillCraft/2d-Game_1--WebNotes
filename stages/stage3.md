# 🎮 **Game Mechanics (What the Game Does & How It Works)**

**Game mechanics** are the rules and systems that define how your game behaves.
In a 2D Java game (like the one you are creating using `JPanel` + game loop), the main mechanics include:

### ✅ **1. Player Movement**

- Player moves using keyboard keys (↑ ↓ ← → or WASD).
- Movement is updated every frame in the game loop.
- Speed is controlled by a variable like `playerSpeed`.

### ✅ **2. Collision Detection**

- The game checks if the player hits walls, objects, enemies, or map boundaries.
- Collisions prevent the player from moving through solid tiles.

### ✅ **3. Tile-based World**

- The map is made of grid tiles (e.g., 16×16 or 48×48 pixels).
- The player moves according to tile positions.
- Useful for building maps, levels, and obstacles.

### ✅ **4. Rendering (Drawing)**

- Every frame, the game draws:

  - Background tiles
  - Player sprite
  - Objects
  - UI (health, coins, score)

### ✅ **5. Game Loop**

- The core mechanic controlling everything.
- Updates the game logic and redraws the screen constantly.

### **In short:**

**Game mechanics control how the player interacts with the game world and how the game world reacts.**

---

# ⏱️ **Game Time (How the Game Runs Over Time)**

**Game Time** means how your game handles timing — updates per second, real-time events, and frame control.

### 🔸 **1. FPS — Frames Per Second**

- Determines how smoothly the game runs.
- Example:

  ```java
  int FPS = 60;
  ```

- Game loop tries to update the game **60 times per second**.

### 🔸 **2. Delta Time (optional advanced concept)**

- Time between each frame.
- Helps make movement smooth even if FPS changes.

### 🔸 **3. Update & Draw Cycle**

Every frame:

1. **Update**

   - Move player
   - Check collisions
   - Update animations

2. **Draw**

   - Repaint screen

This cycle repeats forever while the game is running.

### 🔸 **4. Timer-based Events**

Examples:

- Move enemy every 0.5 seconds
- Spawn object every 10 seconds
- Animation changes frame every 100 ms

You usually use:

```java
System.nanoTime();
Thread.sleep();
```

---

# 📘 **One-line Summary**

**Game mechanics define how the game works and reacts, while game time controls how often updates happen and how the game progresses every second.**

---

---

# 🎮 **We Use Multithreading in Game Mechanics**

**Multithreading is used in game mechanics to run the game loop, animations, input handling, and rendering smoothly without freezing the user interface.**

In a game, many things happen **at the same time**:

- Player movement
- Enemy movement
- Animations
- Physics checks
- Rendering the screen (drawing graphics)
- Playing sound
- Handling user input

A **single thread cannot efficiently handle all of this smoothly**.

So we use **multithreading** to make the game run faster and smoother.

---

```java
public class GPamel extends JPanel implements Runnable {
    Thread gameThread;
}
```

### With multithreading:

- The window stays responsive.
- Game updates happen independently.
- Smooth gameplay (60 FPS).

---

# 🔄 **2. Continuous Updating (60 FPS)**

Inside the game thread:

```java
while(gameThread != null) {
    update();
    repaint();
}
```

This loop runs **60 times per second** in a separate thread.
If you run this loop on the main thread → your window hangs.

---

this method is responsible for starting thread

```java
public void startGameThread() {
		gameThread = new Thread(this);
		gameThread.start();
	}
```

```java
package main;
import java.awt.Color;
import java.awt.Dimension;
import java.awt.Graphics;

import javax.imageio.ImageTranscoder;
import javax.swing.JPanel;

public class GPamel extends JPanel implements Runnable{
	//Screen Settings
	final int originalTileSize = 16;  //16 tiles
	final int scale= 3;
	final int tilesize = originalTileSize * scale;
	final int screenCol = 16;
	final int screenRaw = 12;
	final int screenWidth = tilesize * screenCol; //768 pixels
	final int screenHeight = tilesize * screenRaw;// 576 pixels

	Thread gameThread;

	public GPamel() {
		this.setPreferredSize(new Dimension(
				        screenWidth, screenHeight));
		this.setBackground(Color.black);
		this.setDoubleBuffered(true);
		this.setFocusable(true);
	}
	public void startGameThread() {
		gameThread = new Thread(this);
		gameThread.start();
	}
	@Override
	public void run() {
		while(gameThread != null) {
			System.out.println("loop is running");
		}

	}

}

```

with this code when the program is run in console we can see pring statement printing 60 times per second

![Output Screenshot](s3.png)
