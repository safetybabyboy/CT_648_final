import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../config/db';

// กำหนดประเภทข้อมูลของสถิติ
interface StatisticAttributes {
  id: number;
  username: string;
  score: number;
  time: number;
  date: Date;
}

// ทำให้ `id` เป็น Optional สำหรับการสร้างข้อมูลใหม่
interface StatisticCreationAttributes
  extends Optional<StatisticAttributes, 'id'> {}

// กำหนดโมเดล Statistic
class Statistic
  extends Model<StatisticAttributes, StatisticCreationAttributes>
  implements StatisticAttributes {
  public id!: number;
  public username!: string;
  public score!: number;
  public time!: number;
  public date!: Date;
}

// สร้างตารางโดยใช้ Sequelize
Statistic.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    score: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    time: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0, // เพิ่มค่าเริ่มต้นเป็น 0 เพื่อลดข้อผิดพลาด
    },
    date: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW, // ค่าเริ่มต้นเป็นวันที่ปัจจุบัน
    },
  },
  {
    sequelize, // เชื่อมต่อกับ instance ของ Sequelize
    tableName: 'Statistics', // ชื่อตารางในฐานข้อมูล
    timestamps: false, // ปิดการใช้งาน createdAt และ updatedAt
  }
);

export default Statistic;

