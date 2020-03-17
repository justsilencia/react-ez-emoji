import React, {Component} from 'react';
import {emojiIcons} from './emoji-icons';
import { htmlEntities, createIcon, createHtmlIcon, replaceSelection, restoreSelection } from './utils';

export default class EmojiMenu extends Component {
    constructor(props) {
        super(props);

        this.emojiSelected = this.emojiSelected.bind(this);
    }

    emojiSelected(e) {
        const emoji = e.currentTarget.getAttribute('title');
        const img = createHtmlIcon(emoji, this.props.emojiPath);
        this.props.MenuToggle();

        this.props.inputRef.current.focus();
        
        if (this.props.savedSelection) {
            restoreSelection(this.props.savedSelection);
        }

        replaceSelection(img);
        
        this.props.triggerChange();
    }

    render() {
        let emojis = [], count = 1;

        for (let key in emojiIcons) {
                emojis.push(
                    <button onClick={this.emojiSelected} key={count} title={ htmlEntities(key)}> 
                        {createIcon(key, this.props.emojiPath)} <span className="label">{ htmlEntities(key)}</span>
                    </button>
                );
            count++;
        }

        return (
            <>
                <div className='emoji-menu'>
                    <div> 
                        {
                            emojis
                        }
                    </div>
                </div>
            </>
        );
    }
}
