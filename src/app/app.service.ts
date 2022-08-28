import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders }    from '@angular/common/http';  

@Injectable({
  providedIn: 'root'
})
export class AppService {
  
  readonly rootURL = 'http://localhost:4000';

  constructor(private http: HttpClient) { }  
      httpOptions = {  
        headers: new HttpHeaders({  
          'Content-Type': 'application/json'  
        })  
      }    
      getData(){  
        return this.http.get(this.rootURL + '/users'); 
      }  
      
      postData(formData){  
        return this.http.post(this.rootURL + '/users',formData);  
      }  
      
      putData(id,formData){  
        return this.http.put(this.rootURL + '/users/'+id,formData);  
      }  
      deleteData(id){  
        return this.http.delete(this.rootURL + '/users/'+id);  
      }  
}