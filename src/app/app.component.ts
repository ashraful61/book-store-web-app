import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { BookService } from './book.service';
import { HttpClientModule } from '@angular/common/http';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, HttpClientModule, FormsModule, ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'BookStoreWebApp';
  books: any[] = [];
  bookForm!: FormGroup;
  constructor(
    private _bookService: BookService,
    private fb: FormBuilder,
  ){

  }

  ngOnInit(): void {
    this.bookForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required]
    });
    this.getAllBooks();
  }

  getAllBooks(){
    this._bookService.getAllBooks().subscribe(res => {
      console.log('res',res);
      this.books = res;
    }, err =>{
      // console.log('GetAllBookErr', err);
    })
  }

  onSubmit() {
    if (this.bookForm.valid) {
      const formData = this.bookForm.value;
      this._bookService.addNewBook(formData).subscribe(response => {
          console.log('Submitted successfully:', response);
          // Reset form or handle success as needed
          this.getAllBooks();
        }, error => {
          console.error('Error submitting form:', error);
          // Handle error as needed
        });
    }
  }

}
