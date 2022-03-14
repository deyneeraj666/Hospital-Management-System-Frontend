export class Appointment{
    
  // "id": "0",
  //     "p_id": this.currentUser,
  //     "patientName": this.currentUserName,
  //     "physician": this.appointmentForm.value.Physician,
  //     "meetingTitle": 'title',
  //     "status": 'Pending',
  //     "startDateTime": new Date(), // this.datepipe.transform(element[0].StartTime, 'yyyy-MM-dd h:mm a'),
  //     "endDateTime": new Date(),  // this.datepipe.transform(element[0].EndTime, 'yyyy-MM-dd h:mm a'),
  //     "description": this.appointmentForm.value.Description,
  //     "username": this.currentUser

    id:number=0;
    p_id:string='';
    patientName:string='';
    physician:string='';
    meetingTitle:string='';
    status:string='';
    startDateTime?:Date;
    endDateTime?:Date;
    description:string='';
    appointmentType:string='';
    username:string=''
  }