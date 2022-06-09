import RoundModel from 'core/models/RoundModel'
import UserModel from 'core/models/UserModel'
import Fetch from 'core/net/Fetch'
import Request from 'core/net/Request'
import ViewNotify from 'core/observers/notifications/ViewNotify'
import ViewObserver from 'core/observers/ViewObserver'

async function init() {
	const response = await Fetch.send(Request.init())
	UserModel.sessionId = response.sessionId
	UserModel.balance = response.user.balance
}
async function play() {
	const response = await Fetch.send(Request.play())
	RoundModel.horses = response.round.horses
	RoundModel.win = parseFloat(response.round.win)
	RoundModel.bet = response.round.bet
	UserModel.balance = response.user.balance
	ViewObserver.emit(ViewNotify.START_ROUND)
}
export default { init, play }