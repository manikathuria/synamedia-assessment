import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail, IsNotEmpty, IsDateString } from 'class-validator';

export class ModifyAppointmentDto {
  @ApiProperty({
    description: 'Email address of the patient',
    example: 'john.doe@example.com',
  })
  @IsEmail()
  @IsNotEmpty()
  patientEmail: string;

  @ApiProperty({
    description: 'Original appointment time slot',
    example: '2024-11-25T10:00:00',
  })
  @IsDateString()
  @IsNotEmpty()
  originalTimeSlot: string;

  @ApiProperty({
    description: 'New time slot to modify the appointment to',
    example: '2024-11-25T11:00:00',
  })
  @IsDateString()
  @IsNotEmpty()
  newTimeSlot: string;
}
