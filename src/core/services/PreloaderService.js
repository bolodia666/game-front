
import * as PIXI from 'pixi.js'
import Paths from 'consts/Paths'
import CommandObserver from 'core/observers/CommandObserver'
import CommandNotify from 'core/observers/notifications/CommandNotify'

function loadRessources() {
	const loader = PIXI.Loader.shared

	loader.add(Paths.horseSpine)
	loader.onError.add(reportError)
	loader.load()

	function reportError(e) {
		CommandObserver.emit(CommandNotify.SHOW_POPUP, e.message)
	}

	return new Promise((resolve) => { loader.onComplete.add(resolve) })
}
export default { loadRessources }