import {
  Compiler,
  Component,
  Injector,
  ViewChild,
  NgModule,
  NgModuleRef,
  ViewContainerRef,
  AfterViewInit,
  Input
} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dynamic-template',
  template: `<ng-container #vc></ng-container>`,
  styleUrls: ['./dynamic-template.component.css']
})
export class DynamicTemplateComponent implements AfterViewInit {
  @ViewChild('vc', { read: ViewContainerRef })
  vc;
  @Input() tmplt;
  constructor(
    private _compiler: Compiler,
    private _injector: Injector,
    private _m: NgModuleRef<any>
  ) {}

  ngAfterViewInit() {
    let templateUrl = `http://abrasive-mitten.surge.sh/`;
    templateUrl += this.tmplt;
    const tmpCmp = Component({
      moduleId: module.id,
      templateUrl
    })(class {});
    const tmpModule = NgModule({
      declarations: [tmpCmp],
      imports: [CommonModule]
    })(class {});
    this._compiler
      .compileModuleAndAllComponentsAsync(tmpModule)
      .then(factories => {
        const f = factories.componentFactories[0];
        const cmpRef = f.create(this._injector, [], null, this._m);
        cmpRef.instance.name = 'dynamic';
        this.vc.insert(cmpRef.hostView);
      });
  }
}
