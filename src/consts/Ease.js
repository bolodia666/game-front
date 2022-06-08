import gsap from 'gsap'
import CustomEase from 'gsap/CustomEase'
gsap.registerPlugin(CustomEase)
const run = CustomEase.create('custom', 'M0,0 C0.266,0.412 0.509,0.247 0.638,0.368 0.682,0.409 0.78,1 1,1 ')
const walk = 'slow(0.7, 0.7, false)'

export default { run, walk }