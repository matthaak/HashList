// See https://github.com/matthaak/HashList/ for documentation

var HashList = Class.create();
HashList.prototype = {
	
	// listGE - optional delimited string or GlideElement
	// delim - optional delimiter string of any characters, defaults to comma
	initialize: function(listGE, delim) {
		if (typeof listGE !== 'undefined')
			this.listGE = listGE;
		else
			this.listGE = '';		
		this.delim = delim || ',';
		
		this._arr = [];
		this._obj = {};
		
		var delimEsc = this.delim.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
		var delimRE = new RegExp('\\s*' + delimEsc + '\\s*');
		var i, elmt;
		var listArr = this.listGE.toString().split(delimRE);
		for (i=0; i<listArr.length; i++) {
			elmt = listArr[i];
			if (elmt && !this._obj[elmt]) {
				this._arr.push(elmt);
				this._obj[elmt] = true;
			}
		}		
	},
	
	add : function(value) {
		if (this.contains(value)) return false;
		this._arr.push(value);
		this._obj[value] = true;
		this._setGE();
		return true;
	},
	
	clear : function() {
		this._arr = [];
		this._obj = {};
		this._setGE();
	},
	
	clone : function() {
		var cloneHL = new HashList(this.listGE.toString(), this.delim);
		return cloneHL;
	},
	
	contains : function(value) {
		return this._obj[value] || false;
	},
	
	isEmpty : function() {
		return this._arr.length===0;
	},
	
	remove : function(value) {
		if (!this.contains(value)) return false;
		var idx = this._arr.indexOf(value);
		this._arr.splice(idx, 1);
		delete this._obj[value];
		this._setGE();
		return true;
	},
	
	size : function() {
		return this._arr.length;
	},
	
	toString : function() {
		return this._arr.join(this.delim);
	},
	
	toArray : function() {
		return this._arr.slice();
	},
	
	_setGE : function() {
		var newValue = this._arr.join(this.delim);
		if (this.listGE.setValue) { // If inited with GlideElement
			this.listGE.setValue(newValue);
		} else {
			this.listGE = newValue;
		}
	},	
	
    type: 'HashList'
};
