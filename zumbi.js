class Zumbi{
    constructor(x, y){
        this.x = x;
        this.y = y;
        this.sprite = createSprite(x, y);
        this.sprite.addAnimation('Mandando', ZMandando);
        this.sprite.addAnimation('Mmorrendo', ZMmorrendo);
        this.sprite.changeAnimation('Mandando');
        this.sprite.scale = 0.37;
        this.sprite.velocityX = 5;
    }

    display(){
        this.movimento();
        this.sprite.setCollider('rectangle', 0, 0, 250, 440);
        this.sprite.debug = true;
        this.sprite.collide(piso);
        this.sprite.collide(suporte);
    }

    movimento(){
        
        if(this.sprite.x > width){
            this.sprite.velocityX *= (-1);
            this.sprite.mirrorX(-1);
        }
        if(this.sprite.x < 0){
            this.sprite.velocityX *= (-1);
            this.sprite.mirrorX(1);
        }
    }

    morte(){
        espada.play(loop = false);
        espada.setVolume(0.2);
        this.sprite.changeAnimation('Mmorrendo', ZMmorrendo);
        this.sprite.velocityX = 0;
        setTimeout(() => { this.sprite.remove();}, 1500);
        this.sprite = createSprite(width / 2, 0);
    }





































}