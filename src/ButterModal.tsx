import React from 'react';
import { ThemeProvider } from 'styled-components';
import { lightTheme } from './theme/theme';
import BaseModal from './BaseModal';

export function ButterModal() {
  return (
    <ThemeProvider theme={lightTheme}>
      <BaseModal />
    </ThemeProvider>
  );
}
