# 🎮 Drawing a Box on Screen

To draw on the screen, two methods are used:

```java
public void update() {

}

public void paintComponent(Graphics g) {
    super.paintComponent(g);
}
```

And the updated game loop:

```java
@Override
public void run() {
    while (gameThread != null) {
        // update information
        update();
        // draw screen
        repaint();
    }
}
```

### Drawing a Box

Inside `paintComponent`:

```java
public void paintComponent(Graphics g) {
    super.paintComponent(g);
    Graphics2D g2 = (Graphics2D) g;
    g2.setColor(Color.white);
    g2.fillRect(100, 100, tilesize, tilesize);
    g2.dispose();
}
```

This draws a **white box** at position **(100, 100)** with size **tilesize × tilesize**.

<br>

# 🎮 Adding Movement

Create a `KeyHandler` class implementing `KeyListener`:

```java
public class KeyHandler implements KeyListener {

    public boolean upPressed, downPressed, leftPressed, rightPressed;

    @Override
    public void keyTyped(KeyEvent e) {}

    @Override
    public void keyPressed(KeyEvent e) {
        int code = e.getKeyCode();

        if (code == KeyEvent.VK_W)  upPressed = true;
        if (code == KeyEvent.VK_S)  downPressed = true;
        if (code == KeyEvent.VK_A)  leftPressed = true;
        if (code == KeyEvent.VK_D)  rightPressed = true;
    }

    @Override
    public void keyReleased(KeyEvent e) {
        int code = e.getKeyCode();

        if (code == KeyEvent.VK_W)  upPressed = false;
        if (code == KeyEvent.VK_S)  downPressed = false;
        if (code == KeyEvent.VK_A)  leftPressed = false;
        if (code == KeyEvent.VK_D)  rightPressed = false;
    }
}
```

Now the movement keys are:

- **W** → Move Up
- **S** → Move Down
- **A** → Move Left
- **D** → Move Right

<br>

# 🎮 Setting Up Movement in Game Panel

In your `GPamel` (or `GPanel`) class:

### Create KeyHandler

```java
KeyHandler keyH = new KeyHandler();
```

### Add listener in constructor

```java
this.addKeyListener(keyH);
```

### Player variables

```java
int playerx = 100;
int playery = 100;
int playerspeed = 4;
```

### Update the drawing

Replace:

```java
g2.fillRect(100, 100, tilesize, tilesize);
```

With:

```java
g2.fillRect(playerx, playery, tilesize, tilesize);
```

Now the box position changes dynamically.

### Update movement logic

```java
public void update() {
    if (keyH.upPressed) {
        playery -= playerspeed;
    }
    else if (keyH.downPressed) {
        playery += playerspeed;
    }
    else if (keyH.leftPressed) {
        playerx -= playerspeed;
    }
    else if (keyH.rightPressed) {
        playerx += playerspeed;
    }
}
```

<br>

# ❗ Problem: Box Disappears When Moving

This happens because the game updates **too fast**, possibly millions of times per second.
There is **no gap** between `update()` and `repaint()`.

To fix this, we create a **timed game loop**.

---

# ⏱️ Setting FPS Control

To get the current time:

```java
long currentTime = System.currentTimeMillis();  // milliseconds
```

or

```java
long currentTime = System.nanoTime();          // nanoseconds
```

1 second = 1,000,000,000 nanoseconds.

### FPS variable:

```java
int fps = 60;
```

---

# 🎮 Fixed Time Step Game Loop

This game loop runs at exactly **60 FPS**:

```java
@Override
public void run() {
    double drawInterval = 1000000000 / fps;
    double nextDrawTime = System.nanoTime() + drawInterval;

    while (gameThread != null) {

        // update information
        update();
        // draw screen
        repaint();

        try {
            double remainingTime = nextDrawTime - System.nanoTime();
            remainingTime = remainingTime / 1000000;

            if (remainingTime < 0) {
                remainingTime = 0;
            }

            Thread.sleep((long) remainingTime);
            nextDrawTime += drawInterval;

        } catch (InterruptedException e) {
            e.printStackTrace();
        }
    }
}
```

### What This Loop Does (Short Explanation)

1. Calculates the **next draw time** using FPS.
2. Calls **update()** to update logic.
3. Calls **repaint()** to draw the screen.
4. **Sleeps** so the game runs exactly at 60 FPS.

✔ This creates **smooth, stable movement**.

---

# 🎮 Delta Time / Accumulator Method (Second Method)

A more advanced loop:

```java
@Override
public void run() {
    double drawInterval = 1000000000 / fps;
    double delta = 0;
    long lastTime = System.nanoTime();
    long currentTime;

    while (gameThread != null) {
        currentTime = System.nanoTime();
        delta += (currentTime - lastTime) / drawInterval;
        lastTime = currentTime;

        if (delta >= 1) {
            update();
            repaint();
            delta--;
        }
    }
}
```

### Why Use Delta?

- Works even if FPS drops or increases.
- Movement becomes smooth and consistent.

---

# ✔ Final Summary

### **Two working game loops:**

1. **Fixed Time Step Loop** → Runs at constant FPS (e.g., 60 FPS)
2. **Delta Time Loop** → Updates based on time difference between frames

Both methods make movement **smooth** and prevent the box from disappearing.
