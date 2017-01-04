import { Component} from '@angular/core';
import 'rxjs/add/operator/map';

@Component({
  selector: 'loading',
  templateUrl: 'loading.html'
})

export class LoadingComponent {
  public visible: boolean;
  constructor() {

  }

  public show() {
    this.visible = true;

  }

  public hide() {
    this.visible = false;
  }
}
