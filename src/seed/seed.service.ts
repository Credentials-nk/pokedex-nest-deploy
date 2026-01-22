import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AxiosAdapter } from 'src/common/adapters/axios.adapter';
import { Pokemon } from 'src/pokemon/entities/pokemon.entity';
import { PokeResponse } from './interfaces/poke-response.interface';

const pokeapi = 'http://pokeapi.co/api/v2/pokemon?limit=100';

@Injectable()
export class SeedService {
  constructor(
    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<Pokemon>,

    private readonly http: AxiosAdapter,
  ) {}

  async executeSeed() {
    await this.pokemonModel.deleteMany({});

    const data = await this.http.get<PokeResponse>(pokeapi);

    const pokemonToInsert: Array<{ name: string; no: number }> = [];

    for (const { name, url } of data.results) {
      const segments = url.split('/');

      const no: number = +segments[segments.length - 2];

      pokemonToInsert.push({ name, no });
    }

    await this.pokemonModel.insertMany(pokemonToInsert);

    return 'Seed executed';
  }

  // async executeSeed() {
  //   this.pokemonModel.deleteMany();

  //   const { data } = await this.axios<PokeResponse>(pokeapi);

  //   const insertPromisesArray: Array<Promise<Pokemon>> = [];

  //   for (const { name, url } of data.results) {
  //     const segments = url.split('/');

  //     const no: number = +segments[segments.length - 2];

  //     // await this.pokemonModel.create({ name, no });

  //     // Insert multiple
  //     insertPromisesArray.push(this.pokemonModel.create({ name, no }));
  //   }

  //   await Promise.all(insertPromisesArray);

  //   return 'Seed executed';
  // }
}
