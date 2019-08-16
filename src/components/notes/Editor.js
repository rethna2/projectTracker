import React, { Component } from 'react';
import { withStyles } from '@material-ui/core';

import Draft from 'draft-js';
import Editor, { composeDecorators } from 'draft-js-plugins-editor';
import createInlineToolbarPlugin from 'draft-js-inline-toolbar-plugin';
import createSideToolbarPlugin from 'draft-js-side-toolbar-plugin';

import createImagePlugin from 'draft-js-image-plugin';

import createAlignmentPlugin from 'draft-js-alignment-plugin';
import createFocusPlugin from 'draft-js-focus-plugin';
import createResizeablePlugin from 'draft-js-resizeable-plugin';

import createCounterPlugin from 'draft-js-counter-plugin';
import createPrismPlugin from 'draft-js-prism-plugin';
import Prism from 'prismjs';
import createCodeEditorPlugin from 'draft-js-code-editor-plugin';

import createKaTeXPlugin from 'draft-js-katex-plugin';
import katex from 'katex';

import { getSelectedBlocks } from '../../logic/editor';

const {
  EditorState,
  convertFromRaw,
  convertToRaw,
  ContentBlock,
  SelectionState,
  Modifier,
  RichUtils
} = Draft;

const inlineToolbarPlugin = createInlineToolbarPlugin();
const { InlineToolbar } = inlineToolbarPlugin;

const sideToolbarPlugin = createSideToolbarPlugin();
const { SideToolbar } = sideToolbarPlugin;

const focusPlugin = createFocusPlugin();
const resizeablePlugin = createResizeablePlugin();
const alignmentPlugin = createAlignmentPlugin();
const { AlignmentTool } = alignmentPlugin;

const counterPlugin = createCounterPlugin();
const { WordCounter } = counterPlugin;

const prismPlugin = createPrismPlugin({ prism: Prism });
const codeEditorPlugin = createCodeEditorPlugin();

const kaTeXPlugin = createKaTeXPlugin({ katex });
const { InsertButton } = kaTeXPlugin;

const decorator = composeDecorators(
  resizeablePlugin.decorator,
  alignmentPlugin.decorator,
  focusPlugin.decorator
);
const imagePlugin = createImagePlugin({ decorator });

const styles = theme => ({
  wrapper: {
    display: 'flex'
  },
  aside: {
    width: 300,
    padding: 10,
    '& h2': {
      textAlign: 'center',
      textDecoration: 'underline'
    }
  },
  main: {
    width: 960,
    backgroundColor: 'white'
  },
  editor: {
    padding: '50px 20px 20px 100px',
    minHeight: 400
  },
  footer: {
    backgroundColor: 'aliceblue',
    marginTop: 30,
    padding: '10px 20px',
    textAlign: 'right'
  }
});

class NotesEditor extends Component {
  constructor(props) {
    super(props);
    this.state = this.initState(props);
    this.intervalID = null;
    this.content;
  }

  initState = props => {
    const stateObj = {
      placeHolderText: '',
      basicInfo: {
        title: '',
        desc: '',
        tags: []
      },
      isModified: false,
      classTxt: ''
    };

    return {
      ...stateObj,
      editorState: !props.doc
        ? EditorState.createEmpty()
        : EditorState.createWithContent(convertFromRaw(doc)),
      isLoading: false
    };

    console.log('props', this.props);
    let id = this.props.match.params.id;
    if (id) {
      this.props.dispatch(fetchContent('notes', id));
      return { ...stateObj, isLoading: true };
    } else {
      return {
        ...stateObj,
        editorState: EditorState.createEmpty(),
        //editorState: EditorState.createWithContent(convertFromRaw(state1)),
        isLoading: false
      };
    }
  };

  focus = () => this.editor.focus();

  componentWillReceiveProps(nextProps) {
    return;
    if (this.props.doc !== nextProps.doc) {
      this.setState({
        editorState: EditorState.createWithContent(
          convertFromRaw(nextProps.doc)
        )
      });
    }
  }

