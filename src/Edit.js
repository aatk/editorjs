import React from "react";
import {Component} from 'react';
import {v4 as uuidv4} from 'uuid';

import "./Edit.css";
import EditorJS from '@editorjs/editorjs';
import Header from '@editorjs/header';
import List from '@editorjs/list';
import Raw from '@editorjs/raw';
import Underline from '@editorjs/underline';
import Table from '@editorjs/table';
import Delimiter from '@editorjs/delimiter';
import Quote from '@editorjs/quote';
import InlineCode from '@editorjs/inline-code';
import CodeTool from '@editorjs/code';
import Warning from '@editorjs/warning';
import Marker from '@editorjs/marker';
import Checklist from '@editorjs/checklist';
import Paragraph from '@editorjs/paragraph';
// import Link from '@editorjs/link';
// import ImageTool from '@editorjs/image';

class Edit extends Component {

    constructor(props) {
        super(props);

        this.editor = null;
        this.id = props.id;
        this.tools = props.tools ?? {};

        if (this.id === undefined) {
            this.id = uuidv4();
        }

        this.state = {
            readOnly: props.readOnly ?? true,
            toolsList: props.toolsList
        }
    }

    componentDidMount() {
        let toolsList = {
            header: Header,
            list: List,
            Raw: Raw,
            Underline: Underline,
            Table: Table,
            Delimiter: Delimiter,
            Quote: Quote,
            InlineCode: InlineCode,
            CodeTool: CodeTool,
            Warning: Warning,
            Marker: Marker,
            Paragraph: Paragraph,
            // link: Link,
            // Image: {
            //     class: ImageTool,
            //     config: {
            //         endpoints: {
            //             byFile: 'http://localhost:3000/uploadFile', // Your backend file uploader endpoint
            //             byUrl: 'http://localhost:3000/fetchUrl', // Your endpoint that provides uploading by Url
            //         }
            //     }
            // },
            Checklist: Checklist,
            ...this.state.toolsList
        };

        this.editor = new EditorJS({
            holder: this.id,
            tools: toolsList,
            readOnly: this.state.readOnly,
            placeholder: 'Начните вводить здесь текст!'
        });
    }

    onSave = () => {
        if (this.editor) {
            this.editor.save().then((outputData) => {
                console.log('Article data: ', outputData)
                this.temp = outputData.blocks;
            }).catch((error) => {
                console.log('Saving failed: ', error)
            });
        }
    }

    onOpen = () => {
        if (this.editor) {
            this.editor.render({blocks: this.temp});
        }
    }

    onRead = () => {
        if (this.editor) {
            this.editor.readOnly.toggle();
            this.setState({readOnly: !this.state.readOnly});
        }
    }

    getButtonBlock() {
        let ReadText = this.state.readOnly ? "WRITE" : "READ";
        let buttonBlock = (
            <div className={"text-center"}>
                <a className={"editButton"} onClick={this.onSave}>SAVE</a>
                <a className={"editButton"} onClick={this.onOpen}>OPEN</a>
                <a className={"editButton"} onClick={this.onRead}>{ReadText}</a>
            </div>
        );
        return buttonBlock;
    }


    render() {
        let ButtonBlock = '';
        if (this.props.showButtonControl) {
            ButtonBlock = this.getButtonBlock();
        }

        return (
            <>
                {ButtonBlock}
                <div id={this.id}/>
            </>
        )
    }
}

export {Edit};
