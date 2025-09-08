export type ModalVariant = 'primary' | 'secondary' | 'success' | 'danger' | 'warning';

export type ModalType = 'info' | 'success' | 'error' | 'warning';

export interface ModalAction {
  label: string;
  variant?: ModalVariant;
  dismiss?: boolean;
  onClick?: () => void;
  icon?: string;
}

export interface ModalOptions {
  title?: string;
  message?: string;
  type?: ModalType;
  actions?: ModalAction[];
  dismissible?: boolean;
}


