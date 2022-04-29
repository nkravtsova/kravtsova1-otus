const { JSDOM } = require("jsdom");


function getPath(currentEl, doc){
	let path = '';

	while (true) {
	  if(currentEl.hasOwnProperty('id')){

		path = currentEl.tagName.toLowerCase() + '#' + currentEl.id + ' ' + path;

	  } else if(doc.getElementsByClassName(currentEl.className).length == 1){

		path = currentEl.tagName.toLowerCase() + '.' + currentEl.className.split(' ').join('.') + ' ' + path;

	  } else if(doc.getElementsByTagName(currentEl.tagName).length == 1){

		path = currentEl.tagName.toLowerCase() + ' '  + path;

	  } else {

		path = currentEl.tagName.toLowerCase() + ':nth-child(' + (+Array.from(currentEl.parentNode.children).indexOf(currentEl) + 1) + ') ' + path;

	  }

	  currentEl = currentEl.parentNode; 
	  if (currentEl.tagName == 'HTML') break;
	}
	
	return path.trim();
}  

module.exports = getPath;