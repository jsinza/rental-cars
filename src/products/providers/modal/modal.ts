import { Injectable, Injector, InjectionToken } from '@angular/core';
import { ComponentPortal, PortalInjector, ComponentType } from '@angular/cdk/portal';
import { Overlay, OverlayConfig, OverlayRef } from '@angular/cdk/overlay';
import { ESCAPE } from '@angular/cdk/keycodes';
import { NEVER, merge } from 'rxjs';
import { filter } from 'rxjs/operators';

import { ModalRef } from './modal.ref';

export const AM_MODAL_DATA = new InjectionToken('AmModalData');

export interface AmModalOptions extends OverlayConfig {
  closeOnEscKey?: boolean;
  closeOnBackdropClick?: boolean;
}

@Injectable()
export class Modal {
  private modalOpen = false;

  constructor(private overlay: Overlay, private injector: Injector) {}

  isModalOpen() {
    return this.modalOpen;
  }

  private createOverlay(options: AmModalOptions): OverlayRef {
    const positionStrategy = this.overlay
      .position()
      .global()
      .centerHorizontally()
      .centerVertically();
    const scrollStrategy = this.overlay.scrollStrategies.noop();
    return this.overlay.create({
      positionStrategy,
      scrollStrategy,
      ...options,
    });
  }


  private createPortalInjector<T>(
    modalRef: ModalRef<T>,
    componentData: Record<string, any> | null,
  ): PortalInjector {
    const tokens = new WeakMap();
    tokens.set(ModalRef, modalRef);
    tokens.set(AM_MODAL_DATA, componentData);
    return new PortalInjector(this.injector, tokens);
  }

  private addOverlayCloseSubscriptions<T>(
    overlayRef: OverlayRef,
    modalRef: ModalRef<T>,
    options: AmModalOptions,
  ) {
    overlayRef.detachments().subscribe(() => {
      this.modalOpen = false;
    });

    const backdropClickEvents = options.closeOnBackdropClick
      ? overlayRef.backdropClick()
      : NEVER;

    const keydownEvents = options.closeOnEscKey
      ? overlayRef.keydownEvents().pipe(filter(keyEvent => keyEvent.keyCode === ESCAPE))
      : NEVER;

    merge(backdropClickEvents, keydownEvents).subscribe(() => {
      modalRef.close();
    });
  }

  private createPortal<T>(
    modalRef: ModalRef<T>,
    component: ComponentType<T>,
    componentData: Record<string, any> | null,
  ) {
    const portalInjector = this.createPortalInjector(modalRef, componentData);
    return new ComponentPortal<T>(component, null, portalInjector);
  }
  open<T>(
    component: ComponentType<T>,
    componentData: Record<string, any> | null,
    options: AmModalOptions,
  ): ModalRef<T> {
    if (this.modalOpen) {
      throw new Error('A modal instance is already open!');
    }

    const overlayRef = this.createOverlay(options);
    const modalRef = new ModalRef<T>(overlayRef);
    const modalPortal = this.createPortal(modalRef, component, componentData);
    this.addOverlayCloseSubscriptions(overlayRef, modalRef, options);
    const componentRef = overlayRef.attach(modalPortal);
    modalRef.componentInstance = componentRef.instance;

    this.modalOpen = true;
    return modalRef;
  }
}
