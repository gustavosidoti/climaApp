import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: any, arg: any): any {

    const resultHistorial = [];

    for(const historial of value){
       if(historial.ciudad.indexOf(arg) > -1) {
         resultHistorial.push(historial);
       };
    };
    return resultHistorial;
  }

}
