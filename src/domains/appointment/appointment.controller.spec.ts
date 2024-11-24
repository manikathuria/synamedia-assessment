import { Test, TestingModule } from '@nestjs/testing';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { BadRequestException } from '@nestjs/common';
import { of } from 'rxjs';
import { DoctorsService } from '../doctor/doctor.service';
import { AppointmentController } from './appointment.controller';
import { AppointmentService } from './appointment.service';

describe('AppointmentController', () => {
  let controller: AppointmentController;
  let service: AppointmentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AppointmentController],
      providers: [AppointmentService, DoctorsService],
    }).compile();

    controller = module.get<AppointmentController>(AppointmentController);
    service = module.get<AppointmentService>(AppointmentService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create an appointment successfully', async () => {
    const createAppointmentDto: CreateAppointmentDto = {
      patientFirstName: 'John',
      patientLastName: 'Doe',
      patientEmail: 'john.doe@example.com',
      doctorId: 1,
      appointmentTime: '10:00 AM - 11:00 AM',
    };

    const result = {
      patientFirstName: 'John',
      patientLastName: 'Doe',
      patientEmail: 'john.doe@example.com',
      doctorName: 'Dr. John Doe',
      appointmentTime: '10:00 AM - 11:00 AM',
    };

    //@ts-ignore
    jest.spyOn(service, 'create').mockResolvedValue(result);

    expect(await controller.create(createAppointmentDto)).toEqual(result);
  });

  it('should throw BadRequestException if doctor is not found', async () => {
    const createAppointmentDto: CreateAppointmentDto = {
      patientFirstName: 'Jane',
      patientLastName: 'Doe',
      patientEmail: 'jane.doe@example.com',
      doctorId: 999,  // Invalid doctor ID
      appointmentTime: '10:00 AM - 11:00 AM',
    };

    jest.spyOn(service, 'create').mockImplementation(() => {
      throw new BadRequestException('Doctor not found');
    });

    try {
      await controller.create(createAppointmentDto);
    } catch (error) {
      expect(error.response.message).toBe('Doctor not found');
      expect(error.status).toBe(400);
    }
  });

  it('should throw BadRequestException if time slot is unavailable', async () => {
    const createAppointmentDto: CreateAppointmentDto = {
      patientFirstName: 'Jane',
      patientLastName: 'Doe',
      patientEmail: 'jane.doe@example.com',
      doctorId: 1,
      appointmentTime: '2:30 PM - 3:30 PM', // Slot not available
    };

    jest.spyOn(service, 'create').mockImplementation(() => {
      throw new BadRequestException('The selected time slot is not available');
    });

    try {
      await controller.create(createAppointmentDto);
    } catch (error) {
      expect(error.response.message).toBe('The selected time slot is not available');
      expect(error.status).toBe(400);
    }
  });
});
