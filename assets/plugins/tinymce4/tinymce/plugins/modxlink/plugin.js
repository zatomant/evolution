/**
 * modxlink.js
 *
 * Based on link.js but with resource search added.
 *
 * By default both pagetitle and alias are searched.
 *
 * Author: markwillis82
 * Date: 7/7/15
 * update 64j 8/11/17
 */

// Handles selection from Modx-Ressource-Tree
if (typeof parent.modx !== 'undefined' && typeof parent.modx.tree !== 'undefined') {
  var modxOldRessourceId = parent.modx.tree.itemToChange;
  var modxLinkTitle = '';
  var checkModxTreeUpdateInterval = undefined;
  var checkModxTreeUpdate = function() {

    checkModxTreeUpdateInterval = setTimeout(checkModxTreeUpdate, 100);

    if (parent.modx.tree.itemToChange != modxOldRessourceId) {
      modxOldRessourceId = parent.modx.tree.itemToChange;
      modxLinkTitle = parent.modx.tree.selectedObjectName;

      document.getElementById('link-href-inp').value = '[~' + modxOldRessourceId + '~]';
      if (!document.getElementById('text-to-display').value) {
        document.getElementById('text-to-display').value = modxLinkTitle;
      }
    }
  };
}

/*global tinymce:true */
var autoComplt = (function() {
  /*	Properties:
   [ Private ]
   <OBJ> _CONST = the constants collection
   <OBJ> _ui = the obj to build UI
   <CLS> _AutoCompltList = the class dealing with the autocomplete operations
   [ Public ]
   > Refer to the Public APIs above
   Methods:
   [ Private ]
   > _getIEVersion : Get the IE version
   > _getAppropriateMode : Get the mode appropriate for the current user scenario
   > _getWindowSize : Get the client window width and height
   > _normalizeEvt : Normalize the event obj
   > _addEvt : Add an event to one elem, used for cross-browser mitigation
   > _rmEvent : remove an event to one elem, used for cross-browser mitigation
   > _getComputedStyle : Get the computed style value, used for cross-browser mitigation
   [ Public ]
   > enable : Refer to the Public APIs above

   */
  'use strict';

  var _DBG = 0; // A little debug flag

  if (!Array.prototype.indexOf) {
    Array.prototype.indexOf = function(searchElement, fromIndex) {
      if (this === undefined || this === null) {throw new TypeError('"this" is null or not defined');}
      var length = this.length >>> 0;
      fromIndex = +fromIndex || 0;
      if (Math.abs(fromIndex) === Infinity) {fromIndex = 0;}
      if (fromIndex < 0) {
        fromIndex += length;
        if (fromIndex < 0) {fromIndex = 0;}
      }
      for (; fromIndex < length; fromIndex++) {if (this[fromIndex] === searchElement) {return fromIndex;}}
      return -1;
    };
  }

  var
      /*	Return:
       @ Is IE: <NUM> the version of IE
       @ Not IE: NaN
       */
      _getIEVersion = function() {
        var rv = -1; // Return value assumes failure.
        if (navigator.appName == 'Microsoft Internet Explorer') {
          var ua = navigator.userAgent;
          var re = new RegExp('MSIE ([0-9]{1,}[\.0-9]{0,})');
          if (re.exec(ua) != null) {
            rv = +(RegExp.$1);
          }
        }
        return (rv === -1) ? NaN : rv;
      },
      /*	Return:
       > _CONST.modePC or _CONST.modeMobile
       */
      _getAppropriateMode = function() {

        // Judge by the userAgent string
        var ua = window.navigator.userAgent.toLowerCase();
        if (ua.search(/mobile|windows phone/) >= 0) return _CONST.modeMobile;

        // Bye the legacy IEs
        if (_getIEVersion() <= 9) return _CONST.modePC;

        // Judge by the window width
        return (_getWindowSize().windowWidth > _CONST.modeMobileW) ? _CONST.modePC : _CONST.modeMobile;
      },
      /*	Return: {
       windowWidth : the width of the client window in px. If unable to find, then -1.
       windowHeight : the height of the client window in px. If unable to find, then -1.
       }
       */
      _getWindowSize = function() {

        if (window.innerWidth) {

          return {
            windowWidth: window.innerWidth,
            windowHeight: window.innerHeight
          };

        } else if (document.documentElement.offsetHeight) {

          return {
            windowWidth: document.documentElement.offsetWidth,
            windowHeight: document.documentElement.offsetHeight
          };

        } else if (document.body.offsetHeight) {

          return {
            windowWidth: document.body.offsetWidth,
            windowHeight: document.body.offsetHeight
          };

        } else if (document.documentElement.clientHeight) {

          return {
            windowWidth: document.documentElement.clientWidth,
            windowHeight: document.documentElement.clientHeight
          };

        } else if (document.body.clientHeight) {

          return {
            windowWidth: document.body.clientWidth,
            windowHeight: document.body.clientHeight
          };
        }

        return {
          windowWidth: -1,
          windowHeight: -1
        };
      },
      _CONST = (function(c) {

        _CONST = c;

        c.modePC = 'modePC'; // Represent the PC mode

        c.modeMobile = 'modeMobile'; // Represent the mobile mode

        c.modeMobileW = 768; // in px. The width used to seperate the PC & mobile mode

        c.autoCompltListClass = 'autoComplt-list';

        c.autoCompltHintClass = 'autoComplt-hint';

        c.autoCompltHintSelectedClass = 'autoComplt-hint-selected';

        c.maxHintNum = (_getAppropriateMode() === _CONST.modePC) ? 10 : 5; // For limited mobile screen, not too many

        c.autoCompltDelay = 250; // in ms

        c.hiddenArg_close_list_n_make_final_selection = 'hiddenArg_close_list_n_make_final_selection';

        c.listStatus = {
          attr: 'data-listStatus',
          open: 'open'
        };

        c.keyCode = {
          up: 38,
          down: 40,
          esc: 27,
          enter: 13
        };

        c.defaultStyles = {

          autoCompltList: {
            maxHeight: 'none',
            border: '1px solid #aaa',
            padding: '0',
            margin: '0',
            zIndex: 99999,
            overflowX: 'hidden',
            overflowY: 'auto',
            display: 'none',
            position: 'absolute',
            backgroundColor: '#fff'
          },

          autoCompltHint: {
            height: '1.5em',
            padding: (_getAppropriateMode() === _CONST.modePC) ? '2px 6px 2px 10px' : '6px 6px 6px 10px', // For good touch ux, enlarge for the mobile mode
            margin: '6px 0',
            overflow: 'hidden',
            listStyleType: 'none',
            color: '#000',
            backgroundColor: '#fff',
            cursor: 'default',
            fontSize: '1em'
          },

          autoCompltHintSelected: {
            color: '#fff',
            backgroundColor: '#3399ff'
          }
        };

        c.adjStyleAttrs = {
          autoCompltList: ['border', 'maxHeight', 'backgroundColor'],
          autoCompltHint: ['height', 'padding', 'margin', 'color', 'backgroundColor', 'fontSize'],
          autoCompltHintSelected: ['color', 'backgroundColor']
        };

        // names of listeners supported
        c.listenersSupported = [
          'select' // Called when the user's final hint selection is decided
        ];

        return _CONST;
      })({}),
      /*	Arg:
       <OBJ> e = the event obj
       Return:
       <OBJ> the normalized event obj
       */
      _normalizeEvt = function(e) {

        if (!e) e = window.event;

        if (!e.target) e.target = e.srcElement;

        e.stopBubble = function() {
          this.cancelBubble = true;
          if (this.stopPropagation) { this.stopPropagation(); }
        };

        e.stopDefault = function() {
          if (this.preventDefault) { this.preventDefault(); }
          this.returnValue = false;
          return false;
        };
        return e;
      },
      /*	Arg:
       <ELM> elem = the DOM elem
       <STR> evt = the event name
       <FN> eHandle = the event handle
       */
      _addEvt = function(elem, evt, eHandle) {
        if (elem.addEventListener) {
          elem.addEventListener(evt, eHandle);
        } else if (elem.attachEvent) { // The IE 8 case
          elem.attachEvent('on' + evt, eHandle);
        }
      },
      /*	Arg: Refer to _addEvt
       */
      _rmEvent = function(elem, evt, eHandle) {
        if (elem.removeEventListener) {
          elem.removeEventListener(evt, eHandle);
        } else if (elem.detachEvent) { // The IE 8 case
          elem.detachEvent('on' + evt, eHandle);
        }
      },
      /*	Arg:
       <ELM> elem = the DOM elem
       <STR> name = the style name
       */
      _getComputedStyle = function(elem, name) {
        var v = null;

        if (window.getComputedStyle) {

          v = window.getComputedStyle(elem)[name] || null;

        } else if (elem.currentStyle) { // Hack for IE...Reference from the jQuery

          v = elem.currentStyle && elem.currentStyle[name];

          var left,
              rsLeft,
              style = elem.style;

          // Avoid setting v to empty string here
          // so we don't default to auto
          if (v == null && style && style[name]) {
            v = style[name];
          }

          // From the awesome hack by Dean Edwards
          // http://erik.eae.net/archives/2007/07/27/18.54.15/#comment-102291

          // If we're not dealing with a regular pixel number
          // but a number that has a weird ending, we need to convert it to pixels
          // but not position css attributes, as those are proportional to the parent element instead
          // and we can't measure the parent instead because it might trigger a "stacking dolls" problem

          // Remember the original values
          left = style.left;
          rsLeft = elem.runtimeStyle && elem.runtimeStyle.left;

          // Put in the new values to get a computed value out
          if (rsLeft) {
            elem.runtimeStyle.left = elem.currentStyle.left;
          }
          style.left = name === 'fontSize' ? '1em' : v;
          v = style.pixelLeft + 'px';

          // Revert the changed values
          style.left = left;
          if (rsLeft) {
            elem.runtimeStyle.left = rsLeft;
          }

        }

        return v;
      },
      /*	Methods:
       [ Public ]
       > buildElem : Build on elem from the HTML text
       > buildHint : Build one autocomplete hint elem
       > buildList : Build one autocomplete list
       */
      _ui = {
        /*	Arg:
         <STR> html = the HTMl text
         Return:
         <ELM> the elem built from the input HTML
         */
        buildElem: function(html) {
          var div = document.createElement('DIV');
          div.innerHTML = html;
          return div.firstChild.cloneNode(true);
        },
        /*	Arg:
         <STR> hint = the hint text
         <OBJ> styles = the obk holding the styles to set. Refer to _CONST.defaultStyles.autoCompltHint for the required styles
         Return:
         @ OK: <ELM> the hint ui elem
         @ NG: null
         */
        buildHint: function(hint, styles) {
          if (typeof hint == 'string' && hint) {
            hint = this.buildElem('<li class="' + _CONST.autoCompltHintClass + '">' + hint + '</li>');

            hint.style.height = hint.style.lineHeight = styles.autoCompltHint.height; // line-height shall always be equal to the height
            hint.style.padding = styles.autoCompltHint.padding;
            hint.style.margin = styles.autoCompltHint.margin;
            hint.style.overflow = styles.autoCompltHint.overflow;
            hint.style.listStyleType = styles.autoCompltHint.listStyleType;
            hint.style.color = styles.autoCompltHint.color;
            hint.style.backgroundColor = styles.autoCompltHint.backgroundColor;
            hint.style.cursor = styles.autoCompltHint.cursor;
            hint.style.fontSize = styles.autoCompltHint.fontSize;

            return hint;
          }
          return null;
        },
        /*	Arg:
         <OBJ> styles = the obk holding the styles to set. Refer to _CONST.defaultStyles.autoCompltList for the required styles
         Return:
         @ OK: <ELM> the list ui elem
         @ NG: null
         */
        buildList: function(styles) {
          var list = this.buildElem('<ul class="' + _CONST.autoCompltListClass + '"></ul>');

          list.style.maxHeight = styles.autoCompltList.maxHeight;
          list.style.border = styles.autoCompltList.border;
          list.style.padding = styles.autoCompltList.padding;
          list.style.margin = styles.autoCompltList.margin;
          list.style.zIndex = styles.autoCompltList.zIndex;
          list.style.overflowX = styles.autoCompltList.overflowX;
          list.style.overflowY = styles.autoCompltList.overflowY;
          list.style.display = styles.autoCompltList.display;
          list.style.position = styles.autoCompltList.position;
          list.style.backgroundColor = styles.autoCompltList.backgroundColor;

          return list;
        }
      },
      /*	Properties:
       [ Public ]
       <ELM> uiElem = the autocomplete list current being displayed and associated with.
       <ELM> assocInput = the input elem associated with
       <BOO> mouseOnList = A little flag marking the moused is on the top of the autocomplete list
       <NUM> maxHintNum = The max number of hints displayed
       <OBJ> styles = the obj holding the style setting of the list and hints. Refer to _CONST.defaultStyles for the required styles.
       <FN> onMouseSelectionListener = Called when user explicitly selects one hint by mouse clicking. No args passed.
       Methods:
       [ Public ]
       > genList : Build and setup one autocomplete list
       > isHint : Check if it is a autocomplete hint elem or not
       > putHints : Put hints into the autocomplete list
       > clearHints : Clear all hints
       > isOpen : Tell if the auotcomplete list is open or not
       > open : Open the autocomplete list. NOTICE: before opening, there must at one hint in the list so please call this.putHints first then open.
       > close : Close the autocomplete list
       > autoScroll : Auto scroll the list according the position and offset of the current selected hint so the current selected hint could show up
       > pick : Pick up one hint. NOTICE: this action is to pick up one hint but not to select that hint so it will not change this.assocInput's value. Please use this.getPicked to get the picked hint and extract the hint text and assign this.assocInput's value the hint text
       > unpick : Unpick all hints
       > getPicked : Get the hint elem picked
       */
      _AutoCompltList = function(assocInput) {

        this.uiElem = null;
        this.assocInput = assocInput;
        this.mouseOnList = false;
        this.onMouseSelectionListener = null;
        this.maxHintNum = _CONST.maxHintNum;
        this.styles = JSON.parse(JSON.stringify(_CONST.defaultStyles)); // Copy the default first

      };
  {
    /*
     */
    _AutoCompltList.prototype.genList = function() {
      if (!this.uiElem) {

        var that = this;

        this.uiElem = _ui.buildList(this.styles);

        // Make hint selected onmouseover
        _addEvt(this.uiElem, 'mouseover', function(e) {
          e = _normalizeEvt(e);
          if (that.isHint(e.target)) {
            that.pick(e.target);
            that.autoScroll();
          }
        });

        // Make hint not selected onmouseout
        _addEvt(this.uiElem, 'mouseout', function(e) {
          that.unpick();
        });

        // Prepare for the hint selection by clicking
        _addEvt(this.uiElem, 'mousedown', function(e) {
          that.mouseOnList = true;
          // One hack for FF.
          // Even call focus methos on the input's onblur event, however, still the input losese its focus.
          // As a result we have to set a timeout here
          setTimeout(function() {
            that.assocInput.focus();
          }, 50);
        });

        // pick hint by clicking
        _addEvt(this.uiElem, 'mouseup', function(e) {

          e = _normalizeEvt(e);

          if (that.isHint(e.target)) {

            that.pick(e.target);

            if (typeof that.onMouseSelectionListener == 'function') that.onMouseSelectionListener();
          }
        });

        document.body.appendChild(this.uiElem);
      }
    };
    /*	Arg:
     <ELM> el = the elem to check
     Return:
     @ Ok: true
     @ NG: false
     */
    _AutoCompltList.prototype.isHint = function(el) {
      if (el && typeof el == 'object' && el.nodeType === 1) {
        var cls = ' ' + el.className + ' ';
        return (cls.indexOf(' ' + _CONST.autoCompltHintClass + ' ') >= 0);
      }
      return false;
    };
    /*	Arg:
     <ARR> hints = the array of hint texts
     Return:
     <NUM> the number of hints put
     */
    _AutoCompltList.prototype.putHints = function(hints) {
      var count = 0;
      if (hints instanceof Array) {
        var i,
            j,
            hs = [];

        j = Math.min(hints.length, this.maxHintNum);
        for (i = 0; i < j; i++) {
          hs.push(_ui.buildHint(hints[i], this.styles));
          if (!hs[hs.length - 1]) {
            hs.pop();
          }
        }

        if (hs.length > 0) {
          var buf = document.createDocumentFragment();
          for (i = 0, count = hs.length; i < count; i++) {
            buf.appendChild(hs[i]);
          }
          this.clearHints();

          this.genList(); // Geneate the list in case there is none
          this.uiElem.appendChild(buf);
        }
      }
      return count;
    };
    /*
     */
    _AutoCompltList.prototype.clearHints = function() {
      if (this.uiElem) {
        this.uiElem.innerHTML = '';
      }
    };
    /*
     Return:
     @ Ok: true
     @ NG: false
     */
    _AutoCompltList.prototype.isOpen = function() {
      if (this.uiElem) {
        return (this.uiElem.getAttribute(_CONST.listStatus.attr) == _CONST.listStatus.open);
      }
      return false;
    };
    /*
     */
    _AutoCompltList.prototype.open = function() {
      var hints;

      if (this.uiElem
          && (hints = this.uiElem.querySelectorAll('.' + _CONST.autoCompltHintClass))
          && hints.length // At lease one hint exists, we would open...
      ) {
        var i,
            buf;

        // Position the list
        buf = this.assocInput.getBoundingClientRect();
        this.uiElem.style.top = (document.documentElement && document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop)
            + buf.bottom + 'px';
        this.uiElem.style.left = buf.left + 'px';

        // Calculate the list's width
        buf = buf.right - buf.left - parseFloat(_getComputedStyle(this.uiElem, 'borderLeftWidth')) - parseFloat(_getComputedStyle(this.uiElem, 'borderRightWidth'));
        this.uiElem.style.width = buf + 'px';

        // Calculate the list's height
        for (i = 0, buf = 0; i < hints.length; i++) {
          buf += parseFloat(_getComputedStyle(hints[i], 'height'))
              + parseFloat(_getComputedStyle(hints[i], 'paddingTop'))
              + parseFloat(_getComputedStyle(hints[i], 'paddingBottom'));

          if (hints[i + 1]) { // Compute the margin between the hints
            buf += Math.max(
                parseFloat(_getComputedStyle(hints[i], 'marginBottom')), parseFloat(_getComputedStyle(hints[i + 1], 'marginTop'))
            );
          }
        }
        buf += parseFloat(_getComputedStyle(hints[0], 'marginTop'))
            + parseFloat(_getComputedStyle(hints[hints.length - 1], 'marginBottom'));
        this.uiElem.style.height = (buf + 1) + 'px'; // Plus one for a little buffer

        // Open
        this.uiElem.setAttribute(_CONST.listStatus.attr, _CONST.listStatus.open);
        this.uiElem.style.display = 'block';

      }
    };
    /*
     */
    _AutoCompltList.prototype.close = function() {
      if (this.uiElem) {
        this.mouseOnList = false;
        this.uiElem.parentNode.removeChild(this.uiElem);
        this.uiElem = null;
      }
    };
    /*
     */
    _AutoCompltList.prototype.autoScroll = function() {
      var hint = this.getPicked();
      if (hint) {
        var currHint,
            offset = 0,
            minDisplayH = 0,
            hintH = hint.clientHeight,
            hintMT = parseFloat(_getComputedStyle(hint, 'marginTop')),
            hintMB = parseFloat(_getComputedStyle(hint, 'marginBottom'));

        currHint = hint.previousSibling;

        minDisplayH = hintH + (currHint ? Math.max(hintMT, hintMB) : hintMT); // The min height to display one hint

        while (currHint) {

          offset += hintH; // Add the current hint' hintH

          currHint = currHint.previousSibling;
          if (currHint) {
            // There is one hint before the current hint so calculate based on the collapsed model
            offset += Math.max(hintMT, hintMB);
          } else {
            // No more previous hint, this is the 1st hint so just take the marign top
            offset += hintMT;
          }
        }

        if (this.uiElem.clientHeight + this.uiElem.scrollTop - offset < minDisplayH
            || offset - this.uiElem.scrollTop < minDisplayH
        ) {
          // Ther is no enough room displaying the current selected hint so adjust the scroll
          this.uiElem.scrollTop = offset;
        }
      }
    };
    /*	Arg:
     <ELM|NUM> candidate = could be
     1) the hint elem or
     2) the index of the hint in the list. Passing in -1 would pick the last hint. Passing in 0 would pick the 1st hint.
     */
    _AutoCompltList.prototype.pick = function(candidate) {

      if (this.uiElem) {

        var hint = null;

        if (this.isHint(candidate)) {

          hint = candidate;

        } else if (typeof candidate == 'number' && (candidate >= 0 || candidate === -1)) {

          var hints = this.uiElem.querySelectorAll('.' + _CONST.autoCompltHintClass);

          if (hints.length > 0) {
            hint = +candidate;
            hint = (hint === -1 || hint > hints.length - 1) ? hints.length - 1 : hint;
            hint = hints[hint];
          }
        }

        if (hint !== null) {

          this.unpick();
          hint.className += ' ' + _CONST.autoCompltHintSelectedClass;
          hint.style.color = this.styles.autoCompltHintSelected.color;
          hint.style.backgroundColor = this.styles.autoCompltHintSelected.backgroundColor;
        }
      }
    };
    /*
     */
    _AutoCompltList.prototype.unpick = function() {
      if (this.uiElem) {
        var slct = this.getPicked();
        if (slct) {
          slct.className = _CONST.autoCompltHintClass;
          slct.style.color = this.styles.autoCompltHint.color;
          slct.style.backgroundColor = this.styles.autoCompltHint.backgroundColor;
        }
      }
    };
    /*	Return:
     @ OK: <ELM> the selected hint element
     @ NG: null
     */
    _AutoCompltList.prototype.getPicked = function() {
      return !this.uiElem ? null : this.uiElem.querySelector('.' + _CONST.autoCompltHintSelectedClass) || null;
    };
  }

  var
      publicProps = {

        enable: function(input, params) {
          if (input
              && typeof input == 'object'
              && typeof input.tagName == 'string'
              && input.tagName.toLowerCase() == 'input'
              && input.type == 'text'
              && input.nodeType === 1
              && !input.autoComplt
          ) {

            /*	Propertise:
             [ Private ]
             <NUM> input_autoComplt_delay = the ms delays the work of fetching the autocomplete hints based on the user's input
             <BOO> input_autoComplt_enabled = true to perform the autocomplete function; false not to perform.
             <STR> input_autoComplt_currentTarget = the current user's input for which the autocomplete is target
             <OBJ> input_autoComplt_listenerMap = the map of listeners
             <OBJ> input_autoComplt_list = the instance of _AutoCompltList
             Methods:
             [ Private ]
             > input_autoComplt_hintsFetcher : The function fetching the autocomplete hints
             > input_autoComplt_startFetcher : Setup and call input_autoComplt_hintsFetcher to fetch the hints
             > input_autoComplt_compltInput : Autocomplete the <input> according to the hint selection state
             > input_autoComplt_blurEvtHandle, input_autoComplt_keyEvtHandle : The event handle
             > input_autoComplt_inputEvtHandleMobile : The event handle for the mobile mode
             [ Public ]
             > setHintsFetcher, setListener, config, setStyles, close, enable, disable, destroy : Refe to the Public APIs above
             */
            input.autoComplt = {};

            var
                input_autoComplt_delay = _CONST.autoCompltDelay,
                input_autoComplt_enabled = true,
                input_autoComplt_currentTarget = '',
                input_autoComplt_hintsFetcher = null,
                input_autoComplt_listenerMap = null,
                input_autoComplt_list = new _AutoCompltList(input),
                /*
                 */
                input_autoComplt_startFetcher = function() {

                  if (input.value.length > 0
                      && input_autoComplt_enabled
                      && typeof input_autoComplt_hintsFetcher == 'function'
                      && input_autoComplt_currentTarget !== input.value // If equals, it means we've already been searching for the hints for the same value
                  ) {

                    var fetcherCaller = {

                      that: input,

                      // Record the autocomplete target for this fetching job
                      compltTarget: (input_autoComplt_currentTarget = input.value),

                      compltTargetMatchCurrentTarget: function() {
                        // If the user's input has changed during the fetching, this fetching job is useless.
                        // So only when the user's input doesn't change, we will return true to indicate proceeding further.
                        return (fetcherCaller.compltTarget === input_autoComplt_currentTarget);
                      },

                      call: function() {

                        if (fetcherCaller.compltTargetMatchCurrentTarget()) {

                          input_autoComplt_hintsFetcher.call(
                              fetcherCaller.that,
                              fetcherCaller.compltTarget,
                              fetcherCaller.openHint
                          );
                        }
                      },

                      openHint: function(hints) {
                        if (fetcherCaller.compltTargetMatchCurrentTarget()) {

                          if (input_autoComplt_list.putHints(hints)) {
                            input_autoComplt_list.open();
                          } else {
                            fetcherCaller.that.autoComplt.close();
                          }
                        }
                      }
                    };

                    setTimeout(fetcherCaller.call, input_autoComplt_delay);
                  }
                },
                /*
                 */
                input_autoComplt_compltInput = function() {

                  if (input_autoComplt_enabled) {

                    var hint = input_autoComplt_list.getPicked();

                    if (hint) {
                      input.value = hint.innerHTML;
                    } else {
                      // If no hint is selected, just use the original user input to autocomplete
                      input.value = input_autoComplt_currentTarget;
                    }
                  }
                },
                /*
                 */
                input_autoComplt_blurEvtHandle = function(e) {

                  if (input_autoComplt_list.mouseOnList) {
                    // If the mouse is on the autocomplete list, do not close the list
                    // and still need to focus on the input.
                    input.focus();
                    input_autoComplt_list.mouseOnList = false; // Assign false for the next detection
                  } else {

                    if (input_autoComplt_list.isOpen()) {
                      input.autoComplt.close(_CONST.hiddenArg_close_list_n_make_final_selection);
                    }
                  }
                },
                /*
                 */
                input_autoComplt_keyEvtHandle = function(e) {

                  if (_getAppropriateMode() === _CONST.modeMobile) return; // Let this::input_autoComplt_inputEvtHandleMobile handle

                  e = _normalizeEvt(e);

                  if (input_autoComplt_enabled) {
                    if (e.type == 'keydown'
                        && input_autoComplt_list.isOpen()
                        && (e.keyCode === _CONST.keyCode.up || e.keyCode === _CONST.keyCode.down)
                    ) {
                      // At the case that the hint list is open ans user is walking thru the hints.
                      // Let's try to autocomplete the input by the selected input.

                      var hint = input_autoComplt_list.getPicked();

                      if (e.keyCode === _CONST.keyCode.up) {

                        if (!hint) {
                          // If none is selected, then pick the last hint
                          input_autoComplt_list.pick(-1);
                        } else if (hint.previousSibling) {
                          // If some hint is selected and the previous hint exists, then pick the previous hint
                          input_autoComplt_list.pick(hint.previousSibling);
                        } else {
                          // If some hint is selected but the previous hint doesn't exists, then unpick all
                          input_autoComplt_list.unpick();
                        }

                      } else if (e.keyCode === _CONST.keyCode.down) {

                        if (!hint) {
                          // If none is selected, then pick the first hint
                          input_autoComplt_list.pick(0);
                        } else if (hint.nextSibling) {
                          // If some hint is selected and the next hint exists, then pick the next hint
                          input_autoComplt_list.pick(hint.nextSibling);
                        } else {
                          // If some hint is selected but the next hint doesn't exists, then unpick all
                          input_autoComplt_list.unpick();
                        }

                      }

                      input_autoComplt_list.autoScroll();

                      input_autoComplt_compltInput();

                    }
                    else if (e.type == 'keyup') {

                      var startFetching = false;

                      switch (e.keyCode) {
                        case _CONST.keyCode.up:
                        case _CONST.keyCode.down:
                          if (input_autoComplt_list.isOpen()) {
                            // We have handled this 2 key codes onkeydown, so must do nothing here
                          } else {
                            startFetching = true;
                          }
                          break;

                        case _CONST.keyCode.esc:
                          if (input_autoComplt_list.isOpen()) {
                            // When pressing the ESC key, let's resume back to the original user input
                            input.value = input_autoComplt_currentTarget;
                            input.autoComplt.close(_CONST.hiddenArg_close_list_n_make_final_selection);
                          }
                          break;

                        case _CONST.keyCode.enter:
                          if (input_autoComplt_list.isOpen()) {
                            // When pressing the enter key, let's try autocomplete
                            input_autoComplt_compltInput();
                            input.autoComplt.close(_CONST.hiddenArg_close_list_n_make_final_selection);
                          }
                          break;

                        default:
                          startFetching = true;
                          break;
                      }

                      if (startFetching) {
                        if (input.value.length > 0) {
                          input_autoComplt_startFetcher();
                        } else {
                          input.autoComplt.close();
                        }
                      }
                    }
                  }
                },
                /*
                 */
                input_autoComplt_inputEvtHandleMobile = function(e) {

                  if (_getAppropriateMode() === _CONST.modePC) return; // Let this::input_autoComplt_keyEvtHandle handle

                  if (input.value.length > 0) {
                    input_autoComplt_startFetcher();
                  } else {
                    input.autoComplt.close();
                  }
                },
                /*	Arg:
                 <STR> name = Refer to _CONST.listenersSupported
                 */
                input_autoComplt_invokeListener = function(name) {

                  if (input_autoComplt_listenerMap != null && typeof input_autoComplt_listenerMap[name] == 'function') {

                    input_autoComplt_listenerMap[name].call(input);
                  }
                };

            input.autoComplt.setHintsFetcher = function(hintsFetcher) {
              if (hintsFetcher === null || typeof hintsFetcher == 'function') {
                input_autoComplt_hintsFetcher = hintsFetcher;
                return true;
              }
              return false;
            };

            input.autoComplt.setListener = function(name, listener) {

              if ((listener === null || typeof listener == 'function') && _CONST.listenersSupported.indexOf(name) >= 0) {

                if (input_autoComplt_listenerMap == null) input_autoComplt_listenerMap = {};

                input_autoComplt_listenerMap[name] = listener;

                return true;
              }

              return false;
            };

            input.autoComplt.setStyles = function(targetClass, styles) {

              var tStyles,
                  adjStyleAttrs,
                  newStyles = false;

              // Let's find out which the target UI part is being set
              switch (targetClass) {
                case _CONST.autoCompltListClass:
                  tStyles = input_autoComplt_list.styles.autoCompltList;
                  adjStyleAttrs = _CONST.adjStyleAttrs.autoCompltList;
                  break;

                case _CONST.autoCompltHintClass:
                  tStyles = input_autoComplt_list.styles.autoCompltHint;
                  adjStyleAttrs = _CONST.adjStyleAttrs.autoCompltHint;
                  break;

                case _CONST.autoCompltHintSelectedClass:
                  tStyles = input_autoComplt_list.styles.autoCompltHintSelected;
                  adjStyleAttrs = _CONST.adjStyleAttrs.autoCompltHintSelected;
                  break;
              }

              if (styles instanceof Object && tStyles && adjStyleAttrs) {

                for (var i = 0; i < adjStyleAttrs.length; i++) {

                  if (typeof styles[adjStyleAttrs[i]] == 'string' || typeof styles[adjStyleAttrs[i]] == 'number') { // A simple type checking
                    if (!newStyles) {
                      newStyles = {};
                    }
                    newStyles[adjStyleAttrs[i]] = tStyles[adjStyleAttrs[i]] = styles[adjStyleAttrs[i]];
                  }

                }

              }

              return newStyles;
            };

            input.autoComplt.config = function(params) {

              var pms = false;

              if (params instanceof Object) {

                var buf;

                // Config the fetching delay timing
                //
                if (params.delay !== undefined && (buf = Math.floor(params.delay)) > 0) {

                  if (!pms) pms = {};

                  input_autoComplt_delay = pms.delay = buf;
                }

                // Config the max number of displayed hints
                //
                if (params.maxHintNum !== undefined && (buf = Math.floor(params.maxHintNum)) > 0) {

                  if (!pms) pms = {};

                  input_autoComplt_list.maxHintNum = pms.maxHintNum = buf;
                }
              }
              return pms;
            };

            input.autoComplt.close = function() {

              input_autoComplt_currentTarget = ''; // Closing means no need for autocomplete hint so no autocomplete target either

              input_autoComplt_list.close();

              if (input_autoComplt_enabled
                  && input.value !== ''
                  && arguments[0] === _CONST.hiddenArg_close_list_n_make_final_selection
              ) {

                input_autoComplt_invokeListener('select');
              }
            };

            input.autoComplt.enable = function() {
              input_autoComplt_enabled = true;
            };

            input.autoComplt.disable = function() {
              input_autoComplt_enabled = false;
              this.close();
            };

            input.autoComplt.destroy = function() {
              _rmEvent(input, 'blur', input_autoComplt_blurEvtHandle);
              _rmEvent(input, 'keyup', input_autoComplt_keyEvtHandle);
              _rmEvent(input, 'keydown', input_autoComplt_keyEvtHandle);
              this.disable();
              delete input.autoComplt;
            };

            input_autoComplt_list.onMouseSelectionListener = function() {

              input_autoComplt_compltInput();

              input.autoComplt.close(_CONST.hiddenArg_close_list_n_make_final_selection);
            };

            _addEvt(input, 'blur', input_autoComplt_blurEvtHandle);
            _addEvt(input, 'keyup', input_autoComplt_keyEvtHandle);
            _addEvt(input, 'keydown', input_autoComplt_keyEvtHandle);

            _addEvt(input, 'input', input_autoComplt_inputEvtHandleMobile);

            if (params instanceof Object) {
              input.autoComplt.config(params);
              input.autoComplt.setHintsFetcher(params.hintsFetcher);
            }

            return input;
          }
          return null;
        }

      };

  return publicProps;
}());

