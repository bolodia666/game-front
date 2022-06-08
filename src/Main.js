import CommandsList from 'core/commands/CommandsList'
import CommandObserver from 'core/observers/CommandObserver'
import CommandNotify from 'core/observers/notifications/CommandNotify'

CommandsList.init()
CommandObserver.emit(CommandNotify.INIT_APP)