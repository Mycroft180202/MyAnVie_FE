export const API_URL = 'https://myanviebe.onrender.com/api';

export const PAYMENT_METHODS = {
  COD: 0,
  VNPAY: 1,
  QR:2,
};

export const VNPAY_RESPONSE_CODES: { [key: string]: string } = {
  '00': 'Giao dịch thành công',
  '07': 'Trừ tiền thành công. Giao dịch bị nghi ngờ (liên quan tới lừa đảo, giao dịch bất thường).',
  '09': 'Giao dịch không thành công do: Thẻ/Tài khoản của khách hàng chưa đăng ký dịch vụ InternetBanking tại ngân hàng.',
  '10': 'Giao dịch không thành công do: Khách hàng xác thực thông tin thẻ/tài khoản không đúng quá 3 lần',
  '11': 'Giao dịch không thành công do: Đã hết hạn chờ thanh toán. Vui lòng thực hiện lại giao dịch.',
  '12': 'Giao dịch không thành công do: Thẻ/Tài khoản của khách hàng bị khóa.',
  '13': 'Giao dịch không thành công do: Sai mật khẩu OTP.',
  '24': 'Giao dịch không thành công do: Khách hàng hủy giao dịch.',
  '51': 'Giao dịch không thành công do: Tài khoản của quý khách không đủ số dư để thực hiện giao dịch.',
  '65': 'Giao dịch không thành công do: Tài khoản của Quý khách vượt quá hạn mức giao dịch trong ngày.',
  '75': 'Ngân hàng phát hành của thẻ quý khách đang sử dụng không cho phép giao dịch trực tuyến.',
  '79': 'Giao dịch không thành công do: KH nhập sai mật khẩu thanh toán quá số lần quy định. Vui lòng liên hệ Ngân hàng phát hành thẻ để được hỗ trợ.',
  '99': 'Các lỗi khác (lỗi kỹ thuật, lỗi hệ thống, v.v.)',
}; 