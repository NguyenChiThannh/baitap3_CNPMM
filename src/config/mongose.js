import mongoose from "mongoose";

// Hàm kết nối đến cơ sở dữ liệu MongoDB
const connectDB = async () => {
    try {
        // Kết nối đến cơ sở dữ liệu MongoDB
        await mongoose.connect('mongodb://localhost:27017/MyStore');
        // Nếu kết nối thành công, in ra thông báo
        console.log('Connect Mongodb successful');
    } catch (error) {
        // Nếu có lỗi trong quá trình kết nối, in ra thông báo lỗi
        console.error(error.message);
        // Kết thúc quá trình bằng mã lỗi 1
        process.exit(1);
    }
}

// Xuất hàm connectDB để sử dụng ở nơi khác trong ứng dụng
export default connectDB;