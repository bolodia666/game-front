import TextStyles from 'consts/TextStyles'
import UserModel from 'core/models/UserModel'
import ViewNotify from 'core/observers/notifications/ViewNotify'
import ViewObserver from 'core/observers/ViewObserver'
import { Container, Text } from 'pixi.js'
function create() {
	const container = new Container()
	const textField = new Text('', TextStyles.balance)
	container.addChild(textField)
	ViewObserver.on(ViewNotify.END_ROUND, update)

	update()
	function update() {
		const { balance } = UserModel
		textField.text = `Balance: ${balance}\nBet:1`
	}
	return { container }
}
export default { create }