import Texts from 'consts/Texts'
import TextStyles from 'consts/TextStyles'
import CommandObserver from 'core/observers/CommandObserver'
import CommandNotify from 'core/observers/notifications/CommandNotify'
import ViewNotify from 'core/observers/notifications/ViewNotify'
import ViewObserver from 'core/observers/ViewObserver'
import { Container, Graphics, Text } from 'pixi.js'
import Sizes from 'settings/Sizes'

function create() {
	const container = new Container()
	const upperState = new Graphics()
	const overState = new Graphics()
	const btnText = new Text(Texts.play, TextStyles.playButton)

	container.addChild(upperState)
	container.addChild(overState)
	container.addChild(btnText)

	drawState(upperState, 0xd634b2)
	drawState(overState, 0xef37c6)

	btnText.x = upperState.width * 0.5 - btnText.width * 0.5
	btnText.y = upperState.height * 0.5 - btnText.height * 0.5

	overState.visible = false

	container.buttonMode = true
	container.interactive = true
	container.mouseover = showOverState
	container.mouseout = showUpperState
	container.on('pointerdown', play)

	ViewObserver.on(ViewNotify.END_ROUND, showButton)

	function drawState(state, color) {
		const { w, h, r } = Sizes.playButton
		state.beginFill(color)
		state.drawRoundedRect(0, 0, w, h, r)
		state.endFill()
	}
	function showUpperState() {
		overState.visible = false
		upperState.visible = true
	}
	function showOverState() {
		upperState.visible = false
		overState.visible = true
	}
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