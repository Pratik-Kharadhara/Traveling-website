import { Request, Response } from 'express';
import { dbStore } from '../store/repository';

export const getHotels = (req: Request, res: Response) => {
  try {
    const { city, minPrice, maxPrice } = req.query;
    let hotels = dbStore.hotels;

    if (city) {
      const q = (city as string).toLowerCase();
      hotels = hotels.filter(h =>
        h.city.toLowerCase().includes(q) ||
        h.name.toLowerCase().includes(q) ||
        h.country.toLowerCase().includes(q)
      );
    }
    if (minPrice) {
      hotels = hotels.filter(h => h.pricePerNight >= Number(minPrice));
    }
    if (maxPrice) {
      hotels = hotels.filter(h => h.pricePerNight <= Number(maxPrice));
    }

    return res.json({ success: true, count: hotels.length, data: hotels });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const getFlights = (req: Request, res: Response) => {
  try {
    const { from, to, travelClass } = req.query;
    let flights = dbStore.flights;

    if (from) {
      const q = (from as string).toLowerCase();
      flights = flights.filter(f => f.from.toLowerCase().includes(q) || f.fromCode.toLowerCase().includes(q));
    }
    if (to) {
      const q = (to as string).toLowerCase();
      flights = flights.filter(f => f.to.toLowerCase().includes(q) || f.toCode.toLowerCase().includes(q));
    }
    if (travelClass && travelClass !== 'All') {
      flights = flights.filter(f => f.class.toLowerCase() === (travelClass as string).toLowerCase());
    }

    return res.json({ success: true, count: flights.length, data: flights });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
