import { Request, Response } from 'express';
import { dbStore } from '../store/repository';

export const createBooking = async (req: Request, res: Response) => {
  try {
    const { userId, userEmail, userName, type, itemTitle, details, startDate, endDate, guests, totalPrice } = req.body;
    
    if (!userId || !userEmail || !itemTitle || !totalPrice) {
      return res.status(400).json({ success: false, message: 'Missing required booking information' });
    }

    const newBooking = await dbStore.createBooking({
      userId,
      userEmail,
      userName: userName || 'Valued Guest',
      type: type || 'package',
      itemTitle,
      details: details || 'Standard Reservation',
      startDate: startDate || new Date().toISOString().split('T')[0],
      endDate: endDate || new Date(Date.now() + 86400000 * 7).toISOString().split('T')[0],
      guests: Number(guests) || 1,
      totalPrice: Number(totalPrice),
      status: 'confirmed'
    });

    return res.status(201).json({
      success: true,
      message: 'Booking successfully confirmed!',
      data: newBooking
    });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const getUserBookings = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const bookings = await dbStore.getBookingsByUserId(userId);
    return res.json({ success: true, count: bookings.length, data: bookings });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const getAllBookings = async (_req: Request, res: Response) => {
  try {
    const bookings = await dbStore.getAllBookings();
    return res.json({ success: true, count: bookings.length, data: bookings });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const updateBookingStatus = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const updated = await dbStore.updateBookingStatus(id, status);
    if (!updated) {
      return res.status(404).json({ success: false, message: 'Booking not found' });
    }
    return res.json({ success: true, message: `Status updated to ${status}`, data: updated });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteBooking = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const ok = await dbStore.deleteBooking(id);
    if (!ok) {
      return res.status(404).json({ success: false, message: 'Booking not found' });
    }
    return res.json({ success: true, message: 'Booking cancelled and removed' });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
