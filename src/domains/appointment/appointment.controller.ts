import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpStatus,
  Put,
  Query
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AppointmentService } from './appointment.service';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { CancelAppointmentDto } from './dto/cancel-appointment.dto';
import { ModifyAppointmentDto } from './dto/modify-appointment.dto';
import { GetAppointmentDto } from './dto/get-appointment.dto';
import { GetAppointmentsByDoctorDto } from './dto/get-appointment-by-doctor.dto';

@Controller({
  path: 'appointment',
  version: '1'
})
@ApiTags('Appointment')
export class AppointmentController {
  constructor(private readonly appointmentService: AppointmentService) {}

  // Create a new appointment
  @ApiOperation({
    summary: 'Book an appointment'
  })
  @Post()
  create(@Body() createAppointmentDto: CreateAppointmentDto) {
    const data = this.appointmentService.create(createAppointmentDto);
    return data;
  }

  // View Appointment Details by patient email
  @Get('patient')
  @ApiOperation({ summary: 'View a booked appointment details for a patient' })
  getAppointment(@Query() getAppointmentDto: GetAppointmentDto) {
    return this.appointmentService.getAppointmentByEmail(
      getAppointmentDto.patientEmail
    );
  }

  // View All Appointments by Doctor's name
  @Get('doctor')
  @ApiOperation({ summary: 'View all appointments for a specific doctor' })
  getAppointmentsByDoctor(
    @Query() getAppointmentsByDoctorDto: GetAppointmentsByDoctorDto
  ) {
    return this.appointmentService.getAppointmentsByDoctor(
      getAppointmentsByDoctorDto.doctorName
    );
  }

  // Cancel Appointment by patient's email and appointment time
  @Delete('cancel')
  @ApiOperation({ summary: 'Cancel an appointment' })
  cancelAppointment(@Body() cancelAppointmentDto: CancelAppointmentDto) {
    return this.appointmentService.cancelAppointment(
      cancelAppointmentDto.patientEmail,
      cancelAppointmentDto.appointmentTime
    );
  }

  // Modify Appointment Time
  @Put('modify')
  @ApiOperation({ summary: "Modify an appointment's time slot" })
  modifyAppointment(@Body() modifyAppointmentDto: ModifyAppointmentDto) {
    return this.appointmentService.modifyAppointmentTime(
      modifyAppointmentDto.patientEmail,
      modifyAppointmentDto.originalTimeSlot,
      modifyAppointmentDto.newTimeSlot
    );
  }
}
