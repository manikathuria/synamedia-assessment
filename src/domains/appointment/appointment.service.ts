import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
  PreconditionFailedException
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DoctorsService } from '../doctor/doctor.service';
import { Appointment } from './appointment.schema';

import { CreateAppointmentDto } from './dto/create-appointment.dto';

@Injectable()
export class AppointmentService {
  private logger = new Logger(AppointmentService.name);
  private appointments: Appointment[] = [];

  constructor(private doctorsService: DoctorsService) {}

  create(createAppointmentDto: CreateAppointmentDto): string | Appointment {
    const {
      patientFirstName,
      patientLastName,
      patientEmail,
      doctorId,
      appointmentTime
    } = createAppointmentDto;

    const doctor = this.doctorsService.findById(doctorId);
    if (!doctor) {
      throw new BadRequestException('Doctor not found');
    }

    // Check if the selected slot is available
    if (!this.doctorsService.isSlotAvailable(doctorId, appointmentTime)) {
      throw new BadRequestException('The selected time slot is not available');
    }

    // Book the slot for the doctor
    const isBooked = this.doctorsService.bookSlot(doctorId, appointmentTime);
    if (!isBooked) {
      throw new BadRequestException('Failed to book the slot');
    }

    // Create the appointment
    const appointment: Appointment = {
      patientFirstName,
      patientLastName,
      patientEmail,
      doctorName: doctor.name,
      appointmentTime
    };

    this.appointments.push(appointment);

    return appointment;
  }

  // View Appointment Details by patient email
  getAppointmentByEmail(patientEmail: string): Appointment {
    const appointment = this.appointments.find(
      (app) => app.patientEmail === patientEmail
    );

    if (!appointment) {
      throw new NotFoundException('Appointment not found for this patient');
    }

    return appointment;
  }

  // View All Appointments by Doctor's name
  getAppointmentsByDoctor(doctorName: string): Appointment[] {
    const doctorAppointments = this.appointments.filter(
      (app) => app.doctorName === doctorName
    );

    if (doctorAppointments.length === 0) {
      throw new NotFoundException('No appointments found for this doctor');
    }

    return doctorAppointments;
  }

  // Cancel an appointment by patient email and time slot
  cancelAppointment(patientEmail: string, appointmentTime: string): boolean {
    const index = this.appointments.findIndex(
      (app) =>
        app.patientEmail === patientEmail &&
        app.appointmentTime === appointmentTime
    );

    if (index === -1) {
      throw new NotFoundException('Appointment not found');
    }

    this.appointments.splice(index, 1);
    return true;
  }

  // Modify an existing appointment's time slot
  modifyAppointmentTime(
    patientEmail: string,
    originalTimeSlot: string,
    newTimeSlot: string
  ): Appointment {
    const appointment = this.appointments.find(
      (app) =>
        app.patientEmail === patientEmail &&
        app.appointmentTime === originalTimeSlot
    );

    if (!appointment) {
      throw new NotFoundException('Appointment not found');
    }

    appointment.appointmentTime = newTimeSlot;
    return appointment;
  }
}
