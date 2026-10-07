// Ngữ pháp trọng tâm theo cấp HSK. Mỗi ví dụ: [chữ Hán, pinyin, nghĩa]

export const grammar = {
  1: [
    {
      title: 'Câu chữ 是',
      pattern: 'A + 是 + B',
      note: 'Dùng để nói A là B. Phủ định thêm 不 trước 是.',
      ex: [
        ['我是学生。', 'Wǒ shì xué sheng.', 'Tôi là học sinh.'],
        ['他不是老师。', 'Tā bú shì lǎo shī.', 'Anh ấy không phải là giáo viên.'],
      ],
    },
    {
      title: 'Câu hỏi với 吗',
      pattern: 'Câu trần thuật + 吗？',
      note: 'Thêm 吗 vào cuối câu để tạo câu hỏi có/không. Trật tự từ giữ nguyên.',
      ex: [
        ['你是中国人吗？', 'Nǐ shì Zhōng guó rén ma?', 'Bạn là người Trung Quốc phải không?'],
        ['你喝茶吗？', 'Nǐ hē chá ma?', 'Bạn uống trà không?'],
      ],
    },
    {
      title: 'Tính từ làm vị ngữ',
      pattern: 'Chủ ngữ + 很 + tính từ',
      note: 'Không dùng 是 trước tính từ. 很 ở đây thường chỉ để câu trọn vẹn, nghĩa "rất" rất nhẹ.',
      ex: [
        ['她很漂亮。', 'Tā hěn piào liang.', 'Cô ấy đẹp.'],
        ['今天很冷。', 'Jīn tiān hěn lěng.', 'Hôm nay lạnh.'],
      ],
    },
    {
      title: 'Câu hỏi với đại từ nghi vấn',
      pattern: '什么 / 谁 / 哪儿 / 几 / 多少 đặt đúng vị trí cần hỏi',
      note: 'Từ để hỏi đứng ở đúng chỗ của thông tin cần hỏi, không đảo lên đầu câu như tiếng Anh.',
      ex: [
        ['你叫什么名字？', 'Nǐ jiào shén me míng zi?', 'Bạn tên là gì?'],
        ['你去哪儿？', 'Nǐ qù nǎr?', 'Bạn đi đâu?'],
      ],
    },
    {
      title: 'Số từ + lượng từ + danh từ',
      pattern: 'Số / 这 / 那 + lượng từ + danh từ',
      note: 'Tiếng Trung bắt buộc có lượng từ giữa số và danh từ. 个 là lượng từ phổ biến nhất.',
      ex: [
        ['三个人', 'sān gè rén', 'ba người'],
        ['这本书', 'zhè běn shū', 'quyển sách này'],
      ],
    },
    {
      title: 'Vị trí trạng ngữ',
      pattern: 'Chủ ngữ + thời gian + 在 + nơi chốn + động từ',
      note: 'Thời gian và nơi chốn đứng trước động từ, ngược với tiếng Việt.',
      ex: [
        ['我在学校学习。', 'Wǒ zài xué xiào xué xí.', 'Tôi học ở trường.'],
        ['我明天去北京。', 'Wǒ míng tiān qù Běi jīng.', 'Ngày mai tôi đi Bắc Kinh.'],
      ],
    },
    {
      title: 'Trợ từ 了 (hoàn thành)',
      pattern: 'Động từ + 了 + tân ngữ / câu + 了',
      note: 'Biểu thị hành động đã xảy ra hoặc tình huống đã thay đổi. Phủ định dùng 没, bỏ 了.',
      ex: [
        ['我买了一本书。', 'Wǒ mǎi le yì běn shū.', 'Tôi đã mua một quyển sách.'],
        ['他没去医院。', 'Tā méi qù yī yuàn.', 'Anh ấy không đi bệnh viện.'],
      ],
    },
  ],
  2: [
    {
      title: 'So sánh với 比',
      pattern: 'A + 比 + B + tính từ (+ mức độ)',
      note: 'Không dùng 很 trong câu 比. Muốn nói mức độ dùng 一点儿, 多了, 得多.',
      ex: [
        ['今天比昨天热。', 'Jīn tiān bǐ zuó tiān rè.', 'Hôm nay nóng hơn hôm qua.'],
        ['苹果比西瓜贵一点儿。', 'Píng guǒ bǐ xī guā guì yì diǎnr.', 'Táo đắt hơn dưa hấu một chút.'],
      ],
    },
    {
      title: 'Trợ từ 过 (kinh nghiệm)',
      pattern: 'Động từ + 过',
      note: 'Diễn tả đã từng làm gì. Phủ định: 没 + động từ + 过.',
      ex: [
        ['我去过中国。', 'Wǒ qù guo Zhōng guó.', 'Tôi đã từng đến Trung Quốc.'],
        ['我没吃过羊肉。', 'Wǒ méi chī guo yáng ròu.', 'Tôi chưa từng ăn thịt cừu.'],
      ],
    },
    {
      title: 'Hành động đang diễn ra',
      pattern: '(正)在 + động từ + (呢)',
      note: 'Diễn tả hành động đang tiến hành.',
      ex: [
        ['我正在看电视呢。', 'Wǒ zhèng zài kàn diàn shì ne.', 'Tôi đang xem tivi.'],
        ['妈妈在做饭。', 'Mā ma zài zuò fàn.', 'Mẹ đang nấu cơm.'],
      ],
    },
    {
      title: 'Bổ ngữ trình độ 得',
      pattern: 'Động từ + 得 + (很) + tính từ',
      note: 'Đánh giá hành động được làm như thế nào.',
      ex: [
        ['他说得很好。', 'Tā shuō de hěn hǎo.', 'Anh ấy nói rất giỏi.'],
        ['她跑得很快。', 'Tā pǎo de hěn kuài.', 'Cô ấy chạy rất nhanh.'],
      ],
    },
    {
      title: '因为……所以……',
      pattern: '因为 + nguyên nhân，所以 + kết quả',
      note: 'Bởi vì… cho nên… Có thể lược một trong hai vế.',
      ex: [
        ['因为下雨，所以我没去。', 'Yīn wèi xià yǔ, suǒ yǐ wǒ méi qù.', 'Vì trời mưa nên tôi không đi.'],
        ['因为很忙，他没吃饭。', 'Yīn wèi hěn máng, tā méi chī fàn.', 'Vì bận nên anh ấy chưa ăn cơm.'],
      ],
    },
    {
      title: 'Sắp xảy ra: 要……了',
      pattern: '(快 / 就)要 + động từ + 了',
      note: 'Diễn tả việc sắp xảy ra.',
      ex: [
        ['要下雨了。', 'Yào xià yǔ le.', 'Sắp mưa rồi.'],
        ['火车快要开了。', 'Huǒ chē kuài yào kāi le.', 'Tàu sắp chạy rồi.'],
      ],
    },
  ],
  3: [
    {
      title: 'Câu chữ 把',
      pattern: 'Chủ ngữ + 把 + tân ngữ + động từ + thành phần khác',
      note: 'Nhấn mạnh tác động lên tân ngữ. Động từ không đứng trơ một mình mà phải có kết quả, phương hướng, 了...',
      ex: [
        ['我把作业做完了。', 'Wǒ bǎ zuò yè zuò wán le.', 'Tôi đã làm xong bài tập.'],
        ['请把门关上。', 'Qǐng bǎ mén guān shang.', 'Làm ơn đóng cửa lại.'],
      ],
    },
    {
      title: 'Câu bị động với 被',
      pattern: 'Đối tượng + 被 + (người làm) + động từ + thành phần khác',
      note: 'Thường dùng khi kết quả không mong muốn.',
      ex: [
        ['我的手机被弟弟拿走了。', 'Wǒ de shǒu jī bèi dì di ná zǒu le.', 'Điện thoại của tôi bị em trai lấy mất rồi.'],
        ['蛋糕被吃完了。', 'Dàn gāo bèi chī wán le.', 'Bánh bị ăn hết rồi.'],
      ],
    },
    {
      title: 'Bổ ngữ kết quả',
      pattern: 'Động từ + 完 / 懂 / 见 / 好 / 到',
      note: 'Cho biết kết quả của hành động.',
      ex: [
        ['我听懂了。', 'Wǒ tīng dǒng le.', 'Tôi nghe hiểu rồi.'],
        ['你找到护照了吗？', 'Nǐ zhǎo dào hù zhào le ma?', 'Bạn tìm thấy hộ chiếu chưa?'],
      ],
    },
    {
      title: 'Bổ ngữ khả năng',
      pattern: 'Động từ + 得 / 不 + bổ ngữ',
      note: 'Có thể hoặc không thể đạt kết quả.',
      ex: [
        ['老师说的话我听得懂。', 'Lǎo shī shuō de huà wǒ tīng de dǒng.', 'Lời thầy nói tôi nghe hiểu được.'],
        ['太远了，我看不见。', 'Tài yuǎn le, wǒ kàn bu jiàn.', 'Xa quá, tôi không nhìn thấy.'],
      ],
    },
    {
      title: 'Câu 是……的 nhấn mạnh',
      pattern: '是 + thời gian / cách thức / nơi chốn + động từ + 的',
      note: 'Nhấn mạnh chi tiết của một việc đã xảy ra.',
      ex: [
        ['我是昨天到的。', 'Wǒ shì zuó tiān dào de.', 'Tôi đến hôm qua (chứ không phải hôm khác).'],
        ['你是怎么来的？', 'Nǐ shì zěn me lái de?', 'Bạn đến bằng cách nào?'],
      ],
    },
    {
      title: '如果……就……',
      pattern: '如果 + điều kiện，(chủ ngữ) + 就 + kết quả',
      note: 'Nếu… thì…',
      ex: [
        ['如果明天下雨，我们就不去了。', 'Rú guǒ míng tiān xià yǔ, wǒ men jiù bú qù le.', 'Nếu mai mưa thì chúng ta không đi nữa.'],
        ['如果你有问题，就问我。', 'Rú guǒ nǐ yǒu wèn tí, jiù wèn wǒ.', 'Nếu bạn có thắc mắc thì hỏi tôi.'],
      ],
    },
    {
      title: '越来越 và 一边……一边……',
      pattern: '越来越 + tính từ / 一边 + V1，一边 + V2',
      note: 'Càng ngày càng… / Vừa… vừa…',
      ex: [
        ['天气越来越冷了。', 'Tiān qì yuè lái yuè lěng le.', 'Thời tiết càng ngày càng lạnh.'],
        ['他一边吃饭一边看电视。', 'Tā yì biān chī fàn yì biān kàn diàn shì.', 'Anh ấy vừa ăn cơm vừa xem tivi.'],
      ],
    },
  ],
  4: [
    {
      title: '不仅……而且……',
      pattern: '不仅 + A，而且 + B',
      note: 'Không những… mà còn…',
      ex: [
        ['她不仅漂亮，而且很聪明。', 'Tā bù jǐn piào liang, ér qiě hěn cōng ming.', 'Cô ấy không những đẹp mà còn thông minh.'],
        ['这个方法不仅简单，而且有效。', 'Zhè ge fāng fǎ bù jǐn jiǎn dān, ér qiě yǒu xiào.', 'Cách này không chỉ đơn giản mà còn hiệu quả.'],
      ],
    },
    {
      title: '无论……都……',
      pattern: '无论 + từ để hỏi / A 还是 B，都 + kết quả',
      note: 'Bất kể thế nào kết quả cũng không đổi.',
      ex: [
        ['无论多忙，他都坚持跑步。', 'Wú lùn duō máng, tā dōu jiān chí pǎo bù.', 'Dù bận đến đâu anh ấy vẫn kiên trì chạy bộ.'],
        ['无论谁来，我都不见。', 'Wú lùn shéi lái, wǒ dōu bú jiàn.', 'Bất kể ai đến tôi cũng không gặp.'],
      ],
    },
    {
      title: '尽管……还是……',
      pattern: '尽管 + sự thật，(chủ ngữ) + 还是 / 仍然 + kết quả',
      note: 'Mặc dù… nhưng vẫn…',
      ex: [
        ['尽管很累，他还是完成了工作。', 'Jǐn guǎn hěn lèi, tā hái shi wán chéng le gōng zuò.', 'Dù rất mệt, anh ấy vẫn hoàn thành công việc.'],
        ['尽管失败了，我们还是很骄傲。', 'Jǐn guǎn shī bài le, wǒ men hái shi hěn jiāo ào.', 'Dù thất bại, chúng tôi vẫn rất tự hào.'],
      ],
    },
    {
      title: '连……都 / 也……',
      pattern: '连 + đối tượng nhấn mạnh + 都 / 也 + động từ',
      note: 'Đến cả… cũng…',
      ex: [
        ['他连一个汉字都不认识。', 'Tā lián yí gè Hàn zì dōu bú rèn shi.', 'Anh ấy đến một chữ Hán cũng không biết.'],
        ['这个问题连孩子也懂。', 'Zhè ge wèn tí lián hái zi yě dǒng.', 'Vấn đề này đến trẻ con cũng hiểu.'],
      ],
    },
    {
      title: '只要……就……',
      pattern: '只要 + điều kiện，就 + kết quả',
      note: 'Chỉ cần… thì…',
      ex: [
        ['只要你努力，就一定能成功。', 'Zhǐ yào nǐ nǔ lì, jiù yí dìng néng chéng gōng.', 'Chỉ cần bạn cố gắng thì nhất định sẽ thành công.'],
        ['只要有时间，我就去游泳。', 'Zhǐ yào yǒu shí jiān, wǒ jiù qù yóu yǒng.', 'Chỉ cần có thời gian là tôi đi bơi.'],
      ],
    },
    {
      title: '既然……就……',
      pattern: '既然 + sự thật đã biết，就 + đề nghị',
      note: 'Đã… thì…',
      ex: [
        ['既然你不舒服，就早点儿休息吧。', 'Jì rán nǐ bù shū fu, jiù zǎo diǎnr xiū xi ba.', 'Bạn đã thấy không khỏe thì nghỉ sớm đi.'],
        ['既然决定了，就别放弃。', 'Jì rán jué dìng le, jiù bié fàng qì.', 'Đã quyết định rồi thì đừng bỏ cuộc.'],
      ],
    },
  ],
  5: [
    {
      title: '与其……不如……',
      pattern: '与其 + A，不如 + B',
      note: 'Thà làm B còn hơn A. Người nói chọn B.',
      ex: [
        ['与其在家等，不如出去找。', 'Yǔ qí zài jiā děng, bù rú chū qu zhǎo.', 'Thay vì ở nhà chờ, chi bằng ra ngoài tìm.'],
        ['与其抱怨，不如想办法。', 'Yǔ qí bào yuàn, bù rú xiǎng bàn fǎ.', 'Than phiền chẳng bằng nghĩ cách.'],
      ],
    },
    {
      title: '即使……也……',
      pattern: '即使 + giả định，也 + kết quả không đổi',
      note: 'Cho dù… cũng…',
      ex: [
        ['即使下雨，比赛也不会取消。', 'Jí shǐ xià yǔ, bǐ sài yě bú huì qǔ xiāo.', 'Cho dù mưa, trận đấu cũng không bị hủy.'],
        ['即使很难，我也要试试。', 'Jí shǐ hěn nán, wǒ yě yào shì shi.', 'Dù khó, tôi cũng muốn thử.'],
      ],
    },
    {
      title: '宁可……也不……',
      pattern: '宁可 + A，也不 + B',
      note: 'Thà A chứ không B. Nhấn mạnh sự lựa chọn dứt khoát.',
      ex: [
        ['我宁可走路，也不坐他的车。', 'Wǒ nìng kě zǒu lù, yě bú zuò tā de chē.', 'Tôi thà đi bộ chứ không đi xe của anh ta.'],
        ['他宁可少赚钱，也不加班。', 'Tā nìng kě shǎo zhuàn qián, yě bù jiā bān.', 'Anh ấy thà kiếm ít tiền chứ không làm thêm giờ.'],
      ],
    },
    {
      title: 'Câu phản vấn 难道……吗',
      pattern: '难道 + câu + 吗？',
      note: 'Hỏi để khẳng định ý ngược lại: lẽ nào…?',
      ex: [
        ['难道你不知道吗？', 'Nán dào nǐ bù zhī dào ma?', 'Lẽ nào bạn không biết sao?'],
        ['难道这是我的错吗？', 'Nán dào zhè shì wǒ de cuò ma?', 'Chẳng lẽ đây là lỗi của tôi?'],
      ],
    },
    {
      title: '以……为……',
      pattern: '以 + A + 为 + B',
      note: 'Lấy A làm B. Dùng nhiều trong văn viết.',
      ex: [
        ['我们以学生为中心。', 'Wǒ men yǐ xué sheng wéi zhōng xīn.', 'Chúng tôi lấy học sinh làm trung tâm.'],
        ['他以帮助别人为快乐。', 'Tā yǐ bāng zhù bié rén wéi kuài lè.', 'Anh ấy lấy việc giúp người khác làm niềm vui.'],
      ],
    },
    {
      title: '何况',
      pattern: 'Mệnh đề 1，何况 + mệnh đề 2',
      note: 'Huống hồ, huống chi. Vế sau là trường hợp càng hiển nhiên hơn.',
      ex: [
        ['大人都搬不动，何况孩子呢？', 'Dà ren dōu bān bu dòng, hé kuàng hái zi ne?', 'Người lớn còn không khiêng nổi, huống hồ trẻ con?'],
        ['这么简单的题他都不会，何况难题。', 'Zhè me jiǎn dān de tí tā dōu bú huì, hé kuàng nán tí.', 'Câu dễ thế này anh ấy còn không làm được, huống chi câu khó.'],
      ],
    },
  ],
  6: [
    {
      title: '之所以……是因为……',
      pattern: 'Chủ ngữ + 之所以 + kết quả，是因为 + nguyên nhân',
      note: 'Sở dĩ… là vì… Nêu kết quả trước, nhấn mạnh nguyên nhân.',
      ex: [
        ['他之所以成功，是因为他一直坚持。', 'Tā zhī suǒ yǐ chéng gōng, shì yīn wèi tā yì zhí jiān chí.', 'Sở dĩ anh ấy thành công là vì luôn kiên trì.'],
        ['我之所以选择这里，是因为环境好。', 'Wǒ zhī suǒ yǐ xuǎn zé zhè lǐ, shì yīn wèi huán jìng hǎo.', 'Tôi chọn nơi này là vì môi trường tốt.'],
      ],
    },
    {
      title: '非……不可',
      pattern: '非 + động từ / người + 不可',
      note: 'Nhất định phải, không thể không.',
      ex: [
        ['这件事非你去不可。', 'Zhè jiàn shì fēi nǐ qù bù kě.', 'Việc này nhất định phải là bạn đi.'],
        ['这部电影我非看不可。', 'Zhè bù diàn yǐng wǒ fēi kàn bù kě.', 'Bộ phim này tôi nhất định phải xem.'],
      ],
    },
    {
      title: '不至于',
      pattern: '不至于 + mức độ / kết quả',
      note: 'Chưa đến mức, không đến nỗi.',
      ex: [
        ['他不至于连这个都不知道吧。', 'Tā bú zhì yú lián zhè ge dōu bù zhī dào ba.', 'Anh ấy chắc không đến nỗi cái này cũng không biết.'],
        ['问题不至于这么严重。', 'Wèn tí bú zhì yú zhè me yán zhòng.', 'Vấn đề chưa đến mức nghiêm trọng như vậy.'],
      ],
    },
    {
      title: '固然……但……',
      pattern: 'A 固然 + đánh giá，但 / 可是 + B',
      note: 'Thừa nhận A đúng, nhưng nhấn mạnh B.',
      ex: [
        ['钱固然重要，但健康更重要。', 'Qián gù rán zhòng yào, dàn jiàn kāng gèng zhòng yào.', 'Tiền tất nhiên quan trọng, nhưng sức khỏe còn quan trọng hơn.'],
        ['这个方法固然好，但成本太高。', 'Zhè ge fāng fǎ gù rán hǎo, dàn chéng běn tài gāo.', 'Cách này tuy tốt nhưng chi phí quá cao.'],
      ],
    },
    {
      title: '以免',
      pattern: 'Hành động，以免 + kết quả xấu',
      note: 'Để tránh, kẻo.',
      ex: [
        ['出门带伞，以免淋雨。', 'Chū mén dài sǎn, yǐ miǎn lín yǔ.', 'Ra ngoài mang ô để khỏi bị ướt mưa.'],
        ['请提前出发，以免迟到。', 'Qǐng tí qián chū fā, yǐ miǎn chí dào.', 'Hãy xuất phát sớm để tránh đến muộn.'],
      ],
    },
    {
      title: 'Thành ngữ bốn chữ (成语)',
      pattern: 'Thành ngữ làm vị ngữ, định ngữ hoặc trạng ngữ',
      note: 'Thành ngữ xuất hiện dày ở HSK 6. Học kèm câu chuyện gốc để nhớ lâu.',
      ex: [
        ['他做事一丝不苟。', 'Tā zuò shì yì sī bù gǒu.', 'Anh ấy làm việc tỉ mỉ, không qua loa.'],
        ['这句话是画蛇添足。', 'Zhè jù huà shì huà shé tiān zú.', 'Câu này là vẽ rắn thêm chân (thừa thãi).'],
      ],
    },
  ],
}
