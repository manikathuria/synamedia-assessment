import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config'
import configuration from './config/configuration';
import { AppointmentController } from './domains/appointment/appointment.controller';
import { AppointmentModule } from './domains/appointment/appointment.module';
import { AppointmentService } from './domains/appointment/appointment.service';
import { DoctorModule } from './domains/doctor/doctor.module';
import { DoctorsService } from './domains/doctor/doctor.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration]
    }),
    AppointmentModule,
    DoctorModule
  ],
  controllers: [AppointmentController],
  providers: [AppointmentService, DoctorsService],
})
export class AppModule {}
