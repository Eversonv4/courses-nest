import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Res,
  Patch,
  Delete,
  BadRequestException,
} from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CourseDto } from './dtos/course.dto';

@Controller('courses')
export class CoursesController {
  constructor(private coursesService: CoursesService) {}

  @Get('')
  findAll() {
    return this.coursesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.coursesService.findOne(id);
  }

  @Post()
  create(@Body() body: CourseDto) {
    const { name, description, tags } = body;
    if (!name || !description || !tags) {
      const errorMessage = {
        ...(!name && { name: 'name is missing' }),
        ...(!description && { description: 'description is missing' }),
        ...(!tags && { tags: 'tags is missing' }),
      };

      throw new BadRequestException(errorMessage);
    }

    return this.coursesService.createCourse({ name, description, tags });
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() body) {
    return (
      'Updated property ' + JSON.stringify(body) + ' to course with id: ' + id
    );
  }

  @Delete(':id')
  deleteCourse(@Param('id') id: string) {
    return 'deleted course #' + id;
  }
}