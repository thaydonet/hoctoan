{
  "id": "dinh-li-pythagore",
  "title": "Định lí Pythagore",
  "description": "Lý thuyết cơ bản, ví dụ và bài tập về Định lí Pythagore và định lí Pythagore đảo.",
  "theory": {
    "title": "Lý thuyết về Định lí Pythagore",
    "content": [
      "**Định lí Pythagore (thuận):** Trong một tam giác vuông, bình phương của cạnh huyền bằng tổng các bình phương của hai cạnh góc vuông.",
      "**Định lí Pythagore đảo:** Nếu một tam giác có bình phương của một cạnh bằng tổng các bình phương của hai cạnh kia thì tam giác đó là tam giác vuông.",
      "**Chú ý:** Định lí Pythagore chỉ áp dụng cho tam giác vuông để tính độ dài cạnh hoặc chứng minh các hệ thức liên quan đến cạnh."
    ],
    "formulas": [
      "Cho $\\triangle ABC$ vuông tại A: $BC^2 = AB^2 + AC^2$",
      "Hệ quả: $AB^2 = BC^2 - AC^2$ và $AC^2 = BC^2 - AB^2$",
      "Định lí đảo: Nếu trong $\\triangle ABC$ có $BC^2 = AB^2 + AC^2$ thì $\\triangle ABC$ vuông tại A."
    ]
  },
  "flashcards": [
    {
      "id": "1",
      "question": "Phát biểu Định lí Pythagore thuận.",
      "answer": "Trong một tam giác vuông, bình phương của cạnh huyền bằng tổng các bình phương của hai cạnh góc vuông."
    },
    {
      "id": "2",
      "question": "Phát biểu Định lí Pythagore đảo.",
      "answer": "Nếu một tam giác có bình phương của một cạnh bằng tổng các bình phương của hai cạnh kia thì tam giác đó là tam giác vuông."
    },
    {
      "id": "3",
      "question": "Viết công thức Định lí Pythagore cho tam giác MNP vuông tại M.",
      "answer": "$NP^2 = MN^2 + MP^2$"
    }
  ],
  "examples": [
    {
      "id": "1",
      "title": "Tính độ dài cạnh góc vuông",
      "problem": "Cho tam giác ABC vuông tại A, biết BC = 10 cm và AC = 8 cm. Tính độ dài cạnh AB.",
      "solution": [
        "1. Áp dụng định lí Pythagore cho tam giác ABC vuông tại A, ta có:",
        "$BC^2 = AB^2 + AC^2$",
        "2. Suy ra:",
        "$AB^2 = BC^2 - AC^2$",
        "$AB^2 = 10^2 - 8^2 = 100 - 64 = 36$",
        "$AB = \\sqrt{36} = 6$ (cm)",
        "**Kết luận:** Vậy độ dài cạnh AB là 6 cm."
      ]
    },
    {
      "id": "2",
      "title": "Kiểm tra một tam giác có vuông không",
      "problem": "Kiểm tra xem tam giác có ba cạnh là 7 cm, 24 cm, 25 cm có phải là tam giác vuông không.",
      "solution": [
        "1. Ta tính bình phương của cạnh dài nhất:",
        "$25^2 = 625$",
        "2. Ta tính tổng bình phương của hai cạnh còn lại:",
        "$7^2 + 24^2 = 49 + 576 = 625$",
        "3. So sánh:",
        "Vì $25^2 = 7^2 + 24^2$, nên theo định lí Pythagore đảo, tam giác này là tam giác vuông.",
        "**Kết luận:** Tam giác có ba cạnh 7 cm, 24 cm, 25 cm là một tam giác vuông."
      ]
    }
  ],
  "practice": {
    "mcq": [
      {
        "id": "1",
        "question": "Cho tam giác DEF vuông tại D. Hệ thức nào sau đây là đúng?",
        "options": [
          "$DE^2 = DF^2 + EF^2$",
          "$EF^2 = DE^2 + DF^2$",
          "$DF^2 = DE^2 + EF^2$",
          "$EF^2 = DE^2 - DF^2$"
        ],
        "correctAnswerIndex": 1,
        "explanation": "Trong tam giác DEF vuông tại D, cạnh huyền là EF. Theo định lí Pythagore, bình phương cạnh huyền bằng tổng bình phương hai cạnh góc vuông. Do đó, $EF^2 = DE^2 + DF^2$."
      }
    ],
    "trueFalse": [
      {
        "id": "tf1",
        "question": "Xét tính đúng sai của các khẳng định sau:",
        "statements": [
          { "text": "Một tam giác có các cạnh 5 cm, 12 cm, 13 cm là một tam giác vuông.", "isTrue": true },
          { "text": "Nếu tam giác PQR vuông tại Q thì $PR^2 = PQ^2 - QR^2$.", "isTrue": false },
          { "text": "Trong một tam giác vuông, cạnh huyền luôn lớn hơn mỗi cạnh góc vuông.", "isTrue": true },
          { "text": "Một tam giác có các cạnh 6 cm, 9 cm, 12 cm là một tam giác vuông.", "isTrue": false }
        ],
        "explanation": "a) Đúng, vì $13^2 = 169$ và $5^2 + 12^2 = 25 + 144 = 169$. b) Sai, phải là $PR^2 = PQ^2 + QR^2$. c) Đúng, vì bình phương cạnh huyền bằng tổng bình phương hai cạnh góc vuông nên nó phải lớn hơn bình phương của mỗi cạnh. d) Sai, vì $12^2 = 144$ và $6^2 + 9^2 = 36 + 81 = 117$, chúng không bằng nhau."
      }
    ],
    "shortAnswer": [
      {
        "id": "sa1",
        "question": "Người ta buộc một con diều bằng một sợi dây dài 1700 mét. Khi diều bay cao nhất, hình chiếu của nó trên mặt đất cách nơi thả diều 800 mét. Hỏi khi đó con diều bay cao bao nhiêu mét so với mặt đất? (Giả sử dây diều được căng thẳng).",
        "correctAnswer": "1500",
        "displayAnswer": "1500 mét",
        "explanation": "Gọi chiều cao của diều là $h$, chiều dài dây là cạnh huyền $c = 1700$ m, khoảng cách trên mặt đất là cạnh góc vuông $a = 800$ m. Áp dụng định lí Pythagore: $c^2 = a^2 + h^2 \\Rightarrow h^2 = c^2 - a^2 = 1700^2 - 800^2 = 2890000 - 640000 = 2250000$. Vậy $h = \\sqrt{2250000} = 1500$ (m).",
        "hint": "Coi dây diều, độ cao của diều và khoảng cách trên mặt đất tạo thành một tam giác vuông."
      }
    ]
  },
  "homework": {
    "title": "Bài tập về nhà - Định lí Pythagore",
    "problems": [
      "1. Tính độ dài đường chéo của một màn hình TV hình chữ nhật có chiều dài 160 cm và chiều rộng 90 cm.",
      "2. Cho tam giác ABC vuông tại A, đường cao AH. Biết BH = 9 cm và HC = 16 cm. Tính độ dài các cạnh AB, AC.",
      "3. Một cái cây bị sét đánh gãy ngang thân. Ngọn cây đổ xuống chạm đất và cách gốc cây 4 mét. Phần thân cây còn lại cao 3 mét. Hỏi lúc đầu cây cao bao nhiêu mét?",
      "4. Chứng minh rằng trong một hình thang cân có hai đường chéo vuông góc, chiều cao bằng trung bình cộng hai đáy."
    ]
  }
}
