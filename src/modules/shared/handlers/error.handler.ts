import { HttpErrorResponse } from "@angular/common/http";
import { ErrorHandler, inject, Injectable, NgZone } from "@angular/core";
import { ModalService } from "../../tracks/services/modal.service";

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {

  private readonly modalService = inject(ModalService);
  private readonly zone = inject(NgZone);

  handleError(error: any) {
    if (!(error instanceof HttpErrorResponse)) {
      error = error.rejection;
    }
    this.zone.run(() =>
      this.modalService.open(
        {
          title: 'Erro',
          message: 'Erro ao carregar os dados. Verfique o log para mais detalhes.',
          type: 'error',
          actions: [
            { label: 'Fechar', variant: 'primary', dismiss: true }
          ]
        }
      )
    );

    console.error('Error from global error handler', error);
  }
}