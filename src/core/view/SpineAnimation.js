import * as PIXI from 'pixi.js'
import { Spine } from 'pixi-spine'
function create(path) {
	const container = new PIXI.Container()
	const spineData = PIXI.Loader.shared.resources[path].spineData
	const spine = new Spine(spineData)
	spine.scale.x = 0.5
	spine.scale.y = 0.5
	spine.x = spine.width * 0.5
	spine.y = spine.height * 0.5

	container.addChild(spine)

	function play(name = 'animation', loop = true) {
		spine.state.setAnimation(0, name, loop)
	}
	function stop() {
		spine.lastTime = null
		spine.state.clearTracks()
		spine.skeleton.setToSetupPose()
	}
	return { container, play, stop }
}
export default { create }