tinymce.PluginManager.add('modxlink', function(editor) {
  function createLinkList(callback)
  {
    return function() {
      var linkList = editor.settings.link_list;

      if (typeof linkList == 'string') {
        tinymce.util.XHR.send({
          url: linkList,
          success: function(text) {
            callback(tinymce.util.JSON.parse(text));
          }
        });
      } else if (typeof linkList == 'function') {
        linkList(callback);
      } else {
        callback(linkList);
      }
    };
  }

  function buildListItems(inputList, itemCallback, startItems)
  {
    function appendItems(values, output)
    {
      output = output || [];

      tinymce.each(values, function(item) {
        var menuItem = {text: item.text || item.title};

        if (item.menu) {
          menuItem.menu = appendItems(item.menu);
        } else {
          menuItem.value = item.value;

          if (itemCallback) {
            itemCallback(menuItem);
          }
        }

        output.push(menuItem);
      });

      return output;
    }

    return appendItems(inputList, startItems || []);
  }

  function showDialog(linkList)
  {

    if (parent.tree) {
      parent.tree.ca = 'disabled';    // Disable Modx-TreeAction, resetted on onOk or OnCancel
      checkModxTreeUpdate.call(this); // Watch Modx-Tree for changes and update URL-field
    }
    ;

    var data = {}, selection = editor.selection, dom = editor.dom, selectedElm, anchorElm, initialText;
    var win, onlyText, textListCtrl, linkListCtrl, relListCtrl, targetListCtrl, classListCtrl, linkTitleCtrl, value;

    function linkListChangeHandler(e)
    {
      var textCtrl = win.find('#text');

      if (!textCtrl.value() || (e.lastControl && textCtrl.value() == e.lastControl.text())) {
        textCtrl.value(e.control.text());
      }

      win.find('#href').value(e.control.value());
    }

    function buildAnchorListControl(url)
    {
      var anchorList = [];

      tinymce.each(editor.dom.select('a:not([href])'), function(anchor) {
        var id = anchor.name || anchor.id;

        if (id) {
          anchorList.push({
            text: id,
            value: '#' + id,
            selected: url.indexOf('#' + id) != -1
          });
        }
      });

      if (anchorList.length) {
        anchorList.unshift({text: 'None', value: ''});

        return {
          name: 'anchor',
          type: 'listbox',
          label: 'Anchors',
          values: anchorList,
          onselect: linkListChangeHandler
        };
      }
    }

    function updateText()
    {
      if (!initialText && data.text.length === 0 && onlyText) {
        this.parent().parent().find('#text')[0].value(this.value());
      }
    }

    function urlChange(e)
    {
      var meta = e.meta || {};

      if (linkListCtrl) {
        linkListCtrl.value(editor.convertURL(this.value(), 'href'));
      }

      tinymce.each(e.meta, function(value, key) {
        win.find('#' + key).value(value);
      });

      if (!meta.text) {
        updateText.call(this);
      }
    }

    function isOnlyTextSelected(anchorElm)
    {
      var html = selection.getContent();

      // Partial html and not a fully selected anchor element
      if (/</.test(html) && (!/^<a [^>]+>[^<]+<\/a>$/.test(html) || html.indexOf('href=') == -1)) {
        return false;
      }

      if (anchorElm) {
        var nodes = anchorElm.childNodes, i;

        if (nodes.length === 0) {
          return false;
        }

        for (i = nodes.length - 1; i >= 0; i--) {
          if (nodes[i].nodeType != 3) {
            return false;
          }
        }
      }

      return true;
    }

    selectedElm = selection.getNode();
    anchorElm = dom.getParent(selectedElm, 'a[href]');
    onlyText = isOnlyTextSelected();

    data.text = initialText = anchorElm ? (anchorElm.innerText || anchorElm.textContent) : selection.getContent({format: 'text'});
    data.href = anchorElm ? dom.getAttrib(anchorElm, 'href') : '';

    if (anchorElm) {
      data.target = dom.getAttrib(anchorElm, 'target');
    } else if (editor.settings.default_link_target) {
      data.target = editor.settings.default_link_target;
    }

    if ((value = dom.getAttrib(anchorElm, 'rel'))) {
      data.rel = value;
    }

    if ((value = dom.getAttrib(anchorElm, 'class'))) {
      data['class'] = value;
    }

    if ((value = dom.getAttrib(anchorElm, 'title'))) {
      data.title = value;
    }

    if (onlyText) {
      textListCtrl = {
        name: 'text',
        type: 'textbox',
        size: 40,
        label: 'Text to display',
        id: 'text-to-display',
        onchange: function() {
          data.text = this.value();
        }
      };
    }

    if (linkList) {
      linkListCtrl = {
        type: 'listbox',
        label: 'Link list',
        values: buildListItems(
            linkList,
            function(item) {
              item.value = editor.convertURL(item.value || item.url, 'href');
            },
            [{text: 'None', value: ''}]
        ),
        onselect: linkListChangeHandler,
        value: editor.convertURL(data.href, 'href'),
        onPostRender: function() {
          linkListCtrl = this;
        }
      };
    }

    if (editor.settings.target_list !== false) {
      if (!editor.settings.target_list) {
        editor.settings.target_list = [
          {text: 'None', value: ''},
          {text: 'New window', value: '_blank'}
        ];
      }

      targetListCtrl = {
        name: 'target',
        type: 'listbox',
        label: 'Target',
        values: buildListItems(editor.settings.target_list)
      };
    }

    if (editor.settings.rel_list) {
      relListCtrl = {
        name: 'rel',
        type: 'listbox',
        label: 'Rel',
        values: buildListItems(editor.settings.rel_list)
      };
    }

    if (editor.settings.link_class_list) {
      classListCtrl = {
        name: 'class',
        type: 'listbox',
        label: 'Class',
        values: buildListItems(
            editor.settings.link_class_list,
            function(item) {
              if (item.value) {
                item.textStyle = function() {
                  return editor.formatter.getCssText({inline: 'a', classes: [item.value]});
                };
              }
            }
        )
      };
    }

    if (editor.settings.link_title !== false) {
      linkTitleCtrl = {
        name: 'title',
        type: 'textbox',
        label: 'Title',
        value: data.title
      };
    }

    win = editor.windowManager.open({
      title: 'Insert link',
      data: data,
      body: [
        {
          name: 'href',
          type: 'FileImagePicker',
          filetype: 'file',
          size: 40,
          autofocus: true,
          label: 'Url',
          id: 'link-href',
          onchange: urlChange,
          onkeyup: updateText
        },
        {
          name: 'search',
          type: 'textbox',
          label: 'Search in EVO',
          id: 'link-search'
        },
        textListCtrl,
        linkTitleCtrl,
        buildAnchorListControl(data.href),
        linkListCtrl,
        relListCtrl,
        targetListCtrl,
        classListCtrl
      ],
      onSubmit: function(e) {
        /*eslint dot-notation: 0*/
        var href;

        data = tinymce.extend(data, e.data);
        href = data.href;

        // Delay confirm since onSubmit will move focus
        function delayedConfirm(message, callback)
        {
          var rng = editor.selection.getRng();

          window.setTimeout(function() {
            editor.windowManager.confirm(message, function(state) {
              editor.selection.setRng(rng);
              callback(state);
            });
          }, 0);
        }

        function insertLink()
        {

          // Reset Modx-TreeAction
          if (parent.tree) {
            parent.tree.ca = '';
            clearTimeout(checkModxTreeUpdateInterval);
          }
          ;

          var linkAttrs = {
            href: href,
            target: data.target ? data.target : null,
            rel: data.rel ? data.rel : null,
            'class': data['class'] ? data['class'] : null,
            title: data.title ? data.title : null
          };

          if (anchorElm) {
            editor.focus();

            if (onlyText && data.text != initialText) {
              if ('innerText' in anchorElm) {
                anchorElm.innerText = data.text;
              } else {
                anchorElm.textContent = data.text;
              }
            }

            dom.setAttribs(anchorElm, linkAttrs);

            selection.select(anchorElm);
            editor.undoManager.add();
          } else {
            if (onlyText) {
              editor.insertContent(dom.createHTML('a', linkAttrs, dom.encode(data.text)));
            } else {
              editor.execCommand('mceInsertLink', false, linkAttrs);
            }
          }
        }

        if (!href) {
          editor.execCommand('unlink');
          return;
        }

        // Is email and not //user@domain.com
        if (href.indexOf('@') > 0 && href.indexOf('//') == -1 && href.indexOf('mailto:') == -1) {
          delayedConfirm(
              'The URL you entered seems to be an email address. Do you want to add the required mailto: prefix?',
              function(state) {
                if (state) {
                  href = 'mailto:' + href;
                }

                insertLink();
              }
          );

          return;
        }

        // Is not protocol prefixed
        if ((editor.settings.link_assume_external_targets && !/^\w+:/i.test(href)) ||
            (!editor.settings.link_assume_external_targets && /^\s*www\./i.test(href))) {
          delayedConfirm(
              'The URL you entered seems to be an external link. Do you want to add the required http:// prefix?',
              function(state) {
                if (state) {
                  href = 'http://' + href;
                }

                insertLink();
              }
          );

          return;
        }

        insertLink();
      },
      onClose: function(e) {
        // Reset Modx-TreeAction
        if (parent.tree) {
          parent.tree.ca = '';
          clearTimeout(checkModxTreeUpdateInterval);
        }
        ;
      }
    });

    var input = document.querySelector('#link-search'), _resultDataset = {};
    autoComplt.enable(input, {
      // the hintsFetcher is your customized function which searchs the proper autocomplete hints based on the user's input value.
      hintsFetcher: function(v, openList) {
        _resultDataset = {};
        var xhr = new XMLHttpRequest(), _link = encodeURI(tinymce4_baseUrl + 'tinymce/plugins/modxlink/search.php' + '?q=' + v);
        xhr.open('GET', _link);
        xhr.onload = function() {
          if (xhr.status === 200) {
            //alert(xhr.responseText);
            var _results = JSON.parse(xhr.responseText), _e = [];
            for (var i = 0; i < Object.keys(_results).length; i++) {
              _resultDataset[_results[i].pagetitle] = _results[i];
              _e.push(_results[i].pagetitle);
            }
            openList(_e);
          } else {
            console.error('ajax error', _link);
          }
        };
        xhr.send();
      }
    });
    input.autoComplt.setListener('select', function(e, r) {
      var _a = document.querySelector('#link-href input'), _title = document.querySelector('#text-to-display');
      _a.value = '[~' + _resultDataset[this.value].id + '~]';
      if (_title.value == '') _title.value = _resultDataset[this.value].title;
    });

  }

  editor.addButton('link', {
    icon: 'link',
    tooltip: 'Insert/edit link',
    shortcut: 'Meta+K',
    onclick: createLinkList(showDialog),
    stateSelector: 'a[href]'
  });

  editor.addButton('unlink', {
    icon: 'unlink',
    tooltip: 'Remove link',
    cmd: 'unlink',
    stateSelector: 'a[href]'
  });

  editor.addShortcut('Meta+K', '', createLinkList(showDialog));
  editor.addCommand('mceLink', createLinkList(showDialog));

  this.showDialog = showDialog;

  editor.addMenuItem('link', {
    icon: 'link',
    text: 'Insert/edit link',
    shortcut: 'Meta+K',
    onclick: createLinkList(showDialog),
    stateSelector: 'a[href]',
    context: 'insert',
    prependToContext: true
  });
  tinymce.ui.Factory.add('FileImagePicker',tinymce.ui.ComboBox.extend({
    init: function(settings) {
      var self = this, editor = tinymce.activeEditor, editorSettings = editor.settings;
      var actionCallback, fileBrowserCallback, fileBrowserCallbackTypes;
      settings.spellcheck = false;
      fileBrowserCallbackTypes = editorSettings.file_picker_types || editorSettings.file_browser_callback_types;
      if (fileBrowserCallbackTypes) {
        fileBrowserCallbackTypes = Tools.makeMap(fileBrowserCallbackTypes, /[, ]/);
      }

      if (!fileBrowserCallbackTypes || fileBrowserCallbackTypes[settings.filetype]) {
        fileBrowserCallback = editorSettings.file_picker_callback;
        if (fileBrowserCallback && (!fileBrowserCallbackTypes || fileBrowserCallbackTypes[settings.filetype])) {
          actionCallback = function() {
            var meta = self.fire('beforecall').meta;

            meta = Tools.extend({filetype: settings.filetype}, meta);

            // file_picker_callback(callback, currentValue, metaData)
            fileBrowserCallback.call(
              editor,
              function(value, meta) {
                self.value(value).fire('change', {meta: meta});
              },
              self.value(),
              meta
            );
          };
        } else {
          // Legacy callback: file_picker_callback(id, currentValue, filetype, window)
          fileBrowserCallback = editorSettings.file_browser_callback;
          if (fileBrowserCallback && (!fileBrowserCallbackTypes || fileBrowserCallbackTypes[settings.filetype])) {
            actionCallback = function() {
              fileBrowserCallback(
                self.getEl('inp').id,
                self.value(),
                self.settings.filetype,
                window
              );
            };
          }
        }
      }

      if (actionCallback) {
        settings.icon = 'browse';
        settings.onaction = actionCallback;
      }

      self._super(settings);
      self.off('click').on('click', function(e){
        var elm = e.target, root = self.getEl();
        if (!self.$.contains(root, elm) && elm != root) {
          return;
        }

        while (elm && elm != root) {
          if (elm.id && elm.id.indexOf('-action') != -1) {
              if (elm.id === self._id + '-image-action') {
                self.settings.filetype = 'image';
              } else {
                self.settings.filetype = 'file';
              }
              self.fire('action');
          }
          elm = elm.parentNode;
        }
      });
    },
    renderHtml: function() {
      var self = this, id = self._id, settings = self.settings, prefix = self.classPrefix;
      var value = self.state.get('value') || '';
      var icon, text, openBtnHtml = '', extraAttrs = '';
      if ("spellcheck" in settings) {
        extraAttrs += ' spellcheck="' + settings.spellcheck + '"';
      }

      if (settings.maxLength) {
        extraAttrs += ' maxlength="' + settings.maxLength + '"';
      }

      if (settings.size) {
        extraAttrs += ' size="' + settings.size + '"';
      }

      if (settings.subtype) {
        extraAttrs += ' type="' + settings.subtype + '"';
      }

      if (self.disabled()) {
        extraAttrs += ' disabled="disabled"';
      }

       openBtnHtml = (
          '<div id="' + id + '-open" class="' + prefix + 'btn ' + prefix + 'open" tabIndex="-1" role="button">' +
            '<button id="' + id + '-action" type="button" hidefocus="1" tabindex="-1">' +
              '<i class="mce-ico mce-i-browse"></i>' +
            '</button>' +
            '<button id="' + id + '-image-action" type="button" hidefocus="1" tabindex="-1">' +
              '<i class="mce-ico mce-i-image"></i>' +
            '</button>' +
          '</div>'
        );
        self.classes.add('has-open');

      return (
        '<div id="' + id + '" class="' + self.classes + '">' +
          '<input id="' + id + '-inp" class="' + prefix + 'textbox" value="' +
          self.encode(value, false) + '" hidefocus="1"' + extraAttrs + ' placeholder="' +
          self.encode(settings.placeholder) + '" />' +
          openBtnHtml +
        '</div>'
      );
    },
  }));
});
