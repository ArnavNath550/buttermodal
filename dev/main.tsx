import React, { useState } from 'react';
import './index.css';
import { ButterModal } from '../src';
import { createRoot } from 'react-dom/client';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { Code } from './components/Code';

const fadeUpVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.97 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      delay: i * 0.15,
      type: 'spring',
      stiffness: 300,
      damping: 22,
      mass: 0.9,
      duration: 0.5,
    },
  }),
};

const SHARED_TRANSITION = {
  type: 'spring',
  stiffness: 500,
  damping: 40,
  mass: 0.3,
};

function FadeUp({
  children,
  index,
}: {
  children: React.ReactNode;
  index: number;
}) {
  return (
    <motion.div
      custom={index}
      initial="hidden"
      animate="visible"
      variants={fadeUpVariants}
    >
      {children}
    </motion.div>
  );
}

function Demo() {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState('default');

  const handleClose = () => {
    setOpen(false);
    setStep('default');
  };

  const states = [
    {
      key: 'default',
      content: (
        <StyledModalContent>
          <StyledModalText>Welcome to ButterModal</StyledModalText>
          <StyledModalDescription>
            A smoothly animated modal
          </StyledModalDescription>
          <StyledModalFooter>
            <motion.div
              layoutId="nav-btn"
              transition={SHARED_TRANSITION}
              style={{ width: '100%', maxWidth: 200 }}
            >
              <StyledButton
                onClick={() => setStep('height')}
                style={{ width: '100%' }}
              >
                Next
              </StyledButton>
            </motion.div>
          </StyledModalFooter>
        </StyledModalContent>
      ),
    },
    {
      key: 'height',
      content: (
        <StyledModalContent>
          <StyledModalText>I love animated heights</StyledModalText>
          <StyledModalDescription>
            Upon content change, the modal will dynamically (very smoothly)
            animate its height.. can you see the transition?
          </StyledModalDescription>
          <StyledModalFooter>
            <StyledButton onClick={() => setStep('default')} variant="unstyled">
              Back
            </StyledButton>
            <motion.div
              layoutId="nav-btn"
              transition={SHARED_TRANSITION}
              style={{ width: '100%', maxWidth: 200 }}
            >
              <StyledButton
                onClick={() => setStep('paragraph')}
                style={{ width: '100%' }}
              >
                Next
              </StyledButton>
            </motion.div>
          </StyledModalFooter>
        </StyledModalContent>
      ),
    },
    {
      key: 'paragraph',
      content: (
        <StyledModalContent>
          <StyledModalText>I really love animated heights</StyledModalText>
          <StyledModalDescription>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </StyledModalDescription>
          <StyledModalFooter>
            <StyledButton onClick={() => setStep('height')} variant="unstyled">
              Back
            </StyledButton>
            <motion.div
              layoutId="nav-btn"
              transition={SHARED_TRANSITION}
              style={{ width: '100%', maxWidth: 200 }}
            >
              <StyledButton
                onClick={() => setStep('success')}
                style={{ width: '100%' }}
              >
                Next
              </StyledButton>
            </motion.div>
          </StyledModalFooter>
        </StyledModalContent>
      ),
    },
    {
      key: 'success',
      content: (
        <StyledModalContent>
          <StyledModalText>
            A pleasent scale-in, <br /> and scale-out transition
          </StyledModalText>
          <StyledModalDescription>
            Each step transitions with a subtle (spring) scale and fade -
            content scales from 95% {'->'} 100% as it enters, and back down as
            it exits.
          </StyledModalDescription>
          <StyledModalFooter>
            <StyledButton
              onClick={() => setStep('paragraph')}
              variant="unstyled"
            >
              Back
            </StyledButton>
            <motion.div
              layoutId="nav-btn"
              transition={SHARED_TRANSITION}
              style={{ width: '100%', maxWidth: 200 }}
            >
              <StyledButton onClick={() => handleClose()} variant="primary">
                Close
              </StyledButton>
            </motion.div>
          </StyledModalFooter>
        </StyledModalContent>
      ),
    },
  ];

  const renderButterModalText = () => '<ButterModal />';

  const renderButterModalComponentCode = () => `
    <ButterModal
      states={states}
      step={step}
      onStepChange={setStep}
      initialStep="default"
      open={open}
      onOpenChange={setOpen}
      theme={{
        background: '#ffffff',
        border: 'transparent',
        text: '#111111',
        overlay: '#000000',
      }}
      containerStyle={{
        padding: 12,
      }}
      contentStyle={{
        borderRadius: 20,
      }}
    >
      {({ step, setStep, close }) => (
        <div>
          <button onClick={close}>Done</button>
        </div>
      )}
    </ButterModal>
    `;

  return (
    <StyledContainer>
      <FadeUp index={0}>
        <StyledHeader>
          <StyledImage src="public/images/butterlogo.svg" />
        </StyledHeader>
      </FadeUp>

      <FadeUp index={1}>
        <StyledContent
          style={{ display: 'flex', flexDirection: 'column', gap: 12 }}
        >
          <StyledCodePreview>{renderButterModalText()}</StyledCodePreview>
          ButterModal is a multi-step modal component for React with smooth
          spring animations. Built on top of Radix UI's Dialog primitive and
          Framer Motion.
        </StyledContent>
      </FadeUp>

      <FadeUp index={2}>
        <StyledPreviewBox>
          <StyledButton onClick={() => setOpen(true)}>Open Modal</StyledButton>
          <ButterModal
            states={states}
            step={step}
            onStepChange={setStep}
            initialStep="default"
            open={open}
            onOpenChange={setOpen}
            theme={{
              background: '#ffffff',
              border: 'transparent',
              text: '#111111',
              overlay: '#000000',
            }}
            containerStyle={{ padding: 12 }}
            contentStyle={{ borderRadius: 20 }}
          />
        </StyledPreviewBox>
      </FadeUp>

      <FadeUp index={3}>
        <StyledHeading>Getting Started</StyledHeading>
      </FadeUp>

      <FadeUp index={4}>
        <Code>npm i buttermodal</Code>
      </FadeUp>

      <FadeUp index={5}>
        <StyledContent>
          Define your modal steps as an array of{' '}
          <StyledInlineCode>ModalState</StyledInlineCode> objects — each with a
          unique <StyledInlineCode>key</StyledInlineCode> and a{' '}
          <StyledInlineCode>content</StyledInlineCode> node. Pass this array to
          the <StyledInlineCode>states</StyledInlineCode> prop along with your
          open state and step state. ButterModal will automatically animate
          between content frames as the step changes, smoothly resizing the
          modal container to fit the new content height.
        </StyledContent>
      </FadeUp>

      <FadeUp index={6}>
        <Code>{renderButterModalComponentCode()}</Code>
      </FadeUp>

      <FadeUp index={7}>
        <StyledContent>
          The <StyledInlineCode>children</StyledInlineCode> render prop gives
          you access to the current <StyledInlineCode>step</StyledInlineCode>, a{' '}
          <StyledInlineCode>setStep</StyledInlineCode> function, and a{' '}
          <StyledInlineCode>close</StyledInlineCode> function. Use this to
          render navigation controls — like Back, Next, and Done buttons — that
          live outside your step content and persist across transitions.
        </StyledContent>
      </FadeUp>

      <FadeUp index={9}>
        <StyledHeading>Props</StyledHeading>
      </FadeUp>

      <FadeUp index={10}>
        <StyledPropsContainer>
          {[
            ['states', 'ModalState[]'],
            ['initialStep', 'ModalStep'],
            ['step', 'ModalStep'],
            ['onStepChange', '(step: ModalStep) => void'],
            ['open', 'boolean'],
            ['onOpenChange', '(open: boolean) => void'],
            ['trigger', 'React.ReactNode'],
            ['overlayStyle', 'React.CSSProperties'],
            ['contentStyle', 'React.CSSProperties'],
            ['containerStyle', 'React.CSSProperties'],
            ['theme', 'ButterModalTheme'],
            ['children', '({ step, setStep, close }) => React.ReactNode'],
          ].map(([key, value], i) => (
            <motion.div
              key={key}
              custom={i}
              initial="hidden"
              animate="visible"
              variants={{
                hidden: { opacity: 0, y: 10 },
                visible: (i: number) => ({
                  opacity: 1,
                  y: 0,
                  transition: {
                    delay: 0.7 + i * 0.045,
                    type: 'spring',
                    stiffness: 280,
                    damping: 24,
                  },
                }),
              }}
            >
              <StyledPropItem>
                <StyledPropKey>{key}</StyledPropKey>
                <StyledPropValue>{value}</StyledPropValue>
              </StyledPropItem>
            </motion.div>
          ))}
        </StyledPropsContainer>
      </FadeUp>

      <FadeUp index={11}>
        <StyledFooter>
          More Love for the web from{' '}
          <UnstyledLink href="https://arnavshome.vercel.app">
            <MadeBy>Arnav Nath</MadeBy>
          </UnstyledLink>
        </StyledFooter>
      </FadeUp>
    </StyledContainer>
  );
}

