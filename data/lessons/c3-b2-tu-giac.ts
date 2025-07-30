import { MathTopic } from '../../src/types/MathTopic';

export const c3b2tugiac: MathTopic = {
  "id": "tu-giac",
  "title": "Bài 2: Tứ giác",
  "description": "Lý thuyết cơ bản về tứ giác, các yếu tố của tứ giác và tổng các góc trong một tứ giác.",
  "theory": {
    "title": "Lý thuyết về Tứ giác",
    "content": [
      "**1. Định nghĩa Tứ giác:**",
      "- Tứ giác ABCD là hình gồm bốn đoạn thẳng AB, BC, CD, DA, trong đó bất kì hai đoạn thẳng nào cũng không cùng nằm trên một đường thẳng. ",
      "- Tứ giác lồi là tứ giác luôn nằm trong một nửa mặt phẳng có bờ là đường thẳng chứa bất kì cạnh nào của tứ giác. ",
      "**2. Các yếu tố của một tứ giác:**",
      "- **Đỉnh:** Các điểm A, B, C, D được gọi là các đỉnh.",
      "- **Cạnh:** Các đoạn thẳng AB, BC, CD, DA được gọi là các cạnh.",
      "- **Góc:** Các góc của tứ giác là $\\widehat{A}, \\widehat{B}, \\widehat{C}, \\widehat{D}$.",
      "- **Cạnh đối:** Cạnh AB và CD là hai cạnh đối; BC và DA là hai cạnh đối.",
      "- **Góc đối:** Góc A và C là hai góc đối; góc B và D là hai góc đối.",
      "- **Đường chéo:** Đoạn thẳng nối hai đỉnh đối nhau. Tứ giác ABCD có hai đường chéo là AC và BD.",
      "**3. Định lí tổng các góc của một tứ giác:**",
      "- Tổng số đo các góc của một tứ giác bằng $360^{\\circ}$. "
    ],
    "formulas": [
      "Tổng các góc trong tứ giác ABCD: $\\widehat{A} + \\widehat{B} + \\widehat{C} + \\widehat{D} = 360^{\\circ}$"
    ]
  },
  "flashcards": [
    {
      "id": "1",
      "question": "Thế nào là một tứ giác ABCD?",
      "answer": "Tứ giác ABCD là hình gồm bốn đoạn thẳng AB, BC, CD, DA, trong đó bất kì hai đoạn thẳng nào cũng không cùng nằm trên một đường thẳng. "
    },
    {
      "id": "2",
      "question": "Thế nào là một tứ giác lồi?",
      "answer": "Tứ giác lồi là tứ giác luôn nằm trong một nửa mặt phẳng có bờ là đường thẳng chứa bất kì cạnh nào của tứ giác. "
    },
    {
      "id": "3",
      "question": "Tổng số đo các góc của một tứ giác là bao nhiêu?",
      "answer": "Tổng số đo các góc của một tứ giác bằng $360^{\\circ}$. "
    }
  ],
  "examples": [
    {
      "id": "1",
      "title": "Tìm số đo góc của tứ giác",
      "problem": "Tìm số đo x trong tứ giác MNPQ ở hình bên, biết $\\widehat{M} = 120^{\\circ}, \\widehat{Q} = 80^{\\circ}, \\widehat{P} = 110^{\\circ}$.",
      "solution": [
        "Xét tứ giác MNPQ, áp dụng định lí tổng các góc của một tứ giác, ta có: ",
        "$\\widehat{M} + \\widehat{N} + \\widehat{P} + \\widehat{Q} = 360^{\\circ}$",
        "Thay số: $120^{\\circ} + x + 110^{\\circ} + 80^{\\circ} = 360^{\\circ}$",
        "$\\Rightarrow x + 310^{\\circ} = 360^{\\circ}$",
        "$\\Rightarrow x = 360^{\\circ} - 310^{\\circ} = 50^{\\circ}$",
        "Vậy số đo của góc N là $50^{\\circ}$."
      ]
    },
    {
      "id": "2",
      "title": "Tính các góc của tứ giác dựa vào tỉ lệ",
      "problem": "Cho tứ giác ABCD có các góc $\\widehat{A}, \\widehat{B}, \\widehat{C}, \\widehat{D}$ có số đo tỉ lệ với các số 1, 2, 3, 4. Tính số đo các góc của tứ giác.",
      "solution": [
        "Theo đề bài, ta có: $\\frac{\\widehat{A}}{1} = \\frac{\\widehat{B}}{2} = \\frac{\\widehat{C}}{3} = \\frac{\\widehat{D}}{4}$",
        "Áp dụng định lí tổng các góc của một tứ giác: $\\widehat{A} + \\widehat{B} + \\widehat{C} + \\widehat{D} = 360^{\\circ}$",
        "Áp dụng tính chất của dãy tỉ số bằng nhau, ta có:",
        "$\\frac{\\widehat{A}}{1} = \\frac{\\widehat{B}}{2} = \\frac{\\widehat{C}}{3} = \\frac{\\widehat{D}}{4} = \\frac{\\widehat{A} + \\widehat{B} + \\widehat{C} + \\widehat{D}}{1+2+3+4} = \\frac{360^{\\circ}}{10} = 36^{\\circ}$",
        "Từ đó suy ra:",
        "$\\widehat{A} = 1 \\cdot 36^{\\circ} = 36^{\\circ}$",
        "$\\widehat{B} = 2 \\cdot 36^{\\circ} = 72^{\\circ}$",
        "$\\widehat{C} = 3 \\cdot 36^{\\circ} = 108^{\\circ}$",
        "$\\widehat{D} = 4 \\cdot 36^{\\circ} = 144^{\\circ}$"
      ]
    }
  ],
  "quiz": [
    {
      "id": "1",
      "question": "Một tứ giác có thể có nhiều nhất bao nhiêu góc tù?",
      "options": [
        "1",
        "2",
        "3",
        "4"
      ],
      "correctAnswerIndex": 2,
      "explanation": "Một tứ giác có thể có 3 góc tù. Ví dụ, một tứ giác có các góc là $100^{\\circ}, 100^{\\circ}, 100^{\\circ}$. Góc còn lại sẽ là $360^{\\circ} - 3 \\cdot 100^{\\circ} = 60^{\\circ}$. Nếu có 4 góc tù (mỗi góc > 90°) thì tổng 4 góc sẽ lớn hơn $4 \\cdot 90^{\\circ} = 360^{\\circ}$, điều này mâu thuẫn với định lí tổng các góc của tứ giác."
    },
    {
      "id": "2",
      "question": "Cho tứ giác ABCD có $\\widehat{A} = 50^{\\circ}, \\widehat{B} = 120^{\\circ}, \\widehat{D} = 80^{\\circ}$. Số đo góc C là:",
      "options": [
        "100°",
        "110°",
        "120°",
        "130°"
      ],
      "correctAnswerIndex": 1,
      "explanation": "Tổng các góc trong một tứ giác bằng 360°. Do đó, $\\widehat{C} = 360^{\\circ} - (\\widehat{A} + \\widehat{B} + \\widehat{D}) = 360^{\\circ} - (50^{\\circ} + 120^{\\circ} + 80^{\\circ}) = 360^{\\circ} - 250^{\\circ} = 110^{\\circ}$."
    }
  ],
  "trueFalseQuiz": [
    {
      "id": "tf1",
      "question": "Xét tính đúng sai của các khẳng định sau về một tứ giác lồi:",
      "statements": [
        { "text": "Một tứ giác có thể có 2 góc vuông và 2 góc nhọn.", "isTrue": false },
        { "text": "Tổng số đo các góc ngoài tại bốn đỉnh của một tứ giác là $360^{\\circ}$.", "isTrue": true },
        { "text": "Trong tứ giác ABCD, cạnh AB và cạnh BC là hai cạnh đối nhau.", "isTrue": false },
        { "text": "Một tứ giác có 4 cạnh bằng nhau thì có 4 góc bằng nhau.", "isTrue": false }
      ],
      "explanation": "a) Sai. Nếu có 2 góc vuông (tổng 180°) và 2 góc nhọn (tổng < 180°) thì tổng 4 góc của tứ giác sẽ nhỏ hơn 360°, điều này vô lý.\\nb) Đúng. Mỗi góc ngoài và góc trong kề với nó có tổng bằng 180°. Tổng 4 góc trong và 4 góc ngoài là $4 \\cdot 180^{\\circ} = 720^{\\circ}$. Vì tổng các góc trong là 360° nên tổng các góc ngoài là $720^{\\circ} - 360^{\\circ} = 360^{\\circ}$.\\nc) Sai. Cạnh AB và cạnh BC là hai cạnh kề nhau vì có chung đỉnh B. Cạnh AB và cạnh CD mới là hai cạnh đối nhau.\\nd) Sai. Hình thoi là một tứ giác có 4 cạnh bằng nhau nhưng các góc không nhất thiết phải bằng nhau."
    }
  ],
  "shortAnswerQuiz": [
    {
      "id": "sa1",
      "question": "Năm 1997, kiến trúc sư người Mỹ Frank Gehry đã hoàn thành công trình Bảo tàng Guggenheim Bilbao ở Tây Ban Nha, một công trình kiến trúc nổi tiếng với các khối đa diện phức tạp. Giả sử mặt tiền của một phần công trình có dạng hình tứ giác. Biết rằng ba góc của mặt tiền đó có số đo lần lượt là $85^{\\circ}$, $110^{\\circ}$ và $95^{\\circ}$. Để tính toán kết cấu, các kỹ sư cần biết số đo của góc còn lại. Góc đó có số đo là bao nhiêu độ?",
      "correctAnswer": "0070",
      "displayAnswer": "70",
      "explanation": "Tổng các góc của một tứ giác là $360^{\\circ}$. Số đo của góc còn lại là: $360^{\\circ} - (85^{\\circ} + 110^{\\circ} + 95^{\\circ}) = 360^{\\circ} - 290^{\\circ} = 70^{\\circ}$.",
      "hint": "Tổng bốn góc trong một tứ giác bằng $360^{\\circ}$."
    }
  ],
  "homework": [
    {
      "id": "1",
      "title": "Bài tập về nhà - Tứ giác",
      "problems": [
        "1. Tính các góc của tứ giác ABCD biết rằng: $\\widehat{A}:\\widehat{B}:\\widehat{C}:\\widehat{D} = 2:3:4:3$.",
        "2. Cho tứ giác ABCD có $\\widehat{C} = 60^{\\circ}$, $\\widehat{D} = 80^{\\circ}$. Các tia phân giác của góc A và góc B cắt nhau tại I. Tính số đo góc $\\widehat{AIB}$.",
        "3. Chứng minh rằng trong một tứ giác, tổng độ dài hai đường chéo lớn hơn nửa chu vi của tứ giác đó."
      ]
    }
  ]
};
