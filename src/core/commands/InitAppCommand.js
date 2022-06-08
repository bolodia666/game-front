import PreloaderService from 'core/services/PreloaderService'
import CommandObserver from 'core/observers/CommandObserver'
import CommandNotify from 'core/observers/notifications/CommandNotify'
import AppSettings from 'settings/AppSettings'
import * as PIXI from 'pixi.js'
import ServerService from 'core/services/ServerService'
async function execute() {
	await Promise.all([PreloaderService.loadRessources(), ServerService.init()])

	AppSettings.appWidth = document.body.clientWidth
	AppSettings.appHeight = document.body.clientHeight

	const pixiApp = new PIXI.Application({
		autoDensity: true,
		antialias: true,
		width: AppSettings.appWidth,
		height: AppSettings.appHeight,
		backgroundColor: AppSettings.appBgColor,
		resolution: window.devicePixelRatio || 1,
		view: document.getElementById('game')
	})
	document.getElementById('spinner').style.display = 'none'

	window.addEventListener('resize', () => CommandObserver.emit(CommandNotify.RESIZE_APP, pixiApp))

	CommandObserver.emit(CommandNotify.CREATE_STAGE, pixiApp.stage)
}
export default { execute }