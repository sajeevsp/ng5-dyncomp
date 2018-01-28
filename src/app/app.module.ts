import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Compiler, CompilerFactory, COMPILER_OPTIONS } from '@angular/core';
import { JitCompilerFactory } from '@angular/platform-browser-dynamic';

import { AppComponent } from './app.component';
import { DynamicTemplateComponent } from './dynamic-template/dynamic-template.component';

export function createCompiler(compilerFactory: CompilerFactory) {
  return compilerFactory.createCompiler();
}

@NgModule({
  declarations: [
    AppComponent,
    DynamicTemplateComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [  {provide: COMPILER_OPTIONS, useValue: {}, multi: true},
    {provide: CompilerFactory, useClass: JitCompilerFactory, deps: [COMPILER_OPTIONS]},
    {provide: Compiler, useFactory: createCompiler, deps: [CompilerFactory]}],
  bootstrap: [AppComponent]
})
export class AppModule { }
