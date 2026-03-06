import * as React from 'react';
import styled from 'styled-components';
import * as Dialog from '@radix-ui/react-dialog';
import { AnimatePresence, motion } from 'framer-motion';
import { useState, useEffect, useCallback } from 'react';

export function useMeasure<T extends HTMLElement>() {
  const [node, setNode] = useState<T | null>(null);
  const [size, setSize] = useState({ width: 0, height: 0 });

  const ref = useCallback((el: T | null) => {
    setNode(el);
  }, []);

  useEffect(() => {
    if (!node) return;

    const update = () => {
      const rect = node.getBoundingClientRect();
      setSize({
        width: rect.width,
        height: rect.height,
      });
    };

    update();

    const resizeObserver = new ResizeObserver(update);
    resizeObserver.observe(node);

    return () => resizeObserver.disconnect();
  }, [node]);

  return [ref, size] as const;
}

export type ModalStep = string;

export interface ModalState {
  key: ModalStep;
  content: React.ReactNode;
}

export interface ButterModalTheme {
  background?: string;
  border?: string;
  text?: string;
  overlay?: string;
}

export interface BaseModalProps {
  states: ModalState[];
  initialStep?: ModalStep;
  step?: ModalStep;
  onStepChange?: (step: ModalStep) => void;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  trigger?: React.ReactNode;
  overlayStyle?: React.CSSProperties;
  contentStyle?: React.CSSProperties;
  containerStyle?: React.CSSProperties;
  theme?: ButterModalTheme;
  children?: (props: {
    step: ModalStep;
    setStep: (step: ModalStep) => void;
    close: () => void;
  }) => React.ReactNode;
}

const BaseModal: React.FC<BaseModalProps> = ({
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
  children,
}) => {
  const firstKey = states[0]?.key ?? 'default';
  const defaultStep = initialStep ?? firstKey;

  const isStepControlled = step !== undefined;
  const [internalStep, setInternalStep] =
    React.useState<ModalStep>(defaultStep);
  const currentStep = isStepControlled ? step! : internalStep;

  const handleStepChange = (next: ModalStep) => {
    if (!isStepControlled) setInternalStep(next);
    onStepChange?.(next);
  };

  const isOpenControlled = open !== undefined;
  const [internalOpen, setInternalOpen] = React.useState(false);
  const currentOpen = isOpenControlled ? open! : internalOpen;

  const [portalMounted, setPortalMounted] = React.useState(false);

  const handleOpenChange = (val: boolean) => {
    if (!isOpenControlled) setInternalOpen(val);
    onOpenChange?.(val);

    if (!val) {
      setTimeout(() => {
        if (!isStepControlled) setInternalStep(defaultStep);
        onStepChange?.(defaultStep);
      }, 300);
    }
  };

  React.useEffect(() => {
    if (currentOpen) {
      setPortalMounted(true);
    }
  }, [currentOpen]);

  const [ref, bounds] = useMeasure();
  const activeContent =
    states.find((s) => s.key === currentStep)?.content ?? null;
  const close = () => handleOpenChange(false);

  return (
    <Dialog.Root open={currentOpen} onOpenChange={handleOpenChange}>
      {trigger !== undefined && (
        <Dialog.Trigger asChild>{trigger}</Dialog.Trigger>
      )}
      {portalMounted && (
        <Dialog.Portal forceMount>
          <AnimatePresence
            onExitComplete={() => !currentOpen && setPortalMounted(false)}
          >
            {currentOpen && (
              <>
                <StyledOverlay
                  $theme={theme}
                  style={overlayStyle}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.2 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                />
                <StyledContentAlign>
                  <StyledContent
                    $theme={theme}
                    style={contentStyle}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{
                      opacity: 1,
                      scale: 1,
                      height: bounds.height > 0 ? bounds.height : 'auto',
                    }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{
                      height: { type: 'spring', bounce: 0, duration: 0.4 },
                      opacity: { duration: 0.2 },
                      scale: { duration: 0.2 },
                    }}
                  >
                    <div
                      ref={ref}
                      style={{ ...containerStyle, display: 'flow-root' }}
                    >
                      <AnimatePresence mode="popLayout" initial={false}>
                        <motion.div
                          key={currentStep}
                          initial={{ opacity: 0, scale: 0.98 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.98 }}
                          transition={{ duration: 0.2 }}
                        >
                          {activeContent}
                          {children?.({
                            step: currentStep,
                            setStep: handleStepChange,
                            close,
                          })}
                        </motion.div>
                      </AnimatePresence>
                    </div>
                  </StyledContent>
                </StyledContentAlign>
              </>
            )}
          </AnimatePresence>
        </Dialog.Portal>
      )}
    </Dialog.Root>
  );
};

export default BaseModal;

const StyledOverlay = styled(motion.div)<{ $theme?: ButterModalTheme }>`
  background-color: ${({ $theme }) => $theme?.overlay ?? '#0d0d0d'};
  position: fixed;
  inset: 0;
  z-index: 100;
`;

const StyledContentAlign = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 101;
  &:focus {
    outline: none;
  }
`;

const StyledContent = styled(motion.div)<{ $theme?: ButterModalTheme }>`
  background-color: ${({ $theme }) => $theme?.background ?? '#fff'};
  color: ${({ $theme }) => $theme?.text ?? '#0d0d0d'};
  border: 1px solid ${({ $theme }) => $theme?.border ?? '#d2d2d2'};
  border-radius: 20px;
  width: 90vw;
  max-width: 400px;
  overflow: hidden;
  will-change: height, transform;
`;
