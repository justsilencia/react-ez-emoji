import React, { Component } from 'react';
import PropTypes from 'prop-types';
import EmojiMenu from './emoji-menu';
import { sanitizeInput, saveSelection, restoreSelection } from './utils';
import { emojiIcons } from './emoji-icons';
import './style.css';

export default class EzEmoji extends Component {

    constructor(props) {
        super(props);

        this.state = {
            emojis: emojiIcons,
            savedSelection: {
                start: 0,
                end: 0
            },
            menuVisible: false
        }

        this.inputRef = React.createRef();
        this.menuRef = React.createRef();
        this.onChange = this.onChange.bind(this);
        this.MenuToggle = this.MenuToggle.bind(this);
        this.getSanitizedVal = this.getSanitizedVal.bind(this);
    }

    getSanitizedVal() {
        const el = this.inputRef.current;
        return sanitizeInput(el);
    }

    onChange() {
        const savedSel = saveSelection(this.inputRef.current);
        const sanitizedText = this.getSanitizedVal();

        this.props.setVal(sanitizedText);

        this.setState({
            savedSelection: savedSel
        });
        
        document.execCommand('enableObjectResizing', true, true);
    }


    componentDidUpdate() {
        restoreSelection(this.inputRef.current, this.state.savedSelection);
    }

    disableResize() {
        document.execCommand('enableObjectResizing', false, false);
    }

    MenuToggle() {
        this.setState({menuVisible: !this.state.menuVisible});
    }

    shouldComponentUpdate(nextprop, nextstate) {
        return (this.state.menuVisible !== nextstate.menuVisible);
    }

    render () {

        return (
            <div className='ez-emoji-container'>
                <div className='emoji-wysiwyg-editor' id='ez-emoji-input'
                    contentEditable 
                    suppressContentEditableWarning='true'
                    onKeyUp={this.onChange} 
                    onPaste={this.onChange}
                    onMouseDown={this.disableResize}
                    onFocus={this.onFocus}
                    ref={this.inputRef}
                />
                <svg onClick={this.MenuToggle} className="ez-emoji-btn" aria-hidden="true" focusable="false" data-prefix="fa" data-icon="smile" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 496 512" data-fa-i2svg=""><path fill="currentColor" d="M248 8C111 8 0 119 0 256s111 248 248 248 248-111 248-248S385 8 248 8zm80 168c17.7 0 32 14.3 32 32s-14.3 32-32 32-32-14.3-32-32 14.3-32 32-32zm-160 0c17.7 0 32 14.3 32 32s-14.3 32-32 32-32-14.3-32-32 14.3-32 32-32zm194.8 170.2C334.3 380.4 292.5 400 248 400s-86.3-19.6-114.8-53.8c-13.6-16.3 11-36.7 24.6-20.5 22.4 26.9 55.2 42.2 90.2 42.2s67.8-15.4 90.2-42.2c13.4-16.2 38.1 4.2 24.6 20.5z"></path></svg>
                { this.state.menuVisible && <EmojiMenu emojiPath={this.props.emojiPath} triggerChange={this.onChange} MenuToggle={this.MenuToggle} /> }
            </div>
        )

    }

}

EzEmoji.propTypes = {
    setVal: PropTypes.func.isRequired,
    emojiPath: PropTypes.string.isRequired
}