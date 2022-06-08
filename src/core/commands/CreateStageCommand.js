import Stage from 'core/view/Stage'

function execute(appStage) {
	const stage = Stage.create()
	appStage.addChild(stage.container)
}
export default { execute }