function getMinMax(min, max) {
	return Math.random() * (max - min) + min
}
function getWay(start, min, max, dist) {
	const k = (Math.random() > 0.5) ? 1 : -1
	const way = start + Math.random() * dist * k
	return (way > min && way < max) ? way : getWay(start, min, max, dist)
}
export default { getMinMax, getWay }