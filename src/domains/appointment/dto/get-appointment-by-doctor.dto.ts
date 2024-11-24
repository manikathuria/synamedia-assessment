import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class GetAppointmentsByDoctorDto {
  @ApiProperty({
    description: 'Name of the doctor to retrieve all appointments',
    example: 'Dr. Smith',
  })
  @IsString()
  @IsNotEmpty()
  doctorName: string;
}
