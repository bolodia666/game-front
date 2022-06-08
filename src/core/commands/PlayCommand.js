import ViewNotify from 'core/observers/notifications/ViewNotify'
import ViewObserver from 'core/observers/ViewObserver'
import ServerService from 'core/services/ServerService'

function execute() {
	ViewObserver.emit(ViewNotify.CLEAR_FIELD)
	ServerService.play()
}
export default { execute }