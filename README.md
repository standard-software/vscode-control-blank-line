# Control Blank Line

[![](https://vsmarketplacebadges.dev/version-short/SatoshiYamamoto.vscode-control-blank-line.png)](https://marketplace.visualstudio.com/items?itemName=SatoshiYamamoto.vscode-control-blank-line)
[![](https://vsmarketplacebadges.dev/installs-short/SatoshiYamamoto.vscode-control-blank-line.png)](https://marketplace.visualstudio.com/items?itemName=SatoshiYamamoto.vscode-control-blank-line)
[![](https://vsmarketplacebadges.dev/rating-short/SatoshiYamamoto.vscode-control-blank-line.png)](https://marketplace.visualstudio.com/items?itemName=SatoshiYamamoto.vscode-control-blank-line)
[![](https://img.shields.io/github/license/standard-software/vscode-date-time-calendar.png)](https://github.com/standard-software/vscode-date-time-calendar/blob/main/LICENSE)

Control Blank Line extension has the ability to remove, increase, decrease, and combine blank lines into one line.

## Usage

Following commands are available:

```
- Control Blank Line : Delete : Decrease One Line
- Control Blank Line : Delete : Combine One Line
- Control Blank Line : Delete : All
- Control Blank Line : Delete : Auto
- Control Blank Line : Add : Increase One Line
```

## Detail, Execution example

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

## Control Blank Line : Delete : Combine One Line

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

## Control Blank Line : Delete : All

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

### Control Blank Line : Delete : Auto

- If there are consecutive blank lines, reduce one blank line from the block
- If there is only a single blank line, delete the blank lines.

If this function is performed consecutively, it is as if [Delete : Decrease One Line], [Delete : Combine One Line], and [Delete : All] were all performed.


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

