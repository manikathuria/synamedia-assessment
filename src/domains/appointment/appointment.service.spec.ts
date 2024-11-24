import { Test, TestingModule } from '@nestjs/testing';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { DoctorsService } from '../doctor/doctor.service';
import { AppointmentService } from './appointment.service';

describe('AppointmentService', () => {
  let service: AppointmentService;
  let doctorsService: DoctorsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AppointmentService, DoctorsService]
    }).compile();

    service = module.get<AppointmentService>(AppointmentService);
    doctorsService = module.get<DoctorsService>(DoctorsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create an appointment successfully', () => {
    const createAppointmentDto: CreateAppointmentDto = {
      patientFirstName: 'John',
      patientLastName: 'Doe',
      patientEmail: 'john.doe@example.com',
      doctorId: 1,
      appointmentTime: '10:00 AM - 11:00 AM'
    };

    const result = service.create(createAppointmentDto);

    expect(result).toHaveProperty('patientFirstName', 'John');
    expect(result).toHaveProperty('doctorName', 'Dr. John Doe');
  });

  it('should throw BadRequestException if doctor is not found', () => {
    const createAppointmentDto: CreateAppointmentDto = {
      patientFirstName: 'Jane',
      patientLastName: 'Doe',
      patientEmail: 'jane.doe@example.com',
      doctorId: 999, // Invalid doctor ID
      appointmentTime: '10:00 AM - 11:00 AM'
    };

    expect(() => service.create(createAppointmentDto)).toThrowError(
      BadRequestException
    );
    try {
      service.create(createAppointmentDto);
    } catch (error) {
      expect(error.response.message).toBe('Doctor not found');
    }
  });

  it('should throw BadRequestException if time slot is unavailable', () => {
    const createAppointmentDto: CreateAppointmentDto = {
      patientFirstName: 'Jane',
      patientLastName: 'Doe',
      patientEmail: 'jane.doe@example.com',
      doctorId: 1,
      appointmentTime: '2:30 PM - 3:30 PM' // Slot not available
    };

    expect(() => service.create(createAppointmentDto)).toThrowError(
      BadRequestException
    );
    try {
      service.create(createAppointmentDto);
    } catch (error) {
      expect(error.response.message).toBe(
        'The selected time slot is not available'
      );
    }
  });

  describe('getAppointmentByEmail', () => {
    it('should return appointment details for a patient', () => {
      service['appointments'] = [
        {
          patientEmail: 'test@example.com',
          doctorName: 'Dr. Smith',
          appointmentTime: '2024-11-25T10:00:00',
          patientFirstName: 'John',
          patientLastName: 'Doe'
        }
      ];

      expect(service.getAppointmentByEmail('test@example.com')).toEqual({
        patientEmail: 'test@example.com',
        doctorName: 'Dr. Smith',
        appointmentTime: '2024-11-25T10:00:00',
        patientFirstName: 'John',
        patientLastName: 'Doe'
      });
    });

    it('should throw NotFoundException if no appointment is found', () => {
      expect(() =>
        service.getAppointmentByEmail('nonexistent@example.com')
      ).toThrow(NotFoundException);
    });
  });

  describe('cancelAppointment', () => {
    it('should cancel an appointment', () => {
      service['appointments'] = [
        {
          patientEmail: 'test@example.com',
          doctorName: 'Dr. Smith',
          appointmentTime: '2024-11-25T10:00:00',
          patientFirstName: 'John',
          patientLastName: 'Doe'
        }
      ];

      expect(
        service.cancelAppointment('test@example.com', '2024-11-25T10:00:00')
      ).toBe(true);
    });

    it('should throw NotFoundException if appointment does not exist', () => {
      expect(() =>
        service.cancelAppointment(
          'nonexistent@example.com',
          '2024-11-25T10:00:00'
        )
      ).toThrow(NotFoundException);
    });
  });
});
