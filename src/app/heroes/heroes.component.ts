import { Component } from '@angular/core';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css'],
})
export class HeroesComponent {
  hero: Hero = { id: 1, name: 'Windstorm' };
  heroes: Hero[] = [];
  selectedHero?: Hero;

  constructor(private heroService: HeroService) {}

  ngOnInit(): void {
    this.getHeroes();
  }

  getHeroes(): void {
    this.heroService.getHeroes().subscribe((heroes) => (this.heroes = heroes));
  }

  add(name: string): void {
    name = name.trim();

    if (!name) {
      return;
    }

    // send request to server
    this.heroService.addHero({ name } as Hero).subscribe((hero) => {
      // update the "state"
      this.heroes.push(hero);
    });
  }

  delete(hero: Hero): void {
    // update the "state"
    this.heroes = this.heroes.filter((h) => h.id !== hero.id);

    // send request to server
    this.heroService.deleteHero(hero.id).subscribe();
  }
}
