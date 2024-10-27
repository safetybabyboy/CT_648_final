import { DataTypes, Op } from 'sequelize';
import { sequelize } from '../config/db';

// โมเดลผู้ใช้
const User = sequelize.define('User', {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  timestamps: true,
});

// ฟังก์ชันสร้างผู้ใช้ใหม่
export const createUser = async (username: string, email: string, password: string) => {
  return await User.create({ username, email, password }); // บันทึกตรง ๆ โดยไม่แฮช
};

// ฟังก์ชันค้นหาผู้ใช้
export const findUserByUsernameOrEmail = async (username: string, email: string) => {
  return await User.findOne({
    where: {
      [Op.or]: [{ username }, { email }],
    },
  });
};

export default User;

