import RoundModel from 'core/models/RoundModel'
import ViewNotify from 'core/observers/notifications/ViewNotify'
import ViewObserver from 'core/observers/ViewObserver'
import Horse from 'core/view/Horse'
import { Container } from 'pixi.js'
function create() {
	const container = new Container()
	const horsesArr = []

	ViewObserver.on(ViewNotify.CLEAR_FIELD, clearField)
	ViewObserver.on(ViewNotify.START_ROUND, spawnNewHorses)
	setInterval(zIndexTicker, 100)

	async function spawnNewHorses() {
		const animations = []
		for (let i = 0; i < RoundModel.horses; i++) {
			const horse = Horse.create()
			horsesArr.push(horse)
			container.addChild(horse.container)
			animations.push(horse.moveIn())
		}
		await Promise.all(animations)
		ViewObserver.emit(ViewNotify.END_ROUND)
	}
	function clearField() {
		for (let i = horsesArr.length; i > 0; i--) {
			const horse = horsesArr.pop()
			horse.moveOut()
		}
	}
	function zIndexTicker() {
		container.children.sort((a, b) => a.y - b.y)
	}
	return { container }
}
export default { create }