# Hướng dẫn sử dụng Dashboard - Tiến trình học tập

## 🎯 **Tính năng Dashboard**

### 📊 **Trang Tổng quan:**
- **Thống kê tổng hợp**: Số bài trắc nghiệm đã làm, điểm trung bình, bài tập hoàn thành, câu hỏi đã đặt
- **Hoạt động gần đây**: Hiển thị các hoạt động học tập mới nhất
- **Biểu đồ tiến độ**: Trực quan hóa quá trình học tập

### 🏆 **Tab Trắc nghiệm:**
- **Lịch sử làm bài**: Tất cả kết quả trắc nghiệm đã làm
- **Điểm số chi tiết**: Điểm từng bài, phần trăm đúng/sai
- **Phân loại màu sắc**: 
  - 🟢 Xanh lá: ≥80% (Giỏi)
  - 🟡 Vàng: 60-79% (Khá)
  - 🔴 Đỏ: <60% (Cần cải thiện)
- **Thông tin chi tiết**: Thời gian làm bài, loại câu hỏi, chương/bài

### 📚 **Tab Bài tập:**
- **Danh sách hoàn thành**: Tất cả bài tập đã làm
- **Thời gian hoàn thành**: Ngày giờ cụ thể
- **Trạng thái**: Hiển thị badge "Hoàn thành" với icon ✅
- **Phân loại theo chương**: Dễ dàng theo dõi tiến độ từng chương

### 💬 **Tab Hỏi đáp:**
- **Câu hỏi đã đặt**: Tất cả câu hỏi của user
- **Trạng thái giải quyết**: 
  - ✅ Đã giải quyết (màu xanh)
  - ⏰ Chờ trả lời (màu vàng)
- **Điểm upvote**: Số lượt thích từ cộng đồng
- **Thông tin chi tiết**: Chương/bài, ngày đăng

## 🔗 **Cách truy cập Dashboard:**

### **Từ Trang chủ:**
1. Đăng nhập tài khoản
2. Nhấn nút **"Tiến trình học tập"** ở góc phải trên
3. Hoặc vào URL: `/dashboard`

### **Từ Sidebar:**
1. Đăng nhập tài khoản  
2. Nhấn **"Tiến trình học tập"** trong sidebar (chỉ hiện khi đăng nhập)

### **Từ kết quả bài tập:**
1. Hoàn thành trắc nghiệm/bài tập
2. Nhấn link **"Xem tiến trình học tập →"** trong thông báo

## 📱 **Giao diện thân thiện:**
- **Responsive design**: Hoạt động mượt trên mọi thiết bị
- **Loading states**: Hiển thị trạng thái tải dữ liệu
- **Empty states**: Thông báo khi chưa có dữ liệu
- **Color coding**: Màu sắc trực quan cho từng loại hoạt động

## 🔐 **Bảo mật & Quyền riêng tư:**
- **Chỉ user đăng nhập** mới thấy dashboard
- **Dữ liệu cá nhân**: Mỗi user chỉ thấy dữ liệu của mình
- **Firebase Security Rules**: Bảo vệ dữ liệu ở cấp database

## 📸 **Hệ thống Upload ảnh (Q&A):**

### **Firebase Storage Integration:**
- **Upload thực tế**: Ảnh được lưu trên Firebase Storage
- **URL bền vững**: Link ảnh không bị mất
- **Tối ưu dung lượng**: Tự động nén và tối ưu
- **Bảo mật**: Chỉ user đăng nhập mới upload được

### **Tính năng Upload:**
- **Đa ảnh**: Upload nhiều ảnh cùng lúc
- **Preview**: Xem trước ảnh trước khi đăng
- **Loading state**: Hiển thị tiến trình upload
- **Error handling**: Thông báo lỗi nếu upload thất bại
- **Fallback**: Dự phòng nếu Firebase không khả dụng

### **Cách sử dụng:**
1. **Đặt câu hỏi**: Nhấn "Chọn ảnh" → Chọn file → Xem preview → Đăng
2. **Trả lời**: Tương tự, có thể đính kèm ảnh minh họa
3. **Chỉnh sửa**: Có thể thêm/xóa ảnh khi edit câu hỏi/trả lời

## 🚀 **Lợi ích cho User:**
- **Theo dõi tiến độ**: Biết mình đã học được gì
- **Động lực học tập**: Thấy được sự tiến bộ qua thời gian  
- **Phát hiện điểm yếu**: Biết chương nào cần ôn lại
- **Chia sẻ thành tích**: Screenshot dashboard để khoe bạn bè
- **Lập kế hoạch**: Dựa vào dữ liệu để học hiệu quả hơn

**Dashboard giúp việc học toán trở nên có hệ thống và thú vị hơn!** 📈✨