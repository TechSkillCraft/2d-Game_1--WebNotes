## A box With Movement

**GPanel** cllass responsible for drawing a box on screen

```java
package main;
import java.awt.Color;
import java.awt.Dimension;
import java.awt.Graphics;
import java.awt.Graphics2D;

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

	//fps
		int fps = 60;
	KeyHandler keyH= new KeyHandler();
	Thread gameThread;

	//set player default position
		int playerx = 100;
		int playery = 100;
		int playerspeed = 4;


	public GPamel() {
		this.setPreferredSize(new Dimension(
				        screenWidth, screenHeight));
		this.setBackground(Color.black);
		this.setDoubleBuffered(true);
		this.setFocusable(true);
		this.addKeyListener(keyH);
	}
	public void startGameThread() {
		gameThread = new Thread(this);
		gameThread.start();
	}
	@Override
	public void run() {
		double drawInterval = 1000000000/fps;
		double delta =0;
		long lostTime = System.nanoTime() ;
        long currentTime;
		while(gameThread != null) {
			currentTime = System.nanoTime();
			delta +=(currentTime - lostTime)/drawInterval;
			lostTime = currentTime;
			if(delta >=1) {
				//update information
				update();
				//draw screen
				repaint();
				delta--;
			}

			}
	}

	public void update() {
		if(keyH.upPressed == true) {
			playery -= playerspeed;
		}
		else if(keyH.downPressed == true) {
			playery += playerspeed;
		}
		else if(keyH.leftPressed == true) {
			playerx -= playerspeed;
		}
		else if(keyH.rightPressed == true) {
			playerx += playerspeed;
		}
	}
	public void paintComponent(Graphics g) {
		super.paintComponent(g);
		Graphics2D g2 = (Graphics2D)g;
		g2.setColor(Color.white);
		g2.fillRect(playerx, playery, tilesize, tilesize);
		g2.dispose();

	}

}
```

**KeyHandler** responsible for giving a movement to the box

```java
package main;

import java.awt.event.KeyEvent;
import java.awt.event.KeyListener;

public class KeyHandler implements KeyListener{
    public boolean upPressed, downPressed, leftPressed, rightPressed;
	@Override
	public void keyTyped(KeyEvent e) {

	}

	@Override
	public void keyPressed(KeyEvent e) {
		int code = e.getKeyCode();
		if(code == KeyEvent.VK_W) {
			upPressed=true;
		}
		if(code == KeyEvent.VK_S) {
			downPressed=true;

		}
		if(code == KeyEvent.VK_A) {
			leftPressed=true;

		}
		if(code == KeyEvent.VK_D) {
			rightPressed=true;

		}
	}

	@Override
	public void keyReleased(KeyEvent e) {
		int code = e.getKeyCode();
		if(code == KeyEvent.VK_W) {
			upPressed=false;
		}
		if(code == KeyEvent.VK_S) {
			downPressed=false;

		}
		if(code == KeyEvent.VK_A) {
			leftPressed=false;

		}
		if(code == KeyEvent.VK_D) {
			rightPressed=false;

		}



	}
}
```

this is the ain class

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
		gamePamel.startGameThread();
		window.setLocationRelativeTo(null);
		window.setVisible(true);
	}
}


```

till now we have one box which an move on screen with keys
