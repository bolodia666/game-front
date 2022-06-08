import gsap from 'gsap'
import Ease from 'consts/Ease'
import ViewObserver from 'core/observers/ViewObserver'
import ViewNotify from 'core/observers/notifications/ViewNotify'
import Sizes from 'settings/Sizes'
import GameSettings from 'settings/GameSettings'
import Paths from 'consts/Paths'
import SpineAnimation from 'core/view/SpineAnimation'
import { Container } from 'pixi.js'
function create() {
	const container = new Container()
	const spine = SpineAnimation.create(Paths.horseSpine)
	container.addChild(spine.container)

	const { walkDistance, walkDesire, walkInterval, runOutDistance } = GameSettings.horse
	const walkTimer = setInterval(walk, walkInterval)

	let animation

	const maxX = () => Sizes.horseField.w - container.width
	const maxY = () => Sizes.horseField.h - container.height

	container.x = Sizes.horseField.w
	container.y = Math.random() * maxY()

	ViewObserver.on(ViewNotify.RESIZE_FIELD, onResize)

	async function moveIn() {
		spine.play()
		const data = {
			x: Math.random() * maxX(),
			y: container.y,
			ease: Ease.run
		}
		return move(data)
	}
	async function moveOut() {
		const data = {
			x: -(container.width + Math.random() * runOutDistance),
			y: container.y,
			ease: Ease.run
		}
		await move(data)
		remove()
	}
	function move({ x, y, ease }) {
		return new Promise(resolve => {
			gsap.killTweensOf(container)
			animation = gsap.to(container, {
				ease: ease,
				duration: 2, x, y, onComplete: () => {
					animation = null
					resolve()
				}
			}
			)
		})
	}
	function walk() {
		if (Math.random() > walkDesire || animation) return
		const pos = {
			x: getCoord(container.x, maxX()),
			y: getCoord(container.y, maxY())
		}
		function getCoord(cc, max) {
			const kC = (Math.random() > 0.5) ? 1 : -1
			const coord = cc + Math.random() * walkDistance * kC
			return (coord > 0 && coord < max) ? coord : getCoord(cc, max)
		}
		move(pos, Ease.walk)
	}
	function remove() {
		if (container.parent) {
			container.parent.removeChild(container)
			clearInterval(walkTimer)
			spine.stop()
		}
	}
	function onResize() {
		gsap.killTweensOf(container)
		container.x = Math.random() * maxX()
		container.y = Math.random() * maxY()
		if (animation && animation.vars.onComplete) animation.vars.onComplete()
	}
	return { container, moveIn, moveOut }
}
export default { create }