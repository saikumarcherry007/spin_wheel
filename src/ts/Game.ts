import {
    Application, Container, Sprite, Texture, Resource, ITextStyle, TextStyle, Text, DEG_TO_RAD
} from 'pixi.js';

import { gsap } from 'gsap';
import assets from './assets';
import { Sound } from '@pixi/sound';
import { getTexture } from './Textures';
import { preLoader } from './PreLoader';



export class Game {
    private stage: Container;

    private readonly app: Application;

    private isInitialized = false;

    private wheel: any;
    private sound: any;
    private arrow: any;
    private back: any;
    private game_container: Container;
    private prize_container: Container;
    private prize_display: Container;
    private prizes: string[] = ['Bad_Luck', 'Iphone', '1000Rps', '100Rps', 'Power_bank', 'Chocolates', 'MousePad']
    private prize_won: string = "Nill";
   
    private segAngle = 360 / this.prizes.length;

    private text_style: ITextStyle
    private stopAngle: number


    constructor(app: Application) {
        this.app = app;
        this.stage = app.stage;
        this.arrow = this.arrow
        this.game_container = new Container
        this.prize_container = new Container
        this.prize_display = new Container
        this.back = this.back
        this.stopAngle = (60 + Math.random() * 300)
        this.sound = Sound.from('./src/ts/bgsound.mp3');

        this.stage.addChild(this.game_container, this.prize_container, this.prize_display);
        this.prize_display.visible = false;

        this.text_style = new TextStyle({
            fontFamily: 'Cursive',
            fill: 'black',
            fontSize: '25px',
            align: 'center'
        });

        preLoader(assets, () => {
            this.isInitialized = true;
            this.back = this.createBackImage();
            this.arrow = this.createArrowImage();
            this.wheel = new Sprite(getTexture('wheel') as Texture<Resource>);
            this.wheel.anchor.set(0.5);
            this.wheel.position.set(this.app.view.width / 2, this.app.view.height / 2);
            this.game_container.addChild(this.wheel)

            
            const text1 = new Text("Bad_Luck", this.text_style)
            text1.position.set(this.app.view.width / 2 - 10, 200);
            this.prize_container.addChild(text1);

            const text2 = new Text("Iphone", this.text_style)
            
            text2.position.set(this.app.view.width / 2 + 100, 280);
            this.prize_container.addChild(text2);
            
            const text3 = new Text("1000Rps", this.text_style)
            text3.position.set(this.app.view.width / 2 + 100, 400);
            this.prize_container.addChild(text3);
            
            const text4 = new Text("100Rps", this.text_style)
            text4.position.set(this.app.view.width / 2 + 50, 500);
            this.prize_container.addChild(text4);
            
            const text5 = new Text("Power_bank", this.text_style)
            text5.position.set(this.app.view.width / 2 - 125, 500);
            this.prize_container.addChild(text5);
           
            const text6 = new Text("MousePad", this.text_style)
            text6.position.set(this.app.view.width / 2 - 150, 280);
            this.prize_container.addChild(text6);
           
            const text7 = new Text("Chocolates", this.text_style)
            text7.position.set(this.app.view.width / 2 - 160, 380);
            this.prize_container.addChild(text7);


            this.prize_container.pivot.x = this.app.view.width / 2;
            this.prize_container.pivot.y = this.app.view.height / 2;
            this.prize_container.x = this.app.view.width / 2;
            this.prize_container.y = this.app.view.height / 2;
            this.game_container.addChild(this.prize_container)



            this.wheel.interactive = true;
            this.wheel.buttonMode = true;
            this.wheel.on('click', () => {
                const stopAngle = Math.floor(Math.random() * 360)
                this.stopAngle = stopAngle

                const total_angle_rotation = DEG_TO_RAD * (3600 + stopAngle)
                console.log(`${this.stopAngle}`)
                gsap.to(this.wheel, {
                    x: this.app.view.width / 2, y: this.app.view.height / 2, rotation: -total_angle_rotation, duration: 2
                })
                gsap.to(this.prize_container, {
                    duration: 2,
                    rotation: -total_angle_rotation,
                })
                this.grabit();

            });
        });

    }

    private createArrowImage(): any {
        const img = new Sprite(getTexture('arrow') as Texture<Resource>);
        img.scale.set(0.3)
        img.rotation = DEG_TO_RAD * 180;
        img.position.set(this.app.view.width / 2 + 20, 100)
        return this.game_container.addChild(img)
    }
    private createBackImage(): any {
        const img = new Sprite(getTexture('back') as Texture<Resource>);

        img.scale.set(1.4, 1.6)
        img.position.set(-100, -100)
        return this.game_container.addChild(img)
    }

    

    private grabit() {
        console.log("won")
        if (this.stopAngle > 360 - this.segAngle / 2 || this.stopAngle <= 25.7) {
            this.prize_won = this.prizes[0]
            console.log(`${this.prize_won}`)

        } 
        else if (this.stopAngle <= 77.1) {
            this.prize_won = this.prizes[1]
            console.log(`${this.prize_won}`)
        }
        
        else if (this.stopAngle <= 128.5) {
            this.prize_won = this.prizes[2]
            console.log(`${this.prize_won}`)
        } 
        
        else if (this.stopAngle <= 180) {
            this.prize_won = this.prizes[3]
            console.log(`${this.prize_won}`)
        } 
        else if (this.stopAngle > 180 && this.stopAngle <= 231.4) {
            this.prize_won = this.prizes[4]
            console.log(`${this.prize_won}`)
        } 
        else if (this.stopAngle > 231.4 && this.stopAngle <= 282.8) {
            this.prize_won = this.prizes[5]
            console.log(`${this.prize_won}`)
        } 
        else if (this.stopAngle > 282.2 && this.stopAngle <= 334.2) {
            this.prize_won = this.prizes[6]
            console.log(`${this.prize_won}`)
        }



        setTimeout(() => {
            if (this.prize_display) {
                this.game_container.addChild(this.winnigMsg())
            }

            this.game_container.interactive = true
            this.game_container.on('click', () => {
                location.reload()
                
            })


        }, 3000);

    }

    private winnigMsg(): Text {
        const winMsg = new Text(`You Won ${this.prize_won}`, {
            fontFamily: 'Consolas',
            fill: 'white',
            fontSize: '90px',
            align: 'center'
        })
        winMsg.position.set(this.app.view.width / 2, this.app.view.height / 2);
        winMsg.anchor.set(0.5)
        console.log(`${winMsg}`)
        return winMsg
    }


    public update(): void {
        if (this.isInitialized) {
            setInterval(this.sound.play(), 20000)
        }
    }
}


