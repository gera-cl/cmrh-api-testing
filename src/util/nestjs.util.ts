import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';

export async function getApp(): Promise<string | INestApplication<any>> {
  if (process.env.BASE_URL) {
    return process.env.BASE_URL;
  } else {
    const { AppModule } = await import(process.env.TEST_APP_MODULE_PATH)
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule]
    })
      .compile();
    const nestApplication = moduleFixture.createNestApplication();
    nestApplication.useGlobalPipes(new ValidationPipe())
    await nestApplication.init()
    return nestApplication;
  }
}