createRoot(document.getElementById('root')!).render(<Demo />);

const StyledContainer = styled.div`
  max-width: 550px;
  width: 100%;
  margin: 0 auto;
  padding: 0 16px;
  box-sizing: border-box;
`;

const StyledImage = styled.img`
  width: 80px;
`;

const StyledHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: 1.5rem;
  padding-bottom: 1.5rem;
`;

const StyledPreviewBox = styled.div`
  width: 100%;
  height: 25rem;
  background: var(--surface);
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: 480px) {
    height: 18rem;
  }
`;

const StyledButton = styled(motion.button)<{ variant?: string }>`
  max-width: 200px;
  width: 100%;
  padding: 13px;
  border-radius: 999px;
  font-family: var(--font);
  background: ${(props) =>
    props.variant === 'unstyled' ? 'var(--surface)' : 'var(--primary)'};
  border: 1px solid
    ${(props) =>
      props.variant === 'unstyled' ? 'var(--surface)' : 'var(--primary)'};
  color: ${(props) => (props.variant === 'unstyled' ? 'var(--text)' : '#fff')};
  font-size: 1rem;
  font-weight: 500;

  &:active {
    scale: 0.97;
    background: ${(props) =>
      props.variant === 'unstyled'
        ? 'var(--surfaceHover)'
        : 'var(--primaryActive)'};
  }
  &:hover {
    background: ${(props) =>
      props.variant === 'unstyled'
        ? 'var(--surfaceHover)'
        : 'var(--primaryHover)'};
  }
  transition: 0.2s ease all;

  @media (max-width: 480px) {
    font-size: 0.9rem;
    padding: 11px 16px;
  }
