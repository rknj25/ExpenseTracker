import Expense from "../models/expense.js";


export const expAdd=async(req,res)=>{
    try{
        const {title,amount,category}=req.body;
        await Expense.create({
            title:title,
            amount:amount,
            category:category
        })
        return res.json({message:"Expense Added.."})
    }
    catch{
        return res.json({message:"Expense Not Added.."})
    }
}

export const viewExp=async(req,res)=>{
    try{
        const data=await Expense.find();
        return res.json({message:"Data Found",
            data
        })
    }
    catch{
        return res.json({message:"Error in fetching expense Data"})
    }
}

export const updExp=async(req,res)=>{
    try{
        const {id}=req.params;
        const {title,amount,category}=req.body;
        await Expense.findByIdAndUpdate(id,
            {
                title:title,
                amount:amount,
                category:category
            }
        )
        return res.json({message:"Expense Updated.."})
    }
    catch{
        return res.json({message:"Error in Update"})
    }
}

export const dltExp=async(req,res)=>{
    try{
        const {id}=req.params;
        await Expense.findByIdAndDelete(id);
        return res.json({message:"Expense Deleted.."});
    }
    catch{
        return res.json({message:"Error in Delete"})
    }
}
export const findExp=async(req,res)=>{
    try{
        const {id}=req.params;
        const particular=await Expense.findById(id);
        return res.json({message:"Data Founded",
            particular
        })
    }
    catch{
        return res.json({message:"Not data Found"})
    }
}