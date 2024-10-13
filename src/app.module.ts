import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EmployeesModule } from './employees/employees.module';
import { DepartmentsModule } from './departments/departments.module';
import { ChildrenModule } from './children/children.module';

@Module({
  imports: [EmployeesModule, DepartmentsModule, ChildrenModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