  onChange = (editorState, ...others) => {
    var selectionState = editorState.getSelection();
    var anchorKey = selectionState.getAnchorKey();
    var currentContent = editorState.getCurrentContent();
    let changeType = editorState.getLastChangeType();

    var block = currentContent.getBlockForKey(anchorKey);

    if (block.getData().get('empty')) {
      selectionState = selectionState.merge({
        focusOffset: 0,
        anchorOffset: 0
      });
      editorState = EditorState.forceSelection(editorState, selectionState);
    }

    let codeLang = null;
    if (block.getType() === 'code-block') {
      codeLang = block.getData().get('language');
    }
    const blockMap = currentContent.get('blockMap');
    console.log(
      '??',
      block.getData().get('empty'),
      block.getText(),
      block.getData().get('placeholderText'),
      block.getText() !== block.getData().get('placeholderText')
    );
    if (
      block.getText() &&
      block.getData().get('empty') &&
      block.getText() !== block.getData().get('placeholderText')
    ) {
      console.log('?? yes');
      const data = block.getData().merge({ empty: false });
      const newBlock = block.merge({ data });
      currentContent = currentContent.merge({
        blockMap: blockMap.set(newBlock.getKey(), newBlock)
      });
      editorState = EditorState.push(
        this.state.editorState,
        currentContent,
        'change-block-data'
      );
    }
    if (changeType === 'split-block' && block.getText() === '') {
      // block = block.set('text', 'emptypack');

      const data = block
        .getData()
        .merge({ empty: true, placeholderText: 'emptypara' });
      const newBlock = block.merge({ data /*text: 'emptypack'*/ });
      currentContent = currentContent.merge({
        blockMap: blockMap.set(newBlock.getKey(), newBlock)
      });

      currentContent = Modifier.insertText(
        currentContent,
        selectionState,
        'emptypara'
      );

      editorState = EditorState.push(
        this.state.editorState,
        currentContent,
        'change-block-data'
      );
      selectionState = SelectionState.createEmpty(newBlock.getKey()).merge({
        anchorOffset: 0,
        focusOffset: 0
      });
      editorState = EditorState.forceSelection(editorState, selectionState);
    }
    let { isModified } = this.state;
    if (editorState.getLastChangeType()) {
      isModified = true;
    }
    this.setState({
      editorState,
      codeLang,
      currentType: block.getType(),
      isModified
    });
    console.log('changeType', changeType);
    if (!changeType) {
      return;
    }
    this.content = convertToRaw(this.state.editorState.getCurrentContent());
    if (!this.intervalID) {
      console.log('<<>> inside');
      this.intervalID = setTimeout(() => {
        this.props.docUpdate(this.content);
        this.intervalID = null;
      }, 5000);
    }
  };

  customCountFunction(str) {
    const wordArray = str.match(/\S+/g); // matches words according to whitespace
    return wordArray ? wordArray.length : 0;
  }

  handleBeforeInput = (chars, editorState) => {
    console.log('chars', chars, chars.charCodeAt(0));
    //let { editorState } = this.state;
    var selectionState = editorState.getSelection();
    var anchorKey = selectionState.getAnchorKey();
    var currentContent = editorState.getCurrentContent();

    var block = currentContent.getBlockForKey(anchorKey);
    console.log('heey ', block.getData().get('empty'));
    if (block.getData().get('empty')) {
      const data = block.getData().merge({ empty: false });
      const newBlock = block.merge({ data });
      const blockMap = currentContent.get('blockMap');
      currentContent = currentContent.merge({
        blockMap: blockMap.set(newBlock.getKey(), newBlock)
      });
      console.log('heey ', block.getText().length);

      selectionState = SelectionState.createEmpty(newBlock.getKey()).merge({
        anchorOffset: 0,
        focusOffset: block.getText().length
      });

      currentContent = Modifier.replaceText(
        currentContent,
        selectionState,
        chars
      );

      editorState = EditorState.push(
        this.state.editorState,
        currentContent,
        'change-block-data'
      );

      editorState = EditorState.forceSelection(
        editorState,
        selectionState.merge({
          anchorOffset: 1,
          focusOffset: 1
        })
      );

      this.setState({
        editorState
      });
      return 'handled';
    }
  };

