/*
 * csv-to-json
 * https://github.com/horse/csv-to-json
 *
 * Copyright (c) 2015 andrej bartko
 * Licensed under the MIT license.
 */

'use strict';

var fs = require('fs'),
		StringDecoder = require('string_decoder').StringDecoder,
		decoder = new StringDecoder('utf8');

var Converter = module.exports = function(csvFile, jsonFile, headers, index){
	this.csvFile = csvFile;
	this.outFile = jsonFile || false;
	this.headers = headers || false;
	this.index = index || false;
}



Converter.prototype.convert = function(cb){
	var me = this;
	var csv;
	var obj = {},
			out = new Array();

	fs.readFile(this.csvFile, function (err, data) {
	 	if (err) throw err;
		csv = data;
		var csvArr = decoder.write(csv).split('\n');
	
		var header = csvArr.shift().split(';');
		//header = me.headers || header;

		csvArr.pop();

		csvArr.forEach(function(line){
			var chunk = line.split(';');
			var country = {};
			header.forEach(function(el, index){
				if( me.headers.indexOf(el) > -1 ) {
					country[el] = chunk[index];
				}
			});
			out.push(country);
			if(me.index) {
				var hash = country[me.index];
				hash = hash.replace(/[^a-zA-Z]/g, '');
				console.log(hash);
				obj[hash] = country;
			}
		});
		if (me.outFile) {
			fs.writeFile(me.outFile,JSON.stringify(obj), function(err){
				console.log(err);
			});
		}
		//cb(obj);
	});
}

