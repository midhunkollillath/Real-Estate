import Listing from "../models/listModal.js";
import { errorHandler } from "../utils/error.js";

export const createList=async(req,res,next)=>{
    try {
        console.log(req.body)
        const listing = await Listing.create(req.body);
        return res.status(200).send({
            status:1,
            success:true,
            listing,
            message:'List created Successfully',
        })
    } catch (error) {
        next(error);
        console.log(error,'error in craete list')
    }
}
export const deleteList =async(req,res,next)=>{
    const listing = await Listing.findById(req.params.id);

    if (!listing) {
      return next(errorHandler(404, 'Listing not found!'));
    }
  
    if (req.user.id !== listing.userRef) {
      return next(errorHandler(401, 'You can only delete your own listings!'));
    }
    try {
     await Listing.findByIdAndDelete(req.params.id);
     res.status(200).json('Listing has been deleted!');
    } catch (error) {
        next(error)
        console.log(error)

    }
}
export const updateListing=async(req,res,next)=>{
    try {
        
        const listing = await Listing.findById(req.params.id)
        if(!listing){
            return next(errorHandler(404,'Listing not found'))
        }
        if(req.user.id !==listing.userRef){
            return next(errorHandler(401,'You can only update your own list'))
        }
        const updateListing = await Listing.findByIdAndUpdate(req.params.id,
            req.body,
            {new:true});
            res.status(200).json(updateListing)
    } catch (error) {
        next(error)
    }
}
export const getListing=async(req,res,next)=>{
    try {
        const listing = await Listing.findById(req.params.id)
        if(!listing){
            return next(errorHandler(404,'No Listing Found'))
        }
        res.status(200).json(listing)
    } catch (error) {
        next(error)
    }
}
export const getSearchListing = async (req, res, next) => {
    try {
        const limit = parseInt(req.query.limit) || 9;
        const startIndex = parseInt(req.query.startIndex) || 0;
        const offer = req.query.offer !== undefined ? req.query.offer === 'true' : { $in: [false, true] };
        const furnished = req.query.furnished !== undefined ? req.query.furnished === 'true' : { $in: [false, true] };
        const parking = req.query.parking !== undefined ? req.query.parking === 'true' : { $in: [false, true] };
        const type = req.query.type !== undefined && req.query.type !== 'all' ? req.query.type : { $in: ['sale', 'rent'] };
        const searchTerm = req.query.searchTerm || '';
        const sort = req.query.sort || 'createdAt';
        const order = req.query.order || 'desc';

        const listing = await Listing.find({
            name: { $regex: searchTerm, $options: 'i' },
            offer,
            furnished,
            parking,
            type
        })
        .sort({ [sort]: order })
        .limit(limit)
        .skip(startIndex);

        return res.status(200).json(listing);
    } catch (error) {
        next(error);
    }
};
