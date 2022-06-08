import Texts from 'consts/Texts'
import TextStyles from 'consts/TextStyles'
import RoundModel from 'core/models/RoundModel'
import ViewNotify from 'core/observers/notifications/ViewNotify'
import ViewObserver from 'core/observers/ViewObserver'
import { Container, Text } from 'pixi.js'
import AppSettings from 'settings/AppSettings'
function create() {
	const container = new Container()
	const notifyTextField = new Text('', TextStyles.notification)

	container.addChild(notifyTextField)

	ViewObserver.on(ViewNotify.CLEAR_FIELD, clear)
	ViewObserver.on(ViewNotify.END_ROUND, showRoundResult)
	ViewObserver.on(ViewNotify.RESIZE_APP, center)

	function showRoundResult() {
		notifyTextField.text = RoundModel.isWin ? Texts.win : Texts.lose
		center()
	}
	function clear() {
		notifyTextField.text = ''
	}
	function center() {
		const { appWidth, appHeight } = AppSettings
		notifyTextField.style.wordWrapWidth = appWidth
		container.x = appWidth * 0.5 - container.width * 0.5
		container.y = appHeight * 0.5 - container.height * 0.5
	}
	return { container }
}
export default { create }