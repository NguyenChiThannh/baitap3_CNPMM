import mongoose, { Schema } from "mongoose";

// Định nghĩa schema cho Customer
const customers = new mongoose.Schema({
    CustomerID: {
        type: Number,
        required: true, // Trường này bắt buộc phải có
        min: [1, 'Value > 0, {VALUE} invalid'], // Giá trị tối thiểu là 1
        validate: {
            validator: Number.isInteger,
            message: '{VALUE} is not an integer value'
        }
    },
    Gender: {
        type: String,
        required: true, // Trường này bắt buộc phải có
        enum: {
            values: ['Male', 'Female'],
            message: '{VALUE} is not supported'
        }, // Chỉ chấp nhận giá trị 'male' hoặc 'female'
    },
    Age: {
        type: Number,
        required: true, // Trường này bắt buộc phải có
        min: [0, 'Value >= 0, {VALUE} invalid'], // Giá trị tối thiểu là 0
        default: 0,
    },
    AnnualIncome: {
        type: Number,
        required: true, // Trường này bắt buộc phải có
        min: [0, 'Value >= 0, {VALUE} invalid'], // Giá trị tối thiểu là 0
        default: 0,
    },
    SpendingScore: {
        type: Number,
        required: true, // Trường này bắt buộc phải có
        min: [1, 'Value > 0, {VALUE} invalid'], // Giá trị tối thiểu là 1
    },
    Profession: {
        type: String,
        required: true // Trường này bắt buộc phải có
    },
    WorkExperience: {
        type: Number,
        required: true, // Trường này bắt buộc phải có
        min: [0, 'Value >= 0, {VALUE} invalid'], // Giá trị tối thiểu là 0
        default: 0,
    },
    FamilySize: {
        type: Number,
        required: true, // Trường này bắt buộc phải có
        min: [1, 'Value > 0, {VALUE} invalid'], // Giá trị tối thiểu là 1
        default: 1,
    }
});

// Tạo model Customer từ schema
const Customer = mongoose.model('Customer', customers);

// Hàm để tạo một customer mới
const createOne = async (data) => {
    try {
        const newCustomer = new Customer(data); // Tạo instance mới từ data
        return await newCustomer.save(); // Lưu vào cơ sở dữ liệu
    } catch (error) {
        throw new Error(error); // Xử lý lỗi nếu có
    }
}

// Hàm để tạo nhiều customer cùng lúc
const createAll = async (data) => {
    try {
        return await Customer.insertMany(data, { validate: true }); // Chèn nhiều bản ghi và bật validation
    } catch (error) {
        throw new Error(error); // Xử lý lỗi nếu có
    }
}

// Hàm để cập nhật thông tin của một customerId
const updateOne = async (CustomerID, data) => {
    try {
        return await Customer.findOneAndUpdate({ CustomerID: CustomerID }, data, { new: true, runValidators: true });
    } catch (error) {
        throw new Error(error); // Xử lý lỗi nếu có
    }
}

// Hàm để lấy thông tin của một customer theo id
const getOne = async (CustomerID) => {
    try {
        return await Customer.findOne({ CustomerID }); // Tìm một bản ghi theo id
    } catch (error) {
        throw new Error(error); // Xử lý lỗi nếu có
    }
}

// Hàm để lấy thông tin của tất cả customers
const getAll = async () => {
    try {
        return await Customer.find(); // Tìm tất cả bản ghi
    } catch (error) {
        throw new Error(error); // Xử lý lỗi nếu có
    }
}

// Hàm để xóa một customer theo CustomerId
const deleteOne = async (CustomerID) => {
    try {
        return await Customer.findOneAndDelete({ CustomerID }); // Xóa bản ghi theo CustomerId
    } catch (error) {
        throw new Error(error); // Xử lý lỗi nếu có
    }
}

// Export các phương thức để sử dụng ở nơi khác
export const CustomerMethod = {
    createOne,
    createAll,
    getOne,
    getAll,
    updateOne,
    deleteOne,
}