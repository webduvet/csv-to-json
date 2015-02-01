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
/**
 * csvFile input csv file
 * jsonFile output json file
 * select_headers - you can specify headers to be included in json file - must be within existing headers
 * key - key to be used instead of default index
 */
var Converter = module.exports = function(csvFile, jsonFile, select_headers, key, delimiter){
	this.csvFile = csvFile;
	this.outFile = jsonFile || false;
	this.headers = select_headers || false;
	this.key = key || false;
	this.delimiter = delimiter || ',';
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

	
		var extract_header = csvArr.shift().split(me.delimiter);
		//header = me.headers || header;
		me.headers = me.headers || extract_header;

		csvArr.pop();

		csvArr.forEach(function(line){
			var chunk = line.split(me.delimiter);
			var country = {};
			extract_header.forEach(function(el, index){
				if( me.headers.indexOf(el) > -1 ) {
					country[el] = chunk[index];
				}
			});
			out.push(country);
			if(me.key) {
				var hash = country[me.key];
				hash = hash.replace(/[^a-zA-Z&]/g, '').toLowerCase();
				obj[hash] = country;
			} else {
				obj = out;
			}
		});
		if (me.outFile) {
			fs.writeFile(me.outFile,JSON.stringify(obj), function(err){
				console.log(err);
			});
		}

	});
}

