"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var index_exports = {};
__export(index_exports, {
  ButterModal: () => ButterModal
});
module.exports = __toCommonJS(index_exports);

// src/ButterModal.tsx
var import_react2 = __toESM(require("react"));

// src/BaseModal.tsx
var React = __toESM(require("react"));
var import_styled_components = __toESM(require("styled-components"));
var Dialog = __toESM(require("@radix-ui/react-dialog"));
var import_framer_motion = require("framer-motion");

// src/helpers/useMeasure.ts
var import_react = require("react");
function useMeasure() {
  const [node, setNode] = (0, import_react.useState)(null);
  const [size, setSize] = (0, import_react.useState)({ width: 0, height: 0 });
  const ref = (0, import_react.useCallback)((el) => {
    setNode(el);
  }, []);
  (0, import_react.useEffect)(() => {
    if (!node) return;
    const update = () => {
      setSize({
        width: node.scrollWidth,
        height: node.scrollHeight
      });
    };
    update();
    const resizeObserver = new ResizeObserver(update);
    resizeObserver.observe(node);
    return () => resizeObserver.disconnect();
  }, [node]);
  return [ref, size];
}

// src/BaseModal.tsx
var BaseModal = ({
  states,
  initialStep,
  step,
  onStepChange,
  open,
  onOpenChange,
  trigger,
  overlayStyle,
  contentStyle,
  containerStyle,
  theme,
  children
}) => {
  var _a, _b, _c, _d;
  const firstKey = (_b = (_a = states[0]) == null ? void 0 : _a.key) != null ? _b : "default";
  const isStepControlled = step !== void 0;
  const [internalStep, setInternalStep] = React.useState(
    initialStep != null ? initialStep : firstKey
  );
  const currentStep = isStepControlled ? step : internalStep;
  const handleStepChange = (next) => {
    if (!isStepControlled) setInternalStep(next);
    onStepChange == null ? void 0 : onStepChange(next);
  };
  const isOpenControlled = open !== void 0;
  const [internalOpen, setInternalOpen] = React.useState(false);
  const currentOpen = isOpenControlled ? open : internalOpen;
  const [portalMounted, setPortalMounted] = React.useState(false);
  const [isAnimatingStep, setIsAnimatingStep] = React.useState(false);
  const prevStepRef = React.useRef(currentStep);
  const handleOpenChange = (val) => {
    if (!val) {
      if (!isStepControlled) setInternalStep("");
      onStepChange == null ? void 0 : onStepChange("");
    }
    if (!isOpenControlled) setInternalOpen(val);
    onOpenChange == null ? void 0 : onOpenChange(val);
  };
  React.useEffect(() => {
    if (currentOpen) {
      setPortalMounted(true);
    }
  }, [currentOpen]);
  React.useEffect(() => {
    if (prevStepRef.current !== currentStep) {
      prevStepRef.current = currentStep;
      setIsAnimatingStep(true);
    }
  }, [currentStep]);
  const handleExitComplete = () => {
    if (!currentOpen) {
      setPortalMounted(false);
    }
    setIsAnimatingStep(false);
  };
  const [ref, bounds] = useMeasure();
  const activeContent = (_d = (_c = states.find((s) => s.key === currentStep)) == null ? void 0 : _c.content) != null ? _d : null;
  const close = () => handleOpenChange(false);
  return /* @__PURE__ */ React.createElement(Dialog.Root, { open: currentOpen, onOpenChange: handleOpenChange }, trigger !== void 0 ? /* @__PURE__ */ React.createElement(Dialog.Trigger, { asChild: true }, trigger) : null, portalMounted && /* @__PURE__ */ React.createElement(Dialog.Portal, { forceMount: true }, /* @__PURE__ */ React.createElement(import_framer_motion.AnimatePresence, { onExitComplete: handleExitComplete }, currentOpen && /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(
    StyledOverlay,
    {
      $theme: theme,
      style: overlayStyle,
      onClick: () => handleOpenChange(false),
      initial: { opacity: 0 },
      animate: { opacity: 0.2 },
      exit: { opacity: 0 },
      transition: { type: "spring", bounce: 0, duration: 0.3 }
    }
  ), /* @__PURE__ */ React.createElement(StyledContentAlign, null, /* @__PURE__ */ React.createElement(
    StyledContent,
    {
      $theme: theme,
      style: contentStyle,
      initial: { opacity: 0, scale: 0.95 },
      animate: { opacity: 1, scale: 1 },
      exit: { opacity: 0, scale: 0.95 },
      transition: { type: "spring", bounce: 0, duration: 0.3 }
    },
    /* @__PURE__ */ React.createElement(
      import_framer_motion.motion.div,
      {
        animate: {
          height: isAnimatingStep && bounds.height > 0 ? bounds.height : "auto"
        },
        transition: {
          type: "tween",
          ease: [0.25, 0.1, 0.25, 1],
          duration: 0.01
        },
        style: { overflow: "hidden" }
      },
      /* @__PURE__ */ React.createElement("div", { ref, style: containerStyle }, /* @__PURE__ */ React.createElement(
        import_framer_motion.AnimatePresence,
        {
          mode: "popLayout",
          initial: false,
          onExitComplete: () => setIsAnimatingStep(false)
        },
        /* @__PURE__ */ React.createElement(
          import_framer_motion.motion.div,
          {
            key: currentStep,
            initial: { opacity: 0, scale: 0.95 },
            animate: { opacity: 1, scale: 1 },
            exit: { opacity: 0, scale: 0.95 },
            transition: {
              type: "spring",
              bounce: 0,
              duration: 0.3
            }
          },
          activeContent
        )
      ), children == null ? void 0 : children({
        step: currentStep,
        setStep: handleStepChange,
        close
      }))
    )
  ))))));
};
var BaseModal_default = BaseModal;
var StyledOverlay = (0, import_styled_components.default)(import_framer_motion.motion.div)`
  background-color: ${({ $theme }) => {
  var _a;
  return (_a = $theme == null ? void 0 : $theme.overlay) != null ? _a : "#0d0d0d";
}};
  position: fixed;
  inset: 0;
`;
var StyledContentAlign = import_styled_components.default.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 15px;
  &:focus {
    outline: none;
  }
  overflow: hidden;
`;
var StyledContent = (0, import_styled_components.default)(import_framer_motion.motion.div)`
  background-color: ${({ $theme }) => {
  var _a;
  return (_a = $theme == null ? void 0 : $theme.background) != null ? _a : "#fff";
}};
  color: ${({ $theme }) => {
  var _a;
  return (_a = $theme == null ? void 0 : $theme.text) != null ? _a : "#0d0d0d";
}};
  border: 1px solid ${({ $theme }) => {
  var _a;
  return (_a = $theme == null ? void 0 : $theme.border) != null ? _a : "#d2d2d2";
}};
  border-radius: 15px;
  width: 90vw;
  max-width: 400px;
  overflow: hidden;
  will-change: height;
`;

// src/ButterModal.tsx
function ButterModal(props) {
  return /* @__PURE__ */ import_react2.default.createElement(BaseModal_default, __spreadValues({}, props));
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ButterModal
});
