import * as Yup from 'yup';
import {
  parseISO,
  isAfter,
  isBefore,
  setHours,
  setSeconds,
  setMinutes,
} from 'date-fns';

import Deliveryman from '../models/Deliveryman';
import Delivery from '../models/Delivery';

class DeliveryStatusController {
  async index(req, res) {
    const checkDeliveryManExists = await Deliveryman.findOne({
      where: { id: req.params.id },
    });

    if (!checkDeliveryManExists) {
      res.status(400).json({ error: 'This Deliveryman does not exists' });
    }

    const deliveries = await Delivery.findAll({
      where: {
        end_date: null,
        canceled_at: null,
        deliveryman_id: req.params.id,
      },
    });
    return res.json(deliveries);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      start_date: Yup.date().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'validation fails' });
    }

    const { deliveryman_id, delivery_id } = req.params;

    const deliveryman = await Deliveryman.findByPk(deliveryman_id);

    if (!deliveryman) {
      return res.status(400).json({ error: 'Deliveryman does not exists' });
    }

    const delivery = await Delivery.findByPk(delivery_id);

    if (!delivery) {
      return res.status(400).json({ error: 'Delivery does not exists' });
    }

    const deliveryBelongs = await Delivery.findOne({
      where: { id: delivery_id, deliveryman_id },
    });

    if (!deliveryBelongs) {
      return res.status(401).json({
        error: 'This Delivery does not belongs to this deliveryman',
      });
    }

    const { count } = await Delivery.findAndCountAll({
      where: {
        deliveryman_id,
        start_date: null,
        signature_id: null,
      },
    });

    if (count === 5) {
      return res.status(400).json({ error: 'Cannot withdraw more' });
    }

    const { start_date } = req.body;
    const start_dateRef = parseISO(start_date);

    if (
      isBefore(
        start_dateRef,
        setSeconds(setMinutes(setHours(new Date(), 8), 0), 0)
      ) ||
      isAfter(
        start_dateRef,
        setSeconds(setMinutes(setHours(new Date(), 18), 0), 0)
      )
    ) {
      return res.status(400).json({ error: 'Cannot withdraw out of the time' });
    }

    await delivery.update({ start_date });

    return res.json({});
  }
}

export default new DeliveryStatusController();
