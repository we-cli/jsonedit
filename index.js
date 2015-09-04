
module.exports = JsonObj

function JsonObj(obj){
	this.set(obj)
}

var proto = JsonObj.prototype

proto.set = function(key, val){
	if (typeof key !== 'string') {
		this.obj = key || {}
		return
	}
	this.obj[key] = val
}

// `delete` is a preserved keyword
proto.unset = function(key){
	delete this.obj[key]
}

proto.format = function(){
	return JSON.stringify(this.obj, null, 2)
}


