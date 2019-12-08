import {
  Controller,
  Get,
  Post,
  Response,
  Body,
  HttpStatus,
  Param,
  HttpCode,
} from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    console.log('get hook cathed!');
    return this.appService.getHello();
  }

  @Post()
  async catchHooks(@Response() res: any, @Body() body: any) {
    console.log('post hook cathed!', body);
    return res.status(HttpStatus.OK).json();
  }
}
