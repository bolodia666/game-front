import ViewNotify from 'core/observers/notifications/ViewNotify'
import ViewObserver from 'core/observers/ViewObserver'
import Sizes from 'settings/Sizes'

function execute({ w, h }) {
	Sizes.horseField.w = w
	Sizes.horseField.h = h
	ViewObserver.emit(ViewNotify.RESIZE_FIELD)
}
export default { execute }