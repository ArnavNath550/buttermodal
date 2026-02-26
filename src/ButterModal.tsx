import React from 'react';
import BaseModal, { BaseModalProps, ButterModalTheme } from './BaseModal';

export type {
  ButterModalTheme,
  ModalState,
  ModalStep,
  BaseModalProps,
} from './BaseModal';

export interface ButterModalProps extends BaseModalProps {}

export function ButterModal(props: ButterModalProps) {
  return <BaseModal {...props} />;
}
