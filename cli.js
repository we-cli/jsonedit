#!/usr/bin/env node
var fs = require('fs')
var prompt = require('prompt')
var JsonObj = require('./')

// not minimist for now
//var minimist = require('minimist')
//var args = minimist(process.argv.slice(2))
var args = process.argv.slice(2)

var filename = args[0]
if (typeof filename !== 'string' || !filename) {
	quit(new Error('filename required'))
}

var jsonObj = new JsonObj()
try {
	jsonObj.set(require(filename))
} catch(err) {}


// https://github.com/fritx/qqlog/blob/dev/bin/qqlog.js#L12
// for no prompt symbols
prompt.start({
	message: ' ',
  delimiter: ' '
})
askField()


function askField(){
	prompt.get(['key'], function(err, res){
		if (err) return quit(err)
		var key = res['key']
		if (!key) return quit()

		prompt.get(['value'], function(err, res){
			if (err) return quit(err)
			var val = res['value']

			jsonObj.set(key, val)

			// fixme: not a good way to recurse
			askField()
		})
	})
}


function quit(err){
	if (err) throw err
	fs.writeFileSync(filename, jsonObj.format())
	process.exit(0)
}


