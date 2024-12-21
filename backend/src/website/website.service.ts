import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Website } from './schemas';
import { Model } from 'mongoose';
import { Page } from 'src/page/schemas';
import { Element } from 'src/element/schemas';
import { AddWebsiteDto } from './dto/addWebsite.dto';

@Injectable()
export class WebsiteService {
  constructor(
    @InjectModel(Website.name) private websiteModel: Model<Website>,
    @InjectModel(Page.name) private pageModel: Model<Page>,
    @InjectModel(Element.name) private elementModel: Model<Element>,
  ) {}
  async getAllWebsites() {
    const websites = await this.websiteModel.find().populate('category');
    const result = await Promise.all(
      websites?.map(async (website) => {
        const pageScreenshots = await this.pageModel.find({
          website: website._id,
        });
        return { website, pageScreenshots };
      }),
    );
    return result;
  }

  async getOneWebsite(websiteId: string) {
    const website = await this.websiteModel
      .findById(websiteId)
      .populate('category');
    const pageScreenshots = await this.pageModel.find({ website: website._id });
    const elementScreenshots = await this.elementModel.find({
      website: website._id,
    });

    let pageScreenshotsData = pageScreenshots.map((obj) => ({
      pageType: obj.page,
      imageUrl: obj.imageUrl,
      description: obj.description,
    }));

    let elementScreenshotsData = elementScreenshots.map((obj) => ({
      elementType: obj.element,
      imageUrl: obj.imageUrl,
    }));

    return {
      website,
      pageScreenshotsData,
      elementScreenshotsData,
    };
  }

  async addOneWebsite(dto: AddWebsiteDto) {
    const website = new this.websiteModel(dto);
    return website.save();
  }
}
