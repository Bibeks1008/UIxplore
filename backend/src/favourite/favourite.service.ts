import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Favourite } from './schemas';
import { Model } from 'mongoose';

@Injectable()
export class FavouriteService {
  constructor(
    @InjectModel(Favourite.name) private favouriteModel: Model<Favourite>,
  ) {}

  async addToFavourite(websiteId: string, userId: string) {
    const existingFavourite = await this.favouriteModel.findOne({
      user: userId,
      website: websiteId,
    });

    if (existingFavourite) {
      throw new HttpException(
        'Website is already in Favourites',
        HttpStatus.CONFLICT,
      );
    }

    const newFavourite = new this.favouriteModel({
      user: userId,
      website: websiteId,
    });

    await newFavourite.save();

    return {
      message: 'Website added to Favourites successfully',
      payload: { data: newFavourite },
    };
  }

  async getFavouriteWebsites(userId: string) {
    let Favourites: any;
    try {
      Favourites = await this.favouriteModel
        .find({ user: userId })
        .populate('user')
        .populate('website');
    } catch (err) {
      console.log(err);
    }

    return {
      message: 'Favourites retrieved successfully',
      payload: { data: Favourites },
    };
  }

  async removeFromFavourite(websiteId: string) {
    const favourite = await this.favouriteModel.findOneAndDelete({
      website: websiteId,
    });

    return {
      message: 'Favourite removed successfully',
      payload: { data: favourite },
    };
  }
}
