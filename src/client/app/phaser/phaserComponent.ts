import { Component } from '@angular/core';

@Component({selector: `PhaserDemo`,
template:`<div  class="screen-desktop-scrollable">
        <div id="simplegame-content" style="display: block; width: 100%; height: auto"></div>
    </div>
`})

export class PhaserComponent {
    // -----------------------------------------
    // STATIC PROPERTIES
    // -----------------------------------------

    // -----------------------------------------
    // @INPUT PROPERTIES
    // -----------------------------------------

    // -----------------------------------------
    // @OUTPUT PROPERTIES
    // -----------------------------------------

    // -----------------------------------------
    // PUBLIC PROPERTIES
    // -----------------------------------------

    // -----------------------------------------
    // PROTECTED PROPERTIES
    // -----------------------------------------

    // -----------------------------------------
    // PRIVATE PROPERTIES
    // -----------------------------------------
    private game:any;
    // -----------------------------------------
    // CONSTRUCTOR
    // -----------------------------------------

    constructor() {
			this.game = new Phaser.Game(
				'100%',
				'100%',
				Phaser.AUTO,
				'simplegame-content',
				this,
				false,
				true);
    }

	private preload():void
	{
		console.log('Preload');
		this.game.load.image('logo', 'assets/phaser/phaser2.png');
		this.game.load.spritesheet('button', 'assets/phaser/button_sprite_sheet.png', 193, 71);
	}

	private create():void
	{
		console.log('Create');
		let logo = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'logo');
		logo.anchor.setTo(0.5, 0.5);

		this.game.add.button(this.game.world.centerX - 130, 50, 'button', this.buttonClick, this);
	}

	private buttonClick():void
	{
		console.log('SimplePhaserGameComponent.buttonClick', 'Phaser Button Clicked !');

		let sprite = this.game.add.sprite(this.game.world.randomX, this.game.world.randomY, 'logo');
		let scaleFactor = (Math.random() * 100) / 100;
		sprite.scale.set(scaleFactor, scaleFactor);
	}

    // -----------------------------------------
    // PUBLIC METHODS
    // -----------------------------------------

    // -----------------------------------------
    // PROTECTED METHODS
    // -----------------------------------------

    // -----------------------------------------
    // PRIVATE METHODS
    // -----------------------------------------

}
