import { Request, Response } from 'express';
import { parseISO } from 'date-fns';
import { container } from 'tsyringe';

import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService';

class AppointmentController {
  public async create(request: Request, response: Response): Promise<Response> {
    /* appointmentsRouter.get('/', async (request, response) => {
      const appointments = await appointmentsRepository.find();
      return response.json(appointments);
    });
    */
    const { provider_id, date } = request.body;
    const parsedDate = parseISO(date);

    const createAppointment = container.resolve(CreateAppointmentService);

    const appointment = await createAppointment.execute({
      provider_id,
      date: parsedDate,
    });
    return response.json(appointment);
  }
}

export default AppointmentController;
