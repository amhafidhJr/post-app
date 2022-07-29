import { ApiService } from './../../service/api.service';
import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css'],
})
export class DialogComponent implements OnInit {
  couponForm!: FormGroup;
  actionButton: string = "Save";
  constructor(
    private formBuilder: FormBuilder,
    private api: ApiService,
    @Inject(MAT_DIALOG_DATA) public editData: any,
    private dialogRef: MatDialogRef<DialogComponent>
  ) {}

  ngOnInit(): void {
    this.couponForm = this.formBuilder.group({
      coupon_name: ['', Validators.required],
      coupon_limit: ['', Validators.required],
      start_date: ['', Validators.required],
      expires_at: ['', Validators.required],
    });

    // console.log(this.editData);

    if(this.editData){
      this.actionButton = "Update";
      this.couponForm.controls['coupon_name'].setValue(this.editData.coupon_name);
      this.couponForm.controls['coupon_limit'].setValue(this.editData.coupon_limit);
      this.couponForm.controls['start_date'].setValue(this.editData.start_date);
      this.couponForm.controls['expires_at'].setValue(this.editData.expires_at);
    }
  }

  addCoupon() {
    if(!this.editData){
      if (this.couponForm.valid) {
        this.api.postCoupon(this.couponForm.value).subscribe({
          next: (res) => {
            alert('Coupon added successfully');
            this.couponForm.reset();
            this.dialogRef.close('save');
          },
          error: () => {
            alert('Coupon could not be added successfully');
          },
        });
      }
    } else {
      this.updateCoupon()
    }
    // console.log(this.couponForm.value);
  }
  updateCoupon() {
    this.api.putCoupon(this.couponForm.value, this.editData.id)
    .subscribe({
      next: (res) => {
        alert('Coupon updated successfully');
        this.couponForm.reset();
        this.dialogRef.close('update');
      },
      error: (err) => {
        alert('Coupon could not be updated successfully');
      }
    })
  }
}
