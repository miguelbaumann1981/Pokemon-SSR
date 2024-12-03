import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { provideRouter } from '@angular/router';
import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NavbarComponent } from './shared/components/navbar/navbar.component';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;
  let compiled: HTMLDivElement;

  
  @Component({
    selector: 'app-navbar',
    standalone: true,
    template: `<h1>Hola Mundo</h1>`
  })
  class NavbarComponentMock {}


  beforeEach(async () => {
    TestBed.overrideComponent(AppComponent, {
      set: {
        imports: [ NavbarComponentMock ],
        schemas: [CUSTOM_ELEMENTS_SCHEMA]
      }
    })
    
    //----- RECOMENDADO
    // await TestBed.configureTestingModule({
    //   imports: [
    //     AppComponent
    //   ],
    //   providers: [
    //     provideRouter([])
    //   ]
    // }).overrideComponent( AppComponent, {
    //   add: {
    //     imports: [ NavbarComponentMock ]
    //   },
    //   remove: {
    //     imports: [ NavbarComponent ]
    //   }
    // } ).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    compiled = fixture.nativeElement as HTMLDivElement;
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should render the navbar and router-outlet', () => {
    expect(compiled.querySelector('app-navbar')).not.toBeNull();
    expect(compiled.querySelector('router-outlet')).toBeTruthy();
  });

});
