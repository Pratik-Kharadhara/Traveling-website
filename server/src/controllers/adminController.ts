import { Request, Response } from 'express';
import { dbStore } from '../store/repository';
import User from '../models/User';
import Booking from '../models/Booking';
import Package from '../models/Package';
import Inquiry from '../models/Inquiry';

export const getAdminMetrics = async (_req: Request, res: Response) => {
  try {
    if (dbStore.isMongoActive()) {
      const [bookings, totalUsers, totalPackages, totalInquiries] = await Promise.all([
        Booking.find(),
        User.countDocuments(),
        Package.countDocuments(),
        Inquiry.countDocuments()
      ]);
      const totalBookings = bookings.length;
      const confirmedBookings = bookings.filter(b => b.status === 'confirmed').length;
      const totalRevenue = bookings
        .filter(b => b.status === 'confirmed')
        .reduce((sum, b) => sum + b.totalPrice, 0);

      return res.json({
        success: true,
        stats: {
          totalRevenue,
          totalBookings,
          confirmedBookings,
          totalUsers,
          totalPackages,
          totalInquiries
        }
      });
    }

    const totalBookings = dbStore.bookings.length;
    const confirmedBookings = dbStore.bookings.filter(b => b.status === 'confirmed').length;
    const totalRevenue = dbStore.bookings
      .filter(b => b.status === 'confirmed')
      .reduce((sum, b) => sum + b.totalPrice, 0);
    const totalUsers = dbStore.users.length;
    const totalPackages = dbStore.packages.length;
    const totalInquiries = dbStore.inquiries.length;

    return res.json({
      success: true,
      stats: {
        totalRevenue,
        totalBookings,
        confirmedBookings,
        totalUsers,
        totalPackages,
        totalInquiries
      }
    });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const getAdminUsers = async (_req: Request, res: Response) => {
  try {
    if (dbStore.isMongoActive()) {
      const dbUsers = await User.find({}, '-passwordHash');
      const users = dbUsers.map(u => ({
        id: String(u._id),
        name: u.name,
        email: u.email,
        role: u.role,
        avatar: u.avatar
      }));
      return res.json({ success: true, count: users.length, data: users });
    }

    const users = dbStore.users.map(({ passwordHash, _id, ...rest }) => ({
      id: _id,
      ...rest
    }));
    return res.json({ success: true, count: users.length, data: users });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteAdminUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const ok = await dbStore.deleteUser(id);
    if (!ok) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    return res.json({ success: true, message: 'User account removed' });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
