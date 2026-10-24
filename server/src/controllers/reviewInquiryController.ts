import { Request, Response } from 'express';
import { dbStore } from '../store/repository';

export const getReviews = async (req: Request, res: Response) => {
  try {
    const { packageId } = req.query;
    const reviews = await dbStore.getReviews(packageId as string);
    return res.json({ success: true, count: reviews.length, data: reviews });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const createReview = async (req: Request, res: Response) => {
  try {
    const { packageId, userName, userAvatar, location, rating, title, comment } = req.body;
    if (!userName || !rating || !comment) {
      return res.status(400).json({ success: false, message: 'Missing required review fields' });
    }

    const newRev = await dbStore.addReview({
      packageId,
      userName,
      userAvatar: userAvatar || `https://api.dicebear.com/7.x/notionists/svg?seed=${encodeURIComponent(userName)}`,
      location: location || 'Global Traveler',
      rating: Number(rating),
      title: title || 'Exceptional Expedition',
      comment
    });

    return res.status(201).json({ success: true, message: 'Review published successfully', data: newRev });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const likeReview = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updated = await dbStore.likeReview(id);
    if (!updated) {
      return res.status(404).json({ success: false, message: 'Review not found' });
    }
    return res.json({ success: true, helpful: updated.helpful });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const submitInquiry = async (req: Request, res: Response) => {
  try {
    const { name, email, phone, destination, travelDate, guests, message } = req.body;
    if (!name || !email || !message) {
      return res.status(400).json({ success: false, message: 'Please provide your name, email, and message.' });
    }

    const inq = await dbStore.createInquiry({
      name,
      email,
      phone,
      destination: destination || 'Bespoke Private Journey',
      travelDate,
      guests: Number(guests) || 2,
      message
    });

    return res.status(201).json({
      success: true,
      message: 'Thank you. Our luxury concierge will connect with you within 24 hours.',
      data: inq
    });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
