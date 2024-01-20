const vscode = require(`vscode`);

const {
  registerCommand,
  getEditor,
} = require(`./lib/libVSCode.js`);

const {
  isUndefined,
  _isLast,
  _excludeLast,
} = require(`./parts/parts.js`);

function activate(context) {

  const extensionMain = (commandName) => {

    const editor = getEditor(); if (!editor) { return; }

    const editorSelectionsLoop = (edit, func) => {
      for(const select of editor.selections) {
        const range = new vscode.Range(
          select.start.line, 0, select.end.line, select.end.character
        );
        const text = editor.document.getText(range);
        const result = func(range, text);
        if (isUndefined(result)) { continue; }
        if (text === result) { continue; }
        if (edit.replace(range, result)) {}
      };
    };

    editor.edit(edit => {

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

      switch (commandName) {

        case `DeleteAuto`: {
          editorSelectionsLoop(edit, (range, text) => {

            // no select
            if (text === ``) { return; }

            const isLastLf = _isLast(text, `\n`);
            const lines = _excludeLast(text, `\n`).split(`\n`);
            // console.log(`DeleteAuto`, text, text===`\n`, lines);

            if (lines.length === 0) { new Error(`extensionMain`); }

            // select one line
            if (lines.length === 1) {
              if (lines[0].trim() === ``) {
                return ``;
              }
              return;
            }

            // select over two lines
            const blankLineInfoArray = lines.map(
              (l, i) => ({index: i, blank: l.trim() === ``})
            );

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

            if (blankLineContinueInfoArray.some(info => info.continue)) {
              // exists continue blank line -> decrease one
              let continueFlag = false;
              for (
                const info of blankLineContinueInfoArray
                .reverse()
              ) {
                if (info.continue) {
                  if (continueFlag === false) {
                    array_deleteIndex(lines, info.index);
                  }
                  continueFlag = true;
                } else {
                  continueFlag = false;
                }
              };
            } else {
              // no exists continue blank line -> delete
              for (
                const info of blankLineInfoArray
                .filter(info => info.blank)
                .reverse()
              ) {
                array_deleteIndex(lines, info.index);
              };
            }

            return lines.join(`\n`) + (isLastLf ? `\n` : ``);
          });
        }; break;

        case `DeleteBlankLines`: {
          editorSelectionsLoop(edit, (range, text) => {

            // no select
            if (text === ``) { return; }

            const isLastLf = _isLast(text, `\n`);
            const lines = _excludeLast(text, `\n`).split(`\n`);

            if (lines.length === 0) { new Error(`extensionMain`); }

            // select one line
            if (lines.length === 1) {
              if (lines[0].trim() === ``) {
                return ``;
              }
              return;
            }

            // select over two lines
            const blankLineInfoArray = lines.map(
              (l, i) => ({index: i, blank: l.trim() === ``})
            );

            for (
              const info of blankLineInfoArray
              .filter(info => info.blank)
              .reverse()
            ) {
              array_deleteIndex(lines, info.index);
            }

            return lines.join(`\n`) + (isLastLf ? `\n` : ``);
          });
        }; break;

        case `CombineBlankLinesOne`: {
          editorSelectionsLoop(edit, (range, text) => {

            // no select
            if (text === ``) { return; }

            const isLastLf = _isLast(text, `\n`);
            const lines = _excludeLast(text, `\n`).split(`\n`);

            if (lines.length === 0) { new Error(`extensionMain`); }

            // select one line
            if (lines.length === 1) { return; }

            // select over two lines
            const blankLineInfoArray = lines.map(
              (l, i) => ({index: i, blank: l.trim() === ``})
            );

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

            const deleteIndexs = [];
            let continueFlag = false;
            for (
              const info of blankLineContinueInfoArray
            ) {
              if (info.continue) {
                if (continueFlag === true) {
                  deleteIndexs.push(info.index);
               }
                continueFlag = true;
              } else {
                continueFlag = false;
              }
            };
            for (
              const index of deleteIndexs
              .reverse()
            ) {
              array_deleteIndex(lines, index);
            }

            return lines.join(`\n`) + (isLastLf ? `\n` : ``);
          });
        }; break;

        case `DecreaseBlankLinesOne`: {
          editorSelectionsLoop(edit, (range, text) => {

            // no select
            if (text === ``) { return; }

            const isLastLf = _isLast(text, `\n`);
            const lines = _excludeLast(text, `\n`).split(`\n`);

            if (lines.length === 0) { new Error(`extensionMain`); }

            // select one line
            if (lines.length === 1) {
              if (lines[0].trim() === ``) {
                return ``;
              }
              return;
            }

            // select over two lines
            const blankLineInfoArray = lines.map(
              (l, i) => ({index: i, blank: l.trim() === ``})
            );

            let blankFlag = false;
            for (
              const info of blankLineInfoArray
              .reverse()
            ) {
              if (info.blank) {
                if (blankFlag === false) {
                  array_deleteIndex(lines, info.index);
                }
                blankFlag = true;
              } else {
                blankFlag = false;
              }
            };

            return lines.join(`\n`) + (isLastLf ? `\n` : ``);
          });
        }; break;

        case `IncreaseBlankLinesOne`:
          editorSelectionsLoop(edit, (range, text) => {

            // no select
            if (text === ``) { return; }

            const isLastLf = _isLast(text, `\n`);
            const lines = _excludeLast(text, `\n`).split(`\n`);

            if (lines.length === 0) { new Error(`extensionMain`); }

            // select one line
            if (lines.length === 1) {
              if (lines[0].trim() === ``) {
                array_add(
                  lines,
                  [lines[0]],
                  0,
                );

                return lines.join(`\n`) + (isLastLf ? `\n` : ``);
              }
              return;
            }

            // select over two lines
            const blankLineInfoArray = lines.map(
              (l, i) => ({index: i, blank: l.trim() === ``})
            );

            let blankFlag = false;
            for (
              const info of blankLineInfoArray
              .reverse()
            ) {
              if (info.blank) {
                if (blankFlag === false) {
                  array_add(
                    lines,
                    [lines[info.index]],
                    info.index,
                  );
                }
                blankFlag = true;
              } else {
                blankFlag = false;
              }
            }

            return lines.join(`\n`) + (isLastLf ? `\n` : ``);
          });
          break;

        default:
          new Error(`extensionMain`);
      }
    } );

  };

  registerCommand(context,
    `ControlBlankLine.DeleteAuto`,
    () => { extensionMain(`DeleteAuto`); }
  );

  registerCommand(context,
    `ControlBlankLine.DeleteBlankLines`,
    () => { extensionMain(`DeleteBlankLines`); },
  );

  registerCommand(context,
    `ControlBlankLine.CombineBlankLinesOne`,
    () => { extensionMain(`CombineBlankLinesOne`); },
  );

  registerCommand(context,
    `ControlBlankLine.DecreaseBlankLinesOne`,
    () => { extensionMain(`DecreaseBlankLinesOne`); },
  );

  registerCommand(context,
    `ControlBlankLine.IncreaseBlankLinesOne`,
    () => { extensionMain(`IncreaseBlankLinesOne`); },
  );

}

function deactivate() {}

module.exports = {
  activate,
  deactivate
};
