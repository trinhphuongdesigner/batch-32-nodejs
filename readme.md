1. Lọc theo khoảng (number)
2. Lọc theo từ khóa (name)
3. Lọc theo ID (categoryId)

0 --------------100--- *

20-------100

20------------ *
0 --------------100

start
end

$eq >< $ne
$gt >< $lt
$gte >< $lte
$in >< $nin

1 2 3 4 5 6 7 8 9 10 11 12 13 14 15

15 => 3 xóa  2 nam 1 nữ
7 nam 5 nữ

chưa xóa && nam => 7

size 4 => 2
15 => 4


Kiểm tra khách hàng
Kiểm tra nhân viên
Kiểm tra từng sản phẩm, trong đó : kiểm tra sp có tồn tại, có bị xóa, số lượng mua có đủ không

Tạo đơn hàng => thành công thì cập nhập số lượng các sp tương ứng


'COMPLETED' => hoàn thành
'CANCELED' => người mua hủy
'REJECTED' => người bán hủy

'WAITING' => đợi duyệt
'DELIVERING' => đang giao

mongodb+srv://trinhphuongdev:<password>@cluster0.xrdmevl.mongodb.net/