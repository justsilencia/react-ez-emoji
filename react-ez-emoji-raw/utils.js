import { emojiIcons } from './emoji-icons';
import React from 'react';

const saveSelection = (function() {
    if (window.getSelection && document.createRange) {
        return function(containerEl) {
            var range = window.getSelection().getRangeAt(0);
            var preSelectionRange = range.cloneRange();
            preSelectionRange.selectNodeContents(containerEl);
            preSelectionRange.setEnd(range.startContainer, range.startOffset);
            var start = preSelectionRange.toString().length;
    
            return {
                start: start,
                end: start + range.toString().length
            }
        }
    } else if (document.selection && document.body.createTextRange) {
        return function(containerEl) {
            var selectedTextRange = document.selection.createRange();
            var preSelectionTextRange = document.body.createTextRange();
            preSelectionTextRange.moveToElementText(containerEl);
            preSelectionTextRange.setEndPoint("EndToStart", selectedTextRange);
            var start = preSelectionTextRange.text.length;
    
            return {
                start: start,
                end: start + selectedTextRange.text.length
            }
        }
    }
})();

const restoreSelection = (function() {
        if (window.getSelection && document.createRange) {
            return function(containerEl, savedSel) {
                    var charIndex = 0, range = document.createRange();
                    range.setStart(containerEl, 0);
                    range.collapse(true);
                    var nodeStack = [containerEl], node, foundStart = false, stop = false;
                
                    while (!stop && (node = nodeStack.pop())) {
                        if (node.nodeType === 3) {
                            var nextCharIndex = charIndex + node.length;
                            if (!foundStart && savedSel.start >= charIndex && savedSel.start <= nextCharIndex) {
                                range.setStart(node, savedSel.start - charIndex);
                                foundStart = true;
                            }
                            if (foundStart && savedSel.end >= charIndex && savedSel.end <= nextCharIndex) {
                                range.setEnd(node, savedSel.end - charIndex);
                                stop = true;
                            }
                            charIndex = nextCharIndex;
                        } else {
                            var i = node.childNodes.length;
                            while (i--) {
                                nodeStack.push(node.childNodes[i]);
                            }
                        }
                    }
            }
        } else if (document.selection && document.body.createTextRange) { 
            return function(containerEl, savedSel) {
                    var textRange = document.body.createTextRange();
                    textRange.moveToElementText(containerEl);
                    textRange.collapse(true);
                    textRange.moveEnd("character", savedSel.end);
                    textRange.moveStart("character", savedSel.start);
                    textRange.select();
            }
        }
})();

const htmlEntities = function(str) {
    return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
};

const escapeRegex = function(str) {
    return (str + '').replace(/([.?*+^$[\]\\(){}|-])/g, '\\$1');
};

const createIcon = function(emoji, imgpath) {
    var filename = emojiIcons[emoji];
    var path = imgpath || '';
    if (path.length && path.charAt(path.length - 1) !== '/') {
        path += '/';
    }
    return <img className='emoji-display' src={imgpath + filename} alt={htmlEntities(emoji)} />
}

const createHtmlIcon = function(emoji, imgpath) {
    var filename = emojiIcons[emoji];
    var path = imgpath || '';
    if (path.length && path.charAt(path.length - 1) !== '/') {
        path += '/';
    }
    var img = document.createElement('img');
    
    img.setAttribute('src', imgpath + filename);
    img.setAttribute('alt', htmlEntities(emoji));
    return img;
};

const replaceSelection = (function() {
    if (window.getSelection) {
        return function(content) {
            
            var range, sel = window.getSelection();
            var node = typeof content === 'string' ? document.createTextNode(content) : content;
            
            if (sel.getRangeAt && sel.rangeCount) {
                range = sel.getRangeAt(0);
                range.deleteContents();
                range.insertNode(document.createTextNode(' '));
                range.insertNode(node);
                range.setStart(node, 0);
                
                window.setTimeout(function() {
                    range = document.createRange();
                    range.setStartAfter(node);
                    range.collapse(true);
                    sel.removeAllRanges();
                    sel.addRange(range);
                }, 0);
            }
        }
    } else if (document.selection && document.selection.createRange) {
        return function(content) {
            var range = document.selection.createRange();
            if (typeof content === 'string') {
                range.text = content;
            } else {
                range.pasteHTML(content.outerHTML);
            }
        }
    }
})();

const sanitizeInput = function(ref) {
        var ELEMENT_NODE = 1;
        var TEXT_NODE = 3;
        var TAGS_BLOCK = ['p', 'div', 'pre', 'form'];
        var lines = [];
		var line  = [];

		var flush = function() {
			lines.push(line.join(''));
			line = [];
		};

		var sanitizeNode = function(node) {
			if (node.nodeType === TEXT_NODE) {
				line.push(node.nodeValue);
			} else if (node.nodeType === ELEMENT_NODE) {
				var tagName = node.tagName.toLowerCase();
				var isBlock = TAGS_BLOCK.indexOf(tagName) !== -1;

				if (isBlock && line.length) flush();

				if (tagName === 'img') {
					var alt = node.getAttribute('alt') || '';
					if (alt) line.push(alt);
					return;
				} else if (tagName === 'br') {
					flush();
				}

				var children = node.childNodes;
				for (var i = 0; i < children.length; i++) {
					sanitizeNode(children[i]);
				}

				if (isBlock && line.length) flush();
			}
		};

		var children = ref.childNodes;
		for (var i = 0; i < children.length; i++) {
			sanitizeNode(children[i]);
		}

		if (line.length) flush();

		return lines.join('\n');
}

export { 
        saveSelection, 
        restoreSelection, 
        replaceSelection, 
        htmlEntities, 
        escapeRegex, 
        createIcon,
        createHtmlIcon,
        sanitizeInput
        }