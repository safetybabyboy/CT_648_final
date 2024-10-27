import { Router } from 'express';
import { createUser, findUserByUsernameOrEmail } from '../models/user';

const router = Router();

// Route สำหรับสมัครสมาชิก (SignUp)
router.post('/signup', async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const existingUser = await findUserByUsernameOrEmail(username, email);

    if (existingUser) {
      return res.status(400).json({ success: false, message: 'Username or email already exists' });
    }

    // บันทึกรหัสผ่านโดยตรง (ไม่แฮช)
    const newUser = await createUser(username, email, password);
    return res.status(201).json({ success: true, user: newUser });
  } catch (error) {
    console.error('Signup error:', error);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Route สำหรับเข้าสู่ระบบ (Login)
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await findUserByUsernameOrEmail(username, username);

    if (!user) {
      return res.status(400).json({ success: false, message: 'Invalid username or password' });
    }

    // เปรียบเทียบรหัสผ่านโดยตรง (ไม่แฮช)
    if (user.get('password') !== password) {
      return res.status(400).json({ success: false, message: 'Invalid username or password' });
    }

    res.status(200).json({ success: true, username: user.get('username') });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

export default router;



