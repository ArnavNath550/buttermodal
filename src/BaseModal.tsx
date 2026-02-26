import * as React from 'react';
import styled from 'styled-components';

import * as Dialog from '@radix-ui/react-dialog';

const BaseModal: React.FC = () => {
  return (
    <Dialog.Root>
      <Dialog.Trigger>trigger</Dialog.Trigger>
      <Dialog.Portal>
        <StyledOverlay />
        <StyledContent>content</StyledContent>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default BaseModal;

const StyledBaseModal = styled.div`
  background-color: ${({ theme }) => theme.background};
  max-width: 450px;
  height: 350px;
  width: 100%;
  padding: 13px;
  border-radius: 10px;
  color: ${({ theme }) => theme.text};
  border: 1px solid ${({ theme }) => theme.border};
`;

const StyledOverlay = styled.div`
  background-color: var(--black-a9);
  position: fixed;
  inset: 0;
  animation: overlayShow 150ms cubic-bezier(0.16, 1, 0.3, 1);
`;

const StyledContent = styled.div`
  background-color: ${({ theme }) => theme.background};
  border-radius: 15px;
  border: 1px solid ${({ theme }) => theme.border};
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 90vw;
  max-width: 500px;
  max-height: 85vh;
  padding: 15px;
  animation: contentShow 150ms cubic-bezier(0.16, 1, 0.3, 1);
  &:focus {
    outline: none;
  }
`;
