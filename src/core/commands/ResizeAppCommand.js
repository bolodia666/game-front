import ViewNotify from 'core/observers/notifications/ViewNotify'
import ViewObserver from 'core/observers/ViewObserver'
import AppSettings from 'settings/AppSettings'

function execute(app) {
	AppSettings.appWidth = document.body.clientWidth
	AppSettings.appHeight = document.body.clientHeight
	app.renderer.resize(AppSettings.appWidth, AppSettings.appHeight)
	ViewObserver.emit(ViewNotify.RESIZE_APP)
}
export default { execute }