import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { FavouriteService } from './favourite.service';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/decorator';

@UseGuards(AuthGuard('jwt'))
@Controller('favourite')
export class FavouriteController {
  constructor(private favouriteService: FavouriteService) {}

  @Post()
  addtoFavourite(
    @Body() dto: { websiteId: string },
    @GetUser('_id') userId: string,
  ) {
    return this.favouriteService.addToFavourite(dto.websiteId, userId);
  }

  @Get()
  getFavouriteWebsites(@GetUser('_id') userId: string) {
    return this.favouriteService.getFavouriteWebsites(userId);
  }

  @Delete(':websiteId')
  removeFromFavourite(@Param('websiteId') websiteId: string) {
    return this.favouriteService.removeFromFavourite(websiteId);
  }
}
