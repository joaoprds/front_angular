import { Component } from '@angular/core';
import {AppService} from './app.service';  
import { FormGroup, FormControl,Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'PagamentoCartao';

  constructor(private AppService: AppService) { }  
  data: any;  
  CartaoForm: FormGroup;  
  submitted = false;   
  EventValue: any = "Save";  
  
  ngOnInit(): void {  
    this.getdata();  
  
    this.CartaoForm = new FormGroup({  
      PagamentoId: new FormControl(null),  
      NomeTitular: new FormControl("",[Validators.required]),        
      NumeroCartao: new FormControl("",[Validators.required]),  
      DataExpiracao:new FormControl("",[Validators.required]),  
      CVV: new FormControl("",[Validators.required]),  
    })    
  }  
  getdata() {  
    this.AppService.getData().subscribe((data: any[]) => {  
      this.data = data;  
    })  
  }  
  deleteData(id) {  
    this.AppService.deleteData(id).subscribe((data: any[]) => {  
      this.data = data;  
      this.getdata();  
    })  
  }  
  Save() {   
    this.submitted = true;  
    
     if (this.CartaoForm.invalid) {  
            return;  
     }  
    this.AppService.postData(this.CartaoForm.value).subscribe((data: any[]) => {  
      this.data = data;  
      this.resetFrom();  
  
    })  
  }  
  Update() {   
    this.submitted = true;  
    
    if (this.CartaoForm.invalid) {  
     return;  
    }        
    this.AppService.putData(this.CartaoForm.value.PagamentoId,this.CartaoForm.value).subscribe((data: any[]) => {  
      this.data = data;  
      this.resetFrom();  
    })  
  }  
  
  EditData(Data) {  
    this.CartaoForm.controls["PagamentoId"].setValue(Data.PagamentoId);  
    this.CartaoForm.controls["NomeTitular"].setValue(Data.NomeTitular);      
    this.CartaoForm.controls["NumeroCartao"].setValue(Data.NumeroCartao);  
    this.CartaoForm.controls["DataExpiracao"].setValue(Data.DataExpiracao);  
    this.CartaoForm.controls["CVV"].setValue(Data.CVV);  
    this.EventValue = "Atualiza";  
  }  
  
  resetFrom()  
  {     
    this.getdata();  
    this.CartaoForm.reset();  
    this.EventValue = "Save";  
    this.submitted = false;   
  } 
}
