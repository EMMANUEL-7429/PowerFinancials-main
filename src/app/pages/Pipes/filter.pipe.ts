import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
  
})
export class FilterPipe implements PipeTransform {
  
  transform(memberList:any[],MemberId:number): any[] {
    if(!memberList || !MemberId){
      return memberList;
    }
    return memberList.filter(item=>
      item.MemberNo.toLowerCase().indexOf(MemberId.toString().toLowerCase())!==-1)
}
}
