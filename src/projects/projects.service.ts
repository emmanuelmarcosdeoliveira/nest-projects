import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { Project } from './entities/project.entity';

@Injectable()
export class ProjectsService {
  private readonly projects: Project[] = [];
  private id: number = 1;
  create(createProjectDto: CreateProjectDto) {
    const newProject = {
      id: this.id,
      name: createProjectDto.name,
      description: createProjectDto.description,
      imageURL: createProjectDto.imageURL,
    };
    this.id = this.id + 1;
    this.projects.push(newProject);
    return newProject;
  }

  findAll() {
    return this.projects;
  }

  findOne(id: number) {
    const project = this.projects.find((item) => item.id === id);
    if (!project) {
      throw new NotFoundException('Projeto não encontrado');
    }
    return project;
  }

  update(id: number, updateProjectDto: UpdateProjectDto) {
    const project = this.findOne(id);

    project.name = updateProjectDto.name;
    project.description = updateProjectDto.description;
    project.imageURL = updateProjectDto.imageURL;
    return;
  }

  remove(id: number) {
    this.findOne(id);
    const projectIndex = this.projects.findIndex((item) => item.id === id);
    this.projects.splice(projectIndex, 1);
    return;
  }
}
