function execute(message) {
	const field = document.getElementById('message')
	field.style.display = 'block'
	field.innerHTML = message
}
export default { execute }