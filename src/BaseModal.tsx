import * as React from 'react';
import styled from 'styled-components';
import * as Dialog from '@radix-ui/react-dialog';
import { AnimatePresence, motion } from 'framer-motion';
import { useMeasure } from './helpers/useMeasure';

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
  const [internalStep, setInternalStep] = React.useState<ModalStep>(
    initialStep ?? firstKey,
  );
  const [internalOpen, setInternalOpen] = React.useState(false);

  const isOpenControlled = open !== undefined;
  const currentOpen = isOpenControlled ? open! : internalOpen;
  const handleOpenChange = (val: boolean) => {
    if (!isOpenControlled) setInternalOpen(val);
    onOpenChange?.(val);
  };

  const [ref, bounds] = useMeasure();
  const activeContent =
    states.find((s) => s.key === internalStep)?.content ?? null;
  const close = () => handleOpenChange(false);

  return (
    <Dialog.Root open={currentOpen} onOpenChange={handleOpenChange}>
      {trigger !== undefined ? (
        <Dialog.Trigger asChild>{trigger}</Dialog.Trigger>
      ) : null}
      <Dialog.Portal>
        <StyledOverlay
          $theme={theme}
          style={overlayStyle}
          onClick={() => handleOpenChange(false)}
        />
        <StyledContentAlign>
          <AnimatePresence>
            {currentOpen && (
              <StyledContent
                $theme={theme}
                style={contentStyle}
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ type: 'spring', bounce: 0, duration: 0.3 }}
              >
                <motion.div
                  animate={{
                    height: bounds.height > 0 ? bounds.height : 'auto',
                  }}
                  transition={{ type: 'spring', bounce: 0, duration: 0.3 }}
                  style={{ overflow: 'hidden' }}
                >
                  <div ref={ref} style={containerStyle}>
                    <AnimatePresence mode="popLayout" initial={false}>
                      <motion.div
                        key={internalStep}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{
                          type: 'spring',
                          bounce: 0,
                          duration: 0.3,
                        }}
                      >
                        {activeContent}
                      </motion.div>
                    </AnimatePresence>
                    {children?.({
                      step: internalStep,
                      setStep: setInternalStep,
                      close,
                    })}
                  </div>
                </motion.div>
              </StyledContent>
            )}
          </AnimatePresence>
        </StyledContentAlign>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default BaseModal;

const StyledOverlay = styled.div<{ $theme?: ButterModalTheme }>`
  background-color: ${({ $theme }) => $theme?.overlay ?? '#0d0d0d'};
  opacity: 0.2;
  position: fixed;
  inset: 0;
  animation: overlayShow 150ms cubic-bezier(0.16, 1, 0.3, 1);
`;

const StyledContentAlign = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 15px;
  &:focus {
    outline: none;
  }
`;

const StyledContent = styled(motion.div)<{ $theme?: ButterModalTheme }>`
  background-color: ${({ $theme }) => $theme?.background ?? '#fff'};
  color: ${({ $theme }) => $theme?.text ?? '#0d0d0d'};
  border: 1px solid ${({ $theme }) => $theme?.border ?? '#d2d2d2'};
  border-radius: 15px;
  width: 90vw;
  max-width: 400px;
  max-height: 85vh;
  padding: 12.5px;
`;
