import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
const port = 4000;
async function App() {
  try {
    const app = await NestFactory.create<NestExpressApplication>(AppModule);
    await app.listen(port);
    console.log(`Server started at port ${port}`);
  } catch (e) {
    console.log(`Error starting server!`);
  }
}
App();
