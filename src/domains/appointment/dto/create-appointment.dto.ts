import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail, IsNotEmpty, IsEnum, IsDateString } from 'class-validator';

export class CreateAppointmentDto {
  @ApiProperty({
    description: 'First name of the patient',
    example: 'John',
  })
  @IsString()
  @IsNotEmpty()
  patientFirstName: string;

  @ApiProperty({
    description: 'Last name of the patient',
    example: 'Doe',
  })
  @IsString()
  @IsNotEmpty()
  patientLastName: string;

  @ApiProperty({
    description: 'Email of the patient',
    example: 'john.doe@example.com',
  })
  @IsEmail()
  @IsNotEmpty()
  patientEmail: string;

  @ApiProperty({
    description: 'ID of the doctor to whom the appointment is booked',
    example: 1,
  })
  @IsNotEmpty()
  doctorId: number;

  @ApiProperty({
    description: 'Time slot for the appointment',
    example: '2024-11-25T10:00:00',
  })
  @IsDateString()
  @IsNotEmpty()
  appointmentTime: string;
}