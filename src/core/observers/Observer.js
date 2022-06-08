function create() {
	const listeners = {}
	function on(e, callback) {
		if (listeners[e] == undefined) {
			listeners[e] = {}
			listeners[e].eventProperty = {}
			listeners[e].eventProperty.isOnOnce = false

			listeners[e].data = []
		}
		listeners[e].data.push(callback)
	}
	function onOnce(e, callback) {
		on(e, callback)
		listeners[e].eventProperty.isOnOnce = true
	}
	function emit(e, data) {
		if (listeners[e] == undefined || listeners[e].data == undefined) {
			return
		}
		listeners[e].data.forEach(callback => {
			if (listeners[e].eventProperty.isOnOnce) {
				off(e, callback)
			}
			callback(data)
		})
	}
	function off(e, callback) {
		listeners[e].data = listeners[e].data.
			filter(function (listener) { return listener !== callback })
	}
	return { on, onOnce, off, emit }
}
export default { create }