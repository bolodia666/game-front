import Texts from 'consts/Texts'
import CommandObserver from 'core/observers/CommandObserver'
import CommandNotify from 'core/observers/notifications/CommandNotify'
import AppSettings from 'settings/AppSettings'

const { host, connectionDelay } = AppSettings
const method = 'POST'
const headers = { 'Content-Type': 'application/json' }

async function send(data) {
	const { action, params } = data
	const body = JSON.stringify(params)
	const request = { headers, method, body }

	const delayTimeout = setTimeout(() => {
		CommandObserver.emit(CommandNotify.SHOW_POPUP, Texts.connectionDelay)
	}, connectionDelay)

	const response = { ok: true }
	try {
		const resp = await fetch(host + action, request)
		resp.status == 200 ? response.data = await resp.json() : response.ok = false
		clearTimeout(delayTimeout)
		CommandObserver.emit(CommandNotify.HIDE_POPUP)
	} catch (error) {
		response.ok = false
		clearTimeout(delayTimeout)
	}
	if (!response.ok) {
		CommandObserver.emit(CommandNotify.SHOW_POPUP, Texts.connectionError)
		throw new Error(Texts.connectionError)
	}
	return response.data
}

export default { send }