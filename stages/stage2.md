# Game window

This is the starting point of our 2D game **Adventure**.
The `Main` class is responsible for creating the game window, adding the game panel where all the action happens, and starting the game so the player can interact with it.

Think of this file as the **launchpad** of the game — without it, the game cannot run.

```java
package main;

import javax.swing.JFrame;

public class Main {
	public static void main(String[] args) {
		JFrame window = new JFrame();
		window.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
		window.setResizable(false);
		window.setTitle("Adventure");
		gamePamel.startGameThread();
		window.setLocationRelativeTo(null);
		window.setVisible(true);
	}
}

```

with this code frame is ready now its time to give it dimentations

for that i created **Gpanel** class and extended it with class **JPanel**

```java
package main;

public class GPamel extends JPanel {


}

```

In 2D game development, especially **top-down** or **pixel-art** games, the game world is divided into **tiles** (small square blocks).
This section of the code defines the **size of each tile** and the **overall size of the game window**.

These values help the game engine understand:

- how big each tile should appear on screen,
- how many tiles fit horizontally and vertically,
- and the final resolution of the game window.

### 🧱 **Tile Settings**

- **originalTileSize = 16**

  - This is the base tile dimension (16×16 pixels).

  - Many classic games use 16-pixel tiles (Zelda, Pokémon, Mario maps).

- **scale = 3**

  - A 16×16 tile scaled by 3 becomes **48×48 pixels**, making it larger and easier to see on modern screens.

- **tilesize = originalTileSize × scale**

  - Final tile size used in the game.
  - Here: **16 × 3 = 48 pixels per tile**.

### 🖥️ **After these veriables its time to set window**

- **screenCol = 16**- Number of tiles horizontally.

- **screenRaw = 12**- Number of tiles vertically.

These two values decide how many tiles fit on the entire screen — basically the **world visible area**.

### 🧮 **Screen Resolution Calculation**

- **screenWidth = tilesize × screenCol**

  - 48 × 16 = **768 pixels**.

- **screenHeight = tilesize × screenRaw**

  - 48 × 12 = **576 pixels**.

This gives you a final game window of:

👉 **768 × 576 resolution**

This is a very common size for small 2D games.

## Why This Matters

- The tile system allows easy **map creation** and **movement logic**.
- Scaling preserves pixel-art style while increasing visibility.
- Fixed screen dimensions help control rendering performance and design layouts.

```java
package main;

import javax.swing.JPanel;

public class GPamel extends JPanel {
	//Screen Settings
	final int originalTileSize = 16;  //16 tiles
	final int scale= 3;
	final int tilesize = originalTileSize * scale;
	final int screenCol = 16;
	final int screenRaw = 12;
	final int screenWidth = tilesize * screenCol; //768 pixels
	final int screenHeight = tilesize * screenRaw;// 576 pixels
}

```

The **constructor** sets the game panel’s size, background color, enables double buffering for smoother rendering, and makes the panel focusable so it can receive keyboard input during gameplay.
It’s important because it prepares the game panel to render smoothly and receive player input, ensuring the game runs and responds correctly.

```java
package main;
import java.awt.Color;
import java.awt.Dimension;
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

	public GPamel() {
		this.setPreferredSize(new Dimension(
				        screenWidth, screenHeight));
		this.setBackground(Color.black);
		this.setDoubleBuffered(true);
		this.setFocusable(true);
	}

}

```

Now i create a game panel, attach it to the window, and use `pack()` to resize the window according to the panel’s preferred size, completing the basic game screen setup.
with these three lines

```java
GPamel gamePamel = new GPamel();
window.add(gamePamel);
window.pack();
```

**Now thw main class looks like this and when**

```java
package main;

import javax.swing.JFrame;

public class Main {
	public static void main(String[] args) {
		JFrame window = new JFrame();
		window.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
		window.setResizable(false);
		window.setTitle("Adventure");
		GPamel gamePamel = new GPamel();
		window.add(gamePamel);
		window.pack();
		window.setLocationRelativeTo(null);
		window.setVisible(true);
	}
}
```

# 🧠 **What Happens When the Program is execuated**

1. A JFrame (game window) is created.
2. A GPamel panel is created (this is your game screen).
3. The game panel is added to the window.
4. The window adjusts its size using `pack()`.
5. The window becomes visible.
   tis is thw final outut

![Output Screenshot](s2.png)
