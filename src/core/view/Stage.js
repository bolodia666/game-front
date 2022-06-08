import PlayButton from 'core/view/PlayButton'
import HorseField from 'core/view/HorseField'
import NotifyWindow from 'core/view/NotifyWindow'
import ViewObserver from 'core/observers/ViewObserver'
import ViewNotify from 'core/observers/notifications/ViewNotify'
import CommandNotify from 'core/observers/notifications/CommandNotify'
import CommandObserver from 'core/observers/CommandObserver'
import Balance from 'core/view/Balance'
import { Container } from 'pixi.js'
import GameSettings from 'settings/GameSettings'
import AppSettings from 'settings/AppSettings'

function create() {
	const container = new Container()
	const playButton = PlayButton.create()
	const horseField = HorseField.create()
	const notifyWindow = NotifyWindow.create()
	const balance = Balance.create()

	container.addChild(horseField.container)
	container.addChild(notifyWindow.container)
	container.addChild(playButton.container)
	container.addChild(balance.container)

	resize()

	ViewObserver.on(ViewNotify.RESIZE_APP, resize)
	function resize() {
		const { appWidth, appHeight } = AppSettings
		const { margine } = GameSettings
		balance.container.x = balance.container.y = margine * 0.5
		playButton.container.x = appWidth * 0.5 - playButton.container.width * 0.5
		playButton.container.y = appHeight - playButton.container.height - margine
		const data = { w: appWidth, h: playButton.container.y - margine }
		CommandObserver.emit(CommandNotify.RESIZE_FIELD_COMMAND, data)
	}

	return { container }
}
export default { create }
