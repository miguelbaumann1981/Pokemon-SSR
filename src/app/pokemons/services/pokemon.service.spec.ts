import { TestBed } from "@angular/core/testing";
import { PokemonsService } from "./pokemons.service";
import { inject } from '@angular/core';
import { provideHttpClient } from "@angular/common/http";
import { HttpTestingController, provideHttpClientTesting } from "@angular/common/http/testing";
import { SimplePokemon } from "../interfaces/simple-pokemon.interface";
import { PokemonAPIResponse } from "../interfaces/pokemon-api-response.interface";
import { catchError } from "rxjs";

const expectedPokemons: SimplePokemon[] = [
    { id: '1', name: 'bulbasaur' },
    { id: '2', name: 'ivysaur' },
];

const mockPokemon: SimplePokemon = 
    { id: '1', name: 'bulbasaur' };

const mockApiResponse: PokemonAPIResponse = {
    "count": 1302,
    "next": "https://pokeapi.co/api/v2/pokemon?offset=20&limit=20",
    "previous": '',
    "results": [
        {
            "name": "bulbasaur",
            "url": "https://pokeapi.co/api/v2/pokemon/1/"
        },
        {
            "name": "ivysaur",
            "url": "https://pokeapi.co/api/v2/pokemon/2/"
        },
    ]
}


    describe('PokemonsService', () => {

    let service: PokemonsService;
    let httpMock: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                provideHttpClient(),
                provideHttpClientTesting()
            ]
        });

        service = TestBed.inject(PokemonsService);
        httpMock = TestBed.inject(HttpTestingController);
    });

    afterEach(() => {
        httpMock.verify();
    });

    it('should create the service', () => {
        expect(service).toBeTruthy();
    });

    it('should load a page of SimplePokemons', () => {
        service.loadPage(1).subscribe(pokemons => {
            expect(pokemons).toEqual(expectedPokemons);
        });

        const req = httpMock.expectOne('https://pokeapi.co/api/v2/pokemon?offset=0&limit=20"');
        expect(req.request.method).toBe('GET');
        req.flush(mockApiResponse);
    });

    it('should load page 5 of SimplePokemons', () => {
        service.loadPage(5).subscribe(pokemons => {
            expect(pokemons).toEqual(expectedPokemons);
        });

        const req = httpMock.expectOne('https://pokeapi.co/api/v2/pokemon?offset=80&limit=20"');
        expect(req.request.method).toBe('GET');
        req.flush(mockApiResponse);
    });

    it('should load a Pokemon by ID', () => {
        service.loadPokemon('1').subscribe((pokemon: any) => {
            expect(pokemon).toEqual(mockPokemon)
        });
        const req = httpMock.expectOne('https://pokeapi.co/api/v2/pokemon/1');
        expect(req.request.method).toBe('GET');
        req.flush(mockPokemon);
    });

    it('should load a Pokemon by Name', () => {
        service.loadPokemon('bulbasaur').subscribe((pokemon: any) => {
            expect(pokemon).toEqual(mockPokemon)
        });
        const req = httpMock.expectOne('https://pokeapi.co/api/v2/pokemon/bulbasaur');
        expect(req.request.method).toBe('GET');
        req.flush(mockPokemon);
    });

    it('should catch error if Pokemon not found', () => {
        service.loadPokemon('no-pokemon')
        .pipe(
            catchError(err => {
                expect(err.message).toContain('Pokemon not found');
                return [];
            })
        )
        .subscribe();

        const req = httpMock.expectOne('https://pokeapi.co/api/v2/pokemon/no-pokemon');
        expect(req.request.method).toBe('GET');
        req.flush('Pokemon not found', {
            status: 404,
            statusText: 'Not found'
        });
    });


});