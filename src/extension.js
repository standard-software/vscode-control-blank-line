const vscode = require('vscode');

function activate(context) {

  const extensionMain = (commandName) => {

    const editor = vscode.window.activeTextEditor;
    if ( !editor ) {
      vscode.window.showInformationMessage(`No editor is active.`);
      return;
    }

    editor.edit(ed => {

      const array_deleteIndex = (
        array, indexStart, indexEnd = indexStart,
      ) => {
        array.splice(indexStart, indexEnd - indexStart + 1);
        return array;
      };

      const array_add = (array, valueArray, index = array.length - 1) => {
        array.splice(index + 1, 0, ...valueArray);
        return array;
      };

      const editorSelectionsLoop = (func) => {
        editor.selections.forEach(select => {
          const range = new vscode.Range(
            select.start.line, 0, select.end.line, select.end.character
          );
          const text = editor.document.getText(range);
          func(range, text);
        });
      }

      switch (commandName) {

        case `DeleteBlankLines`:
          editorSelectionsLoop((range, text) => {
            const blankLineIndexArray = [];
            const lines = text.split(`\n`);
            for (let i = 0; i < lines.length; i += 1) {
              if (lines[i].trim() === '') {
                blankLineIndexArray.push(i);
              }
            };
            blankLineIndexArray.reverse();
            for (let i = 0; i < blankLineIndexArray.length; i += 1) {
              array_deleteIndex(lines, blankLineIndexArray[i]);
            }
            ed.replace(range, lines.join('\n'));
          })
          break;

        case `CombineBlankLinesOne`:
          editorSelectionsLoop((range, text) => {
            const blankLineInfoArray = [];
            const lines = text.split(`\n`);
            if (lines.length <= 1) { return; }
            for (let i = 0; i < lines.length; i += 1) {
              if (lines[i].trim() === '') {
                blankLineInfoArray.push({index: i, blank: true})
              } else {
                blankLineInfoArray.push({index: i, blank: false})
              }
            };
            const blankLineContinueInfoArray = blankLineInfoArray.map(
              (info, index) => {
                if (info.blank === false) { return {...info, continue: false}; }
                if (index === 0) {
                  return {...info, continue: blankLineInfoArray[1].blank};
                } else if (index === blankLineInfoArray.length - 1) {
                  return {...info, continue: blankLineInfoArray[blankLineInfoArray.length - 2].blank};
                } else {
                  return {...info, continue: (
                    blankLineInfoArray[index - 1].blank
                    || blankLineInfoArray[index + 1].blank
                  )} ;
                }
              }
            );
            blankLineContinueInfoArray.reverse();

            let continueFlag = false;
            for (let i = 0; i < blankLineContinueInfoArray.length; i += 1) {
              if (blankLineContinueInfoArray[i].continue) {
                if (continueFlag === true) {
                  array_deleteIndex(lines, blankLineContinueInfoArray[i].index);
                }
                continueFlag = true;
              } else {
                continueFlag = false;
              }
            }
            ed.replace(range, lines.join('\n'));
          })
          break;

        case `DecreaseBlankLinesOne`:
          editorSelectionsLoop((range, text) => {
            const blankLineInfoArray = [];
            const lines = text.split(`\n`);
            if (lines.length <= 1) { return; }
            for (let i = 0; i < lines.length; i += 1) {
              if (lines[i].trim() === '') {
                blankLineInfoArray.push({index: i, blank: true})
              } else {
                blankLineInfoArray.push({index: i, blank: false})
              }
            };
            const blankLineContinueInfoArray = blankLineInfoArray.map(
              (info, index) => {
                if (info.blank === false) { return {...info, continue: false}; }
                if (index === 0) {
                  return {...info, continue: blankLineInfoArray[1].blank};
                } else if (index === blankLineInfoArray.length - 1) {
                  return {...info, continue: blankLineInfoArray[blankLineInfoArray.length - 2].blank};
                } else {
                  return {...info, continue: (
                    blankLineInfoArray[index - 1].blank
                    || blankLineInfoArray[index + 1].blank
                  )} ;
                }
              }
            );
            blankLineContinueInfoArray.reverse();

            let continueFlag = false;
            for (let i = 0; i < blankLineContinueInfoArray.length; i += 1) {
              if (blankLineContinueInfoArray[i].continue) {
                if (continueFlag === false) {
                  array_deleteIndex(lines, blankLineContinueInfoArray[i].index);
                }
                continueFlag = true;
              } else {
                continueFlag = false;
              }
            }
            ed.replace(range, lines.join('\n'));
          })
          break;

        case `IncreaseBlankLinesOne`:
          editorSelectionsLoop((range, text) => {
            const blankLineInfoArray = [];
            const lines = text.split(`\n`);
            if (lines.length <= 1) { return; }
            for (let i = 0; i < lines.length; i += 1) {
              if (lines[i].trim() === '') {
                blankLineInfoArray.push({index: i, blank: true})
              } else {
                blankLineInfoArray.push({index: i, blank: false})
              }
            };
            blankLineInfoArray.reverse();

            let blankFlag = false;
            for (let i = 0; i < blankLineInfoArray.length; i += 1) {
              if (blankLineInfoArray[i].blank) {
                if (blankFlag === false) {
                  array_add(lines, [lines[blankLineInfoArray[i].index]], blankLineInfoArray[i].index);
                }
                blankFlag = true;
              } else {
                blankFlag = false;
              }
            }
            ed.replace(range, lines.join('\n'));
          })
          break;

        default:
          new Error(`extensionMain`);
      }
    } );

  }

  context.subscriptions.push(
    vscode.commands.registerCommand(
      `ControlBlankLine.DeleteBlankLines`, () => {
      extensionMain(`DeleteBlankLines`);
    })
  );

  context.subscriptions.push(
    vscode.commands.registerCommand(
      `ControlBlankLine.CombineBlankLinesOne`, () => {
      extensionMain(`CombineBlankLinesOne`);
    })
  );

  context.subscriptions.push(
    vscode.commands.registerCommand(
      `ControlBlankLine.DecreaseBlankLinesOne`, () => {
      extensionMain(`DecreaseBlankLinesOne`);
    })
  );

  context.subscriptions.push(
    vscode.commands.registerCommand(
      `ControlBlankLine.IncreaseBlankLinesOne`, () => {
      extensionMain(`IncreaseBlankLinesOne`);
    })
  );

}

function deactivate() {}

module.exports = {
  activate,
  deactivate
}
