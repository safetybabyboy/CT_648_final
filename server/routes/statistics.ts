import { Router } from 'express';
import Statistic from '../models/Statistic';

const router = Router();

// เพิ่มสถิติการเล่นเกม
router.post('/add', async (req, res) => {
  const { username, score, time } = req.body;
  try {
    const newStatistic = await Statistic.create({
      username,
      score,
      time,
      date: new Date(),
    });
    res.status(201).json(newStatistic);
  } catch (error) {
    console.error('Error saving statistic:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// ดึงข้อมูลสถิติและเรียงลำดับ
router.get('/', async (req, res) => {
  try {
    const statistics = await Statistic.findAll({
      order: [
        ['score', 'DESC'], // คะแนนจากมากไปน้อย
        ['time', 'ASC'], // เวลาเล่นจากน้อยไปมาก
      ],
    });
    res.status(200).json(statistics);
  } catch (error) {
    console.error('Error fetching statistics:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;