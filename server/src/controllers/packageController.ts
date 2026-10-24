import { Request, Response } from 'express';
import { dbStore } from '../store/repository';

export const getPackages = async (req: Request, res: Response) => {
  try {
    const { category, search, minPrice, maxPrice } = req.query;
    const filter = {
      category: category as string,
      search: search as string,
      minPrice: minPrice ? Number(minPrice) : undefined,
      maxPrice: maxPrice ? Number(maxPrice) : undefined
    };
    const packages = await dbStore.getAllPackages(filter);
    return res.json({ success: true, count: packages.length, data: packages });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const getPackageById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const pkg = await dbStore.getPackageById(id);
    if (!pkg) {
      return res.status(404).json({ success: false, message: 'Package not found' });
    }
    return res.json({ success: true, data: pkg });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const createPackage = async (req: Request, res: Response) => {
  try {
    const newPkg = await dbStore.addPackage(req.body);
    return res.status(201).json({ success: true, message: 'Package created successfully', data: newPkg });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const updatePackage = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updated = await dbStore.updatePackage(id, req.body);
    if (!updated) {
      return res.status(404).json({ success: false, message: 'Package not found' });
    }
    return res.json({ success: true, message: 'Package updated', data: updated });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const deletePackage = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const success = await dbStore.deletePackage(id);
    if (!success) {
      return res.status(404).json({ success: false, message: 'Package not found' });
    }
    return res.json({ success: true, message: 'Package deleted' });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
