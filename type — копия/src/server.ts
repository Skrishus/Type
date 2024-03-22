import express, { Request, Response } from 'express';
import mongoose, { ConnectOptions } from 'mongoose';

const app = express();
const PORT = process.env.PORT || 3000;

// Подключение к MongoDB
const options: ConnectOptions & { useNewUrlParser: boolean } = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };
  

mongoose.connect('mongodb://localhost:27017/mydatabase', options);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Определение схемы и модели данных MongoDB
interface User {
  name: string;
  email: string;
  password: string;
}

const userSchema = new mongoose.Schema<User>({
  name: String,
  email: String,
  password: String,
});

const UserModel = mongoose.model<User>('User', userSchema);

// Определение маршрутов
app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

app.post('/users', async (req: Request, res: Response) => {
  try {
    const newUser = new UserModel({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Запуск сервера
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
