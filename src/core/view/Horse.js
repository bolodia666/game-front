import GameSettings from 'settings/GameSettings'
import HorseAnimation from 'core/view/HorseAnimation'
import { Container } from 'pixi.js'
import HorseManager from 'core/managers/HorseManager'
function create() {
	const container = new Container()
	const spine = HorseAnimation.create()
	const { walkInterval } = GameSettings.horse
	const walkTimer = setInterval(walk, walkInterval)

	container.addChild(spine.container)
	spine.play()

	const manager = HorseManager.create(container, spine)

	async function moveIn() {
		return manager.moveIn()
	}
	async function moveOut() {
		await manager.moveOut()
		remove()
	}
	async function walk() {
		manager.walk()
	}
	function remove() {
		if (container.parent) {
			container.parent.removeChild(container)
			clearInterval(walkTimer)
			spine.stop()
		}
	}

	return { container, moveIn, moveOut }
}
export default { create }