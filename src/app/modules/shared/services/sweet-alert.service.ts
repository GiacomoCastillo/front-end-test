import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class SweetAlertService {

  constructor(private router : Router) { }

  sweetSuccess(title : any, description: any, time : number, ){    
    Swal.fire({
      position: "center",
      icon: "success",
      title: title,
      text: description,
      showConfirmButton: false,
      timer: time
    });
  }

  sweetWarning(title : any, description: any, time : number, ){    
    Swal.fire({
      position: "center",
      icon: "warning",
      title: title,
      text: description,
      showConfirmButton: false,
      timer: time
    });
  }

  sweetError(title : any, description: any, time : number, ){    
    Swal.fire({
      position: "center",
      icon: "error",
      title: title,
      text: description,
      showConfirmButton: false,
      timer: time
    });
  }

  sweetInfo(title : any, description: any, time : number, ){    
    Swal.fire({
      position: "center",
      icon: "info",
      title: title,
      text: description,
      showConfirmButton: false,
      timer: time
    });
  }

  sweetQuestion(title : any, description: any, time : number, ){    
    Swal.fire({
      position: "center",
      icon: "question",
      title: title,
      text: description,
      showConfirmButton: false,
      timer: time
    });
  }
}
