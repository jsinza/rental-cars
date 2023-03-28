import { OverlayRef, OverlaySizeConfig } from '@angular/cdk/overlay';
import { Observable, Subject } from 'rxjs';

export class ModalRef<T, R = any> {
  private _onClose = new Subject<R>();

  componentInstance: T | null = null;

  constructor(private overlay: OverlayRef) { }

  onClose(): Observable<R> {
    return this._onClose;
  }

  close(data?: R) {
    this.overlay.dispose();
    if (data) {
      this._onClose.next(data);
    }
  }

  resize(resizeConfig: OverlaySizeConfig) {
    this.overlay.updateSize(resizeConfig);
    this.overlay.updatePosition();
  }
}
