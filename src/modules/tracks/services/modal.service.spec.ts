import { TestBed } from '@angular/core/testing';

import { ModalService } from './modal.service';

describe('ModalService', () => {
  let service: ModalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ModalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should start with null state', () => {
    expect(service.modalState()).toBeNull();
  });

  it('should open with default values when options are not provided', () => {
    service.open({});
    const state = service.modalState();

    expect(state).toEqual({
      title: 'Informação',
      message: '',
      type: 'info',
      dismissible: true,
      actions: [
        { label: 'Fechar', variant: 'primary', dismiss: true }
      ]
    });
  });

  it('should merge actions applying default values of variant and dismiss when absent', () => {
    service.open({
      message: 'Teste',
      actions: [
        { label: 'OK' },
        { label: 'Cancelar', variant: 'secondary' },
        { label: 'Fechar', dismiss: false }
      ]
    });

    const state = service.modalState();
    expect(state?.actions).toEqual([
      { label: 'OK', variant: 'primary', dismiss: true },
      { label: 'Cancelar', variant: 'secondary', dismiss: true },
      { label: 'Fechar', variant: 'primary', dismiss: false }
    ]);
  });

  it('should respect all custom options and not overwrite provided values', () => {
    service.open({
      title: 'Aviso',
      message: 'Algo aconteceu',
      type: 'error',
      dismissible: false,
      actions: [
        { label: 'Entendi', variant: 'secondary', dismiss: false }
      ]
    });

    const state = service.modalState();
    expect(state).toEqual({
      title: 'Aviso',
      message: 'Algo aconteceu',
      type: 'error',
      dismissible: false,
      actions: [
        { label: 'Entendi', variant: 'secondary', dismiss: false }
      ]
    });
  });

  it('should close and reset the state to null', () => {
    service.open({ message: 'Teste' });
    expect(service.modalState()).not.toBeNull();

    service.close();
    expect(service.modalState()).toBeNull();
  });
});


