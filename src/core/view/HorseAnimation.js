import * as PIXI from 'pixi.js'
import { Spine } from 'pixi-spine'
import Sizes from 'settings/Sizes'
import Paths from 'consts/Paths'

function create() {
	const container = new PIXI.Container()
	const spineData = PIXI.Loader.shared.resources[Paths.horseSpine].spineData
	const spine = new Spine(spineData)
	const body = new PIXI.Graphics()
	const scale = 0.3
	const type = '0' + Math.ceil(Math.random() * 3)

	container.addChild(body)
	container.addChild(spine)
	drawBody()
	setScale()

	function setScale() {
		spine.scale.x = scale
		spine.scale.y = scale
		spine.x = 0
		spine.y = body.height * 0.5
	}
	function drawBody() {
		const w = Sizes.horse.w * scale
		const h = Sizes.horse.h * scale
		body.beginFill(0, 0)
		body.drawRect(-w / 2, -h / 2, w, h)
	}
	function play(loop = true) {
		spine.state.setAnimation(0, type, loop)
	}
	function stop() {
		spine.lastTime = null
		spine.state.clearTracks()
		spine.skeleton.setToSetupPose()
	}
	function flipH(dir) {
		container.scale.x = dir
	}
	return { container, play, stop, flipH }
}
export default { create }