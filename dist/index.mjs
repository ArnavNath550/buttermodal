var __defProp = Object.defineProperty;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
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

// src/ButterModal.tsx
import React2 from "react";

// src/BaseModal.tsx
import * as React from "react";
import styled from "styled-components";
import * as Dialog from "@radix-ui/react-dialog";
import { AnimatePresence, motion } from "framer-motion";

// src/helpers/useMeasure.ts
import { useState, useEffect, useCallback } from "react";
function useMeasure() {
  const [node, setNode] = useState(null);
  const [size, setSize] = useState({ width: 0, height: 0 });
  const ref = useCallback((el) => {
    setNode(el);
  }, []);
  useEffect(() => {
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
  const handleOpenChange = (val) => {
    if (!isOpenControlled) setInternalOpen(val);
    onOpenChange == null ? void 0 : onOpenChange(val);
  };
  const [ref, bounds] = useMeasure();
  const activeContent = (_d = (_c = states.find((s) => s.key === currentStep)) == null ? void 0 : _c.content) != null ? _d : null;
  const close = () => handleOpenChange(false);
  return /* @__PURE__ */ React.createElement(Dialog.Root, { open: currentOpen, onOpenChange: handleOpenChange }, trigger !== void 0 ? /* @__PURE__ */ React.createElement(Dialog.Trigger, { asChild: true }, trigger) : null, /* @__PURE__ */ React.createElement(Dialog.Portal, null, /* @__PURE__ */ React.createElement(
    StyledOverlay,
    {
      $theme: theme,
      style: overlayStyle,
      onClick: () => handleOpenChange(false)
    }
  ), /* @__PURE__ */ React.createElement(StyledContentAlign, null, /* @__PURE__ */ React.createElement(AnimatePresence, null, currentOpen && /* @__PURE__ */ React.createElement(
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
      motion.div,
      {
        animate: {
          height: bounds.height > 0 ? bounds.height : "auto"
        },
        transition: { type: "spring", bounce: 0, duration: 0.3 },
        style: { overflow: "hidden" }
      },
      /* @__PURE__ */ React.createElement("div", { ref, style: containerStyle }, /* @__PURE__ */ React.createElement(AnimatePresence, { mode: "popLayout", initial: false }, /* @__PURE__ */ React.createElement(
        motion.div,
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
      )), children == null ? void 0 : children({
        step: currentStep,
        setStep: handleStepChange,
        close
      }))
    )
  )))));
};
var BaseModal_default = BaseModal;
var StyledOverlay = styled.div`
  background-color: ${({ $theme }) => {
  var _a;
  return (_a = $theme == null ? void 0 : $theme.overlay) != null ? _a : "#0d0d0d";
}};
  opacity: 0.2;
  position: fixed;
  inset: 0;
  animation: overlayShow 150ms cubic-bezier(0.16, 1, 0.3, 1);
`;
var StyledContentAlign = styled.div`
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
var StyledContent = styled(motion.div)`
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
  return /* @__PURE__ */ React2.createElement(BaseModal_default, __spreadValues({}, props));
}
export {
  ButterModal
};
