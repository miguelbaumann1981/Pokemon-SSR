import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'contact-page',
  standalone: true,
  imports: [],
  templateUrl: './contact-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ContactPageComponent implements OnInit {

  private title = inject(Title);
  private meta = inject(Meta);

  ngOnInit(): void {
    this.title.setTitle('Contact Page');
    this.meta.updateTag({name: 'description', content: 'Este es mi Contact page'});
    this.meta.updateTag({name: 'og:title', content: 'Contact page'});
    this.meta.updateTag({name: 'keywords', content: 'Curso Angular, front-end, curso pro'});
  }


}
