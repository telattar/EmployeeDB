import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post } from '@nestjs/common';
import { ChildrenService } from './children.service';
import { CreateChildDto } from './dto/create-child.dto';
import { UpdateChildDto } from './dto/update-child.dto';

@Controller('children')
export class ChildrenController {
  constructor(private readonly childrenService: ChildrenService) { }

  @Get()
  async getAllChildren() {
    return await this.childrenService.getAllChildren();
  }

  @Get(':id')
  async getChild(@Param() id: string) {
    return await this.childrenService.getChild(id);
  }

  @Post()
  async createChild(@Body() data: CreateChildDto) {
    return await this.childrenService.createChlid(data);
  }

  @Patch(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async updateChild(@Param() id: string, @Body() details: UpdateChildDto) {
    return await this.childrenService.updateChild(id, details);
  }

  @Delete(':id')
  async deleteChild(@Param() id: string) {
    return await this.childrenService.deleteChild(id);
  }
}
