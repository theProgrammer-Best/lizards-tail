controller.up.onEvent(ControllerButtonEvent.Pressed, function () {
    mySprite.setImage(assets.image`snake_up`)
    dir = 1
    start = true
})
controller.left.onEvent(ControllerButtonEvent.Pressed, function () {
    mySprite.setImage(assets.image`snake_left`)
    dir = 0
    start = true
})
controller.right.onEvent(ControllerButtonEvent.Pressed, function () {
    mySprite.setImage(assets.image`snake_right`)
    dir = 3
    start = true
})
function pushList (list: number[]) {
    for (let index = 0; index <= list.length - 1; index++) {
        prevPos[list.length - 1 - index + 1] = list[list.length - 1 - index]
    }
}
controller.down.onEvent(ControllerButtonEvent.Pressed, function () {
    mySprite.setImage(assets.image`snake_down`)
    dir = 2
    start = true
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Food, function (sprite, otherSprite) {
    info.changeScoreBy(1)
    otherSprite.setPosition(3 + 5 * randint(0, 31), 3 + 5 * randint(0, 23))
    while (scene.backgroundImage().getPixel(otherSprite.x, otherSprite.y) > 1) {
        otherSprite.setPosition(3 + 5 * randint(0, 31), 3 + 5 * randint(0, 23))
    }
    spriteCheck = true
    time = time / 1.01
})
let spriteCheck = false
let prevPos: number[] = []
let start = false
let dir = 0
let time = 0
let mySprite: Sprite = null
let mySprite2 = sprites.create(assets.image`apple`, SpriteKind.Food)
mySprite2.setPosition(3 + 5 * randint(0, 31), 3 + 5 * randint(0, 23))
mySprite = sprites.create(assets.image`empty`, SpriteKind.Player)
mySprite.setPosition(83, 63)
time = 333
dir = -1
forever(function () {
    pushList(prevPos)
    prevPos[0] = mySprite.x + mySprite.y * 120
    if (mySprite.x < 0 || mySprite.x > 160 || (mySprite.y < 0 || mySprite.y > 120) || scene.backgroundImage().getPixel(mySprite.x, mySprite.y) == 7) {
        game.over(false)
    }
    if (start) {
        scene.backgroundImage().fillRect(mySprite.x - 3, mySprite.y - 3, 5, 5, 7)
    }
    if (spriteCheck) {
        spriteCheck = false
    } else {
        scene.backgroundImage().fillRect(prevPos[prevPos.length - 1] % 120 - 3, Math.floor(prevPos[prevPos.length - 1]) / 120 - 3, 5, 5, 0)
        prevPos.pop()
    }
    if (dir == 0) {
        mySprite.x += -5
    } else if (dir == 1) {
        mySprite.y += -5
    } else if (dir == 2) {
        mySprite.y += 5
    } else if (dir > 2) {
        mySprite.x += 5
    }
    pause(time)
})
