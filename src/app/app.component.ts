import { Component } from '@angular/core';
import {AppService} from './app.service';  
import { FormGroup, FormControl,Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'CadastrodeUsuario';

  constructor(private AppService: AppService) { }  
  data: any;  
  UsuarioForm: FormGroup;  
  submitted = false;   
  EventValue: any = "Save";   

  ngOnInit(): void {  
    this.getdata(); 

      this.UsuarioForm = new FormGroup({  
      Id: new FormControl(null),  
      Nome: new FormControl("",[Validators.required]),        
      cpf: new FormControl("",[Validators.required]),  
      email:new FormControl("",[Validators.required]),  
      telefone: new FormControl("",[Validators.required]),
      sexo: new FormControl("",[Validators.required]),
      DataNascimento: new FormControl("",[Validators.required]),  
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
    if (this.UsuarioForm.invalid) {  
            return;  
    }  
    this.AppService.postData(this.UsuarioForm.value).subscribe((data: any[]) => {  
      this.data = data;  
      this.resetFrom();   
    })  
  }  
  Update() {   
    this.submitted = true;      
    if (this.UsuarioForm.invalid) {  
    return;  
    }        
    this.AppService.putData(this.UsuarioForm.value.PagamentoId,
            this.UsuarioForm.value).subscribe((data: any[]) => {  
      this.data = data;  
      this.resetFrom();  
    })  
  }  

  EditData(Data) {  
    this.UsuarioForm.controls["Id"].setValue(Data.Id);  
    this.UsuarioForm.controls["Nome"].setValue(Data.Nome);      
    this.UsuarioForm.controls["cpf"].setValue(Data.cpf);  
    this.UsuarioForm.controls["email"].setValue(Data.email);  
    this.UsuarioForm.controls["telefone"].setValue(Data.telefone);
    this.UsuarioForm.controls["sexo"].setValue(Data.sexo);
    this.UsuarioForm.controls["DataNascimento"].setValue(Data.DataNascimento);
    this.EventValue = "Atualizar";  
  }    
  resetFrom()  
  {     
    this.getdata();  
    this.UsuarioForm.reset();  
    this.EventValue = "Salvar";  
    this.submitted = false;   
  }
} 
