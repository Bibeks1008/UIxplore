import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Element } from './schemas';
import { Model } from 'mongoose';

@Injectable()
export class ElementService {
  constructor(
    @InjectModel(Element.name) private elementModel: Model<Element>,
  ) {}

  async getAllElementScreenshots() {
    const elementScreenshots = await this.elementModel
      .find()
      .populate('website', 'name url');

    return elementScreenshots;
  }
}
