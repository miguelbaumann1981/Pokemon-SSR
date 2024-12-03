import { ComponentFixture, TestBed } from "@angular/core/testing";
import { PokemonListComponent } from "./pokemon-list.component";
import { SimplePokemon } from "../../interfaces/simple-pokemon.interface";
import { provideRouter } from "@angular/router";

const mockPokemons: SimplePokemon[] = [
    { id: '1', name: 'Bulbasur' },
    { id: '2', name: 'Ivysaur' },
];


describe('PokemonListComponent', () => {

    let fixture: ComponentFixture<PokemonListComponent>;
    let component: PokemonListComponent;
    let compiled: HTMLElement;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [ PokemonListComponent ],
            providers: [ provideRouter([]) ]
        }).compileComponents();

        fixture = TestBed.createComponent(PokemonListComponent);
        component = fixture.componentInstance;
        compiled = fixture.nativeElement as HTMLElement;
    });
    
    it('should create the component', () => {
        fixture.componentRef.setInput('pokemons', []);
        fixture.detectChanges();
        expect(component).toBeTruthy();
    });

    it('should render the pokemon list with 2 cards correctly', () => {
        fixture.componentRef.setInput('pokemons', mockPokemons);
        fixture.detectChanges();

        expect(compiled.querySelectorAll('app-pokemon-card').length).toBe(mockPokemons.length);
    });

    it('should render "No hay pokemons"', () => {
        fixture.componentRef.setInput('pokemons', []);
        fixture.detectChanges();
        expect(compiled.querySelector('div')?.textContent).toContain('No hay Pokemons');
    });



});