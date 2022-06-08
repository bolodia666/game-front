import UserModel from 'core/models/UserModel'

function init() {
	const action = '/game/session/init'
	const params = {}
	return { action, params }
}
function play() {
	const { sessionId } = UserModel
	const action = '/game/session/play'
	const params = { sessionId }
	return { action, params }
}
export default { init, play }