  handleKeyCommand = (command, editorState) => {
    console.log('handleKeyCommand', command);
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      this.onChange(newState);
      return 'handled';
    }
    console.log('command', command);
    if (command === 'backspace') {
      var selectionState = editorState.getSelection();
      var anchorKey = selectionState.getAnchorKey();
      var currentContent = editorState.getCurrentContent();

      var block = currentContent.getBlockForKey(anchorKey);
      console.log('block.getText().length', block.getText().length);
      if (block.getText().length === 1) {
        const data = block.getData().merge({ empty: true });
        block = block.merge({ data });

        const blockMap = currentContent.get('blockMap');
        currentContent = currentContent.merge({
          blockMap: blockMap.set(block.getKey(), block)
        });

        console.log(
          "block.getData().get('placeholderText')",
          block.getData().get('placeholderText')
        );
        //editorState = EditorState.forceSelection(editorState, selectionState);
        selectionState = SelectionState.createEmpty(block.getKey()).merge({
          anchorOffset: 0,
          focusOffset: 1
        });

        currentContent = Modifier.replaceText(
          currentContent,
          selectionState,
          block.getData().get('placeholderText')
        );
        console.log('done');

        editorState = EditorState.push(
          editorState,
          currentContent,
          'change-block-data'
        );
        this.setState({ editorState });
        return 'handled';
      } else {
        if (block.getData().get('empty')) {
          return 'handled';
        }
      }
    } else if (command === 'split-block') {
      var selectionState = editorState.getSelection();
      var anchorKey = selectionState.getAnchorKey();
      var currentContent = editorState.getCurrentContent();

      var block = currentContent.getBlockForKey(anchorKey);
      if (block.getData().get('empty')) {
        return 'handled';
      }
    }
    return 'not-handled';
  };

  myBlockStyleFn = block => {
    const data = block.getData();
    let classes = '';
    if (data.get('empty')) {
      classes += 'empty ';
    }
    switch (data.get('blockPos')) {
      case 'start':
        classes += 'blockstart';
        break;
      case 'middle':
        classes += 'blockmiddle';
        break;
      case 'end':
        classes += 'blockend';
        break;
      case 'left':
        classes += 'left';
        break;
      case 'right':
        classes += 'right';
        break;
      default:
        break;
    }
    if (classes !== '') {
      return classes;
    }
  };

  addBlock = () => {
    let { editorState } = this.state;
    var selectionState = editorState.getSelection();
    var anchorKey = selectionState.getAnchorKey();
    var focusKey = selectionState.getFocusKey();
    let currentContent = editorState.getCurrentContent();
    let blocks = getSelectedBlocks(currentContent, anchorKey, focusKey);
    console.log('blocks', blocks);
    let blockMap = currentContent.get('blockMap');
    for (let i = 0; i < blocks.length; i++) {
      var block = blocks[i];
      let data;
      if (i === 0) {
        data = block.getData().merge({ blockPos: 'start' });
      } else if (i === blocks.length - 1) {
        data = block.getData().merge({ blockPos: 'end' });
      } else {
        data = block.getData().merge({ blockPos: 'middle' });
      }
      const newBlock = block.merge({ data });
      blockMap = blockMap.set(newBlock.getKey(), newBlock);
    }
    currentContent = currentContent.merge({
      blockMap
    });
    editorState = EditorState.push(
      editorState,
      currentContent,
      'change-block-data'
    );
    this.setState({
      editorState
    });
  };

  addData = () => {
    const classTxt = this.state.classTxt.trim();
    console.log('classTxt', classTxt);
    if (classTxt === '') {
      return;
    }
    var selectionState = this.state.editorState.getSelection();
    var anchorKey = selectionState.getAnchorKey();
    var currentContent = this.state.editorState.getCurrentContent();
    var block = currentContent.getBlockForKey(anchorKey);
    const blockMap = currentContent.get('blockMap');
    const data = block.getData().merge({ blockPos: classTxt });
    const newBlock = block.merge({ data });
    currentContent = currentContent.merge({
      blockMap: blockMap.set(newBlock.getKey(), newBlock)
    });
    this.setState({
      editorState: EditorState.push(
        this.state.editorState,
        currentContent,
        'change-block-data'
      )
    });
  };

  render() {
    const { editorState } = this.state;
    const { classes } = this.props;
    return (
      <div className={classes.wrapper}>
        <aside className={classes.aside}>
          <h2>Table Of Content</h2>
          <ol>
            <li onClick={this.addBlock}>Add Block</li>
            <li>
              <input
                type="text"
                value={this.state.classTxt}
                onChange={e => this.setState({ classTxt: e.target.value })}
              />
              <span onClick={this.addData}>Add Data</span>
            </li>
          </ol>
        </aside>
        <main className={classes.main}>
          <section onClick={this.focus} className={classes.editor}>
            <Editor
              readonly
              className="editor"
              ref={n => (this.editor = n)}
              placeholder="Start typing your notes here..."
              handleKeyCommand={this.handleKeyCommand}
              handleBeforeInput={this.handleBeforeInput}
              editorState={editorState}
              onChange={this.onChange}
              onTab={e => {
                console.log('onTab', e, e.stopPropagation);
                //e.stopPropagation();
                this.onChange(RichUtils.onTab(e, this.state.editorState, 4));
              }}
              blockStyleFn={this.myBlockStyleFn}
              blockRendererFn={this.blockRenderer}
              plugins={[
                inlineToolbarPlugin,
                sideToolbarPlugin,
                focusPlugin,
                alignmentPlugin,
                resizeablePlugin,
                imagePlugin,
                codeEditorPlugin,
                prismPlugin,
                counterPlugin,
                kaTeXPlugin
              ]}
            />
            <InlineToolbar />
            <SideToolbar />
            <AlignmentTool />
          </section>
          <footer className={classes.footer}>
            Total Words :
            {
              <WordCounter
                limit={40}
                countFunction={this.customCountFunction}
              />
            }
          </footer>
        </main>
      </div>
    );
  }
}

export default withStyles(styles)(NotesEditor);
