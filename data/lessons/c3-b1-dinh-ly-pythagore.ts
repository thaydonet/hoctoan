import { MathTopic } from '../../src/types/MathTopic';

export const c3b1pythagore: MathTopic ={
  "id": "dinh-li-pythagore",
  "title": "Bài 1: Định lí Pythagore",
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
"quiz": [
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
      },
      {
        "id": "2",
        "question": "Bộ ba số nào sau đây là độ dài ba cạnh của một tam giác vuông?",
        "options": [
          "(2, 3, 4)",
          "(6, 8, 10)",
          "(5, 6, 7)",
          "(1, 2, 3)"
        ],
        "correctAnswerIndex": 1,
        "explanation": "Ta kiểm tra theo định lí Pythagore đảo. Với bộ (6, 8, 10), ta có $10^2 = 100$ và $6^2 + 8^2 = 36 + 64 = 100$. Vì $10^2 = 6^2 + 8^2$ nên đây là bộ ba Pythagore."
      },
      {
        "id": "3",
        "question": "Một tam giác vuông có hai cạnh góc vuông là 9 cm và 12 cm. Độ dài cạnh huyền là:",
        "options": [
          "15 cm",
          "21 cm",
          "10 cm",
          "18 cm"
        ],
        "correctAnswerIndex": 0,
        "explanation": "Gọi cạnh huyền là c. Ta có $c^2 = 9^2 + 12^2 = 81 + 144 = 225$. Vậy $c = \\sqrt{225} = 15$ cm."
      },
      {
        "id": "4",
        "question": "Cho tam giác ABC vuông tại A, có AB = 5 và BC = 13. Độ dài cạnh AC là:",
        "options": [
          "8",
          "18",
          "12",
          "144"
        ],
        "correctAnswerIndex": 2,
        "explanation": "Áp dụng định lí Pythagore, ta có $BC^2 = AB^2 + AC^2 \\Rightarrow AC^2 = BC^2 - AB^2 = 13^2 - 5^2 = 169 - 25 = 144$. Vậy $AC = \\sqrt{144} = 12$."
      },
      {
        "id": "5",
        "question": "Đường chéo của một hình vuông có cạnh bằng 4 cm là:",
        "options": [
          "$4\\sqrt{2}$ cm",
          "8 cm",
          "$2\\sqrt{4}$ cm",
          "4 cm"
        ],
        "correctAnswerIndex": 0,
        "explanation": "Đường chéo chia hình vuông thành hai tam giác vuông cân. Gọi đường chéo là d. Ta có $d^2 = 4^2 + 4^2 = 16 + 16 = 32$. Vậy $d = \\sqrt{32} = \\sqrt{16 \\cdot 2} = 4\\sqrt{2}$ cm."
      },
      {
        "id": "6",
        "question": "Cho tam giác MNP có MN = 10, NP = 6, MP = 8. Kết luận nào sau đây đúng?",
        "options": [
          "Tam giác MNP vuông tại M",
          "Tam giác MNP vuông tại N",
          "Tam giác MNP vuông tại P",
          "Tam giác MNP là tam giác đều"
        ],
        "correctAnswerIndex": 2,
        "explanation": "Ta thấy cạnh lớn nhất là MN = 10. Ta có $MN^2 = 10^2 = 100$. Tổng bình phương hai cạnh kia là $NP^2 + MP^2 = 6^2 + 8^2 = 36 + 64 = 100$. Vì $MN^2 = NP^2 + MP^2$ nên tam giác MNP vuông tại P."
      },
      {
        "id": "7",
        "question": "Một chiếc thang dài 5 m dựa vào tường. Chân thang cách chân tường 3 m. Độ cao của thang trên tường là:",
        "options": [
          "2 m",
          "8 m",
          "\\sqrt{34} m",
          "4 m"
        ],
        "correctAnswerIndex": 3,
        "explanation": "Gọi độ cao là h. Ta có $5^2 = 3^2 + h^2 \\Rightarrow h^2 = 25 - 9 = 16$. Vậy $h = 4$ m."
      },
      {
        "id": "8",
        "question": "Tam giác cân có cạnh bên bằng 5 cm, cạnh đáy bằng 6 cm. Chiều cao ứng với cạnh đáy là:",
        "options": [
          "4 cm",
          "\\sqrt{11} cm",
          "3 cm",
          "5 cm"
        ],
        "correctAnswerIndex": 0,
        "explanation": "Đường cao trong tam giác cân cũng là đường trung tuyến, chia cạnh đáy thành hai đoạn bằng nhau, mỗi đoạn 3 cm. Gọi chiều cao là h. Ta có tam giác vuông với cạnh huyền 5 cm, một cạnh góc vuông 3 cm. Vậy $h^2 = 5^2 - 3^2 = 25 - 9 = 16 \\Rightarrow h = 4$ cm."
      },
      {
        "id": "9",
        "question": "Trong các tam giác có độ dài ba cạnh sau, tam giác nào không phải là tam giác vuông?",
        "options": [
          "(7, 24, 25)",
          "(8, 15, 17)",
          "(9, 12, 15)",
          "(6, 7, 8)"
        ],
        "correctAnswerIndex": 3,
        "explanation": "Kiểm tra bộ (6, 7, 8): $8^2 = 64$. $6^2 + 7^2 = 36 + 49 = 85$. Vì $64 \\neq 85$ nên đây không phải tam giác vuông. Các bộ còn lại đều là bộ ba Pythagore."
      },
      {
        "id": "10",
        "question": "Độ dài đường chéo của một hình chữ nhật có chiều dài 12 cm và chiều rộng 5 cm là:",
        "options": [
          "17 cm",
          "169 cm",
          "13 cm",
          "7 cm"
        ],
        "correctAnswerIndex": 2,
        "explanation": "Gọi đường chéo là d. Ta có $d^2 = 12^2 + 5^2 = 144 + 25 = 169$. Vậy $d = \\sqrt{169} = 13$ cm."
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
    ],
  "homework": {
    "title": "Bài tập về nhà - Định lí Pythagore",
    "problems": [
     "1. Cho tam giác ABC vuông tại B, có AB = 15 cm, BC = 20 cm. Tính độ dài cạnh AC.",
      "2. Một tam giác vuông có cạnh huyền dài 29 cm và một cạnh góc vuông dài 21 cm. Tính độ dài cạnh góc vuông còn lại.",
      "3. Tính độ dài đường chéo của một màn hình TV hình chữ nhật có chiều dài 160 cm và chiều rộng 90 cm. (Làm tròn đến chữ số thập phân thứ nhất).",
      "4. Một cái cây bị sét đánh gãy ngang thân. Ngọn cây đổ xuống chạm đất và cách gốc cây 8 mét. Phần thân cây còn lại cao 15 mét. Tính chiều dài của phần thân cây bị gãy.",
      "5. Cho tam giác đều ABC có cạnh bằng 10 cm. Tính độ dài đường cao AH của tam giác đó. (Làm tròn đến chữ số thập phân thứ hai).",
      "6. Tính chu vi của một tam giác vuông cân biết cạnh huyền bằng $6\\sqrt{2}$ cm.",
      "7. Một con dốc thẳng dài 250 mét, biết rằng nó có độ cao là 70 mét. Tính khoảng cách theo phương ngang từ chân dốc đến đỉnh dốc.",
      "8. Cho tam giác ABC vuông tại A có tỉ lệ hai cạnh góc vuông AB/AC = 3/4 và cạnh huyền BC = 25 cm. Tính độ dài các cạnh AB và AC.",
      "9. Từ một đỉnh của một tòa nhà cao 60m, người ta nhìn thấy một chiếc ô tô đang đỗ cách tòa nhà (theo phương ngang) 80m. Tính khoảng cách từ đỉnh tòa nhà đến chiếc ô tô.",
      "10. Trong mặt phẳng tọa độ Oxy, cho hai điểm A(2, 1) và B(7, 13). Tính độ dài đoạn thẳng AB."
    ]
  }
}
