/**
 * @license React
 * react-markup.react-server.development.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

/*


 JS Implementation of MurmurHash3 (r136) (as of May 20, 2011)

 Copyright (c) 2011 Gary Court
 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in
 all copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 SOFTWARE.
*/
"use strict";
"production" !== process.env.NODE_ENV &&
  (function () {
    function styleReplacer(match, prefix, s, suffix) {
      return "" + prefix + ("s" === s ? "\\73 " : "\\53 ") + suffix;
    }
    function scriptReplacer(match, prefix, s, suffix) {
      return "" + prefix + ("s" === s ? "\\u0073" : "\\u0053") + suffix;
    }
    function voidHandler() {}
    function _defineProperty(obj, key, value) {
      key in obj
        ? Object.defineProperty(obj, key, {
            value: value,
            enumerable: !0,
            configurable: !0,
            writable: !0
          })
        : (obj[key] = value);
      return obj;
    }
    function murmurhash3_32_gc(key, seed) {
      var remainder = key.length & 3;
      var bytes = key.length - remainder;
      var h1 = seed;
      for (seed = 0; seed < bytes; ) {
        var k1 =
          (key.charCodeAt(seed) & 255) |
          ((key.charCodeAt(++seed) & 255) << 8) |
          ((key.charCodeAt(++seed) & 255) << 16) |
          ((key.charCodeAt(++seed) & 255) << 24);
        ++seed;
        k1 =
          (3432918353 * (k1 & 65535) +
            (((3432918353 * (k1 >>> 16)) & 65535) << 16)) &
          4294967295;
        k1 = (k1 << 15) | (k1 >>> 17);
        k1 =
          (461845907 * (k1 & 65535) +
            (((461845907 * (k1 >>> 16)) & 65535) << 16)) &
          4294967295;
        h1 ^= k1;
        h1 = (h1 << 13) | (h1 >>> 19);
        h1 =
          (5 * (h1 & 65535) + (((5 * (h1 >>> 16)) & 65535) << 16)) & 4294967295;
        h1 = (h1 & 65535) + 27492 + ((((h1 >>> 16) + 58964) & 65535) << 16);
      }
      k1 = 0;
      switch (remainder) {
        case 3:
          k1 ^= (key.charCodeAt(seed + 2) & 255) << 16;
        case 2:
          k1 ^= (key.charCodeAt(seed + 1) & 255) << 8;
        case 1:
          (k1 ^= key.charCodeAt(seed) & 255),
            (k1 =
              (3432918353 * (k1 & 65535) +
                (((3432918353 * (k1 >>> 16)) & 65535) << 16)) &
              4294967295),
            (k1 = (k1 << 15) | (k1 >>> 17)),
            (h1 ^=
              (461845907 * (k1 & 65535) +
                (((461845907 * (k1 >>> 16)) & 65535) << 16)) &
              4294967295);
      }
      h1 ^= key.length;
      h1 ^= h1 >>> 16;
      h1 =
        (2246822507 * (h1 & 65535) +
          (((2246822507 * (h1 >>> 16)) & 65535) << 16)) &
        4294967295;
      h1 ^= h1 >>> 13;
      h1 =
        (3266489909 * (h1 & 65535) +
          (((3266489909 * (h1 >>> 16)) & 65535) << 16)) &
        4294967295;
      return (h1 ^ (h1 >>> 16)) >>> 0;
    }
    function prepareStackTrace(error, structuredStackTrace) {
      error = (error.name || "Error") + ": " + (error.message || "");
      for (var i = 0; i < structuredStackTrace.length; i++)
        error += "\n    at " + structuredStackTrace[i].toString();
      return error;
    }
    function isClientReference(reference) {
      return reference.$$typeof === CLIENT_REFERENCE_TAG$1;
    }
    function getIteratorFn(maybeIterable) {
      if (null === maybeIterable || "object" !== typeof maybeIterable)
        return null;
      maybeIterable =
        (MAYBE_ITERATOR_SYMBOL && maybeIterable[MAYBE_ITERATOR_SYMBOL]) ||
        maybeIterable["@@iterator"];
      return "function" === typeof maybeIterable ? maybeIterable : null;
    }
    function noop$4() {}
    function trackUsedThenable$1(thenableState, thenable, index) {
      index = thenableState[index];
      void 0 === index
        ? thenableState.push(thenable)
        : index !== thenable &&
          (thenable.then(noop$4, noop$4), (thenable = index));
      switch (thenable.status) {
        case "fulfilled":
          return thenable.value;
        case "rejected":
          throw thenable.reason;
        default:
          "string" === typeof thenable.status
            ? thenable.then(noop$4, noop$4)
            : ((thenableState = thenable),
              (thenableState.status = "pending"),
              thenableState.then(
                function (fulfilledValue) {
                  if ("pending" === thenable.status) {
                    var fulfilledThenable = thenable;
                    fulfilledThenable.status = "fulfilled";
                    fulfilledThenable.value = fulfilledValue;
                  }
                },
                function (error) {
                  if ("pending" === thenable.status) {
                    var rejectedThenable = thenable;
                    rejectedThenable.status = "rejected";
                    rejectedThenable.reason = error;
                  }
                }
              ));
          switch (thenable.status) {
            case "fulfilled":
              return thenable.value;
            case "rejected":
              throw thenable.reason;
          }
          suspendedThenable$1 = thenable;
          throw SuspenseException$1;
      }
    }
    function getSuspendedThenable$1() {
      if (null === suspendedThenable$1)
        throw Error(
          "Expected a suspended thenable. This is a bug in React. Please file an issue."
        );
      var thenable = suspendedThenable$1;
      suspendedThenable$1 = null;
      return thenable;
    }
    function prepareToUseHooksForComponent(
      prevThenableState,
      componentDebugInfo
    ) {
      thenableIndexCounter$1 = 0;
      thenableState$1 = prevThenableState;
      currentComponentDebugInfo = componentDebugInfo;
    }
    function getThenableStateAfterSuspending$1() {
      var state = thenableState$1 || [];
      state._componentDebugInfo = currentComponentDebugInfo;
      thenableState$1 = currentComponentDebugInfo = null;
      return state;
    }
    function unsupportedHook() {
      throw Error("This Hook is not supported in Server Components.");
    }
    function unsupportedRefresh$1() {
      throw Error(
        "Refreshing the cache is not supported in Server Components."
      );
    }
    function unsupportedContext() {
      throw Error("Cannot read a Client Context from a Server Component.");
    }
    function resolveOwner() {
      return currentOwner ? currentOwner : null;
    }
    function disabledLog() {}
    function disableLogs() {
      if (0 === disabledDepth) {
        prevLog = console.log;
        prevInfo = console.info;
        prevWarn = console.warn;
        prevError = console.error;
        prevGroup = console.group;
        prevGroupCollapsed = console.groupCollapsed;
        prevGroupEnd = console.groupEnd;
        var props = {
          configurable: !0,
          enumerable: !0,
          value: disabledLog,
          writable: !0
        };
        Object.defineProperties(console, {
          info: props,
          log: props,
          warn: props,
          error: props,
          group: props,
          groupCollapsed: props,
          groupEnd: props
        });
      }
      disabledDepth++;
    }
    function reenableLogs() {
      disabledDepth--;
      if (0 === disabledDepth) {
        var props = { configurable: !0, enumerable: !0, writable: !0 };
        Object.defineProperties(console, {
          log: assign({}, props, { value: prevLog }),
          info: assign({}, props, { value: prevInfo }),
          warn: assign({}, props, { value: prevWarn }),
          error: assign({}, props, { value: prevError }),
          group: assign({}, props, { value: prevGroup }),
          groupCollapsed: assign({}, props, { value: prevGroupCollapsed }),
          groupEnd: assign({}, props, { value: prevGroupEnd })
        });
      }
      0 > disabledDepth &&
        console.error(
          "disabledDepth fell below zero. This is a bug in React. Please file an issue."
        );
    }
    function describeBuiltInComponentFrame(name) {
      if (void 0 === prefix)
        try {
          throw Error();
        } catch (x) {
          var match = x.stack.trim().match(/\n( *(at )?)/);
          prefix = (match && match[1]) || "";
          suffix =
            -1 < x.stack.indexOf("\n    at")
              ? " (<anonymous>)"
              : -1 < x.stack.indexOf("@")
                ? "@unknown:0:0"
                : "";
        }
      return "\n" + prefix + name + suffix;
    }
    function describeNativeComponentFrame(fn, construct) {
      if (!fn || reentry) return "";
      var frame = componentFrameCache.get(fn);
      if (void 0 !== frame) return frame;
      reentry = !0;
      frame = Error.prepareStackTrace;
      Error.prepareStackTrace = prepareStackTrace;
      var previousDispatcher = null;
      previousDispatcher = ReactSharedInternals$1.H;
      ReactSharedInternals$1.H = null;
      disableLogs();
      try {
        var RunInRootFrame = {
          DetermineComponentFrameRoot: function () {
            try {
              if (construct) {
                var Fake = function () {
                  throw Error();
                };
                Object.defineProperty(Fake.prototype, "props", {
                  set: function () {
                    throw Error();
                  }
                });
                if ("object" === typeof Reflect && Reflect.construct) {
                  try {
                    Reflect.construct(Fake, []);
                  } catch (x) {
                    var control = x;
                  }
                  Reflect.construct(fn, [], Fake);
                } else {
                  try {
                    Fake.call();
                  } catch (x$0) {
                    control = x$0;
                  }
                  fn.call(Fake.prototype);
                }
              } else {
                try {
                  throw Error();
                } catch (x$1) {
                  control = x$1;
                }
                (Fake = fn()) &&
                  "function" === typeof Fake.catch &&
                  Fake.catch(function () {});
              }
            } catch (sample) {
              if (sample && control && "string" === typeof sample.stack)
                return [sample.stack, control.stack];
            }
            return [null, null];
          }
        };
        RunInRootFrame.DetermineComponentFrameRoot.displayName =
          "DetermineComponentFrameRoot";
        var namePropDescriptor = Object.getOwnPropertyDescriptor(
          RunInRootFrame.DetermineComponentFrameRoot,
          "name"
        );
        namePropDescriptor &&
          namePropDescriptor.configurable &&
          Object.defineProperty(
            RunInRootFrame.DetermineComponentFrameRoot,
            "name",
            { value: "DetermineComponentFrameRoot" }
          );
        var _RunInRootFrame$Deter =
            RunInRootFrame.DetermineComponentFrameRoot(),
          sampleStack = _RunInRootFrame$Deter[0],
          controlStack = _RunInRootFrame$Deter[1];
        if (sampleStack && controlStack) {
          var sampleLines = sampleStack.split("\n"),
            controlLines = controlStack.split("\n");
          for (
            _RunInRootFrame$Deter = namePropDescriptor = 0;
            namePropDescriptor < sampleLines.length &&
            !sampleLines[namePropDescriptor].includes(
              "DetermineComponentFrameRoot"
            );

          )
            namePropDescriptor++;
          for (
            ;
            _RunInRootFrame$Deter < controlLines.length &&
            !controlLines[_RunInRootFrame$Deter].includes(
              "DetermineComponentFrameRoot"
            );

          )
            _RunInRootFrame$Deter++;
          if (
            namePropDescriptor === sampleLines.length ||
            _RunInRootFrame$Deter === controlLines.length
          )
            for (
              namePropDescriptor = sampleLines.length - 1,
                _RunInRootFrame$Deter = controlLines.length - 1;
              1 <= namePropDescriptor &&
              0 <= _RunInRootFrame$Deter &&
              sampleLines[namePropDescriptor] !==
                controlLines[_RunInRootFrame$Deter];

            )
              _RunInRootFrame$Deter--;
          for (
            ;
            1 <= namePropDescriptor && 0 <= _RunInRootFrame$Deter;
            namePropDescriptor--, _RunInRootFrame$Deter--
          )
            if (
              sampleLines[namePropDescriptor] !==
              controlLines[_RunInRootFrame$Deter]
            ) {
              if (1 !== namePropDescriptor || 1 !== _RunInRootFrame$Deter) {
                do
                  if (
                    (namePropDescriptor--,
                    _RunInRootFrame$Deter--,
                    0 > _RunInRootFrame$Deter ||
                      sampleLines[namePropDescriptor] !==
                        controlLines[_RunInRootFrame$Deter])
                  ) {
                    var _frame =
                      "\n" +
                      sampleLines[namePropDescriptor].replace(
                        " at new ",
                        " at "
                      );
                    fn.displayName &&
                      _frame.includes("<anonymous>") &&
                      (_frame = _frame.replace("<anonymous>", fn.displayName));
                    "function" === typeof fn &&
                      componentFrameCache.set(fn, _frame);
                    return _frame;
                  }
                while (1 <= namePropDescriptor && 0 <= _RunInRootFrame$Deter);
              }
              break;
            }
        }
      } finally {
        (reentry = !1),
          (ReactSharedInternals$1.H = previousDispatcher),
          reenableLogs(),
          (Error.prepareStackTrace = frame);
      }
      sampleLines = (sampleLines = fn ? fn.displayName || fn.name : "")
        ? describeBuiltInComponentFrame(sampleLines)
        : "";
      "function" === typeof fn && componentFrameCache.set(fn, sampleLines);
      return sampleLines;
    }
    function formatOwnerStack(error) {
      var prevPrepareStackTrace = Error.prepareStackTrace;
      Error.prepareStackTrace = prepareStackTrace;
      error = error.stack;
      Error.prepareStackTrace = prevPrepareStackTrace;
      error.startsWith("Error: react-stack-top-frame\n") &&
        (error = error.slice(29));
      prevPrepareStackTrace = error.indexOf("\n");
      -1 !== prevPrepareStackTrace &&
        (error = error.slice(prevPrepareStackTrace + 1));
      prevPrepareStackTrace = error.indexOf("react-stack-bottom-frame");
      -1 !== prevPrepareStackTrace &&
        (prevPrepareStackTrace = error.lastIndexOf(
          "\n",
          prevPrepareStackTrace
        ));
      if (-1 !== prevPrepareStackTrace)
        error = error.slice(0, prevPrepareStackTrace);
      else return "";
      return error;
    }
    function getOwnerStackByComponentInfoInDev(componentInfo) {
      try {
        var info = "";
        if (!componentInfo.owner && "string" === typeof componentInfo.name)
          return describeBuiltInComponentFrame(componentInfo.name);
        for (; componentInfo; ) {
          var ownerStack = componentInfo.debugStack;
          if (null != ownerStack)
            (componentInfo = componentInfo.owner) &&
              (info += "\n" + formatOwnerStack(ownerStack));
          else break;
        }
        return info;
      } catch (x) {
        return "\nError generating stack: " + x.message + "\n" + x.stack;
      }
    }
    function isObjectPrototype(object) {
      if (!object) return !1;
      var ObjectPrototype = Object.prototype;
      if (object === ObjectPrototype) return !0;
      if (getPrototypeOf(object)) return !1;
      object = Object.getOwnPropertyNames(object);
      for (var i = 0; i < object.length; i++)
        if (!(object[i] in ObjectPrototype)) return !1;
      return !0;
    }
    function isSimpleObject(object) {
      if (!isObjectPrototype(getPrototypeOf(object))) return !1;
      for (
        var names = Object.getOwnPropertyNames(object), i = 0;
        i < names.length;
        i++
      ) {
        var descriptor = Object.getOwnPropertyDescriptor(object, names[i]);
        if (
          !descriptor ||
          (!descriptor.enumerable &&
            (("key" !== names[i] && "ref" !== names[i]) ||
              "function" !== typeof descriptor.get))
        )
          return !1;
      }
      return !0;
    }
    function objectName(object) {
      return Object.prototype.toString
        .call(object)
        .replace(/^\[object (.*)\]$/, function (m, p0) {
          return p0;
        });
    }
    function describeKeyForErrorMessage(key) {
      var encodedKey = JSON.stringify(key);
      return '"' + key + '"' === encodedKey ? key : encodedKey;
    }
    function describeValueForErrorMessage(value) {
      switch (typeof value) {
        case "string":
          return JSON.stringify(
            10 >= value.length ? value : value.slice(0, 10) + "..."
          );
        case "object":
          if (isArrayImpl(value)) return "[...]";
          if (null !== value && value.$$typeof === CLIENT_REFERENCE_TAG)
            return "client";
          value = objectName(value);
          return "Object" === value ? "{...}" : value;
        case "function":
          return value.$$typeof === CLIENT_REFERENCE_TAG
            ? "client"
            : (value = value.displayName || value.name)
              ? "function " + value
              : "function";
        default:
          return String(value);
      }
    }
    function describeElementType(type) {
      if ("string" === typeof type) return type;
      switch (type) {
        case REACT_SUSPENSE_TYPE:
          return "Suspense";
        case REACT_SUSPENSE_LIST_TYPE:
          return "SuspenseList";
      }
      if ("object" === typeof type)
        switch (type.$$typeof) {
          case REACT_FORWARD_REF_TYPE:
            return describeElementType(type.render);
          case REACT_MEMO_TYPE:
            return describeElementType(type.type);
          case REACT_LAZY_TYPE:
            var payload = type._payload;
            type = type._init;
            try {
              return describeElementType(type(payload));
            } catch (x) {}
        }
      return "";
    }
    function describeObjectForErrorMessage(objectOrArray, expandedName) {
      var objKind = objectName(objectOrArray);
      if ("Object" !== objKind && "Array" !== objKind) return objKind;
      var start = -1,
        length = 0;
      if (isArrayImpl(objectOrArray))
        if (jsxChildrenParents.has(objectOrArray)) {
          var type = jsxChildrenParents.get(objectOrArray);
          objKind = "<" + describeElementType(type) + ">";
          for (var i = 0; i < objectOrArray.length; i++) {
            var value = objectOrArray[i];
            value =
              "string" === typeof value
                ? value
                : "object" === typeof value && null !== value
                  ? "{" + describeObjectForErrorMessage(value) + "}"
                  : "{" + describeValueForErrorMessage(value) + "}";
            "" + i === expandedName
              ? ((start = objKind.length),
                (length = value.length),
                (objKind += value))
              : (objKind =
                  15 > value.length && 40 > objKind.length + value.length
                    ? objKind + value
                    : objKind + "{...}");
          }
          objKind += "</" + describeElementType(type) + ">";
        } else {
          objKind = "[";
          for (type = 0; type < objectOrArray.length; type++)
            0 < type && (objKind += ", "),
              (i = objectOrArray[type]),
              (i =
                "object" === typeof i && null !== i
                  ? describeObjectForErrorMessage(i)
                  : describeValueForErrorMessage(i)),
              "" + type === expandedName
                ? ((start = objKind.length),
                  (length = i.length),
                  (objKind += i))
                : (objKind =
                    10 > i.length && 40 > objKind.length + i.length
                      ? objKind + i
                      : objKind + "...");
          objKind += "]";
        }
      else if (objectOrArray.$$typeof === REACT_ELEMENT_TYPE)
        objKind = "<" + describeElementType(objectOrArray.type) + "/>";
      else {
        if (objectOrArray.$$typeof === CLIENT_REFERENCE_TAG) return "client";
        if (jsxPropsParents.has(objectOrArray)) {
          objKind = jsxPropsParents.get(objectOrArray);
          objKind = "<" + (describeElementType(objKind) || "...");
          type = Object.keys(objectOrArray);
          for (i = 0; i < type.length; i++) {
            objKind += " ";
            value = type[i];
            objKind += describeKeyForErrorMessage(value) + "=";
            var _value2 = objectOrArray[value];
            var _substr2 =
              value === expandedName &&
              "object" === typeof _value2 &&
              null !== _value2
                ? describeObjectForErrorMessage(_value2)
                : describeValueForErrorMessage(_value2);
            "string" !== typeof _value2 && (_substr2 = "{" + _substr2 + "}");
            value === expandedName
              ? ((start = objKind.length),
                (length = _substr2.length),
                (objKind += _substr2))
              : (objKind =
                  10 > _substr2.length && 40 > objKind.length + _substr2.length
                    ? objKind + _substr2
                    : objKind + "...");
          }
          objKind += ">";
        } else {
          objKind = "{";
          type = Object.keys(objectOrArray);
          for (i = 0; i < type.length; i++)
            0 < i && (objKind += ", "),
              (value = type[i]),
              (objKind += describeKeyForErrorMessage(value) + ": "),
              (_value2 = objectOrArray[value]),
              (_value2 =
                "object" === typeof _value2 && null !== _value2
                  ? describeObjectForErrorMessage(_value2)
                  : describeValueForErrorMessage(_value2)),
              value === expandedName
                ? ((start = objKind.length),
                  (length = _value2.length),
                  (objKind += _value2))
                : (objKind =
                    10 > _value2.length && 40 > objKind.length + _value2.length
                      ? objKind + _value2
                      : objKind + "...");
          objKind += "}";
        }
      }
      return void 0 === expandedName
        ? objKind
        : -1 < start && 0 < length
          ? ((objectOrArray = " ".repeat(start) + "^".repeat(length)),
            "\n  " + objKind + "\n  " + objectOrArray)
          : "\n  " + objKind;
    }
    function defaultFilterStackFrame(filename) {
      return (
        "" !== filename &&
        !filename.startsWith("node:") &&
        !filename.includes("node_modules")
      );
    }
    function filterStackTrace(request, error, skipFrames) {
      request = request.filterStackFrame;
      a: {
        var previousPrepare = Error.prepareStackTrace;
        Error.prepareStackTrace = prepareStackTrace;
        try {
          var stack = String(error.stack);
          break a;
        } finally {
          Error.prepareStackTrace = previousPrepare;
        }
        stack = void 0;
      }
      stack.startsWith("Error: react-stack-top-frame\n") &&
        (stack = stack.slice(29));
      error = stack.indexOf("react-stack-bottom-frame");
      -1 !== error && (error = stack.lastIndexOf("\n", error));
      -1 !== error && (stack = stack.slice(0, error));
      error = stack.split("\n");
      for (stack = []; skipFrames < error.length; skipFrames++)
        if ((previousPrepare = frameRegExp.exec(error[skipFrames]))) {
          var name = previousPrepare[1] || "";
          "<anonymous>" === name && (name = "");
          var filename = previousPrepare[2] || previousPrepare[5] || "";
          "<anonymous>" === filename && (filename = "");
          stack.push([
            name,
            filename,
            +(previousPrepare[3] || previousPrepare[6]),
            +(previousPrepare[4] || previousPrepare[7])
          ]);
        }
      for (skipFrames = 0; skipFrames < stack.length; skipFrames++) {
        error = stack[skipFrames];
        previousPrepare = error[0];
        name = error[1];
        if (name.startsWith("rsc://React/")) {
          filename = name.indexOf("/", 12);
          var suffixIdx = name.lastIndexOf("?");
          -1 < filename &&
            -1 < suffixIdx &&
            (name = error[1] = name.slice(filename + 1, suffixIdx));
        }
        request(name, previousPrepare) ||
          (stack.splice(skipFrames, 1), skipFrames--);
      }
      return stack;
    }
    function patchConsole(consoleInst, methodName) {
      var descriptor = Object.getOwnPropertyDescriptor(consoleInst, methodName);
      if (
        descriptor &&
        (descriptor.configurable || descriptor.writable) &&
        "function" === typeof descriptor.value
      ) {
        var originalMethod = descriptor.value;
        descriptor = Object.getOwnPropertyDescriptor(originalMethod, "name");
        var wrapperMethod = function () {
          var request = currentRequest ? currentRequest : null;
          if (("assert" !== methodName || !arguments[0]) && null !== request) {
            var stack = filterStackTrace(
              request,
              Error("react-stack-top-frame"),
              1
            );
            request.pendingChunks++;
            var id = request.nextChunkId++,
              owner = resolveOwner();
            emitConsoleChunk(request, id, methodName, owner, stack, arguments);
          }
          return originalMethod.apply(this, arguments);
        };
        descriptor && Object.defineProperty(wrapperMethod, "name", descriptor);
        Object.defineProperty(consoleInst, methodName, {
          value: wrapperMethod
        });
      }
    }
    function getCurrentStackInDEV$2() {
      var owner = resolveOwner();
      return null === owner ? "" : getOwnerStackByComponentInfoInDev(owner);
    }
    function throwTaintViolation(message) {
      throw Error(message);
    }
    function cleanupTaintQueue(request) {
      request = request.taintCleanupQueue;
      TaintRegistryPendingRequests.delete(request);
      for (var i = 0; i < request.length; i++) {
        var entryValue = request[i],
          entry = TaintRegistryValues.get(entryValue);
        void 0 !== entry &&
          (1 === entry.count
            ? TaintRegistryValues.delete(entryValue)
            : entry.count--);
      }
      request.length = 0;
    }
    function defaultErrorHandler$1(error) {
      console.error(error);
    }
    function defaultPostponeHandler() {}
    function RequestInstance$1(
      type,
      model,
      bundlerConfig,
      onError,
      identifierPrefix,
      onPostpone,
      temporaryReferences,
      environmentName,
      filterStackFrame,
      onAllReady,
      onFatalError
    ) {
      if (
        null !== ReactSharedInternalsServer.A &&
        ReactSharedInternalsServer.A !== DefaultAsyncDispatcher$1
      )
        throw Error(
          "Currently React only supports one RSC renderer at a time."
        );
      ReactSharedInternalsServer.A = DefaultAsyncDispatcher$1;
      ReactSharedInternalsServer.getCurrentStack = getCurrentStackInDEV$2;
      var abortSet = new Set(),
        pingedTasks = [],
        cleanupQueue = [];
      TaintRegistryPendingRequests.add(cleanupQueue);
      this.type = type;
      this.status = OPENING$1;
      this.flushScheduled = !1;
      this.destination = this.fatalError = null;
      this.bundlerConfig = bundlerConfig;
      this.cache = new Map();
      this.pendingChunks = this.nextChunkId = 0;
      this.hints = null;
      this.abortListeners = new Set();
      this.abortableTasks = abortSet;
      this.pingedTasks = pingedTasks;
      this.completedImportChunks = [];
      this.completedHintChunks = [];
      this.completedRegularChunks = [];
      this.completedErrorChunks = [];
      this.writtenSymbols = new Map();
      this.writtenClientReferences = new Map();
      this.writtenServerReferences = new Map();
      this.writtenObjects = new WeakMap();
      this.temporaryReferences = temporaryReferences;
      this.identifierPrefix = identifierPrefix || "";
      this.identifierCount = 1;
      this.taintCleanupQueue = cleanupQueue;
      this.onError = void 0 === onError ? defaultErrorHandler$1 : onError;
      this.onPostpone =
        void 0 === onPostpone ? defaultPostponeHandler : onPostpone;
      this.onAllReady = onAllReady;
      this.onFatalError = onFatalError;
      this.environmentName =
        void 0 === environmentName
          ? function () {
              return "Server";
            }
          : "function" !== typeof environmentName
            ? function () {
                return environmentName;
              }
            : environmentName;
      this.filterStackFrame =
        void 0 === filterStackFrame
          ? defaultFilterStackFrame
          : filterStackFrame;
      this.didWarnForKey = null;
      type = createTask(this, model, null, !1, abortSet, null, null, null);
      pingedTasks.push(type);
    }
    function noop$3() {}
    function serializeThenable(request, task, thenable) {
      var newTask = createTask(
        request,
        null,
        task.keyPath,
        task.implicitSlot,
        request.abortableTasks,
        task.debugOwner,
        task.debugStack,
        task.debugTask
      );
      (task = thenable._debugInfo) &&
        forwardDebugInfo(request, newTask.id, task);
      switch (thenable.status) {
        case "fulfilled":
          return (
            (newTask.model = thenable.value),
            pingTask$1(request, newTask),
            newTask.id
          );
        case "rejected":
          task = thenable.reason;
          if (
            "object" === typeof task &&
            null !== task &&
            task.$$typeof === REACT_POSTPONE_TYPE
          )
            logPostpone$1(request, task.message, newTask),
              emitPostponeChunk(request, newTask.id, task);
          else {
            var digest = logRecoverableError$1(request, task, null);
            emitErrorChunk(request, newTask.id, digest, task);
          }
          newTask.status = ERRORED$2;
          request.abortableTasks.delete(newTask);
          return newTask.id;
        default:
          if (request.status === ABORTING$1)
            return (
              request.abortableTasks.delete(newTask),
              (newTask.status = ABORTED$1),
              request.type === PRERENDER
                ? request.pendingChunks--
                : ((task = stringify(serializeByValueID$1(request.fatalError))),
                  emitModelChunk(request, newTask.id, task)),
              newTask.id
            );
          "string" !== typeof thenable.status &&
            ((thenable.status = "pending"),
            thenable.then(
              function (fulfilledValue) {
                "pending" === thenable.status &&
                  ((thenable.status = "fulfilled"),
                  (thenable.value = fulfilledValue));
              },
              function (error) {
                "pending" === thenable.status &&
                  ((thenable.status = "rejected"), (thenable.reason = error));
              }
            ));
      }
      thenable.then(
        function (value) {
          newTask.model = value;
          pingTask$1(request, newTask);
        },
        function (reason) {
          if (newTask.status === PENDING$3) {
            if (
              "object" === typeof reason &&
              null !== reason &&
              reason.$$typeof === REACT_POSTPONE_TYPE
            )
              logPostpone$1(request, reason.message, newTask),
                emitPostponeChunk(request, newTask.id, reason);
            else {
              var _digest = logRecoverableError$1(request, reason, newTask);
              emitErrorChunk(request, newTask.id, _digest, reason);
            }
            newTask.status = ERRORED$2;
            request.abortableTasks.delete(newTask);
            enqueueFlush(request);
          }
        }
      );
      return newTask.id;
    }
    function serializeReadableStream(request, task, stream) {
      function progress(entry) {
        if (!aborted)
          if (entry.done)
            request.abortListeners.delete(abortStream),
              (entry = streamTask.id.toString(16) + ":C\n"),
              request.completedRegularChunks.push(entry),
              enqueueFlush(request),
              (aborted = !0);
          else
            try {
              (streamTask.model = entry.value),
                request.pendingChunks++,
                tryStreamTask(request, streamTask),
                enqueueFlush(request),
                reader.read().then(progress, error);
            } catch (x$2) {
              error(x$2);
            }
      }
      function error(reason) {
        if (!aborted) {
          aborted = !0;
          request.abortListeners.delete(abortStream);
          var digest = logRecoverableError$1(request, reason, streamTask);
          emitErrorChunk(request, streamTask.id, digest, reason);
          enqueueFlush(request);
          reader.cancel(reason).then(error, error);
        }
      }
      function abortStream(reason) {
        if (!aborted) {
          aborted = !0;
          request.abortListeners.delete(abortStream);
          if (
            "object" === typeof reason &&
            null !== reason &&
            reason.$$typeof === REACT_POSTPONE_TYPE
          )
            logPostpone$1(request, reason.message, streamTask),
              request.type === PRERENDER
                ? request.pendingChunks--
                : (emitPostponeChunk(request, streamTask.id, reason),
                  enqueueFlush(request));
          else {
            var digest = logRecoverableError$1(request, reason, streamTask);
            request.type === PRERENDER
              ? request.pendingChunks--
              : (emitErrorChunk(request, streamTask.id, digest, reason),
                enqueueFlush(request));
          }
          reader.cancel(reason).then(error, error);
        }
      }
      var supportsBYOB = stream.supportsBYOB;
      if (void 0 === supportsBYOB)
        try {
          stream.getReader({ mode: "byob" }).releaseLock(), (supportsBYOB = !0);
        } catch (x) {
          supportsBYOB = !1;
        }
      var reader = stream.getReader(),
        streamTask = createTask(
          request,
          task.model,
          task.keyPath,
          task.implicitSlot,
          request.abortableTasks,
          task.debugOwner,
          task.debugStack,
          task.debugTask
        );
      request.abortableTasks.delete(streamTask);
      request.pendingChunks++;
      task =
        streamTask.id.toString(16) + ":" + (supportsBYOB ? "r" : "R") + "\n";
      request.completedRegularChunks.push(task);
      var aborted = !1;
      request.abortListeners.add(abortStream);
      reader.read().then(progress, error);
      return serializeByValueID$1(streamTask.id);
    }
    function serializeAsyncIterable(request, task, iterable, iterator) {
      function progress(entry) {
        if (!aborted)
          if (entry.done) {
            request.abortListeners.delete(abortIterable);
            if (void 0 === entry.value)
              var endStreamRow = streamTask.id.toString(16) + ":C\n";
            else
              try {
                var chunkId = outlineModel(request, entry.value);
                endStreamRow =
                  streamTask.id.toString(16) +
                  ":C" +
                  stringify(serializeByValueID$1(chunkId)) +
                  "\n";
              } catch (x) {
                error(x);
                return;
              }
            request.completedRegularChunks.push(endStreamRow);
            enqueueFlush(request);
            aborted = !0;
          } else
            try {
              (streamTask.model = entry.value),
                request.pendingChunks++,
                tryStreamTask(request, streamTask),
                enqueueFlush(request),
                callIteratorInDEV(iterator, progress, error);
            } catch (x$3) {
              error(x$3);
            }
      }
      function error(reason) {
        if (!aborted) {
          aborted = !0;
          request.abortListeners.delete(abortIterable);
          var digest = logRecoverableError$1(request, reason, streamTask);
          emitErrorChunk(request, streamTask.id, digest, reason);
          enqueueFlush(request);
          "function" === typeof iterator.throw &&
            iterator.throw(reason).then(error, error);
        }
      }
      function abortIterable(reason) {
        if (!aborted) {
          aborted = !0;
          request.abortListeners.delete(abortIterable);
          if (
            "object" === typeof reason &&
            null !== reason &&
            reason.$$typeof === REACT_POSTPONE_TYPE
          )
            logPostpone$1(request, reason.message, streamTask),
              request.type === PRERENDER
                ? request.pendingChunks--
                : (emitPostponeChunk(request, streamTask.id, reason),
                  enqueueFlush(request));
          else {
            var digest = logRecoverableError$1(request, reason, streamTask);
            request.type === PRERENDER
              ? request.pendingChunks--
              : (emitErrorChunk(request, streamTask.id, digest, reason),
                enqueueFlush(request));
          }
          "function" === typeof iterator.throw &&
            iterator.throw(reason).then(error, error);
        }
      }
      var isIterator = iterable === iterator,
        streamTask = createTask(
          request,
          task.model,
          task.keyPath,
          task.implicitSlot,
          request.abortableTasks,
          task.debugOwner,
          task.debugStack,
          task.debugTask
        );
      request.abortableTasks.delete(streamTask);
      request.pendingChunks++;
      task = streamTask.id.toString(16) + ":" + (isIterator ? "x" : "X") + "\n";
      request.completedRegularChunks.push(task);
      (iterable = iterable._debugInfo) &&
        forwardDebugInfo(request, streamTask.id, iterable);
      var aborted = !1;
      request.abortListeners.add(abortIterable);
      callIteratorInDEV(iterator, progress, error);
      return serializeByValueID$1(streamTask.id);
    }
    function readThenable(thenable) {
      if ("fulfilled" === thenable.status) return thenable.value;
      if ("rejected" === thenable.status) throw thenable.reason;
      throw thenable;
    }
    function createLazyWrapperAroundWakeable(wakeable) {
      switch (wakeable.status) {
        case "fulfilled":
        case "rejected":
          break;
        default:
          "string" !== typeof wakeable.status &&
            ((wakeable.status = "pending"),
            wakeable.then(
              function (fulfilledValue) {
                "pending" === wakeable.status &&
                  ((wakeable.status = "fulfilled"),
                  (wakeable.value = fulfilledValue));
              },
              function (error) {
                "pending" === wakeable.status &&
                  ((wakeable.status = "rejected"), (wakeable.reason = error));
              }
            ));
      }
      var lazyType = {
        $$typeof: REACT_LAZY_TYPE,
        _payload: wakeable,
        _init: readThenable
      };
      lazyType._debugInfo = wakeable._debugInfo || [];
      return lazyType;
    }
    function callWithDebugContextInDEV(request, task, callback, arg) {
      var componentDebugInfo = {
        name: "",
        env: task.environmentName,
        key: null,
        owner: task.debugOwner
      };
      componentDebugInfo.stack =
        null === task.debugStack
          ? null
          : filterStackTrace(request, task.debugStack, 1);
      componentDebugInfo.debugStack = task.debugStack;
      request = componentDebugInfo.debugTask = task.debugTask;
      currentOwner = componentDebugInfo;
      try {
        return request ? request.run(callback.bind(null, arg)) : callback(arg);
      } finally {
        currentOwner = null;
      }
    }
    function renderFunctionComponent$1(
      request,
      task,
      key,
      Component,
      props,
      validated
    ) {
      var prevThenableState = task.thenableState;
      task.thenableState = null;
      if (null === debugID) return outlineTask(request, task);
      if (null !== prevThenableState)
        var componentDebugInfo = prevThenableState._componentDebugInfo;
      else {
        var componentDebugID = debugID;
        componentDebugInfo = Component.displayName || Component.name || "";
        var componentEnv = (0, request.environmentName)();
        request.pendingChunks++;
        componentDebugInfo = {
          name: componentDebugInfo,
          env: componentEnv,
          key: key,
          owner: task.debugOwner
        };
        componentDebugInfo.stack =
          null === task.debugStack
            ? null
            : filterStackTrace(request, task.debugStack, 1);
        componentDebugInfo.props = props;
        componentDebugInfo.debugStack = task.debugStack;
        componentDebugInfo.debugTask = task.debugTask;
        outlineComponentInfo(request, componentDebugInfo);
        emitDebugChunk(request, componentDebugID, componentDebugInfo);
        task.environmentName = componentEnv;
        2 === validated &&
          warnForMissingKey$1(request, key, componentDebugInfo, task.debugTask);
      }
      prepareToUseHooksForComponent(prevThenableState, componentDebugInfo);
      props = task.debugTask
        ? task.debugTask.run(
            callComponentInDEV$1.bind(
              null,
              Component,
              props,
              componentDebugInfo
            )
          )
        : callComponentInDEV$1(Component, props, componentDebugInfo);
      if (request.status === ABORTING$1)
        throw (
          ("object" !== typeof props ||
            null === props ||
            "function" !== typeof props.then ||
            isClientReference(props) ||
            props.then(voidHandler, voidHandler),
          null)
        );
      if (
        "object" === typeof props &&
        null !== props &&
        !isClientReference(props)
      ) {
        if ("function" === typeof props.then) {
          validated = props;
          validated.then(function (resolvedValue) {
            "object" === typeof resolvedValue &&
              null !== resolvedValue &&
              resolvedValue.$$typeof === REACT_ELEMENT_TYPE &&
              (resolvedValue._store.validated = 1);
          }, voidHandler);
          if ("fulfilled" === validated.status) return validated.value;
          props = createLazyWrapperAroundWakeable(props);
        }
        var iteratorFn = getIteratorFn(props);
        if (iteratorFn) {
          var iterableChild = props;
          props = _defineProperty({}, Symbol.iterator, function () {
            var iterator = iteratorFn.call(iterableChild);
            iterator !== iterableChild ||
              ("[object GeneratorFunction]" ===
                Object.prototype.toString.call(Component) &&
                "[object Generator]" ===
                  Object.prototype.toString.call(iterableChild)) ||
              callWithDebugContextInDEV(request, task, function () {
                console.error(
                  "Returning an Iterator from a Server Component is not supported since it cannot be looped over more than once. "
                );
              });
            return iterator;
          });
          props._debugInfo = iterableChild._debugInfo;
        } else if (
          "function" !== typeof props[ASYNC_ITERATOR] ||
          ("function" === typeof ReadableStream &&
            props instanceof ReadableStream)
        )
          props.$$typeof === REACT_ELEMENT_TYPE && (props._store.validated = 1);
        else {
          var _iterableChild = props;
          props = _defineProperty({}, ASYNC_ITERATOR, function () {
            var iterator = _iterableChild[ASYNC_ITERATOR]();
            iterator !== _iterableChild ||
              ("[object AsyncGeneratorFunction]" ===
                Object.prototype.toString.call(Component) &&
                "[object AsyncGenerator]" ===
                  Object.prototype.toString.call(_iterableChild)) ||
              callWithDebugContextInDEV(request, task, function () {
                console.error(
                  "Returning an AsyncIterator from a Server Component is not supported since it cannot be looped over more than once. "
                );
              });
            return iterator;
          });
          props._debugInfo = _iterableChild._debugInfo;
        }
      }
      validated = task.keyPath;
      prevThenableState = task.implicitSlot;
      null !== key
        ? (task.keyPath = null === validated ? key : validated + "," + key)
        : null === validated && (task.implicitSlot = !0);
      key = renderModelDestructive(request, task, emptyRoot, "", props);
      task.keyPath = validated;
      task.implicitSlot = prevThenableState;
      return key;
    }
    function warnForMissingKey$1(request, key, componentDebugInfo, debugTask) {
      function logKeyError() {
        console.error(
          'Each child in a list should have a unique "key" prop.%s%s See https://react.dev/link/warning-keys for more information.',
          "",
          ""
        );
      }
      key = request.didWarnForKey;
      null == key && (key = request.didWarnForKey = new WeakSet());
      request = componentDebugInfo.owner;
      if (null != request) {
        if (key.has(request)) return;
        key.add(request);
      }
      debugTask
        ? debugTask.run(
            callComponentInDEV$1.bind(
              null,
              logKeyError,
              null,
              componentDebugInfo
            )
          )
        : callComponentInDEV$1(logKeyError, null, componentDebugInfo);
    }
    function renderFragment(request, task, children) {
      for (var i = 0; i < children.length; i++) {
        var child = children[i];
        null === child ||
          "object" !== typeof child ||
          child.$$typeof !== REACT_ELEMENT_TYPE ||
          null !== child.key ||
          child._store.validated ||
          (child._store.validated = 2);
      }
      if (null !== task.keyPath)
        return (
          (request = [
            REACT_ELEMENT_TYPE,
            REACT_FRAGMENT_TYPE,
            task.keyPath,
            { children: children },
            null,
            null,
            0
          ]),
          task.implicitSlot ? [request] : request
        );
      if ((i = children._debugInfo)) {
        if (null === debugID) return outlineTask(request, task);
        forwardDebugInfo(request, debugID, i);
        children = Array.from(children);
      }
      return children;
    }
    function renderAsyncFragment(request, task, children, getAsyncIterator) {
      if (null !== task.keyPath)
        return (
          (request = [
            REACT_ELEMENT_TYPE,
            REACT_FRAGMENT_TYPE,
            task.keyPath,
            { children: children },
            null,
            null,
            0
          ]),
          task.implicitSlot ? [request] : request
        );
      getAsyncIterator = getAsyncIterator.call(children);
      return serializeAsyncIterable(request, task, children, getAsyncIterator);
    }
    function outlineTask(request, task) {
      task = createTask(
        request,
        task.model,
        task.keyPath,
        task.implicitSlot,
        request.abortableTasks,
        task.debugOwner,
        task.debugStack,
        task.debugTask
      );
      retryTask$1(request, task);
      return task.status === COMPLETED$1
        ? serializeByValueID$1(task.id)
        : "$L" + task.id.toString(16);
    }
    function renderElement$1(request, task, type, key, ref, props, validated) {
      if (null !== ref && void 0 !== ref)
        throw Error(
          "Refs cannot be used in Server Components, nor passed to Client Components."
        );
      jsxPropsParents.set(props, type);
      "object" === typeof props.children &&
        null !== props.children &&
        jsxChildrenParents.set(props.children, type);
      if (
        "function" !== typeof type ||
        isClientReference(type) ||
        type.$$typeof === TEMPORARY_REFERENCE_TAG
      ) {
        if (type === REACT_FRAGMENT_TYPE && null === key)
          return (
            2 === validated &&
              ((validated = {
                name: "Fragment",
                env: (0, request.environmentName)(),
                key: key,
                owner: task.debugOwner,
                stack:
                  null === task.debugStack
                    ? null
                    : filterStackTrace(request, task.debugStack, 1),
                props: props,
                debugStack: task.debugStack,
                debugTask: task.debugTask
              }),
              warnForMissingKey$1(request, key, validated, task.debugTask)),
            (validated = task.implicitSlot),
            null === task.keyPath && (task.implicitSlot = !0),
            (request = renderModelDestructive(
              request,
              task,
              emptyRoot,
              "",
              props.children
            )),
            (task.implicitSlot = validated),
            request
          );
        if (
          null != type &&
          "object" === typeof type &&
          !isClientReference(type)
        )
          switch (type.$$typeof) {
            case REACT_LAZY_TYPE:
              type = callLazyInitInDEV$1(type);
              if (request.status === ABORTING$1) throw null;
              return renderElement$1(
                request,
                task,
                type,
                key,
                ref,
                props,
                validated
              );
            case REACT_FORWARD_REF_TYPE:
              return renderFunctionComponent$1(
                request,
                task,
                key,
                type.render,
                props,
                validated
              );
            case REACT_MEMO_TYPE:
              return renderElement$1(
                request,
                task,
                type.type,
                key,
                ref,
                props,
                validated
              );
            case REACT_ELEMENT_TYPE:
              type._store.validated = 1;
          }
      } else
        return renderFunctionComponent$1(
          request,
          task,
          key,
          type,
          props,
          validated
        );
      ref = task.keyPath;
      null === key ? (key = ref) : null !== ref && (key = ref + "," + key);
      null !== task.debugOwner &&
        outlineComponentInfo(request, task.debugOwner);
      request = [
        REACT_ELEMENT_TYPE,
        type,
        key,
        props,
        task.debugOwner,
        null === task.debugStack
          ? null
          : filterStackTrace(request, task.debugStack, 1),
        validated
      ];
      task = task.implicitSlot && null !== key ? [request] : request;
      return task;
    }
    function pingTask$1(request, task) {
      var pingedTasks = request.pingedTasks;
      pingedTasks.push(task);
      1 === pingedTasks.length &&
        ((request.flushScheduled = null !== request.destination),
        performWork$1(request));
    }
    function createTask(
      request,
      model,
      keyPath,
      implicitSlot,
      abortSet,
      debugOwner,
      debugStack,
      debugTask
    ) {
      request.pendingChunks++;
      var id = request.nextChunkId++;
      "object" !== typeof model ||
        null === model ||
        null !== keyPath ||
        implicitSlot ||
        request.writtenObjects.set(model, serializeByValueID$1(id));
      var task = {
        id: id,
        status: PENDING$3,
        model: model,
        keyPath: keyPath,
        implicitSlot: implicitSlot,
        ping: function () {
          return pingTask$1(request, task);
        },
        toJSON: function (parentPropertyName, value) {
          var parent = this,
            originalValue = parent[parentPropertyName];
          "object" !== typeof originalValue ||
            originalValue === value ||
            originalValue instanceof Date ||
            callWithDebugContextInDEV(request, task, function () {
              "Object" !== objectName(originalValue)
                ? "string" === typeof jsxChildrenParents.get(parent)
                  ? console.error(
                      "%s objects cannot be rendered as text children. Try formatting it using toString().%s",
                      objectName(originalValue),
                      describeObjectForErrorMessage(parent, parentPropertyName)
                    )
                  : console.error(
                      "Only plain objects can be passed to Client Components from Server Components. %s objects are not supported.%s",
                      objectName(originalValue),
                      describeObjectForErrorMessage(parent, parentPropertyName)
                    )
                : console.error(
                    "Only plain objects can be passed to Client Components from Server Components. Objects with toJSON methods are not supported. Convert it manually to a simple value before passing it to props.%s",
                    describeObjectForErrorMessage(parent, parentPropertyName)
                  );
            });
          return renderModel(request, task, parent, parentPropertyName, value);
        },
        thenableState: null
      };
      task.environmentName = request.environmentName();
      task.debugOwner = debugOwner;
      task.debugStack = debugStack;
      task.debugTask = debugTask;
      abortSet.add(task);
      return task;
    }
    function serializeByValueID$1(id) {
      return "$" + id.toString(16);
    }
    function serializeNumber$1(number) {
      return Number.isFinite(number)
        ? 0 === number && -Infinity === 1 / number
          ? "$-0"
          : number
        : Infinity === number
          ? "$Infinity"
          : -Infinity === number
            ? "$-Infinity"
            : "$NaN";
    }
    function encodeReferenceChunk(request, id, reference) {
      request = stringify(reference);
      return id.toString(16) + ":" + request + "\n";
    }
    function serializeClientReference() {
      throw Error(
        "Attempted to render a Client Component from renderToHTML. This is not supported since it will never hydrate. Only render Server Components with renderToHTML."
      );
    }
    function outlineModel(request, value) {
      value = createTask(
        request,
        value,
        null,
        !1,
        request.abortableTasks,
        null,
        null,
        null
      );
      retryTask$1(request, value);
      return value.id;
    }
    function serializeServerReference(request, serverReference) {
      request = request.writtenServerReferences.get(serverReference);
      if (void 0 !== request) return "$F" + request.toString(16);
      throw Error(
        "Attempted to render a Server Action from renderToHTML. This is not supported since it varies by version of the app. Use a fixed URL for any forms instead."
      );
    }
    function serializeMap(request, map) {
      map = Array.from(map);
      return "$Q" + outlineModel(request, map).toString(16);
    }
    function serializeFormData(request, formData) {
      formData = Array.from(formData.entries());
      return "$K" + outlineModel(request, formData).toString(16);
    }
    function serializeSet(request, set) {
      set = Array.from(set);
      return "$W" + outlineModel(request, set).toString(16);
    }
    function serializeTypedArray(request, tag, typedArray) {
      request.pendingChunks++;
      var bufferId = request.nextChunkId++;
      emitTypedArrayChunk(request, bufferId, tag, typedArray);
      return serializeByValueID$1(bufferId);
    }
    function serializeBlob(request, blob) {
      function progress(entry) {
        if (!aborted)
          if (entry.done)
            request.abortListeners.delete(abortBlob),
              (aborted = !0),
              pingTask$1(request, newTask);
          else
            return (
              model.push(entry.value), reader.read().then(progress).catch(error)
            );
      }
      function error(reason) {
        if (!aborted) {
          aborted = !0;
          request.abortListeners.delete(abortBlob);
          var digest = logRecoverableError$1(request, reason, newTask);
          emitErrorChunk(request, newTask.id, digest, reason);
          enqueueFlush(request);
          reader.cancel(reason).then(error, error);
        }
      }
      function abortBlob(reason) {
        if (!aborted) {
          aborted = !0;
          request.abortListeners.delete(abortBlob);
          if (
            "object" === typeof reason &&
            null !== reason &&
            reason.$$typeof === REACT_POSTPONE_TYPE
          )
            logPostpone$1(request, reason.message, newTask),
              request.type === PRERENDER
                ? request.pendingChunks--
                : (emitPostponeChunk(request, newTask.id, reason),
                  enqueueFlush(request));
          else {
            var digest = logRecoverableError$1(request, reason, newTask);
            request.type === PRERENDER
              ? request.pendingChunks--
              : (emitErrorChunk(request, newTask.id, digest, reason),
                enqueueFlush(request));
          }
          reader.cancel(reason).then(error, error);
        }
      }
      var model = [blob.type],
        newTask = createTask(
          request,
          model,
          null,
          !1,
          request.abortableTasks,
          null,
          null,
          null
        ),
        reader = blob.stream().getReader(),
        aborted = !1;
      request.abortListeners.add(abortBlob);
      reader.read().then(progress).catch(error);
      return "$B" + newTask.id.toString(16);
    }
    function renderModel(request, task, parent, key, value) {
      var prevKeyPath = task.keyPath,
        prevImplicitSlot = task.implicitSlot;
      try {
        return renderModelDestructive(request, task, parent, key, value);
      } catch (thrownValue) {
        parent = task.model;
        parent =
          "object" === typeof parent &&
          null !== parent &&
          (parent.$$typeof === REACT_ELEMENT_TYPE ||
            parent.$$typeof === REACT_LAZY_TYPE);
        if (request.status === ABORTING$1) {
          task.status = ABORTED$1;
          if (request.type === PRERENDER)
            return (
              (task = request.nextChunkId++),
              (task = parent
                ? "$L" + task.toString(16)
                : serializeByValueID$1(task)),
              task
            );
          task = request.fatalError;
          return parent ? "$L" + task.toString(16) : serializeByValueID$1(task);
        }
        key =
          thrownValue === SuspenseException$1
            ? getSuspendedThenable$1()
            : thrownValue;
        if ("object" === typeof key && null !== key) {
          if ("function" === typeof key.then)
            return (
              (request = createTask(
                request,
                task.model,
                task.keyPath,
                task.implicitSlot,
                request.abortableTasks,
                task.debugOwner,
                task.debugStack,
                task.debugTask
              )),
              (value = request.ping),
              key.then(value, value),
              (request.thenableState = getThenableStateAfterSuspending$1()),
              (task.keyPath = prevKeyPath),
              (task.implicitSlot = prevImplicitSlot),
              parent
                ? "$L" + request.id.toString(16)
                : serializeByValueID$1(request.id)
            );
          if (key.$$typeof === REACT_POSTPONE_TYPE)
            return (
              request.pendingChunks++,
              (value = request.nextChunkId++),
              logPostpone$1(request, key.message, task),
              emitPostponeChunk(request, value, key),
              (task.keyPath = prevKeyPath),
              (task.implicitSlot = prevImplicitSlot),
              parent ? "$L" + value.toString(16) : serializeByValueID$1(value)
            );
        }
        task.keyPath = prevKeyPath;
        task.implicitSlot = prevImplicitSlot;
        request.pendingChunks++;
        prevKeyPath = request.nextChunkId++;
        task = logRecoverableError$1(request, key, task);
        emitErrorChunk(request, prevKeyPath, task, key);
        return parent
          ? "$L" + prevKeyPath.toString(16)
          : serializeByValueID$1(prevKeyPath);
      }
    }
    function renderModelDestructive(
      request,
      task,
      parent,
      parentPropertyName,
      value
    ) {
      task.model = value;
      if (value === REACT_ELEMENT_TYPE) return "$";
      if (null === value) return null;
      if ("object" === typeof value) {
        switch (value.$$typeof) {
          case REACT_ELEMENT_TYPE:
            var elementReference = null,
              _writtenObjects = request.writtenObjects;
            if (null === task.keyPath && !task.implicitSlot) {
              var _existingReference = _writtenObjects.get(value);
              if (void 0 !== _existingReference)
                if (modelRoot === value) modelRoot = null;
                else return _existingReference;
              else
                -1 === parentPropertyName.indexOf(":") &&
                  ((_existingReference = _writtenObjects.get(parent)),
                  void 0 !== _existingReference &&
                    ((elementReference =
                      _existingReference + ":" + parentPropertyName),
                    _writtenObjects.set(value, elementReference)));
            }
            if ((_existingReference = value._debugInfo)) {
              if (null === debugID) return outlineTask(request, task);
              forwardDebugInfo(request, debugID, _existingReference);
            }
            _existingReference = value.props;
            var refProp = _existingReference.ref;
            task.debugOwner = value._owner;
            task.debugStack = value._debugStack;
            task.debugTask = value._debugTask;
            request = renderElement$1(
              request,
              task,
              value.type,
              value.key,
              void 0 !== refProp ? refProp : null,
              _existingReference,
              value._store.validated
            );
            "object" === typeof request &&
              null !== request &&
              null !== elementReference &&
              (_writtenObjects.has(request) ||
                _writtenObjects.set(request, elementReference));
            return request;
          case REACT_LAZY_TYPE:
            task.thenableState = null;
            elementReference = callLazyInitInDEV$1(value);
            if (request.status === ABORTING$1) throw null;
            if ((_writtenObjects = value._debugInfo)) {
              if (null === debugID) return outlineTask(request, task);
              forwardDebugInfo(request, debugID, _writtenObjects);
            }
            return renderModelDestructive(
              request,
              task,
              emptyRoot,
              "",
              elementReference
            );
          case REACT_LEGACY_ELEMENT_TYPE:
            throw Error(
              'A React Element from an older version of React was rendered. This is not supported. It can happen if:\n- Multiple copies of the "react" package is used.\n- A library pre-bundled an old copy of "react" or "react/jsx-runtime".\n- A compiler tries to "inline" JSX instead of using the runtime.'
            );
        }
        if (isClientReference(value))
          return serializeClientReference(
            request,
            parent,
            parentPropertyName,
            value
          );
        if (
          void 0 !== request.temporaryReferences &&
          ((elementReference = request.temporaryReferences.get(value)),
          void 0 !== elementReference)
        )
          return "$T" + elementReference;
        elementReference = TaintRegistryObjects.get(value);
        void 0 !== elementReference && throwTaintViolation(elementReference);
        elementReference = request.writtenObjects;
        _writtenObjects = elementReference.get(value);
        if ("function" === typeof value.then) {
          if (void 0 !== _writtenObjects) {
            if (null !== task.keyPath || task.implicitSlot)
              return (
                "$@" + serializeThenable(request, task, value).toString(16)
              );
            if (modelRoot === value) modelRoot = null;
            else return _writtenObjects;
          }
          request = "$@" + serializeThenable(request, task, value).toString(16);
          elementReference.set(value, request);
          return request;
        }
        if (void 0 !== _writtenObjects)
          if (modelRoot === value) modelRoot = null;
          else return _writtenObjects;
        else if (
          -1 === parentPropertyName.indexOf(":") &&
          ((_writtenObjects = elementReference.get(parent)),
          void 0 !== _writtenObjects)
        ) {
          _existingReference = parentPropertyName;
          if (isArrayImpl(parent) && parent[0] === REACT_ELEMENT_TYPE)
            switch (parentPropertyName) {
              case "1":
                _existingReference = "type";
                break;
              case "2":
                _existingReference = "key";
                break;
              case "3":
                _existingReference = "props";
                break;
              case "4":
                _existingReference = "_owner";
            }
          elementReference.set(
            value,
            _writtenObjects + ":" + _existingReference
          );
        }
        if (isArrayImpl(value)) return renderFragment(request, task, value);
        if (value instanceof Map) return serializeMap(request, value);
        if (value instanceof Set) return serializeSet(request, value);
        if ("function" === typeof FormData && value instanceof FormData)
          return serializeFormData(request, value);
        if (value instanceof Error) return serializeErrorValue(request, value);
        if (value instanceof ArrayBuffer)
          return serializeTypedArray(request, "A", new Uint8Array(value));
        if (value instanceof Int8Array)
          return serializeTypedArray(request, "O", value);
        if (value instanceof Uint8Array)
          return serializeTypedArray(request, "o", value);
        if (value instanceof Uint8ClampedArray)
          return serializeTypedArray(request, "U", value);
        if (value instanceof Int16Array)
          return serializeTypedArray(request, "S", value);
        if (value instanceof Uint16Array)
          return serializeTypedArray(request, "s", value);
        if (value instanceof Int32Array)
          return serializeTypedArray(request, "L", value);
        if (value instanceof Uint32Array)
          return serializeTypedArray(request, "l", value);
        if (value instanceof Float32Array)
          return serializeTypedArray(request, "G", value);
        if (value instanceof Float64Array)
          return serializeTypedArray(request, "g", value);
        if (value instanceof BigInt64Array)
          return serializeTypedArray(request, "M", value);
        if (value instanceof BigUint64Array)
          return serializeTypedArray(request, "m", value);
        if (value instanceof DataView)
          return serializeTypedArray(request, "V", value);
        if ("function" === typeof Blob && value instanceof Blob)
          return serializeBlob(request, value);
        if ((elementReference = getIteratorFn(value)))
          return (
            (elementReference = elementReference.call(value)),
            elementReference === value
              ? "$i" +
                outlineModel(request, Array.from(elementReference)).toString(16)
              : renderFragment(request, task, Array.from(elementReference))
          );
        if (
          "function" === typeof ReadableStream &&
          value instanceof ReadableStream
        )
          return serializeReadableStream(request, task, value);
        elementReference = value[ASYNC_ITERATOR];
        if ("function" === typeof elementReference)
          return renderAsyncFragment(request, task, value, elementReference);
        if (value instanceof Date) return "$D" + value.toJSON();
        elementReference = getPrototypeOf(value);
        if (
          elementReference !== ObjectPrototype$1 &&
          (null === elementReference ||
            null !== getPrototypeOf(elementReference))
        )
          throw Error(
            "Only plain objects, and a few built-ins, can be passed to Client Components from Server Components. Classes or null prototypes are not supported." +
              describeObjectForErrorMessage(parent, parentPropertyName)
          );
        if ("Object" !== objectName(value))
          callWithDebugContextInDEV(request, task, function () {
            console.error(
              "Only plain objects can be passed to Client Components from Server Components. %s objects are not supported.%s",
              objectName(value),
              describeObjectForErrorMessage(parent, parentPropertyName)
            );
          });
        else if (!isSimpleObject(value))
          callWithDebugContextInDEV(request, task, function () {
            console.error(
              "Only plain objects can be passed to Client Components from Server Components. Classes or other objects with methods are not supported.%s",
              describeObjectForErrorMessage(parent, parentPropertyName)
            );
          });
        else if (Object.getOwnPropertySymbols) {
          var symbols = Object.getOwnPropertySymbols(value);
          0 < symbols.length &&
            callWithDebugContextInDEV(request, task, function () {
              console.error(
                "Only plain objects can be passed to Client Components from Server Components. Objects with symbol properties like %s are not supported.%s",
                symbols[0].description,
                describeObjectForErrorMessage(parent, parentPropertyName)
              );
            });
        }
        return value;
      }
      if ("string" === typeof value)
        return (
          (request = TaintRegistryValues.get(value)),
          void 0 !== request && throwTaintViolation(request.message),
          "Z" === value[value.length - 1] &&
          parent[parentPropertyName] instanceof Date
            ? "$D" + value
            : "$" === value[0]
              ? "$" + value
              : value
        );
      if ("boolean" === typeof value) return value;
      if ("number" === typeof value) return serializeNumber$1(value);
      if ("undefined" === typeof value) return "$undefined";
      if ("function" === typeof value) {
        if (isClientReference(value))
          return serializeClientReference(
            request,
            parent,
            parentPropertyName,
            value
          );
        if (value.$$typeof === SERVER_REFERENCE_TAG)
          return serializeServerReference(request, value);
        if (
          void 0 !== request.temporaryReferences &&
          ((request = request.temporaryReferences.get(value)),
          void 0 !== request)
        )
          return "$T" + request;
        request = TaintRegistryObjects.get(value);
        void 0 !== request && throwTaintViolation(request);
        if (value.$$typeof === TEMPORARY_REFERENCE_TAG)
          throw Error(
            "Could not reference an opaque temporary reference. This is likely due to misconfiguring the temporaryReferences options on the server."
          );
        if (/^on[A-Z]/.test(parentPropertyName))
          throw Error(
            "Event handlers cannot be passed to Client Component props." +
              describeObjectForErrorMessage(parent, parentPropertyName) +
              "\nIf you need interactivity, consider converting part of this to a Client Component."
          );
        if (
          jsxChildrenParents.has(parent) ||
          (jsxPropsParents.has(parent) && "children" === parentPropertyName)
        )
          throw (
            ((request = value.displayName || value.name || "Component"),
            Error(
              "Functions are not valid as a child of Client Components. This may happen if you return " +
                request +
                " instead of <" +
                request +
                " /> from render. Or maybe you meant to call this function rather than return it." +
                describeObjectForErrorMessage(parent, parentPropertyName)
            ))
          );
        throw Error(
          'Functions cannot be passed directly to Client Components unless you explicitly expose it by marking it with "use server". Or maybe you meant to call this function rather than return it.' +
            describeObjectForErrorMessage(parent, parentPropertyName)
        );
      }
      if ("symbol" === typeof value) {
        task = request.writtenSymbols;
        elementReference = task.get(value);
        if (void 0 !== elementReference)
          return serializeByValueID$1(elementReference);
        elementReference = value.description;
        if (Symbol.for(elementReference) !== value)
          throw Error(
            "Only global symbols received from Symbol.for(...) can be passed to Client Components. The symbol Symbol.for(" +
              (value.description + ") cannot be found among global symbols.") +
              describeObjectForErrorMessage(parent, parentPropertyName)
          );
        request.pendingChunks++;
        _writtenObjects = request.nextChunkId++;
        emitSymbolChunk(request, _writtenObjects, elementReference);
        task.set(value, _writtenObjects);
        return serializeByValueID$1(_writtenObjects);
      }
      if ("bigint" === typeof value)
        return (
          (request = TaintRegistryValues.get(value)),
          void 0 !== request && throwTaintViolation(request.message),
          "$n" + value.toString(10)
        );
      throw Error(
        "Type " +
          typeof value +
          " is not supported in Client Component props." +
          describeObjectForErrorMessage(parent, parentPropertyName)
      );
    }
    function logPostpone$1(request, reason, task) {
      var prevRequest = currentRequest;
      currentRequest = null;
      try {
        var onPostpone = request.onPostpone;
        null !== task
          ? callWithDebugContextInDEV(request, task, onPostpone, reason)
          : onPostpone(reason);
      } finally {
        currentRequest = prevRequest;
      }
    }
    function logRecoverableError$1(request, error, task) {
      var prevRequest = currentRequest;
      currentRequest = null;
      try {
        var onError = request.onError;
        var errorDigest =
          null !== task
            ? callWithDebugContextInDEV(request, task, onError, error)
            : onError(error);
      } finally {
        currentRequest = prevRequest;
      }
      if (null != errorDigest && "string" !== typeof errorDigest)
        throw Error(
          'onError returned something with a type other than "string". onError should return a string and may return null or undefined but must not return anything else. It received something of type "' +
            typeof errorDigest +
            '" instead'
        );
      return errorDigest || "";
    }
    function fatalError$1(request, error) {
      var onFatalError = request.onFatalError;
      onFatalError(error);
      cleanupTaintQueue(request);
      null !== request.destination
        ? ((request.status = CLOSED$1), request.destination.destroy(error))
        : ((request.status = CLOSING$1), (request.fatalError = error));
    }
    function emitPostponeChunk(request, id, postponeInstance) {
      var reason = "",
        env = request.environmentName();
      try {
        reason = String(postponeInstance.message);
        var stack = filterStackTrace(request, postponeInstance, 0);
      } catch (x) {
        stack = [];
      }
      id =
        id.toString(16) +
        ":P" +
        stringify({ reason: reason, stack: stack, env: env }) +
        "\n";
      request.completedErrorChunks.push(id);
    }
    function serializeErrorValue(request, error) {
      var env = (0, request.environmentName)();
      try {
        var message = String(error.message);
        var stack = filterStackTrace(request, error, 0);
        var errorEnv = error.environmentName;
        "string" === typeof errorEnv && (env = errorEnv);
      } catch (x) {
        (message =
          "An error occurred but serializing the error message failed."),
          (stack = []);
      }
      return (
        "$Z" +
        outlineModel(request, {
          message: message,
          stack: stack,
          env: env
        }).toString(16)
      );
    }
    function emitErrorChunk(request, id, digest, error) {
      var env = (0, request.environmentName)();
      try {
        if (error instanceof Error) {
          var message = String(error.message);
          var stack = filterStackTrace(request, error, 0);
          var errorEnv = error.environmentName;
          "string" === typeof errorEnv && (env = errorEnv);
        } else
          (message =
            "object" === typeof error && null !== error
              ? describeObjectForErrorMessage(error)
              : String(error)),
            (stack = []);
      } catch (x) {
        (message =
          "An error occurred but serializing the error message failed."),
          (stack = []);
      }
      digest = { digest: digest, message: message, stack: stack, env: env };
      id = id.toString(16) + ":E" + stringify(digest) + "\n";
      request.completedErrorChunks.push(id);
    }
    function emitSymbolChunk(request, id, name) {
      id = encodeReferenceChunk(request, id, "$S" + name);
      request.completedImportChunks.push(id);
    }
    function emitModelChunk(request, id, json) {
      id = id.toString(16) + ":" + json + "\n";
      request.completedRegularChunks.push(id);
    }
    function emitDebugChunk(request, id, debugInfo) {
      var counter = { objectLimit: 500 };
      debugInfo = stringify(debugInfo, function (parentPropertyName, value) {
        return renderConsoleValue(
          request,
          counter,
          this,
          parentPropertyName,
          value
        );
      });
      id = id.toString(16) + ":D" + debugInfo + "\n";
      request.completedRegularChunks.push(id);
    }
    function outlineComponentInfo(request, componentInfo) {
      if (!request.writtenObjects.has(componentInfo)) {
        null != componentInfo.owner &&
          outlineComponentInfo(request, componentInfo.owner);
        var objectLimit = 10;
        null != componentInfo.stack &&
          (objectLimit += componentInfo.stack.length);
        objectLimit = { objectLimit: objectLimit };
        var componentDebugInfo = {
          name: componentInfo.name,
          env: componentInfo.env,
          key: componentInfo.key,
          owner: componentInfo.owner
        };
        componentDebugInfo.stack = componentInfo.stack;
        componentDebugInfo.props = componentInfo.props;
        objectLimit = outlineConsoleValue(
          request,
          objectLimit,
          componentDebugInfo
        );
        request.writtenObjects.set(
          componentInfo,
          serializeByValueID$1(objectLimit)
        );
      }
    }
    function emitTypedArrayChunk(request, id, tag, typedArray) {
      TaintRegistryByteLengths.has(typedArray.byteLength) &&
        ((id = TaintRegistryValues.get(
          String.fromCharCode.apply(
            String,
            new Uint8Array(
              typedArray.buffer,
              typedArray.byteOffset,
              typedArray.byteLength
            )
          )
        )),
        void 0 !== id && throwTaintViolation(id.message));
      request.pendingChunks++;
      throw Error("Not implemented.");
    }
    function renderConsoleValue(
      request,
      counter,
      parent,
      parentPropertyName,
      value
    ) {
      if (null === value) return null;
      if (value === REACT_ELEMENT_TYPE) return "$";
      if ("object" === typeof value) {
        if (isClientReference(value))
          return serializeClientReference(
            request,
            parent,
            parentPropertyName,
            value
          );
        if (
          void 0 !== request.temporaryReferences &&
          ((parent = request.temporaryReferences.get(value)), void 0 !== parent)
        )
          return "$T" + parent;
        parent = request.writtenObjects.get(value);
        if (void 0 !== parent) return parent;
        if (0 >= counter.objectLimit && !doNotLimit.has(value)) return "$Y";
        counter.objectLimit--;
        switch (value.$$typeof) {
          case REACT_ELEMENT_TYPE:
            null != value._owner && outlineComponentInfo(request, value._owner);
            "object" === typeof value.type &&
              null !== value.type &&
              doNotLimit.add(value.type);
            "object" === typeof value.key &&
              null !== value.key &&
              doNotLimit.add(value.key);
            doNotLimit.add(value.props);
            null !== value._owner && doNotLimit.add(value._owner);
            counter = null;
            if (null != value._debugStack)
              for (
                counter = filterStackTrace(request, value._debugStack, 1),
                  doNotLimit.add(counter),
                  request = 0;
                request < counter.length;
                request++
              )
                doNotLimit.add(counter[request]);
            return [
              REACT_ELEMENT_TYPE,
              value.type,
              value.key,
              value.props,
              value._owner,
              counter,
              value._store.validated
            ];
        }
        if ("function" === typeof value.then) {
          switch (value.status) {
            case "fulfilled":
              return (
                "$@" +
                outlineConsoleValue(request, counter, value.value).toString(16)
              );
            case "rejected":
              return (
                (counter = value.reason),
                request.pendingChunks++,
                (value = request.nextChunkId++),
                "object" === typeof counter &&
                null !== counter &&
                counter.$$typeof === REACT_POSTPONE_TYPE
                  ? emitPostponeChunk(request, value, counter)
                  : emitErrorChunk(request, value, "", counter),
                "$@" + value.toString(16)
              );
          }
          return "$@";
        }
        if (isArrayImpl(value)) return value;
        if (value instanceof Map) {
          value = Array.from(value);
          counter.objectLimit++;
          for (parent = 0; parent < value.length; parent++) {
            var entry = value[parent];
            doNotLimit.add(entry);
            parentPropertyName = entry[0];
            entry = entry[1];
            "object" === typeof parentPropertyName &&
              null !== parentPropertyName &&
              doNotLimit.add(parentPropertyName);
            "object" === typeof entry &&
              null !== entry &&
              doNotLimit.add(entry);
          }
          return (
            "$Q" + outlineConsoleValue(request, counter, value).toString(16)
          );
        }
        if (value instanceof Set) {
          value = Array.from(value);
          counter.objectLimit++;
          for (parent = 0; parent < value.length; parent++)
            (parentPropertyName = value[parent]),
              "object" === typeof parentPropertyName &&
                null !== parentPropertyName &&
                doNotLimit.add(parentPropertyName);
          return (
            "$W" + outlineConsoleValue(request, counter, value).toString(16)
          );
        }
        return "function" === typeof FormData && value instanceof FormData
          ? serializeFormData(request, value)
          : value instanceof Error
            ? serializeErrorValue(request, value)
            : value instanceof ArrayBuffer
              ? serializeTypedArray(request, "A", new Uint8Array(value))
              : value instanceof Int8Array
                ? serializeTypedArray(request, "O", value)
                : value instanceof Uint8Array
                  ? serializeTypedArray(request, "o", value)
                  : value instanceof Uint8ClampedArray
                    ? serializeTypedArray(request, "U", value)
                    : value instanceof Int16Array
                      ? serializeTypedArray(request, "S", value)
                      : value instanceof Uint16Array
                        ? serializeTypedArray(request, "s", value)
                        : value instanceof Int32Array
                          ? serializeTypedArray(request, "L", value)
                          : value instanceof Uint32Array
                            ? serializeTypedArray(request, "l", value)
                            : value instanceof Float32Array
                              ? serializeTypedArray(request, "G", value)
                              : value instanceof Float64Array
                                ? serializeTypedArray(request, "g", value)
                                : value instanceof BigInt64Array
                                  ? serializeTypedArray(request, "M", value)
                                  : value instanceof BigUint64Array
                                    ? serializeTypedArray(request, "m", value)
                                    : value instanceof DataView
                                      ? serializeTypedArray(request, "V", value)
                                      : "function" === typeof Blob &&
                                          value instanceof Blob
                                        ? serializeBlob(request, value)
                                        : getIteratorFn(value)
                                          ? Array.from(value)
                                          : value;
      }
      if ("string" === typeof value) {
        if (
          "Z" === value[value.length - 1] &&
          parent[parentPropertyName] instanceof Date
        )
          request = "$D" + value;
        else {
          if (1024 <= value.length)
            throw (
              (request.pendingChunks++,
              request.nextChunkId++,
              Error(
                "Existence of byteLengthOfChunk should have already been checked. This is a bug in React."
              ))
            );
          request = "$" === value[0] ? "$" + value : value;
        }
        return request;
      }
      if ("boolean" === typeof value) return value;
      if ("number" === typeof value) return serializeNumber$1(value);
      if ("undefined" === typeof value) return "$undefined";
      if ("function" === typeof value)
        return isClientReference(value)
          ? serializeClientReference(request, parent, parentPropertyName, value)
          : void 0 !== request.temporaryReferences &&
              ((request = request.temporaryReferences.get(value)),
              void 0 !== request)
            ? "$T" + request
            : "$E(" + (Function.prototype.toString.call(value) + ")");
      if ("symbol" === typeof value) {
        counter = request.writtenSymbols.get(value);
        if (void 0 !== counter) return serializeByValueID$1(counter);
        counter = value.description;
        request.pendingChunks++;
        value = request.nextChunkId++;
        emitSymbolChunk(request, value, counter);
        return serializeByValueID$1(value);
      }
      return "bigint" === typeof value
        ? "$n" + value.toString(10)
        : value instanceof Date
          ? "$D" + value.toJSON()
          : "unknown type " + typeof value;
    }
    function outlineConsoleValue(request, counter, model) {
      function replacer(parentPropertyName, value) {
        try {
          return renderConsoleValue(
            request,
            counter,
            this,
            parentPropertyName,
            value
          );
        } catch (x) {
          return (
            "Unknown Value: React could not send it from the server.\n" +
            x.message
          );
        }
      }
      "object" === typeof model && null !== model && doNotLimit.add(model);
      try {
        var json = stringify(model, replacer);
      } catch (x) {
        json = stringify(
          "Unknown Value: React could not send it from the server.\n" +
            x.message
        );
      }
      request.pendingChunks++;
      model = request.nextChunkId++;
      json = model.toString(16) + ":" + json + "\n";
      request.completedRegularChunks.push(json);
      return model;
    }
    function emitConsoleChunk(
      request,
      id,
      methodName,
      owner,
      stackTrace,
      args
    ) {
      function replacer(parentPropertyName, value) {
        try {
          return renderConsoleValue(
            request,
            counter,
            this,
            parentPropertyName,
            value
          );
        } catch (x) {
          return (
            "Unknown Value: React could not send it from the server.\n" +
            x.message
          );
        }
      }
      var counter = { objectLimit: 500 };
      null != owner && outlineComponentInfo(request, owner);
      var env = (0, request.environmentName)(),
        payload = [methodName, stackTrace, owner, env];
      payload.push.apply(payload, args);
      try {
        var json = stringify(payload, replacer);
      } catch (x) {
        json = stringify(
          [
            methodName,
            stackTrace,
            owner,
            env,
            "Unknown Value: React could not send it from the server.",
            x
          ],
          replacer
        );
      }
      id = id.toString(16) + ":W" + json + "\n";
      request.completedRegularChunks.push(id);
    }
    function forwardDebugInfo(request, id, debugInfo) {
      for (var i = 0; i < debugInfo.length; i++)
        request.pendingChunks++,
          "string" === typeof debugInfo[i].name &&
            outlineComponentInfo(request, debugInfo[i]),
          emitDebugChunk(request, id, debugInfo[i]);
    }
    function emitChunk(request, task, value) {
      var id = task.id;
      value instanceof ArrayBuffer
        ? emitTypedArrayChunk(request, id, "A", new Uint8Array(value))
        : value instanceof Int8Array
          ? emitTypedArrayChunk(request, id, "O", value)
          : value instanceof Uint8Array
            ? emitTypedArrayChunk(request, id, "o", value)
            : value instanceof Uint8ClampedArray
              ? emitTypedArrayChunk(request, id, "U", value)
              : value instanceof Int16Array
                ? emitTypedArrayChunk(request, id, "S", value)
                : value instanceof Uint16Array
                  ? emitTypedArrayChunk(request, id, "s", value)
                  : value instanceof Int32Array
                    ? emitTypedArrayChunk(request, id, "L", value)
                    : value instanceof Uint32Array
                      ? emitTypedArrayChunk(request, id, "l", value)
                      : value instanceof Float32Array
                        ? emitTypedArrayChunk(request, id, "G", value)
                        : value instanceof Float64Array
                          ? emitTypedArrayChunk(request, id, "g", value)
                          : value instanceof BigInt64Array
                            ? emitTypedArrayChunk(request, id, "M", value)
                            : value instanceof BigUint64Array
                              ? emitTypedArrayChunk(request, id, "m", value)
                              : value instanceof DataView
                                ? emitTypedArrayChunk(request, id, "V", value)
                                : ((value = stringify(value, task.toJSON)),
                                  emitModelChunk(request, task.id, value));
    }
    function retryTask$1(request, task) {
      if (task.status === PENDING$3) {
        var prevDebugID = debugID;
        task.status = RENDERING$1;
        try {
          modelRoot = task.model;
          debugID = task.id;
          var resolvedModel = renderModelDestructive(
            request,
            task,
            emptyRoot,
            "",
            task.model
          );
          debugID = null;
          modelRoot = resolvedModel;
          task.keyPath = null;
          task.implicitSlot = !1;
          if ("object" === typeof resolvedModel && null !== resolvedModel) {
            request.writtenObjects.set(
              resolvedModel,
              serializeByValueID$1(task.id)
            );
            var currentEnv = (0, request.environmentName)();
            currentEnv !== task.environmentName &&
              (request.pendingChunks++,
              emitDebugChunk(request, task.id, { env: currentEnv }));
            emitChunk(request, task, resolvedModel);
          } else {
            var json = stringify(resolvedModel),
              _currentEnv = (0, request.environmentName)();
            _currentEnv !== task.environmentName &&
              (request.pendingChunks++,
              emitDebugChunk(request, task.id, { env: _currentEnv }));
            emitModelChunk(request, task.id, json);
          }
          request.abortableTasks.delete(task);
          task.status = COMPLETED$1;
        } catch (thrownValue) {
          if (request.status === ABORTING$1)
            if (
              (request.abortableTasks.delete(task),
              (task.status = ABORTED$1),
              request.type === PRERENDER)
            )
              request.pendingChunks--;
            else {
              var model = stringify(serializeByValueID$1(request.fatalError));
              emitModelChunk(request, task.id, model);
            }
          else {
            var x =
              thrownValue === SuspenseException$1
                ? getSuspendedThenable$1()
                : thrownValue;
            if ("object" === typeof x && null !== x) {
              if ("function" === typeof x.then) {
                task.status = PENDING$3;
                task.thenableState = getThenableStateAfterSuspending$1();
                var ping = task.ping;
                x.then(ping, ping);
                return;
              }
              if (x.$$typeof === REACT_POSTPONE_TYPE) {
                request.abortableTasks.delete(task);
                task.status = ERRORED$2;
                logPostpone$1(request, x.message, task);
                emitPostponeChunk(request, task.id, x);
                return;
              }
            }
            request.abortableTasks.delete(task);
            task.status = ERRORED$2;
            var digest = logRecoverableError$1(request, x, task);
            emitErrorChunk(request, task.id, digest, x);
          }
        } finally {
          debugID = prevDebugID;
        }
      }
    }
    function tryStreamTask(request, task) {
      var prevDebugID = debugID;
      debugID = null;
      try {
        emitChunk(request, task, task.model);
      } finally {
        debugID = prevDebugID;
      }
    }
    function performWork$1(request) {
      var prevDispatcher = ReactSharedInternalsServer.H;
      ReactSharedInternalsServer.H = HooksDispatcher$1;
      var prevRequest = currentRequest;
      currentRequest$1 = currentRequest = request;
      var hadAbortableTasks = 0 < request.abortableTasks.size;
      try {
        var pingedTasks = request.pingedTasks;
        request.pingedTasks = [];
        for (var i = 0; i < pingedTasks.length; i++)
          retryTask$1(request, pingedTasks[i]);
        null !== request.destination &&
          flushCompletedChunks(request, request.destination);
        if (hadAbortableTasks && 0 === request.abortableTasks.size) {
          var onAllReady = request.onAllReady;
          onAllReady();
        }
      } catch (error) {
        logRecoverableError$1(request, error, null),
          fatalError$1(request, error);
      } finally {
        (ReactSharedInternalsServer.H = prevDispatcher),
          (currentRequest$1 = null),
          (currentRequest = prevRequest);
      }
    }
    function abortTask$1(task, request, errorId) {
      task.status !== RENDERING$1 &&
        ((task.status = ABORTED$1),
        (errorId = serializeByValueID$1(errorId)),
        (task = encodeReferenceChunk(request, task.id, errorId)),
        request.completedErrorChunks.push(task));
    }
    function flushCompletedChunks(request, destination) {
      try {
        for (
          var importsChunks = request.completedImportChunks, i = 0;
          i < importsChunks.length;
          i++
        )
          if ((request.pendingChunks--, !destination.push(importsChunks[i]))) {
            request.destination = null;
            i++;
            break;
          }
        importsChunks.splice(0, i);
        var hintChunks = request.completedHintChunks;
        for (i = 0; i < hintChunks.length; i++)
          if (!destination.push(hintChunks[i])) {
            request.destination = null;
            i++;
            break;
          }
        hintChunks.splice(0, i);
        var regularChunks = request.completedRegularChunks;
        for (i = 0; i < regularChunks.length; i++)
          if ((request.pendingChunks--, !destination.push(regularChunks[i]))) {
            request.destination = null;
            i++;
            break;
          }
        regularChunks.splice(0, i);
        var errorChunks = request.completedErrorChunks;
        for (i = 0; i < errorChunks.length; i++)
          if ((request.pendingChunks--, !destination.push(errorChunks[i]))) {
            request.destination = null;
            i++;
            break;
          }
        errorChunks.splice(0, i);
      } finally {
        request.flushScheduled = !1;
      }
      0 === request.pendingChunks &&
        (cleanupTaintQueue(request),
        (request.status = CLOSED$1),
        destination.push(null),
        (request.destination = null));
    }
    function startWork$1(request) {
      request.flushScheduled = null !== request.destination;
      performWork$1(request);
      request.status === OPENING$1 && (request.status = 11);
    }
    function enqueueFlush(request) {
      if (
        !1 === request.flushScheduled &&
        0 === request.pingedTasks.length &&
        null !== request.destination
      ) {
        request.flushScheduled = !1;
        var destination = request.destination;
        destination && flushCompletedChunks(request, destination);
      }
    }
    function startFlowing$1(request, destination) {
      if (request.status === CLOSING$1)
        (request.status = CLOSED$1), destination.destroy(request.fatalError);
      else if (request.status !== CLOSED$1 && null === request.destination) {
        request.destination = destination;
        try {
          flushCompletedChunks(request, destination);
        } catch (error) {
          logRecoverableError$1(request, error, null),
            fatalError$1(request, error);
        }
      }
    }
    function abort$1(request, reason) {
      try {
        11 >= request.status && (request.status = ABORTING$1);
        var abortableTasks = request.abortableTasks;
        if (0 < abortableTasks.size) {
          if (
            "object" === typeof reason &&
            null !== reason &&
            reason.$$typeof === REACT_POSTPONE_TYPE
          )
            if (
              (logPostpone$1(request, reason.message, null),
              request.type === PRERENDER)
            )
              abortableTasks.forEach(function (task) {
                task.status !== RENDERING$1 &&
                  ((task.status = ABORTED$1), request.pendingChunks--);
              });
            else {
              var errorId = request.nextChunkId++;
              request.fatalError = errorId;
              request.pendingChunks++;
              emitPostponeChunk(request, errorId, reason);
              abortableTasks.forEach(function (task) {
                return abortTask$1(task, request, errorId);
              });
            }
          else {
            var error =
                void 0 === reason
                  ? Error(
                      "The render was aborted by the server without a reason."
                    )
                  : "object" === typeof reason &&
                      null !== reason &&
                      "function" === typeof reason.then
                    ? Error(
                        "The render was aborted by the server with a promise."
                      )
                    : reason,
              digest = logRecoverableError$1(request, error, null);
            if (request.type === PRERENDER)
              abortableTasks.forEach(function (task) {
                task.status !== RENDERING$1 &&
                  ((task.status = ABORTED$1), request.pendingChunks--);
              });
            else {
              var _errorId2 = request.nextChunkId++;
              request.fatalError = _errorId2;
              request.pendingChunks++;
              emitErrorChunk(request, _errorId2, digest, error);
              abortableTasks.forEach(function (task) {
                return abortTask$1(task, request, _errorId2);
              });
            }
          }
          abortableTasks.clear();
          var onAllReady = request.onAllReady;
          onAllReady();
        }
        var abortListeners = request.abortListeners;
        if (0 < abortListeners.size) {
          var _error =
            "object" === typeof reason &&
            null !== reason &&
            reason.$$typeof === REACT_POSTPONE_TYPE
              ? Error("The render was aborted due to being postponed.")
              : void 0 === reason
                ? Error(
                    "The render was aborted by the server without a reason."
                  )
                : "object" === typeof reason &&
                    null !== reason &&
                    "function" === typeof reason.then
                  ? Error(
                      "The render was aborted by the server with a promise."
                    )
                  : reason;
          abortListeners.forEach(function (callback) {
            return callback(_error);
          });
          abortListeners.clear();
        }
        null !== request.destination &&
          flushCompletedChunks(request, request.destination);
      } catch (error$4) {
        logRecoverableError$1(request, error$4, null),
          fatalError$1(request, error$4);
      }
    }
    function bindToConsole(methodName, args, badgeName) {
      var offset = 0;
      switch (methodName) {
        case "dir":
        case "dirxml":
        case "groupEnd":
        case "table":
          return bind$1.apply(console[methodName], [console].concat(args));
        case "assert":
          offset = 1;
      }
      args = args.slice(0);
      "string" === typeof args[offset]
        ? args.splice(offset, 1, "[%s] " + args[offset], " " + badgeName + " ")
        : args.splice(offset, 0, "[%s] ", " " + badgeName + " ");
      args.unshift(console);
      return bind$1.apply(console[methodName], args);
    }
    function serializeNumber(number) {
      return Number.isFinite(number)
        ? 0 === number && -Infinity === 1 / number
          ? "$-0"
          : number
        : Infinity === number
          ? "$Infinity"
          : -Infinity === number
            ? "$-Infinity"
            : "$NaN";
    }
    function processReply(
      root,
      formFieldPrefix,
      temporaryReferences,
      resolve,
      reject
    ) {
      function serializeTypedArray(tag, typedArray) {
        typedArray = new Blob([
          new Uint8Array(
            typedArray.buffer,
            typedArray.byteOffset,
            typedArray.byteLength
          )
        ]);
        var blobId = nextPartId++;
        null === formData && (formData = new FormData());
        formData.append(formFieldPrefix + blobId, typedArray);
        return "$" + tag + blobId.toString(16);
      }
      function serializeBinaryReader(reader) {
        function progress(entry) {
          entry.done
            ? ((entry = nextPartId++),
              data.append(formFieldPrefix + entry, new Blob(buffer)),
              data.append(
                formFieldPrefix + streamId,
                '"$o' + entry.toString(16) + '"'
              ),
              data.append(formFieldPrefix + streamId, "C"),
              pendingParts--,
              0 === pendingParts && resolve(data))
            : (buffer.push(entry.value),
              reader.read(new Uint8Array(1024)).then(progress, reject));
        }
        null === formData && (formData = new FormData());
        var data = formData;
        pendingParts++;
        var streamId = nextPartId++,
          buffer = [];
        reader.read(new Uint8Array(1024)).then(progress, reject);
        return "$r" + streamId.toString(16);
      }
      function serializeReader(reader) {
        function progress(entry) {
          if (entry.done)
            data.append(formFieldPrefix + streamId, "C"),
              pendingParts--,
              0 === pendingParts && resolve(data);
          else
            try {
              var partJSON = JSON.stringify(entry.value, resolveToJSON);
              data.append(formFieldPrefix + streamId, partJSON);
              reader.read().then(progress, reject);
            } catch (x) {
              reject(x);
            }
        }
        null === formData && (formData = new FormData());
        var data = formData;
        pendingParts++;
        var streamId = nextPartId++;
        reader.read().then(progress, reject);
        return "$R" + streamId.toString(16);
      }
      function serializeReadableStream(stream) {
        try {
          var binaryReader = stream.getReader({ mode: "byob" });
        } catch (x) {
          return serializeReader(stream.getReader());
        }
        return serializeBinaryReader(binaryReader);
      }
      function serializeAsyncIterable(iterable, iterator) {
        function progress(entry) {
          if (entry.done) {
            if (void 0 === entry.value)
              data.append(formFieldPrefix + streamId, "C");
            else
              try {
                var partJSON = JSON.stringify(entry.value, resolveToJSON);
                data.append(formFieldPrefix + streamId, "C" + partJSON);
              } catch (x) {
                reject(x);
                return;
              }
            pendingParts--;
            0 === pendingParts && resolve(data);
          } else
            try {
              var _partJSON = JSON.stringify(entry.value, resolveToJSON);
              data.append(formFieldPrefix + streamId, _partJSON);
              iterator.next().then(progress, reject);
            } catch (x$5) {
              reject(x$5);
            }
        }
        null === formData && (formData = new FormData());
        var data = formData;
        pendingParts++;
        var streamId = nextPartId++;
        iterable = iterable === iterator;
        iterator.next().then(progress, reject);
        return "$" + (iterable ? "x" : "X") + streamId.toString(16);
      }
      function resolveToJSON(key, value) {
        var originalValue$jscomp$0 = this[key];
        "object" !== typeof originalValue$jscomp$0 ||
          originalValue$jscomp$0 === value ||
          originalValue$jscomp$0 instanceof Date ||
          ("Object" !== objectName(originalValue$jscomp$0)
            ? console.error(
                "Only plain objects can be passed to Server Functions from the Client. %s objects are not supported.%s",
                objectName(originalValue$jscomp$0),
                describeObjectForErrorMessage(this, key)
              )
            : console.error(
                "Only plain objects can be passed to Server Functions from the Client. Objects with toJSON methods are not supported. Convert it manually to a simple value before passing it to props.%s",
                describeObjectForErrorMessage(this, key)
              ));
        if (null === value) return null;
        if ("object" === typeof value) {
          switch (value.$$typeof) {
            case REACT_ELEMENT_TYPE:
              if (void 0 !== temporaryReferences && -1 === key.indexOf(":")) {
                var parentReference = writtenObjects.get(this);
                if (void 0 !== parentReference)
                  return (
                    temporaryReferences.set(parentReference + ":" + key, value),
                    "$T"
                  );
              }
              throw Error(
                "React Element cannot be passed to Server Functions from the Client without a temporary reference set. Pass a TemporaryReferenceSet to the options." +
                  describeObjectForErrorMessage(this, key)
              );
            case REACT_LAZY_TYPE:
              originalValue$jscomp$0 = value._payload;
              var init = value._init;
              null === formData && (formData = new FormData());
              pendingParts++;
              try {
                parentReference = init(originalValue$jscomp$0);
                var lazyId = nextPartId++,
                  partJSON = serializeModel(parentReference, lazyId);
                formData.append(formFieldPrefix + lazyId, partJSON);
                return "$" + lazyId.toString(16);
              } catch (x) {
                if (
                  "object" === typeof x &&
                  null !== x &&
                  "function" === typeof x.then
                ) {
                  pendingParts++;
                  var _lazyId = nextPartId++;
                  parentReference = function () {
                    try {
                      var _partJSON2 = serializeModel(value, _lazyId),
                        _data = formData;
                      _data.append(formFieldPrefix + _lazyId, _partJSON2);
                      pendingParts--;
                      0 === pendingParts && resolve(_data);
                    } catch (reason) {
                      reject(reason);
                    }
                  };
                  x.then(parentReference, parentReference);
                  return "$" + _lazyId.toString(16);
                }
                reject(x);
                return null;
              } finally {
                pendingParts--;
              }
          }
          if ("function" === typeof value.then) {
            null === formData && (formData = new FormData());
            pendingParts++;
            var promiseId = nextPartId++;
            value.then(function (partValue) {
              try {
                var _partJSON3 = serializeModel(partValue, promiseId);
                partValue = formData;
                partValue.append(formFieldPrefix + promiseId, _partJSON3);
                pendingParts--;
                0 === pendingParts && resolve(partValue);
              } catch (reason) {
                reject(reason);
              }
            }, reject);
            return "$@" + promiseId.toString(16);
          }
          parentReference = writtenObjects.get(value);
          if (void 0 !== parentReference)
            if (modelRoot === value) modelRoot = null;
            else return parentReference;
          else
            -1 === key.indexOf(":") &&
              ((parentReference = writtenObjects.get(this)),
              void 0 !== parentReference &&
                ((parentReference = parentReference + ":" + key),
                writtenObjects.set(value, parentReference),
                void 0 !== temporaryReferences &&
                  temporaryReferences.set(parentReference, value)));
          if (isArrayImpl(value)) return value;
          if (value instanceof FormData) {
            null === formData && (formData = new FormData());
            var _data3 = formData;
            key = nextPartId++;
            var prefix = formFieldPrefix + key + "_";
            value.forEach(function (originalValue, originalKey) {
              _data3.append(prefix + originalKey, originalValue);
            });
            return "$K" + key.toString(16);
          }
          if (value instanceof Map)
            return (
              (key = nextPartId++),
              (parentReference = serializeModel(Array.from(value), key)),
              null === formData && (formData = new FormData()),
              formData.append(formFieldPrefix + key, parentReference),
              "$Q" + key.toString(16)
            );
          if (value instanceof Set)
            return (
              (key = nextPartId++),
              (parentReference = serializeModel(Array.from(value), key)),
              null === formData && (formData = new FormData()),
              formData.append(formFieldPrefix + key, parentReference),
              "$W" + key.toString(16)
            );
          if (value instanceof ArrayBuffer)
            return (
              (key = new Blob([value])),
              (parentReference = nextPartId++),
              null === formData && (formData = new FormData()),
              formData.append(formFieldPrefix + parentReference, key),
              "$A" + parentReference.toString(16)
            );
          if (value instanceof Int8Array)
            return serializeTypedArray("O", value);
          if (value instanceof Uint8Array)
            return serializeTypedArray("o", value);
          if (value instanceof Uint8ClampedArray)
            return serializeTypedArray("U", value);
          if (value instanceof Int16Array)
            return serializeTypedArray("S", value);
          if (value instanceof Uint16Array)
            return serializeTypedArray("s", value);
          if (value instanceof Int32Array)
            return serializeTypedArray("L", value);
          if (value instanceof Uint32Array)
            return serializeTypedArray("l", value);
          if (value instanceof Float32Array)
            return serializeTypedArray("G", value);
          if (value instanceof Float64Array)
            return serializeTypedArray("g", value);
          if (value instanceof BigInt64Array)
            return serializeTypedArray("M", value);
          if (value instanceof BigUint64Array)
            return serializeTypedArray("m", value);
          if (value instanceof DataView) return serializeTypedArray("V", value);
          if ("function" === typeof Blob && value instanceof Blob)
            return (
              null === formData && (formData = new FormData()),
              (key = nextPartId++),
              formData.append(formFieldPrefix + key, value),
              "$B" + key.toString(16)
            );
          if ((parentReference = getIteratorFn(value)))
            return (
              (parentReference = parentReference.call(value)),
              parentReference === value
                ? ((key = nextPartId++),
                  (parentReference = serializeModel(
                    Array.from(parentReference),
                    key
                  )),
                  null === formData && (formData = new FormData()),
                  formData.append(formFieldPrefix + key, parentReference),
                  "$i" + key.toString(16))
                : Array.from(parentReference)
            );
          if (
            "function" === typeof ReadableStream &&
            value instanceof ReadableStream
          )
            return serializeReadableStream(value);
          parentReference = value[ASYNC_ITERATOR];
          if ("function" === typeof parentReference)
            return serializeAsyncIterable(value, parentReference.call(value));
          parentReference = getPrototypeOf(value);
          if (
            parentReference !== ObjectPrototype &&
            (null === parentReference ||
              null !== getPrototypeOf(parentReference))
          ) {
            if (void 0 === temporaryReferences)
              throw Error(
                "Only plain objects, and a few built-ins, can be passed to Server Actions. Classes or null prototypes are not supported." +
                  describeObjectForErrorMessage(this, key)
              );
            return "$T";
          }
          value.$$typeof === REACT_CONTEXT_TYPE
            ? console.error(
                "React Context Providers cannot be passed to Server Functions from the Client.%s",
                describeObjectForErrorMessage(this, key)
              )
            : "Object" !== objectName(value)
              ? console.error(
                  "Only plain objects can be passed to Server Functions from the Client. %s objects are not supported.%s",
                  objectName(value),
                  describeObjectForErrorMessage(this, key)
                )
              : isSimpleObject(value)
                ? Object.getOwnPropertySymbols &&
                  ((parentReference = Object.getOwnPropertySymbols(value)),
                  0 < parentReference.length &&
                    console.error(
                      "Only plain objects can be passed to Server Functions from the Client. Objects with symbol properties like %s are not supported.%s",
                      parentReference[0].description,
                      describeObjectForErrorMessage(this, key)
                    ))
                : console.error(
                    "Only plain objects can be passed to Server Functions from the Client. Classes or other objects with methods are not supported.%s",
                    describeObjectForErrorMessage(this, key)
                  );
          return value;
        }
        if ("string" === typeof value) {
          if ("Z" === value[value.length - 1] && this[key] instanceof Date)
            return "$D" + value;
          key = "$" === value[0] ? "$" + value : value;
          return key;
        }
        if ("boolean" === typeof value) return value;
        if ("number" === typeof value) return serializeNumber(value);
        if ("undefined" === typeof value) return "$undefined";
        if ("function" === typeof value) {
          parentReference = knownServerReferences.get(value);
          if (void 0 !== parentReference)
            return (
              (key = JSON.stringify(parentReference, resolveToJSON)),
              null === formData && (formData = new FormData()),
              (parentReference = nextPartId++),
              formData.set(formFieldPrefix + parentReference, key),
              "$F" + parentReference.toString(16)
            );
          if (
            void 0 !== temporaryReferences &&
            -1 === key.indexOf(":") &&
            ((parentReference = writtenObjects.get(this)),
            void 0 !== parentReference)
          )
            return (
              temporaryReferences.set(parentReference + ":" + key, value), "$T"
            );
          throw Error(
            "Client Functions cannot be passed directly to Server Functions. Only Functions passed from the Server can be passed back again."
          );
        }
        if ("symbol" === typeof value) {
          if (
            void 0 !== temporaryReferences &&
            -1 === key.indexOf(":") &&
            ((parentReference = writtenObjects.get(this)),
            void 0 !== parentReference)
          )
            return (
              temporaryReferences.set(parentReference + ":" + key, value), "$T"
            );
          throw Error(
            "Symbols cannot be passed to a Server Function without a temporary reference set. Pass a TemporaryReferenceSet to the options." +
              describeObjectForErrorMessage(this, key)
          );
        }
        if ("bigint" === typeof value) return "$n" + value.toString(10);
        throw Error(
          "Type " +
            typeof value +
            " is not supported as an argument to a Server Function."
        );
      }
      function serializeModel(model, id) {
        "object" === typeof model &&
          null !== model &&
          ((id = "$" + id.toString(16)),
          writtenObjects.set(model, id),
          void 0 !== temporaryReferences && temporaryReferences.set(id, model));
        modelRoot = model;
        return JSON.stringify(model, resolveToJSON);
      }
      var nextPartId = 1,
        pendingParts = 0,
        formData = null,
        writtenObjects = new WeakMap(),
        modelRoot = root,
        json = serializeModel(root, 0);
      null === formData
        ? resolve(json)
        : (formData.set(formFieldPrefix + "0", json),
          0 === pendingParts && resolve(formData));
      return function () {
        0 < pendingParts &&
          ((pendingParts = 0),
          null === formData ? resolve(json) : resolve(formData));
      };
    }
    function encodeFormData(reference) {
      var resolve,
        reject,
        thenable = new Promise(function (res, rej) {
          resolve = res;
          reject = rej;
        });
      processReply(
        reference,
        "",
        void 0,
        function (body) {
          if ("string" === typeof body) {
            var data = new FormData();
            data.append("0", body);
            body = data;
          }
          thenable.status = "fulfilled";
          thenable.value = body;
          resolve(body);
        },
        function (e) {
          thenable.status = "rejected";
          thenable.reason = e;
          reject(e);
        }
      );
      return thenable;
    }
    function defaultEncodeFormAction(identifierPrefix) {
      var reference = knownServerReferences.get(this);
      if (!reference)
        throw Error(
          "Tried to encode a Server Action from a different instance than the encoder is from. This is a bug in React."
        );
      var data = null;
      if (null !== reference.bound) {
        data = boundCache.get(reference);
        data ||
          ((data = encodeFormData(reference)), boundCache.set(reference, data));
        if ("rejected" === data.status) throw data.reason;
        if ("fulfilled" !== data.status) throw data;
        reference = data.value;
        var prefixedData = new FormData();
        reference.forEach(function (value, key) {
          prefixedData.append("$ACTION_" + identifierPrefix + ":" + key, value);
        });
        data = prefixedData;
        reference = "$ACTION_REF_" + identifierPrefix;
      } else reference = "$ACTION_ID_" + reference.id;
      return {
        name: reference,
        method: "POST",
        encType: "multipart/form-data",
        data: data
      };
    }
    function isSignatureEqual(referenceId, numberOfBoundArgs) {
      var reference = knownServerReferences.get(this);
      if (!reference)
        throw Error(
          "Tried to encode a Server Action from a different instance than the encoder is from. This is a bug in React."
        );
      if (reference.id !== referenceId) return !1;
      var boundPromise = reference.bound;
      if (null === boundPromise) return 0 === numberOfBoundArgs;
      switch (boundPromise.status) {
        case "fulfilled":
          return boundPromise.value.length === numberOfBoundArgs;
        case "pending":
          throw boundPromise;
        case "rejected":
          throw boundPromise.reason;
        default:
          throw (
            ("string" !== typeof boundPromise.status &&
              ((boundPromise.status = "pending"),
              boundPromise.then(
                function (boundArgs) {
                  boundPromise.status = "fulfilled";
                  boundPromise.value = boundArgs;
                },
                function (error) {
                  boundPromise.status = "rejected";
                  boundPromise.reason = error;
                }
              )),
            boundPromise)
          );
      }
    }
    function createFakeServerFunction(
      name,
      filename,
      sourceMap,
      line,
      col,
      environmentName,
      innerFunction
    ) {
      name || (name = "<anonymous>");
      var encodedName = JSON.stringify(name);
      1 >= line
        ? ((line = encodedName.length + 7),
          (col =
            "s=>({" +
            encodedName +
            " ".repeat(col < line ? 0 : col - line) +
            ":(...args) => s(...args)})\n/* This module is a proxy to a Server Action. Turn on Source Maps to see the server source. */"))
        : (col =
            "/* This module is a proxy to a Server Action. Turn on Source Maps to see the server source. */" +
            "\n".repeat(line - 2) +
            "server=>({" +
            encodedName +
            ":\n" +
            " ".repeat(1 > col ? 0 : col - 1) +
            "(...args) => server(...args)})");
      filename.startsWith("/") && (filename = "file://" + filename);
      sourceMap
        ? ((col +=
            "\n//# sourceURL=rsc://React/" +
            encodeURIComponent(environmentName) +
            "/" +
            filename +
            "?s" +
            fakeServerFunctionIdx++),
          (col += "\n//# sourceMappingURL=" + sourceMap))
        : filename && (col += "\n//# sourceURL=" + filename);
      try {
        return (0, eval)(col)(innerFunction)[name];
      } catch (x) {
        return innerFunction;
      }
    }
    function registerServerReference(
      proxy,
      reference$jscomp$0,
      encodeFormAction
    ) {
      Object.defineProperties(proxy, {
        $$FORM_ACTION: {
          value:
            void 0 === encodeFormAction
              ? defaultEncodeFormAction
              : function () {
                  var reference = knownServerReferences.get(this);
                  if (!reference)
                    throw Error(
                      "Tried to encode a Server Action from a different instance than the encoder is from. This is a bug in React."
                    );
                  var boundPromise = reference.bound;
                  null === boundPromise && (boundPromise = Promise.resolve([]));
                  return encodeFormAction(reference.id, boundPromise);
                }
        },
        $$IS_SIGNATURE_EQUAL: { value: isSignatureEqual },
        bind: { value: bind }
      });
      knownServerReferences.set(proxy, reference$jscomp$0);
    }
    function bind() {
      var newFn = FunctionBind.apply(this, arguments),
        reference = knownServerReferences.get(this);
      if (reference) {
        null != arguments[0] &&
          console.error(
            'Cannot bind "this" of a Server Action. Pass null or undefined as the first argument to .bind().'
          );
        var args = ArraySlice.call(arguments, 1),
          boundPromise = null;
        boundPromise =
          null !== reference.bound
            ? Promise.resolve(reference.bound).then(function (boundArgs) {
                return boundArgs.concat(args);
              })
            : Promise.resolve(args);
        Object.defineProperties(newFn, {
          $$FORM_ACTION: { value: this.$$FORM_ACTION },
          $$IS_SIGNATURE_EQUAL: { value: isSignatureEqual },
          bind: { value: bind }
        });
        knownServerReferences.set(newFn, {
          id: reference.id,
          bound: boundPromise
        });
      }
      return newFn;
    }
    function createBoundServerReference(
      metaData,
      callServer,
      encodeFormAction,
      findSourceMapURL
    ) {
      function action() {
        var args = Array.prototype.slice.call(arguments);
        return bound
          ? "fulfilled" === bound.status
            ? callServer(id, bound.value.concat(args))
            : Promise.resolve(bound).then(function (boundArgs) {
                return callServer(id, boundArgs.concat(args));
              })
          : callServer(id, args);
      }
      var id = metaData.id,
        bound = metaData.bound,
        location = metaData.location;
      if (location) {
        var functionName = metaData.name || "",
          filename = location[1],
          line = location[2];
        location = location[3];
        metaData = metaData.env || "Server";
        findSourceMapURL =
          null == findSourceMapURL
            ? null
            : findSourceMapURL(filename, metaData);
        action = createFakeServerFunction(
          functionName,
          filename,
          findSourceMapURL,
          line,
          location,
          metaData,
          action
        );
      }
      registerServerReference(
        action,
        { id: id, bound: bound },
        encodeFormAction
      );
      return action;
    }
    function getComponentNameFromType(type) {
      if (null == type) return null;
      if ("function" === typeof type)
        return type.$$typeof === REACT_CLIENT_REFERENCE
          ? null
          : type.displayName || type.name || null;
      if ("string" === typeof type) return type;
      switch (type) {
        case REACT_FRAGMENT_TYPE:
          return "Fragment";
        case REACT_PORTAL_TYPE:
          return "Portal";
        case REACT_PROFILER_TYPE:
          return "Profiler";
        case REACT_STRICT_MODE_TYPE:
          return "StrictMode";
        case REACT_SUSPENSE_TYPE:
          return "Suspense";
        case REACT_SUSPENSE_LIST_TYPE:
          return "SuspenseList";
      }
      if ("object" === typeof type)
        switch (
          ("number" === typeof type.tag &&
            console.error(
              "Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."
            ),
          type.$$typeof)
        ) {
          case REACT_CONTEXT_TYPE:
            return (type.displayName || "Context") + ".Provider";
          case REACT_CONSUMER_TYPE:
            return (type._context.displayName || "Context") + ".Consumer";
          case REACT_FORWARD_REF_TYPE:
            var innerType = type.render;
            type = type.displayName;
            type ||
              ((type = innerType.displayName || innerType.name || ""),
              (type = "" !== type ? "ForwardRef(" + type + ")" : "ForwardRef"));
            return type;
          case REACT_MEMO_TYPE:
            return (
              (innerType = type.displayName || null),
              null !== innerType
                ? innerType
                : getComponentNameFromType(type.type) || "Memo"
            );
          case REACT_LAZY_TYPE:
            innerType = type._payload;
            type = type._init;
            try {
              return getComponentNameFromType(type(innerType));
            } catch (x) {}
        }
      return null;
    }
    function ReactPromise(status, value, reason, response) {
      this.status = status;
      this.value = value;
      this.reason = reason;
      this._response = response;
      this._debugInfo = null;
    }
    function readChunk(chunk) {
      switch (chunk.status) {
        case "resolved_model":
          initializeModelChunk(chunk);
          break;
        case "resolved_module":
          initializeModuleChunk(chunk);
      }
      switch (chunk.status) {
        case "fulfilled":
          return chunk.value;
        case "pending":
        case "blocked":
          throw chunk;
        default:
          throw chunk.reason;
      }
    }
    function createPendingChunk(response) {
      return new ReactPromise("pending", null, null, response);
    }
    function wakeChunk(listeners, value) {
      for (var i = 0; i < listeners.length; i++) (0, listeners[i])(value);
    }
    function wakeChunkIfInitialized(chunk, resolveListeners, rejectListeners) {
      switch (chunk.status) {
        case "fulfilled":
          wakeChunk(resolveListeners, chunk.value);
          break;
        case "pending":
        case "blocked":
          if (chunk.value)
            for (var i = 0; i < resolveListeners.length; i++)
              chunk.value.push(resolveListeners[i]);
          else chunk.value = resolveListeners;
          if (chunk.reason) {
            if (rejectListeners)
              for (
                resolveListeners = 0;
                resolveListeners < rejectListeners.length;
                resolveListeners++
              )
                chunk.reason.push(rejectListeners[resolveListeners]);
          } else chunk.reason = rejectListeners;
          break;
        case "rejected":
          rejectListeners && wakeChunk(rejectListeners, chunk.reason);
      }
    }
    function triggerErrorOnChunk(chunk, error) {
      if ("pending" !== chunk.status && "blocked" !== chunk.status)
        chunk.reason.error(error);
      else {
        var listeners = chunk.reason;
        chunk.status = "rejected";
        chunk.reason = error;
        null !== listeners && wakeChunk(listeners, error);
      }
    }
    function createResolvedIteratorResultChunk(response, value, done) {
      return new ReactPromise(
        "resolved_model",
        (done ? '{"done":true,"value":' : '{"done":false,"value":') +
          value +
          "}",
        null,
        response
      );
    }
    function resolveIteratorResultChunk(chunk, value, done) {
      resolveModelChunk(
        chunk,
        (done ? '{"done":true,"value":' : '{"done":false,"value":') +
          value +
          "}"
      );
    }
    function resolveModelChunk(chunk, value) {
      if ("pending" !== chunk.status) chunk.reason.enqueueModel(value);
      else {
        var resolveListeners = chunk.value,
          rejectListeners = chunk.reason;
        chunk.status = "resolved_model";
        chunk.value = value;
        null !== resolveListeners &&
          (initializeModelChunk(chunk),
          wakeChunkIfInitialized(chunk, resolveListeners, rejectListeners));
      }
    }
    function initializeModelChunk(chunk) {
      var prevHandler = initializingHandler;
      initializingHandler = null;
      var resolvedModel = chunk.value;
      chunk.status = "blocked";
      chunk.value = null;
      chunk.reason = null;
      try {
        var value = JSON.parse(resolvedModel, chunk._response._fromJSON),
          resolveListeners = chunk.value;
        null !== resolveListeners &&
          ((chunk.value = null),
          (chunk.reason = null),
          wakeChunk(resolveListeners, value));
        if (null !== initializingHandler) {
          if (initializingHandler.errored) throw initializingHandler.value;
          if (0 < initializingHandler.deps) {
            initializingHandler.value = value;
            initializingHandler.chunk = chunk;
            return;
          }
        }
        chunk.status = "fulfilled";
        chunk.value = value;
      } catch (error) {
        (chunk.status = "rejected"), (chunk.reason = error);
      } finally {
        initializingHandler = prevHandler;
      }
    }
    function initializeModuleChunk(chunk) {
      try {
        throw Error(
          "renderToHTML should not have emitted Client References. This is a bug in React."
        );
      } catch (error) {
        (chunk.status = "rejected"), (chunk.reason = error);
      }
    }
    function reportGlobalError(response, error) {
      response._chunks.forEach(function (chunk) {
        "pending" === chunk.status && triggerErrorOnChunk(chunk, error);
      });
    }
    function nullRefGetter() {
      return null;
    }
    function getTaskName(type) {
      if (type === REACT_FRAGMENT_TYPE) return "<>";
      if ("function" === typeof type) return '"use client"';
      if (
        "object" === typeof type &&
        null !== type &&
        type.$$typeof === REACT_LAZY_TYPE
      )
        return type._init === readChunk ? '"use client"' : "<...>";
      try {
        var name = getComponentNameFromType(type);
        return name ? "<" + name + ">" : "<...>";
      } catch (x) {
        return "<...>";
      }
    }
    function createLazyChunkWrapper(chunk) {
      var lazyType = {
        $$typeof: REACT_LAZY_TYPE,
        _payload: chunk,
        _init: readChunk
      };
      chunk = chunk._debugInfo || (chunk._debugInfo = []);
      lazyType._debugInfo = chunk;
      return lazyType;
    }
    function getChunk(response, id) {
      var chunks = response._chunks,
        chunk = chunks.get(id);
      chunk || ((chunk = createPendingChunk(response)), chunks.set(id, chunk));
      return chunk;
    }
    function waitForReference(
      referencedChunk,
      parentObject,
      key,
      response,
      map,
      path
    ) {
      function fulfill(value) {
        for (var i = 1; i < path.length; i++) {
          for (; value.$$typeof === REACT_LAZY_TYPE; )
            if (((value = value._payload), value === handler.chunk))
              value = handler.value;
            else if ("fulfilled" === value.status) value = value.value;
            else {
              path.splice(0, i - 1);
              value.then(fulfill, reject);
              return;
            }
          value = value[path[i]];
        }
        i = map(response, value, parentObject, key);
        parentObject[key] = i;
        "" === key && null === handler.value && (handler.value = i);
        if (
          parentObject[0] === REACT_ELEMENT_TYPE &&
          "object" === typeof handler.value &&
          null !== handler.value &&
          handler.value.$$typeof === REACT_ELEMENT_TYPE
        )
          switch (((value = handler.value), key)) {
            case "3":
              value.props = i;
              break;
            case "4":
              value._owner = i;
          }
        handler.deps--;
        0 === handler.deps &&
          ((i = handler.chunk),
          null !== i &&
            "blocked" === i.status &&
            ((value = i.value),
            (i.status = "fulfilled"),
            (i.value = handler.value),
            null !== value && wakeChunk(value, handler.value)));
      }
      function reject(error) {
        if (!handler.errored) {
          var blockedValue = handler.value;
          handler.errored = !0;
          handler.value = error;
          var chunk = handler.chunk;
          if (null !== chunk && "blocked" === chunk.status) {
            if (
              "object" === typeof blockedValue &&
              null !== blockedValue &&
              blockedValue.$$typeof === REACT_ELEMENT_TYPE
            ) {
              var erroredComponent = {
                name: getComponentNameFromType(blockedValue.type) || "",
                owner: blockedValue._owner
              };
              erroredComponent.debugStack = blockedValue._debugStack;
              supportsCreateTask &&
                (erroredComponent.debugTask = blockedValue._debugTask);
              (chunk._debugInfo || (chunk._debugInfo = [])).push(
                erroredComponent
              );
            }
            triggerErrorOnChunk(chunk, error);
          }
        }
      }
      if (initializingHandler) {
        var handler = initializingHandler;
        handler.deps++;
      } else
        handler = initializingHandler = {
          parent: null,
          chunk: null,
          value: null,
          deps: 1,
          errored: !1
        };
      referencedChunk.then(fulfill, reject);
      return null;
    }
    function loadServerReference(response, metaData) {
      if (!response._serverReferenceConfig)
        return createBoundServerReference(
          metaData,
          response._callServer,
          response._encodeFormAction,
          response._debugFindSourceMapURL
        );
      throw Error(
        "renderToHTML should not have emitted Server References. This is a bug in React."
      );
    }
    function getOutlinedModel(response, reference, parentObject, key, map) {
      reference = reference.split(":");
      var id = parseInt(reference[0], 16);
      id = getChunk(response, id);
      switch (id.status) {
        case "resolved_model":
          initializeModelChunk(id);
          break;
        case "resolved_module":
          initializeModuleChunk(id);
      }
      switch (id.status) {
        case "fulfilled":
          for (var value = id.value, i = 1; i < reference.length; i++) {
            for (; value.$$typeof === REACT_LAZY_TYPE; )
              if (((value = value._payload), "fulfilled" === value.status))
                value = value.value;
              else
                return waitForReference(
                  value,
                  parentObject,
                  key,
                  response,
                  map,
                  reference.slice(i - 1)
                );
            value = value[reference[i]];
          }
          response = map(response, value, parentObject, key);
          id._debugInfo &&
            ("object" !== typeof response ||
              null === response ||
              (!isArrayImpl(response) &&
                "function" !== typeof response[ASYNC_ITERATOR] &&
                response.$$typeof !== REACT_ELEMENT_TYPE) ||
              response._debugInfo ||
              Object.defineProperty(response, "_debugInfo", {
                configurable: !1,
                enumerable: !1,
                writable: !0,
                value: id._debugInfo
              }));
          return response;
        case "pending":
        case "blocked":
          return waitForReference(
            id,
            parentObject,
            key,
            response,
            map,
            reference
          );
        default:
          return (
            initializingHandler
              ? ((initializingHandler.errored = !0),
                (initializingHandler.value = id.reason))
              : (initializingHandler = {
                  parent: null,
                  chunk: null,
                  value: id.reason,
                  deps: 0,
                  errored: !0
                }),
            null
          );
      }
    }
    function createMap(response, model) {
      return new Map(model);
    }
    function createSet(response, model) {
      return new Set(model);
    }
    function createBlob(response, model) {
      return new Blob(model.slice(1), { type: model[0] });
    }
    function createFormData(response, model) {
      response = new FormData();
      for (var i = 0; i < model.length; i++)
        response.append(model[i][0], model[i][1]);
      return response;
    }
    function extractIterator(response, model) {
      return model[Symbol.iterator]();
    }
    function createModel(response, model) {
      return model;
    }
    function parseModelString(response, parentObject, key, value) {
      if ("$" === value[0]) {
        if ("$" === value)
          return (
            null !== initializingHandler &&
              "0" === key &&
              (initializingHandler = {
                parent: initializingHandler,
                chunk: null,
                value: null,
                deps: 0,
                errored: !1
              }),
            REACT_ELEMENT_TYPE
          );
        switch (value[1]) {
          case "$":
            return value.slice(1);
          case "L":
            return (
              (parentObject = parseInt(value.slice(2), 16)),
              (response = getChunk(response, parentObject)),
              createLazyChunkWrapper(response)
            );
          case "@":
            if (2 === value.length) return new Promise(function () {});
            parentObject = parseInt(value.slice(2), 16);
            return getChunk(response, parentObject);
          case "S":
            return Symbol.for(value.slice(2));
          case "F":
            return (
              (value = value.slice(2)),
              getOutlinedModel(
                response,
                value,
                parentObject,
                key,
                loadServerReference
              )
            );
          case "T":
            parentObject = "$" + value.slice(2);
            response = response._tempRefs;
            if (null == response)
              throw Error(
                "Missing a temporary reference set but the RSC response returned a temporary reference. Pass a temporaryReference option with the set that was used with the reply."
              );
            return response.get(parentObject);
          case "Q":
            return (
              (value = value.slice(2)),
              getOutlinedModel(response, value, parentObject, key, createMap)
            );
          case "W":
            return (
              (value = value.slice(2)),
              getOutlinedModel(response, value, parentObject, key, createSet)
            );
          case "B":
            return (
              (value = value.slice(2)),
              getOutlinedModel(response, value, parentObject, key, createBlob)
            );
          case "K":
            return (
              (value = value.slice(2)),
              getOutlinedModel(
                response,
                value,
                parentObject,
                key,
                createFormData
              )
            );
          case "Z":
            return (
              (value = value.slice(2)),
              getOutlinedModel(
                response,
                value,
                parentObject,
                key,
                resolveErrorDev
              )
            );
          case "i":
            return (
              (value = value.slice(2)),
              getOutlinedModel(
                response,
                value,
                parentObject,
                key,
                extractIterator
              )
            );
          case "I":
            return Infinity;
          case "-":
            return "$-0" === value ? -0 : -Infinity;
          case "N":
            return NaN;
          case "u":
            return;
          case "D":
            return new Date(Date.parse(value.slice(2)));
          case "n":
            return BigInt(value.slice(2));
          case "E":
            try {
              return (0, eval)(value.slice(2));
            } catch (x) {
              return function () {};
            }
          case "Y":
            return (
              Object.defineProperty(parentObject, key, {
                get: function () {
                  return "This object has been omitted by React in the console log to avoid sending too much data from the server. Try logging smaller or more specific objects.";
                },
                enumerable: !0,
                configurable: !1
              }),
              null
            );
          default:
            return (
              (value = value.slice(1)),
              getOutlinedModel(response, value, parentObject, key, createModel)
            );
        }
      }
      return value;
    }
    function missingCall() {
      throw Error(
        'Trying to call a function from "use server" but the callServer option was not implemented in your router runtime.'
      );
    }
    function ResponseInstance(
      bundlerConfig,
      serverReferenceConfig,
      moduleLoading,
      callServer,
      encodeFormAction,
      nonce,
      temporaryReferences,
      findSourceMapURL,
      replayConsole,
      environmentName
    ) {
      var chunks = new Map();
      this._bundlerConfig = bundlerConfig;
      this._serverReferenceConfig = serverReferenceConfig;
      this._moduleLoading = moduleLoading;
      this._callServer = void 0 !== callServer ? callServer : missingCall;
      this._encodeFormAction = encodeFormAction;
      this._nonce = nonce;
      this._chunks = chunks;
      this._fromJSON = this._stringDecoder = null;
      this._rowLength = this._rowTag = this._rowID = this._rowState = 0;
      this._buffer = [];
      this._tempRefs = temporaryReferences;
      this._debugRootOwner = bundlerConfig =
        void 0 === ReactSharedInteralsServer ||
        null === ReactSharedInteralsServer.A
          ? null
          : ReactSharedInteralsServer.A.getOwner();
      this._debugRootStack =
        null !== bundlerConfig ? Error("react-stack-top-frame") : null;
      environmentName = void 0 === environmentName ? "Server" : environmentName;
      supportsCreateTask &&
        (this._debugRootTask = console.createTask(
          '"use ' + environmentName.toLowerCase() + '"'
        ));
      this._debugFindSourceMapURL = findSourceMapURL;
      this._replayConsole = replayConsole;
      this._rootEnvironmentName = environmentName;
      this._fromJSON = createFromJSONCallback(this);
    }
    function resolveModel(response, id, model) {
      var chunks = response._chunks,
        chunk = chunks.get(id);
      chunk
        ? resolveModelChunk(chunk, model)
        : chunks.set(
            id,
            new ReactPromise("resolved_model", model, null, response)
          );
    }
    function resolveText(response, id, text) {
      var chunks = response._chunks,
        chunk = chunks.get(id);
      chunk && "pending" !== chunk.status
        ? chunk.reason.enqueueValue(text)
        : chunks.set(id, new ReactPromise("fulfilled", text, null, response));
    }
    function resolveModule(response, id, model) {
      response._chunks.get(id);
      JSON.parse(model, response._fromJSON);
      throw Error(
        "renderToHTML should not have emitted Client References. This is a bug in React."
      );
    }
    function resolveStream(response, id, stream, controller) {
      var chunks = response._chunks,
        chunk = chunks.get(id);
      chunk
        ? "pending" === chunk.status &&
          ((response = chunk.value),
          (chunk.status = "fulfilled"),
          (chunk.value = stream),
          (chunk.reason = controller),
          null !== response && wakeChunk(response, chunk.value))
        : chunks.set(
            id,
            new ReactPromise("fulfilled", stream, controller, response)
          );
    }
    function startReadableStream(response, id, type) {
      var controller = null;
      type = new ReadableStream({
        type: type,
        start: function (c) {
          controller = c;
        }
      });
      var previousBlockedChunk = null;
      resolveStream(response, id, type, {
        enqueueValue: function (value) {
          null === previousBlockedChunk
            ? controller.enqueue(value)
            : previousBlockedChunk.then(function () {
                controller.enqueue(value);
              });
        },
        enqueueModel: function (json) {
          if (null === previousBlockedChunk) {
            var chunk = new ReactPromise(
              "resolved_model",
              json,
              null,
              response
            );
            initializeModelChunk(chunk);
            "fulfilled" === chunk.status
              ? controller.enqueue(chunk.value)
              : (chunk.then(
                  function (v) {
                    return controller.enqueue(v);
                  },
                  function (e) {
                    return controller.error(e);
                  }
                ),
                (previousBlockedChunk = chunk));
          } else {
            chunk = previousBlockedChunk;
            var _chunk3 = createPendingChunk(response);
            _chunk3.then(
              function (v) {
                return controller.enqueue(v);
              },
              function (e) {
                return controller.error(e);
              }
            );
            previousBlockedChunk = _chunk3;
            chunk.then(function () {
              previousBlockedChunk === _chunk3 && (previousBlockedChunk = null);
              resolveModelChunk(_chunk3, json);
            });
          }
        },
        close: function () {
          if (null === previousBlockedChunk) controller.close();
          else {
            var blockedChunk = previousBlockedChunk;
            previousBlockedChunk = null;
            blockedChunk.then(function () {
              return controller.close();
            });
          }
        },
        error: function (error) {
          if (null === previousBlockedChunk) controller.error(error);
          else {
            var blockedChunk = previousBlockedChunk;
            previousBlockedChunk = null;
            blockedChunk.then(function () {
              return controller.error(error);
            });
          }
        }
      });
    }
    function asyncIterator() {
      return this;
    }
    function createIterator(next) {
      next = { next: next };
      next[ASYNC_ITERATOR] = asyncIterator;
      return next;
    }
    function startAsyncIterable(response, id, iterator) {
      var buffer = [],
        closed = !1,
        nextWriteIndex = 0,
        iterable = _defineProperty({}, ASYNC_ITERATOR, function () {
          var nextReadIndex = 0;
          return createIterator(function (arg) {
            if (void 0 !== arg)
              throw Error(
                "Values cannot be passed to next() of AsyncIterables passed to Client Components."
              );
            if (nextReadIndex === buffer.length) {
              if (closed)
                return new ReactPromise(
                  "fulfilled",
                  { done: !0, value: void 0 },
                  null,
                  response
                );
              buffer[nextReadIndex] = createPendingChunk(response);
            }
            return buffer[nextReadIndex++];
          });
        });
      resolveStream(
        response,
        id,
        iterator ? iterable[ASYNC_ITERATOR]() : iterable,
        {
          enqueueValue: function (value) {
            if (nextWriteIndex === buffer.length)
              buffer[nextWriteIndex] = new ReactPromise(
                "fulfilled",
                { done: !1, value: value },
                null,
                response
              );
            else {
              var chunk = buffer[nextWriteIndex],
                resolveListeners = chunk.value,
                rejectListeners = chunk.reason;
              chunk.status = "fulfilled";
              chunk.value = { done: !1, value: value };
              null !== resolveListeners &&
                wakeChunkIfInitialized(
                  chunk,
                  resolveListeners,
                  rejectListeners
                );
            }
            nextWriteIndex++;
          },
          enqueueModel: function (value) {
            nextWriteIndex === buffer.length
              ? (buffer[nextWriteIndex] = createResolvedIteratorResultChunk(
                  response,
                  value,
                  !1
                ))
              : resolveIteratorResultChunk(buffer[nextWriteIndex], value, !1);
            nextWriteIndex++;
          },
          close: function (value) {
            closed = !0;
            nextWriteIndex === buffer.length
              ? (buffer[nextWriteIndex] = createResolvedIteratorResultChunk(
                  response,
                  value,
                  !0
                ))
              : resolveIteratorResultChunk(buffer[nextWriteIndex], value, !0);
            for (nextWriteIndex++; nextWriteIndex < buffer.length; )
              resolveIteratorResultChunk(
                buffer[nextWriteIndex++],
                '"$undefined"',
                !0
              );
          },
          error: function (error) {
            closed = !0;
            for (
              nextWriteIndex === buffer.length &&
              (buffer[nextWriteIndex] = createPendingChunk(response));
              nextWriteIndex < buffer.length;

            )
              triggerErrorOnChunk(buffer[nextWriteIndex++], error);
          }
        }
      );
    }
    function stopStream(response, id, row) {
      (response = response._chunks.get(id)) &&
        "fulfilled" === response.status &&
        response.reason.close("" === row ? '"$undefined"' : row);
    }
    function resolveErrorDev(response, errorInfo) {
      var env = errorInfo.env;
      errorInfo = buildFakeCallStack(
        response,
        errorInfo.stack,
        env,
        Error.bind(
          null,
          errorInfo.message ||
            "An error occurred in the Server Components render but no message was provided"
        )
      );
      response = getRootTask(response, env);
      response = null != response ? response.run(errorInfo) : errorInfo();
      response.environmentName = env;
      return response;
    }
    function resolvePostponeDev(response, id, reason, stack, env) {
      reason = buildFakeCallStack(
        response,
        stack,
        env,
        Error.bind(null, reason || "")
      );
      stack = response._debugRootTask;
      reason = null != stack ? stack.run(reason) : reason();
      reason.$$typeof = REACT_POSTPONE_TYPE;
      stack = response._chunks;
      (env = stack.get(id))
        ? triggerErrorOnChunk(env, reason)
        : stack.set(id, new ReactPromise("rejected", null, reason, response));
    }
    function resolveHint(response, code, model) {
      JSON.parse(model, response._fromJSON);
    }
    function createFakeFunction(
      name,
      filename,
      sourceMap,
      line,
      col,
      environmentName
    ) {
      name || (name = "<anonymous>");
      var encodedName = JSON.stringify(name);
      1 >= line
        ? ((line = encodedName.length + 7),
          (col =
            "({" +
            encodedName +
            ":_=>" +
            " ".repeat(col < line ? 0 : col - line) +
            "_()})\n/* This module was rendered by a Server Component. Turn on Source Maps to see the server source. */"))
        : (col =
            "/* This module was rendered by a Server Component. Turn on Source Maps to see the server source. */" +
            "\n".repeat(line - 2) +
            "({" +
            encodedName +
            ":_=>\n" +
            " ".repeat(1 > col ? 0 : col - 1) +
            "_()})");
      filename.startsWith("/") && (filename = "file://" + filename);
      sourceMap
        ? ((col +=
            "\n//# sourceURL=rsc://React/" +
            encodeURIComponent(environmentName) +
            "/" +
            encodeURI(filename) +
            "?" +
            fakeFunctionIdx++),
          (col += "\n//# sourceMappingURL=" + sourceMap))
        : (col = filename
            ? col + ("\n//# sourceURL=" + encodeURI(filename))
            : col + "\n//# sourceURL=<anonymous>");
      try {
        var fn = (0, eval)(col)[name];
      } catch (x) {
        fn = function (_) {
          return _();
        };
      }
      return fn;
    }
    function buildFakeCallStack(response, stack, environmentName, innerCall) {
      for (var i = 0; i < stack.length; i++) {
        var frame = stack[i],
          frameKey = frame.join("-") + "-" + environmentName,
          fn = fakeFunctionCache.get(frameKey);
        if (void 0 === fn) {
          fn = frame[0];
          var filename = frame[1],
            line = frame[2];
          frame = frame[3];
          var findSourceMapURL = response._debugFindSourceMapURL;
          findSourceMapURL = findSourceMapURL
            ? findSourceMapURL(filename, environmentName)
            : null;
          fn = createFakeFunction(
            fn,
            filename,
            findSourceMapURL,
            line,
            frame,
            environmentName
          );
          fakeFunctionCache.set(frameKey, fn);
        }
        innerCall = fn.bind(null, innerCall);
      }
      return innerCall;
    }
    function getRootTask(response, childEnvironmentName) {
      var rootTask = response._debugRootTask;
      return rootTask
        ? response._rootEnvironmentName !== childEnvironmentName
          ? ((response = console.createTask.bind(
              console,
              '"use ' + childEnvironmentName.toLowerCase() + '"'
            )),
            rootTask.run(response))
          : rootTask
        : null;
    }
    function initializeFakeTask(response, debugInfo, childEnvironmentName) {
      if (!supportsCreateTask || null == debugInfo.stack) return null;
      var stack = debugInfo.stack,
        env =
          null == debugInfo.env ? response._rootEnvironmentName : debugInfo.env;
      if (env !== childEnvironmentName)
        return (
          (debugInfo =
            null == debugInfo.owner
              ? null
              : initializeFakeTask(response, debugInfo.owner, env)),
          buildFakeTask(
            response,
            debugInfo,
            stack,
            '"use ' + childEnvironmentName.toLowerCase() + '"',
            env
          )
        );
      childEnvironmentName = debugInfo.debugTask;
      if (void 0 !== childEnvironmentName) return childEnvironmentName;
      childEnvironmentName =
        null == debugInfo.owner
          ? null
          : initializeFakeTask(response, debugInfo.owner, env);
      return (debugInfo.debugTask = buildFakeTask(
        response,
        childEnvironmentName,
        stack,
        "<" + (debugInfo.name || "...") + ">",
        env
      ));
    }
    function buildFakeTask(response, ownerTask, stack, taskName, env) {
      taskName = console.createTask.bind(console, taskName);
      stack = buildFakeCallStack(response, stack, env, taskName);
      return null === ownerTask
        ? ((response = getRootTask(response, env)),
          null != response ? response.run(stack) : stack())
        : ownerTask.run(stack);
    }
    function fakeJSXCallSite() {
      return Error("react-stack-top-frame");
    }
    function initializeFakeStack(response, debugInfo) {
      void 0 === debugInfo.debugStack &&
        (null != debugInfo.stack &&
          (debugInfo.debugStack = createFakeJSXCallStackInDEV(
            response,
            debugInfo.stack,
            null == debugInfo.env ? "" : debugInfo.env
          )),
        null != debugInfo.owner &&
          initializeFakeStack(response, debugInfo.owner));
    }
    function resolveDebugInfo(response, id, debugInfo) {
      initializeFakeTask(
        response,
        debugInfo,
        void 0 === debugInfo.env ? response._rootEnvironmentName : debugInfo.env
      );
      null === debugInfo.owner && null != response._debugRootOwner
        ? ((debugInfo.owner = response._debugRootOwner),
          (debugInfo.debugStack = response._debugRootStack))
        : initializeFakeStack(response, debugInfo);
      response = getChunk(response, id);
      (response._debugInfo || (response._debugInfo = [])).push(debugInfo);
    }
    function getCurrentStackInDEV$1() {
      var owner = currentOwnerInDEV;
      return null === owner ? "" : getOwnerStackByComponentInfoInDev(owner);
    }
    function resolveConsoleEntry(response, value) {
      if (response._replayConsole) {
        var payload = JSON.parse(value, response._fromJSON);
        value = payload[0];
        var stackTrace = payload[1],
          owner = payload[2],
          env = payload[3];
        payload = payload.slice(4);
        replayConsoleWithCallStackInDEV(
          response,
          value,
          stackTrace,
          owner,
          env,
          payload
        );
      }
    }
    function processFullStringRow(response, id, tag, row) {
      switch (tag) {
        case 73:
          resolveModule(response, id, row);
          break;
        case 72:
          resolveHint(response, row[0], row.slice(1));
          break;
        case 69:
          row = JSON.parse(row);
          tag = resolveErrorDev(response, row);
          tag.digest = row.digest;
          row = response._chunks;
          var chunk = row.get(id);
          chunk
            ? triggerErrorOnChunk(chunk, tag)
            : row.set(id, new ReactPromise("rejected", null, tag, response));
          break;
        case 84:
          resolveText(response, id, row);
          break;
        case 68:
          tag = new ReactPromise("resolved_model", row, null, response);
          initializeModelChunk(tag);
          "fulfilled" === tag.status
            ? resolveDebugInfo(response, id, tag.value)
            : tag.then(
                function (v) {
                  return resolveDebugInfo(response, id, v);
                },
                function () {}
              );
          break;
        case 87:
          resolveConsoleEntry(response, row);
          break;
        case 82:
          startReadableStream(response, id, void 0);
          break;
        case 114:
          startReadableStream(response, id, "bytes");
          break;
        case 88:
          startAsyncIterable(response, id, !1);
          break;
        case 120:
          startAsyncIterable(response, id, !0);
          break;
        case 67:
          stopStream(response, id, row);
          break;
        case 80:
          tag = JSON.parse(row);
          resolvePostponeDev(response, id, tag.reason, tag.stack, tag.env);
          break;
        default:
          resolveModel(response, id, row);
      }
    }
    function createFromJSONCallback(response) {
      return function (key, value) {
        if ("string" === typeof value)
          return parseModelString(response, this, key, value);
        if ("object" === typeof value && null !== value) {
          if (value[0] === REACT_ELEMENT_TYPE) {
            var type = value[1];
            key = value[4];
            var stack = value[5],
              validated = value[6];
            value = {
              $$typeof: REACT_ELEMENT_TYPE,
              type: type,
              key: value[2],
              props: value[3],
              _owner: null === key ? response._debugRootOwner : key
            };
            Object.defineProperty(value, "ref", {
              enumerable: !1,
              get: nullRefGetter
            });
            value._store = {};
            Object.defineProperty(value._store, "validated", {
              configurable: !1,
              enumerable: !1,
              writable: !0,
              value: validated
            });
            Object.defineProperty(value, "_debugInfo", {
              configurable: !1,
              enumerable: !1,
              writable: !0,
              value: null
            });
            validated = response._rootEnvironmentName;
            null !== key && null != key.env && (validated = key.env);
            var normalizedStackTrace = null;
            null === key && null != response._debugRootStack
              ? (normalizedStackTrace = response._debugRootStack)
              : null !== stack &&
                (normalizedStackTrace = createFakeJSXCallStackInDEV(
                  response,
                  stack,
                  validated
                ));
            Object.defineProperty(value, "_debugStack", {
              configurable: !1,
              enumerable: !1,
              writable: !0,
              value: normalizedStackTrace
            });
            normalizedStackTrace = null;
            supportsCreateTask &&
              null !== stack &&
              ((type = console.createTask.bind(console, getTaskName(type))),
              (stack = buildFakeCallStack(response, stack, validated, type)),
              (type =
                null === key
                  ? null
                  : initializeFakeTask(response, key, validated)),
              null === type
                ? ((type = response._debugRootTask),
                  (normalizedStackTrace =
                    null != type ? type.run(stack) : stack()))
                : (normalizedStackTrace = type.run(stack)));
            Object.defineProperty(value, "_debugTask", {
              configurable: !1,
              enumerable: !1,
              writable: !0,
              value: normalizedStackTrace
            });
            null !== key && initializeFakeStack(response, key);
            null !== initializingHandler
              ? ((stack = initializingHandler),
                (initializingHandler = stack.parent),
                stack.errored
                  ? ((key = new ReactPromise(
                      "rejected",
                      null,
                      stack.value,
                      response
                    )),
                    (stack = {
                      name: getComponentNameFromType(value.type) || "",
                      owner: value._owner
                    }),
                    (stack.debugStack = value._debugStack),
                    supportsCreateTask && (stack.debugTask = value._debugTask),
                    (key._debugInfo = [stack]),
                    (value = createLazyChunkWrapper(key)))
                  : 0 < stack.deps &&
                    ((key = new ReactPromise("blocked", null, null, response)),
                    (stack.value = value),
                    (stack.chunk = key),
                    (value = Object.freeze.bind(Object, value.props)),
                    key.then(value, value),
                    (value = createLazyChunkWrapper(key))))
              : Object.freeze(value.props);
          }
          return value;
        }
        return value;
      };
    }
    function typeName(value) {
      return (
        ("function" === typeof Symbol &&
          Symbol.toStringTag &&
          value[Symbol.toStringTag]) ||
        value.constructor.name ||
        "Object"
      );
    }
    function willCoercionThrow(value) {
      try {
        return testStringCoercion(value), !1;
      } catch (e) {
        return !0;
      }
    }
    function testStringCoercion(value) {
      return "" + value;
    }
    function checkAttributeStringCoercion(value, attributeName) {
      if (willCoercionThrow(value))
        return (
          console.error(
            "The provided `%s` attribute is an unsupported type %s. This value must be coerced to a string before using it here.",
            attributeName,
            typeName(value)
          ),
          testStringCoercion(value)
        );
    }
    function checkCSSPropertyStringCoercion(value, propName) {
      if (willCoercionThrow(value))
        return (
          console.error(
            "The provided `%s` CSS property is an unsupported type %s. This value must be coerced to a string before using it here.",
            propName,
            typeName(value)
          ),
          testStringCoercion(value)
        );
    }
    function checkHtmlStringCoercion(value) {
      if (willCoercionThrow(value))
        return (
          console.error(
            "The provided HTML markup uses a value of unsupported type %s. This value must be coerced to a string before using it here.",
            typeName(value)
          ),
          testStringCoercion(value)
        );
    }
    function isAttributeNameSafe(attributeName) {
      if (hasOwnProperty.call(validatedAttributeNameCache, attributeName))
        return !0;
      if (hasOwnProperty.call(illegalAttributeNameCache, attributeName))
        return !1;
      if (VALID_ATTRIBUTE_NAME_REGEX.test(attributeName))
        return (validatedAttributeNameCache[attributeName] = !0);
      illegalAttributeNameCache[attributeName] = !0;
      console.error("Invalid attribute name: `%s`", attributeName);
      return !1;
    }
    function checkControlledValueProps(tagName, props) {
      hasReadOnlyValue[props.type] ||
        props.onChange ||
        props.onInput ||
        props.readOnly ||
        props.disabled ||
        null == props.value ||
        ("select" === tagName
          ? console.error(
              "You provided a `value` prop to a form field without an `onChange` handler. This will render a read-only field. If the field should be mutable use `defaultValue`. Otherwise, set `onChange`."
            )
          : console.error(
              "You provided a `value` prop to a form field without an `onChange` handler. This will render a read-only field. If the field should be mutable use `defaultValue`. Otherwise, set either `onChange` or `readOnly`."
            ));
      props.onChange ||
        props.readOnly ||
        props.disabled ||
        null == props.checked ||
        console.error(
          "You provided a `checked` prop to a form field without an `onChange` handler. This will render a read-only field. If the field should be mutable use `defaultChecked`. Otherwise, set either `onChange` or `readOnly`."
        );
    }
    function validateProperty$1(tagName, name) {
      if (
        hasOwnProperty.call(warnedProperties$1, name) &&
        warnedProperties$1[name]
      )
        return !0;
      if (rARIACamel$1.test(name)) {
        tagName = "aria-" + name.slice(4).toLowerCase();
        tagName = ariaProperties.hasOwnProperty(tagName) ? tagName : null;
        if (null == tagName)
          return (
            console.error(
              "Invalid ARIA attribute `%s`. ARIA attributes follow the pattern aria-* and must be lowercase.",
              name
            ),
            (warnedProperties$1[name] = !0)
          );
        if (name !== tagName)
          return (
            console.error(
              "Invalid ARIA attribute `%s`. Did you mean `%s`?",
              name,
              tagName
            ),
            (warnedProperties$1[name] = !0)
          );
      }
      if (rARIA$1.test(name)) {
        tagName = name.toLowerCase();
        tagName = ariaProperties.hasOwnProperty(tagName) ? tagName : null;
        if (null == tagName) return (warnedProperties$1[name] = !0), !1;
        name !== tagName &&
          (console.error(
            "Unknown ARIA attribute `%s`. Did you mean `%s`?",
            name,
            tagName
          ),
          (warnedProperties$1[name] = !0));
      }
      return !0;
    }
    function validateProperties$2(type, props) {
      var invalidProps = [],
        key;
      for (key in props)
        validateProperty$1(type, key) || invalidProps.push(key);
      props = invalidProps
        .map(function (prop) {
          return "`" + prop + "`";
        })
        .join(", ");
      1 === invalidProps.length
        ? console.error(
            "Invalid aria prop %s on <%s> tag. For details, see https://react.dev/link/invalid-aria-props",
            props,
            type
          )
        : 1 < invalidProps.length &&
          console.error(
            "Invalid aria props %s on <%s> tag. For details, see https://react.dev/link/invalid-aria-props",
            props,
            type
          );
    }
    function validateProperty(tagName, name, value, eventRegistry) {
      if (hasOwnProperty.call(warnedProperties, name) && warnedProperties[name])
        return !0;
      var lowerCasedName = name.toLowerCase();
      if ("onfocusin" === lowerCasedName || "onfocusout" === lowerCasedName)
        return (
          console.error(
            "React uses onFocus and onBlur instead of onFocusIn and onFocusOut. All React events are normalized to bubble, so onFocusIn and onFocusOut are not needed/supported by React."
          ),
          (warnedProperties[name] = !0)
        );
      if (
        "function" === typeof value &&
        (("form" === tagName && "action" === name) ||
          ("input" === tagName && "formAction" === name) ||
          ("button" === tagName && "formAction" === name))
      )
        return !0;
      if (null != eventRegistry) {
        tagName = eventRegistry.possibleRegistrationNames;
        if (eventRegistry.registrationNameDependencies.hasOwnProperty(name))
          return !0;
        eventRegistry = tagName.hasOwnProperty(lowerCasedName)
          ? tagName[lowerCasedName]
          : null;
        if (null != eventRegistry)
          return (
            console.error(
              "Invalid event handler property `%s`. Did you mean `%s`?",
              name,
              eventRegistry
            ),
            (warnedProperties[name] = !0)
          );
        if (EVENT_NAME_REGEX.test(name))
          return (
            console.error(
              "Unknown event handler property `%s`. It will be ignored.",
              name
            ),
            (warnedProperties[name] = !0)
          );
      } else if (EVENT_NAME_REGEX.test(name))
        return (
          INVALID_EVENT_NAME_REGEX.test(name) &&
            console.error(
              "Invalid event handler property `%s`. React events use the camelCase naming convention, for example `onClick`.",
              name
            ),
          (warnedProperties[name] = !0)
        );
      if (rARIA.test(name) || rARIACamel.test(name)) return !0;
      if ("innerhtml" === lowerCasedName)
        return (
          console.error(
            "Directly setting property `innerHTML` is not permitted. For more information, lookup documentation on `dangerouslySetInnerHTML`."
          ),
          (warnedProperties[name] = !0)
        );
      if ("aria" === lowerCasedName)
        return (
          console.error(
            "The `aria` attribute is reserved for future use in React. Pass individual `aria-` attributes instead."
          ),
          (warnedProperties[name] = !0)
        );
      if (
        "is" === lowerCasedName &&
        null !== value &&
        void 0 !== value &&
        "string" !== typeof value
      )
        return (
          console.error(
            "Received a `%s` for a string attribute `is`. If this is expected, cast the value to a string.",
            typeof value
          ),
          (warnedProperties[name] = !0)
        );
      if ("number" === typeof value && isNaN(value))
        return (
          console.error(
            "Received NaN for the `%s` attribute. If this is expected, cast the value to a string.",
            name
          ),
          (warnedProperties[name] = !0)
        );
      if (possibleStandardNames.hasOwnProperty(lowerCasedName)) {
        if (
          ((lowerCasedName = possibleStandardNames[lowerCasedName]),
          lowerCasedName !== name)
        )
          return (
            console.error(
              "Invalid DOM property `%s`. Did you mean `%s`?",
              name,
              lowerCasedName
            ),
            (warnedProperties[name] = !0)
          );
      } else if (name !== lowerCasedName)
        return (
          console.error(
            "React does not recognize the `%s` prop on a DOM element. If you intentionally want it to appear in the DOM as a custom attribute, spell it as lowercase `%s` instead. If you accidentally passed it from a parent component, remove it from the DOM element.",
            name,
            lowerCasedName
          ),
          (warnedProperties[name] = !0)
        );
      switch (name) {
        case "dangerouslySetInnerHTML":
        case "children":
        case "style":
        case "suppressContentEditableWarning":
        case "suppressHydrationWarning":
        case "defaultValue":
        case "defaultChecked":
        case "innerHTML":
        case "ref":
          return !0;
        case "innerText":
        case "textContent":
          return !0;
      }
      switch (typeof value) {
        case "boolean":
          switch (name) {
            case "autoFocus":
            case "checked":
            case "multiple":
            case "muted":
            case "selected":
            case "contentEditable":
            case "spellCheck":
            case "draggable":
            case "value":
            case "autoReverse":
            case "externalResourcesRequired":
            case "focusable":
            case "preserveAlpha":
            case "allowFullScreen":
            case "async":
            case "autoPlay":
            case "controls":
            case "default":
            case "defer":
            case "disabled":
            case "disablePictureInPicture":
            case "disableRemotePlayback":
            case "formNoValidate":
            case "hidden":
            case "loop":
            case "noModule":
            case "noValidate":
            case "open":
            case "playsInline":
            case "readOnly":
            case "required":
            case "reversed":
            case "scoped":
            case "seamless":
            case "itemScope":
            case "capture":
            case "download":
            case "inert":
              return !0;
            default:
              lowerCasedName = name.toLowerCase().slice(0, 5);
              if ("data-" === lowerCasedName || "aria-" === lowerCasedName)
                return !0;
              value
                ? console.error(
                    'Received `%s` for a non-boolean attribute `%s`.\n\nIf you want to write it to the DOM, pass a string instead: %s="%s" or %s={value.toString()}.',
                    value,
                    name,
                    name,
                    value,
                    name
                  )
                : console.error(
                    'Received `%s` for a non-boolean attribute `%s`.\n\nIf you want to write it to the DOM, pass a string instead: %s="%s" or %s={value.toString()}.\n\nIf you used to conditionally omit it with %s={condition && value}, pass %s={condition ? value : undefined} instead.',
                    value,
                    name,
                    name,
                    value,
                    name,
                    name,
                    name
                  );
              return (warnedProperties[name] = !0);
          }
        case "function":
        case "symbol":
          return (warnedProperties[name] = !0), !1;
        case "string":
          if ("false" === value || "true" === value) {
            switch (name) {
              case "checked":
              case "selected":
              case "multiple":
              case "muted":
              case "allowFullScreen":
              case "async":
              case "autoPlay":
              case "controls":
              case "default":
              case "defer":
              case "disabled":
              case "disablePictureInPicture":
              case "disableRemotePlayback":
              case "formNoValidate":
              case "hidden":
              case "loop":
              case "noModule":
              case "noValidate":
              case "open":
              case "playsInline":
              case "readOnly":
              case "required":
              case "reversed":
              case "scoped":
              case "seamless":
              case "itemScope":
              case "inert":
                break;
              default:
                return !0;
            }
            console.error(
              "Received the string `%s` for the boolean attribute `%s`. %s Did you mean %s={%s}?",
              value,
              name,
              "false" === value
                ? "The browser will interpret it as a truthy value."
                : 'Although this works, it will not work as expected if you pass the string "false".',
              name,
              value
            );
            warnedProperties[name] = !0;
          }
      }
      return !0;
    }
    function warnUnknownProperties(type, props, eventRegistry) {
      var unknownProps = [],
        key;
      for (key in props)
        validateProperty(type, key, props[key], eventRegistry) ||
          unknownProps.push(key);
      props = unknownProps
        .map(function (prop) {
          return "`" + prop + "`";
        })
        .join(", ");
      1 === unknownProps.length
        ? console.error(
            "Invalid value for prop %s on <%s> tag. Either remove it from the element, or pass a string or number value to keep it in the DOM. For details, see https://react.dev/link/attribute-behavior ",
            props,
            type
          )
        : 1 < unknownProps.length &&
          console.error(
            "Invalid values for props %s on <%s> tag. Either remove them from the element, or pass a string or number value to keep them in the DOM. For details, see https://react.dev/link/attribute-behavior ",
            props,
            type
          );
    }
    function camelize(string) {
      return string.replace(hyphenPattern, function (_, character) {
        return character.toUpperCase();
      });
    }
    function escapeTextForBrowser(text) {
      if (
        "boolean" === typeof text ||
        "number" === typeof text ||
        "bigint" === typeof text
      )
        return "" + text;
      checkHtmlStringCoercion(text);
      text = "" + text;
      var match = matchHtmlRegExp.exec(text);
      if (match) {
        var html = "",
          index,
          lastIndex = 0;
        for (index = match.index; index < text.length; index++) {
          switch (text.charCodeAt(index)) {
            case 34:
              match = "&quot;";
              break;
            case 38:
              match = "&amp;";
              break;
            case 39:
              match = "&#x27;";
              break;
            case 60:
              match = "&lt;";
              break;
            case 62:
              match = "&gt;";
              break;
            default:
              continue;
          }
          lastIndex !== index && (html += text.slice(lastIndex, index));
          lastIndex = index + 1;
          html += match;
        }
        text = lastIndex !== index ? html + text.slice(lastIndex, index) : html;
      }
      return text;
    }
    function sanitizeURL(url) {
      return isJavaScriptProtocol.test("" + url)
        ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')"
        : url;
    }
    function escapeEntireInlineScriptContent(scriptText) {
      checkHtmlStringCoercion(scriptText);
      return ("" + scriptText).replace(scriptRegex, scriptReplacer);
    }
    function createRenderState(
      resumableState,
      nonce,
      externalRuntimeConfig,
      importMap,
      onHeaders,
      maxHeadersLength
    ) {
      var inlineScriptWithNonce =
          void 0 === nonce
            ? "<script>"
            : '<script nonce="' + escapeTextForBrowser(nonce) + '">',
        idPrefix = resumableState.idPrefix,
        bootstrapChunks = [],
        externalRuntimeScript = null,
        bootstrapScriptContent = resumableState.bootstrapScriptContent,
        bootstrapScripts = resumableState.bootstrapScripts,
        bootstrapModules = resumableState.bootstrapModules;
      void 0 !== bootstrapScriptContent &&
        bootstrapChunks.push(
          inlineScriptWithNonce,
          escapeEntireInlineScriptContent(bootstrapScriptContent),
          "\x3c/script>"
        );
      void 0 !== externalRuntimeConfig &&
        ("string" === typeof externalRuntimeConfig
          ? ((externalRuntimeScript = {
              src: externalRuntimeConfig,
              chunks: []
            }),
            pushScriptImpl(externalRuntimeScript.chunks, {
              src: externalRuntimeConfig,
              async: !0,
              integrity: void 0,
              nonce: nonce
            }))
          : ((externalRuntimeScript = {
              src: externalRuntimeConfig.src,
              chunks: []
            }),
            pushScriptImpl(externalRuntimeScript.chunks, {
              src: externalRuntimeConfig.src,
              async: !0,
              integrity: externalRuntimeConfig.integrity,
              nonce: nonce
            })));
      externalRuntimeConfig = [];
      void 0 !== importMap &&
        (externalRuntimeConfig.push('<script type="importmap">'),
        externalRuntimeConfig.push(
          escapeEntireInlineScriptContent(JSON.stringify(importMap))
        ),
        externalRuntimeConfig.push("\x3c/script>"));
      onHeaders &&
        "number" === typeof maxHeadersLength &&
        0 >= maxHeadersLength &&
        console.error(
          "React expected a positive non-zero `maxHeadersLength` option but found %s instead. When using the `onHeaders` option you may supply an optional `maxHeadersLength` option as well however, when setting this value to zero or less no headers will be captured.",
          0 === maxHeadersLength ? "zero" : maxHeadersLength
        );
      importMap = {
        placeholderPrefix: idPrefix + "P:",
        segmentPrefix: idPrefix + "S:",
        boundaryPrefix: idPrefix + "B:",
        startInlineScript: inlineScriptWithNonce,
        htmlChunks: null,
        headChunks: null,
        externalRuntimeScript: externalRuntimeScript,
        bootstrapChunks: bootstrapChunks,
        importMapChunks: externalRuntimeConfig,
        onHeaders: onHeaders,
        headers: onHeaders
          ? {
              preconnects: "",
              fontPreloads: "",
              highImagePreloads: "",
              remainingCapacity:
                2 +
                ("number" === typeof maxHeadersLength ? maxHeadersLength : 2e3)
            }
          : null,
        resets: {
          font: {},
          dns: {},
          connect: { default: {}, anonymous: {}, credentials: {} },
          image: {},
          style: {}
        },
        charsetChunks: [],
        viewportChunks: [],
        hoistableChunks: [],
        preconnects: new Set(),
        fontPreloads: new Set(),
        highImagePreloads: new Set(),
        styles: new Map(),
        bootstrapScripts: new Set(),
        scripts: new Set(),
        bulkPreloads: new Set(),
        preloads: {
          images: new Map(),
          stylesheets: new Map(),
          scripts: new Map(),
          moduleScripts: new Map()
        },
        nonce: nonce,
        hoistableState: null,
        stylesToHoist: !1
      };
      if (void 0 !== bootstrapScripts)
        for (onHeaders = 0; onHeaders < bootstrapScripts.length; onHeaders++)
          (maxHeadersLength = bootstrapScripts[onHeaders]),
            (externalRuntimeScript = idPrefix = void 0),
            (externalRuntimeConfig = {
              rel: "preload",
              as: "script",
              fetchPriority: "low",
              nonce: nonce
            }),
            "string" === typeof maxHeadersLength
              ? (externalRuntimeConfig.href = inlineScriptWithNonce =
                  maxHeadersLength)
              : ((externalRuntimeConfig.href = inlineScriptWithNonce =
                  maxHeadersLength.src),
                (externalRuntimeConfig.integrity = externalRuntimeScript =
                  "string" === typeof maxHeadersLength.integrity
                    ? maxHeadersLength.integrity
                    : void 0),
                (externalRuntimeConfig.crossOrigin = idPrefix =
                  "string" === typeof maxHeadersLength ||
                  null == maxHeadersLength.crossOrigin
                    ? void 0
                    : "use-credentials" === maxHeadersLength.crossOrigin
                      ? "use-credentials"
                      : "")),
            preloadBootstrapScriptOrModule(
              resumableState,
              importMap,
              inlineScriptWithNonce,
              externalRuntimeConfig
            ),
            bootstrapChunks.push(
              '<script src="',
              escapeTextForBrowser(inlineScriptWithNonce)
            ),
            nonce &&
              bootstrapChunks.push('" nonce="', escapeTextForBrowser(nonce)),
            "string" === typeof externalRuntimeScript &&
              bootstrapChunks.push(
                '" integrity="',
                escapeTextForBrowser(externalRuntimeScript)
              ),
            "string" === typeof idPrefix &&
              bootstrapChunks.push(
                '" crossorigin="',
                escapeTextForBrowser(idPrefix)
              ),
            bootstrapChunks.push('" async="">\x3c/script>');
      if (void 0 !== bootstrapModules)
        for (
          bootstrapScripts = 0;
          bootstrapScripts < bootstrapModules.length;
          bootstrapScripts++
        )
          (onHeaders = bootstrapModules[bootstrapScripts]),
            (idPrefix = inlineScriptWithNonce = void 0),
            (externalRuntimeScript = {
              rel: "modulepreload",
              fetchPriority: "low",
              nonce: nonce
            }),
            "string" === typeof onHeaders
              ? (externalRuntimeScript.href = maxHeadersLength = onHeaders)
              : ((externalRuntimeScript.href = maxHeadersLength =
                  onHeaders.src),
                (externalRuntimeScript.integrity = idPrefix =
                  "string" === typeof onHeaders.integrity
                    ? onHeaders.integrity
                    : void 0),
                (externalRuntimeScript.crossOrigin = inlineScriptWithNonce =
                  "string" === typeof onHeaders || null == onHeaders.crossOrigin
                    ? void 0
                    : "use-credentials" === onHeaders.crossOrigin
                      ? "use-credentials"
                      : "")),
            preloadBootstrapScriptOrModule(
              resumableState,
              importMap,
              maxHeadersLength,
              externalRuntimeScript
            ),
            bootstrapChunks.push(
              '<script type="module" src="',
              escapeTextForBrowser(maxHeadersLength)
            ),
            nonce &&
              bootstrapChunks.push('" nonce="', escapeTextForBrowser(nonce)),
            "string" === typeof idPrefix &&
              bootstrapChunks.push(
                '" integrity="',
                escapeTextForBrowser(idPrefix)
              ),
            "string" === typeof inlineScriptWithNonce &&
              bootstrapChunks.push(
                '" crossorigin="',
                escapeTextForBrowser(inlineScriptWithNonce)
              ),
            bootstrapChunks.push('" async="">\x3c/script>');
      return importMap;
    }
    function createResumableState(
      identifierPrefix,
      externalRuntimeConfig,
      bootstrapScriptContent,
      bootstrapScripts,
      bootstrapModules
    ) {
      var streamingFormat = 0;
      void 0 !== externalRuntimeConfig && (streamingFormat = 1);
      return {
        idPrefix: void 0 === identifierPrefix ? "" : identifierPrefix,
        nextFormID: 0,
        streamingFormat: streamingFormat,
        bootstrapScriptContent: bootstrapScriptContent,
        bootstrapScripts: bootstrapScripts,
        bootstrapModules: bootstrapModules,
        instructions: 0,
        hasBody: !1,
        hasHtml: !1,
        unknownResources: {},
        dnsResources: {},
        connectResources: { default: {}, anonymous: {}, credentials: {} },
        imageResources: {},
        styleResources: {},
        scriptResources: {},
        moduleUnknownResources: {},
        moduleScriptResources: {}
      };
    }
    function createFormatContext(insertionMode, selectedValue, tagScope) {
      return {
        insertionMode: insertionMode,
        selectedValue: selectedValue,
        tagScope: tagScope
      };
    }
    function getChildFormatContext(parentContext, type, props) {
      switch (type) {
        case "noscript":
          return createFormatContext(2, null, parentContext.tagScope | 1);
        case "select":
          return createFormatContext(
            2,
            null != props.value ? props.value : props.defaultValue,
            parentContext.tagScope
          );
        case "svg":
          return createFormatContext(3, null, parentContext.tagScope);
        case "picture":
          return createFormatContext(2, null, parentContext.tagScope | 2);
        case "math":
          return createFormatContext(4, null, parentContext.tagScope);
        case "foreignObject":
          return createFormatContext(2, null, parentContext.tagScope);
        case "table":
          return createFormatContext(5, null, parentContext.tagScope);
        case "thead":
        case "tbody":
        case "tfoot":
          return createFormatContext(6, null, parentContext.tagScope);
        case "colgroup":
          return createFormatContext(8, null, parentContext.tagScope);
        case "tr":
          return createFormatContext(7, null, parentContext.tagScope);
      }
      return 5 <= parentContext.insertionMode
        ? createFormatContext(2, null, parentContext.tagScope)
        : 0 === parentContext.insertionMode
          ? "html" === type
            ? createFormatContext(1, null, parentContext.tagScope)
            : createFormatContext(2, null, parentContext.tagScope)
          : 1 === parentContext.insertionMode
            ? createFormatContext(2, null, parentContext.tagScope)
            : parentContext;
    }
    function pushStyleAttribute(target, style) {
      if ("object" !== typeof style)
        throw Error(
          "The `style` prop expects a mapping from style properties to values, not a string. For example, style={{marginRight: spacing + 'em'}} when using JSX."
        );
      var isFirst = !0,
        styleName;
      for (styleName in style)
        if (hasOwnProperty.call(style, styleName)) {
          var styleValue = style[styleName];
          if (
            null != styleValue &&
            "boolean" !== typeof styleValue &&
            "" !== styleValue
          ) {
            if (0 === styleName.indexOf("--")) {
              var nameChunk = escapeTextForBrowser(styleName);
              checkCSSPropertyStringCoercion(styleValue, styleName);
              styleValue = escapeTextForBrowser(("" + styleValue).trim());
            } else {
              nameChunk = styleName;
              var value = styleValue;
              if (-1 < nameChunk.indexOf("-")) {
                var name = nameChunk;
                (warnedStyleNames.hasOwnProperty(name) &&
                  warnedStyleNames[name]) ||
                  ((warnedStyleNames[name] = !0),
                  console.error(
                    "Unsupported style property %s. Did you mean %s?",
                    name,
                    camelize(name.replace(msPattern$1, "ms-"))
                  ));
              } else if (badVendoredStyleNamePattern.test(nameChunk))
                (name = nameChunk),
                  (warnedStyleNames.hasOwnProperty(name) &&
                    warnedStyleNames[name]) ||
                    ((warnedStyleNames[name] = !0),
                    console.error(
                      "Unsupported vendor-prefixed style property %s. Did you mean %s?",
                      name,
                      name.charAt(0).toUpperCase() + name.slice(1)
                    ));
              else if (badStyleValueWithSemicolonPattern.test(value)) {
                name = nameChunk;
                var value$jscomp$0 = value;
                (warnedStyleValues.hasOwnProperty(value$jscomp$0) &&
                  warnedStyleValues[value$jscomp$0]) ||
                  ((warnedStyleValues[value$jscomp$0] = !0),
                  console.error(
                    'Style property values shouldn\'t contain a semicolon. Try "%s: %s" instead.',
                    name,
                    value$jscomp$0.replace(
                      badStyleValueWithSemicolonPattern,
                      ""
                    )
                  ));
              }
              "number" === typeof value &&
                (isNaN(value)
                  ? warnedForNaNValue ||
                    ((warnedForNaNValue = !0),
                    console.error(
                      "`NaN` is an invalid value for the `%s` css style property.",
                      nameChunk
                    ))
                  : isFinite(value) ||
                    warnedForInfinityValue ||
                    ((warnedForInfinityValue = !0),
                    console.error(
                      "`Infinity` is an invalid value for the `%s` css style property.",
                      nameChunk
                    )));
              nameChunk = styleName;
              value = styleNameCache.get(nameChunk);
              void 0 !== value
                ? (nameChunk = value)
                : ((value = escapeTextForBrowser(
                    nameChunk
                      .replace(uppercasePattern, "-$1")
                      .toLowerCase()
                      .replace(msPattern, "-ms-")
                  )),
                  styleNameCache.set(nameChunk, value),
                  (nameChunk = value));
              "number" === typeof styleValue
                ? (styleValue =
                    0 === styleValue || unitlessNumbers.has(styleName)
                      ? "" + styleValue
                      : styleValue + "px")
                : (checkCSSPropertyStringCoercion(styleValue, styleName),
                  (styleValue = escapeTextForBrowser(
                    ("" + styleValue).trim()
                  )));
            }
            isFirst
              ? ((isFirst = !1),
                target.push(
                  styleAttributeStart,
                  nameChunk,
                  styleAssign,
                  styleValue
                ))
              : target.push(styleSeparator, nameChunk, styleAssign, styleValue);
          }
        }
      isFirst || target.push(attributeEnd);
    }
    function pushBooleanAttribute(target, name, value) {
      value &&
        "function" !== typeof value &&
        "symbol" !== typeof value &&
        target.push(attributeSeparator, name, attributeEmptyString);
    }
    function pushStringAttribute(target, name, value) {
      "function" !== typeof value &&
        "symbol" !== typeof value &&
        "boolean" !== typeof value &&
        target.push(
          attributeSeparator,
          name,
          attributeAssign,
          escapeTextForBrowser(value),
          attributeEnd
        );
    }
    function pushAdditionalFormField(value, key) {
      this.push('<input type="hidden"');
      validateAdditionalFormField(value);
      pushStringAttribute(this, "name", key);
      pushStringAttribute(this, "value", value);
      this.push(endOfStartTagSelfClosing);
    }
    function validateAdditionalFormField(value) {
      if ("string" !== typeof value)
        throw Error(
          "File/Blob fields are not yet supported in progressive forms. Will fallback to client hydration."
        );
    }
    function getCustomFormFields(resumableState, formAction) {
      if ("function" === typeof formAction.$$FORM_ACTION) {
        var id = resumableState.nextFormID++;
        resumableState = resumableState.idPrefix + id;
        try {
          var customFields = formAction.$$FORM_ACTION(resumableState);
          if (customFields) {
            var formData = customFields.data;
            null != formData && formData.forEach(validateAdditionalFormField);
          }
          return customFields;
        } catch (x) {
          if (
            "object" === typeof x &&
            null !== x &&
            "function" === typeof x.then
          )
            throw x;
          console.error(
            "Failed to serialize an action for progressive enhancement:\n%s",
            x
          );
        }
      }
      return null;
    }
    function pushFormActionAttribute(
      target,
      resumableState,
      renderState,
      formAction,
      formEncType,
      formMethod,
      formTarget,
      name
    ) {
      var formData = null;
      if ("function" === typeof formAction) {
        null === name ||
          didWarnFormActionName ||
          ((didWarnFormActionName = !0),
          console.error(
            'Cannot specify a "name" prop for a button that specifies a function as a formAction. React needs it to encode which action should be invoked. It will get overridden.'
          ));
        (null === formEncType && null === formMethod) ||
          didWarnFormActionMethod ||
          ((didWarnFormActionMethod = !0),
          console.error(
            "Cannot specify a formEncType or formMethod for a button that specifies a function as a formAction. React provides those automatically. They will get overridden."
          ));
        null === formTarget ||
          didWarnFormActionTarget ||
          ((didWarnFormActionTarget = !0),
          console.error(
            "Cannot specify a formTarget for a button that specifies a function as a formAction. The function will always be executed in the same window."
          ));
        var customFields = getCustomFormFields(resumableState, formAction);
        null !== customFields
          ? ((name = customFields.name),
            (formAction = customFields.action || ""),
            (formEncType = customFields.encType),
            (formMethod = customFields.method),
            (formTarget = customFields.target),
            (formData = customFields.data))
          : (target.push(
              attributeSeparator,
              "formAction",
              attributeAssign,
              actionJavaScriptURL,
              attributeEnd
            ),
            (formTarget = formMethod = formEncType = formAction = name = null),
            injectFormReplayingRuntime(resumableState, renderState));
      }
      null != name && pushAttribute(target, "name", name);
      null != formAction && pushAttribute(target, "formAction", formAction);
      null != formEncType && pushAttribute(target, "formEncType", formEncType);
      null != formMethod && pushAttribute(target, "formMethod", formMethod);
      null != formTarget && pushAttribute(target, "formTarget", formTarget);
      return formData;
    }
    function pushAttribute(target, name, value) {
      switch (name) {
        case "className":
          pushStringAttribute(target, "class", value);
          break;
        case "tabIndex":
          pushStringAttribute(target, "tabindex", value);
          break;
        case "dir":
        case "role":
        case "viewBox":
        case "width":
        case "height":
          pushStringAttribute(target, name, value);
          break;
        case "style":
          pushStyleAttribute(target, value);
          break;
        case "src":
        case "href":
          if ("" === value) {
            "src" === name
              ? console.error(
                  'An empty string ("") was passed to the %s attribute. This may cause the browser to download the whole page again over the network. To fix this, either do not render the element at all or pass null to %s instead of an empty string.',
                  name,
                  name
                )
              : console.error(
                  'An empty string ("") was passed to the %s attribute. To fix this, either do not render the element at all or pass null to %s instead of an empty string.',
                  name,
                  name
                );
            break;
          }
        case "action":
        case "formAction":
          if (
            null == value ||
            "function" === typeof value ||
            "symbol" === typeof value ||
            "boolean" === typeof value
          )
            break;
          checkAttributeStringCoercion(value, name);
          value = sanitizeURL("" + value);
          target.push(
            attributeSeparator,
            name,
            attributeAssign,
            escapeTextForBrowser(value),
            attributeEnd
          );
          break;
        case "defaultValue":
        case "defaultChecked":
        case "innerHTML":
        case "suppressContentEditableWarning":
        case "suppressHydrationWarning":
        case "ref":
          break;
        case "autoFocus":
        case "multiple":
        case "muted":
          pushBooleanAttribute(target, name.toLowerCase(), value);
          break;
        case "xlinkHref":
          if (
            "function" === typeof value ||
            "symbol" === typeof value ||
            "boolean" === typeof value
          )
            break;
          checkAttributeStringCoercion(value, name);
          value = sanitizeURL("" + value);
          target.push(
            attributeSeparator,
            "xlink:href",
            attributeAssign,
            escapeTextForBrowser(value),
            attributeEnd
          );
          break;
        case "contentEditable":
        case "spellCheck":
        case "draggable":
        case "value":
        case "autoReverse":
        case "externalResourcesRequired":
        case "focusable":
        case "preserveAlpha":
          "function" !== typeof value &&
            "symbol" !== typeof value &&
            target.push(
              attributeSeparator,
              name,
              attributeAssign,
              escapeTextForBrowser(value),
              attributeEnd
            );
          break;
        case "inert":
          "" !== value ||
            didWarnForNewBooleanPropsWithEmptyValue[name] ||
            ((didWarnForNewBooleanPropsWithEmptyValue[name] = !0),
            console.error(
              "Received an empty string for a boolean attribute `%s`. This will treat the attribute as if it were false. Either pass `false` to silence this warning, or pass `true` if you used an empty string in earlier versions of React to indicate this attribute is true.",
              name
            ));
        case "allowFullScreen":
        case "async":
        case "autoPlay":
        case "controls":
        case "default":
        case "defer":
        case "disabled":
        case "disablePictureInPicture":
        case "disableRemotePlayback":
        case "formNoValidate":
        case "hidden":
        case "loop":
        case "noModule":
        case "noValidate":
        case "open":
        case "playsInline":
        case "readOnly":
        case "required":
        case "reversed":
        case "scoped":
        case "seamless":
        case "itemScope":
          value &&
            "function" !== typeof value &&
            "symbol" !== typeof value &&
            target.push(attributeSeparator, name, attributeEmptyString);
          break;
        case "capture":
        case "download":
          !0 === value
            ? target.push(attributeSeparator, name, attributeEmptyString)
            : !1 !== value &&
              "function" !== typeof value &&
              "symbol" !== typeof value &&
              target.push(
                attributeSeparator,
                name,
                attributeAssign,
                escapeTextForBrowser(value),
                attributeEnd
              );
          break;
        case "cols":
        case "rows":
        case "size":
        case "span":
          "function" !== typeof value &&
            "symbol" !== typeof value &&
            !isNaN(value) &&
            1 <= value &&
            target.push(
              attributeSeparator,
              name,
              attributeAssign,
              escapeTextForBrowser(value),
              attributeEnd
            );
          break;
        case "rowSpan":
        case "start":
          "function" === typeof value ||
            "symbol" === typeof value ||
            isNaN(value) ||
            target.push(
              attributeSeparator,
              name,
              attributeAssign,
              escapeTextForBrowser(value),
              attributeEnd
            );
          break;
        case "xlinkActuate":
          pushStringAttribute(target, "xlink:actuate", value);
          break;
        case "xlinkArcrole":
          pushStringAttribute(target, "xlink:arcrole", value);
          break;
        case "xlinkRole":
          pushStringAttribute(target, "xlink:role", value);
          break;
        case "xlinkShow":
          pushStringAttribute(target, "xlink:show", value);
          break;
        case "xlinkTitle":
          pushStringAttribute(target, "xlink:title", value);
          break;
        case "xlinkType":
          pushStringAttribute(target, "xlink:type", value);
          break;
        case "xmlBase":
          pushStringAttribute(target, "xml:base", value);
          break;
        case "xmlLang":
          pushStringAttribute(target, "xml:lang", value);
          break;
        case "xmlSpace":
          pushStringAttribute(target, "xml:space", value);
          break;
        default:
          if (
            !(2 < name.length) ||
            ("o" !== name[0] && "O" !== name[0]) ||
            ("n" !== name[1] && "N" !== name[1])
          )
            if (
              ((name = aliases.get(name) || name), isAttributeNameSafe(name))
            ) {
              switch (typeof value) {
                case "function":
                case "symbol":
                  return;
                case "boolean":
                  var prefix = name.toLowerCase().slice(0, 5);
                  if ("data-" !== prefix && "aria-" !== prefix) return;
              }
              target.push(
                attributeSeparator,
                name,
                attributeAssign,
                escapeTextForBrowser(value),
                attributeEnd
              );
            }
      }
    }
    function pushInnerHTML(target, innerHTML, children) {
      if (null != innerHTML) {
        if (null != children)
          throw Error(
            "Can only set one of `children` or `props.dangerouslySetInnerHTML`."
          );
        if ("object" !== typeof innerHTML || !("__html" in innerHTML))
          throw Error(
            "`props.dangerouslySetInnerHTML` must be in the form `{__html: ...}`. Please visit https://react.dev/link/dangerously-set-inner-html for more information."
          );
        innerHTML = innerHTML.__html;
        null !== innerHTML &&
          void 0 !== innerHTML &&
          (checkHtmlStringCoercion(innerHTML), target.push("" + innerHTML));
      }
    }
    function checkSelectProp(props, propName) {
      var value = props[propName];
      null != value &&
        ((value = isArrayImpl(value)),
        props.multiple && !value
          ? console.error(
              "The `%s` prop supplied to <select> must be an array if `multiple` is true.",
              propName
            )
          : !props.multiple &&
            value &&
            console.error(
              "The `%s` prop supplied to <select> must be a scalar value if `multiple` is false.",
              propName
            ));
    }
    function flattenOptionChildren(children) {
      var content = "";
      React.Children.forEach(children, function (child) {
        null != child &&
          ((content += child),
          didWarnInvalidOptionChildren ||
            "string" === typeof child ||
            "number" === typeof child ||
            "bigint" === typeof child ||
            ((didWarnInvalidOptionChildren = !0),
            console.error(
              "Cannot infer the option value of complex children. Pass a `value` prop or use a plain string as children to <option>."
            )));
      });
      return content;
    }
    function injectFormReplayingRuntime(resumableState, renderState) {
      0 !== (resumableState.instructions & 16) ||
        renderState.externalRuntimeScript ||
        ((resumableState.instructions |= 16),
        renderState.bootstrapChunks.unshift(
          renderState.startInlineScript,
          formReplayingRuntimeScript,
          "\x3c/script>"
        ));
    }
    function pushLinkImpl(target, props) {
      target.push(startChunkForTag("link"));
      for (var propKey in props)
        if (hasOwnProperty.call(props, propKey)) {
          var propValue = props[propKey];
          if (null != propValue)
            switch (propKey) {
              case "children":
              case "dangerouslySetInnerHTML":
                throw Error(
                  "link is a self-closing tag and must neither have `children` nor use `dangerouslySetInnerHTML`."
                );
              default:
                pushAttribute(target, propKey, propValue);
            }
        }
      target.push(endOfStartTagSelfClosing);
      return null;
    }
    function escapeStyleTextContent(styleText) {
      checkHtmlStringCoercion(styleText);
      return ("" + styleText).replace(styleRegex, styleReplacer);
    }
    function pushSelfClosing(target, props, tag) {
      target.push(startChunkForTag(tag));
      for (var propKey in props)
        if (hasOwnProperty.call(props, propKey)) {
          var propValue = props[propKey];
          if (null != propValue)
            switch (propKey) {
              case "children":
              case "dangerouslySetInnerHTML":
                throw Error(
                  tag +
                    " is a self-closing tag and must neither have `children` nor use `dangerouslySetInnerHTML`."
                );
              default:
                pushAttribute(target, propKey, propValue);
            }
        }
      target.push(endOfStartTagSelfClosing);
      return null;
    }
    function pushTitleImpl(target, props) {
      target.push(startChunkForTag("title"));
      var children = null,
        innerHTML = null,
        propKey;
      for (propKey in props)
        if (hasOwnProperty.call(props, propKey)) {
          var propValue = props[propKey];
          if (null != propValue)
            switch (propKey) {
              case "children":
                children = propValue;
                break;
              case "dangerouslySetInnerHTML":
                innerHTML = propValue;
                break;
              default:
                pushAttribute(target, propKey, propValue);
            }
        }
      target.push(endOfStartTag);
      props = Array.isArray(children)
        ? 2 > children.length
          ? children[0]
          : null
        : children;
      "function" !== typeof props &&
        "symbol" !== typeof props &&
        null !== props &&
        void 0 !== props &&
        target.push(escapeTextForBrowser("" + props));
      pushInnerHTML(target, innerHTML, children);
      target.push(endChunkForTag("title"));
      return null;
    }
    function pushScriptImpl(target, props) {
      target.push(startChunkForTag("script"));
      var children = null,
        innerHTML = null,
        propKey;
      for (propKey in props)
        if (hasOwnProperty.call(props, propKey)) {
          var propValue = props[propKey];
          if (null != propValue)
            switch (propKey) {
              case "children":
                children = propValue;
                break;
              case "dangerouslySetInnerHTML":
                innerHTML = propValue;
                break;
              default:
                pushAttribute(target, propKey, propValue);
            }
        }
      target.push(endOfStartTag);
      null != children &&
        "string" !== typeof children &&
        ((props =
          "number" === typeof children
            ? "a number for children"
            : Array.isArray(children)
              ? "an array for children"
              : "something unexpected for children"),
        console.error(
          "A script element was rendered with %s. If script element has children it must be a single string. Consider using dangerouslySetInnerHTML or passing a plain string as children.",
          props
        ));
      pushInnerHTML(target, innerHTML, children);
      "string" === typeof children &&
        target.push(escapeEntireInlineScriptContent(children));
      target.push(endChunkForTag("script"));
      return null;
    }
    function pushStartGenericElement(target, props, tag) {
      target.push(startChunkForTag(tag));
      var innerHTML = (tag = null),
        propKey;
      for (propKey in props)
        if (hasOwnProperty.call(props, propKey)) {
          var propValue = props[propKey];
          if (null != propValue)
            switch (propKey) {
              case "children":
                tag = propValue;
                break;
              case "dangerouslySetInnerHTML":
                innerHTML = propValue;
                break;
              default:
                pushAttribute(target, propKey, propValue);
            }
        }
      target.push(endOfStartTag);
      pushInnerHTML(target, innerHTML, tag);
      return "string" === typeof tag
        ? (target.push(escapeTextForBrowser(tag)), null)
        : tag;
    }
    function startChunkForTag(tag) {
      var tagStartChunk = validatedTagCache.get(tag);
      if (void 0 === tagStartChunk) {
        if (!VALID_TAG_REGEX.test(tag)) throw Error("Invalid tag: " + tag);
        tagStartChunk = "<" + tag;
        validatedTagCache.set(tag, tagStartChunk);
      }
      return tagStartChunk;
    }
    function pushStartInstance$1(
      target$jscomp$0,
      type,
      props,
      resumableState,
      renderState,
      hoistableState,
      formatContext,
      textEmbedded,
      isFallback
    ) {
      validateProperties$2(type, props);
      ("input" !== type && "textarea" !== type && "select" !== type) ||
        null == props ||
        null !== props.value ||
        didWarnValueNull ||
        ((didWarnValueNull = !0),
        "select" === type && props.multiple
          ? console.error(
              "`value` prop on `%s` should not be null. Consider using an empty array when `multiple` is set to `true` to clear the component or `undefined` for uncontrolled components.",
              type
            )
          : console.error(
              "`value` prop on `%s` should not be null. Consider using an empty string to clear the component or `undefined` for uncontrolled components.",
              type
            ));
      b: if (-1 === type.indexOf("-")) var JSCompiler_inline_result = !1;
      else
        switch (type) {
          case "annotation-xml":
          case "color-profile":
          case "font-face":
          case "font-face-src":
          case "font-face-uri":
          case "font-face-format":
          case "font-face-name":
          case "missing-glyph":
            JSCompiler_inline_result = !1;
            break b;
          default:
            JSCompiler_inline_result = !0;
        }
      JSCompiler_inline_result ||
        "string" === typeof props.is ||
        warnUnknownProperties(type, props, null);
      !props.suppressContentEditableWarning &&
        props.contentEditable &&
        null != props.children &&
        console.error(
          "A component is `contentEditable` and contains `children` managed by React. It is now your responsibility to guarantee that none of those nodes are unexpectedly modified or duplicated. This is probably not intentional."
        );
      3 !== formatContext.insertionMode &&
        4 !== formatContext.insertionMode &&
        -1 === type.indexOf("-") &&
        type.toLowerCase() !== type &&
        console.error(
          "<%s /> is using incorrect casing. Use PascalCase for React components, or lowercase for HTML elements.",
          type
        );
      switch (type) {
        case "div":
        case "span":
        case "svg":
        case "path":
          break;
        case "a":
          target$jscomp$0.push(startChunkForTag("a"));
          var children = null,
            innerHTML = null,
            propKey;
          for (propKey in props)
            if (hasOwnProperty.call(props, propKey)) {
              var propValue = props[propKey];
              if (null != propValue)
                switch (propKey) {
                  case "children":
                    children = propValue;
                    break;
                  case "dangerouslySetInnerHTML":
                    innerHTML = propValue;
                    break;
                  case "href":
                    "" === propValue
                      ? pushStringAttribute(target$jscomp$0, "href", "")
                      : pushAttribute(target$jscomp$0, propKey, propValue);
                    break;
                  default:
                    pushAttribute(target$jscomp$0, propKey, propValue);
                }
            }
          target$jscomp$0.push(endOfStartTag);
          pushInnerHTML(target$jscomp$0, innerHTML, children);
          if ("string" === typeof children) {
            target$jscomp$0.push(escapeTextForBrowser(children));
            var JSCompiler_inline_result$jscomp$0 = null;
          } else JSCompiler_inline_result$jscomp$0 = children;
          return JSCompiler_inline_result$jscomp$0;
        case "g":
        case "p":
        case "li":
          break;
        case "select":
          checkControlledValueProps("select", props);
          checkSelectProp(props, "value");
          checkSelectProp(props, "defaultValue");
          void 0 === props.value ||
            void 0 === props.defaultValue ||
            didWarnDefaultSelectValue ||
            (console.error(
              "Select elements must be either controlled or uncontrolled (specify either the value prop, or the defaultValue prop, but not both). Decide between using a controlled or uncontrolled select element and remove one of these props. More info: https://react.dev/link/controlled-components"
            ),
            (didWarnDefaultSelectValue = !0));
          target$jscomp$0.push(startChunkForTag("select"));
          var children$jscomp$0 = null,
            innerHTML$jscomp$0 = null,
            propKey$jscomp$0;
          for (propKey$jscomp$0 in props)
            if (hasOwnProperty.call(props, propKey$jscomp$0)) {
              var propValue$jscomp$0 = props[propKey$jscomp$0];
              if (null != propValue$jscomp$0)
                switch (propKey$jscomp$0) {
                  case "children":
                    children$jscomp$0 = propValue$jscomp$0;
                    break;
                  case "dangerouslySetInnerHTML":
                    innerHTML$jscomp$0 = propValue$jscomp$0;
                    break;
                  case "defaultValue":
                  case "value":
                    break;
                  default:
                    pushAttribute(
                      target$jscomp$0,
                      propKey$jscomp$0,
                      propValue$jscomp$0
                    );
                }
            }
          target$jscomp$0.push(endOfStartTag);
          pushInnerHTML(target$jscomp$0, innerHTML$jscomp$0, children$jscomp$0);
          return children$jscomp$0;
        case "option":
          var selectedValue = formatContext.selectedValue;
          target$jscomp$0.push(startChunkForTag("option"));
          var children$jscomp$1 = null,
            value = null,
            selected = null,
            innerHTML$jscomp$1 = null,
            propKey$jscomp$1;
          for (propKey$jscomp$1 in props)
            if (hasOwnProperty.call(props, propKey$jscomp$1)) {
              var propValue$jscomp$1 = props[propKey$jscomp$1];
              if (null != propValue$jscomp$1)
                switch (propKey$jscomp$1) {
                  case "children":
                    children$jscomp$1 = propValue$jscomp$1;
                    break;
                  case "selected":
                    selected = propValue$jscomp$1;
                    didWarnSelectedSetOnOption ||
                      (console.error(
                        "Use the `defaultValue` or `value` props on <select> instead of setting `selected` on <option>."
                      ),
                      (didWarnSelectedSetOnOption = !0));
                    break;
                  case "dangerouslySetInnerHTML":
                    innerHTML$jscomp$1 = propValue$jscomp$1;
                    break;
                  case "value":
                    value = propValue$jscomp$1;
                  default:
                    pushAttribute(
                      target$jscomp$0,
                      propKey$jscomp$1,
                      propValue$jscomp$1
                    );
                }
            }
          if (null != selectedValue) {
            if (null !== value) {
              checkAttributeStringCoercion(value, "value");
              var stringValue = "" + value;
            } else
              null === innerHTML$jscomp$1 ||
                didWarnInvalidOptionInnerHTML ||
                ((didWarnInvalidOptionInnerHTML = !0),
                console.error(
                  "Pass a `value` prop if you set dangerouslyInnerHTML so React knows which value should be selected."
                )),
                (stringValue = flattenOptionChildren(children$jscomp$1));
            if (isArrayImpl(selectedValue))
              for (var i = 0; i < selectedValue.length; i++) {
                if (
                  (checkAttributeStringCoercion(selectedValue[i], "value"),
                  "" + selectedValue[i] === stringValue)
                ) {
                  target$jscomp$0.push(' selected=""');
                  break;
                }
              }
            else
              checkAttributeStringCoercion(selectedValue, "select.value"),
                "" + selectedValue === stringValue &&
                  target$jscomp$0.push(' selected=""');
          } else selected && target$jscomp$0.push(' selected=""');
          target$jscomp$0.push(endOfStartTag);
          pushInnerHTML(target$jscomp$0, innerHTML$jscomp$1, children$jscomp$1);
          return children$jscomp$1;
        case "textarea":
          checkControlledValueProps("textarea", props);
          void 0 === props.value ||
            void 0 === props.defaultValue ||
            didWarnDefaultTextareaValue ||
            (console.error(
              "Textarea elements must be either controlled or uncontrolled (specify either the value prop, or the defaultValue prop, but not both). Decide between using a controlled or uncontrolled textarea and remove one of these props. More info: https://react.dev/link/controlled-components"
            ),
            (didWarnDefaultTextareaValue = !0));
          target$jscomp$0.push(startChunkForTag("textarea"));
          var value$jscomp$0 = null,
            defaultValue = null,
            children$jscomp$2 = null,
            propKey$jscomp$2;
          for (propKey$jscomp$2 in props)
            if (hasOwnProperty.call(props, propKey$jscomp$2)) {
              var propValue$jscomp$2 = props[propKey$jscomp$2];
              if (null != propValue$jscomp$2)
                switch (propKey$jscomp$2) {
                  case "children":
                    children$jscomp$2 = propValue$jscomp$2;
                    break;
                  case "value":
                    value$jscomp$0 = propValue$jscomp$2;
                    break;
                  case "defaultValue":
                    defaultValue = propValue$jscomp$2;
                    break;
                  case "dangerouslySetInnerHTML":
                    throw Error(
                      "`dangerouslySetInnerHTML` does not make sense on <textarea>."
                    );
                  default:
                    pushAttribute(
                      target$jscomp$0,
                      propKey$jscomp$2,
                      propValue$jscomp$2
                    );
                }
            }
          null === value$jscomp$0 &&
            null !== defaultValue &&
            (value$jscomp$0 = defaultValue);
          target$jscomp$0.push(endOfStartTag);
          if (null != children$jscomp$2) {
            console.error(
              "Use the `defaultValue` or `value` props instead of setting children on <textarea>."
            );
            if (null != value$jscomp$0)
              throw Error(
                "If you supply `defaultValue` on a <textarea>, do not pass children."
              );
            if (isArrayImpl(children$jscomp$2)) {
              if (1 < children$jscomp$2.length)
                throw Error("<textarea> can only have at most one child.");
              checkHtmlStringCoercion(children$jscomp$2[0]);
              value$jscomp$0 = "" + children$jscomp$2[0];
            }
            checkHtmlStringCoercion(children$jscomp$2);
            value$jscomp$0 = "" + children$jscomp$2;
          }
          "string" === typeof value$jscomp$0 &&
            "\n" === value$jscomp$0[0] &&
            target$jscomp$0.push(leadingNewline);
          null !== value$jscomp$0 &&
            (checkAttributeStringCoercion(value$jscomp$0, "value"),
            target$jscomp$0.push(escapeTextForBrowser("" + value$jscomp$0)));
          return null;
        case "input":
          checkControlledValueProps("input", props);
          target$jscomp$0.push(startChunkForTag("input"));
          var name = null,
            formAction = null,
            formEncType = null,
            formMethod = null,
            formTarget = null,
            value$jscomp$1 = null,
            defaultValue$jscomp$0 = null,
            checked = null,
            defaultChecked = null,
            propKey$jscomp$3;
          for (propKey$jscomp$3 in props)
            if (hasOwnProperty.call(props, propKey$jscomp$3)) {
              var propValue$jscomp$3 = props[propKey$jscomp$3];
              if (null != propValue$jscomp$3)
                switch (propKey$jscomp$3) {
                  case "children":
                  case "dangerouslySetInnerHTML":
                    throw Error(
                      "input is a self-closing tag and must neither have `children` nor use `dangerouslySetInnerHTML`."
                    );
                  case "name":
                    name = propValue$jscomp$3;
                    break;
                  case "formAction":
                    formAction = propValue$jscomp$3;
                    break;
                  case "formEncType":
                    formEncType = propValue$jscomp$3;
                    break;
                  case "formMethod":
                    formMethod = propValue$jscomp$3;
                    break;
                  case "formTarget":
                    formTarget = propValue$jscomp$3;
                    break;
                  case "defaultChecked":
                    defaultChecked = propValue$jscomp$3;
                    break;
                  case "defaultValue":
                    defaultValue$jscomp$0 = propValue$jscomp$3;
                    break;
                  case "checked":
                    checked = propValue$jscomp$3;
                    break;
                  case "value":
                    value$jscomp$1 = propValue$jscomp$3;
                    break;
                  default:
                    pushAttribute(
                      target$jscomp$0,
                      propKey$jscomp$3,
                      propValue$jscomp$3
                    );
                }
            }
          null === formAction ||
            "image" === props.type ||
            "submit" === props.type ||
            didWarnFormActionType ||
            ((didWarnFormActionType = !0),
            console.error(
              'An input can only specify a formAction along with type="submit" or type="image".'
            ));
          var formData = pushFormActionAttribute(
            target$jscomp$0,
            resumableState,
            renderState,
            formAction,
            formEncType,
            formMethod,
            formTarget,
            name
          );
          null === checked ||
            null === defaultChecked ||
            didWarnDefaultChecked ||
            (console.error(
              "%s contains an input of type %s with both checked and defaultChecked props. Input elements must be either controlled or uncontrolled (specify either the checked prop, or the defaultChecked prop, but not both). Decide between using a controlled or uncontrolled input element and remove one of these props. More info: https://react.dev/link/controlled-components",
              "A component",
              props.type
            ),
            (didWarnDefaultChecked = !0));
          null === value$jscomp$1 ||
            null === defaultValue$jscomp$0 ||
            didWarnDefaultInputValue ||
            (console.error(
              "%s contains an input of type %s with both value and defaultValue props. Input elements must be either controlled or uncontrolled (specify either the value prop, or the defaultValue prop, but not both). Decide between using a controlled or uncontrolled input element and remove one of these props. More info: https://react.dev/link/controlled-components",
              "A component",
              props.type
            ),
            (didWarnDefaultInputValue = !0));
          null !== checked
            ? pushBooleanAttribute(target$jscomp$0, "checked", checked)
            : null !== defaultChecked &&
              pushBooleanAttribute(target$jscomp$0, "checked", defaultChecked);
          null !== value$jscomp$1
            ? pushAttribute(target$jscomp$0, "value", value$jscomp$1)
            : null !== defaultValue$jscomp$0 &&
              pushAttribute(target$jscomp$0, "value", defaultValue$jscomp$0);
          target$jscomp$0.push(endOfStartTagSelfClosing);
          null != formData &&
            formData.forEach(pushAdditionalFormField, target$jscomp$0);
          return null;
        case "button":
          target$jscomp$0.push(startChunkForTag("button"));
          var children$jscomp$3 = null,
            innerHTML$jscomp$2 = null,
            name$jscomp$0 = null,
            formAction$jscomp$0 = null,
            formEncType$jscomp$0 = null,
            formMethod$jscomp$0 = null,
            formTarget$jscomp$0 = null,
            propKey$jscomp$4;
          for (propKey$jscomp$4 in props)
            if (hasOwnProperty.call(props, propKey$jscomp$4)) {
              var propValue$jscomp$4 = props[propKey$jscomp$4];
              if (null != propValue$jscomp$4)
                switch (propKey$jscomp$4) {
                  case "children":
                    children$jscomp$3 = propValue$jscomp$4;
                    break;
                  case "dangerouslySetInnerHTML":
                    innerHTML$jscomp$2 = propValue$jscomp$4;
                    break;
                  case "name":
                    name$jscomp$0 = propValue$jscomp$4;
                    break;
                  case "formAction":
                    formAction$jscomp$0 = propValue$jscomp$4;
                    break;
                  case "formEncType":
                    formEncType$jscomp$0 = propValue$jscomp$4;
                    break;
                  case "formMethod":
                    formMethod$jscomp$0 = propValue$jscomp$4;
                    break;
                  case "formTarget":
                    formTarget$jscomp$0 = propValue$jscomp$4;
                    break;
                  default:
                    pushAttribute(
                      target$jscomp$0,
                      propKey$jscomp$4,
                      propValue$jscomp$4
                    );
                }
            }
          null === formAction$jscomp$0 ||
            null == props.type ||
            "submit" === props.type ||
            didWarnFormActionType ||
            ((didWarnFormActionType = !0),
            console.error(
              'A button can only specify a formAction along with type="submit" or no type.'
            ));
          var formData$jscomp$0 = pushFormActionAttribute(
            target$jscomp$0,
            resumableState,
            renderState,
            formAction$jscomp$0,
            formEncType$jscomp$0,
            formMethod$jscomp$0,
            formTarget$jscomp$0,
            name$jscomp$0
          );
          target$jscomp$0.push(endOfStartTag);
          null != formData$jscomp$0 &&
            formData$jscomp$0.forEach(pushAdditionalFormField, target$jscomp$0);
          pushInnerHTML(target$jscomp$0, innerHTML$jscomp$2, children$jscomp$3);
          if ("string" === typeof children$jscomp$3) {
            target$jscomp$0.push(escapeTextForBrowser(children$jscomp$3));
            var JSCompiler_inline_result$jscomp$1 = null;
          } else JSCompiler_inline_result$jscomp$1 = children$jscomp$3;
          return JSCompiler_inline_result$jscomp$1;
        case "form":
          target$jscomp$0.push(startChunkForTag("form"));
          var children$jscomp$4 = null,
            innerHTML$jscomp$3 = null,
            formAction$jscomp$1 = null,
            formEncType$jscomp$1 = null,
            formMethod$jscomp$1 = null,
            formTarget$jscomp$1 = null,
            propKey$jscomp$5;
          for (propKey$jscomp$5 in props)
            if (hasOwnProperty.call(props, propKey$jscomp$5)) {
              var propValue$jscomp$5 = props[propKey$jscomp$5];
              if (null != propValue$jscomp$5)
                switch (propKey$jscomp$5) {
                  case "children":
                    children$jscomp$4 = propValue$jscomp$5;
                    break;
                  case "dangerouslySetInnerHTML":
                    innerHTML$jscomp$3 = propValue$jscomp$5;
                    break;
                  case "action":
                    formAction$jscomp$1 = propValue$jscomp$5;
                    break;
                  case "encType":
                    formEncType$jscomp$1 = propValue$jscomp$5;
                    break;
                  case "method":
                    formMethod$jscomp$1 = propValue$jscomp$5;
                    break;
                  case "target":
                    formTarget$jscomp$1 = propValue$jscomp$5;
                    break;
                  default:
                    pushAttribute(
                      target$jscomp$0,
                      propKey$jscomp$5,
                      propValue$jscomp$5
                    );
                }
            }
          var formData$jscomp$1 = null,
            formActionName = null;
          if ("function" === typeof formAction$jscomp$1) {
            (null === formEncType$jscomp$1 && null === formMethod$jscomp$1) ||
              didWarnFormActionMethod ||
              ((didWarnFormActionMethod = !0),
              console.error(
                "Cannot specify a encType or method for a form that specifies a function as the action. React provides those automatically. They will get overridden."
              ));
            null === formTarget$jscomp$1 ||
              didWarnFormActionTarget ||
              ((didWarnFormActionTarget = !0),
              console.error(
                "Cannot specify a target for a form that specifies a function as the action. The function will always be executed in the same window."
              ));
            var customFields = getCustomFormFields(
              resumableState,
              formAction$jscomp$1
            );
            null !== customFields
              ? ((formAction$jscomp$1 = customFields.action || ""),
                (formEncType$jscomp$1 = customFields.encType),
                (formMethod$jscomp$1 = customFields.method),
                (formTarget$jscomp$1 = customFields.target),
                (formData$jscomp$1 = customFields.data),
                (formActionName = customFields.name))
              : (target$jscomp$0.push(
                  attributeSeparator,
                  "action",
                  attributeAssign,
                  actionJavaScriptURL,
                  attributeEnd
                ),
                (formTarget$jscomp$1 =
                  formMethod$jscomp$1 =
                  formEncType$jscomp$1 =
                  formAction$jscomp$1 =
                    null),
                injectFormReplayingRuntime(resumableState, renderState));
          }
          null != formAction$jscomp$1 &&
            pushAttribute(target$jscomp$0, "action", formAction$jscomp$1);
          null != formEncType$jscomp$1 &&
            pushAttribute(target$jscomp$0, "encType", formEncType$jscomp$1);
          null != formMethod$jscomp$1 &&
            pushAttribute(target$jscomp$0, "method", formMethod$jscomp$1);
          null != formTarget$jscomp$1 &&
            pushAttribute(target$jscomp$0, "target", formTarget$jscomp$1);
          target$jscomp$0.push(endOfStartTag);
          null !== formActionName &&
            (target$jscomp$0.push('<input type="hidden"'),
            pushStringAttribute(target$jscomp$0, "name", formActionName),
            target$jscomp$0.push(endOfStartTagSelfClosing),
            null != formData$jscomp$1 &&
              formData$jscomp$1.forEach(
                pushAdditionalFormField,
                target$jscomp$0
              ));
          pushInnerHTML(target$jscomp$0, innerHTML$jscomp$3, children$jscomp$4);
          if ("string" === typeof children$jscomp$4) {
            target$jscomp$0.push(escapeTextForBrowser(children$jscomp$4));
            var JSCompiler_inline_result$jscomp$2 = null;
          } else JSCompiler_inline_result$jscomp$2 = children$jscomp$4;
          return JSCompiler_inline_result$jscomp$2;
        case "menuitem":
          target$jscomp$0.push(startChunkForTag("menuitem"));
          for (var propKey$jscomp$6 in props)
            if (hasOwnProperty.call(props, propKey$jscomp$6)) {
              var propValue$jscomp$6 = props[propKey$jscomp$6];
              if (null != propValue$jscomp$6)
                switch (propKey$jscomp$6) {
                  case "children":
                  case "dangerouslySetInnerHTML":
                    throw Error(
                      "menuitems cannot have `children` nor `dangerouslySetInnerHTML`."
                    );
                  default:
                    pushAttribute(
                      target$jscomp$0,
                      propKey$jscomp$6,
                      propValue$jscomp$6
                    );
                }
            }
          target$jscomp$0.push(endOfStartTag);
          return null;
        case "object":
          target$jscomp$0.push(startChunkForTag("object"));
          var children$jscomp$5 = null,
            innerHTML$jscomp$4 = null,
            propKey$jscomp$7;
          for (propKey$jscomp$7 in props)
            if (hasOwnProperty.call(props, propKey$jscomp$7)) {
              var propValue$jscomp$7 = props[propKey$jscomp$7];
              if (null != propValue$jscomp$7)
                switch (propKey$jscomp$7) {
                  case "children":
                    children$jscomp$5 = propValue$jscomp$7;
                    break;
                  case "dangerouslySetInnerHTML":
                    innerHTML$jscomp$4 = propValue$jscomp$7;
                    break;
                  case "data":
                    checkAttributeStringCoercion(propValue$jscomp$7, "data");
                    var sanitizedValue = sanitizeURL("" + propValue$jscomp$7);
                    if ("" === sanitizedValue) {
                      console.error(
                        'An empty string ("") was passed to the %s attribute. To fix this, either do not render the element at all or pass null to %s instead of an empty string.',
                        propKey$jscomp$7,
                        propKey$jscomp$7
                      );
                      break;
                    }
                    target$jscomp$0.push(
                      attributeSeparator,
                      "data",
                      attributeAssign,
                      escapeTextForBrowser(sanitizedValue),
                      attributeEnd
                    );
                    break;
                  default:
                    pushAttribute(
                      target$jscomp$0,
                      propKey$jscomp$7,
                      propValue$jscomp$7
                    );
                }
            }
          target$jscomp$0.push(endOfStartTag);
          pushInnerHTML(target$jscomp$0, innerHTML$jscomp$4, children$jscomp$5);
          if ("string" === typeof children$jscomp$5) {
            target$jscomp$0.push(escapeTextForBrowser(children$jscomp$5));
            var JSCompiler_inline_result$jscomp$3 = null;
          } else JSCompiler_inline_result$jscomp$3 = children$jscomp$5;
          return JSCompiler_inline_result$jscomp$3;
        case "title":
          var insertionMode = formatContext.insertionMode,
            noscriptTagInScope = !!(formatContext.tagScope & 1);
          if (hasOwnProperty.call(props, "children")) {
            var children$jscomp$6 = props.children,
              child = Array.isArray(children$jscomp$6)
                ? 2 > children$jscomp$6.length
                  ? children$jscomp$6[0]
                  : null
                : children$jscomp$6;
            Array.isArray(children$jscomp$6) && 1 < children$jscomp$6.length
              ? console.error(
                  "React expects the `children` prop of <title> tags to be a string, number, bigint, or object with a novel `toString` method but found an Array with length %s instead. Browsers treat all child Nodes of <title> tags as Text content and React expects to be able to convert `children` of <title> tags to a single string value which is why Arrays of length greater than 1 are not supported. When using JSX it can be commong to combine text nodes and value nodes. For example: <title>hello {nameOfUser}</title>. While not immediately apparent, `children` in this case is an Array with length 2. If your `children` prop is using this form try rewriting it using a template string: <title>{`hello ${nameOfUser}`}</title>.",
                  children$jscomp$6.length
                )
              : "function" === typeof child || "symbol" === typeof child
                ? console.error(
                    "React expect children of <title> tags to be a string, number, bigint, or object with a novel `toString` method but found %s instead. Browsers treat all child Nodes of <title> tags as Text content and React expects to be able to convert children of <title> tags to a single string value.",
                    "function" === typeof child ? "a Function" : "a Sybmol"
                  )
                : child &&
                  child.toString === {}.toString &&
                  (null != child.$$typeof
                    ? console.error(
                        "React expects the `children` prop of <title> tags to be a string, number, bigint, or object with a novel `toString` method but found an object that appears to be a React element which never implements a suitable `toString` method. Browsers treat all child Nodes of <title> tags as Text content and React expects to be able to convert children of <title> tags to a single string value which is why rendering React elements is not supported. If the `children` of <title> is a React Component try moving the <title> tag into that component. If the `children` of <title> is some HTML markup change it to be Text only to be valid HTML."
                      )
                    : console.error(
                        "React expects the `children` prop of <title> tags to be a string, number, bigint, or object with a novel `toString` method but found an object that does not implement a suitable `toString` method. Browsers treat all child Nodes of <title> tags as Text content and React expects to be able to convert children of <title> tags to a single string value. Using the default `toString` method available on every object is almost certainly an error. Consider whether the `children` of this <title> is an object in error and change it to a string or number value if so. Otherwise implement a `toString` method that React can use to produce a valid <title>."
                      ));
          }
          if (
            3 === insertionMode ||
            noscriptTagInScope ||
            null != props.itemProp
          )
            var JSCompiler_inline_result$jscomp$4 = pushTitleImpl(
              target$jscomp$0,
              props
            );
          else
            isFallback
              ? (JSCompiler_inline_result$jscomp$4 = null)
              : (pushTitleImpl(renderState.hoistableChunks, props),
                (JSCompiler_inline_result$jscomp$4 = void 0));
          return JSCompiler_inline_result$jscomp$4;
        case "link":
          var rel = props.rel,
            href = props.href,
            precedence = props.precedence;
          if (
            3 === formatContext.insertionMode ||
            formatContext.tagScope & 1 ||
            null != props.itemProp ||
            "string" !== typeof rel ||
            "string" !== typeof href ||
            "" === href
          ) {
            "stylesheet" === rel &&
              "string" === typeof props.precedence &&
              (("string" === typeof href && href) ||
                console.error(
                  'React encountered a `<link rel="stylesheet" .../>` with a `precedence` prop and expected the `href` prop to be a non-empty string but ecountered %s instead. If your intent was to have React hoist and deduplciate this stylesheet using the `precedence` prop ensure there is a non-empty string `href` prop as well, otherwise remove the `precedence` prop.',
                  null === href
                    ? "`null`"
                    : void 0 === href
                      ? "`undefined`"
                      : "" === href
                        ? "an empty string"
                        : 'something with type "' + typeof href + '"'
                ));
            pushLinkImpl(target$jscomp$0, props);
            var JSCompiler_inline_result$jscomp$5 = null;
          } else if ("stylesheet" === props.rel)
            if (
              "string" !== typeof precedence ||
              null != props.disabled ||
              props.onLoad ||
              props.onError
            ) {
              if ("string" === typeof precedence)
                if (null != props.disabled)
                  console.error(
                    'React encountered a `<link rel="stylesheet" .../>` with a `precedence` prop and a `disabled` prop. The presence of the `disabled` prop indicates an intent to manage the stylesheet active state from your from your Component code and React will not hoist or deduplicate this stylesheet. If your intent was to have React hoist and deduplciate this stylesheet using the `precedence` prop remove the `disabled` prop, otherwise remove the `precedence` prop.'
                  );
                else if (props.onLoad || props.onError) {
                  var propDescription =
                    props.onLoad && props.onError
                      ? "`onLoad` and `onError` props"
                      : props.onLoad
                        ? "`onLoad` prop"
                        : "`onError` prop";
                  console.error(
                    'React encountered a `<link rel="stylesheet" .../>` with a `precedence` prop and %s. The presence of loading and error handlers indicates an intent to manage the stylesheet loading state from your from your Component code and React will not hoist or deduplicate this stylesheet. If your intent was to have React hoist and deduplciate this stylesheet using the `precedence` prop remove the %s, otherwise remove the `precedence` prop.',
                    propDescription,
                    propDescription
                  );
                }
              JSCompiler_inline_result$jscomp$5 = pushLinkImpl(
                target$jscomp$0,
                props
              );
            } else {
              var styleQueue = renderState.styles.get(precedence),
                resourceState = resumableState.styleResources.hasOwnProperty(
                  href
                )
                  ? resumableState.styleResources[href]
                  : void 0;
              if (null !== resourceState) {
                resumableState.styleResources[href] = null;
                styleQueue ||
                  ((styleQueue = {
                    precedence: escapeTextForBrowser(precedence),
                    rules: [],
                    hrefs: [],
                    sheets: new Map()
                  }),
                  renderState.styles.set(precedence, styleQueue));
                var resource = {
                  state: PENDING$1,
                  props: assign({}, props, {
                    "data-precedence": props.precedence,
                    precedence: null
                  })
                };
                if (resourceState) {
                  2 === resourceState.length &&
                    adoptPreloadCredentials(resource.props, resourceState);
                  var preloadResource =
                    renderState.preloads.stylesheets.get(href);
                  preloadResource && 0 < preloadResource.length
                    ? (preloadResource.length = 0)
                    : (resource.state = PRELOADED);
                }
                styleQueue.sheets.set(href, resource);
                hoistableState && hoistableState.stylesheets.add(resource);
              } else if (styleQueue) {
                var _resource = styleQueue.sheets.get(href);
                _resource &&
                  hoistableState &&
                  hoistableState.stylesheets.add(_resource);
              }
              textEmbedded && target$jscomp$0.push("\x3c!-- --\x3e");
              JSCompiler_inline_result$jscomp$5 = null;
            }
          else
            props.onLoad || props.onError
              ? (JSCompiler_inline_result$jscomp$5 = pushLinkImpl(
                  target$jscomp$0,
                  props
                ))
              : (textEmbedded && target$jscomp$0.push("\x3c!-- --\x3e"),
                (JSCompiler_inline_result$jscomp$5 = isFallback
                  ? null
                  : pushLinkImpl(renderState.hoistableChunks, props)));
          return JSCompiler_inline_result$jscomp$5;
        case "script":
          var asyncProp = props.async;
          if (
            "string" !== typeof props.src ||
            !props.src ||
            !asyncProp ||
            "function" === typeof asyncProp ||
            "symbol" === typeof asyncProp ||
            props.onLoad ||
            props.onError ||
            3 === formatContext.insertionMode ||
            formatContext.tagScope & 1 ||
            null != props.itemProp
          )
            var JSCompiler_inline_result$jscomp$6 = pushScriptImpl(
              target$jscomp$0,
              props
            );
          else {
            var key = props.src;
            if ("module" === props.type) {
              var resources = resumableState.moduleScriptResources;
              var preloads = renderState.preloads.moduleScripts;
            } else
              (resources = resumableState.scriptResources),
                (preloads = renderState.preloads.scripts);
            var resourceState$jscomp$0 = resources.hasOwnProperty(key)
              ? resources[key]
              : void 0;
            if (null !== resourceState$jscomp$0) {
              resources[key] = null;
              var scriptProps = props;
              if (resourceState$jscomp$0) {
                2 === resourceState$jscomp$0.length &&
                  ((scriptProps = assign({}, props)),
                  adoptPreloadCredentials(scriptProps, resourceState$jscomp$0));
                var preloadResource$jscomp$0 = preloads.get(key);
                preloadResource$jscomp$0 &&
                  (preloadResource$jscomp$0.length = 0);
              }
              var resource$jscomp$0 = [];
              renderState.scripts.add(resource$jscomp$0);
              pushScriptImpl(resource$jscomp$0, scriptProps);
            }
            textEmbedded && target$jscomp$0.push("\x3c!-- --\x3e");
            JSCompiler_inline_result$jscomp$6 = null;
          }
          return JSCompiler_inline_result$jscomp$6;
        case "style":
          var insertionMode$jscomp$0 = formatContext.insertionMode,
            noscriptTagInScope$jscomp$0 = !!(formatContext.tagScope & 1);
          if (hasOwnProperty.call(props, "children")) {
            var children$jscomp$7 = props.children,
              child$jscomp$0 = Array.isArray(children$jscomp$7)
                ? 2 > children$jscomp$7.length
                  ? children$jscomp$7[0]
                  : null
                : children$jscomp$7;
            ("function" === typeof child$jscomp$0 ||
              "symbol" === typeof child$jscomp$0 ||
              Array.isArray(child$jscomp$0)) &&
              console.error(
                "React expect children of <style> tags to be a string, number, or object with a `toString` method but found %s instead. In browsers style Elements can only have `Text` Nodes as children.",
                "function" === typeof child$jscomp$0
                  ? "a Function"
                  : "symbol" === typeof child$jscomp$0
                    ? "a Sybmol"
                    : "an Array"
              );
          }
          var precedence$jscomp$0 = props.precedence,
            href$jscomp$0 = props.href;
          if (
            3 === insertionMode$jscomp$0 ||
            noscriptTagInScope$jscomp$0 ||
            null != props.itemProp ||
            "string" !== typeof precedence$jscomp$0 ||
            "string" !== typeof href$jscomp$0 ||
            "" === href$jscomp$0
          ) {
            target$jscomp$0.push(startChunkForTag("style"));
            var children$jscomp$8 = null,
              innerHTML$jscomp$5 = null,
              propKey$jscomp$8;
            for (propKey$jscomp$8 in props)
              if (hasOwnProperty.call(props, propKey$jscomp$8)) {
                var propValue$jscomp$8 = props[propKey$jscomp$8];
                if (null != propValue$jscomp$8)
                  switch (propKey$jscomp$8) {
                    case "children":
                      children$jscomp$8 = propValue$jscomp$8;
                      break;
                    case "dangerouslySetInnerHTML":
                      innerHTML$jscomp$5 = propValue$jscomp$8;
                      break;
                    default:
                      pushAttribute(
                        target$jscomp$0,
                        propKey$jscomp$8,
                        propValue$jscomp$8
                      );
                  }
              }
            target$jscomp$0.push(endOfStartTag);
            var child$jscomp$1 = Array.isArray(children$jscomp$8)
              ? 2 > children$jscomp$8.length
                ? children$jscomp$8[0]
                : null
              : children$jscomp$8;
            "function" !== typeof child$jscomp$1 &&
              "symbol" !== typeof child$jscomp$1 &&
              null !== child$jscomp$1 &&
              void 0 !== child$jscomp$1 &&
              target$jscomp$0.push(escapeStyleTextContent(child$jscomp$1));
            pushInnerHTML(
              target$jscomp$0,
              innerHTML$jscomp$5,
              children$jscomp$8
            );
            target$jscomp$0.push(endChunkForTag("style"));
            var JSCompiler_inline_result$jscomp$7 = null;
          } else {
            href$jscomp$0.includes(" ") &&
              console.error(
                'React expected the `href` prop for a <style> tag opting into hoisting semantics using the `precedence` prop to not have any spaces but ecountered spaces instead. using spaces in this prop will cause hydration of this style to fail on the client. The href for the <style> where this ocurred is "%s".',
                href$jscomp$0
              );
            var styleQueue$jscomp$0 =
                renderState.styles.get(precedence$jscomp$0),
              resourceState$jscomp$1 =
                resumableState.styleResources.hasOwnProperty(href$jscomp$0)
                  ? resumableState.styleResources[href$jscomp$0]
                  : void 0;
            if (null !== resourceState$jscomp$1) {
              resumableState.styleResources[href$jscomp$0] = null;
              resourceState$jscomp$1 &&
                console.error(
                  'React encountered a hoistable style tag for the same href as a preload: "%s". When using a style tag to inline styles you should not also preload it as a stylsheet.',
                  href$jscomp$0
                );
              styleQueue$jscomp$0
                ? styleQueue$jscomp$0.hrefs.push(
                    escapeTextForBrowser(href$jscomp$0)
                  )
                : ((styleQueue$jscomp$0 = {
                    precedence: escapeTextForBrowser(precedence$jscomp$0),
                    rules: [],
                    hrefs: [escapeTextForBrowser(href$jscomp$0)],
                    sheets: new Map()
                  }),
                  renderState.styles.set(
                    precedence$jscomp$0,
                    styleQueue$jscomp$0
                  ));
              var target = styleQueue$jscomp$0.rules,
                children$jscomp$9 = null,
                innerHTML$jscomp$6 = null,
                propKey$jscomp$9;
              for (propKey$jscomp$9 in props)
                if (hasOwnProperty.call(props, propKey$jscomp$9)) {
                  var propValue$jscomp$9 = props[propKey$jscomp$9];
                  if (null != propValue$jscomp$9)
                    switch (propKey$jscomp$9) {
                      case "children":
                        children$jscomp$9 = propValue$jscomp$9;
                        break;
                      case "dangerouslySetInnerHTML":
                        innerHTML$jscomp$6 = propValue$jscomp$9;
                    }
                }
              var child$jscomp$2 = Array.isArray(children$jscomp$9)
                ? 2 > children$jscomp$9.length
                  ? children$jscomp$9[0]
                  : null
                : children$jscomp$9;
              "function" !== typeof child$jscomp$2 &&
                "symbol" !== typeof child$jscomp$2 &&
                null !== child$jscomp$2 &&
                void 0 !== child$jscomp$2 &&
                target.push(escapeStyleTextContent(child$jscomp$2));
              pushInnerHTML(target, innerHTML$jscomp$6, children$jscomp$9);
            }
            styleQueue$jscomp$0 &&
              hoistableState &&
              hoistableState.styles.add(styleQueue$jscomp$0);
            textEmbedded && target$jscomp$0.push("\x3c!-- --\x3e");
            JSCompiler_inline_result$jscomp$7 = void 0;
          }
          return JSCompiler_inline_result$jscomp$7;
        case "meta":
          if (
            3 === formatContext.insertionMode ||
            formatContext.tagScope & 1 ||
            null != props.itemProp
          )
            var JSCompiler_inline_result$jscomp$8 = pushSelfClosing(
              target$jscomp$0,
              props,
              "meta"
            );
          else
            textEmbedded && target$jscomp$0.push("\x3c!-- --\x3e"),
              (JSCompiler_inline_result$jscomp$8 = isFallback
                ? null
                : "string" === typeof props.charSet
                  ? pushSelfClosing(renderState.charsetChunks, props, "meta")
                  : "viewport" === props.name
                    ? pushSelfClosing(renderState.viewportChunks, props, "meta")
                    : pushSelfClosing(
                        renderState.hoistableChunks,
                        props,
                        "meta"
                      ));
          return JSCompiler_inline_result$jscomp$8;
        case "listing":
        case "pre":
          target$jscomp$0.push(startChunkForTag(type));
          var children$jscomp$10 = null,
            innerHTML$jscomp$7 = null,
            propKey$jscomp$10;
          for (propKey$jscomp$10 in props)
            if (hasOwnProperty.call(props, propKey$jscomp$10)) {
              var propValue$jscomp$10 = props[propKey$jscomp$10];
              if (null != propValue$jscomp$10)
                switch (propKey$jscomp$10) {
                  case "children":
                    children$jscomp$10 = propValue$jscomp$10;
                    break;
                  case "dangerouslySetInnerHTML":
                    innerHTML$jscomp$7 = propValue$jscomp$10;
                    break;
                  default:
                    pushAttribute(
                      target$jscomp$0,
                      propKey$jscomp$10,
                      propValue$jscomp$10
                    );
                }
            }
          target$jscomp$0.push(endOfStartTag);
          if (null != innerHTML$jscomp$7) {
            if (null != children$jscomp$10)
              throw Error(
                "Can only set one of `children` or `props.dangerouslySetInnerHTML`."
              );
            if (
              "object" !== typeof innerHTML$jscomp$7 ||
              !("__html" in innerHTML$jscomp$7)
            )
              throw Error(
                "`props.dangerouslySetInnerHTML` must be in the form `{__html: ...}`. Please visit https://react.dev/link/dangerously-set-inner-html for more information."
              );
            var html = innerHTML$jscomp$7.__html;
            null !== html &&
              void 0 !== html &&
              ("string" === typeof html && 0 < html.length && "\n" === html[0]
                ? target$jscomp$0.push(leadingNewline, html)
                : (checkHtmlStringCoercion(html),
                  target$jscomp$0.push("" + html)));
          }
          "string" === typeof children$jscomp$10 &&
            "\n" === children$jscomp$10[0] &&
            target$jscomp$0.push(leadingNewline);
          return children$jscomp$10;
        case "img":
          var src = props.src,
            srcSet = props.srcSet;
          if (
            !(
              "lazy" === props.loading ||
              (!src && !srcSet) ||
              ("string" !== typeof src && null != src) ||
              ("string" !== typeof srcSet && null != srcSet)
            ) &&
            "low" !== props.fetchPriority &&
            !1 === !!(formatContext.tagScope & 3) &&
            ("string" !== typeof src ||
              ":" !== src[4] ||
              ("d" !== src[0] && "D" !== src[0]) ||
              ("a" !== src[1] && "A" !== src[1]) ||
              ("t" !== src[2] && "T" !== src[2]) ||
              ("a" !== src[3] && "A" !== src[3])) &&
            ("string" !== typeof srcSet ||
              ":" !== srcSet[4] ||
              ("d" !== srcSet[0] && "D" !== srcSet[0]) ||
              ("a" !== srcSet[1] && "A" !== srcSet[1]) ||
              ("t" !== srcSet[2] && "T" !== srcSet[2]) ||
              ("a" !== srcSet[3] && "A" !== srcSet[3]))
          ) {
            var sizes = "string" === typeof props.sizes ? props.sizes : void 0,
              key$jscomp$0 = srcSet ? srcSet + "\n" + (sizes || "") : src,
              promotablePreloads = renderState.preloads.images,
              resource$jscomp$1 = promotablePreloads.get(key$jscomp$0);
            if (resource$jscomp$1) {
              if (
                "high" === props.fetchPriority ||
                10 > renderState.highImagePreloads.size
              )
                promotablePreloads.delete(key$jscomp$0),
                  renderState.highImagePreloads.add(resource$jscomp$1);
            } else if (
              !resumableState.imageResources.hasOwnProperty(key$jscomp$0)
            ) {
              resumableState.imageResources[key$jscomp$0] = PRELOAD_NO_CREDS;
              var input = props.crossOrigin;
              var crossOrigin =
                "string" === typeof input
                  ? "use-credentials" === input
                    ? input
                    : ""
                  : void 0;
              var headers = renderState.headers,
                header;
              headers &&
              0 < headers.remainingCapacity &&
              ("high" === props.fetchPriority ||
                500 > headers.highImagePreloads.length) &&
              ((header = getPreloadAsHeader(src, "image", {
                imageSrcSet: props.srcSet,
                imageSizes: props.sizes,
                crossOrigin: crossOrigin,
                integrity: props.integrity,
                nonce: props.nonce,
                type: props.type,
                fetchPriority: props.fetchPriority,
                referrerPolicy: props.refererPolicy
              })),
              0 <= (headers.remainingCapacity -= header.length + 2))
                ? ((renderState.resets.image[key$jscomp$0] = PRELOAD_NO_CREDS),
                  headers.highImagePreloads &&
                    (headers.highImagePreloads += ", "),
                  (headers.highImagePreloads += header))
                : ((resource$jscomp$1 = []),
                  pushLinkImpl(resource$jscomp$1, {
                    rel: "preload",
                    as: "image",
                    href: srcSet ? void 0 : src,
                    imageSrcSet: srcSet,
                    imageSizes: sizes,
                    crossOrigin: crossOrigin,
                    integrity: props.integrity,
                    type: props.type,
                    fetchPriority: props.fetchPriority,
                    referrerPolicy: props.referrerPolicy
                  }),
                  "high" === props.fetchPriority ||
                  10 > renderState.highImagePreloads.size
                    ? renderState.highImagePreloads.add(resource$jscomp$1)
                    : (renderState.bulkPreloads.add(resource$jscomp$1),
                      promotablePreloads.set(key$jscomp$0, resource$jscomp$1)));
            }
          }
          return pushSelfClosing(target$jscomp$0, props, "img");
        case "base":
        case "area":
        case "br":
        case "col":
        case "embed":
        case "hr":
        case "keygen":
        case "param":
        case "source":
        case "track":
        case "wbr":
          return pushSelfClosing(target$jscomp$0, props, type);
        case "annotation-xml":
        case "color-profile":
        case "font-face":
        case "font-face-src":
        case "font-face-uri":
        case "font-face-format":
        case "font-face-name":
        case "missing-glyph":
          break;
        case "head":
          if (
            2 > formatContext.insertionMode &&
            null === renderState.headChunks
          ) {
            renderState.headChunks = [];
            var JSCompiler_inline_result$jscomp$9 = pushStartGenericElement(
              renderState.headChunks,
              props,
              "head"
            );
          } else
            JSCompiler_inline_result$jscomp$9 = pushStartGenericElement(
              target$jscomp$0,
              props,
              "head"
            );
          return JSCompiler_inline_result$jscomp$9;
        case "html":
          if (
            0 === formatContext.insertionMode &&
            null === renderState.htmlChunks
          ) {
            renderState.htmlChunks = [doctypeChunk];
            var JSCompiler_inline_result$jscomp$10 = pushStartGenericElement(
              renderState.htmlChunks,
              props,
              "html"
            );
          } else
            JSCompiler_inline_result$jscomp$10 = pushStartGenericElement(
              target$jscomp$0,
              props,
              "html"
            );
          return JSCompiler_inline_result$jscomp$10;
        default:
          if (-1 !== type.indexOf("-")) {
            target$jscomp$0.push(startChunkForTag(type));
            var children$jscomp$11 = null,
              innerHTML$jscomp$8 = null,
              propKey$jscomp$11;
            for (propKey$jscomp$11 in props)
              if (hasOwnProperty.call(props, propKey$jscomp$11)) {
                var propValue$jscomp$11 = props[propKey$jscomp$11];
                if (null != propValue$jscomp$11) {
                  var attributeName = propKey$jscomp$11;
                  switch (propKey$jscomp$11) {
                    case "children":
                      children$jscomp$11 = propValue$jscomp$11;
                      break;
                    case "dangerouslySetInnerHTML":
                      innerHTML$jscomp$8 = propValue$jscomp$11;
                      break;
                    case "style":
                      pushStyleAttribute(target$jscomp$0, propValue$jscomp$11);
                      break;
                    case "suppressContentEditableWarning":
                    case "suppressHydrationWarning":
                    case "ref":
                      break;
                    case "className":
                      attributeName = "class";
                    default:
                      if (
                        isAttributeNameSafe(propKey$jscomp$11) &&
                        "function" !== typeof propValue$jscomp$11 &&
                        "symbol" !== typeof propValue$jscomp$11 &&
                        !1 !== propValue$jscomp$11
                      ) {
                        if (!0 === propValue$jscomp$11)
                          propValue$jscomp$11 = "";
                        else if ("object" === typeof propValue$jscomp$11)
                          continue;
                        target$jscomp$0.push(
                          attributeSeparator,
                          attributeName,
                          attributeAssign,
                          escapeTextForBrowser(propValue$jscomp$11),
                          attributeEnd
                        );
                      }
                  }
                }
              }
            target$jscomp$0.push(endOfStartTag);
            pushInnerHTML(
              target$jscomp$0,
              innerHTML$jscomp$8,
              children$jscomp$11
            );
            return children$jscomp$11;
          }
      }
      return pushStartGenericElement(target$jscomp$0, props, type);
    }
    function endChunkForTag(tag) {
      var chunk = endTagCache.get(tag);
      void 0 === chunk &&
        ((chunk = "</" + tag + ">"), endTagCache.set(tag, chunk));
      return chunk;
    }
    function writeBootstrap(destination, renderState) {
      renderState = renderState.bootstrapChunks;
      for (var i = 0; i < renderState.length - 1; i++)
        destination.push(renderState[i]);
      return i < renderState.length
        ? ((i = renderState[i]), (renderState.length = 0), destination.push(i))
        : !0;
    }
    function writeStartPendingSuspenseBoundary(destination, renderState, id) {
      destination.push('\x3c!--$?--\x3e<template id="');
      if (null === id)
        throw Error(
          "An ID must have been assigned before we can complete the boundary."
        );
      destination.push(renderState.boundaryPrefix);
      renderState = id.toString(16);
      destination.push(renderState);
      return destination.push('"></template>');
    }
    function writeStartSegment(destination, renderState, formatContext, id) {
      switch (formatContext.insertionMode) {
        case 0:
        case 1:
        case 2:
          return (
            destination.push('<div hidden id="'),
            destination.push(renderState.segmentPrefix),
            (renderState = id.toString(16)),
            destination.push(renderState),
            destination.push('">')
          );
        case 3:
          return (
            destination.push(
              '<svg aria-hidden="true" style="display:none" id="'
            ),
            destination.push(renderState.segmentPrefix),
            (renderState = id.toString(16)),
            destination.push(renderState),
            destination.push('">')
          );
        case 4:
          return (
            destination.push(
              '<math aria-hidden="true" style="display:none" id="'
            ),
            destination.push(renderState.segmentPrefix),
            (renderState = id.toString(16)),
            destination.push(renderState),
            destination.push('">')
          );
        case 5:
          return (
            destination.push('<table hidden id="'),
            destination.push(renderState.segmentPrefix),
            (renderState = id.toString(16)),
            destination.push(renderState),
            destination.push('">')
          );
        case 6:
          return (
            destination.push('<table hidden><tbody id="'),
            destination.push(renderState.segmentPrefix),
            (renderState = id.toString(16)),
            destination.push(renderState),
            destination.push('">')
          );
        case 7:
          return (
            destination.push('<table hidden><tr id="'),
            destination.push(renderState.segmentPrefix),
            (renderState = id.toString(16)),
            destination.push(renderState),
            destination.push('">')
          );
        case 8:
          return (
            destination.push('<table hidden><colgroup id="'),
            destination.push(renderState.segmentPrefix),
            (renderState = id.toString(16)),
            destination.push(renderState),
            destination.push('">')
          );
        default:
          throw Error("Unknown insertion mode. This is a bug in React.");
      }
    }
    function writeEndSegment(destination, formatContext) {
      switch (formatContext.insertionMode) {
        case 0:
        case 1:
        case 2:
          return destination.push("</div>");
        case 3:
          return destination.push("</svg>");
        case 4:
          return destination.push("</math>");
        case 5:
          return destination.push("</table>");
        case 6:
          return destination.push("</tbody></table>");
        case 7:
          return destination.push("</tr></table>");
        case 8:
          return destination.push("</colgroup></table>");
        default:
          throw Error("Unknown insertion mode. This is a bug in React.");
      }
    }
    function escapeJSStringsForInstructionScripts(input) {
      return JSON.stringify(input).replace(
        regexForJSStringsInInstructionScripts,
        function (match) {
          switch (match) {
            case "<":
              return "\\u003c";
            case "\u2028":
              return "\\u2028";
            case "\u2029":
              return "\\u2029";
            default:
              throw Error(
                "escapeJSStringsForInstructionScripts encountered a match it does not know how to replace. this means the match regex and the replacement characters are no longer in sync. This is a bug in React"
              );
          }
        }
      );
    }
    function escapeJSObjectForInstructionScripts(input) {
      return JSON.stringify(input).replace(
        regexForJSStringsInScripts,
        function (match) {
          switch (match) {
            case "&":
              return "\\u0026";
            case ">":
              return "\\u003e";
            case "<":
              return "\\u003c";
            case "\u2028":
              return "\\u2028";
            case "\u2029":
              return "\\u2029";
            default:
              throw Error(
                "escapeJSObjectForInstructionScripts encountered a match it does not know how to replace. this means the match regex and the replacement characters are no longer in sync. This is a bug in React"
              );
          }
        }
      );
    }
    function flushStyleTagsLateForBoundary(styleQueue) {
      var rules = styleQueue.rules,
        hrefs = styleQueue.hrefs;
      0 < rules.length &&
        0 === hrefs.length &&
        console.error(
          "React expected to have at least one href for an a hoistable style but found none. This is a bug in React."
        );
      var i = 0;
      if (hrefs.length) {
        this.push('<style media="not all" data-precedence="');
        this.push(styleQueue.precedence);
        for (this.push('" data-href="'); i < hrefs.length - 1; i++)
          this.push(hrefs[i]), this.push(spaceSeparator);
        this.push(hrefs[i]);
        this.push('">');
        for (i = 0; i < rules.length; i++) this.push(rules[i]);
        destinationHasCapacity = this.push("</style>");
        currentlyRenderingBoundaryHasStylesToHoist = !0;
        rules.length = 0;
        hrefs.length = 0;
      }
    }
    function hasStylesToHoist(stylesheet) {
      return stylesheet.state !== PREAMBLE
        ? (currentlyRenderingBoundaryHasStylesToHoist = !0)
        : !1;
    }
    function writeHoistablesForBoundary(
      destination,
      hoistableState,
      renderState
    ) {
      currentlyRenderingBoundaryHasStylesToHoist = !1;
      destinationHasCapacity = !0;
      hoistableState.styles.forEach(flushStyleTagsLateForBoundary, destination);
      hoistableState.stylesheets.forEach(hasStylesToHoist);
      currentlyRenderingBoundaryHasStylesToHoist &&
        (renderState.stylesToHoist = !0);
      return destinationHasCapacity;
    }
    function flushResource(resource) {
      for (var i = 0; i < resource.length; i++) this.push(resource[i]);
      resource.length = 0;
    }
    function flushStyleInPreamble(stylesheet) {
      pushLinkImpl(stylesheetFlushingQueue, stylesheet.props);
      for (var i = 0; i < stylesheetFlushingQueue.length; i++)
        this.push(stylesheetFlushingQueue[i]);
      stylesheetFlushingQueue.length = 0;
      stylesheet.state = PREAMBLE;
    }
    function flushStylesInPreamble(styleQueue) {
      var hasStylesheets = 0 < styleQueue.sheets.size;
      styleQueue.sheets.forEach(flushStyleInPreamble, this);
      styleQueue.sheets.clear();
      var rules = styleQueue.rules,
        hrefs = styleQueue.hrefs;
      if (!hasStylesheets || hrefs.length) {
        this.push('<style data-precedence="');
        this.push(styleQueue.precedence);
        styleQueue = 0;
        if (hrefs.length) {
          for (
            this.push('" data-href="');
            styleQueue < hrefs.length - 1;
            styleQueue++
          )
            this.push(hrefs[styleQueue]), this.push(spaceSeparator);
          this.push(hrefs[styleQueue]);
        }
        this.push('">');
        for (styleQueue = 0; styleQueue < rules.length; styleQueue++)
          this.push(rules[styleQueue]);
        this.push("</style>");
        rules.length = 0;
        hrefs.length = 0;
      }
    }
    function preloadLateStyle(stylesheet) {
      if (stylesheet.state === PENDING$1) {
        stylesheet.state = PRELOADED;
        var props = stylesheet.props;
        pushLinkImpl(stylesheetFlushingQueue, {
          rel: "preload",
          as: "style",
          href: stylesheet.props.href,
          crossOrigin: props.crossOrigin,
          fetchPriority: props.fetchPriority,
          integrity: props.integrity,
          media: props.media,
          hrefLang: props.hrefLang,
          referrerPolicy: props.referrerPolicy
        });
        for (
          stylesheet = 0;
          stylesheet < stylesheetFlushingQueue.length;
          stylesheet++
        )
          this.push(stylesheetFlushingQueue[stylesheet]);
        stylesheetFlushingQueue.length = 0;
      }
    }
    function preloadLateStyles(styleQueue) {
      styleQueue.sheets.forEach(preloadLateStyle, this);
      styleQueue.sheets.clear();
    }
    function writeStyleResourceDependenciesInJS(destination, hoistableState) {
      destination.push(arrayFirstOpenBracket);
      var nextArrayOpenBrackChunk = arrayFirstOpenBracket;
      hoistableState.stylesheets.forEach(function (resource) {
        if (resource.state !== PREAMBLE)
          if (resource.state === LATE)
            destination.push(nextArrayOpenBrackChunk),
              (resource = resource.props.href),
              checkAttributeStringCoercion(resource, "href"),
              (resource = escapeJSObjectForInstructionScripts("" + resource)),
              destination.push(resource),
              destination.push(arrayCloseBracket),
              (nextArrayOpenBrackChunk = arraySubsequentOpenBracket);
          else {
            destination.push(nextArrayOpenBrackChunk);
            var precedence = resource.props["data-precedence"],
              props = resource.props,
              coercedHref = sanitizeURL("" + resource.props.href);
            coercedHref = escapeJSObjectForInstructionScripts(coercedHref);
            destination.push(coercedHref);
            checkAttributeStringCoercion(precedence, "precedence");
            precedence = "" + precedence;
            destination.push(arrayInterstitial);
            precedence = escapeJSObjectForInstructionScripts(precedence);
            destination.push(precedence);
            for (var propKey in props)
              if (
                hasOwnProperty.call(props, propKey) &&
                ((precedence = props[propKey]), null != precedence)
              )
                switch (propKey) {
                  case "href":
                  case "rel":
                  case "precedence":
                  case "data-precedence":
                    break;
                  case "children":
                  case "dangerouslySetInnerHTML":
                    throw Error(
                      "link is a self-closing tag and must neither have `children` nor use `dangerouslySetInnerHTML`."
                    );
                  default:
                    writeStyleResourceAttributeInJS(
                      destination,
                      propKey,
                      precedence
                    );
                }
            destination.push(arrayCloseBracket);
            nextArrayOpenBrackChunk = arraySubsequentOpenBracket;
            resource.state = LATE;
          }
      });
      destination.push(arrayCloseBracket);
    }
    function writeStyleResourceAttributeInJS(destination, name, value) {
      var attributeName = name.toLowerCase();
      switch (typeof value) {
        case "function":
        case "symbol":
          return;
      }
      switch (name) {
        case "innerHTML":
        case "dangerouslySetInnerHTML":
        case "suppressContentEditableWarning":
        case "suppressHydrationWarning":
        case "style":
        case "ref":
          return;
        case "className":
          attributeName = "class";
          checkAttributeStringCoercion(value, attributeName);
          name = "" + value;
          break;
        case "hidden":
          if (!1 === value) return;
          name = "";
          break;
        case "src":
        case "href":
          value = sanitizeURL(value);
          checkAttributeStringCoercion(value, attributeName);
          name = "" + value;
          break;
        default:
          if (
            (2 < name.length &&
              ("o" === name[0] || "O" === name[0]) &&
              ("n" === name[1] || "N" === name[1])) ||
            !isAttributeNameSafe(name)
          )
            return;
          checkAttributeStringCoercion(value, attributeName);
          name = "" + value;
      }
      destination.push(arrayInterstitial);
      attributeName = escapeJSObjectForInstructionScripts(attributeName);
      destination.push(attributeName);
      destination.push(arrayInterstitial);
      attributeName = escapeJSObjectForInstructionScripts(name);
      destination.push(attributeName);
    }
    function writeStyleResourceDependenciesInAttr(destination, hoistableState) {
      destination.push(arrayFirstOpenBracket);
      var nextArrayOpenBrackChunk = arrayFirstOpenBracket;
      hoistableState.stylesheets.forEach(function (resource) {
        if (resource.state !== PREAMBLE)
          if (resource.state === LATE)
            destination.push(nextArrayOpenBrackChunk),
              (resource = resource.props.href),
              checkAttributeStringCoercion(resource, "href"),
              (resource = escapeTextForBrowser(JSON.stringify("" + resource))),
              destination.push(resource),
              destination.push(arrayCloseBracket),
              (nextArrayOpenBrackChunk = arraySubsequentOpenBracket);
          else {
            destination.push(nextArrayOpenBrackChunk);
            var precedence = resource.props["data-precedence"],
              props = resource.props,
              coercedHref = sanitizeURL("" + resource.props.href);
            coercedHref = escapeTextForBrowser(JSON.stringify(coercedHref));
            destination.push(coercedHref);
            checkAttributeStringCoercion(precedence, "precedence");
            precedence = "" + precedence;
            destination.push(arrayInterstitial);
            precedence = escapeTextForBrowser(JSON.stringify(precedence));
            destination.push(precedence);
            for (var propKey in props)
              if (
                hasOwnProperty.call(props, propKey) &&
                ((precedence = props[propKey]), null != precedence)
              )
                switch (propKey) {
                  case "href":
                  case "rel":
                  case "precedence":
                  case "data-precedence":
                    break;
                  case "children":
                  case "dangerouslySetInnerHTML":
                    throw Error(
                      "link is a self-closing tag and must neither have `children` nor use `dangerouslySetInnerHTML`."
                    );
                  default:
                    writeStyleResourceAttributeInAttr(
                      destination,
                      propKey,
                      precedence
                    );
                }
            destination.push(arrayCloseBracket);
            nextArrayOpenBrackChunk = arraySubsequentOpenBracket;
            resource.state = LATE;
          }
      });
      destination.push(arrayCloseBracket);
    }
    function writeStyleResourceAttributeInAttr(destination, name, value) {
      var attributeName = name.toLowerCase();
      switch (typeof value) {
        case "function":
        case "symbol":
          return;
      }
      switch (name) {
        case "innerHTML":
        case "dangerouslySetInnerHTML":
        case "suppressContentEditableWarning":
        case "suppressHydrationWarning":
        case "style":
        case "ref":
          return;
        case "className":
          attributeName = "class";
          checkAttributeStringCoercion(value, attributeName);
          name = "" + value;
          break;
        case "hidden":
          if (!1 === value) return;
          name = "";
          break;
        case "src":
        case "href":
          value = sanitizeURL(value);
          checkAttributeStringCoercion(value, attributeName);
          name = "" + value;
          break;
        default:
          if (
            (2 < name.length &&
              ("o" === name[0] || "O" === name[0]) &&
              ("n" === name[1] || "N" === name[1])) ||
            !isAttributeNameSafe(name)
          )
            return;
          checkAttributeStringCoercion(value, attributeName);
          name = "" + value;
      }
      destination.push(arrayInterstitial);
      attributeName = escapeTextForBrowser(JSON.stringify(attributeName));
      destination.push(attributeName);
      destination.push(arrayInterstitial);
      attributeName = escapeTextForBrowser(JSON.stringify(name));
      destination.push(attributeName);
    }
    function createHoistableState() {
      return { styles: new Set(), stylesheets: new Set() };
    }
    function preloadBootstrapScriptOrModule(
      resumableState,
      renderState,
      href,
      props
    ) {
      (resumableState.scriptResources.hasOwnProperty(href) ||
        resumableState.moduleScriptResources.hasOwnProperty(href)) &&
        console.error(
          'Internal React Error: React expected bootstrap script or module with src "%s" to not have been preloaded already. please file an issue',
          href
        );
      resumableState.scriptResources[href] = null;
      resumableState.moduleScriptResources[href] = null;
      resumableState = [];
      pushLinkImpl(resumableState, props);
      renderState.bootstrapScripts.add(resumableState);
    }
    function adoptPreloadCredentials(target, preloadState) {
      null == target.crossOrigin && (target.crossOrigin = preloadState[0]);
      null == target.integrity && (target.integrity = preloadState[1]);
    }
    function getPreloadAsHeader(href, as, params) {
      checkAttributeStringCoercion(href, "href");
      href = ("" + href).replace(
        regexForHrefInLinkHeaderURLContext,
        escapeHrefForLinkHeaderURLContextReplacer
      );
      as = escapeStringForLinkHeaderQuotedParamValueContext(as, "as");
      as = "<" + href + '>; rel=preload; as="' + as + '"';
      for (var paramName in params)
        hasOwnProperty.call(params, paramName) &&
          ((href = params[paramName]),
          "string" === typeof href &&
            (as +=
              "; " +
              paramName.toLowerCase() +
              '="' +
              escapeStringForLinkHeaderQuotedParamValueContext(
                href,
                paramName
              ) +
              '"'));
      return as;
    }
    function escapeHrefForLinkHeaderURLContextReplacer(match) {
      switch (match) {
        case "<":
          return "%3C";
        case ">":
          return "%3E";
        case "\n":
          return "%0A";
        case "\r":
          return "%0D";
        default:
          throw Error(
            "escapeLinkHrefForHeaderContextReplacer encountered a match it does not know how to replace. this means the match regex and the replacement characters are no longer in sync. This is a bug in React"
          );
      }
    }
    function escapeStringForLinkHeaderQuotedParamValueContext(value, name) {
      willCoercionThrow(value) &&
        (console.error(
          "The provided `%s` option is an unsupported type %s. This value must be coerced to a string before using it here.",
          name,
          typeName(value)
        ),
        testStringCoercion(value));
      return ("" + value).replace(
        regexForLinkHeaderQuotedParamValueContext,
        escapeStringForLinkHeaderQuotedParamValueContextReplacer
      );
    }
    function escapeStringForLinkHeaderQuotedParamValueContextReplacer(match) {
      switch (match) {
        case '"':
          return "%22";
        case "'":
          return "%27";
        case ";":
          return "%3B";
        case ",":
          return "%2C";
        case "\n":
          return "%0A";
        case "\r":
          return "%0D";
        default:
          throw Error(
            "escapeStringForLinkHeaderQuotedParamValueContextReplacer encountered a match it does not know how to replace. this means the match regex and the replacement characters are no longer in sync. This is a bug in React"
          );
      }
    }
    function hoistStyleQueueDependency(styleQueue) {
      this.styles.add(styleQueue);
    }
    function hoistStylesheetDependency(stylesheet) {
      this.stylesheets.add(stylesheet);
    }
    function popToNearestCommonAncestor(prev, next) {
      if (prev !== next) {
        prev.context._currentValue2 = prev.parentValue;
        prev = prev.parent;
        var parentNext = next.parent;
        if (null === prev) {
          if (null !== parentNext)
            throw Error(
              "The stacks must reach the root at the same time. This is a bug in React."
            );
        } else {
          if (null === parentNext)
            throw Error(
              "The stacks must reach the root at the same time. This is a bug in React."
            );
          popToNearestCommonAncestor(prev, parentNext);
        }
        next.context._currentValue2 = next.value;
      }
    }
    function popAllPrevious(prev) {
      prev.context._currentValue2 = prev.parentValue;
      prev = prev.parent;
      null !== prev && popAllPrevious(prev);
    }
    function pushAllNext(next) {
      var parentNext = next.parent;
      null !== parentNext && pushAllNext(parentNext);
      next.context._currentValue2 = next.value;
    }
    function popPreviousToCommonLevel(prev, next) {
      prev.context._currentValue2 = prev.parentValue;
      prev = prev.parent;
      if (null === prev)
        throw Error(
          "The depth must equal at least at zero before reaching the root. This is a bug in React."
        );
      prev.depth === next.depth
        ? popToNearestCommonAncestor(prev, next)
        : popPreviousToCommonLevel(prev, next);
    }
    function popNextToCommonLevel(prev, next) {
      var parentNext = next.parent;
      if (null === parentNext)
        throw Error(
          "The depth must equal at least at zero before reaching the root. This is a bug in React."
        );
      prev.depth === parentNext.depth
        ? popToNearestCommonAncestor(prev, parentNext)
        : popNextToCommonLevel(prev, parentNext);
      next.context._currentValue2 = next.value;
    }
    function switchContext(newSnapshot) {
      var prev = currentActiveSnapshot;
      prev !== newSnapshot &&
        (null === prev
          ? pushAllNext(newSnapshot)
          : null === newSnapshot
            ? popAllPrevious(prev)
            : prev.depth === newSnapshot.depth
              ? popToNearestCommonAncestor(prev, newSnapshot)
              : prev.depth > newSnapshot.depth
                ? popPreviousToCommonLevel(prev, newSnapshot)
                : popNextToCommonLevel(prev, newSnapshot),
        (currentActiveSnapshot = newSnapshot));
    }
    function warnOnInvalidCallback(callback) {
      if (null !== callback && "function" !== typeof callback) {
        var key = String(callback);
        didWarnOnInvalidCallback.has(key) ||
          (didWarnOnInvalidCallback.add(key),
          console.error(
            "Expected the last optional `callback` argument to be a function. Instead received: %s.",
            callback
          ));
      }
    }
    function warnNoop(publicInstance, callerName) {
      publicInstance =
        ((publicInstance = publicInstance.constructor) &&
          getComponentNameFromType(publicInstance)) ||
        "ReactClass";
      var warningKey = publicInstance + "." + callerName;
      didWarnAboutNoopUpdateForComponent[warningKey] ||
        (console.error(
          "Can only update a mounting component. This usually means you called %s() outside componentWillMount() on the server. This is a no-op.\n\nPlease check the code for the %s component.",
          callerName,
          publicInstance
        ),
        (didWarnAboutNoopUpdateForComponent[warningKey] = !0));
    }
    function pushTreeContext(baseContext, totalChildren, index) {
      var baseIdWithLeadingBit = baseContext.id;
      baseContext = baseContext.overflow;
      var baseLength = 32 - clz32(baseIdWithLeadingBit) - 1;
      baseIdWithLeadingBit &= ~(1 << baseLength);
      index += 1;
      var length = 32 - clz32(totalChildren) + baseLength;
      if (30 < length) {
        var numberOfOverflowBits = baseLength - (baseLength % 5);
        length = (
          baseIdWithLeadingBit &
          ((1 << numberOfOverflowBits) - 1)
        ).toString(32);
        baseIdWithLeadingBit >>= numberOfOverflowBits;
        baseLength -= numberOfOverflowBits;
        return {
          id:
            (1 << (32 - clz32(totalChildren) + baseLength)) |
            (index << baseLength) |
            baseIdWithLeadingBit,
          overflow: length + baseContext
        };
      }
      return {
        id: (1 << length) | (index << baseLength) | baseIdWithLeadingBit,
        overflow: baseContext
      };
    }
    function clz32Fallback(x) {
      x >>>= 0;
      return 0 === x ? 32 : (31 - ((log(x) / LN2) | 0)) | 0;
    }
    function noop$2() {}
    function trackUsedThenable(thenableState, thenable, index) {
      index = thenableState[index];
      void 0 === index
        ? thenableState.push(thenable)
        : index !== thenable &&
          (thenable.then(noop$2, noop$2), (thenable = index));
      switch (thenable.status) {
        case "fulfilled":
          return thenable.value;
        case "rejected":
          throw thenable.reason;
        default:
          "string" === typeof thenable.status
            ? thenable.then(noop$2, noop$2)
            : ((thenableState = thenable),
              (thenableState.status = "pending"),
              thenableState.then(
                function (fulfilledValue) {
                  if ("pending" === thenable.status) {
                    var fulfilledThenable = thenable;
                    fulfilledThenable.status = "fulfilled";
                    fulfilledThenable.value = fulfilledValue;
                  }
                },
                function (error) {
                  if ("pending" === thenable.status) {
                    var rejectedThenable = thenable;
                    rejectedThenable.status = "rejected";
                    rejectedThenable.reason = error;
                  }
                }
              ));
          switch (thenable.status) {
            case "fulfilled":
              return thenable.value;
            case "rejected":
              throw thenable.reason;
          }
          suspendedThenable = thenable;
          throw SuspenseException;
      }
    }
    function getSuspendedThenable() {
      if (null === suspendedThenable)
        throw Error(
          "Expected a suspended thenable. This is a bug in React. Please file an issue."
        );
      var thenable = suspendedThenable;
      suspendedThenable = null;
      return thenable;
    }
    function is(x, y) {
      return (x === y && (0 !== x || 1 / x === 1 / y)) || (x !== x && y !== y);
    }
    function resolveCurrentlyRenderingComponent() {
      if (null === currentlyRenderingComponent)
        throw Error(
          "Invalid hook call. Hooks can only be called inside of the body of a function component. This could happen for one of the following reasons:\n1. You might have mismatching versions of React and the renderer (such as React DOM)\n2. You might be breaking the Rules of Hooks\n3. You might have more than one copy of React in the same app\nSee https://react.dev/link/invalid-hook-call for tips about how to debug and fix this problem."
        );
      isInHookUserCodeInDev &&
        console.error(
          "Do not call Hooks inside useEffect(...), useMemo(...), or other built-in Hooks. You can only call Hooks at the top level of your React function. For more information, see https://react.dev/link/rules-of-hooks"
        );
      return currentlyRenderingComponent;
    }
    function createHook() {
      if (0 < numberOfReRenders)
        throw Error("Rendered more hooks than during the previous render");
      return { memoizedState: null, queue: null, next: null };
    }
    function getThenableStateAfterSuspending() {
      var state = thenableState;
      thenableState = null;
      return state;
    }
    function resetHooksState() {
      isInHookUserCodeInDev = !1;
      currentlyRenderingKeyPath =
        currentlyRenderingRequest =
        currentlyRenderingTask =
        currentlyRenderingComponent =
          null;
      didScheduleRenderPhaseUpdate = !1;
      firstWorkInProgressHook = null;
      numberOfReRenders = 0;
      workInProgressHook = null;
    }
    function readContext(context) {
      isInHookUserCodeInDev &&
        console.error(
          "Context can only be read while React is rendering. In classes, you can read it in the render method or getDerivedStateFromProps. In function components, you can read it directly in the function body, but not inside Hooks like useReducer() or useMemo()."
        );
      return context._currentValue2;
    }
    function useMemo(nextCreate, deps) {
      currentlyRenderingComponent = resolveCurrentlyRenderingComponent();
      null === workInProgressHook
        ? null === firstWorkInProgressHook
          ? (firstWorkInProgressHook = workInProgressHook = createHook())
          : (workInProgressHook = firstWorkInProgressHook)
        : (workInProgressHook =
            null === workInProgressHook.next
              ? (workInProgressHook.next = createHook())
              : workInProgressHook.next);
      deps = void 0 === deps ? null : deps;
      if (null !== workInProgressHook) {
        var prevState = workInProgressHook.memoizedState;
        if (null !== prevState && null !== deps) {
          a: {
            var JSCompiler_inline_result = prevState[1];
            if (null === JSCompiler_inline_result)
              console.error(
                "%s received a final argument during this render, but not during the previous render. Even though the final argument is optional, its type cannot change between renders.",
                currentHookNameInDev
              ),
                (JSCompiler_inline_result = !1);
            else {
              deps.length !== JSCompiler_inline_result.length &&
                console.error(
                  "The final argument passed to %s changed size between renders. The order and size of this array must remain constant.\n\nPrevious: %s\nIncoming: %s",
                  currentHookNameInDev,
                  "[" + deps.join(", ") + "]",
                  "[" + JSCompiler_inline_result.join(", ") + "]"
                );
              for (
                var i = 0;
                i < JSCompiler_inline_result.length && i < deps.length;
                i++
              )
                if (!objectIs(deps[i], JSCompiler_inline_result[i])) {
                  JSCompiler_inline_result = !1;
                  break a;
                }
              JSCompiler_inline_result = !0;
            }
          }
          if (JSCompiler_inline_result) return prevState[0];
        }
      }
      isInHookUserCodeInDev = !0;
      nextCreate = nextCreate();
      isInHookUserCodeInDev = !1;
      workInProgressHook.memoizedState = [nextCreate, deps];
      return nextCreate;
    }
    function throwOnUseEffectEventCall() {
      throw Error(
        "A function wrapped in useEffectEvent can't be called during rendering."
      );
    }
    function unsupportedSetOptimisticState() {
      throw Error("Cannot update optimistic state while rendering.");
    }
    function useActionState(action, initialState, permalink) {
      resolveCurrentlyRenderingComponent();
      var actionStateHookIndex = actionStateCounter++,
        request = currentlyRenderingRequest;
      if ("function" === typeof action.$$FORM_ACTION) {
        var nextPostbackStateKey = null,
          componentKeyPath = currentlyRenderingKeyPath;
        request = request.formState;
        var isSignatureEqual = action.$$IS_SIGNATURE_EQUAL;
        if (null !== request && "function" === typeof isSignatureEqual) {
          var postbackKey = request[1];
          isSignatureEqual.call(action, request[2], request[3]) &&
            ((nextPostbackStateKey =
              void 0 !== permalink
                ? "p" + permalink
                : "k" +
                  murmurhash3_32_gc(
                    JSON.stringify([
                      componentKeyPath,
                      null,
                      actionStateHookIndex
                    ]),
                    0
                  )),
            postbackKey === nextPostbackStateKey &&
              ((actionStateMatchingIndex = actionStateHookIndex),
              (initialState = request[0])));
        }
        var boundAction = action.bind(null, initialState);
        action = function (payload) {
          boundAction(payload);
        };
        "function" === typeof boundAction.$$FORM_ACTION &&
          (action.$$FORM_ACTION = function (prefix) {
            prefix = boundAction.$$FORM_ACTION(prefix);
            void 0 !== permalink &&
              (checkAttributeStringCoercion(permalink, "target"),
              (permalink += ""),
              (prefix.action = permalink));
            var formData = prefix.data;
            formData &&
              (null === nextPostbackStateKey &&
                (nextPostbackStateKey =
                  void 0 !== permalink
                    ? "p" + permalink
                    : "k" +
                      murmurhash3_32_gc(
                        JSON.stringify([
                          componentKeyPath,
                          null,
                          actionStateHookIndex
                        ]),
                        0
                      )),
              formData.append("$ACTION_KEY", nextPostbackStateKey));
            return prefix;
          });
        return [initialState, action, !1];
      }
      var _boundAction = action.bind(null, initialState);
      return [
        initialState,
        function (payload) {
          _boundAction(payload);
        },
        !1
      ];
    }
    function unwrapThenable(thenable) {
      var index = thenableIndexCounter;
      thenableIndexCounter += 1;
      null === thenableState && (thenableState = []);
      return trackUsedThenable(thenableState, thenable, index);
    }
    function readPreviousThenableFromState() {
      var index = thenableIndexCounter;
      thenableIndexCounter += 1;
      if (null !== thenableState)
        return (
          (index = thenableState[index]),
          (index = void 0 === index ? void 0 : index.value),
          index
        );
    }
    function unsupportedRefresh() {
      throw Error("Cache cannot be refreshed during server rendering.");
    }
    function clientHookNotSupported() {
      throw Error(
        "Cannot use state or effect Hooks in renderToHTML because this component will never be hydrated."
      );
    }
    function describeComponentStackByType(type) {
      if ("string" === typeof type) return describeBuiltInComponentFrame(type);
      if ("function" === typeof type)
        return type.prototype && type.prototype.isReactComponent
          ? ((type = describeNativeComponentFrame(type, !0)), type)
          : describeNativeComponentFrame(type, !1);
      if ("object" === typeof type && null !== type) {
        switch (type.$$typeof) {
          case REACT_FORWARD_REF_TYPE:
            return describeNativeComponentFrame(type.render, !1);
          case REACT_MEMO_TYPE:
            return describeNativeComponentFrame(type.type, !1);
          case REACT_LAZY_TYPE:
            var lazyComponent = type,
              payload = lazyComponent._payload;
            lazyComponent = lazyComponent._init;
            try {
              type = lazyComponent(payload);
            } catch (x) {
              return describeBuiltInComponentFrame("Lazy");
            }
            return describeComponentStackByType(type);
        }
        if ("string" === typeof type.name)
          return (
            (payload = type.env),
            describeBuiltInComponentFrame(
              type.name + (payload ? " [" + payload + "]" : "")
            )
          );
      }
      switch (type) {
        case REACT_SUSPENSE_LIST_TYPE:
          return describeBuiltInComponentFrame("SuspenseList");
        case REACT_SUSPENSE_TYPE:
          return describeBuiltInComponentFrame("Suspense");
      }
      return "";
    }
    function defaultErrorHandler(error) {
      "object" === typeof error &&
      null !== error &&
      "string" === typeof error.environmentName
        ? bindToConsole("error", [error], error.environmentName)()
        : console.error(error);
      return null;
    }
    function noop() {}
    function RequestInstance(
      resumableState,
      renderState,
      rootFormatContext,
      progressiveChunkSize,
      onError,
      onAllReady,
      onShellReady,
      onShellError,
      onFatalError,
      onPostpone,
      formState
    ) {
      var abortSet = new Set();
      this.destination = null;
      this.flushScheduled = !1;
      this.resumableState = resumableState;
      this.renderState = renderState;
      this.rootFormatContext = rootFormatContext;
      this.progressiveChunkSize =
        void 0 === progressiveChunkSize ? 12800 : progressiveChunkSize;
      this.status = 10;
      this.fatalError = null;
      this.pendingRootTasks = this.allPendingTasks = this.nextSegmentId = 0;
      this.completedRootSegment = null;
      this.abortableTasks = abortSet;
      this.pingedTasks = [];
      this.clientRenderedBoundaries = [];
      this.completedBoundaries = [];
      this.partialBoundaries = [];
      this.trackedPostpones = null;
      this.onError = void 0 === onError ? defaultErrorHandler : onError;
      this.onPostpone = void 0 === onPostpone ? noop : onPostpone;
      this.onAllReady = void 0 === onAllReady ? noop : onAllReady;
      this.onShellReady = void 0 === onShellReady ? noop : onShellReady;
      this.onShellError = void 0 === onShellError ? noop : onShellError;
      this.onFatalError = void 0 === onFatalError ? noop : onFatalError;
      this.formState = void 0 === formState ? null : formState;
      this.didWarnForKey = null;
    }
    function createRequest(
      children,
      resumableState,
      renderState,
      rootFormatContext,
      progressiveChunkSize,
      onError,
      onAllReady,
      onShellReady,
      onShellError,
      onFatalError,
      onPostpone,
      formState
    ) {
      resumableState = new RequestInstance(
        resumableState,
        renderState,
        rootFormatContext,
        progressiveChunkSize,
        onError,
        onAllReady,
        onShellReady,
        onShellError,
        onFatalError,
        onPostpone,
        formState
      );
      renderState = createPendingSegment(
        resumableState,
        0,
        null,
        rootFormatContext,
        !1,
        !1
      );
      renderState.parentFlushed = !0;
      children = createRenderTask(
        resumableState,
        null,
        children,
        -1,
        null,
        renderState,
        null,
        resumableState.abortableTasks,
        null,
        rootFormatContext,
        null,
        emptyTreeContext,
        null,
        !1,
        emptyContextObject,
        null
      );
      pushComponentStack(children);
      resumableState.pingedTasks.push(children);
      return resumableState;
    }
    function pingTask(request, task) {
      request.pingedTasks.push(task);
      1 === request.pingedTasks.length &&
        ((request.flushScheduled = null !== request.destination),
        performWork(request));
    }
    function createSuspenseBoundary(request, fallbackAbortableTasks) {
      return {
        status: 0,
        rootSegmentID: -1,
        parentFlushed: !1,
        pendingTasks: 0,
        completedSegments: [],
        byteSize: 0,
        fallbackAbortableTasks: fallbackAbortableTasks,
        errorDigest: null,
        contentState: createHoistableState(),
        fallbackState: createHoistableState(),
        trackedContentKeyPath: null,
        trackedFallbackNode: null,
        errorMessage: null,
        errorStack: null,
        errorComponentStack: null
      };
    }
    function createRenderTask(
      request,
      thenableState,
      node,
      childIndex,
      blockedBoundary,
      blockedSegment,
      hoistableState,
      abortSet,
      keyPath,
      formatContext,
      context,
      treeContext,
      componentStack,
      isFallback,
      legacyContext,
      debugTask
    ) {
      request.allPendingTasks++;
      null === blockedBoundary
        ? request.pendingRootTasks++
        : blockedBoundary.pendingTasks++;
      var task = {
        replay: null,
        node: node,
        childIndex: childIndex,
        ping: function () {
          return pingTask(request, task);
        },
        blockedBoundary: blockedBoundary,
        blockedSegment: blockedSegment,
        hoistableState: hoistableState,
        abortSet: abortSet,
        keyPath: keyPath,
        formatContext: formatContext,
        context: context,
        treeContext: treeContext,
        componentStack: componentStack,
        thenableState: thenableState,
        isFallback: isFallback
      };
      task.debugTask = debugTask;
      abortSet.add(task);
      return task;
    }
    function createReplayTask(
      request,
      thenableState,
      replay,
      node,
      childIndex,
      blockedBoundary,
      hoistableState,
      abortSet,
      keyPath,
      formatContext,
      context,
      treeContext,
      componentStack,
      isFallback,
      legacyContext,
      debugTask
    ) {
      request.allPendingTasks++;
      null === blockedBoundary
        ? request.pendingRootTasks++
        : blockedBoundary.pendingTasks++;
      replay.pendingTasks++;
      var task = {
        replay: replay,
        node: node,
        childIndex: childIndex,
        ping: function () {
          return pingTask(request, task);
        },
        blockedBoundary: blockedBoundary,
        blockedSegment: null,
        hoistableState: hoistableState,
        abortSet: abortSet,
        keyPath: keyPath,
        formatContext: formatContext,
        context: context,
        treeContext: treeContext,
        componentStack: componentStack,
        thenableState: thenableState,
        isFallback: isFallback
      };
      task.debugTask = debugTask;
      abortSet.add(task);
      return task;
    }
    function createPendingSegment(
      request,
      index,
      boundary,
      parentFormatContext,
      lastPushedText,
      textEmbedded
    ) {
      return {
        status: 0,
        id: -1,
        index: index,
        parentFlushed: !1,
        chunks: [],
        children: [],
        parentFormatContext: parentFormatContext,
        boundary: boundary,
        lastPushedText: lastPushedText,
        textEmbedded: textEmbedded
      };
    }
    function getCurrentStackInDEV() {
      if (null === currentTaskInDEV || null === currentTaskInDEV.componentStack)
        return "";
      var componentStack = currentTaskInDEV.componentStack;
      try {
        var info = "";
        if ("string" === typeof componentStack.type)
          info += describeBuiltInComponentFrame(componentStack.type);
        else if ("function" === typeof componentStack.type) {
          if (!componentStack.owner) {
            var JSCompiler_temp_const = info,
              fn = componentStack.type,
              name = fn ? fn.displayName || fn.name : "";
            var JSCompiler_inline_result = name
              ? describeBuiltInComponentFrame(name)
              : "";
            info = JSCompiler_temp_const + JSCompiler_inline_result;
          }
        } else
          componentStack.owner ||
            (info += describeComponentStackByType(componentStack.type));
        for (; componentStack; )
          (JSCompiler_temp_const = null),
            null != componentStack.debugStack
              ? (JSCompiler_temp_const = formatOwnerStack(
                  componentStack.debugStack
                ))
              : ((JSCompiler_inline_result = componentStack),
                null != JSCompiler_inline_result.stack &&
                  (JSCompiler_temp_const =
                    "string" !== typeof JSCompiler_inline_result.stack
                      ? (JSCompiler_inline_result.stack = formatOwnerStack(
                          JSCompiler_inline_result.stack
                        ))
                      : JSCompiler_inline_result.stack)),
            (componentStack = componentStack.owner) &&
              JSCompiler_temp_const &&
              (info += "\n" + JSCompiler_temp_const);
        var JSCompiler_inline_result$jscomp$0 = info;
      } catch (x) {
        JSCompiler_inline_result$jscomp$0 =
          "\nError generating stack: " + x.message + "\n" + x.stack;
      }
      return JSCompiler_inline_result$jscomp$0;
    }
    function pushServerComponentStack(task, debugInfo) {
      if (null != debugInfo)
        for (var i = 0; i < debugInfo.length; i++) {
          var componentInfo = debugInfo[i];
          "string" === typeof componentInfo.name &&
            void 0 !== componentInfo.debugStack &&
            ((task.componentStack = {
              parent: task.componentStack,
              type: componentInfo,
              owner: componentInfo.owner,
              stack: componentInfo.debugStack
            }),
            (task.debugTask = componentInfo.debugTask));
        }
    }
    function pushComponentStack(task) {
      var node = task.node;
      if ("object" === typeof node && null !== node)
        switch (node.$$typeof) {
          case REACT_ELEMENT_TYPE:
            var type = node.type,
              owner = node._owner,
              stack = node._debugStack;
            pushServerComponentStack(task, node._debugInfo);
            task.debugTask = node._debugTask;
            task.componentStack = {
              parent: task.componentStack,
              type: type,
              owner: owner,
              stack: stack
            };
            break;
          case REACT_LAZY_TYPE:
            pushServerComponentStack(task, node._debugInfo);
            break;
          default:
            "function" === typeof node.then &&
              pushServerComponentStack(task, node._debugInfo);
        }
    }
    function getThrownInfo(node$jscomp$0) {
      var errorInfo = {};
      node$jscomp$0 &&
        Object.defineProperty(errorInfo, "componentStack", {
          configurable: !0,
          enumerable: !0,
          get: function () {
            try {
              var info = "",
                node = node$jscomp$0;
              do
                (info += describeComponentStackByType(node.type)),
                  (node = node.parent);
              while (node);
              var stack = info;
            } catch (x) {
              stack = "\nError generating stack: " + x.message + "\n" + x.stack;
            }
            Object.defineProperty(errorInfo, "componentStack", {
              value: stack
            });
            return stack;
          }
        });
      return errorInfo;
    }
    function encodeErrorForBoundary(
      boundary,
      digest,
      error,
      thrownInfo,
      wasAborted
    ) {
      boundary.errorDigest = digest;
      error instanceof Error
        ? ((digest = String(error.message)), (error = String(error.stack)))
        : ((digest =
            "object" === typeof error && null !== error
              ? describeObjectForErrorMessage(error)
              : String(error)),
          (error = null));
      wasAborted = wasAborted
        ? "Switched to client rendering because the server rendering aborted due to:\n\n"
        : "Switched to client rendering because the server rendering errored:\n\n";
      boundary.errorMessage = wasAborted + digest;
      boundary.errorStack = null !== error ? wasAborted + error : null;
      boundary.errorComponentStack = thrownInfo.componentStack;
    }
    function logPostpone(request, reason, postponeInfo, debugTask) {
      request = request.onPostpone;
      debugTask
        ? debugTask.run(request.bind(null, reason, postponeInfo))
        : request(reason, postponeInfo);
    }
    function logRecoverableError(request, error, errorInfo, debugTask) {
      request = request.onError;
      error = debugTask
        ? debugTask.run(request.bind(null, error, errorInfo))
        : request(error, errorInfo);
      if (null != error && "string" !== typeof error)
        console.error(
          'onError returned something with a type other than "string". onError should return a string and may return null or undefined but must not return anything else. It received something of type "%s" instead',
          typeof error
        );
      else return error;
    }
    function fatalError(request, error, errorInfo, debugTask) {
      errorInfo = request.onShellError;
      var onFatalError = request.onFatalError;
      debugTask
        ? (debugTask.run(errorInfo.bind(null, error)),
          debugTask.run(onFatalError.bind(null, error)))
        : (errorInfo(error), onFatalError(error));
      null !== request.destination
        ? ((request.status = 14), request.destination.destroy(error))
        : ((request.status = 13), (request.fatalError = error));
    }
    function renderWithHooks(
      request,
      task,
      keyPath,
      Component,
      props,
      secondArg
    ) {
      var prevThenableState = task.thenableState;
      task.thenableState = null;
      currentlyRenderingComponent = {};
      currentlyRenderingTask = task;
      currentlyRenderingRequest = request;
      currentlyRenderingKeyPath = keyPath;
      isInHookUserCodeInDev = !1;
      actionStateCounter = localIdCounter = 0;
      actionStateMatchingIndex = -1;
      thenableIndexCounter = 0;
      thenableState = prevThenableState;
      for (
        request = callComponentInDEV(Component, props, secondArg);
        didScheduleRenderPhaseUpdate;

      )
        (didScheduleRenderPhaseUpdate = !1),
          (actionStateCounter = localIdCounter = 0),
          (actionStateMatchingIndex = -1),
          (thenableIndexCounter = 0),
          (numberOfReRenders += 1),
          (workInProgressHook = null),
          (request = Component(props, secondArg));
      resetHooksState();
      return request;
    }
    function finishFunctionComponent(
      request,
      task,
      keyPath,
      children,
      hasId,
      actionStateCount,
      actionStateMatchingIndex
    ) {
      var didEmitActionStateMarkers = !1;
      if (0 !== actionStateCount && null !== request.formState) {
        var segment = task.blockedSegment;
        if (null !== segment) {
          didEmitActionStateMarkers = !0;
          segment = segment.chunks;
          for (var i = 0; i < actionStateCount; i++)
            i === actionStateMatchingIndex
              ? segment.push("\x3c!--F!--\x3e")
              : segment.push("\x3c!--F--\x3e");
        }
      }
      actionStateCount = task.keyPath;
      task.keyPath = keyPath;
      hasId
        ? ((keyPath = task.treeContext),
          (task.treeContext = pushTreeContext(keyPath, 1, 0)),
          renderNode(request, task, children, -1),
          (task.treeContext = keyPath))
        : didEmitActionStateMarkers
          ? renderNode(request, task, children, -1)
          : renderNodeDestructive(request, task, children, -1);
      task.keyPath = actionStateCount;
    }
    function renderElement(request, task, keyPath, type, props, ref) {
      if ("function" === typeof type)
        if (type.prototype && type.prototype.isReactComponent) {
          var newProps = props;
          if ("ref" in props) {
            newProps = {};
            for (var propName in props)
              "ref" !== propName && (newProps[propName] = props[propName]);
          }
          var defaultProps = type.defaultProps;
          if (defaultProps) {
            newProps === props && (newProps = assign({}, newProps, props));
            for (var _propName in defaultProps)
              void 0 === newProps[_propName] &&
                (newProps[_propName] = defaultProps[_propName]);
          }
          var resolvedProps = newProps;
          var context = emptyContextObject,
            contextType = type.contextType;
          if (
            "contextType" in type &&
            null !== contextType &&
            (void 0 === contextType ||
              contextType.$$typeof !== REACT_CONTEXT_TYPE) &&
            !didWarnAboutInvalidateContextType.has(type)
          ) {
            didWarnAboutInvalidateContextType.add(type);
            var addendum =
              void 0 === contextType
                ? " However, it is set to undefined. This can be caused by a typo or by mixing up named and default imports. This can also happen due to a circular dependency, so try moving the createContext() call to a separate file."
                : "object" !== typeof contextType
                  ? " However, it is set to a " + typeof contextType + "."
                  : contextType.$$typeof === REACT_CONSUMER_TYPE
                    ? " Did you accidentally pass the Context.Consumer instead?"
                    : " However, it is set to an object with keys {" +
                      Object.keys(contextType).join(", ") +
                      "}.";
            console.error(
              "%s defines an invalid contextType. contextType should point to the Context object returned by React.createContext().%s",
              getComponentNameFromType(type) || "Component",
              addendum
            );
          }
          "object" === typeof contextType &&
            null !== contextType &&
            (context = contextType._currentValue2);
          var instance = new type(resolvedProps, context);
          if (
            "function" === typeof type.getDerivedStateFromProps &&
            (null === instance.state || void 0 === instance.state)
          ) {
            var componentName = getComponentNameFromType(type) || "Component";
            didWarnAboutUninitializedState.has(componentName) ||
              (didWarnAboutUninitializedState.add(componentName),
              console.error(
                "`%s` uses `getDerivedStateFromProps` but its initial state is %s. This is not recommended. Instead, define the initial state by assigning an object to `this.state` in the constructor of `%s`. This ensures that `getDerivedStateFromProps` arguments have a consistent shape.",
                componentName,
                null === instance.state ? "null" : "undefined",
                componentName
              ));
          }
          if (
            "function" === typeof type.getDerivedStateFromProps ||
            "function" === typeof instance.getSnapshotBeforeUpdate
          ) {
            var foundWillMountName = null,
              foundWillReceivePropsName = null,
              foundWillUpdateName = null;
            "function" === typeof instance.componentWillMount &&
            !0 !== instance.componentWillMount.__suppressDeprecationWarning
              ? (foundWillMountName = "componentWillMount")
              : "function" === typeof instance.UNSAFE_componentWillMount &&
                (foundWillMountName = "UNSAFE_componentWillMount");
            "function" === typeof instance.componentWillReceiveProps &&
            !0 !==
              instance.componentWillReceiveProps.__suppressDeprecationWarning
              ? (foundWillReceivePropsName = "componentWillReceiveProps")
              : "function" ===
                  typeof instance.UNSAFE_componentWillReceiveProps &&
                (foundWillReceivePropsName =
                  "UNSAFE_componentWillReceiveProps");
            "function" === typeof instance.componentWillUpdate &&
            !0 !== instance.componentWillUpdate.__suppressDeprecationWarning
              ? (foundWillUpdateName = "componentWillUpdate")
              : "function" === typeof instance.UNSAFE_componentWillUpdate &&
                (foundWillUpdateName = "UNSAFE_componentWillUpdate");
            if (
              null !== foundWillMountName ||
              null !== foundWillReceivePropsName ||
              null !== foundWillUpdateName
            ) {
              var _componentName =
                  getComponentNameFromType(type) || "Component",
                newApiName =
                  "function" === typeof type.getDerivedStateFromProps
                    ? "getDerivedStateFromProps()"
                    : "getSnapshotBeforeUpdate()";
              didWarnAboutLegacyLifecyclesAndDerivedState.has(_componentName) ||
                (didWarnAboutLegacyLifecyclesAndDerivedState.add(
                  _componentName
                ),
                console.error(
                  "Unsafe legacy lifecycles will not be called for components using new component APIs.\n\n%s uses %s but also contains the following legacy lifecycles:%s%s%s\n\nThe above lifecycles should be removed. Learn more about this warning here:\nhttps://react.dev/link/unsafe-component-lifecycles",
                  _componentName,
                  newApiName,
                  null !== foundWillMountName
                    ? "\n  " + foundWillMountName
                    : "",
                  null !== foundWillReceivePropsName
                    ? "\n  " + foundWillReceivePropsName
                    : "",
                  null !== foundWillUpdateName
                    ? "\n  " + foundWillUpdateName
                    : ""
                ));
            }
          }
          var name = getComponentNameFromType(type) || "Component";
          instance.render ||
            (type.prototype && "function" === typeof type.prototype.render
              ? console.error(
                  "No `render` method found on the %s instance: did you accidentally return an object from the constructor?",
                  name
                )
              : console.error(
                  "No `render` method found on the %s instance: you may have forgotten to define `render`.",
                  name
                ));
          !instance.getInitialState ||
            instance.getInitialState.isReactClassApproved ||
            instance.state ||
            console.error(
              "getInitialState was defined on %s, a plain JavaScript class. This is only supported for classes created using React.createClass. Did you mean to define a state property instead?",
              name
            );
          instance.getDefaultProps &&
            !instance.getDefaultProps.isReactClassApproved &&
            console.error(
              "getDefaultProps was defined on %s, a plain JavaScript class. This is only supported for classes created using React.createClass. Use a static property to define defaultProps instead.",
              name
            );
          instance.contextType &&
            console.error(
              "contextType was defined as an instance property on %s. Use a static property to define contextType instead.",
              name
            );
          type.childContextTypes &&
            !didWarnAboutChildContextTypes.has(type) &&
            (didWarnAboutChildContextTypes.add(type),
            console.error(
              "%s uses the legacy childContextTypes API which was removed in React 19. Use React.createContext() instead. (https://react.dev/link/legacy-context)",
              name
            ));
          type.contextTypes &&
            !didWarnAboutContextTypes$1.has(type) &&
            (didWarnAboutContextTypes$1.add(type),
            console.error(
              "%s uses the legacy contextTypes API which was removed in React 19. Use React.createContext() with static contextType instead. (https://react.dev/link/legacy-context)",
              name
            ));
          "function" === typeof instance.componentShouldUpdate &&
            console.error(
              "%s has a method called componentShouldUpdate(). Did you mean shouldComponentUpdate()? The name is phrased as a question because the function is expected to return a value.",
              name
            );
          type.prototype &&
            type.prototype.isPureReactComponent &&
            "undefined" !== typeof instance.shouldComponentUpdate &&
            console.error(
              "%s has a method called shouldComponentUpdate(). shouldComponentUpdate should not be used when extending React.PureComponent. Please extend React.Component if shouldComponentUpdate is used.",
              getComponentNameFromType(type) || "A pure component"
            );
          "function" === typeof instance.componentDidUnmount &&
            console.error(
              "%s has a method called componentDidUnmount(). But there is no such lifecycle method. Did you mean componentWillUnmount()?",
              name
            );
          "function" === typeof instance.componentDidReceiveProps &&
            console.error(
              "%s has a method called componentDidReceiveProps(). But there is no such lifecycle method. If you meant to update the state in response to changing props, use componentWillReceiveProps(). If you meant to fetch data or run side-effects or mutations after React has updated the UI, use componentDidUpdate().",
              name
            );
          "function" === typeof instance.componentWillRecieveProps &&
            console.error(
              "%s has a method called componentWillRecieveProps(). Did you mean componentWillReceiveProps()?",
              name
            );
          "function" === typeof instance.UNSAFE_componentWillRecieveProps &&
            console.error(
              "%s has a method called UNSAFE_componentWillRecieveProps(). Did you mean UNSAFE_componentWillReceiveProps()?",
              name
            );
          var hasMutatedProps = instance.props !== resolvedProps;
          void 0 !== instance.props &&
            hasMutatedProps &&
            console.error(
              "When calling super() in `%s`, make sure to pass up the same props that your component's constructor was passed.",
              name
            );
          instance.defaultProps &&
            console.error(
              "Setting defaultProps as an instance property on %s is not supported and will be ignored. Instead, define defaultProps as a static property on %s.",
              name,
              name
            );
          "function" !== typeof instance.getSnapshotBeforeUpdate ||
            "function" === typeof instance.componentDidUpdate ||
            didWarnAboutGetSnapshotBeforeUpdateWithoutDidUpdate.has(type) ||
            (didWarnAboutGetSnapshotBeforeUpdateWithoutDidUpdate.add(type),
            console.error(
              "%s: getSnapshotBeforeUpdate() should be used with componentDidUpdate(). This component defines getSnapshotBeforeUpdate() only.",
              getComponentNameFromType(type)
            ));
          "function" === typeof instance.getDerivedStateFromProps &&
            console.error(
              "%s: getDerivedStateFromProps() is defined as an instance method and will be ignored. Instead, declare it as a static method.",
              name
            );
          "function" === typeof instance.getDerivedStateFromError &&
            console.error(
              "%s: getDerivedStateFromError() is defined as an instance method and will be ignored. Instead, declare it as a static method.",
              name
            );
          "function" === typeof type.getSnapshotBeforeUpdate &&
            console.error(
              "%s: getSnapshotBeforeUpdate() is defined as a static method and will be ignored. Instead, declare it as an instance method.",
              name
            );
          var state = instance.state;
          state &&
            ("object" !== typeof state || isArrayImpl(state)) &&
            console.error("%s.state: must be set to an object or null", name);
          "function" === typeof instance.getChildContext &&
            "object" !== typeof type.childContextTypes &&
            console.error(
              "%s.getChildContext(): childContextTypes must be defined in order to use getChildContext().",
              name
            );
          var initialState = void 0 !== instance.state ? instance.state : null;
          instance.updater = classComponentUpdater;
          instance.props = resolvedProps;
          instance.state = initialState;
          var internalInstance = { queue: [], replace: !1 };
          instance._reactInternals = internalInstance;
          var contextType$jscomp$0 = type.contextType;
          instance.context =
            "object" === typeof contextType$jscomp$0 &&
            null !== contextType$jscomp$0
              ? contextType$jscomp$0._currentValue2
              : emptyContextObject;
          if (instance.state === resolvedProps) {
            var componentName$jscomp$0 =
              getComponentNameFromType(type) || "Component";
            didWarnAboutDirectlyAssigningPropsToState.has(
              componentName$jscomp$0
            ) ||
              (didWarnAboutDirectlyAssigningPropsToState.add(
                componentName$jscomp$0
              ),
              console.error(
                "%s: It is not recommended to assign props directly to state because updates to props won't be reflected in state. In most cases, it is better to use props directly.",
                componentName$jscomp$0
              ));
          }
          var getDerivedStateFromProps = type.getDerivedStateFromProps;
          if ("function" === typeof getDerivedStateFromProps) {
            var partialState = getDerivedStateFromProps(
              resolvedProps,
              initialState
            );
            if (void 0 === partialState) {
              var componentName$jscomp$1 =
                getComponentNameFromType(type) || "Component";
              didWarnAboutUndefinedDerivedState.has(componentName$jscomp$1) ||
                (didWarnAboutUndefinedDerivedState.add(componentName$jscomp$1),
                console.error(
                  "%s.getDerivedStateFromProps(): A valid state object (or null) must be returned. You have returned undefined.",
                  componentName$jscomp$1
                ));
            }
            var JSCompiler_inline_result =
              null === partialState || void 0 === partialState
                ? initialState
                : assign({}, initialState, partialState);
            instance.state = JSCompiler_inline_result;
          }
          if (
            "function" !== typeof type.getDerivedStateFromProps &&
            "function" !== typeof instance.getSnapshotBeforeUpdate &&
            ("function" === typeof instance.UNSAFE_componentWillMount ||
              "function" === typeof instance.componentWillMount)
          ) {
            var oldState = instance.state;
            if ("function" === typeof instance.componentWillMount) {
              if (
                !0 !== instance.componentWillMount.__suppressDeprecationWarning
              ) {
                var componentName$jscomp$2 =
                  getComponentNameFromType(type) || "Unknown";
                didWarnAboutDeprecatedWillMount[componentName$jscomp$2] ||
                  (console.warn(
                    "componentWillMount has been renamed, and is not recommended for use. See https://react.dev/link/unsafe-component-lifecycles for details.\n\n* Move code from componentWillMount to componentDidMount (preferred in most cases) or the constructor.\n\nPlease update the following components: %s",
                    componentName$jscomp$2
                  ),
                  (didWarnAboutDeprecatedWillMount[componentName$jscomp$2] =
                    !0));
              }
              instance.componentWillMount();
            }
            "function" === typeof instance.UNSAFE_componentWillMount &&
              instance.UNSAFE_componentWillMount();
            oldState !== instance.state &&
              (console.error(
                "%s.componentWillMount(): Assigning directly to this.state is deprecated (except inside a component's constructor). Use setState instead.",
                getComponentNameFromType(type) || "Component"
              ),
              classComponentUpdater.enqueueReplaceState(
                instance,
                instance.state,
                null
              ));
            if (
              null !== internalInstance.queue &&
              0 < internalInstance.queue.length
            ) {
              var oldQueue = internalInstance.queue,
                oldReplace = internalInstance.replace;
              internalInstance.queue = null;
              internalInstance.replace = !1;
              if (oldReplace && 1 === oldQueue.length)
                instance.state = oldQueue[0];
              else {
                for (
                  var nextState = oldReplace ? oldQueue[0] : instance.state,
                    dontMutate = !0,
                    i = oldReplace ? 1 : 0;
                  i < oldQueue.length;
                  i++
                ) {
                  var partial = oldQueue[i],
                    partialState$jscomp$0 =
                      "function" === typeof partial
                        ? partial.call(
                            instance,
                            nextState,
                            resolvedProps,
                            void 0
                          )
                        : partial;
                  null != partialState$jscomp$0 &&
                    (dontMutate
                      ? ((dontMutate = !1),
                        (nextState = assign(
                          {},
                          nextState,
                          partialState$jscomp$0
                        )))
                      : assign(nextState, partialState$jscomp$0));
                }
                instance.state = nextState;
              }
            } else internalInstance.queue = null;
          }
          var nextChildren = callRenderInDEV(instance);
          if (12 === request.status) throw null;
          instance.props !== resolvedProps &&
            (didWarnAboutReassigningProps ||
              console.error(
                "It looks like %s is reassigning its own `this.props` while rendering. This is not supported and can lead to confusing bugs.",
                getComponentNameFromType(type) || "a component"
              ),
            (didWarnAboutReassigningProps = !0));
          var prevKeyPath = task.keyPath;
          task.keyPath = keyPath;
          renderNodeDestructive(request, task, nextChildren, -1);
          task.keyPath = prevKeyPath;
        } else {
          if (type.prototype && "function" === typeof type.prototype.render) {
            var componentName$jscomp$3 =
              getComponentNameFromType(type) || "Unknown";
            didWarnAboutBadClass[componentName$jscomp$3] ||
              (console.error(
                "The <%s /> component appears to have a render method, but doesn't extend React.Component. This is likely to cause errors. Change %s to extend React.Component instead.",
                componentName$jscomp$3,
                componentName$jscomp$3
              ),
              (didWarnAboutBadClass[componentName$jscomp$3] = !0));
          }
          var value = renderWithHooks(
            request,
            task,
            keyPath,
            type,
            props,
            void 0
          );
          if (12 === request.status) throw null;
          var hasId = 0 !== localIdCounter,
            actionStateCount = actionStateCounter,
            actionStateMatchingIndex$jscomp$0 = actionStateMatchingIndex;
          if (type.contextTypes) {
            var _componentName$jscomp$0 =
              getComponentNameFromType(type) || "Unknown";
            didWarnAboutContextTypes[_componentName$jscomp$0] ||
              ((didWarnAboutContextTypes[_componentName$jscomp$0] = !0),
              console.error(
                "%s uses the legacy contextTypes API which was removed in React 19. Use React.createContext() with React.useContext() instead. (https://react.dev/link/legacy-context)",
                _componentName$jscomp$0
              ));
          }
          type &&
            type.childContextTypes &&
            console.error(
              "childContextTypes cannot be defined on a function component.\n  %s.childContextTypes = ...",
              type.displayName || type.name || "Component"
            );
          if ("function" === typeof type.getDerivedStateFromProps) {
            var _componentName2 = getComponentNameFromType(type) || "Unknown";
            didWarnAboutGetDerivedStateOnFunctionComponent[_componentName2] ||
              (console.error(
                "%s: Function components do not support getDerivedStateFromProps.",
                _componentName2
              ),
              (didWarnAboutGetDerivedStateOnFunctionComponent[_componentName2] =
                !0));
          }
          if (
            "object" === typeof type.contextType &&
            null !== type.contextType
          ) {
            var _componentName3 = getComponentNameFromType(type) || "Unknown";
            didWarnAboutContextTypeOnFunctionComponent[_componentName3] ||
              (console.error(
                "%s: Function components do not support contextType.",
                _componentName3
              ),
              (didWarnAboutContextTypeOnFunctionComponent[_componentName3] =
                !0));
          }
          finishFunctionComponent(
            request,
            task,
            keyPath,
            value,
            hasId,
            actionStateCount,
            actionStateMatchingIndex$jscomp$0
          );
        }
      else if ("string" === typeof type) {
        var segment = task.blockedSegment;
        if (null === segment) {
          var children = props.children,
            prevContext = task.formatContext,
            prevKeyPath$jscomp$0 = task.keyPath;
          task.formatContext = getChildFormatContext(prevContext, type, props);
          task.keyPath = keyPath;
          renderNode(request, task, children, -1);
          task.formatContext = prevContext;
          task.keyPath = prevKeyPath$jscomp$0;
        } else {
          var target = segment.chunks,
            resumableState = request.resumableState,
            renderState = request.renderState,
            hoistableState = task.hoistableState,
            formatContext = task.formatContext,
            textEmbedded = segment.lastPushedText,
            isFallback = task.isFallback,
            propKey;
          for (propKey in props)
            if (hasOwnProperty.call(props, propKey)) {
              var propValue = props[propKey];
              if ("ref" === propKey && null != propValue)
                throw Error(
                  "Cannot pass ref in renderToHTML because they will never be hydrated."
                );
              if ("function" === typeof propValue)
                throw Error(
                  "Cannot pass event handlers (" +
                    propKey +
                    ") in renderToHTML because the HTML will never be hydrated so they can never get called."
                );
            }
          var _children = pushStartInstance$1(
            target,
            type,
            props,
            resumableState,
            renderState,
            hoistableState,
            formatContext,
            textEmbedded,
            isFallback
          );
          segment.lastPushedText = !1;
          var _prevContext = task.formatContext,
            _prevKeyPath2 = task.keyPath;
          task.formatContext = getChildFormatContext(_prevContext, type, props);
          task.keyPath = keyPath;
          renderNode(request, task, _children, -1);
          task.formatContext = _prevContext;
          task.keyPath = _prevKeyPath2;
          a: {
            var target$jscomp$0 = segment.chunks,
              resumableState$jscomp$0 = request.resumableState;
            switch (type) {
              case "title":
              case "style":
              case "script":
              case "area":
              case "base":
              case "br":
              case "col":
              case "embed":
              case "hr":
              case "img":
              case "input":
              case "keygen":
              case "link":
              case "meta":
              case "param":
              case "source":
              case "track":
              case "wbr":
                break a;
              case "body":
                if (1 >= _prevContext.insertionMode) {
                  resumableState$jscomp$0.hasBody = !0;
                  break a;
                }
                break;
              case "html":
                if (0 === _prevContext.insertionMode) {
                  resumableState$jscomp$0.hasHtml = !0;
                  break a;
                }
            }
            target$jscomp$0.push(endChunkForTag(type));
          }
          segment.lastPushedText = !1;
        }
      } else {
        switch (type) {
          case REACT_LEGACY_HIDDEN_TYPE:
          case REACT_DEBUG_TRACING_MODE_TYPE:
          case REACT_STRICT_MODE_TYPE:
          case REACT_PROFILER_TYPE:
          case REACT_FRAGMENT_TYPE:
            var prevKeyPath$jscomp$1 = task.keyPath;
            task.keyPath = keyPath;
            renderNodeDestructive(request, task, props.children, -1);
            task.keyPath = prevKeyPath$jscomp$1;
            return;
          case REACT_OFFSCREEN_TYPE:
            if ("hidden" !== props.mode) {
              var prevKeyPath$jscomp$2 = task.keyPath;
              task.keyPath = keyPath;
              renderNodeDestructive(request, task, props.children, -1);
              task.keyPath = prevKeyPath$jscomp$2;
            }
            return;
          case REACT_SUSPENSE_LIST_TYPE:
            var _prevKeyPath3 = task.keyPath;
            task.keyPath = keyPath;
            renderNodeDestructive(request, task, props.children, -1);
            task.keyPath = _prevKeyPath3;
            return;
          case REACT_SCOPE_TYPE:
            throw Error(
              "ReactDOMServer does not yet support scope components."
            );
          case REACT_SUSPENSE_TYPE:
            a: if (null !== task.replay) {
              var _prevKeyPath = task.keyPath;
              task.keyPath = keyPath;
              var _content = props.children;
              try {
                renderNode(request, task, _content, -1);
              } finally {
                task.keyPath = _prevKeyPath;
              }
            } else {
              var prevKeyPath$jscomp$3 = task.keyPath,
                parentBoundary = task.blockedBoundary,
                parentHoistableState = task.hoistableState,
                parentSegment = task.blockedSegment,
                fallback = props.fallback,
                content = props.children,
                fallbackAbortSet = new Set(),
                newBoundary = createSuspenseBoundary(request, fallbackAbortSet);
              null !== request.trackedPostpones &&
                (newBoundary.trackedContentKeyPath = keyPath);
              var boundarySegment = createPendingSegment(
                request,
                parentSegment.chunks.length,
                newBoundary,
                task.formatContext,
                !1,
                !1
              );
              parentSegment.children.push(boundarySegment);
              parentSegment.lastPushedText = !1;
              var contentRootSegment = createPendingSegment(
                request,
                0,
                null,
                task.formatContext,
                !1,
                !1
              );
              contentRootSegment.parentFlushed = !0;
              if (null !== request.trackedPostpones) {
                var fallbackKeyPath = [
                    keyPath[0],
                    "Suspense Fallback",
                    keyPath[2]
                  ],
                  fallbackReplayNode = [
                    fallbackKeyPath[1],
                    fallbackKeyPath[2],
                    [],
                    null
                  ];
                request.trackedPostpones.workingMap.set(
                  fallbackKeyPath,
                  fallbackReplayNode
                );
                newBoundary.trackedFallbackNode = fallbackReplayNode;
                task.blockedSegment = boundarySegment;
                task.keyPath = fallbackKeyPath;
                boundarySegment.status = 6;
                try {
                  renderNode(request, task, fallback, -1),
                    (boundarySegment.status = 1);
                } catch (thrownValue) {
                  throw (
                    ((boundarySegment.status = 12 === request.status ? 3 : 4),
                    thrownValue)
                  );
                } finally {
                  (task.blockedSegment = parentSegment),
                    (task.keyPath = prevKeyPath$jscomp$3);
                }
                var suspendedPrimaryTask = createRenderTask(
                  request,
                  null,
                  content,
                  -1,
                  newBoundary,
                  contentRootSegment,
                  newBoundary.contentState,
                  task.abortSet,
                  keyPath,
                  task.formatContext,
                  task.context,
                  task.treeContext,
                  task.componentStack,
                  task.isFallback,
                  emptyContextObject,
                  task.debugTask
                );
                pushComponentStack(suspendedPrimaryTask);
                request.pingedTasks.push(suspendedPrimaryTask);
              } else {
                task.blockedBoundary = newBoundary;
                task.hoistableState = newBoundary.contentState;
                task.blockedSegment = contentRootSegment;
                task.keyPath = keyPath;
                contentRootSegment.status = 6;
                try {
                  if (
                    (renderNode(request, task, content, -1),
                    (contentRootSegment.status = 1),
                    queueCompletedSegment(newBoundary, contentRootSegment),
                    0 === newBoundary.pendingTasks && 0 === newBoundary.status)
                  ) {
                    newBoundary.status = 1;
                    break a;
                  }
                } catch (thrownValue$6) {
                  newBoundary.status = 4;
                  if (12 === request.status) {
                    contentRootSegment.status = 3;
                    var error = request.fatalError;
                  } else
                    (contentRootSegment.status = 4), (error = thrownValue$6);
                  var thrownInfo = getThrownInfo(task.componentStack);
                  if (
                    "object" === typeof error &&
                    null !== error &&
                    error.$$typeof === REACT_POSTPONE_TYPE
                  ) {
                    logPostpone(
                      request,
                      error.message,
                      thrownInfo,
                      task.debugTask
                    );
                    var errorDigest = "POSTPONE";
                  } else
                    errorDigest = logRecoverableError(
                      request,
                      error,
                      thrownInfo,
                      task.debugTask
                    );
                  encodeErrorForBoundary(
                    newBoundary,
                    errorDigest,
                    error,
                    thrownInfo,
                    !1
                  );
                  untrackBoundary(request, newBoundary);
                } finally {
                  (task.blockedBoundary = parentBoundary),
                    (task.hoistableState = parentHoistableState),
                    (task.blockedSegment = parentSegment),
                    (task.keyPath = prevKeyPath$jscomp$3);
                }
                var suspendedFallbackTask = createRenderTask(
                  request,
                  null,
                  fallback,
                  -1,
                  parentBoundary,
                  boundarySegment,
                  newBoundary.fallbackState,
                  fallbackAbortSet,
                  [keyPath[0], "Suspense Fallback", keyPath[2]],
                  task.formatContext,
                  task.context,
                  task.treeContext,
                  task.componentStack,
                  !0,
                  emptyContextObject,
                  task.debugTask
                );
                pushComponentStack(suspendedFallbackTask);
                request.pingedTasks.push(suspendedFallbackTask);
              }
            }
            return;
        }
        if ("object" === typeof type && null !== type)
          switch (type.$$typeof) {
            case REACT_FORWARD_REF_TYPE:
              if ("ref" in props) {
                var propsWithoutRef = {};
                for (var key in props)
                  "ref" !== key && (propsWithoutRef[key] = props[key]);
              } else propsWithoutRef = props;
              var children$jscomp$0 = renderWithHooks(
                request,
                task,
                keyPath,
                type.render,
                propsWithoutRef,
                ref
              );
              finishFunctionComponent(
                request,
                task,
                keyPath,
                children$jscomp$0,
                0 !== localIdCounter,
                actionStateCounter,
                actionStateMatchingIndex
              );
              return;
            case REACT_MEMO_TYPE:
              renderElement(request, task, keyPath, type.type, props, ref);
              return;
            case REACT_PROVIDER_TYPE:
            case REACT_CONTEXT_TYPE:
              var value$jscomp$0 = props.value,
                children$jscomp$1 = props.children;
              var prevSnapshot = task.context;
              var prevKeyPath$jscomp$4 = task.keyPath;
              var prevValue = type._currentValue2;
              type._currentValue2 = value$jscomp$0;
              void 0 !== type._currentRenderer2 &&
                null !== type._currentRenderer2 &&
                type._currentRenderer2 !== rendererSigil &&
                console.error(
                  "Detected multiple renderers concurrently rendering the same context provider. This is currently unsupported."
                );
              type._currentRenderer2 = rendererSigil;
              var prevNode = currentActiveSnapshot,
                newNode = {
                  parent: prevNode,
                  depth: null === prevNode ? 0 : prevNode.depth + 1,
                  context: type,
                  parentValue: prevValue,
                  value: value$jscomp$0
                };
              currentActiveSnapshot = newNode;
              task.context = newNode;
              task.keyPath = keyPath;
              renderNodeDestructive(request, task, children$jscomp$1, -1);
              var prevSnapshot$jscomp$0 = currentActiveSnapshot;
              if (null === prevSnapshot$jscomp$0)
                throw Error(
                  "Tried to pop a Context at the root of the app. This is a bug in React."
                );
              prevSnapshot$jscomp$0.context !== type &&
                console.error(
                  "The parent context is not the expected context. This is probably a bug in React."
                );
              prevSnapshot$jscomp$0.context._currentValue2 =
                prevSnapshot$jscomp$0.parentValue;
              void 0 !== type._currentRenderer2 &&
                null !== type._currentRenderer2 &&
                type._currentRenderer2 !== rendererSigil &&
                console.error(
                  "Detected multiple renderers concurrently rendering the same context provider. This is currently unsupported."
                );
              type._currentRenderer2 = rendererSigil;
              var JSCompiler_inline_result$jscomp$0 = (currentActiveSnapshot =
                prevSnapshot$jscomp$0.parent);
              task.context = JSCompiler_inline_result$jscomp$0;
              task.keyPath = prevKeyPath$jscomp$4;
              prevSnapshot !== task.context &&
                console.error(
                  "Popping the context provider did not return back to the original snapshot. This is a bug in React."
                );
              return;
            case REACT_CONSUMER_TYPE:
              var context$jscomp$0 = type._context,
                render = props.children;
              "function" !== typeof render &&
                console.error(
                  "A context consumer was rendered with multiple children, or a child that isn't a function. A context consumer expects a single child that is a function. If you did pass a function, make sure there is no trailing or leading whitespace around it."
                );
              var newChildren = render(context$jscomp$0._currentValue2),
                prevKeyPath$jscomp$5 = task.keyPath;
              task.keyPath = keyPath;
              renderNodeDestructive(request, task, newChildren, -1);
              task.keyPath = prevKeyPath$jscomp$5;
              return;
            case REACT_LAZY_TYPE:
              var Component = callLazyInitInDEV(type);
              if (12 === request.status) throw null;
              renderElement(request, task, keyPath, Component, props, ref);
              return;
          }
        var info = "";
        if (
          void 0 === type ||
          ("object" === typeof type &&
            null !== type &&
            0 === Object.keys(type).length)
        )
          info +=
            " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.";
        throw Error(
          "Element type is invalid: expected a string (for built-in components) or a class/function (for composite components) but got: " +
            ((null == type ? type : typeof type) + "." + info)
        );
      }
    }
    function resumeNode(request, task, segmentId, node, childIndex) {
      var prevReplay = task.replay,
        blockedBoundary = task.blockedBoundary,
        resumedSegment = createPendingSegment(
          request,
          0,
          null,
          task.formatContext,
          !1,
          !1
        );
      resumedSegment.id = segmentId;
      resumedSegment.parentFlushed = !0;
      try {
        (task.replay = null),
          (task.blockedSegment = resumedSegment),
          renderNode(request, task, node, childIndex),
          (resumedSegment.status = 1),
          null === blockedBoundary
            ? (request.completedRootSegment = resumedSegment)
            : (queueCompletedSegment(blockedBoundary, resumedSegment),
              blockedBoundary.parentFlushed &&
                request.partialBoundaries.push(blockedBoundary));
      } finally {
        (task.replay = prevReplay), (task.blockedSegment = null);
      }
    }
    function replayElement(
      request,
      task,
      keyPath,
      name,
      keyOrIndex,
      childIndex,
      type,
      props,
      ref,
      replay
    ) {
      childIndex = replay.nodes;
      for (var i = 0; i < childIndex.length; i++) {
        var node = childIndex[i];
        if (keyOrIndex === node[1]) {
          if (4 === node.length) {
            if (null !== name && name !== node[0])
              throw Error(
                "Expected the resume to render <" +
                  node[0] +
                  "> in this slot but instead it rendered <" +
                  name +
                  ">. The tree doesn't match so React will fallback to client rendering."
              );
            var childNodes = node[2];
            node = node[3];
            name = task.node;
            task.replay = { nodes: childNodes, slots: node, pendingTasks: 1 };
            try {
              renderElement(request, task, keyPath, type, props, ref);
              if (
                1 === task.replay.pendingTasks &&
                0 < task.replay.nodes.length
              )
                throw Error(
                  "Couldn't find all resumable slots by key/index during replaying. The tree doesn't match so React will fallback to client rendering."
                );
              task.replay.pendingTasks--;
            } catch (x) {
              if (
                "object" === typeof x &&
                null !== x &&
                (x === SuspenseException || "function" === typeof x.then)
              )
                throw (task.node === name && (task.replay = replay), x);
              task.replay.pendingTasks--;
              props = getThrownInfo(task.componentStack);
              erroredReplay(
                request,
                task.blockedBoundary,
                x,
                props,
                childNodes,
                node,
                task.debugTask
              );
            }
            task.replay = replay;
          } else {
            if (type !== REACT_SUSPENSE_TYPE)
              throw Error(
                "Expected the resume to render <Suspense> in this slot but instead it rendered <" +
                  (getComponentNameFromType(type) || "Unknown") +
                  ">. The tree doesn't match so React will fallback to client rendering."
              );
            a: {
              replay = void 0;
              type = node[5];
              ref = node[2];
              name = node[3];
              keyOrIndex = null === node[4] ? [] : node[4][2];
              node = null === node[4] ? null : node[4][3];
              var prevKeyPath = task.keyPath,
                previousReplaySet = task.replay,
                parentBoundary = task.blockedBoundary,
                parentHoistableState = task.hoistableState,
                content = props.children;
              props = props.fallback;
              var fallbackAbortSet = new Set(),
                resumedBoundary = createSuspenseBoundary(
                  request,
                  fallbackAbortSet
                );
              resumedBoundary.parentFlushed = !0;
              resumedBoundary.rootSegmentID = type;
              task.blockedBoundary = resumedBoundary;
              task.hoistableState = resumedBoundary.contentState;
              task.keyPath = keyPath;
              task.replay = { nodes: ref, slots: name, pendingTasks: 1 };
              try {
                renderNode(request, task, content, -1);
                if (
                  1 === task.replay.pendingTasks &&
                  0 < task.replay.nodes.length
                )
                  throw Error(
                    "Couldn't find all resumable slots by key/index during replaying. The tree doesn't match so React will fallback to client rendering."
                  );
                task.replay.pendingTasks--;
                if (
                  0 === resumedBoundary.pendingTasks &&
                  0 === resumedBoundary.status
                ) {
                  resumedBoundary.status = 1;
                  request.completedBoundaries.push(resumedBoundary);
                  break a;
                }
              } catch (error) {
                (resumedBoundary.status = 4),
                  (childNodes = getThrownInfo(task.componentStack)),
                  "object" === typeof error &&
                  null !== error &&
                  error.$$typeof === REACT_POSTPONE_TYPE
                    ? (logPostpone(
                        request,
                        error.message,
                        childNodes,
                        task.debugTask
                      ),
                      (replay = "POSTPONE"))
                    : (replay = logRecoverableError(
                        request,
                        error,
                        childNodes,
                        task.debugTask
                      )),
                  encodeErrorForBoundary(
                    resumedBoundary,
                    replay,
                    error,
                    childNodes,
                    !1
                  ),
                  task.replay.pendingTasks--,
                  request.clientRenderedBoundaries.push(resumedBoundary);
              } finally {
                (task.blockedBoundary = parentBoundary),
                  (task.hoistableState = parentHoistableState),
                  (task.replay = previousReplaySet),
                  (task.keyPath = prevKeyPath);
              }
              props = createReplayTask(
                request,
                null,
                { nodes: keyOrIndex, slots: node, pendingTasks: 0 },
                props,
                -1,
                parentBoundary,
                resumedBoundary.fallbackState,
                fallbackAbortSet,
                [keyPath[0], "Suspense Fallback", keyPath[2]],
                task.formatContext,
                task.context,
                task.treeContext,
                task.componentStack,
                !0,
                emptyContextObject,
                task.debugTask
              );
              pushComponentStack(props);
              request.pingedTasks.push(props);
            }
          }
          childIndex.splice(i, 1);
          break;
        }
      }
    }
    function renderNodeDestructive(request, task, node, childIndex) {
      null !== task.replay && "number" === typeof task.replay.slots
        ? resumeNode(request, task, task.replay.slots, node, childIndex)
        : ((task.node = node),
          (task.childIndex = childIndex),
          (node = task.componentStack),
          (childIndex = task.debugTask),
          pushComponentStack(task),
          retryNode(request, task),
          (task.componentStack = node),
          (task.debugTask = childIndex));
    }
    function retryNode(request, task) {
      var node = task.node,
        childIndex = task.childIndex;
      if (null !== node) {
        if ("object" === typeof node) {
          switch (node.$$typeof) {
            case REACT_ELEMENT_TYPE:
              var type = node.type,
                key = node.key;
              node = node.props;
              var refProp = node.ref;
              refProp = void 0 !== refProp ? refProp : null;
              var debugTask = task.debugTask,
                name = getComponentNameFromType(type);
              key = null == key ? (-1 === childIndex ? 0 : childIndex) : key;
              var keyPath = [task.keyPath, name, key];
              null !== task.replay
                ? debugTask
                  ? debugTask.run(
                      replayElement.bind(
                        null,
                        request,
                        task,
                        keyPath,
                        name,
                        key,
                        childIndex,
                        type,
                        node,
                        refProp,
                        task.replay
                      )
                    )
                  : replayElement(
                      request,
                      task,
                      keyPath,
                      name,
                      key,
                      childIndex,
                      type,
                      node,
                      refProp,
                      task.replay
                    )
                : debugTask
                  ? debugTask.run(
                      renderElement.bind(
                        null,
                        request,
                        task,
                        keyPath,
                        type,
                        node,
                        refProp
                      )
                    )
                  : renderElement(request, task, keyPath, type, node, refProp);
              return;
            case REACT_PORTAL_TYPE:
              throw Error(
                "Portals are not currently supported by the server renderer. Render them conditionally so that they only appear on the client render."
              );
            case REACT_LAZY_TYPE:
              node = callLazyInitInDEV(node);
              if (12 === request.status) throw null;
              renderNodeDestructive(request, task, node, childIndex);
              return;
          }
          if (isArrayImpl(node)) {
            renderChildrenArray(request, task, node, childIndex);
            return;
          }
          if ((key = getIteratorFn(node)))
            if ((type = key.call(node))) {
              if (type === node) {
                if (
                  -1 !== childIndex ||
                  null === task.componentStack ||
                  "function" !== typeof task.componentStack.type ||
                  "[object GeneratorFunction]" !==
                    Object.prototype.toString.call(task.componentStack.type) ||
                  "[object Generator]" !== Object.prototype.toString.call(type)
                )
                  didWarnAboutGenerators ||
                    console.error(
                      "Using Iterators as children is unsupported and will likely yield unexpected results because enumerating a generator mutates it. You may convert it to an array with `Array.from()` or the `[...spread]` operator before rendering. You can also use an Iterable that can iterate multiple times over the same items."
                    ),
                    (didWarnAboutGenerators = !0);
              } else
                node.entries !== key ||
                  didWarnAboutMaps ||
                  (console.error(
                    "Using Maps as children is not supported. Use an array of keyed ReactElements instead."
                  ),
                  (didWarnAboutMaps = !0));
              node = type.next();
              if (!node.done) {
                key = [];
                do key.push(node.value), (node = type.next());
                while (!node.done);
                renderChildrenArray(request, task, key, childIndex);
              }
              return;
            }
          if (
            "function" === typeof node[ASYNC_ITERATOR] &&
            (type = node[ASYNC_ITERATOR]())
          ) {
            type !== node ||
              (-1 === childIndex &&
                null !== task.componentStack &&
                "function" === typeof task.componentStack.type &&
                "[object AsyncGeneratorFunction]" ===
                  Object.prototype.toString.call(task.componentStack.type) &&
                "[object AsyncGenerator]" ===
                  Object.prototype.toString.call(type)) ||
              (didWarnAboutGenerators ||
                console.error(
                  "Using AsyncIterators as children is unsupported and will likely yield unexpected results because enumerating a generator mutates it. You can use an AsyncIterable that can iterate multiple times over the same items."
                ),
              (didWarnAboutGenerators = !0));
            key = task.thenableState;
            task.thenableState = null;
            thenableIndexCounter = 0;
            thenableState = key;
            key = [];
            refProp = !1;
            if (type === node)
              for (node = readPreviousThenableFromState(); void 0 !== node; ) {
                if (node.done) {
                  refProp = !0;
                  break;
                }
                key.push(node.value);
                node = readPreviousThenableFromState();
              }
            if (!refProp)
              for (node = unwrapThenable(type.next()); !node.done; )
                key.push(node.value), (node = unwrapThenable(type.next()));
            renderChildrenArray(request, task, key, childIndex);
            return;
          }
          if ("function" === typeof node.then)
            return (
              (task.thenableState = null),
              renderNodeDestructive(
                request,
                task,
                unwrapThenable(node),
                childIndex
              )
            );
          if (node.$$typeof === REACT_CONTEXT_TYPE)
            return renderNodeDestructive(
              request,
              task,
              node._currentValue2,
              childIndex
            );
          request = Object.prototype.toString.call(node);
          throw Error(
            "Objects are not valid as a React child (found: " +
              ("[object Object]" === request
                ? "object with keys {" + Object.keys(node).join(", ") + "}"
                : request) +
              "). If you meant to render a collection of children, use an array instead."
          );
        }
        "string" === typeof node
          ? ((request = task.blockedSegment),
            null !== request &&
              (request.chunks.push(escapeTextForBrowser(node)),
              (request.lastPushedText = !1)))
          : "number" === typeof node || "bigint" === typeof node
            ? ((request = task.blockedSegment),
              null !== request &&
                (request.chunks.push(escapeTextForBrowser("" + node)),
                (request.lastPushedText = !1)))
            : ("function" === typeof node &&
                ((request = node.displayName || node.name || "Component"),
                console.error(
                  "Functions are not valid as a React child. This may happen if you return %s instead of <%s /> from render. Or maybe you meant to call this function rather than return it.",
                  request,
                  request
                )),
              "symbol" === typeof node &&
                console.error(
                  "Symbols are not valid as a React child.\n  %s",
                  String(node)
                ));
      }
    }
    function renderChildrenArray(request$jscomp$0, task, children, childIndex) {
      var prevKeyPath = task.keyPath,
        previousComponentStack = task.componentStack;
      var previousDebugTask = task.debugTask;
      pushServerComponentStack(task, task.node._debugInfo);
      if (
        -1 !== childIndex &&
        ((task.keyPath = [task.keyPath, "Fragment", childIndex]),
        null !== task.replay)
      ) {
        for (
          var replay = task.replay, replayNodes = replay.nodes, j = 0;
          j < replayNodes.length;
          j++
        ) {
          var node = replayNodes[j];
          if (node[1] === childIndex) {
            childIndex = node[2];
            node = node[3];
            task.replay = { nodes: childIndex, slots: node, pendingTasks: 1 };
            try {
              renderChildrenArray(request$jscomp$0, task, children, -1);
              if (
                1 === task.replay.pendingTasks &&
                0 < task.replay.nodes.length
              )
                throw Error(
                  "Couldn't find all resumable slots by key/index during replaying. The tree doesn't match so React will fallback to client rendering."
                );
              task.replay.pendingTasks--;
            } catch (x) {
              if (
                "object" === typeof x &&
                null !== x &&
                (x === SuspenseException || "function" === typeof x.then)
              )
                throw x;
              task.replay.pendingTasks--;
              children = getThrownInfo(task.componentStack);
              erroredReplay(
                request$jscomp$0,
                task.blockedBoundary,
                x,
                children,
                childIndex,
                node,
                task.debugTask
              );
            }
            task.replay = replay;
            replayNodes.splice(j, 1);
            break;
          }
        }
        task.keyPath = prevKeyPath;
        task.componentStack = previousComponentStack;
        task.debugTask = previousDebugTask;
        return;
      }
      replay = task.treeContext;
      replayNodes = children.length;
      if (
        null !== task.replay &&
        ((j = task.replay.slots), null !== j && "object" === typeof j)
      ) {
        for (childIndex = 0; childIndex < replayNodes; childIndex++) {
          node = children[childIndex];
          task.treeContext = pushTreeContext(replay, replayNodes, childIndex);
          var resumeSegmentID = j[childIndex];
          "number" === typeof resumeSegmentID
            ? (resumeNode(
                request$jscomp$0,
                task,
                resumeSegmentID,
                node,
                childIndex
              ),
              delete j[childIndex])
            : renderNode(request$jscomp$0, task, node, childIndex);
        }
        task.treeContext = replay;
        task.keyPath = prevKeyPath;
        task.componentStack = previousComponentStack;
        task.debugTask = previousDebugTask;
        return;
      }
      for (j = 0; j < replayNodes; j++) {
        childIndex = children[j];
        var request = request$jscomp$0;
        node = task;
        resumeSegmentID = childIndex;
        if (
          null !== resumeSegmentID &&
          "object" === typeof resumeSegmentID &&
          (resumeSegmentID.$$typeof === REACT_ELEMENT_TYPE ||
            resumeSegmentID.$$typeof === REACT_PORTAL_TYPE) &&
          resumeSegmentID._store &&
          ((!resumeSegmentID._store.validated && null == resumeSegmentID.key) ||
            2 === resumeSegmentID._store.validated)
        ) {
          if ("object" !== typeof resumeSegmentID._store)
            throw Error(
              "React Component in warnForMissingKey should have a _store. This error is likely caused by a bug in React. Please file an issue."
            );
          resumeSegmentID._store.validated = 1;
          var didWarnForKey = request.didWarnForKey;
          null == didWarnForKey &&
            (didWarnForKey = request.didWarnForKey = new WeakSet());
          request = node.componentStack;
          if (null !== request && !didWarnForKey.has(request)) {
            didWarnForKey.add(request);
            var componentName = getComponentNameFromType(resumeSegmentID.type);
            didWarnForKey = resumeSegmentID._owner;
            var parentOwner = request.owner;
            request = "";
            if (parentOwner && "undefined" !== typeof parentOwner.type) {
              var name = getComponentNameFromType(parentOwner.type);
              name &&
                (request = "\n\nCheck the render method of `" + name + "`.");
            }
            request ||
              (componentName &&
                (request =
                  "\n\nCheck the top-level render call using <" +
                  componentName +
                  ">."));
            componentName = "";
            null != didWarnForKey &&
              parentOwner !== didWarnForKey &&
              ((parentOwner = null),
              "undefined" !== typeof didWarnForKey.type
                ? (parentOwner = getComponentNameFromType(didWarnForKey.type))
                : "string" === typeof didWarnForKey.name &&
                  (parentOwner = didWarnForKey.name),
              parentOwner &&
                (componentName =
                  " It was passed a child from " + parentOwner + "."));
            didWarnForKey = node.componentStack;
            node.componentStack = {
              parent: node.componentStack,
              type: resumeSegmentID.type,
              owner: resumeSegmentID._owner,
              stack: resumeSegmentID._debugStack
            };
            console.error(
              'Each child in a list should have a unique "key" prop.%s%s See https://react.dev/link/warning-keys for more information.',
              request,
              componentName
            );
            node.componentStack = didWarnForKey;
          }
        }
        task.treeContext = pushTreeContext(replay, replayNodes, j);
        renderNode(request$jscomp$0, task, childIndex, j);
      }
      task.treeContext = replay;
      task.keyPath = prevKeyPath;
      task.componentStack = previousComponentStack;
      task.debugTask = previousDebugTask;
    }
    function trackPostpone(request, trackedPostpones, task, segment) {
      segment.status = 5;
      var keyPath = task.keyPath,
        boundary = task.blockedBoundary;
      if (null === boundary)
        (segment.id = request.nextSegmentId++),
          (trackedPostpones.rootSlots = segment.id),
          null !== request.completedRootSegment &&
            (request.completedRootSegment.status = 5);
      else {
        if (null !== boundary && 0 === boundary.status) {
          boundary.status = 5;
          boundary.rootSegmentID = request.nextSegmentId++;
          var boundaryKeyPath = boundary.trackedContentKeyPath;
          if (null === boundaryKeyPath)
            throw Error(
              "It should not be possible to postpone at the root. This is a bug in React."
            );
          var fallbackReplayNode = boundary.trackedFallbackNode,
            children = [];
          if (boundaryKeyPath === keyPath && -1 === task.childIndex) {
            -1 === segment.id &&
              (segment.id = segment.parentFlushed
                ? boundary.rootSegmentID
                : request.nextSegmentId++);
            segment = [
              boundaryKeyPath[1],
              boundaryKeyPath[2],
              children,
              segment.id,
              fallbackReplayNode,
              boundary.rootSegmentID
            ];
            trackedPostpones.workingMap.set(boundaryKeyPath, segment);
            addToReplayParent(segment, boundaryKeyPath[0], trackedPostpones);
            return;
          }
          var _boundaryNode = trackedPostpones.workingMap.get(boundaryKeyPath);
          void 0 === _boundaryNode
            ? ((_boundaryNode = [
                boundaryKeyPath[1],
                boundaryKeyPath[2],
                children,
                null,
                fallbackReplayNode,
                boundary.rootSegmentID
              ]),
              trackedPostpones.workingMap.set(boundaryKeyPath, _boundaryNode),
              addToReplayParent(
                _boundaryNode,
                boundaryKeyPath[0],
                trackedPostpones
              ))
            : ((boundaryKeyPath = _boundaryNode),
              (boundaryKeyPath[4] = fallbackReplayNode),
              (boundaryKeyPath[5] = boundary.rootSegmentID));
        }
        -1 === segment.id &&
          (segment.id =
            segment.parentFlushed && null !== boundary
              ? boundary.rootSegmentID
              : request.nextSegmentId++);
        if (-1 === task.childIndex)
          null === keyPath
            ? (trackedPostpones.rootSlots = segment.id)
            : ((task = trackedPostpones.workingMap.get(keyPath)),
              void 0 === task
                ? ((task = [keyPath[1], keyPath[2], [], segment.id]),
                  addToReplayParent(task, keyPath[0], trackedPostpones))
                : (task[3] = segment.id));
        else {
          if (null === keyPath)
            if (((request = trackedPostpones.rootSlots), null === request))
              request = trackedPostpones.rootSlots = {};
            else {
              if ("number" === typeof request)
                throw Error(
                  "It should not be possible to postpone both at the root of an element as well as a slot below. This is a bug in React."
                );
            }
          else if (
            ((boundary = trackedPostpones.workingMap),
            (boundaryKeyPath = boundary.get(keyPath)),
            void 0 === boundaryKeyPath)
          )
            (request = {}),
              (boundaryKeyPath = [keyPath[1], keyPath[2], [], request]),
              boundary.set(keyPath, boundaryKeyPath),
              addToReplayParent(boundaryKeyPath, keyPath[0], trackedPostpones);
          else if (((request = boundaryKeyPath[3]), null === request))
            request = boundaryKeyPath[3] = {};
          else if ("number" === typeof request)
            throw Error(
              "It should not be possible to postpone both at the root of an element as well as a slot below. This is a bug in React."
            );
          request[task.childIndex] = segment.id;
        }
      }
    }
    function untrackBoundary(request, boundary) {
      request = request.trackedPostpones;
      null !== request &&
        ((boundary = boundary.trackedContentKeyPath),
        null !== boundary &&
          ((boundary = request.workingMap.get(boundary)),
          void 0 !== boundary &&
            ((boundary.length = 4), (boundary[2] = []), (boundary[3] = null))));
    }
    function spawnNewSuspendedReplayTask(request, task, thenableState) {
      return createReplayTask(
        request,
        thenableState,
        task.replay,
        task.node,
        task.childIndex,
        task.blockedBoundary,
        task.hoistableState,
        task.abortSet,
        task.keyPath,
        task.formatContext,
        task.context,
        task.treeContext,
        task.componentStack,
        task.isFallback,
        emptyContextObject,
        task.debugTask
      );
    }
    function spawnNewSuspendedRenderTask(request, task, thenableState) {
      var segment = task.blockedSegment,
        newSegment = createPendingSegment(
          request,
          segment.chunks.length,
          null,
          task.formatContext,
          segment.lastPushedText,
          !0
        );
      segment.children.push(newSegment);
      segment.lastPushedText = !1;
      return createRenderTask(
        request,
        thenableState,
        task.node,
        task.childIndex,
        task.blockedBoundary,
        newSegment,
        task.hoistableState,
        task.abortSet,
        task.keyPath,
        task.formatContext,
        task.context,
        task.treeContext,
        task.componentStack,
        task.isFallback,
        emptyContextObject,
        task.debugTask
      );
    }
    function renderNode(request, task, node, childIndex) {
      var previousFormatContext = task.formatContext,
        previousContext = task.context,
        previousKeyPath = task.keyPath,
        previousTreeContext = task.treeContext,
        previousComponentStack = task.componentStack,
        previousDebugTask = task.debugTask,
        segment = task.blockedSegment;
      if (null === segment)
        try {
          return renderNodeDestructive(request, task, node, childIndex);
        } catch (thrownValue) {
          if (
            (resetHooksState(),
            (childIndex =
              thrownValue === SuspenseException
                ? getSuspendedThenable()
                : thrownValue),
            "object" === typeof childIndex && null !== childIndex)
          ) {
            if ("function" === typeof childIndex.then) {
              node = childIndex;
              childIndex = getThenableStateAfterSuspending();
              request = spawnNewSuspendedReplayTask(
                request,
                task,
                childIndex
              ).ping;
              node.then(request, request);
              task.formatContext = previousFormatContext;
              task.context = previousContext;
              task.keyPath = previousKeyPath;
              task.treeContext = previousTreeContext;
              task.componentStack = previousComponentStack;
              task.debugTask = previousDebugTask;
              switchContext(previousContext);
              return;
            }
            if ("Maximum call stack size exceeded" === childIndex.message) {
              node = getThenableStateAfterSuspending();
              node = spawnNewSuspendedReplayTask(request, task, node);
              request.pingedTasks.push(node);
              task.formatContext = previousFormatContext;
              task.context = previousContext;
              task.keyPath = previousKeyPath;
              task.treeContext = previousTreeContext;
              task.componentStack = previousComponentStack;
              task.debugTask = previousDebugTask;
              switchContext(previousContext);
              return;
            }
          }
        }
      else {
        var childrenLength = segment.children.length,
          chunkLength = segment.chunks.length;
        try {
          return renderNodeDestructive(request, task, node, childIndex);
        } catch (thrownValue$7) {
          if (
            (resetHooksState(),
            (segment.children.length = childrenLength),
            (segment.chunks.length = chunkLength),
            (childIndex =
              thrownValue$7 === SuspenseException
                ? getSuspendedThenable()
                : thrownValue$7),
            "object" === typeof childIndex && null !== childIndex)
          ) {
            if ("function" === typeof childIndex.then) {
              node = childIndex;
              childIndex = getThenableStateAfterSuspending();
              request = spawnNewSuspendedRenderTask(
                request,
                task,
                childIndex
              ).ping;
              node.then(request, request);
              task.formatContext = previousFormatContext;
              task.context = previousContext;
              task.keyPath = previousKeyPath;
              task.treeContext = previousTreeContext;
              task.componentStack = previousComponentStack;
              task.debugTask = previousDebugTask;
              switchContext(previousContext);
              return;
            }
            if (
              childIndex.$$typeof === REACT_POSTPONE_TYPE &&
              null !== request.trackedPostpones &&
              null !== task.blockedBoundary
            ) {
              node = request.trackedPostpones;
              segment = getThrownInfo(task.componentStack);
              logPostpone(request, childIndex.message, segment, task.debugTask);
              childIndex = task.blockedSegment;
              segment = createPendingSegment(
                request,
                childIndex.chunks.length,
                null,
                task.formatContext,
                childIndex.lastPushedText,
                !0
              );
              childIndex.children.push(segment);
              childIndex.lastPushedText = !1;
              trackPostpone(request, node, task, segment);
              task.formatContext = previousFormatContext;
              task.context = previousContext;
              task.keyPath = previousKeyPath;
              task.treeContext = previousTreeContext;
              task.componentStack = previousComponentStack;
              task.debugTask = previousDebugTask;
              switchContext(previousContext);
              return;
            }
            if ("Maximum call stack size exceeded" === childIndex.message) {
              node = getThenableStateAfterSuspending();
              node = spawnNewSuspendedRenderTask(request, task, node);
              request.pingedTasks.push(node);
              task.formatContext = previousFormatContext;
              task.context = previousContext;
              task.keyPath = previousKeyPath;
              task.treeContext = previousTreeContext;
              task.componentStack = previousComponentStack;
              task.debugTask = previousDebugTask;
              switchContext(previousContext);
              return;
            }
          }
        }
      }
      task.formatContext = previousFormatContext;
      task.context = previousContext;
      task.keyPath = previousKeyPath;
      task.treeContext = previousTreeContext;
      switchContext(previousContext);
      throw childIndex;
    }
    function erroredReplay(
      request,
      boundary,
      error,
      errorInfo,
      replayNodes,
      resumeSlots,
      debugTask
    ) {
      "object" === typeof error &&
      null !== error &&
      error.$$typeof === REACT_POSTPONE_TYPE
        ? (logPostpone(request, error.message, errorInfo, debugTask),
          (debugTask = "POSTPONE"))
        : (debugTask = logRecoverableError(
            request,
            error,
            errorInfo,
            debugTask
          ));
      abortRemainingReplayNodes(
        request,
        boundary,
        replayNodes,
        resumeSlots,
        error,
        debugTask,
        errorInfo,
        !1
      );
    }
    function abortTaskSoft(task) {
      var boundary = task.blockedBoundary;
      task = task.blockedSegment;
      null !== task && ((task.status = 3), finishedTask(this, boundary, task));
    }
    function abortRemainingReplayNodes(
      request$jscomp$0,
      boundary,
      nodes,
      slots,
      error$jscomp$0,
      errorDigest$jscomp$0,
      errorInfo$jscomp$0,
      aborted
    ) {
      for (var i = 0; i < nodes.length; i++) {
        var node = nodes[i];
        if (4 === node.length)
          abortRemainingReplayNodes(
            request$jscomp$0,
            boundary,
            node[2],
            node[3],
            error$jscomp$0,
            errorDigest$jscomp$0,
            errorInfo$jscomp$0,
            aborted
          );
        else {
          var request = request$jscomp$0;
          node = node[5];
          var error = error$jscomp$0,
            errorDigest = errorDigest$jscomp$0,
            errorInfo = errorInfo$jscomp$0,
            wasAborted = aborted,
            resumedBoundary = createSuspenseBoundary(request, new Set());
          resumedBoundary.parentFlushed = !0;
          resumedBoundary.rootSegmentID = node;
          resumedBoundary.status = 4;
          encodeErrorForBoundary(
            resumedBoundary,
            errorDigest,
            error,
            errorInfo,
            wasAborted
          );
          resumedBoundary.parentFlushed &&
            request.clientRenderedBoundaries.push(resumedBoundary);
        }
      }
      nodes.length = 0;
      if (null !== slots) {
        if (null === boundary)
          throw Error(
            "We should not have any resumable nodes in the shell. This is a bug in React."
          );
        4 !== boundary.status &&
          ((boundary.status = 4),
          encodeErrorForBoundary(
            boundary,
            errorDigest$jscomp$0,
            error$jscomp$0,
            errorInfo$jscomp$0,
            aborted
          ),
          boundary.parentFlushed &&
            request$jscomp$0.clientRenderedBoundaries.push(boundary));
        if ("object" === typeof slots)
          for (var index in slots) delete slots[index];
      }
    }
    function abortTask(task, request, error) {
      var boundary = task.blockedBoundary,
        segment = task.blockedSegment;
      if (null !== segment) {
        if (6 === segment.status) return;
        segment.status = 3;
      }
      var errorInfo = getThrownInfo(task.componentStack);
      if (null === boundary) {
        if (13 !== request.status && 14 !== request.status) {
          boundary = task.replay;
          if (null === boundary) {
            "object" === typeof error &&
            null !== error &&
            error.$$typeof === REACT_POSTPONE_TYPE
              ? ((boundary = request.trackedPostpones),
                null !== boundary && null !== segment
                  ? (logPostpone(request, error.message, errorInfo, null),
                    trackPostpone(request, boundary, task, segment),
                    finishedTask(request, null, segment))
                  : ((task = Error(
                      "The render was aborted with postpone when the shell is incomplete. Reason: " +
                        error.message
                    )),
                    logRecoverableError(request, task, errorInfo, null),
                    fatalError(request, task, errorInfo, null)))
              : null !== request.trackedPostpones && null !== segment
                ? ((boundary = request.trackedPostpones),
                  logRecoverableError(request, error, errorInfo, null),
                  trackPostpone(request, boundary, task, segment),
                  finishedTask(request, null, segment))
                : (logRecoverableError(request, error, errorInfo, null),
                  fatalError(request, error, errorInfo, null));
            return;
          }
          boundary.pendingTasks--;
          0 === boundary.pendingTasks &&
            0 < boundary.nodes.length &&
            ("object" === typeof error &&
            null !== error &&
            error.$$typeof === REACT_POSTPONE_TYPE
              ? (logPostpone(request, error.message, errorInfo, null),
                (task = "POSTPONE"))
              : (task = logRecoverableError(request, error, errorInfo, null)),
            abortRemainingReplayNodes(
              request,
              null,
              boundary.nodes,
              boundary.slots,
              error,
              task,
              errorInfo,
              !0
            ));
          request.pendingRootTasks--;
          0 === request.pendingRootTasks && completeShell(request);
        }
      } else {
        boundary.pendingTasks--;
        var _trackedPostpones2 = request.trackedPostpones;
        if (4 !== boundary.status) {
          if (null !== _trackedPostpones2 && null !== segment)
            return (
              "object" === typeof error &&
              null !== error &&
              error.$$typeof === REACT_POSTPONE_TYPE
                ? logPostpone(request, error.message, errorInfo, null)
                : logRecoverableError(request, error, errorInfo, null),
              trackPostpone(request, _trackedPostpones2, task, segment),
              boundary.fallbackAbortableTasks.forEach(function (fallbackTask) {
                return abortTask(fallbackTask, request, error);
              }),
              boundary.fallbackAbortableTasks.clear(),
              finishedTask(request, boundary, segment)
            );
          boundary.status = 4;
          if (
            "object" === typeof error &&
            null !== error &&
            error.$$typeof === REACT_POSTPONE_TYPE
          ) {
            logPostpone(request, error.message, errorInfo, null);
            if (null !== request.trackedPostpones && null !== segment) {
              trackPostpone(request, request.trackedPostpones, task, segment);
              finishedTask(request, task.blockedBoundary, segment);
              boundary.fallbackAbortableTasks.forEach(function (fallbackTask) {
                return abortTask(fallbackTask, request, error);
              });
              boundary.fallbackAbortableTasks.clear();
              return;
            }
            task = "POSTPONE";
          } else task = logRecoverableError(request, error, errorInfo, null);
          boundary.status = 4;
          encodeErrorForBoundary(boundary, task, error, errorInfo, !0);
          untrackBoundary(request, boundary);
          boundary.parentFlushed &&
            request.clientRenderedBoundaries.push(boundary);
        }
        boundary.fallbackAbortableTasks.forEach(function (fallbackTask) {
          return abortTask(fallbackTask, request, error);
        });
        boundary.fallbackAbortableTasks.clear();
      }
      request.allPendingTasks--;
      0 === request.allPendingTasks && completeAll(request);
    }
    function safelyEmitEarlyPreloads(request, shellComplete) {
      try {
        var renderState = request.renderState,
          onHeaders = renderState.onHeaders;
        if (onHeaders) {
          var headers = renderState.headers;
          if (headers) {
            renderState.headers = null;
            var linkHeader = headers.preconnects;
            headers.fontPreloads &&
              (linkHeader && (linkHeader += ", "),
              (linkHeader += headers.fontPreloads));
            headers.highImagePreloads &&
              (linkHeader && (linkHeader += ", "),
              (linkHeader += headers.highImagePreloads));
            if (!shellComplete) {
              var queueIter = renderState.styles.values(),
                queueStep = queueIter.next();
              b: for (
                ;
                0 < headers.remainingCapacity && !queueStep.done;
                queueStep = queueIter.next()
              )
                for (
                  var sheetIter = queueStep.value.sheets.values(),
                    sheetStep = sheetIter.next();
                  0 < headers.remainingCapacity && !sheetStep.done;
                  sheetStep = sheetIter.next()
                ) {
                  var sheet = sheetStep.value,
                    props = sheet.props,
                    key = props.href,
                    props$jscomp$0 = sheet.props;
                  var header = getPreloadAsHeader(
                    props$jscomp$0.href,
                    "style",
                    {
                      crossOrigin: props$jscomp$0.crossOrigin,
                      integrity: props$jscomp$0.integrity,
                      nonce: props$jscomp$0.nonce,
                      type: props$jscomp$0.type,
                      fetchPriority: props$jscomp$0.fetchPriority,
                      referrerPolicy: props$jscomp$0.referrerPolicy,
                      media: props$jscomp$0.media
                    }
                  );
                  if (0 <= (headers.remainingCapacity -= header.length + 2))
                    (renderState.resets.style[key] = PRELOAD_NO_CREDS),
                      linkHeader && (linkHeader += ", "),
                      (linkHeader += header),
                      (renderState.resets.style[key] =
                        "string" === typeof props.crossOrigin ||
                        "string" === typeof props.integrity
                          ? [props.crossOrigin, props.integrity]
                          : PRELOAD_NO_CREDS);
                  else break b;
                }
            }
            linkHeader ? onHeaders({ Link: linkHeader }) : onHeaders({});
          }
        }
      } catch (error) {
        logRecoverableError(request, error, {}, null);
      }
    }
    function completeShell(request) {
      null === request.trackedPostpones && safelyEmitEarlyPreloads(request, !0);
      request.onShellError = noop;
      request = request.onShellReady;
      request();
    }
    function completeAll(request) {
      safelyEmitEarlyPreloads(
        request,
        null === request.trackedPostpones
          ? !0
          : null === request.completedRootSegment ||
              5 !== request.completedRootSegment.status
      );
      request = request.onAllReady;
      request();
    }
    function queueCompletedSegment(boundary, segment) {
      if (
        0 === segment.chunks.length &&
        1 === segment.children.length &&
        null === segment.children[0].boundary &&
        -1 === segment.children[0].id
      ) {
        var childSegment = segment.children[0];
        childSegment.id = segment.id;
        childSegment.parentFlushed = !0;
        1 === childSegment.status &&
          queueCompletedSegment(boundary, childSegment);
      } else boundary.completedSegments.push(segment);
    }
    function finishedTask(request, boundary, segment) {
      if (null === boundary) {
        if (null !== segment && segment.parentFlushed) {
          if (null !== request.completedRootSegment)
            throw Error(
              "There can only be one root segment. This is a bug in React."
            );
          request.completedRootSegment = segment;
        }
        request.pendingRootTasks--;
        0 === request.pendingRootTasks && completeShell(request);
      } else
        boundary.pendingTasks--,
          4 !== boundary.status &&
            (0 === boundary.pendingTasks
              ? (0 === boundary.status && (boundary.status = 1),
                null !== segment &&
                  segment.parentFlushed &&
                  1 === segment.status &&
                  queueCompletedSegment(boundary, segment),
                boundary.parentFlushed &&
                  request.completedBoundaries.push(boundary),
                1 === boundary.status &&
                  (boundary.fallbackAbortableTasks.forEach(
                    abortTaskSoft,
                    request
                  ),
                  boundary.fallbackAbortableTasks.clear()))
              : null !== segment &&
                segment.parentFlushed &&
                1 === segment.status &&
                (queueCompletedSegment(boundary, segment),
                1 === boundary.completedSegments.length &&
                  boundary.parentFlushed &&
                  request.partialBoundaries.push(boundary)));
      request.allPendingTasks--;
      0 === request.allPendingTasks && completeAll(request);
    }
    function performWork(request$jscomp$1) {
      if (14 !== request$jscomp$1.status && 13 !== request$jscomp$1.status) {
        var prevContext = currentActiveSnapshot,
          prevDispatcher = ReactSharedInternals$1.H;
        ReactSharedInternals$1.H = HooksDispatcher;
        var prevAsyncDispatcher = ReactSharedInternals$1.A;
        ReactSharedInternals$1.A = DefaultAsyncDispatcher;
        var prevGetCurrentStackImpl = ReactSharedInternals$1.getCurrentStack;
        ReactSharedInternals$1.getCurrentStack = getCurrentStackInDEV;
        var prevResumableState = currentResumableState;
        currentResumableState = request$jscomp$1.resumableState;
        try {
          var pingedTasks = request$jscomp$1.pingedTasks,
            i;
          for (i = 0; i < pingedTasks.length; i++) {
            var request = request$jscomp$1,
              task = pingedTasks[i],
              segment = task.blockedSegment;
            if (null === segment) {
              var prevTaskInDEV = void 0,
                request$jscomp$0 = request;
              request = task;
              if (0 !== request.replay.pendingTasks) {
                switchContext(request.context);
                prevTaskInDEV = currentTaskInDEV;
                currentTaskInDEV = request;
                try {
                  "number" === typeof request.replay.slots
                    ? resumeNode(
                        request$jscomp$0,
                        request,
                        request.replay.slots,
                        request.node,
                        request.childIndex
                      )
                    : retryNode(request$jscomp$0, request);
                  if (
                    1 === request.replay.pendingTasks &&
                    0 < request.replay.nodes.length
                  )
                    throw Error(
                      "Couldn't find all resumable slots by key/index during replaying. The tree doesn't match so React will fallback to client rendering."
                    );
                  request.replay.pendingTasks--;
                  request.abortSet.delete(request);
                  finishedTask(request$jscomp$0, request.blockedBoundary, null);
                } catch (thrownValue) {
                  resetHooksState();
                  var x =
                    thrownValue === SuspenseException
                      ? getSuspendedThenable()
                      : thrownValue;
                  if (
                    "object" === typeof x &&
                    null !== x &&
                    "function" === typeof x.then
                  ) {
                    var ping = request.ping;
                    x.then(ping, ping);
                    request.thenableState = getThenableStateAfterSuspending();
                  } else {
                    request.replay.pendingTasks--;
                    request.abortSet.delete(request);
                    var errorInfo = getThrownInfo(request.componentStack);
                    erroredReplay(
                      request$jscomp$0,
                      request.blockedBoundary,
                      12 === request$jscomp$0.status
                        ? request$jscomp$0.fatalError
                        : x,
                      errorInfo,
                      request.replay.nodes,
                      request.replay.slots,
                      request.debugTask
                    );
                    request$jscomp$0.pendingRootTasks--;
                    0 === request$jscomp$0.pendingRootTasks &&
                      completeShell(request$jscomp$0);
                    request$jscomp$0.allPendingTasks--;
                    0 === request$jscomp$0.allPendingTasks &&
                      completeAll(request$jscomp$0);
                  }
                } finally {
                  currentTaskInDEV = prevTaskInDEV;
                }
              }
            } else
              a: {
                request$jscomp$0 = prevTaskInDEV = void 0;
                var task$jscomp$0 = task,
                  segment$jscomp$0 = segment;
                if (0 === segment$jscomp$0.status) {
                  segment$jscomp$0.status = 6;
                  switchContext(task$jscomp$0.context);
                  request$jscomp$0 = currentTaskInDEV;
                  currentTaskInDEV = task$jscomp$0;
                  var childrenLength = segment$jscomp$0.children.length,
                    chunkLength = segment$jscomp$0.chunks.length;
                  try {
                    retryNode(request, task$jscomp$0),
                      task$jscomp$0.abortSet.delete(task$jscomp$0),
                      (segment$jscomp$0.status = 1),
                      finishedTask(
                        request,
                        task$jscomp$0.blockedBoundary,
                        segment$jscomp$0
                      );
                  } catch (thrownValue) {
                    resetHooksState();
                    segment$jscomp$0.children.length = childrenLength;
                    segment$jscomp$0.chunks.length = chunkLength;
                    var x$jscomp$0 =
                      thrownValue === SuspenseException
                        ? getSuspendedThenable()
                        : 12 === request.status
                          ? request.fatalError
                          : thrownValue;
                    if (
                      12 === request.status &&
                      null !== request.trackedPostpones
                    ) {
                      var trackedPostpones = request.trackedPostpones,
                        thrownInfo = getThrownInfo(
                          task$jscomp$0.componentStack
                        );
                      task$jscomp$0.abortSet.delete(task$jscomp$0);
                      "object" === typeof x$jscomp$0 &&
                      null !== x$jscomp$0 &&
                      x$jscomp$0.$$typeof === REACT_POSTPONE_TYPE
                        ? logPostpone(
                            request,
                            x$jscomp$0.message,
                            thrownInfo,
                            task$jscomp$0.debugTask
                          )
                        : logRecoverableError(
                            request,
                            x$jscomp$0,
                            thrownInfo,
                            task$jscomp$0.debugTask
                          );
                      trackPostpone(
                        request,
                        trackedPostpones,
                        task$jscomp$0,
                        segment$jscomp$0
                      );
                      finishedTask(
                        request,
                        task$jscomp$0.blockedBoundary,
                        segment$jscomp$0
                      );
                    } else {
                      if (
                        "object" === typeof x$jscomp$0 &&
                        null !== x$jscomp$0
                      ) {
                        if ("function" === typeof x$jscomp$0.then) {
                          segment$jscomp$0.status = 0;
                          task$jscomp$0.thenableState =
                            getThenableStateAfterSuspending();
                          var ping$jscomp$0 = task$jscomp$0.ping;
                          x$jscomp$0.then(ping$jscomp$0, ping$jscomp$0);
                          break a;
                        }
                        if (
                          null !== request.trackedPostpones &&
                          x$jscomp$0.$$typeof === REACT_POSTPONE_TYPE
                        ) {
                          var _trackedPostpones3 = request.trackedPostpones;
                          task$jscomp$0.abortSet.delete(task$jscomp$0);
                          var postponeInfo = getThrownInfo(
                            task$jscomp$0.componentStack
                          );
                          logPostpone(
                            request,
                            x$jscomp$0.message,
                            postponeInfo,
                            task$jscomp$0.debugTask
                          );
                          trackPostpone(
                            request,
                            _trackedPostpones3,
                            task$jscomp$0,
                            segment$jscomp$0
                          );
                          finishedTask(
                            request,
                            task$jscomp$0.blockedBoundary,
                            segment$jscomp$0
                          );
                          break a;
                        }
                      }
                      var errorInfo$jscomp$0 = getThrownInfo(
                        task$jscomp$0.componentStack
                      );
                      task$jscomp$0.abortSet.delete(task$jscomp$0);
                      segment$jscomp$0.status = 4;
                      var boundary = task$jscomp$0.blockedBoundary,
                        debugTask = task$jscomp$0.debugTask;
                      "object" === typeof x$jscomp$0 &&
                      null !== x$jscomp$0 &&
                      x$jscomp$0.$$typeof === REACT_POSTPONE_TYPE
                        ? (logPostpone(
                            request,
                            x$jscomp$0.message,
                            errorInfo$jscomp$0,
                            debugTask
                          ),
                          (prevTaskInDEV = "POSTPONE"))
                        : (prevTaskInDEV = logRecoverableError(
                            request,
                            x$jscomp$0,
                            errorInfo$jscomp$0,
                            debugTask
                          ));
                      null === boundary
                        ? fatalError(
                            request,
                            x$jscomp$0,
                            errorInfo$jscomp$0,
                            debugTask
                          )
                        : (boundary.pendingTasks--,
                          4 !== boundary.status &&
                            ((boundary.status = 4),
                            encodeErrorForBoundary(
                              boundary,
                              prevTaskInDEV,
                              x$jscomp$0,
                              errorInfo$jscomp$0,
                              !1
                            ),
                            untrackBoundary(request, boundary),
                            boundary.parentFlushed &&
                              request.clientRenderedBoundaries.push(boundary)));
                      request.allPendingTasks--;
                      0 === request.allPendingTasks && completeAll(request);
                    }
                  } finally {
                    currentTaskInDEV = request$jscomp$0;
                  }
                }
              }
          }
          pingedTasks.splice(0, i);
          null !== request$jscomp$1.destination &&
            flushCompletedQueues(
              request$jscomp$1,
              request$jscomp$1.destination
            );
        } catch (error) {
          (pingedTasks = {}),
            logRecoverableError(request$jscomp$1, error, pingedTasks, null),
            fatalError(request$jscomp$1, error, pingedTasks, null);
        } finally {
          (currentResumableState = prevResumableState),
            (ReactSharedInternals$1.H = prevDispatcher),
            (ReactSharedInternals$1.A = prevAsyncDispatcher),
            (ReactSharedInternals$1.getCurrentStack = prevGetCurrentStackImpl),
            prevDispatcher === HooksDispatcher && switchContext(prevContext);
        }
      }
    }
    function flushSubtree(request, destination, segment, hoistableState) {
      segment.parentFlushed = !0;
      switch (segment.status) {
        case 0:
          segment.id = request.nextSegmentId++;
        case 5:
          return (
            (hoistableState = segment.id),
            (segment.lastPushedText = !1),
            (segment.textEmbedded = !1),
            (request = request.renderState),
            destination.push('<template id="'),
            destination.push(request.placeholderPrefix),
            (request = hoistableState.toString(16)),
            destination.push(request),
            destination.push('"></template>')
          );
        case 1:
          segment.status = 2;
          var r = !0,
            chunks = segment.chunks,
            chunkIdx = 0;
          segment = segment.children;
          for (var childIdx = 0; childIdx < segment.length; childIdx++) {
            for (r = segment[childIdx]; chunkIdx < r.index; chunkIdx++)
              destination.push(chunks[chunkIdx]);
            r = flushSegment(request, destination, r, hoistableState);
          }
          for (; chunkIdx < chunks.length - 1; chunkIdx++)
            destination.push(chunks[chunkIdx]);
          chunkIdx < chunks.length && (r = destination.push(chunks[chunkIdx]));
          return r;
        default:
          throw Error(
            "Aborted, errored or already flushed boundaries should not be flushed again. This is a bug in React."
          );
      }
    }
    function flushSegment(request, destination, segment, hoistableState) {
      var boundary = segment.boundary;
      if (null === boundary)
        return flushSubtree(request, destination, segment, hoistableState);
      boundary.parentFlushed = !0;
      if (4 === boundary.status)
        return flushSubtree(request, destination, segment, hoistableState), !0;
      if (1 !== boundary.status)
        return (
          0 === boundary.status &&
            (boundary.rootSegmentID = request.nextSegmentId++),
          0 < boundary.completedSegments.length &&
            request.partialBoundaries.push(boundary),
          writeStartPendingSuspenseBoundary(
            destination,
            request.renderState,
            boundary.rootSegmentID
          ),
          hoistableState &&
            ((boundary = boundary.fallbackState),
            boundary.styles.forEach(hoistStyleQueueDependency, hoistableState),
            boundary.stylesheets.forEach(
              hoistStylesheetDependency,
              hoistableState
            )),
          flushSubtree(request, destination, segment, hoistableState),
          destination.push("\x3c!--/$--\x3e")
        );
      if (boundary.byteSize > request.progressiveChunkSize)
        return (
          (boundary.rootSegmentID = request.nextSegmentId++),
          request.completedBoundaries.push(boundary),
          writeStartPendingSuspenseBoundary(
            destination,
            request.renderState,
            boundary.rootSegmentID
          ),
          flushSubtree(request, destination, segment, hoistableState),
          destination.push("\x3c!--/$--\x3e")
        );
      hoistableState &&
        ((segment = boundary.contentState),
        segment.styles.forEach(hoistStyleQueueDependency, hoistableState),
        segment.stylesheets.forEach(hoistStylesheetDependency, hoistableState));
      segment = boundary.completedSegments;
      if (1 !== segment.length)
        throw Error(
          "A previously unvisited boundary must have exactly one root segment. This is a bug in React."
        );
      flushSegment(request, destination, segment[0], hoistableState);
      return !0;
    }
    function flushSegmentContainer(
      request,
      destination,
      segment,
      hoistableState
    ) {
      writeStartSegment(
        destination,
        request.renderState,
        segment.parentFormatContext,
        segment.id
      );
      flushSegment(request, destination, segment, hoistableState);
      return writeEndSegment(destination, segment.parentFormatContext);
    }
    function flushCompletedBoundary(request, destination, boundary) {
      for (
        var completedSegments = boundary.completedSegments, i = 0;
        i < completedSegments.length;
        i++
      )
        flushPartiallyCompletedSegment(
          request,
          destination,
          boundary,
          completedSegments[i]
        );
      completedSegments.length = 0;
      writeHoistablesForBoundary(
        destination,
        boundary.contentState,
        request.renderState
      );
      completedSegments = request.resumableState;
      request = request.renderState;
      i = boundary.rootSegmentID;
      boundary = boundary.contentState;
      var requiresStyleInsertion = request.stylesToHoist;
      request.stylesToHoist = !1;
      var scriptFormat = 0 === completedSegments.streamingFormat;
      scriptFormat
        ? (destination.push(request.startInlineScript),
          requiresStyleInsertion
            ? 0 === (completedSegments.instructions & 2)
              ? ((completedSegments.instructions |= 10),
                destination.push(
                  '$RC=function(b,c,e){c=document.getElementById(c);c.parentNode.removeChild(c);var a=document.getElementById(b);if(a){b=a.previousSibling;if(e)b.data="$!",a.setAttribute("data-dgst",e);else{e=b.parentNode;a=b.nextSibling;var f=0;do{if(a&&8===a.nodeType){var d=a.data;if("/$"===d)if(0===f)break;else f--;else"$"!==d&&"$?"!==d&&"$!"!==d||f++}d=a.nextSibling;e.removeChild(a);a=d}while(a);for(;c.firstChild;)e.insertBefore(c.firstChild,a);b.data="$"}b._reactRetry&&b._reactRetry()}};$RM=new Map;\n$RR=function(t,u,y){function v(n){this._p=null;n()}for(var w=$RC,p=$RM,q=new Map,r=document,g,b,h=r.querySelectorAll("link[data-precedence],style[data-precedence]"),x=[],k=0;b=h[k++];)"not all"===b.getAttribute("media")?x.push(b):("LINK"===b.tagName&&p.set(b.getAttribute("href"),b),q.set(b.dataset.precedence,g=b));b=0;h=[];var l,a;for(k=!0;;){if(k){var e=y[b++];if(!e){k=!1;b=0;continue}var c=!1,m=0;var d=e[m++];if(a=p.get(d)){var f=a._p;c=!0}else{a=r.createElement("link");a.href=\nd;a.rel="stylesheet";for(a.dataset.precedence=l=e[m++];f=e[m++];)a.setAttribute(f,e[m++]);f=a._p=new Promise(function(n,z){a.onload=v.bind(a,n);a.onerror=v.bind(a,z)});p.set(d,a)}d=a.getAttribute("media");!f||d&&!matchMedia(d).matches||h.push(f);if(c)continue}else{a=x[b++];if(!a)break;l=a.getAttribute("data-precedence");a.removeAttribute("media")}c=q.get(l)||g;c===g&&(g=a);q.set(l,a);c?c.parentNode.insertBefore(a,c.nextSibling):(c=r.head,c.insertBefore(a,c.firstChild))}Promise.all(h).then(w.bind(null,\nt,u,""),w.bind(null,t,u,"Resource failed to load"))};$RR("'
                ))
              : 0 === (completedSegments.instructions & 8)
                ? ((completedSegments.instructions |= 8),
                  destination.push(
                    '$RM=new Map;\n$RR=function(t,u,y){function v(n){this._p=null;n()}for(var w=$RC,p=$RM,q=new Map,r=document,g,b,h=r.querySelectorAll("link[data-precedence],style[data-precedence]"),x=[],k=0;b=h[k++];)"not all"===b.getAttribute("media")?x.push(b):("LINK"===b.tagName&&p.set(b.getAttribute("href"),b),q.set(b.dataset.precedence,g=b));b=0;h=[];var l,a;for(k=!0;;){if(k){var e=y[b++];if(!e){k=!1;b=0;continue}var c=!1,m=0;var d=e[m++];if(a=p.get(d)){var f=a._p;c=!0}else{a=r.createElement("link");a.href=\nd;a.rel="stylesheet";for(a.dataset.precedence=l=e[m++];f=e[m++];)a.setAttribute(f,e[m++]);f=a._p=new Promise(function(n,z){a.onload=v.bind(a,n);a.onerror=v.bind(a,z)});p.set(d,a)}d=a.getAttribute("media");!f||d&&!matchMedia(d).matches||h.push(f);if(c)continue}else{a=x[b++];if(!a)break;l=a.getAttribute("data-precedence");a.removeAttribute("media")}c=q.get(l)||g;c===g&&(g=a);q.set(l,a);c?c.parentNode.insertBefore(a,c.nextSibling):(c=r.head,c.insertBefore(a,c.firstChild))}Promise.all(h).then(w.bind(null,\nt,u,""),w.bind(null,t,u,"Resource failed to load"))};$RR("'
                  ))
                : destination.push('$RR("')
            : 0 === (completedSegments.instructions & 2)
              ? ((completedSegments.instructions |= 2),
                destination.push(
                  '$RC=function(b,c,e){c=document.getElementById(c);c.parentNode.removeChild(c);var a=document.getElementById(b);if(a){b=a.previousSibling;if(e)b.data="$!",a.setAttribute("data-dgst",e);else{e=b.parentNode;a=b.nextSibling;var f=0;do{if(a&&8===a.nodeType){var d=a.data;if("/$"===d)if(0===f)break;else f--;else"$"!==d&&"$?"!==d&&"$!"!==d||f++}d=a.nextSibling;e.removeChild(a);a=d}while(a);for(;c.firstChild;)e.insertBefore(c.firstChild,a);b.data="$"}b._reactRetry&&b._reactRetry()}};$RC("'
                ))
              : destination.push('$RC("'))
        : requiresStyleInsertion
          ? destination.push('<template data-rri="" data-bid="')
          : destination.push('<template data-rci="" data-bid="');
      completedSegments = i.toString(16);
      destination.push(request.boundaryPrefix);
      destination.push(completedSegments);
      scriptFormat ? destination.push('","') : destination.push('" data-sid="');
      destination.push(request.segmentPrefix);
      destination.push(completedSegments);
      requiresStyleInsertion
        ? scriptFormat
          ? (destination.push('",'),
            writeStyleResourceDependenciesInJS(destination, boundary))
          : (destination.push('" data-sty="'),
            writeStyleResourceDependenciesInAttr(destination, boundary))
        : scriptFormat && destination.push('"');
      completedSegments = scriptFormat
        ? destination.push(")\x3c/script>")
        : destination.push('"></template>');
      return writeBootstrap(destination, request) && completedSegments;
    }
    function flushPartiallyCompletedSegment(
      request,
      destination,
      boundary,
      segment
    ) {
      if (2 === segment.status) return !0;
      var hoistableState = boundary.contentState,
        segmentID = segment.id;
      if (-1 === segmentID) {
        if (-1 === (segment.id = boundary.rootSegmentID))
          throw Error(
            "A root segment ID must have been assigned by now. This is a bug in React."
          );
        return flushSegmentContainer(
          request,
          destination,
          segment,
          hoistableState
        );
      }
      if (segmentID === boundary.rootSegmentID)
        return flushSegmentContainer(
          request,
          destination,
          segment,
          hoistableState
        );
      flushSegmentContainer(request, destination, segment, hoistableState);
      boundary = request.resumableState;
      request = request.renderState;
      (segment = 0 === boundary.streamingFormat)
        ? (destination.push(request.startInlineScript),
          0 === (boundary.instructions & 1)
            ? ((boundary.instructions |= 1),
              destination.push(
                '$RS=function(a,b){a=document.getElementById(a);b=document.getElementById(b);for(a.parentNode.removeChild(a);a.firstChild;)b.parentNode.insertBefore(a.firstChild,b);b.parentNode.removeChild(b)};$RS("'
              ))
            : destination.push('$RS("'))
        : destination.push('<template data-rsi="" data-sid="');
      destination.push(request.segmentPrefix);
      segmentID = segmentID.toString(16);
      destination.push(segmentID);
      segment ? destination.push('","') : destination.push('" data-pid="');
      destination.push(request.placeholderPrefix);
      destination.push(segmentID);
      destination = segment
        ? destination.push('")\x3c/script>')
        : destination.push('"></template>');
      return destination;
    }
    function flushCompletedQueues(request, destination) {
      try {
        if (!(0 < request.pendingRootTasks)) {
          var i,
            completedRootSegment = request.completedRootSegment;
          if (null !== completedRootSegment) {
            if (5 === completedRootSegment.status) return;
            var renderState = request.renderState;
            if (
              (0 !== request.allPendingTasks ||
                null !== request.trackedPostpones) &&
              renderState.externalRuntimeScript
            ) {
              var _renderState$external = renderState.externalRuntimeScript,
                resumableState = request.resumableState,
                src = _renderState$external.src,
                chunks = _renderState$external.chunks;
              resumableState.scriptResources.hasOwnProperty(src) ||
                ((resumableState.scriptResources[src] = null),
                renderState.scripts.add(chunks));
            }
            var htmlChunks = renderState.htmlChunks,
              headChunks = renderState.headChunks,
              i$jscomp$0;
            if (htmlChunks) {
              for (i$jscomp$0 = 0; i$jscomp$0 < htmlChunks.length; i$jscomp$0++)
                destination.push(htmlChunks[i$jscomp$0]);
              if (headChunks)
                for (
                  i$jscomp$0 = 0;
                  i$jscomp$0 < headChunks.length;
                  i$jscomp$0++
                )
                  destination.push(headChunks[i$jscomp$0]);
              else {
                var chunk = startChunkForTag("head");
                destination.push(chunk);
                destination.push(endOfStartTag);
              }
            } else if (headChunks)
              for (i$jscomp$0 = 0; i$jscomp$0 < headChunks.length; i$jscomp$0++)
                destination.push(headChunks[i$jscomp$0]);
            var charsetChunks = renderState.charsetChunks;
            for (
              i$jscomp$0 = 0;
              i$jscomp$0 < charsetChunks.length;
              i$jscomp$0++
            )
              destination.push(charsetChunks[i$jscomp$0]);
            charsetChunks.length = 0;
            renderState.preconnects.forEach(flushResource, destination);
            renderState.preconnects.clear();
            var viewportChunks = renderState.viewportChunks;
            for (
              i$jscomp$0 = 0;
              i$jscomp$0 < viewportChunks.length;
              i$jscomp$0++
            )
              destination.push(viewportChunks[i$jscomp$0]);
            viewportChunks.length = 0;
            renderState.fontPreloads.forEach(flushResource, destination);
            renderState.fontPreloads.clear();
            renderState.highImagePreloads.forEach(flushResource, destination);
            renderState.highImagePreloads.clear();
            renderState.styles.forEach(flushStylesInPreamble, destination);
            var importMapChunks = renderState.importMapChunks;
            for (
              i$jscomp$0 = 0;
              i$jscomp$0 < importMapChunks.length;
              i$jscomp$0++
            )
              destination.push(importMapChunks[i$jscomp$0]);
            importMapChunks.length = 0;
            renderState.bootstrapScripts.forEach(flushResource, destination);
            renderState.scripts.forEach(flushResource, destination);
            renderState.scripts.clear();
            renderState.bulkPreloads.forEach(flushResource, destination);
            renderState.bulkPreloads.clear();
            var hoistableChunks = renderState.hoistableChunks;
            for (
              i$jscomp$0 = 0;
              i$jscomp$0 < hoistableChunks.length;
              i$jscomp$0++
            )
              destination.push(hoistableChunks[i$jscomp$0]);
            hoistableChunks.length = 0;
            if (htmlChunks && null === headChunks) {
              var chunk$jscomp$0 = endChunkForTag("head");
              destination.push(chunk$jscomp$0);
            }
            flushSegment(request, destination, completedRootSegment, null);
            request.completedRootSegment = null;
            writeBootstrap(destination, request.renderState);
          }
          var renderState$jscomp$0 = request.renderState;
          completedRootSegment = 0;
          var viewportChunks$jscomp$0 = renderState$jscomp$0.viewportChunks;
          for (
            completedRootSegment = 0;
            completedRootSegment < viewportChunks$jscomp$0.length;
            completedRootSegment++
          )
            destination.push(viewportChunks$jscomp$0[completedRootSegment]);
          viewportChunks$jscomp$0.length = 0;
          renderState$jscomp$0.preconnects.forEach(flushResource, destination);
          renderState$jscomp$0.preconnects.clear();
          renderState$jscomp$0.fontPreloads.forEach(flushResource, destination);
          renderState$jscomp$0.fontPreloads.clear();
          renderState$jscomp$0.highImagePreloads.forEach(
            flushResource,
            destination
          );
          renderState$jscomp$0.highImagePreloads.clear();
          renderState$jscomp$0.styles.forEach(preloadLateStyles, destination);
          renderState$jscomp$0.scripts.forEach(flushResource, destination);
          renderState$jscomp$0.scripts.clear();
          renderState$jscomp$0.bulkPreloads.forEach(flushResource, destination);
          renderState$jscomp$0.bulkPreloads.clear();
          var hoistableChunks$jscomp$0 = renderState$jscomp$0.hoistableChunks;
          for (
            completedRootSegment = 0;
            completedRootSegment < hoistableChunks$jscomp$0.length;
            completedRootSegment++
          )
            destination.push(hoistableChunks$jscomp$0[completedRootSegment]);
          hoistableChunks$jscomp$0.length = 0;
          var clientRenderedBoundaries = request.clientRenderedBoundaries;
          for (i = 0; i < clientRenderedBoundaries.length; i++) {
            var boundary = clientRenderedBoundaries[i];
            renderState$jscomp$0 = destination;
            var resumableState$jscomp$0 = request.resumableState,
              renderState$jscomp$1 = request.renderState,
              id = boundary.rootSegmentID,
              errorDigest = boundary.errorDigest,
              errorMessage = boundary.errorMessage,
              errorStack = boundary.errorStack,
              errorComponentStack = boundary.errorComponentStack,
              scriptFormat = 0 === resumableState$jscomp$0.streamingFormat;
            scriptFormat
              ? (renderState$jscomp$0.push(
                  renderState$jscomp$1.startInlineScript
                ),
                0 === (resumableState$jscomp$0.instructions & 4)
                  ? ((resumableState$jscomp$0.instructions |= 4),
                    renderState$jscomp$0.push(
                      '$RX=function(b,c,d,e,f){var a=document.getElementById(b);a&&(b=a.previousSibling,b.data="$!",a=a.dataset,c&&(a.dgst=c),d&&(a.msg=d),e&&(a.stck=e),f&&(a.cstck=f),b._reactRetry&&b._reactRetry())};;$RX("'
                    ))
                  : renderState$jscomp$0.push('$RX("'))
              : renderState$jscomp$0.push('<template data-rxi="" data-bid="');
            renderState$jscomp$0.push(renderState$jscomp$1.boundaryPrefix);
            var chunk$jscomp$1 = id.toString(16);
            renderState$jscomp$0.push(chunk$jscomp$1);
            scriptFormat && renderState$jscomp$0.push('"');
            if (
              errorDigest ||
              errorMessage ||
              errorStack ||
              errorComponentStack
            )
              if (scriptFormat) {
                renderState$jscomp$0.push(",");
                var chunk$jscomp$2 = escapeJSStringsForInstructionScripts(
                  errorDigest || ""
                );
                renderState$jscomp$0.push(chunk$jscomp$2);
              } else {
                renderState$jscomp$0.push('" data-dgst="');
                var chunk$jscomp$3 = escapeTextForBrowser(errorDigest || "");
                renderState$jscomp$0.push(chunk$jscomp$3);
              }
            if (errorMessage || errorStack || errorComponentStack)
              if (scriptFormat) {
                renderState$jscomp$0.push(",");
                var chunk$jscomp$4 = escapeJSStringsForInstructionScripts(
                  errorMessage || ""
                );
                renderState$jscomp$0.push(chunk$jscomp$4);
              } else {
                renderState$jscomp$0.push('" data-msg="');
                var chunk$jscomp$5 = escapeTextForBrowser(errorMessage || "");
                renderState$jscomp$0.push(chunk$jscomp$5);
              }
            if (errorStack || errorComponentStack)
              if (scriptFormat) {
                renderState$jscomp$0.push(",");
                var chunk$jscomp$6 = escapeJSStringsForInstructionScripts(
                  errorStack || ""
                );
                renderState$jscomp$0.push(chunk$jscomp$6);
              } else {
                renderState$jscomp$0.push('" data-stck="');
                var chunk$jscomp$7 = escapeTextForBrowser(errorStack || "");
                renderState$jscomp$0.push(chunk$jscomp$7);
              }
            if (errorComponentStack)
              if (scriptFormat) {
                renderState$jscomp$0.push(",");
                var chunk$jscomp$8 =
                  escapeJSStringsForInstructionScripts(errorComponentStack);
                renderState$jscomp$0.push(chunk$jscomp$8);
              } else {
                renderState$jscomp$0.push('" data-cstck="');
                var chunk$jscomp$9 = escapeTextForBrowser(errorComponentStack);
                renderState$jscomp$0.push(chunk$jscomp$9);
              }
            var JSCompiler_inline_result = scriptFormat
              ? renderState$jscomp$0.push(")\x3c/script>")
              : renderState$jscomp$0.push('"></template>');
            if (!JSCompiler_inline_result) {
              request.destination = null;
              i++;
              clientRenderedBoundaries.splice(0, i);
              return;
            }
          }
          clientRenderedBoundaries.splice(0, i);
          var completedBoundaries = request.completedBoundaries;
          for (i = 0; i < completedBoundaries.length; i++)
            if (
              !flushCompletedBoundary(
                request,
                destination,
                completedBoundaries[i]
              )
            ) {
              request.destination = null;
              i++;
              completedBoundaries.splice(0, i);
              return;
            }
          completedBoundaries.splice(0, i);
          var partialBoundaries = request.partialBoundaries;
          for (i = 0; i < partialBoundaries.length; i++) {
            a: {
              clientRenderedBoundaries = request;
              boundary = destination;
              var boundary$jscomp$0 = partialBoundaries[i],
                completedSegments = boundary$jscomp$0.completedSegments;
              for (
                JSCompiler_inline_result = 0;
                JSCompiler_inline_result < completedSegments.length;
                JSCompiler_inline_result++
              )
                if (
                  !flushPartiallyCompletedSegment(
                    clientRenderedBoundaries,
                    boundary,
                    boundary$jscomp$0,
                    completedSegments[JSCompiler_inline_result]
                  )
                ) {
                  JSCompiler_inline_result++;
                  completedSegments.splice(0, JSCompiler_inline_result);
                  var JSCompiler_inline_result$jscomp$0 = !1;
                  break a;
                }
              completedSegments.splice(0, JSCompiler_inline_result);
              JSCompiler_inline_result$jscomp$0 = writeHoistablesForBoundary(
                boundary,
                boundary$jscomp$0.contentState,
                clientRenderedBoundaries.renderState
              );
            }
            if (!JSCompiler_inline_result$jscomp$0) {
              request.destination = null;
              i++;
              partialBoundaries.splice(0, i);
              return;
            }
          }
          partialBoundaries.splice(0, i);
          var largeBoundaries = request.completedBoundaries;
          for (i = 0; i < largeBoundaries.length; i++)
            if (
              !flushCompletedBoundary(request, destination, largeBoundaries[i])
            ) {
              request.destination = null;
              i++;
              largeBoundaries.splice(0, i);
              return;
            }
          largeBoundaries.splice(0, i);
        }
      } finally {
        0 === request.allPendingTasks &&
          0 === request.pingedTasks.length &&
          0 === request.clientRenderedBoundaries.length &&
          0 === request.completedBoundaries.length &&
          ((request.flushScheduled = !1),
          null === request.trackedPostpones &&
            ((i = request.resumableState),
            i.hasBody &&
              ((partialBoundaries = endChunkForTag("body")),
              destination.push(partialBoundaries)),
            i.hasHtml && ((i = endChunkForTag("html")), destination.push(i))),
          0 !== request.abortableTasks.size &&
            console.error(
              "There was still abortable task at the root when we closed. This is a bug in React."
            ),
          (request.status = 14),
          destination.push(null),
          (request.destination = null));
      }
    }
    function startWork(request) {
      request.flushScheduled = null !== request.destination;
      performWork(request);
      10 === request.status && (request.status = 11);
      null === request.trackedPostpones &&
        safelyEmitEarlyPreloads(request, 0 === request.pendingRootTasks);
    }
    function startFlowing(request, destination) {
      if (13 === request.status)
        (request.status = 14), destination.destroy(request.fatalError);
      else if (14 !== request.status && null === request.destination) {
        request.destination = destination;
        try {
          flushCompletedQueues(request, destination);
        } catch (error) {
          (destination = {}),
            logRecoverableError(request, error, destination, null),
            fatalError(request, error, destination, null);
        }
      }
    }
    function abort(request, reason) {
      if (11 === request.status || 10 === request.status) request.status = 12;
      try {
        var abortableTasks = request.abortableTasks;
        if (0 < abortableTasks.size) {
          var error =
            void 0 === reason
              ? Error("The render was aborted by the server without a reason.")
              : "object" === typeof reason &&
                  null !== reason &&
                  "function" === typeof reason.then
                ? Error("The render was aborted by the server with a promise.")
                : reason;
          request.fatalError = error;
          abortableTasks.forEach(function (task) {
            return abortTask(task, request, error);
          });
          abortableTasks.clear();
        }
        null !== request.destination &&
          flushCompletedQueues(request, request.destination);
      } catch (error$8) {
        (reason = {}),
          logRecoverableError(request, error$8, reason, null),
          fatalError(request, error$8, reason, null);
      }
    }
    function addToReplayParent(node, parentKeyPath, trackedPostpones) {
      if (null === parentKeyPath) trackedPostpones.rootNodes.push(node);
      else {
        var workingMap = trackedPostpones.workingMap,
          parentNode = workingMap.get(parentKeyPath);
        void 0 === parentNode &&
          ((parentNode = [parentKeyPath[1], parentKeyPath[2], [], null]),
          workingMap.set(parentKeyPath, parentNode),
          addToReplayParent(parentNode, parentKeyPath[0], trackedPostpones));
        parentNode[2].push(node);
      }
    }
    function noServerCallOrFormAction() {
      throw Error(
        "renderToHTML should not have emitted Server References. This is a bug in React."
      );
    }
    var React = require("react"),
      ReactSharedInternalsServer =
        React.__SERVER_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
    if (!ReactSharedInternalsServer)
      throw Error(
        'The "react" package in this environment is not configured correctly. The "react-server" condition must be enabled in any environment that runs React Server Components.'
      );
    var ReactSharedInternals$1 = {
        H: null,
        A: null,
        T: null,
        S: null,
        actQueue: null,
        isBatchingLegacy: !1,
        didScheduleLegacyUpdate: !1,
        didUsePromise: !1,
        thrownErrors: [],
        getCurrentStack: null
      },
      frameRegExp =
        /^ {3} at (?:(.+) \((?:(.+):(\d+):(\d+)|<anonymous>)\)|(?:async )?(.+):(\d+):(\d+)|<anonymous>)$/,
      CLIENT_REFERENCE_TAG$1 = Symbol.for("react.client.reference"),
      SERVER_REFERENCE_TAG = Symbol.for("react.server.reference"),
      TEMPORARY_REFERENCE_TAG = Symbol.for("react.temporary.reference"),
      REACT_LEGACY_ELEMENT_TYPE = Symbol.for("react.element"),
      REACT_ELEMENT_TYPE = Symbol.for("react.transitional.element"),
      REACT_PORTAL_TYPE = Symbol.for("react.portal"),
      REACT_FRAGMENT_TYPE = Symbol.for("react.fragment"),
      REACT_STRICT_MODE_TYPE = Symbol.for("react.strict_mode"),
      REACT_PROFILER_TYPE = Symbol.for("react.profiler"),
      REACT_PROVIDER_TYPE = Symbol.for("react.provider"),
      REACT_CONSUMER_TYPE = Symbol.for("react.consumer"),
      REACT_CONTEXT_TYPE = Symbol.for("react.context"),
      REACT_FORWARD_REF_TYPE = Symbol.for("react.forward_ref"),
      REACT_SUSPENSE_TYPE = Symbol.for("react.suspense"),
      REACT_SUSPENSE_LIST_TYPE = Symbol.for("react.suspense_list"),
      REACT_MEMO_TYPE = Symbol.for("react.memo"),
      REACT_LAZY_TYPE = Symbol.for("react.lazy"),
      REACT_SCOPE_TYPE = Symbol.for("react.scope"),
      REACT_DEBUG_TRACING_MODE_TYPE = Symbol.for("react.debug_trace_mode"),
      REACT_OFFSCREEN_TYPE = Symbol.for("react.offscreen"),
      REACT_LEGACY_HIDDEN_TYPE = Symbol.for("react.legacy_hidden"),
      REACT_MEMO_CACHE_SENTINEL = Symbol.for("react.memo_cache_sentinel"),
      REACT_POSTPONE_TYPE = Symbol.for("react.postpone"),
      MAYBE_ITERATOR_SYMBOL = Symbol.iterator,
      ASYNC_ITERATOR = Symbol.asyncIterator,
      SuspenseException$1 = Error(
        "Suspense Exception: This is not a real error! It's an implementation detail of `use` to interrupt the current render. You must either rethrow it immediately, or move the `use` call outside of the `try/catch` block. Capturing without rethrowing will lead to unexpected behavior.\n\nTo handle async errors, wrap your component in an error boundary, or call the promise's `.catch` method and pass the result to `use`."
      ),
      suspendedThenable$1 = null,
      currentRequest$1 = null,
      thenableIndexCounter$1 = 0,
      thenableState$1 = null,
      currentComponentDebugInfo = null,
      HooksDispatcher$1 = {
        useMemo: function (nextCreate) {
          return nextCreate();
        },
        useCallback: function (callback) {
          return callback;
        },
        useDebugValue: function () {},
        useDeferredValue: unsupportedHook,
        useTransition: unsupportedHook,
        readContext: unsupportedContext,
        useContext: unsupportedContext,
        useReducer: unsupportedHook,
        useRef: unsupportedHook,
        useState: unsupportedHook,
        useInsertionEffect: unsupportedHook,
        useLayoutEffect: unsupportedHook,
        useImperativeHandle: unsupportedHook,
        useEffect: unsupportedHook,
        useId: function () {
          if (null === currentRequest$1)
            throw Error("useId can only be used while React is rendering");
          var id = currentRequest$1.identifierCount++;
          return (
            ":" +
            currentRequest$1.identifierPrefix +
            "S" +
            id.toString(32) +
            ":"
          );
        },
        useSyncExternalStore: unsupportedHook,
        useCacheRefresh: function () {
          return unsupportedRefresh$1;
        },
        useMemoCache: function (size) {
          for (var data = Array(size), i = 0; i < size; i++)
            data[i] = REACT_MEMO_CACHE_SENTINEL;
          return data;
        },
        use: function (usable) {
          if (
            (null !== usable && "object" === typeof usable) ||
            "function" === typeof usable
          ) {
            if ("function" === typeof usable.then) {
              var index = thenableIndexCounter$1;
              thenableIndexCounter$1 += 1;
              null === thenableState$1 && (thenableState$1 = []);
              return trackUsedThenable$1(thenableState$1, usable, index);
            }
            usable.$$typeof === REACT_CONTEXT_TYPE && unsupportedContext();
          }
          if (isClientReference(usable)) {
            if (
              null != usable.value &&
              usable.value.$$typeof === REACT_CONTEXT_TYPE
            )
              throw Error(
                "Cannot read a Client Context from a Server Component."
              );
            throw Error("Cannot use() an already resolved Client Reference.");
          }
          throw Error(
            "An unsupported type was passed to use(): " + String(usable)
          );
        }
      },
      currentOwner = null,
      DefaultAsyncDispatcher$1 = {
        getCacheForType: function (resourceType) {
          var cache = (cache = currentRequest ? currentRequest : null)
            ? cache.cache
            : new Map();
          var entry = cache.get(resourceType);
          void 0 === entry &&
            ((entry = resourceType()), cache.set(resourceType, entry));
          return entry;
        }
      };
    DefaultAsyncDispatcher$1.getOwner = resolveOwner;
    var assign = Object.assign,
      disabledDepth = 0,
      prevLog,
      prevInfo,
      prevWarn,
      prevError,
      prevGroup,
      prevGroupCollapsed,
      prevGroupEnd;
    disabledLog.__reactDisabledLog = !0;
    var prefix,
      suffix,
      reentry = !1;
    var componentFrameCache = new (
      "function" === typeof WeakMap ? WeakMap : Map
    )();
    var callComponent$1 = {
        "react-stack-bottom-frame": function (
          Component,
          props,
          componentDebugInfo
        ) {
          currentOwner = componentDebugInfo;
          try {
            return Component(props, void 0);
          } finally {
            currentOwner = null;
          }
        }
      },
      callComponentInDEV$1 =
        callComponent$1["react-stack-bottom-frame"].bind(callComponent$1),
      callLazyInit$1 = {
        "react-stack-bottom-frame": function (lazy) {
          var init = lazy._init;
          return init(lazy._payload);
        }
      },
      callLazyInitInDEV$1 =
        callLazyInit$1["react-stack-bottom-frame"].bind(callLazyInit$1),
      callIterator = {
        "react-stack-bottom-frame": function (iterator, progress, error) {
          iterator.next().then(progress, error);
        }
      },
      callIteratorInDEV =
        callIterator["react-stack-bottom-frame"].bind(callIterator),
      isArrayImpl = Array.isArray,
      getPrototypeOf = Object.getPrototypeOf,
      jsxPropsParents = new WeakMap(),
      jsxChildrenParents = new WeakMap(),
      CLIENT_REFERENCE_TAG = Symbol.for("react.client.reference"),
      doNotLimit = new WeakSet();
    "object" === typeof console &&
      null !== console &&
      (patchConsole(console, "assert"),
      patchConsole(console, "debug"),
      patchConsole(console, "dir"),
      patchConsole(console, "dirxml"),
      patchConsole(console, "error"),
      patchConsole(console, "group"),
      patchConsole(console, "groupCollapsed"),
      patchConsole(console, "groupEnd"),
      patchConsole(console, "info"),
      patchConsole(console, "log"),
      patchConsole(console, "table"),
      patchConsole(console, "trace"),
      patchConsole(console, "warn"));
    var ObjectPrototype$1 = Object.prototype,
      stringify = JSON.stringify,
      PENDING$3 = 0,
      COMPLETED$1 = 1,
      ABORTED$1 = 3,
      ERRORED$2 = 4,
      RENDERING$1 = 5,
      OPENING$1 = 10,
      ABORTING$1 = 12,
      CLOSING$1 = 13,
      CLOSED$1 = 14,
      PRERENDER = 21,
      TaintRegistryObjects = ReactSharedInternalsServer.TaintRegistryObjects,
      TaintRegistryValues = ReactSharedInternalsServer.TaintRegistryValues,
      TaintRegistryByteLengths =
        ReactSharedInternalsServer.TaintRegistryByteLengths,
      TaintRegistryPendingRequests =
        ReactSharedInternalsServer.TaintRegistryPendingRequests,
      currentRequest = null,
      debugID = null,
      modelRoot = !1,
      emptyRoot = {},
      bind$1 = Function.prototype.bind,
      ObjectPrototype = Object.prototype,
      knownServerReferences = new WeakMap(),
      boundCache = new WeakMap(),
      fakeServerFunctionIdx = 0,
      FunctionBind = Function.prototype.bind,
      ArraySlice = Array.prototype.slice,
      REACT_CLIENT_REFERENCE = Symbol.for("react.client.reference"),
      ReactSharedInteralsServer =
        React.__SERVER_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,
      ReactSharedInternals =
        React.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE ||
        ReactSharedInteralsServer;
    ReactPromise.prototype = Object.create(Promise.prototype);
    ReactPromise.prototype.then = function (resolve, reject) {
      switch (this.status) {
        case "resolved_model":
          initializeModelChunk(this);
          break;
        case "resolved_module":
          initializeModuleChunk(this);
      }
      switch (this.status) {
        case "fulfilled":
          resolve(this.value);
          break;
        case "pending":
        case "blocked":
          resolve &&
            (null === this.value && (this.value = []),
            this.value.push(resolve));
          reject &&
            (null === this.reason && (this.reason = []),
            this.reason.push(reject));
          break;
        default:
          reject && reject(this.reason);
      }
    };
    var initializingHandler = null,
      supportsCreateTask = !!console.createTask,
      fakeFunctionCache = new Map(),
      fakeFunctionIdx = 0,
      createFakeJSXCallStack = {
        "react-stack-bottom-frame": function (
          response,
          stack,
          environmentName
        ) {
          return buildFakeCallStack(
            response,
            stack,
            environmentName,
            fakeJSXCallSite
          )();
        }
      },
      createFakeJSXCallStackInDEV = createFakeJSXCallStack[
        "react-stack-bottom-frame"
      ].bind(createFakeJSXCallStack),
      currentOwnerInDEV = null,
      replayConsoleWithCallStack = {
        "react-stack-bottom-frame": function (
          response,
          methodName,
          stackTrace,
          owner,
          env,
          args
        ) {
          var prevStack = ReactSharedInternals.getCurrentStack;
          ReactSharedInternals.getCurrentStack = getCurrentStackInDEV$1;
          currentOwnerInDEV = null === owner ? response._debugRootOwner : owner;
          try {
            var callStack = buildFakeCallStack(
              response,
              stackTrace,
              env,
              bindToConsole(methodName, args, env)
            );
            if (null != owner) {
              var task = initializeFakeTask(response, owner, env);
              initializeFakeStack(response, owner);
              if (null !== task) {
                task.run(callStack);
                return;
              }
            }
            var rootTask = getRootTask(response, env);
            null != rootTask ? rootTask.run(callStack) : callStack();
          } finally {
            (currentOwnerInDEV = null),
              (ReactSharedInternals.getCurrentStack = prevStack);
          }
        }
      },
      replayConsoleWithCallStackInDEV = replayConsoleWithCallStack[
        "react-stack-bottom-frame"
      ].bind(replayConsoleWithCallStack),
      hasOwnProperty = Object.prototype.hasOwnProperty,
      VALID_ATTRIBUTE_NAME_REGEX = RegExp(
        "^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"
      ),
      illegalAttributeNameCache = {},
      validatedAttributeNameCache = {},
      unitlessNumbers = new Set(
        "animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(
          " "
        )
      ),
      aliases = new Map([
        ["acceptCharset", "accept-charset"],
        ["htmlFor", "for"],
        ["httpEquiv", "http-equiv"],
        ["crossOrigin", "crossorigin"],
        ["accentHeight", "accent-height"],
        ["alignmentBaseline", "alignment-baseline"],
        ["arabicForm", "arabic-form"],
        ["baselineShift", "baseline-shift"],
        ["capHeight", "cap-height"],
        ["clipPath", "clip-path"],
        ["clipRule", "clip-rule"],
        ["colorInterpolation", "color-interpolation"],
        ["colorInterpolationFilters", "color-interpolation-filters"],
        ["colorProfile", "color-profile"],
        ["colorRendering", "color-rendering"],
        ["dominantBaseline", "dominant-baseline"],
        ["enableBackground", "enable-background"],
        ["fillOpacity", "fill-opacity"],
        ["fillRule", "fill-rule"],
        ["floodColor", "flood-color"],
        ["floodOpacity", "flood-opacity"],
        ["fontFamily", "font-family"],
        ["fontSize", "font-size"],
        ["fontSizeAdjust", "font-size-adjust"],
        ["fontStretch", "font-stretch"],
        ["fontStyle", "font-style"],
        ["fontVariant", "font-variant"],
        ["fontWeight", "font-weight"],
        ["glyphName", "glyph-name"],
        ["glyphOrientationHorizontal", "glyph-orientation-horizontal"],
        ["glyphOrientationVertical", "glyph-orientation-vertical"],
        ["horizAdvX", "horiz-adv-x"],
        ["horizOriginX", "horiz-origin-x"],
        ["imageRendering", "image-rendering"],
        ["letterSpacing", "letter-spacing"],
        ["lightingColor", "lighting-color"],
        ["markerEnd", "marker-end"],
        ["markerMid", "marker-mid"],
        ["markerStart", "marker-start"],
        ["overlinePosition", "overline-position"],
        ["overlineThickness", "overline-thickness"],
        ["paintOrder", "paint-order"],
        ["panose-1", "panose-1"],
        ["pointerEvents", "pointer-events"],
        ["renderingIntent", "rendering-intent"],
        ["shapeRendering", "shape-rendering"],
        ["stopColor", "stop-color"],
        ["stopOpacity", "stop-opacity"],
        ["strikethroughPosition", "strikethrough-position"],
        ["strikethroughThickness", "strikethrough-thickness"],
        ["strokeDasharray", "stroke-dasharray"],
        ["strokeDashoffset", "stroke-dashoffset"],
        ["strokeLinecap", "stroke-linecap"],
        ["strokeLinejoin", "stroke-linejoin"],
        ["strokeMiterlimit", "stroke-miterlimit"],
        ["strokeOpacity", "stroke-opacity"],
        ["strokeWidth", "stroke-width"],
        ["textAnchor", "text-anchor"],
        ["textDecoration", "text-decoration"],
        ["textRendering", "text-rendering"],
        ["transformOrigin", "transform-origin"],
        ["underlinePosition", "underline-position"],
        ["underlineThickness", "underline-thickness"],
        ["unicodeBidi", "unicode-bidi"],
        ["unicodeRange", "unicode-range"],
        ["unitsPerEm", "units-per-em"],
        ["vAlphabetic", "v-alphabetic"],
        ["vHanging", "v-hanging"],
        ["vIdeographic", "v-ideographic"],
        ["vMathematical", "v-mathematical"],
        ["vectorEffect", "vector-effect"],
        ["vertAdvY", "vert-adv-y"],
        ["vertOriginX", "vert-origin-x"],
        ["vertOriginY", "vert-origin-y"],
        ["wordSpacing", "word-spacing"],
        ["writingMode", "writing-mode"],
        ["xmlnsXlink", "xmlns:xlink"],
        ["xHeight", "x-height"]
      ]),
      hasReadOnlyValue = {
        button: !0,
        checkbox: !0,
        image: !0,
        hidden: !0,
        radio: !0,
        reset: !0,
        submit: !0
      },
      ariaProperties = {
        "aria-current": 0,
        "aria-description": 0,
        "aria-details": 0,
        "aria-disabled": 0,
        "aria-hidden": 0,
        "aria-invalid": 0,
        "aria-keyshortcuts": 0,
        "aria-label": 0,
        "aria-roledescription": 0,
        "aria-autocomplete": 0,
        "aria-checked": 0,
        "aria-expanded": 0,
        "aria-haspopup": 0,
        "aria-level": 0,
        "aria-modal": 0,
        "aria-multiline": 0,
        "aria-multiselectable": 0,
        "aria-orientation": 0,
        "aria-placeholder": 0,
        "aria-pressed": 0,
        "aria-readonly": 0,
        "aria-required": 0,
        "aria-selected": 0,
        "aria-sort": 0,
        "aria-valuemax": 0,
        "aria-valuemin": 0,
        "aria-valuenow": 0,
        "aria-valuetext": 0,
        "aria-atomic": 0,
        "aria-busy": 0,
        "aria-live": 0,
        "aria-relevant": 0,
        "aria-dropeffect": 0,
        "aria-grabbed": 0,
        "aria-activedescendant": 0,
        "aria-colcount": 0,
        "aria-colindex": 0,
        "aria-colspan": 0,
        "aria-controls": 0,
        "aria-describedby": 0,
        "aria-errormessage": 0,
        "aria-flowto": 0,
        "aria-labelledby": 0,
        "aria-owns": 0,
        "aria-posinset": 0,
        "aria-rowcount": 0,
        "aria-rowindex": 0,
        "aria-rowspan": 0,
        "aria-setsize": 0
      },
      warnedProperties$1 = {},
      rARIA$1 = RegExp(
        "^(aria)-[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"
      ),
      rARIACamel$1 = RegExp(
        "^(aria)[A-Z][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"
      ),
      didWarnValueNull = !1,
      possibleStandardNames = {
        accept: "accept",
        acceptcharset: "acceptCharset",
        "accept-charset": "acceptCharset",
        accesskey: "accessKey",
        action: "action",
        allowfullscreen: "allowFullScreen",
        alt: "alt",
        as: "as",
        async: "async",
        autocapitalize: "autoCapitalize",
        autocomplete: "autoComplete",
        autocorrect: "autoCorrect",
        autofocus: "autoFocus",
        autoplay: "autoPlay",
        autosave: "autoSave",
        capture: "capture",
        cellpadding: "cellPadding",
        cellspacing: "cellSpacing",
        challenge: "challenge",
        charset: "charSet",
        checked: "checked",
        children: "children",
        cite: "cite",
        class: "className",
        classid: "classID",
        classname: "className",
        cols: "cols",
        colspan: "colSpan",
        content: "content",
        contenteditable: "contentEditable",
        contextmenu: "contextMenu",
        controls: "controls",
        controlslist: "controlsList",
        coords: "coords",
        crossorigin: "crossOrigin",
        dangerouslysetinnerhtml: "dangerouslySetInnerHTML",
        data: "data",
        datetime: "dateTime",
        default: "default",
        defaultchecked: "defaultChecked",
        defaultvalue: "defaultValue",
        defer: "defer",
        dir: "dir",
        disabled: "disabled",
        disablepictureinpicture: "disablePictureInPicture",
        disableremoteplayback: "disableRemotePlayback",
        download: "download",
        draggable: "draggable",
        enctype: "encType",
        enterkeyhint: "enterKeyHint",
        fetchpriority: "fetchPriority",
        for: "htmlFor",
        form: "form",
        formmethod: "formMethod",
        formaction: "formAction",
        formenctype: "formEncType",
        formnovalidate: "formNoValidate",
        formtarget: "formTarget",
        frameborder: "frameBorder",
        headers: "headers",
        height: "height",
        hidden: "hidden",
        high: "high",
        href: "href",
        hreflang: "hrefLang",
        htmlfor: "htmlFor",
        httpequiv: "httpEquiv",
        "http-equiv": "httpEquiv",
        icon: "icon",
        id: "id",
        imagesizes: "imageSizes",
        imagesrcset: "imageSrcSet",
        inert: "inert",
        innerhtml: "innerHTML",
        inputmode: "inputMode",
        integrity: "integrity",
        is: "is",
        itemid: "itemID",
        itemprop: "itemProp",
        itemref: "itemRef",
        itemscope: "itemScope",
        itemtype: "itemType",
        keyparams: "keyParams",
        keytype: "keyType",
        kind: "kind",
        label: "label",
        lang: "lang",
        list: "list",
        loop: "loop",
        low: "low",
        manifest: "manifest",
        marginwidth: "marginWidth",
        marginheight: "marginHeight",
        max: "max",
        maxlength: "maxLength",
        media: "media",
        mediagroup: "mediaGroup",
        method: "method",
        min: "min",
        minlength: "minLength",
        multiple: "multiple",
        muted: "muted",
        name: "name",
        nomodule: "noModule",
        nonce: "nonce",
        novalidate: "noValidate",
        open: "open",
        optimum: "optimum",
        pattern: "pattern",
        placeholder: "placeholder",
        playsinline: "playsInline",
        poster: "poster",
        preload: "preload",
        profile: "profile",
        radiogroup: "radioGroup",
        readonly: "readOnly",
        referrerpolicy: "referrerPolicy",
        rel: "rel",
        required: "required",
        reversed: "reversed",
        role: "role",
        rows: "rows",
        rowspan: "rowSpan",
        sandbox: "sandbox",
        scope: "scope",
        scoped: "scoped",
        scrolling: "scrolling",
        seamless: "seamless",
        selected: "selected",
        shape: "shape",
        size: "size",
        sizes: "sizes",
        span: "span",
        spellcheck: "spellCheck",
        src: "src",
        srcdoc: "srcDoc",
        srclang: "srcLang",
        srcset: "srcSet",
        start: "start",
        step: "step",
        style: "style",
        summary: "summary",
        tabindex: "tabIndex",
        target: "target",
        title: "title",
        type: "type",
        usemap: "useMap",
        value: "value",
        width: "width",
        wmode: "wmode",
        wrap: "wrap",
        about: "about",
        accentheight: "accentHeight",
        "accent-height": "accentHeight",
        accumulate: "accumulate",
        additive: "additive",
        alignmentbaseline: "alignmentBaseline",
        "alignment-baseline": "alignmentBaseline",
        allowreorder: "allowReorder",
        alphabetic: "alphabetic",
        amplitude: "amplitude",
        arabicform: "arabicForm",
        "arabic-form": "arabicForm",
        ascent: "ascent",
        attributename: "attributeName",
        attributetype: "attributeType",
        autoreverse: "autoReverse",
        azimuth: "azimuth",
        basefrequency: "baseFrequency",
        baselineshift: "baselineShift",
        "baseline-shift": "baselineShift",
        baseprofile: "baseProfile",
        bbox: "bbox",
        begin: "begin",
        bias: "bias",
        by: "by",
        calcmode: "calcMode",
        capheight: "capHeight",
        "cap-height": "capHeight",
        clip: "clip",
        clippath: "clipPath",
        "clip-path": "clipPath",
        clippathunits: "clipPathUnits",
        cliprule: "clipRule",
        "clip-rule": "clipRule",
        color: "color",
        colorinterpolation: "colorInterpolation",
        "color-interpolation": "colorInterpolation",
        colorinterpolationfilters: "colorInterpolationFilters",
        "color-interpolation-filters": "colorInterpolationFilters",
        colorprofile: "colorProfile",
        "color-profile": "colorProfile",
        colorrendering: "colorRendering",
        "color-rendering": "colorRendering",
        contentscripttype: "contentScriptType",
        contentstyletype: "contentStyleType",
        cursor: "cursor",
        cx: "cx",
        cy: "cy",
        d: "d",
        datatype: "datatype",
        decelerate: "decelerate",
        descent: "descent",
        diffuseconstant: "diffuseConstant",
        direction: "direction",
        display: "display",
        divisor: "divisor",
        dominantbaseline: "dominantBaseline",
        "dominant-baseline": "dominantBaseline",
        dur: "dur",
        dx: "dx",
        dy: "dy",
        edgemode: "edgeMode",
        elevation: "elevation",
        enablebackground: "enableBackground",
        "enable-background": "enableBackground",
        end: "end",
        exponent: "exponent",
        externalresourcesrequired: "externalResourcesRequired",
        fill: "fill",
        fillopacity: "fillOpacity",
        "fill-opacity": "fillOpacity",
        fillrule: "fillRule",
        "fill-rule": "fillRule",
        filter: "filter",
        filterres: "filterRes",
        filterunits: "filterUnits",
        floodopacity: "floodOpacity",
        "flood-opacity": "floodOpacity",
        floodcolor: "floodColor",
        "flood-color": "floodColor",
        focusable: "focusable",
        fontfamily: "fontFamily",
        "font-family": "fontFamily",
        fontsize: "fontSize",
        "font-size": "fontSize",
        fontsizeadjust: "fontSizeAdjust",
        "font-size-adjust": "fontSizeAdjust",
        fontstretch: "fontStretch",
        "font-stretch": "fontStretch",
        fontstyle: "fontStyle",
        "font-style": "fontStyle",
        fontvariant: "fontVariant",
        "font-variant": "fontVariant",
        fontweight: "fontWeight",
        "font-weight": "fontWeight",
        format: "format",
        from: "from",
        fx: "fx",
        fy: "fy",
        g1: "g1",
        g2: "g2",
        glyphname: "glyphName",
        "glyph-name": "glyphName",
        glyphorientationhorizontal: "glyphOrientationHorizontal",
        "glyph-orientation-horizontal": "glyphOrientationHorizontal",
        glyphorientationvertical: "glyphOrientationVertical",
        "glyph-orientation-vertical": "glyphOrientationVertical",
        glyphref: "glyphRef",
        gradienttransform: "gradientTransform",
        gradientunits: "gradientUnits",
        hanging: "hanging",
        horizadvx: "horizAdvX",
        "horiz-adv-x": "horizAdvX",
        horizoriginx: "horizOriginX",
        "horiz-origin-x": "horizOriginX",
        ideographic: "ideographic",
        imagerendering: "imageRendering",
        "image-rendering": "imageRendering",
        in2: "in2",
        in: "in",
        inlist: "inlist",
        intercept: "intercept",
        k1: "k1",
        k2: "k2",
        k3: "k3",
        k4: "k4",
        k: "k",
        kernelmatrix: "kernelMatrix",
        kernelunitlength: "kernelUnitLength",
        kerning: "kerning",
        keypoints: "keyPoints",
        keysplines: "keySplines",
        keytimes: "keyTimes",
        lengthadjust: "lengthAdjust",
        letterspacing: "letterSpacing",
        "letter-spacing": "letterSpacing",
        lightingcolor: "lightingColor",
        "lighting-color": "lightingColor",
        limitingconeangle: "limitingConeAngle",
        local: "local",
        markerend: "markerEnd",
        "marker-end": "markerEnd",
        markerheight: "markerHeight",
        markermid: "markerMid",
        "marker-mid": "markerMid",
        markerstart: "markerStart",
        "marker-start": "markerStart",
        markerunits: "markerUnits",
        markerwidth: "markerWidth",
        mask: "mask",
        maskcontentunits: "maskContentUnits",
        maskunits: "maskUnits",
        mathematical: "mathematical",
        mode: "mode",
        numoctaves: "numOctaves",
        offset: "offset",
        opacity: "opacity",
        operator: "operator",
        order: "order",
        orient: "orient",
        orientation: "orientation",
        origin: "origin",
        overflow: "overflow",
        overlineposition: "overlinePosition",
        "overline-position": "overlinePosition",
        overlinethickness: "overlineThickness",
        "overline-thickness": "overlineThickness",
        paintorder: "paintOrder",
        "paint-order": "paintOrder",
        panose1: "panose1",
        "panose-1": "panose1",
        pathlength: "pathLength",
        patterncontentunits: "patternContentUnits",
        patterntransform: "patternTransform",
        patternunits: "patternUnits",
        pointerevents: "pointerEvents",
        "pointer-events": "pointerEvents",
        points: "points",
        pointsatx: "pointsAtX",
        pointsaty: "pointsAtY",
        pointsatz: "pointsAtZ",
        popover: "popover",
        popovertarget: "popoverTarget",
        popovertargetaction: "popoverTargetAction",
        prefix: "prefix",
        preservealpha: "preserveAlpha",
        preserveaspectratio: "preserveAspectRatio",
        primitiveunits: "primitiveUnits",
        property: "property",
        r: "r",
        radius: "radius",
        refx: "refX",
        refy: "refY",
        renderingintent: "renderingIntent",
        "rendering-intent": "renderingIntent",
        repeatcount: "repeatCount",
        repeatdur: "repeatDur",
        requiredextensions: "requiredExtensions",
        requiredfeatures: "requiredFeatures",
        resource: "resource",
        restart: "restart",
        result: "result",
        results: "results",
        rotate: "rotate",
        rx: "rx",
        ry: "ry",
        scale: "scale",
        security: "security",
        seed: "seed",
        shaperendering: "shapeRendering",
        "shape-rendering": "shapeRendering",
        slope: "slope",
        spacing: "spacing",
        specularconstant: "specularConstant",
        specularexponent: "specularExponent",
        speed: "speed",
        spreadmethod: "spreadMethod",
        startoffset: "startOffset",
        stddeviation: "stdDeviation",
        stemh: "stemh",
        stemv: "stemv",
        stitchtiles: "stitchTiles",
        stopcolor: "stopColor",
        "stop-color": "stopColor",
        stopopacity: "stopOpacity",
        "stop-opacity": "stopOpacity",
        strikethroughposition: "strikethroughPosition",
        "strikethrough-position": "strikethroughPosition",
        strikethroughthickness: "strikethroughThickness",
        "strikethrough-thickness": "strikethroughThickness",
        string: "string",
        stroke: "stroke",
        strokedasharray: "strokeDasharray",
        "stroke-dasharray": "strokeDasharray",
        strokedashoffset: "strokeDashoffset",
        "stroke-dashoffset": "strokeDashoffset",
        strokelinecap: "strokeLinecap",
        "stroke-linecap": "strokeLinecap",
        strokelinejoin: "strokeLinejoin",
        "stroke-linejoin": "strokeLinejoin",
        strokemiterlimit: "strokeMiterlimit",
        "stroke-miterlimit": "strokeMiterlimit",
        strokewidth: "strokeWidth",
        "stroke-width": "strokeWidth",
        strokeopacity: "strokeOpacity",
        "stroke-opacity": "strokeOpacity",
        suppresscontenteditablewarning: "suppressContentEditableWarning",
        suppresshydrationwarning: "suppressHydrationWarning",
        surfacescale: "surfaceScale",
        systemlanguage: "systemLanguage",
        tablevalues: "tableValues",
        targetx: "targetX",
        targety: "targetY",
        textanchor: "textAnchor",
        "text-anchor": "textAnchor",
        textdecoration: "textDecoration",
        "text-decoration": "textDecoration",
        textlength: "textLength",
        textrendering: "textRendering",
        "text-rendering": "textRendering",
        to: "to",
        transform: "transform",
        transformorigin: "transformOrigin",
        "transform-origin": "transformOrigin",
        typeof: "typeof",
        u1: "u1",
        u2: "u2",
        underlineposition: "underlinePosition",
        "underline-position": "underlinePosition",
        underlinethickness: "underlineThickness",
        "underline-thickness": "underlineThickness",
        unicode: "unicode",
        unicodebidi: "unicodeBidi",
        "unicode-bidi": "unicodeBidi",
        unicoderange: "unicodeRange",
        "unicode-range": "unicodeRange",
        unitsperem: "unitsPerEm",
        "units-per-em": "unitsPerEm",
        unselectable: "unselectable",
        valphabetic: "vAlphabetic",
        "v-alphabetic": "vAlphabetic",
        values: "values",
        vectoreffect: "vectorEffect",
        "vector-effect": "vectorEffect",
        version: "version",
        vertadvy: "vertAdvY",
        "vert-adv-y": "vertAdvY",
        vertoriginx: "vertOriginX",
        "vert-origin-x": "vertOriginX",
        vertoriginy: "vertOriginY",
        "vert-origin-y": "vertOriginY",
        vhanging: "vHanging",
        "v-hanging": "vHanging",
        videographic: "vIdeographic",
        "v-ideographic": "vIdeographic",
        viewbox: "viewBox",
        viewtarget: "viewTarget",
        visibility: "visibility",
        vmathematical: "vMathematical",
        "v-mathematical": "vMathematical",
        vocab: "vocab",
        widths: "widths",
        wordspacing: "wordSpacing",
        "word-spacing": "wordSpacing",
        writingmode: "writingMode",
        "writing-mode": "writingMode",
        x1: "x1",
        x2: "x2",
        x: "x",
        xchannelselector: "xChannelSelector",
        xheight: "xHeight",
        "x-height": "xHeight",
        xlinkactuate: "xlinkActuate",
        "xlink:actuate": "xlinkActuate",
        xlinkarcrole: "xlinkArcrole",
        "xlink:arcrole": "xlinkArcrole",
        xlinkhref: "xlinkHref",
        "xlink:href": "xlinkHref",
        xlinkrole: "xlinkRole",
        "xlink:role": "xlinkRole",
        xlinkshow: "xlinkShow",
        "xlink:show": "xlinkShow",
        xlinktitle: "xlinkTitle",
        "xlink:title": "xlinkTitle",
        xlinktype: "xlinkType",
        "xlink:type": "xlinkType",
        xmlbase: "xmlBase",
        "xml:base": "xmlBase",
        xmllang: "xmlLang",
        "xml:lang": "xmlLang",
        xmlns: "xmlns",
        "xml:space": "xmlSpace",
        xmlnsxlink: "xmlnsXlink",
        "xmlns:xlink": "xmlnsXlink",
        xmlspace: "xmlSpace",
        y1: "y1",
        y2: "y2",
        y: "y",
        ychannelselector: "yChannelSelector",
        z: "z",
        zoomandpan: "zoomAndPan"
      },
      warnedProperties = {},
      EVENT_NAME_REGEX = /^on./,
      INVALID_EVENT_NAME_REGEX = /^on[^A-Z]/,
      rARIA = RegExp(
        "^(aria)-[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"
      ),
      rARIACamel = RegExp(
        "^(aria)[A-Z][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"
      ),
      badVendoredStyleNamePattern = /^(?:webkit|moz|o)[A-Z]/,
      msPattern$1 = /^-ms-/,
      hyphenPattern = /-(.)/g,
      badStyleValueWithSemicolonPattern = /;\s*$/,
      warnedStyleNames = {},
      warnedStyleValues = {},
      warnedForNaNValue = !1,
      warnedForInfinityValue = !1,
      matchHtmlRegExp = /["'&<>]/,
      uppercasePattern = /([A-Z])/g,
      msPattern = /^ms-/,
      isJavaScriptProtocol =
        /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i,
      NotPending = Object.freeze({
        pending: !1,
        data: null,
        method: null,
        action: null
      }),
      PRELOAD_NO_CREDS = [];
    Object.freeze(PRELOAD_NO_CREDS);
    var scriptRegex = /(<\/|<)(s)(cript)/gi;
    var didWarnForNewBooleanPropsWithEmptyValue = {};
    var styleNameCache = new Map(),
      styleAttributeStart = ' style="',
      styleAssign = ":",
      styleSeparator = ";",
      attributeSeparator = " ",
      attributeAssign = '="',
      attributeEnd = '"',
      attributeEmptyString = '=""',
      actionJavaScriptURL = escapeTextForBrowser(
        "javascript:throw new Error('React form unexpectedly submitted.')"
      ),
      endOfStartTag = ">",
      endOfStartTagSelfClosing = "/>",
      didWarnDefaultInputValue = !1,
      didWarnDefaultChecked = !1,
      didWarnDefaultSelectValue = !1,
      didWarnDefaultTextareaValue = !1,
      didWarnInvalidOptionChildren = !1,
      didWarnInvalidOptionInnerHTML = !1,
      didWarnSelectedSetOnOption = !1,
      didWarnFormActionType = !1,
      didWarnFormActionName = !1,
      didWarnFormActionTarget = !1,
      didWarnFormActionMethod = !1,
      formReplayingRuntimeScript =
        'addEventListener("submit",function(a){if(!a.defaultPrevented){var c=a.target,d=a.submitter,e=c.action,b=d;if(d){var f=d.getAttribute("formAction");null!=f&&(e=f,b=null)}"javascript:throw new Error(\'React form unexpectedly submitted.\')"===e&&(a.preventDefault(),b?(a=document.createElement("input"),a.name=b.name,a.value=b.value,b.parentNode.insertBefore(a,b),b=new FormData(c),a.parentNode.removeChild(a)):b=new FormData(c),a=c.ownerDocument||c,(a.$$reactFormReplay=a.$$reactFormReplay||[]).push(c,d,b))}});',
      styleRegex = /(<\/|<)(s)(tyle)/gi,
      leadingNewline = "\n",
      VALID_TAG_REGEX = /^[a-zA-Z][a-zA-Z:_\.\-\d]*$/,
      validatedTagCache = new Map(),
      doctypeChunk = "<!DOCTYPE html>",
      endTagCache = new Map(),
      regexForJSStringsInInstructionScripts = /[<\u2028\u2029]/g,
      regexForJSStringsInScripts = /[&><\u2028\u2029]/g,
      currentlyRenderingBoundaryHasStylesToHoist = !1,
      destinationHasCapacity = !0,
      stylesheetFlushingQueue = [],
      spaceSeparator = " ",
      arrayFirstOpenBracket = "[",
      arraySubsequentOpenBracket = ",[",
      arrayInterstitial = ",",
      arrayCloseBracket = "]",
      PENDING$1 = 0,
      PRELOADED = 1,
      PREAMBLE = 2,
      LATE = 3,
      regexForHrefInLinkHeaderURLContext = /[<>\r\n]/g,
      regexForLinkHeaderQuotedParamValueContext = /["';,\r\n]/g,
      emptyContextObject = {};
    Object.freeze(emptyContextObject);
    var rendererSigil = {};
    var currentActiveSnapshot = null,
      didWarnAboutNoopUpdateForComponent = {},
      didWarnAboutDeprecatedWillMount = {};
    var didWarnAboutUninitializedState = new Set();
    var didWarnAboutGetSnapshotBeforeUpdateWithoutDidUpdate = new Set();
    var didWarnAboutLegacyLifecyclesAndDerivedState = new Set();
    var didWarnAboutDirectlyAssigningPropsToState = new Set();
    var didWarnAboutUndefinedDerivedState = new Set();
    var didWarnAboutContextTypes$1 = new Set();
    var didWarnAboutChildContextTypes = new Set();
    var didWarnAboutInvalidateContextType = new Set();
    var didWarnOnInvalidCallback = new Set();
    var classComponentUpdater = {
        isMounted: function () {
          return !1;
        },
        enqueueSetState: function (inst, payload, callback) {
          var internals = inst._reactInternals;
          null === internals.queue
            ? warnNoop(inst, "setState")
            : (internals.queue.push(payload),
              void 0 !== callback &&
                null !== callback &&
                warnOnInvalidCallback(callback));
        },
        enqueueReplaceState: function (inst, payload, callback) {
          inst = inst._reactInternals;
          inst.replace = !0;
          inst.queue = [payload];
          void 0 !== callback &&
            null !== callback &&
            warnOnInvalidCallback(callback);
        },
        enqueueForceUpdate: function (inst, callback) {
          null === inst._reactInternals.queue
            ? warnNoop(inst, "forceUpdate")
            : void 0 !== callback &&
              null !== callback &&
              warnOnInvalidCallback(callback);
        }
      },
      emptyTreeContext = { id: 1, overflow: "" },
      clz32 = Math.clz32 ? Math.clz32 : clz32Fallback,
      log = Math.log,
      LN2 = Math.LN2,
      SuspenseException = Error(
        "Suspense Exception: This is not a real error! It's an implementation detail of `use` to interrupt the current render. You must either rethrow it immediately, or move the `use` call outside of the `try/catch` block. Capturing without rethrowing will lead to unexpected behavior.\n\nTo handle async errors, wrap your component in an error boundary, or call the promise's `.catch` method and pass the result to `use`."
      ),
      suspendedThenable = null,
      objectIs = "function" === typeof Object.is ? Object.is : is,
      currentlyRenderingComponent = null,
      currentlyRenderingTask = null,
      currentlyRenderingRequest = null,
      currentlyRenderingKeyPath = null,
      firstWorkInProgressHook = null,
      workInProgressHook = null,
      didScheduleRenderPhaseUpdate = !1,
      localIdCounter = 0,
      actionStateCounter = 0,
      actionStateMatchingIndex = -1,
      thenableIndexCounter = 0,
      thenableState = null,
      numberOfReRenders = 0,
      isInHookUserCodeInDev = !1,
      currentHookNameInDev,
      HooksDispatcher = {
        readContext: readContext,
        use: function (usable) {
          if (null !== usable && "object" === typeof usable) {
            if ("function" === typeof usable.then)
              return unwrapThenable(usable);
            if (usable.$$typeof === REACT_CONTEXT_TYPE)
              return readContext(usable);
          }
          throw Error(
            "An unsupported type was passed to use(): " + String(usable)
          );
        },
        useContext: function (context) {
          currentHookNameInDev = "useContext";
          resolveCurrentlyRenderingComponent();
          return context._currentValue2;
        },
        useMemo: useMemo,
        useReducer: clientHookNotSupported,
        useRef: clientHookNotSupported,
        useState: clientHookNotSupported,
        useInsertionEffect: clientHookNotSupported,
        useLayoutEffect: clientHookNotSupported,
        useCallback: function (callback, deps) {
          return useMemo(function () {
            return callback;
          }, deps);
        },
        useImperativeHandle: clientHookNotSupported,
        useEffect: clientHookNotSupported,
        useDebugValue: function () {},
        useDeferredValue: clientHookNotSupported,
        useTransition: clientHookNotSupported,
        useId: function () {
          var treeId = currentlyRenderingTask.treeContext;
          var overflow = treeId.overflow;
          treeId = treeId.id;
          treeId =
            (treeId & ~(1 << (32 - clz32(treeId) - 1))).toString(32) + overflow;
          var resumableState = currentResumableState;
          if (null === resumableState)
            throw Error(
              "Invalid hook call. Hooks can only be called inside of the body of a function component."
            );
          overflow = localIdCounter++;
          treeId = ":" + resumableState.idPrefix + "R" + treeId;
          0 < overflow && (treeId += "H" + overflow.toString(32));
          return treeId + ":";
        },
        useSyncExternalStore: clientHookNotSupported,
        useCacheRefresh: function () {
          return unsupportedRefresh;
        },
        useEffectEvent: function () {
          return throwOnUseEffectEventCall;
        },
        useMemoCache: function (size) {
          for (var data = Array(size), i = 0; i < size; i++)
            data[i] = REACT_MEMO_CACHE_SENTINEL;
          return data;
        },
        useHostTransitionStatus: function () {
          resolveCurrentlyRenderingComponent();
          return NotPending;
        },
        useOptimistic: function (passthrough) {
          resolveCurrentlyRenderingComponent();
          return [passthrough, unsupportedSetOptimisticState];
        }
      };
    HooksDispatcher.useFormState = useActionState;
    HooksDispatcher.useActionState = useActionState;
    var currentResumableState = null,
      currentTaskInDEV = null,
      DefaultAsyncDispatcher = {
        getCacheForType: function () {
          throw Error("Not implemented.");
        },
        getOwner: function () {
          return null === currentTaskInDEV
            ? null
            : currentTaskInDEV.componentStack;
        }
      },
      callComponent = {
        "react-stack-bottom-frame": function (Component, props, secondArg) {
          return Component(props, secondArg);
        }
      },
      callComponentInDEV =
        callComponent["react-stack-bottom-frame"].bind(callComponent),
      callRender = {
        "react-stack-bottom-frame": function (instance) {
          return instance.render();
        }
      },
      callRenderInDEV = callRender["react-stack-bottom-frame"].bind(callRender),
      callLazyInit = {
        "react-stack-bottom-frame": function (lazy) {
          var init = lazy._init;
          return init(lazy._payload);
        }
      },
      callLazyInitInDEV =
        callLazyInit["react-stack-bottom-frame"].bind(callLazyInit),
      didWarnAboutBadClass = {},
      didWarnAboutContextTypes = {},
      didWarnAboutContextTypeOnFunctionComponent = {},
      didWarnAboutGetDerivedStateOnFunctionComponent = {},
      didWarnAboutReassigningProps = !1,
      didWarnAboutGenerators = !1,
      didWarnAboutMaps = !1;
    exports.experimental_renderToHTML = function (children, options) {
      return new Promise(function (resolve, reject) {
        var buffer$jscomp$0 = "",
          stashErrorIdx = 1,
          stashedErrors = new Map(),
          flightRequest = new RequestInstance$1(
            20,
            children,
            null,
            function (error) {
              var id = "" + stashErrorIdx++;
              stashedErrors.set(id, error);
              return id;
            },
            options ? options.identifierPrefix : void 0,
            void 0,
            void 0,
            "Markup",
            void 0,
            noop$3,
            noop$3
          ),
          flightResponse = new ResponseInstance(
            null,
            null,
            null,
            noServerCallOrFormAction,
            noServerCallOrFormAction,
            void 0,
            void 0,
            void 0,
            !1,
            void 0
          ),
          resumableState = createResumableState(
            options ? options.identifierPrefix : void 0,
            void 0
          ),
          root = getChunk(flightResponse, 0),
          fizzRequest = createRequest(
            root,
            resumableState,
            createRenderState(
              resumableState,
              void 0,
              void 0,
              void 0,
              void 0,
              void 0
            ),
            createFormatContext(0, null, 0),
            Infinity,
            function (error, errorInfo) {
              if ("object" === typeof error && null !== error) {
                var id = error.digest;
                "string" === typeof id &&
                  stashedErrors.has(id) &&
                  (error = stashedErrors.get(id));
              }
              reject(error);
              if ((id = options && options.onError)) {
                var prevGetCurrentStackImpl =
                  ReactSharedInternalsServer.getCurrentStack;
                ReactSharedInternalsServer.getCurrentStack =
                  ReactSharedInternals$1.getCurrentStack;
                try {
                  id(error, errorInfo);
                } finally {
                  ReactSharedInternalsServer.getCurrentStack =
                    prevGetCurrentStackImpl;
                }
              }
            },
            void 0,
            void 0,
            void 0,
            void 0,
            void 0,
            void 0
          );
        if (options && options.signal) {
          var signal = options.signal;
          if (signal.aborted)
            abort$1(flightRequest, signal.reason),
              abort(fizzRequest, signal.reason);
          else {
            var listener = function () {
              abort$1(flightRequest, signal.reason);
              abort(fizzRequest, signal.reason);
              signal.removeEventListener("abort", listener);
            };
            signal.addEventListener("abort", listener);
          }
        }
        startWork$1(flightRequest);
        startFlowing$1(flightRequest, {
          push: function (chunk) {
            if (null !== chunk) {
              for (
                var i = 0,
                  rowState = flightResponse._rowState,
                  rowID = flightResponse._rowID,
                  rowTag = flightResponse._rowTag,
                  rowLength = flightResponse._rowLength,
                  buffer = flightResponse._buffer,
                  chunkLength = chunk.length;
                i < chunkLength;

              ) {
                var lastIdx = -1;
                switch (rowState) {
                  case 0:
                    lastIdx = chunk.charCodeAt(i++);
                    58 === lastIdx
                      ? (rowState = 1)
                      : (rowID =
                          (rowID << 4) |
                          (96 < lastIdx ? lastIdx - 87 : lastIdx - 48));
                    continue;
                  case 1:
                    rowState = chunk.charCodeAt(i);
                    84 === rowState ||
                    65 === rowState ||
                    79 === rowState ||
                    111 === rowState ||
                    85 === rowState ||
                    83 === rowState ||
                    115 === rowState ||
                    76 === rowState ||
                    108 === rowState ||
                    71 === rowState ||
                    103 === rowState ||
                    77 === rowState ||
                    109 === rowState ||
                    86 === rowState
                      ? ((rowTag = rowState), (rowState = 2), i++)
                      : (64 < rowState && 91 > rowState) ||
                          114 === rowState ||
                          120 === rowState
                        ? ((rowTag = rowState), (rowState = 3), i++)
                        : ((rowTag = 0), (rowState = 3));
                    continue;
                  case 2:
                    lastIdx = chunk.charCodeAt(i++);
                    44 === lastIdx
                      ? (rowState = 4)
                      : (rowLength =
                          (rowLength << 4) |
                          (96 < lastIdx ? lastIdx - 87 : lastIdx - 48));
                    continue;
                  case 3:
                    lastIdx = chunk.indexOf("\n", i);
                    break;
                  case 4:
                    if (84 !== rowTag)
                      throw Error(
                        "Binary RSC chunks cannot be encoded as strings. This is a bug in the wiring of the React streams."
                      );
                    if (
                      rowLength < chunk.length ||
                      chunk.length > 3 * rowLength
                    )
                      throw Error(
                        "String chunks need to be passed in their original shape. Not split into smaller string chunks. This is a bug in the wiring of the React streams."
                      );
                    lastIdx = chunk.length;
                }
                if (-1 < lastIdx) {
                  if (0 < buffer.length)
                    throw Error(
                      "String chunks need to be passed in their original shape. Not split into smaller string chunks. This is a bug in the wiring of the React streams."
                    );
                  i = chunk.slice(i, lastIdx);
                  processFullStringRow(flightResponse, rowID, rowTag, i);
                  i = lastIdx;
                  3 === rowState && i++;
                  rowLength = rowID = rowTag = rowState = 0;
                  buffer.length = 0;
                } else if (chunk.length !== i)
                  throw Error(
                    "String chunks need to be passed in their original shape. Not split into smaller string chunks. This is a bug in the wiring of the React streams."
                  );
              }
              flightResponse._rowState = rowState;
              flightResponse._rowID = rowID;
              flightResponse._rowTag = rowTag;
              flightResponse._rowLength = rowLength;
            } else
              reportGlobalError(flightResponse, Error("Connection closed."));
            return !0;
          },
          destroy: function (error) {
            abort(fizzRequest, error);
            reject(error);
          }
        });
        startWork(fizzRequest);
        startFlowing(fizzRequest, {
          push: function (chunk) {
            null !== chunk
              ? (buffer$jscomp$0 += chunk)
              : resolve(buffer$jscomp$0);
            return !0;
          },
          destroy: function (error) {
            abort$1(flightRequest, error);
            reject(error);
          }
        });
      });
    };
    exports.version = "19.0.0-experimental-c11c9510-20241120";
  })();
