import { Component, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalService } from '../../../tracks/services/modal.service';
import { ModalAction } from './modal.types';
  
@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss'
})
export class ModalComponent{
  private readonly modalService = inject(ModalService);

  state = this.modalService.modalState;
  isOpen = computed(() => !!this.state());

  onCloseClick() {
    this.modalService.close();
  }

  onActionClick(action: ModalAction) {
    if (action?.onClick) {
      action.onClick();
    }
    if (action?.dismiss !== false) {
      this.modalService.close();
    }
  }

}


