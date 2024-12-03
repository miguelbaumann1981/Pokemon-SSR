import { ComponentFixture, TestBed } from "@angular/core/testing";
import { PokemonCardComponent } from "./pokemon-card.component";
import { provideRouter } from "@angular/router";
import { SimplePokemon } from "../../interfaces/simple-pokemon.interface";

const mockPokemon: SimplePokemon = {
    id: '1',
    name: 'Bulbasur'
};


describe('PokemonCardComponent', () => {

    let fixture: ComponentFixture<PokemonCardComponent>;
    let component: PokemonCardComponent;
    let compiled: HTMLElement;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [ PokemonCardComponent ],
            providers: [ provideRouter([]) ]
        }).compileComponents();

        fixture = TestBed.createComponent(PokemonCardComponent);
        fixture.componentRef.setInput('pokemon', mockPokemon);
        component = fixture.componentInstance;
        compiled = fixture.nativeElement as HTMLElement;
        fixture.detectChanges();
    });

    it('should create the component', () => {
        expect(component).toBeTruthy();
    });

    it('should have the SimplePokemon signal inputValue', () => {
        expect(component.pokemon()).toBeTruthy();
        expect(component.pokemon()).toEqual(mockPokemon);
        expect(component.pokemon().id).toBe('1');

    });

    it('should render the pokemon name and image correctly', () => {
        expect(compiled.querySelector('h2')?.innerText).toBe(mockPokemon.name);
        expect(compiled.querySelector('img')!.getAttribute('src')).toBe(`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${mockPokemon.id}.png`);
    });

    it('should have the proper ng-reflect-router-link', () => {
        const divLink = compiled.querySelector('div');
        expect(divLink?.attributes.getNamedItem('ng-reflect-router-link')?.value).toBe(`/pokemons,${mockPokemon.name}`)
    });

});