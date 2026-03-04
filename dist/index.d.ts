import * as React from 'react';
import React__default from 'react';

type ModalStep = string;
interface ModalState {
    key: ModalStep;
    content: React.ReactNode;
}
interface ButterModalTheme {
    background?: string;
    border?: string;
    text?: string;
    overlay?: string;
}
interface BaseModalProps {
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

interface ButterModalProps extends BaseModalProps {
}
declare function ButterModal(props: ButterModalProps): React__default.JSX.Element;

export { ButterModal };
