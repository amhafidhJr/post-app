import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from './component/dialog/dialog.component';
import { ApiService } from './service/api.service';
import { AfterViewInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'post-app';
  displayedColumns: string[] = [
    'coupon_name',
    'coupon_code',
    'coupon_limit',
    'actions',
  ];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private dialog: MatDialog, private api: ApiService) {}
  ngOnInit(): void {
    this.getAllCoupons();
  }

  openDialog() {
    this.dialog
      .open(DialogComponent, {
        width: '30%',
      })
      .afterClosed()
      .subscribe((val) => {
        if (val === 'save') {
          this.getAllCoupons();
        }
      });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  editCoupon(row: any) {
    this.dialog
      .open(DialogComponent, {
        width: '30%',
        data: row,
      })
      .afterClosed()
      .subscribe((val) => {
        if (val === 'update') {
          this.getAllCoupons();
        }
      });
  }

  getAllCoupons() {
    this.api.getCoupons().subscribe({
      next: (res) => {
        this.dataSource = new MatTableDataSource(res.coupons);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        console.log(res);
      },
      error: (err) => {
        alert('error while fetching coupon');
      },
    });
  }

  deleteCoupon(id: number) {
    this.api.deleteCoupon(id).subscribe({
      next: (res) => {
        alert('Coupon deleted successfully');
        this.getAllCoupons();
      },
      error: (err) => {
        alert('error while deleting coupon');
      },
    });
  }
}
