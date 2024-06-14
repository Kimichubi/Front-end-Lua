import { Component } from '@angular/core';
import { HeaderComponent } from '../../common/header/header.component';
import { FooterComponent } from '../../common/footer/footer.component';
import { UserService } from '../../../service/user/user.service';
import { User } from '../../../interface/User';

@Component({
  selector: 'app-infos',
  standalone: true,
  imports: [HeaderComponent, FooterComponent],
  templateUrl: './infos.component.html',
  providers: [UserService],
  styleUrl: './infos.component.css',
})
export class InfosComponent {
  constructor(private userService: UserService) {}

  user!: User;

  ngOnInit() {
    this.userService.infos().subscribe(
      (response) => {
        this.user = response;
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
