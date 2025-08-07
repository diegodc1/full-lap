import { Component } from '@angular/core';
import { ChipModule } from 'primeng/chip';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [ChipModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {

}
