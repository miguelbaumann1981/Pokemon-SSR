import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'about-page',
  standalone: true,
  imports: [],
  templateUrl: './about-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class AboutPageComponent implements OnInit {

  private title = inject(Title);
  private meta = inject(Meta);

  ngOnInit(): void {
    this.title.setTitle('About Page');
    this.meta.updateTag({name: 'description', content: 'Este es mi About page'});
    this.meta.updateTag({name: 'og:title', content: 'About page'});
    this.meta.updateTag({name: 'keywords', content: 'Curso Angular, front-end, curso pro'});
  }


}
