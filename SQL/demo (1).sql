-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 17, 2020 at 12:43 PM
-- Server version: 10.4.13-MariaDB
-- PHP Version: 7.4.7

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `demo`
--

-- --------------------------------------------------------

--
-- Table structure for table `account`
--

CREATE TABLE `account` (
  `account_id` int(11) NOT NULL,
  `account_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `account_image` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `account_email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `account_password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `account_birthday` date NOT NULL,
  `account_address` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `account_phone` varchar(11) COLLATE utf8mb4_unicode_ci NOT NULL,
  `account_level` int(11) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `account`
--

INSERT INTO `account` (`account_id`, `account_name`, `account_image`, `account_email`, `account_password`, `account_birthday`, `account_address`, `account_phone`, `account_level`) VALUES
(1, 'Ku Tam', '', 'tujiutujngoxtujkhoxjaj@gmail.com', '123456789', '2020-07-08', 'asdsadasdasd', '0948846277', 1),
(2, 'Truong Le', '', 'ntk74199@gmail.com', '123456789', '2020-07-14', 'adasdsadasdsd', '0496581212', 2),
(3, 'Bi Bi', '', 'thamtran284@gmail.com', '123456789', '2020-07-28', 'ádasdsa', '0165489756', 3),
(4, 'admin', '', 'admin@admin.4T.com', 'admin', '2020-07-19', 'ádadasdsa', '0123456789', 6);

-- --------------------------------------------------------

--
-- Table structure for table `account_level`
--

CREATE TABLE `account_level` (
  `level` int(10) NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `account_level`
--

INSERT INTO `account_level` (`level`, `name`) VALUES
(1, 'Độc giả'),
(2, 'Độc giả-Vip'),
(3, 'Phóng viên'),
(4, 'Phóng viên'),
(5, 'Biên tập viên'),
(6, 'Quản trị viên');

-- --------------------------------------------------------

--
-- Table structure for table `brands`
--

CREATE TABLE `brands` (
  `brand_id` int(11) NOT NULL,
  `brand_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `brand_slug` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `brand_status` tinyint(1) NOT NULL,
  `brand_cate` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `category_id` int(11) NOT NULL,
  `category_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `category_slug` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `category_status` int(10) NOT NULL,
  `category_cate` int(10) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`category_id`, `category_name`, `category_slug`, `category_status`, `category_cate`) VALUES
(1, 'Thời sự', '', 0, 0),
(2, 'Thế giới', '', 1, 0),
(3, 'Góc nhìn', '', 1, 0),
(4, 'Kinh doanh', '', 1, 0),
(5, 'Giải trí', '', 1, 0),
(6, 'Thể thao', '', 1, 0),
(7, 'Pháp luật', '', 1, 0),
(8, 'Giáo dục', '', 1, 0),
(9, 'Sức khỏe', '', 1, 0),
(10, 'Đời sống', '', 1, 0),
(11, 'Du lịch', '', 1, 0),
(12, 'Khoa học', '', 1, 0),
(13, 'Số hóa', '', 1, 0),
(14, 'Xe', '', 1, 0);

-- --------------------------------------------------------

--
-- Table structure for table `comments`
--

CREATE TABLE `comments` (
  `comment` int(11) NOT NULL,
  `content` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `post_id` int(11) NOT NULL,
  `account_id` int(11) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `comments`
--

INSERT INTO `comments` (`comment`, `content`, `post_id`, `account_id`) VALUES
(1, 'hay qua', 1, 0),
(2, 'qua hay', 1, 0),
(3, 'qua hay', 1, 0),
(4, 'qua hay', 2, 0),
(5, 'qua hay', 3, 0),
(6, 'qua hay', 4, 0),
(7, 'qua hay', 5, 0),
(8, 'qua hay', 5, 0),
(9, 'qua hay', 5, 0),
(10, 'qua hay', 5, 0);

-- --------------------------------------------------------

--
-- Table structure for table `posts`
--

CREATE TABLE `posts` (
  `post_id` int(11) NOT NULL,
  `post_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `post_slug` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `post_status` tinyint(1) NOT NULL,
  `post_image` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `post_created` timestamp NOT NULL DEFAULT current_timestamp(),
  `post_ browse` timestamp NULL DEFAULT NULL,
  `post_decs` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `post_cate` int(11) NOT NULL,
  `post_brand` int(11) NOT NULL,
  `post_level` int(11) NOT NULL DEFAULT 1,
  `post_views` int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `posts`
--

INSERT INTO `posts` (`post_id`, `post_name`, `post_slug`, `post_status`, `post_image`, `post_created`, `post_ browse`, `post_decs`, `post_cate`, `post_brand`, `post_level`, `post_views`) VALUES
(1, 'Ba ứng viên trúng tuyển vị trí vụ phó Ban Tổ chức Trung ương', 'ba-ung-vien-trung-tuyen-vi-tri-vu-pho-ban-to-chuc-trung-uong', 1, 'https://i1-vnexpress.vnecdn.net/2020/07/13/1-vienpho2-3893-1594612974.jpgw=680&amp;h=0&amp;q=100&amp;dpr=1&amp;fit=crop&amp;s=D19HSuaJ0_TfSM5TpifaWw', '2020-07-16 02:48:58', NULL, 'Ba ứng viên trúng tuyển vị trí vụ phó Ban Tổ chức Trung ương\r\nBan Tổ chức Trung ương tuyển chọn được ba Phó Viện trưởng Khoa học tổ chức, cán bộ sau cuộc thi tuyển cạnh tranh.\r\n\r\nBa ứng viên có điểm cao nhất trong số tám người tham dự kỳ thi tuyển chức danh Viện phó Viện Khoa học tổ chức, cán bộ. Đó là ông Lê Việt Trung, bà Trần Thị Minh và bà Trần Thị Thu Thủy.\r\n\r\nQuyết định bổ nhiệm được lãnh đạo Ban Tổ chức Trung ương trao chiều 12/7, có hiệu lực cùng ngày và có thời hạn 5 năm.\r\n\r\nBa ứng viên trúng tuyển vị trí vụ phó Ban Tổ chức Trung ương\r\nTrưởng Ban Tổ chức Trung ương Phạm Minh Chính cho biết, những ứng viên tham gia thi tuyển có trình độ, năng lực tương đối đồng đều, có sự chuẩn bị sản phẩm nghiên cứu công phu để trình bày trước Hội đồng. Sau 1,5 ngày làm việc, Hội đồng thi tuyển gồm những chuyên gia hàng đầu, giàu kinh nghiệm trong lĩnh vực tổ chức xây dựng Đảng đã chọn ba ứng viên xuất sắc nhất.\r\n\r\n\"Nghiên cứu khoa học là một lĩnh vực khó, đặc biệt đặt trong tổng thể lĩnh vực tổ chức xây dựng Đảng. Vì vậy, tôi mong những người được bổ nhiệm phát huy trách nhiệm, năng lực, góp phần cùng lãnh đạo đơn vị xây dựng một tập thể đoàn kết, trong sạch, vững mạnh\", ông Chính nói.\r\n\r\nTrưởng Ban Tổ chức Trung ương khẳng định thi tuyển chức danh lãnh đạo là chủ trương lớn, đúng đắn của Đảng, Nhà nước. Đây cũng là lần thứ năm Ban Tổ chức Trung ương tổ chức thi tuyển lãnh đạo cấp vụ, cục, đơn vị. \"Từ khâu đăng ký đến thi tuyển đều công khai, minh bạch, khách quan\", ông Chính nhấn mạnh.\r\n\r\nThay mặt những ứng viên vừa được bổ nhiệm, ông Lê Việt Trung hứa trong thời gian tới sẽ cùng lãnh đạo Viện phát huy sự đam mê, nhiệt huyết để xây dựng Viện Khoa học tổ chức, cán bộ ngày càng phát triển, trở thành viện nghiên cứu hàng đầu về tổ chức xây dựng Đảng.\r\n\r\nViện Khoa học tổ chức, cán bộ là đơn vị sự nghiệp trực thuộc Ban Tổ chức Trung ương, thành lập tháng 6/2019. Viện có chức năng tổng kết thực tiễn, nghiên cứu khoa học, góp phần xây dựng lý luận, làm cơ sở cho Ban Tổ chức Trung ương tham mưu cho Ban Chấp hành Trung ương, Bộ Chính trị, Ban Bí thư về công tác tổ chức, cán bộ, đảng viên và bảo vệ chính trị nội bộ... Lãnh đạo Viện Khoa học tổ chức, cán bộ gồm viện trưởng và không quá 3 phó viện trưởng.\r\n\r\nHội đồng thi tuyển chức danh Phó Viện trưởng Viện Khoa học tổ chức, cán bộ gồm 12 người:\r\n\r\n- Trưởng ban Tổ chức Trung ương Phạm Minh Chính, Chủ tịch Hội đồng.\r\n- Phó trưởng ban Thường trực Ban Tổ chức Trung ương Nguyễn Thanh Bình, Phó Chủ tịch Hội đồng.\r\n\r\nCác thành viên:\r\n\r\n- Phó trưởng Ban Tổ chức Trung ương Hà Ban.\r\n- Bộ trưởng Nội vụ, Phó trưởng Ban Tổ chức Trung ương Lê Vĩnh Tân.\r\n- Phó trưởng ban Tổ chức Trung ương, Phó trưởng ban Công tác đại biểu Quốc hội Nguyễn Thị Thanh.\r\n- Phó trưởng ban Tổ chức Trung ương Nguyễn Quang Dương.\r\n- Tổng biên tập Tạp chí Cộng sản Đoàn Minh Huấn.\r\n- Phó chủ tịch Hội đồng Lý luận Trung ương Tạ Ngọc Tấn.\r\n- Phó chủ tịch Viện Hàn lâm Khoa học xã hội Việt Nam Đặng Nguyên Anh.\r\n- Nguyên Phó giám đốc Học viện Chính trị quốc gia Hồ Chí Minh Nguyễn Viết Thảo.\r\n- Trợ lý trưởng ban, Viện trưởng Viện Khoa học tổ chức, cán bộ (Ban Tổ chức Trung ương) Dương Mộng Huyền.\r\n- Vụ trưởng Vụ Tổ chức cán bộ (Ban Tổ chức Trung ương) Dương Minh Đức.', 1, 0, 1, 0),
(3, 'Hầm chui cửa ngõ Tây Bắc TP HCM trước ngày thông xe', 'ham-chui-cua-ngo-tay-bac-tp-hcm-truoc-ngay-thong-xe', 1, 'https://i1-vnexpress.vnecdn.net/2020/07/12/Ham-chui-An-Suong-1594566475.jpg?w=1200&amp;h=0&amp;q=100&amp;dpr=1&amp;fit=crop&amp;s=5S9FS8JiefxgIYiwo1yb6g', '2020-07-16 02:48:58', NULL, 'Hầm chui cửa ngõ Tây Bắc TP HCM trước ngày thông xe\r\nSau hai năm thi công, nhánh còn lại của hầm chui An Sương (quận 12) đã hoàn thiện để chuẩn bị thông xe ngày 15/7.\r\n\r\n22\r\n\r\nNhánh N2 của hầm chui An Sương (quận 12) cho xe chạy theo hướng từ quốc lộ 22 (Tây Ninh) về trung tâm thành phố. Nhánh này thi công giữa năm 2018 và dự kiến hoàn thành trong năm. Tuy nhiên vì vướng đền bù, giải tỏa mặt bằng nên công trình ngừng thi công hơn một năm.\r\n\r\nTrước đó, tháng 3/2018 một nhánh của hầm theo hướng từ đường Trường Chinh đi quốc lộ 22 đã thông xe.\r\n\r\n\r\nĐoạn hầm hở đường Trường Chinh dài 150 m, còn hầm phía quốc lộ 22 dài 120 m. Tĩnh không lớn nhất của hầm cao gần 5 m. Vài ngày trước khi thông xe, công nhân đã hoàn thiện hầm, lắp đặt lan can, hệ thống thoát nước, chiếu sáng...\r\n\r\n\r\nĐoạn hầm kín chui qua gầm vòng xoay An Sương dài 125 m, rộng 9 m cho hai làn xe. Hầm đã lắp đầy đủ đèn, kẻ làn đường, hệ thống chữa cháy... Đoạn hầm này hơi uốn cong ở hai đầu đường Trường Chinh và quốc lộ 22.\r\n\r\n\r\n\r\nVì hầm kín hơi uốn cong nên nhánh N2 được lắp thêm các biển chỉ dẫn hướng đi trên thành. Tốc độ tối đa cho phép trong hầm là 50 km/h; cấm dừng đỗ xe trên suốt chiều dài hầm.\r\n\r\n\r\nTrước ngày thông xe, chỉ còn một vài công nhân tiến hành gia cố, móc sạch nhựa đường bám trên các khe thoát nước và vệ sinh hầm.\r\n\r\n\r\nMột công nhân khác dùng xi măng trám lại các đoạn chưa nhẵn mịn, vết nứt trên thành hầm.\r\n\r\n\r\n\r\nLan can làm bằng thép, có độ cao gần hai mét so với mặt đường.\r\n\r\n\r\nTrong khi đó, đoạn đường giữa hai nhánh hầm vẫn đang thi công, dự kiến hoàn thành trong tháng 9.\r\n\r\n\r\nỞ ngay lối ra của nhánh hầm N2 là cầu bộ hành đang thi công, dành cho khách băng qua quốc lộ 22 vào Bến xe An Sương, do khu vực này lưu lượng xe rất lớn. Cầu 53 m và rộng 3,6 m, kinh phí đầu tư hơn 10 tỷ đồng, dự kiến hoàn thành trong tháng 9.\r\n\r\n\r\n\r\nCông trình xây dựng hầm chui An Sương có vốn đầu tư hơn 500 tỷ đồng, được thiết kế với tuổi thọ 100 năm và chịu được động đất cấp 7. Đây là nút giao thông 3 tầng đầu tiên ở khu vực cửa ngõ Tây Bắc TP HCM.\r\n\r\nKhi hoàn thiện, tại ngã tư An Sương sẽ hình thành nút giao thông ba tầng. Công trình nhằm giải tỏa ùn tắc trục đường huyết mạch quốc lộ 1 từ TP HCM đi các tỉnh miền Đông, miền Tây và ngược lại, xóa điểm đen tai nạn giao thông nhiều năm liền tại đây.', 1, 0, 1, 0),
(4, 'Ngày kinh đô Huế thất thủ 135 năm trước', 'ngay-kinh-do-hue-that-thu-135-nam-truoc', 1, 'https://i1-vnexpress.vnecdn.net/2020/07/12/phao-dai-Tay-Thanh-6559-1594506313.jpg?w=680&amp;h=0&amp;q=100&amp;dpr=1&amp;fit=crop&amp;s=F-8W6Re_YRBbM8Cq4vuIvw', '2020-07-16 02:48:58', NULL, 'Ngày kinh đô Huế thất thủ 135 năm trước\r\nTHỪA THIÊN - HUẾNgười dân Huế xem 23/5/1885 Âm lịch là ngày \"âm hồn\", ngày Kinh thành Huế thất thủ, hàng nghìn người mất mạng bởi súng đạn quân Pháp.\r\n\r\nTheo sách Đại nam thực lục của Quốc sử quán triều Nguyễn, năm 1883, lợi dụng triều đình nhà Nguyễn rối ren khi vua Tự Đức qua đời, Pháp đưa quân đánh vào cửa biển Thuận An, chiếm lấy Trấn Hải Thành. Trước tình hình nguy cấp, triều đình Huế cử Thượng thư Bộ lại Nguyễn Trọng Hợp ra Thuận An điều đình với Pháp. Ngày 25/8/1883, ngay tại kinh đô Huế, triều đình nhà Nguyễn và Pháp ký hòa ước Quý Mùi hay còn gọi là Harmand.\r\n\r\nHòa ước gồm 27 điều khoản với nội dung xác lập quyền bảo hộ lâu dài của Pháp trên toàn bộ Việt Nam. Quân Pháp cũng ép triều đình Huế nhường lại quyền kiểm soát Trấn Bình đài, pháo đài thứ 25 nằm trong hệ thống bảo vệ kinh thành Huế. Gần một năm sau, ngày 6/6/1884, quân Pháp và triều đình Huế ký thêm hòa ước Paternote với 19 điều khoản. Lấy lý do bảo trợ nước Đại Nam, có trách nhiệm giữ lãnh thổ, Pháp sẽ đóng quân bất cứ nơi nào họ muốn.\r\n\r\nVới tinh thần chủ chiến, lợi dụng sơ hở của hòa ước Harmand không có điều khoản nào nói đến vấn đề quân sự của triều đình nhà Nguyễn, Phụ chính đại thần Tôn Thất Thuyết đã cho tuyển mộ binh lính, thành lập và củng cố các sơn phòng. Ngay tại kinh đô Huế, Tôn Thất Thuyết đã tổ chức huấn luyện hai đội quân mang tên Phấn Nghĩa và Đoàn Kết do Trần Xuân Soạn chỉ huy.\r\n\r\nPháo đài Tây Thành, một trong 25 pháo đài của Kinh thành Huế. Ảnh: Võ Thạnh\r\nPháo đài Tây Thành, một trong 25 pháo đài của Kinh thành Huế. Ảnh: Võ Thạnh.\r\n\r\nSau khi vua Kiến Phúc qua đời, Tôn Thất Thuyết đã đưa vua Hàm Nghi lên ngôi và lên kế hoạch chuẩn bị cho cuộc chiến lâu dài với quân Pháp. Ngoài việc xây dựng căn cứ quân sự ở Tân Sở (Quảng Trị), ông cũng điều binh lính từ các nơi về kinh thành Huế, chuẩn bị cho cuộc đánh úp quân Pháp.\r\n\r\nTriều đình Huế cho đặt nhiều khẩu súng thần công ở trên Thượng Thành và ở đài Nam hướng về phía Tòa khâm sứ Pháp ở bờ nam sông Hương và trấn Bình Đài (đồn Mang Cá). Tôn Thất Thuyết đã cho binh lính gấp rút đào hào đắp lũy ngay trong thành Huế, chuyển gấp tài sản từ các kho ra Quảng Trị. Kinh thành Huế cũng được bố trí phòng thủ nghiêm ngặt hơn.\r\n\r\nTheo sách Đại nam thực lục, sau khi từ chối lời mời của tướng De Courcy sang tòa Khâm sứ hội đàm, khuya 4/7 năm 1885 (đêm 22, rạng 23/5 âm lịch), Tôn Thất Thuyết chia quân làm hai hướng tấn công quân Pháp. Đạo quân thứ nhất do ông trực tiếp tấn công đồn Mang Cá nhỏ, đạo quân thứ hai do Tôn Thất Lệ chỉ huy vượt sông Hương đánh úp tòa Khâm sứ. Vũ khí quân triều đình thô sơ, chủ yếu là gươm đao giáo mác để cận chiến, đạn đại bác chỉ làm cháy vài trại lính quanh Tòa Khâm, còn lại rơi xuống sông Hương.\r\n\r\nTòa Khâm sứ Pháp nay là trường Đại học sự phạm Huế. Ảnh: Võ Thạnh\r\nTòa Khâm sứ Pháp nay là trường Đại học Sư phạm Huế. Ảnh: Võ Thạnh.\r\n\r\nSau phút hoảng loạn ban đầu, quân Pháp chia làm 3 đoàn tấn công Kinh Thành. Từ Tiểu Trấn Bình Đài, thủy lục quân Pháp đánh thẳng lên khu Tam Tòa, Lục Bộ, tiến vào cửa Hiển Nhơn, đánh thẳng Đại Nội. Gặp sự kháng cự của quân triều đình, Pháp quay sang đánh chiếm Kỳ Đài.\r\n\r\nĐạn pháo từ tàu chiến của Pháp bắn vào kinh thành Huế, Hoàng thành và cung điện nhiều nơi bị cháy sập. Quân Pháp từ Tòa Khâm cũng vượt sông sang đốt chợ Đông Ba và đi vào cửa Thượng Tứ, nổ súng giết dân lành chạy giặc.\r\n\r\nThấy tình thế thất bại, quan chánh đại thần Nguyễn Văn Tường đưa vua Hàm Nghi và hoàng tộc triều Nguyễn rời khỏi kinh thành Huế. Khi đoàn đến Kim Long, Nguyễn Văn Tường đã vâng chỉ của Thái hoàng Thái hậu Từ Dụ đi tắt vào nhà thờ đạo Kim Long để sau giảng hòa với quân Pháp. Tôn Thất Thuyết ra sau gặp vua Hàm Nghi và đưa vua đi đến Trường Thi để ra Quảng Trị. Khi đó, tùy giá chỉ có xe loan và lính biền binh lẻ tẻ chầu chực trên dưới 100 người, còn các dinh vệ, sau khi thua trận đều tìm đường về quê.\r\n\r\nSau khi vua Hàm Nghi rời khỏi Kinh thành Huế, quân Pháp lên kỳ đài treo hiệu cờ tam tài, quan lại triều Nguyễn và người dân trong thành giành nhau tìm cửa chạy ra, rồi tự giẫm đạp lên nhau, chết và bị thương rất nhiều. Quân Pháp đốt bộ Lại và bộ Binh, thuốc đạn khí giới các dinh trại, chia giữ các cửa thành trong ngoài và sở kho cung điện. Sau đó, quân Pháp sửa đắp các trại lính làm nơi trú đóng, nhặt chôn, hỏa táng xác chết trong trận đánh.\r\n\r\nCửa Hữu, nơi vua Hàm Nghi rời khỏi Kinh thành Huế. Ảnh: Võ Thạnh\r\nCửa Hữu, nơi vua Hàm Nghi rời khỏi Kinh thành Huế. Ảnh: Võ Thạnh.\r\n\r\nTiến sĩ Trần Đình Hằng, Phân viện trưởng Phân viện Văn hóa nghệ thuật quốc gia Việt Nam tại Huế, cho biết Philippe Devillers đã thuật lại cảnh đau thương của kinh thành Huế năm 1885 trong cuốn Người Pháp và người Annam là bạn hay thù?\r\n\r\nTheo đó, 11h ngày 5/7/1885, Roussel de Courcy, tướng chỉ huy đội quân viễn chính Pháp tại Việt Nam, điện cho Chính phủ Pháp: \"Ngôi thành đã ở trong tay chúng ta cùng với 1.100 khẩu đại bác. Quân đội chúng ta tuyệt vời. Thương vong không đáng kể\". Tướng Prudhomme báo cáo: \"Xác của 1.500 người Annam cho thấy thiệt hại ít nhất phải gấp đôi, vì theo tập quán họ đã mang đi rất nhiều, và mang tất cả những người bị thương đi, vì sợ chúng ta sẽ đối xử tàn nhẫn...\".\r\n\r\nSau khi rút khỏi kinh thành Huế, ra đến Quảng Trị, ngày 13/7/1885, vua Hàm Nghi đã ban chiếu Cần Vương kêu gọi văn thân, sĩ phu và nhân dân yêu nước đứng lên chống Pháp cứu nước. Đến ngày 29/9/1885, tại sơn phòng Ấu Sơn (Hương Khê, Hà Tĩnh), vua Hàm Nghi một lần nữa ban chiếu Cần Vương kêu gọi sĩ phu yêu nước đứng lên chống Pháp.\r\n\r\nQuân Pháp và phe chủ hòa của triều đình Huế nhiều lần cho người chiêu dụ vua Hàm Nghi trở lại Huế song nhà vua từ chối. Quân Pháp và triều đình Huế đã đưa vua Đồng Khánh lên ngôi. Ngày 26/9/1888, vua Hàm Nghi bị bắt khi đang ở căn cứ của phong trào Cần Vương. Vua sau đó bị đày sang Algerie.', 1, 0, 1, 0),
(5, 'Thêm một người chết trong vụ ôtô lao xuống vực', 'them-mot-nguoi-chet-trong-vu-oto-lao-xuong-vuc', 1, 'https://i1-vnexpress.vnecdn.net/2020/07/12/hien-truong-8522-1594520306.jpg?w=680&h=0&q=100&dpr=1&fit=crop&s=lir_5hrufjdbpGXwSLgWfw', '2020-07-16 02:48:58', NULL, 'Thêm một người chết trong vụ ôtô lao xuống vực\r\nKON TUMÔng Hà Trung Lưu, 72 tuổi, không qua khỏi sau một ngày điều trị chấn thương sọ não, nâng số ca tử vong vụ ôtô lao xuống vực lên 6, sáng 12/7.\r\n\r\n\"Hôm qua sau khi mổ xong, bệnh nhân quê Thanh Hóa được chuyển qua phòng hồi sức nhưng không qua khỏi\", bác sĩ Võ Văn Thiện, Phó giám đốc Bệnh viện Đa khoa Kon Tum cho biết, hiện còn 5 ca điều trị tại đây sức khỏe tạm ổn.\r\n\r\nHiện trường tai nạn sáng hôm qua. Ảnh: Trần Hóa.\r\nHiện trường tai nạn sáng 11/7. Ảnh: Trần Hóa.\r\n\r\nÔng Đặng Văn Đào, Phó giám đốc Bệnh viện Đa khoa vùng Ngọc Hồi cho biết, hiện Khoa Ngoại tổng hợp điều trị cho 29 bệnh nhân bị thương trong vụ tai nạn, tất cả sức khỏe ổn định, không có ca nguy kịch.\r\n\r\nSáng hôm qua, tài xế Mai Hải Nam (39 tuổi, quê Thanh Hóa) lái xe khách giường nằm chở 40 người, trong đó có 9 trẻ em, trên quốc lộ 14C, hướng từ Bắc vào Nam. Khi đến đèo Ngọc Vin (xã Rờ Kơi, huyện Sa Thầy, tỉnh Kon Tum), xe lao xuống vực sâu 20 m. Tai nạn làm 5 người chết tại chỗ, 35 người bị thương. Những người bị nạn quê ở Thanh Hóa, Đăk Lăk, Kon Tum...\r\n\r\nTheo cơ quan điều tra, tài xế và phụ xe đều không có nồng độ cồn trong máu. Riêng phụ xe Trần Minh Tú (đã chết, quê Thanh Hóa) dương tính ma túy. Dữ liệu ghi nhận, tốc độ cuối cùng của ôtô lúc 3h38 phút sáng 11/7 là 65 km/h, trước đó 10 giây là 59 km/h. Tài xế khai xe bị mất phanh, và lúc tai nạn chỉ chạy 35 km/h.', 1, 0, 1, 0),
(6, 'Truy quét \'vàng tặc\'', 'truy-quet-vang-tac', 1, 'https://i1-vnexpress.vnecdn.net/2020/07/11/IMG-1372-5062-1594437699.jpg?w=680&h=0&q=100&dpr=1&fit=crop&s=qd1z852GZ_ePUWsO0braqQ', '2020-07-16 02:48:58', NULL, 'Truy quét \'vàng tặc\'\r\nQUẢNG NAMTổ công tác đột kích bãi vàng lậu, phát hiện nhiều lán trại và bếp lửa còn ấm, nhưng xung quanh không một bóng người.\r\n\r\nPhá hủy thiết bị, lán trại của vàng tặc: Video: Đắc Thành.\r\n\r\nÔng Võ Văn Hiếu, Phó phòng Tài nguyên và Môi trường huyện Phước Sơn, tổ trưởng công tác, cho hay các lực lượng chức năng trên địa bàn gồm công an, kiểm lâm, phòng tài nguyên môi trường và chính quyền các xã..., thường xuyên phối hợp truy quét bãi vàng trái phép.\r\n\r\n\"Chúng tôi đi thực địa để đẩy đuổi các tổ chức, cá nhân thăm dò, khai thác khoáng sản trái phép; phá hủy thiết bị khai thác, tháo dỡ lán trại và lập biên bản xử lý vi phạm\", ông Hiếu nói.\r\n\r\nTừ trung tâm huyện đến các bãi vàng đường đi lại khó khăn nên lực lượng chức năng phải thuê xe thồ. Trong đợt truy quét hồi tháng 5 vừa qua, theo kế hoạch, tổ công tác sẽ đến bãi Hòa Sơn 3, xã Phước Hoà, nhưng khi di chuyển được 2 km, ông Võ Văn Hiếu thông báo \"kế hoạch thay đổi\".\r\n\r\nThay vì vào bãi Hòa Sơn 3, tổ công tác chuyển hướng đến khu vực suối Văm, xã Phước Đức. \"Mỗi lần đi truy quét, chúng tôi thường thay đổi lộ trình để không lộ thông tin ra ngoài, lường trước việc những người khai thác vàng trái phép cất dấu máy móc và trốn chạy\", ông Hiếu giải thích.\r\n\r\nMột lán trại được dựng lên để khai thác vàng. Ảnh: Đắc Thành.\r\nMột lán trại ở bãi vàng trái phép. Ảnh: Đắc Thành.\r\n\r\nNhững chiếc xe win gầm rú theo lối mòn băng rừng, vượt dốc hơn một giờ, đưa tổ công tác 10 người đến gần bãi vàng. Họ đi bộ đến khu vực suối Văm, từ trên đồi cao nhìn xuống cánh rừng rộng khoảng 2 ha, lực lượng chức năng phát hiện hai lán trại của \"vàng tặc\" nằm thấp thoáng dưới tán cây.\r\n\r\nTổ liên ngành lập tức chia đội hình, đột nhập kiểm tra từng lán trại và khu vực xung quanh nhưng không bắt gặp bất cứ bóng người nào. Bếp lửa vẫn bập bùng cháy, trong hầm dấu vết đào khoáng sản còn mới, nhưng dụng cụ khai thác biến mất. \"Vàng tặc\" đã tháo chạy trước khi nhà chức trách xuất hiện.\r\n\r\n\"Đây là chuyện thường ngày. Mặc dù chúng tôi đã thay đổi lộ trình, nhưng họ có nhiều tai mắt, thấy động là tẩu tán vào rừng ngay\", ông Hiếu nói và chỉ đạo các mũi tìm kiếm ở hiện trường, người chui vào hầm, người đi vào rừng. Sau 30 phút, họ phát hiện một bãi đất đào bới chôn lấp còn mới, nằm sát cửa hầm khai thác vàng\r\n\r\nKiểm lâm viên A Vô Tô A (Ban quản lý rừng phòng hộ Đắk Mi) bằng kinh nghiệm của mình xác định \"đây là nơi chôn thiết bị trước khi phu vàng tháo chạy\". Lực lượng chức năng đào qua lớp đất 20 cm, phát hiện máy nổ cùng nhiên liệu. Bốn người buộc dây khiêng máy lên rồi phá hỏng, cho vào đống củi châm lửa đốt.\r\n\r\nTổ công tác đập phá máy nổ. Ảnh: Đắc Thành.\r\nTổ công tác đập phá máy nổ phục vụ khai thác vàng trái phép. Ảnh: Đắc Thành.\r\n\r\nTiếp tục tìm kiếm nhiều vị trí khác, tổ công tác phát hiện một máy nổ được tháo rời các bộ phận, cất giấu trong bụi cây, hầm, chôn dưới đất...\r\n\r\nSau bữa trưa nhanh chóng với mỳ tôm và bánh mỳ mang theo, lực lượng truy quét \"vàng tặc\" đưa gạo, thức ăn, áo quần, chăn màn của các phu vàng trong lán trại ra ngoài, rồi hạ lán trại và đốt cháy.\r\n\r\n\"Chúng tôi đốt lán trại để ngăn chặn việc khai thác vàng trái phép, song để lại ít thức ăn, quần áo cho các phu vàng đang lẩn trốn trong rừng. Họ là những người làm thuê cho các chủ bãi, nếu mình đốt hết thức ăn, quần áo thì họ không đồ ăn, quần áo mặc khi ra khỏi rừng\", ông Hiếu nói.\r\n\r\nChờ lán trại cháy rụi, tổ công tác mang nước dập tắt ngăn ngọn lửa để tránh lan ra rừng rồi rời đi khi trời đã về chiều, kết thúc một ngày truy quét vàng tặc.\r\n\r\nÔng Hiếu cho hay, điểm truy quét kể trên cách không xa trung tâm nên tổ công tác có thể đi về trong ngày. Với những bãi vàng nằm sâu trong rừng, lực lượng chức năng phải mang theo lương thực, thực phẩm để sẵn sàng cho chuyến công tác kéo dài nhiều ngày.\r\n\r\n\"Nhiều khi chúng tôi đi bộ cả ngày đường mới đến được điểm khai thác vàng, sau khi kiểm tra xong lại di chuyển đến nơi khác. Tối xuống mọi người dựng lán trại bên suối và nấu ăn, rồi mỗi người một chiếc võng tranh thủ chợp mắt\", ông Hiếu cho hay.\r\n\r\nĐa số \"vàng tặc\" tìm mọi cách để tránh chạm mặt lực lượng chức năng. Nhưng một số trường hợp nhà chức trách gặp các phu vàng tỏ thái độ thách thức, thậm chí đe doạ.\r\n\r\nMột lần, tổ công tác liên ngành đột nhập bãi vàng ở xã Phước Thành, gặp 9 phu vàng đang làm việc, nhóm này không trốn tránh mà ngang nhiên cầm hung khí đe doạ. Lúc này lực lượng chức năng ít người, giữa núi rừng hoang vắng nên tổ công tác chỉ lập biên bản sự việc và rút lui nhằm tránh những việc không hay xảy ra.\r\n\r\nHôm sau, huyện Phước Sơn huy động mấy chục người, gồm công an, dân quân... trở lại. Thấy lực lượng đông đủ, nhóm đào vàng trái phép mới chịu ra khỏi rừng.\r\n\r\nLán trại những người khai thác vàng trái phép bị lực lượng chức năng đốt cháy. Ảnh: Đắc Thành.\r\nLán trại những người khai thác vàng trái phép bị lực lượng chức năng đốt cháy. Ảnh: Đắc Thành.\r\n\r\nLãnh đạo Phòng tài nguyên và môi trường huyện Phước Sơn thông tin, gần đây công an chính quy được bố trí về các xã, cùng với đó chính quyền địa phương đã thành lập thêm đơn vị bảo vệ rừng. \"Các lực lượng này sẽ tuần tra thường xuyên hơn, góp phần đẩy đuổi, ngăn chặn nạn khai thác vàng trái phép\", vị này nói.', 1, 0, 1, 0);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `account`
--
ALTER TABLE `account`
  ADD PRIMARY KEY (`account_id`);

--
-- Indexes for table `brands`
--
ALTER TABLE `brands`
  ADD PRIMARY KEY (`brand_id`);

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`category_id`);

--
-- Indexes for table `comments`
--
ALTER TABLE `comments`
  ADD PRIMARY KEY (`comment`);

--
-- Indexes for table `posts`
--
ALTER TABLE `posts`
  ADD PRIMARY KEY (`post_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `account`
--
ALTER TABLE `account`
  MODIFY `account_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `brands`
--
ALTER TABLE `brands`
  MODIFY `brand_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `category_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `comments`
--
ALTER TABLE `comments`
  MODIFY `comment` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `posts`
--
ALTER TABLE `posts`
  MODIFY `post_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
