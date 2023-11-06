import { Test, TestingModule } from '@nestjs/testing';
import { PostagensController } from './postagens.controller';
import { PostagensService } from './postagens.service';

describe('PostagensController', () => {
  let controller: PostagensController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PostagensController],
      providers: [PostagensService],
    }).compile();

    controller = module.get<PostagensController>(PostagensController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
