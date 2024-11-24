import { Module } from '@nestjs/common';
import { AppointmentService } from './appointment.service';
import { AppointmentController } from './appointment.controller';
import { DoctorModule } from '../doctor/doctor.module';

@Module({
  imports: [DoctorModule],  // Import DoctorsModule here
  controllers: [AppointmentController],
  providers: [AppointmentService],
})
export class AppointmentModule {}
