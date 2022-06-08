import CreateStageCommand from 'core/commands/CreateStageCommand'
import InitAppCommand from 'core/commands/InitAppCommand'
import PlayCommand from 'core/commands/PlayCommand'
import ResizeAppCommand from 'core/commands/ResizeAppCommand'
import CommandObserver from 'core/observers/CommandObserver'
import CommandNotify from 'core/observers/notifications/CommandNotify'
import ResizeFieldCommand from 'core/commands/ResizeFieldCommand'
import PopupCommand from 'core/commands/PopupCommand'
import HidePopupCommand from 'core/commands/HidePopupCommand'

function init() {
	CommandObserver.on(CommandNotify.INIT_APP, InitAppCommand.execute)
	CommandObserver.on(CommandNotify.CREATE_STAGE, CreateStageCommand.execute)
	CommandObserver.on(CommandNotify.RESIZE_APP, ResizeAppCommand.execute)
	CommandObserver.on(CommandNotify.PLAY, PlayCommand.execute)
	CommandObserver.on(CommandNotify.RESIZE_FIELD_COMMAND, ResizeFieldCommand.execute)
	CommandObserver.on(CommandNotify.SHOW_POPUP, PopupCommand.execute)
	CommandObserver.on(CommandNotify.HIDE_POPUP, HidePopupCommand.execute)
}
export default { init }