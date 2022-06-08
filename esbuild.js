const esbuild = require('esbuild')
const prod = {
	entryPoints: ['src/Main.js'],
	outdir: 'dist',
	bundle: true,
	sourcemap: false,
	minify: true,
	legalComments: 'none',

}
const dev = {
	entryPoints: ['src/Main.js'],
	outdir: 'dev',
	bundle: true,
	sourcemap: true,
	minify: false,

}

const config = process.env.target == 'dev' ? dev : prod
console.time('builded in ')
esbuild
	.build(config).then(() => console.timeEnd('builded in '))
	.catch((e) => {
		console.log(e)
		process.exit(1)
	})