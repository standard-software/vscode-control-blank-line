const vscode = require(`vscode`);

const {
  registerCommand,
  getEditor,
} = require(`./lib/libVSCode.js`);

const {
  isUndefined,
  _isLast,
  _excludeLast,
  array,
} = require(`./parts/parts.js`);

const getBlankLineInfos = ({ lines, continueInfo }) => {
  if (lines.length <= 1) {
    throw new Error(`extension:control-blank-line`);
  }

  const blankLineInfos = lines.map(
    (l, i) => ({index: i, blank: l.trim() === ``})
  );

  if (continueInfo === false) {
    return blankLineInfos;
  }

  const blankLineContinueInfos = blankLineInfos.map(
    (info, index) => {
      if (info.blank === false) { return {...info, continue: false}; }
      if (index === 0) {
        return {...info, continue: blankLineInfos[1].blank};
      } else if (index === blankLineInfos.length - 1) {
        return {...info, continue: blankLineInfos[blankLineInfos.length - 2].blank};
      } else {
        return {...info, continue: (
          blankLineInfos[index - 1].blank
          || blankLineInfos[index + 1].blank
        )} ;
      }
    }
  );

  return blankLineContinueInfos;
};


function activate(context) {

  const extensionMain = (commandName) => {

    const editor = getEditor(); if (!editor) { return; }

    const editorSelectionsLoop = (edit, func) => {
      for(const select of editor.selections) {
        const range = new vscode.Range(
          select.start.line, 0,
          select.end.line, select.end.character
        );
        const text = editor.document.getText(range);
        const result = func(range, text);
        if (isUndefined(result)) { continue; }
        if (text === result) { continue; }
        if (edit.replace(range, result)) {}
      };
    };

    editor.edit(edit => {

      switch (commandName) {

        case `DeleteAuto`: {
          editorSelectionsLoop(edit, (range, text) => {

            // no select
            if (text === ``) { return; }

            const isLastLf = _isLast(text, `\n`);
            const lines = _excludeLast(text, `\n`).split(`\n`);
            // console.log(`DeleteAuto`, text, text===`\n`, lines);

            if (lines.length === 0) {
              throw new Error(`extension:control-blank-line`);
            }

            // select one line
            if (lines.length === 1) {
              if (lines[0].trim() === ``) {
                return ``;
              }
              return;
            }

            // select over two lines
            const blankLineInfos = getBlankLineInfos({
              lines, continueInfo: true
            });

            if (blankLineInfos.some(info => info.continue)) {
              // exists continue blank line -> decrease one
              let continueFlag = false;
              for (
                const info of blankLineInfos
                .reverse()
              ) {
                if (info.continue) {
                  if (continueFlag === false) {
                    array._deleteIndex(lines, info.index);
                  }
                  continueFlag = true;
                } else {
                  continueFlag = false;
                }
              };
            } else {
              // no exists continue blank line -> delete
              for (
                const info of blankLineInfos
                .filter(info => info.blank)
                .reverse()
              ) {
                array._deleteIndex(lines, info.index);
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

            if (lines.length === 0) {
              throw new Error(`extension:control-blank-line`);
            }

            // select one line
            if (lines.length === 1) {
              if (lines[0].trim() === ``) {
                return ``;
              }
              return;
            }

            // select over two lines
            const blankLineInfos = getBlankLineInfos({
              lines, continueInfo: false
            });

            for (
              const info of blankLineInfos
              .filter(info => info.blank)
              .reverse()
            ) {
              array._deleteIndex(lines, info.index);
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

            if (lines.length === 0) {
              throw new Error(`extension:control-blank-line`);
            }

            // select one line
            if (lines.length === 1) { return; }

            // select over two lines
            const blankLineInfos = getBlankLineInfos({
              lines, continueInfo: true
            });

            const deleteIndexs = [];
            let continueFlag = false;
            for (
              const info of blankLineInfos
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
              array._deleteIndex(lines, index);
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

            if (lines.length === 0) {
              throw new Error(`extension:control-blank-line`);
            }

            // select one line
            if (lines.length === 1) {
              if (lines[0].trim() === ``) {
                return ``;
              }
              return;
            }

            // select over two lines
            const blankLineInfos = getBlankLineInfos({
              lines, continueInfo: false
            });

            let blankFlag = false;
            for (
              const info of blankLineInfos
              .reverse()
            ) {
              if (info.blank) {
                if (blankFlag === false) {
                  array._deleteIndex(lines, info.index);
                }
                blankFlag = true;
              } else {
                blankFlag = false;
              }
            };

            return lines.join(`\n`) + (isLastLf ? `\n` : ``);
          });
        }; break;

        case `IncreaseBlankLinesOne`: {
          editorSelectionsLoop(edit, (range, text) => {

            // no select
            if (text === ``) { return; }

            const isLastLf = _isLast(text, `\n`);
            const lines = _excludeLast(text, `\n`).split(`\n`);

            if (lines.length === 0) {
              throw new Error(`extension:control-blank-line`);
            }

            // select one line
            if (lines.length === 1) {
              if (lines[0].trim() === ``) {
                array._add(
                  lines,
                  [lines[0]],
                  0,
                );

                return lines.join(`\n`) + (isLastLf ? `\n` : ``);
              }
              return;
            }

            // select over two lines
            const blankLineInfos = getBlankLineInfos({
              lines, continueInfo: false
            });

            let blankFlag = false;
            for (
              const info of blankLineInfos
              .reverse()
            ) {
              if (info.blank) {
                if (blankFlag === false) {
                  array._add(
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
        }; break;

        default: {
          throw new Error(`extension:control-blank-line`);
        };

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
