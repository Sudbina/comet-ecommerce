import mongoose from 'mongoose';
import colors from 'colors';

const connect = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true,
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline);
  } catch (error) {
    console.error(`Error: ${error}`.red.underline.bold);
    process.exit(1);
  }
};

export default connect;
