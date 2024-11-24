import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail, IsNotEmpty, IsDateString } from 'class-validator';

export class CancelAppointmentDto {
  @ApiProperty({
    description: 'Email address of the patient',
    example: 'john.doe@example.com',
  })
  @IsEmail()
  @IsNotEmpty()
  patientEmail: string;

  @ApiProperty({
    description: 'Time slot of the appointment to be canceled',
    example: '2024-11-25T10:00:00',
  })
  @IsDateString()
  @IsNotEmpty()
  appointmentTime: string;
}