`;

const StyledContent = styled.div`
  width: 100%;
  color: var(--text);
  font-size: 0.875rem;
  font-weight: 450;
  line-height: 1.25rem;
  letter-spacing: -0.00563rem;
  padding-top: 15px;
  padding-bottom: 15px;
  font-feature-settings: 'kern', 'frac', 'kern', 'ss02';
  margin: 0;
  letter-spacing: -0.2px;
  gap: 12px;
  line-height: 22px;

  @media (max-width: 480px) {
    font-size: 0.825rem;
    line-height: 20px;
  }
`;

const StyledInlineCode = styled.code`
  background: var(--surface);
  padding: 2px 6px;
  border-radius: 5px;
  font-family: var(--monospace-font);
  font-size: 0.8rem;
  color: var(--text);
`;

const StyledCodePreview = styled.pre`
  background: var(--surface);
  padding: 10px;
  border-radius: 15px;
  width: max-content;
  max-width: 100%;
  color: var(--text);
  font-weight: 500;
  font-family: var(--font);
  overflow-x: auto;
`;

const StyledHeading = styled.h1`
  font-size: 1.3rem;
  font-weight: 480;
  padding-top: 20px;
  padding-bottom: 20px;

  @media (max-width: 480px) {
    font-size: 1.1rem;
  }
`;

const StyledPropsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const StyledPropItem = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  border-bottom: 1px solid var(--border);
  padding-bottom: 13px;
  gap: 12px;

  @media (max-width: 480px) {
    flex-direction: column;
    gap: 4px;
  }
`;

const StyledPropKey = styled.div`
  font-size: 0.8rem;
  color: var(--text);
  font-weight: 500;
  font-family: var(--monospace-font);
  flex-shrink: 0;
`;

const StyledPropValue = styled.div`
  font-size: 0.8rem;
  color: var(--info);
  font-weight: 400;
  font-family: var(--monospace-font);
  text-align: right;
  word-break: break-word;

  @media (max-width: 480px) {
    text-align: left;
  }
`;

const StyledFooter = styled.div`
  width: 100%;
  padding: 5rem 1rem;
  text-align: center;
  font-size: 0.9rem;
  color: var(--info);
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 8px;
  flex-wrap: wrap;

  @media (max-width: 480px) {
    font-size: 0.8rem;
    padding: 3rem 1rem;
  }
`;

const MadeBy = styled.div`
  padding: 8px;
  border-radius: 999px;
  background: var(--surface);
  color: var(--text);
  font-weight: 450;
  width: max-content;

  &:hover {
    background: var(--surfaceHover);
    scale: 1.1;
  }

  &:active {
    scale: 1.01;
  }

  transition: ease 0.1s all;
  cursor: pointer;
`;

const StyledModalContent = styled(motion.div)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  flex-direction: column;
  gap: 10px;
  padding-top: 15px;
  padding-bottom: 15px;
`;

const StyledModalText = styled(motion.div)`
  font-size: 1.2rem;
  color: var(--text);
  font-weight: 500;
  text-align: center;
  padding-left: 12px;
  padding-right: 12px;
`;

const StyledModalDescription = styled(motion.div)`
  font-size: 1rem;
  color: var(--info);
  text-align: center;
  padding-left: 12px;
  padding-right: 12px;
  line-height: 25px;
`;

const StyledModalFooter = styled(motion.div)`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 15px;
`;

const UnstyledLink = styled.a`
  text-decoration: none;
  color: inherit;
`;
