# Control Blank Line

[![](https://vsmarketplacebadges.dev/version-short/SatoshiYamamoto.vscode-control-blank-line.png)](https://marketplace.visualstudio.com/items?itemName=SatoshiYamamoto.vscode-control-blank-line)
[![](https://vsmarketplacebadges.dev/installs-short/SatoshiYamamoto.vscode-control-blank-line.png)](https://marketplace.visualstudio.com/items?itemName=SatoshiYamamoto.vscode-control-blank-line)
[![](https://vsmarketplacebadges.dev/rating-short/SatoshiYamamoto.vscode-control-blank-line.png)](https://marketplace.visualstudio.com/items?itemName=SatoshiYamamoto.vscode-control-blank-line)
[![](https://img.shields.io/github/license/standard-software/vscode-date-time-calendar.png)](https://github.com/standard-software/vscode-date-time-calendar/blob/main/LICENSE)

Control Blank Line extension has the ability to remove, increase, decrease, and combine blank lines into one line.

## Commands

Following commands are available:

```
- Control Blank Line : Delete : Decrease One Line
- Control Blank Line : Delete : Combine One Line
- Control Blank Line : Delete : All
- Control Blank Line : Delete : Auto
- Control Blank Line : Add : Increase One Line
```

## Default Key binding

| Command                             | Default Key Windows     | Default Key Mac         |
|-                                    |-                        | -                       |
| Control Blank Line : Delete : Auto  | Alt + Ctrl + d          | Opt + Ctrl +  d         |

## Execution example

### Control Blank Line : Delete : Decrease One Line

```
---

  item 1
  

    item 1-1
      item 1-1-1
      item 1-1-2
    item 1-2

  
    
  item 2
    item 2-1
    item 2-2

---
```
↓
```
---
  item 1
  
    item 1-1
      item 1-1-1
      item 1-1-2
    item 1-2

  
  item 2
    item 2-1
    item 2-2
---
```

---

### Control Blank Line : Delete : Combine One Line

```
---

  item 1
  

    item 1-1
      item 1-1-1
      item 1-1-2
    item 1-2

  
    
  item 2
    item 2-1
    item 2-2

---
```
↓
```
---

  item 1
  
    item 1-1
      item 1-1-1
      item 1-1-2
    item 1-2

  item 2
    item 2-1
    item 2-2

---
```

---

### Control Blank Line : Delete : All

```
---

  item 1
  

    item 1-1
      item 1-1-1
      item 1-1-2
    item 1-2

  
    
  item 2
    item 2-1
    item 2-2

---
```
↓
```
---
  item 1
    item 1-1
      item 1-1-1
      item 1-1-2
    item 1-2
  item 2
    item 2-1
    item 2-2
---
```

---

### Control Blank Line : Delete : Auto

- If there are consecutive blank lines, reduce one blank line from the block
- If there is only a single blank line, delete the blank lines.

If executed consecutively, it is the same as if the following were executed in sequence.
- [Delete : Decrease One Line]
- [Delete : Combine One Line]
- [Delete : All]

This function seems to be the most useful, so I have set the default key bindings

---

### Control Blank Line : Add : Increase One Line

```
---

  item 1
  

    item 1-1
      item 1-1-1
      item 1-1-2
    item 1-2

  
    
  item 2
    item 2-1
    item 2-2

---
```
↓
```
---


  item 1
  


    item 1-1
      item 1-1-1
      item 1-1-2
    item 1-2

  
    
    
  item 2
    item 2-1
    item 2-2


---
```

## Install

https://marketplace.visualstudio.com/items?itemName=SatoshiYamamoto.vscode-control-blank-line

## License

Released under the [MIT License][license].

