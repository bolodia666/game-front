import Paths from 'consts/Paths'
import CommandObserver from 'core/observers/CommandObserver'
import CommandNotify from 'core/observers/notifications/CommandNotify'
import ViewNotify from 'core/observers/notifications/ViewNotify'
import ViewObserver from 'core/observers/ViewObserver'
import * as PIXI from 'pixi.js'

function create() {
	const container = new PIXI.Container()
	const texture = PIXI.Loader.shared.resources[Paths.playButton].texture
	const sprite = PIXI.Sprite.from(texture)
	sprite.scale.x = sprite.scale.y = 0.6
	container.addChild(sprite)

	container.buttonMode = true
	container.interactive = true
	container.on('pointerdown', play)

	ViewObserver.on(ViewNotify.END_ROUND, showButton)

	function play() {
		container.visible = false
		CommandObserver.emit(CommandNotify.PLAY)
	}
	function showButton() {
		container.visible = true
	}
	return { container }
}
export default { create }