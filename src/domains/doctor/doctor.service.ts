import { Injectable } from '@nestjs/common';
import { DoctorDto } from './dto/doctor.dto';

@Injectable()
export class DoctorsService {
  private doctors: DoctorDto[] = [
    {
      id: 1,
      name: 'Dr. John Doe',
      availableSlots: [
        '10:00 AM - 11:00 AM',
        '11:00 AM - 12:00 PM',
        '02:00 PM - 03:00 PM',
        '04:00 PM - 05:00 PM'
      ]
    },
    {
      id: 2,
      name: 'Dr. Jane Smith',
      availableSlots: ['9:00 AM - 10:00 AM', '12:00 PM - 1:00 PM']
    }
  ];

  findAll(): DoctorDto[] {
    return this.doctors;
  }

  findById(id: number): DoctorDto | undefined {
    return this.doctors.find((doctor) => doctor.id === id);
  }

  isSlotAvailable(doctorId: number, slot: string): boolean {
    const doctor = this.findById(doctorId);
    return doctor ? doctor.availableSlots.includes(slot) : false;
  }

  bookSlot(doctorId: number, slot: string): boolean {
    const doctor = this.findById(doctorId);
    if (doctor && doctor.availableSlots.includes(slot)) {
      doctor.availableSlots = doctor.availableSlots.filter(
        (availableSlot) => availableSlot !== slot
      );
      return true;
    }
    return false;
  }
}
