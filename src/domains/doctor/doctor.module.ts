import { Module } from '@nestjs/common';
import { DoctorsService } from './doctor.service';

@Module({
  controllers: [],
  providers: [DoctorsService],
  exports: [DoctorsService]
})
export class DoctorModule {}
