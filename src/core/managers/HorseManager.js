import Ease from 'consts/Ease'
import GameSettings from 'settings/GameSettings'
import Sizes from 'settings/Sizes'
import gsap from 'gsap'
import ViewObserver from 'core/observers/ViewObserver'
import ViewNotify from 'core/observers/notifications/ViewNotify'
import Rand from 'utils/Rand'
function create(horse, spine) {
	const { walkDistance, runOutDistance, animDuration } = GameSettings.horse
	const maxX = () => Sizes.horseField.w - horse.width * 0.5
	const maxY = () => Sizes.horseField.h - horse.height * 0.5
	const minX = () => horse.width * 0.5
	const minY = () => horse.height * 0.5
	let animation

	horse.x = Sizes.horseField.w + horse.width
	horse.y = Rand.getMinMax(minY(), maxY())

	ViewObserver.on(ViewNotify.RESIZE_FIELD, onResize)
	function moveIn() {
		const data = {
			x: Rand.getMinMax(minX(), maxX()),
			y: horse.y,
			ease: Ease.run
		}
		return move(data)
	}
	function moveOut() {
		const data = {
			x: -Rand.getMinMax(horse.width, runOutDistance),
			y: horse.y,
			ease: Ease.run
		}
		return move(data)
	}
	function walk() {
		if (animation) return
		const x = Rand.getWay(horse.x, minX(), maxX(), walkDistance)
		const y = Rand.getWay(horse.y, minY(), maxY(), walkDistance)
		const distance = Math.abs(x - horse.x) + Math.abs(y - horse.y)
		const duration = distance / walkDistance * animDuration
		return move({ x, y, ease: Ease.walk, duration })
	}
	function move({ x, y, ease, duration = animDuration }) {
		const dir = (x > horse.x) ? -1 : 1
		spine.flipH(dir)
		return new Promise(resolve => {
			gsap.killTweensOf(horse)
			animation = gsap.to(horse, {
				ease, duration, x, y, onComplete: () => {
					animation = null
					resolve()
				}
			}
			)
		})
	}
	function onResize() {
		gsap.killTweensOf(horse)
		horse.x = Rand.getMinMax(minX(), maxX())
		horse.y = Rand.getMinMax(minY(), maxY())
		if (animation && animation.vars.onComplete) animation.vars.onComplete()
	}
	return { moveIn, moveOut, walk }
}
export default { create }