import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
const port = 4000;
async function NestApplication() {
  try {
    const app = await NestFactory.create<NestExpressApplication>(AppModule);
    app.enableCors();
    app.useGlobalPipes(new ValidationPipe({ forbidUnknownValues: false }));
    await app.listen(port);
    Logger.log(`Server started at port ${port}`);
  } catch (e) {
    Logger.error(`Error starting server!`);
  }
}
NestApplication().catch((e) => {
  Logger.error(`?  Error starting server, ${e}`, '', 'Bootstrap', false);
  throw e;
});
