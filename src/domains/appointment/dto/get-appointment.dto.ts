import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class GetAppointmentDto {
  @ApiProperty({
    description: 'Email address of the patient to retrieve the appointment',
    example: 'john.doe@example.com',
  })
  @IsEmail()
  @IsNotEmpty()
  patientEmail: string;
}
