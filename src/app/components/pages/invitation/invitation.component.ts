import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CreationRequest } from 'src/app/models/auth.model';
import { StudentService } from 'src/app/services/student.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-invitation',
  templateUrl: './invitation.component.html',
  styleUrls: ['./invitation.component.scss', './notebook.scss']
})
export class InvitationComponent implements OnInit {
  license = "";
  request: CreationRequest = new CreationRequest();

  constructor(
    private userService: UserService,
    private toastService: ToastrService,
    private route: ActivatedRoute,
    private studentService: StudentService,
    private router: Router
  ) {

  }

  ngOnInit(): void {
    this.license = this.route.snapshot.paramMap.get('license');
    if (!this.license) {
      this.router.navigate[''];
    }
    this.hasPendingInvitation();
  }

  hasPendingInvitation() {
    this.studentService.hasPendingInvitation(this.license).subscribe({
      next: (response: boolean) => {
        if (!response) {
          this.router.navigate(['']);
        }
      },
      error: (error) => {
        this.router.navigate(['']);
      }
    })
  }

  create() {
    var date = new Date();
    date.setDate(parseInt(this.request.day));
    date.setMonth(parseInt(this.request.month) - 1);
    date.setFullYear(parseInt(this.request.year));
    var newRequest = new CreationRequest();
    newRequest.birthday = date.toISOString().split("T")[0];
    newRequest.license = this.license;
    newRequest.name = this.request.name;
    newRequest.password = this.request.password;
    newRequest.username = this.request.username;
    this.userService.createUserStudent(newRequest).subscribe({
      next: (response) => {
        this.toastService.success("Created user successfully!");
      },
      error: (error) => {
        this.toastService.error(error.error);
      }
    })
  }
}
