import * as Yup from 'yup';

import Delivery from '../models/Delivery';
import Recipient from '../models/Recipient';
import Deliveryman from '../models/Deliveryman';
import DeliveryProblem from '../models/DeliveryProblem';

import Queue from '../../lib/Queue';
import CancellationMail from '../jobs/CancellationMail';

class DeliveryProblemsController {
  async index(req, res) {
    const problems = await DeliveryProblem.findAll({
      attributes: ['id', 'description'],
      include: [
        {
          model: Delivery,
          as: 'delivery',
          attributes: ['id', 'product'],
          include: [
            {
              model: Recipient,
              as: 'recipient',
              attributes: ['id', 'name'],
            },
            {
              model: Deliveryman,
              as: 'deliveryman',
              attributes: ['id', 'name', 'email'],
            },
          ],
        },
      ],
    });

    if (!problems) {
      return res.status(400).json({ error: 'Error not found' });
    }

    return res.json(problems);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      description: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'validation fails' });
    }

    const { id } = req.params;

    const delivery = await Delivery.findByPk(id);

    if (!delivery) {
      return res.status(400).json({ error: 'Delivery does not exists' });
    }
    if (!delivery.start_date) {
      return res
        .status(400)
        .json({ error: 'This delivery has not been withdrawn' });
    }

    const { description } = req.body;

    const deliveryProblem = await DeliveryProblem.create({
      delivery_id: id,
      description,
    });

    return res.json(deliveryProblem);
  }

  async destroy(req, res) {
    const { id } = req.params;

    const { delivery_id, description } = await DeliveryProblem.findById(id);

    const delivery = await Delivery.findByPk(delivery_id, {
      include: [
        {
          model: Deliveryman,
          as: 'deliveryman',
          attributes: ['id', 'name', 'email'],
        },
        {
          model: Recipient,
          as: 'recipient',
        },
      ],
    });

    await delivery.update({ canceled_at: new Date() });

    await DeliveryProblem.findByIdAndDelete(id);

    await Queue.add(CancellationMail.key, {
      deliveryman: delivery.deliveryman,
      description,
      recipient: delivery.recipient,
      product: delivery.product,
    });

    return res.json({});
  }
}
export default new DeliveryProblemsController();
