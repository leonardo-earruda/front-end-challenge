import { Injectable, signal } from '@angular/core';
import { ModalAction, ModalOptions } from '../../shared/components/modal/modal.types';

@Injectable({ providedIn: 'root' })
export class ModalService {
  private readonly _modalState = signal<ModalOptions | null>(null);
  readonly modalState = this._modalState.asReadonly();

  open(options: ModalOptions) {
    const normalized: ModalOptions = {
      title: options.title ?? 'Informação',
      message: options.message ?? '',
      type: options.type ?? 'info',
      dismissible: options.dismissible ?? true,
      actions: this.ensureActions(options.actions)
    };
    this._modalState.set(normalized);
  }

  close() {
    this._modalState.set(null);
  }

  private ensureActions(actions?: ModalAction[]): ModalAction[] {
    if (actions && actions.length > 0) {
      return actions.map(a => ({ dismiss: true, variant: 'primary', ...a }));
    }
    return [{ label: 'Fechar', variant: 'primary', dismiss: true }];
  }
}


