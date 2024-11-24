#  Doctor Appointment Booking System
Users (patients) should be able to book an appointment with a doctor. Each doctor has a limited number of appointment slots. (Assignment suggested
by Synamedia).

## About
This project is made using NestJS & typescript. Swagger for API documentation
& class-validators.

## Setup
- Make sure the system has Docker setup.
- Kindly run ```sh ./bin/build-and-run.sh``` in your system and the project will
  starting running as it is a containerized project.

## For running it without container
- Make sure that you have nest-cli installed in your system. If not then
  follow the [docs](https://docs.nestjs.com/first-steps).
- Install the NodeJS version mentioned in tool versions file and then follow
  the following steps.
    - Run ```npm install```
    - Run ```npm run start:debug```


## Improvements Can be done
- Implementing DB and ORM (either TypeORM or prisma).
- Implementing cache for GET APIs.
- Implementing pre-commit and pre-push rules using husky for better &
  organized code.
- Implementing ci.yaml using Github Actions.


## Assignment Details

Background: All API referenced are REST APIs.
We are building a simple Doctor Appointment Booking System.

Appointment Booking API:

Create an API that allows a user to book an appointment with a doctor.
The appointment should include:
Patient details: First name, Last name, Email
Appointment time slot (in a simple format, e.g., "10:00 AM - 11:00 AM")
Doctor's name (predefined)
The API should return a confirmation of the booking with the appointment details.


View Appointment Details API:

Create an API to show the details of a booked appointment for a patient.
Input: Patient's email address.
Output: Appointment details, including the doctor's name, time slot, and patient information.


View All Appointments by Doctor API:

Create an API to list all booked appointments for a specific doctor.
Input: Doctor's name.
Output: List of all appointments for the doctor, including time slots and patient details.
Cancel Appointment API:

Create an API that allows a user to cancel their appointment.
Input: Patient's email and appointment time slot.
Output: Confirmation that the appointment has been cancelled.
Modify Appointment API:

Create an API that allows a user to modify the time slot of an already booked appointment.
Input: Patient's email, original time slot, and new time slot.
Output: Updated appointment details.
