/* ============================================================
   questions.js
   Static question bank for the quiz page. Each subject is an
   array of { question, options[4], answerIndex }.
   ============================================================ */

const QuestionBank = {
  maths: [
    { question: "5 + 7 kitna hota hai?", options: ["10", "11", "12", "13"], answerIndex: 2 },
    { question: "9 - 4 kitna hota hai?", options: ["4", "5", "6", "3"], answerIndex: 1 },
    { question: "6 x 3 kitna hota hai?", options: ["16", "18", "20", "12"], answerIndex: 1 },
    { question: "20 divide 4 kitna hota hai?", options: ["5", "4", "6", "8"], answerIndex: 0 },
    { question: "Ek dozen mein kitni cheezein hoti hain?", options: ["10", "12", "14", "16"], answerIndex: 1 },
    { question: "Sabse chhota even number kaunsa hai?", options: ["0", "1", "2", "4"], answerIndex: 2 },
    { question: "100 ka aadha (half) kya hai?", options: ["25", "40", "50", "60"], answerIndex: 2 },
    { question: "7 x 7 kitna hota hai?", options: ["47", "49", "56", "42"], answerIndex: 1 },
    { question: "Ek triangle ke kitne side hote hain?", options: ["2", "3", "4", "5"], answerIndex: 1 },
    { question: "15 + 15 kitna hota hai?", options: ["25", "30", "35", "20"], answerIndex: 1 },
    { question: "Ek square ke kitne corners hote hain?", options: ["3", "4", "5", "6"], answerIndex: 1 },
    { question: "50 mein 20 jodo to kya milega?", options: ["60", "65", "70", "75"], answerIndex: 2 },
    { question: "8 x 2 kitna hota hai?", options: ["14", "16", "18", "10"], answerIndex: 1 },
    { question: "Sabse chhota odd number kaunsa hai?", options: ["0", "1", "2", "3"], answerIndex: 1 },
    { question: "10 mein 3 baar 3 nikaalo, kitna bacha?", options: ["0", "1", "2", "3"], answerIndex: 1 }
  ],
  gk: [
    { question: "Suraj kis disha se nikalta hai?", options: ["Uttar", "Dakshin", "Purab", "Pashchim"], answerIndex: 2 },
    { question: "Ek hafte mein kitne din hote hain?", options: ["5", "6", "7", "8"], answerIndex: 2 },
    { question: "Body ka sabse bada organ kaunsa hai?", options: ["Dil", "Dimaag", "Skin", "Liver"], answerIndex: 2 },
    { question: "Paani jab jam jaata hai to kya banta hai?", options: ["Bhaap", "Barf", "Dhuan", "Ret"], answerIndex: 1 },
    { question: "Bharat ka rashtriya pashu kaunsa hai?", options: ["Sher", "Baagh", "Hathi", "Mor"], answerIndex: 1 },
    { question: "Ek saal mein kitne mahine hote hain?", options: ["10", "11", "12", "13"], answerIndex: 2 },
    { question: "Rainbow mein kitne rang hote hain?", options: ["5", "6", "7", "8"], answerIndex: 2 },
    { question: "Sabse bada planet kaunsa hai?", options: ["Mangal", "Prithvi", "Brihaspati", "Shukra"], answerIndex: 2 },
    { question: "Bharat ki rajdhani kaunsi hai?", options: ["Mumbai", "Kolkata", "Nayi Dilli", "Chennai"], answerIndex: 2 },
    { question: "Bharat ka rashtriya pakshi kaunsa hai?", options: ["Kabootar", "Mor", "Tota", "Chidiya"], answerIndex: 1 },
    { question: "Bharat ka rashtriya phool kaunsa hai?", options: ["Gulab", "Kamal", "Sunflower", "Champa"], answerIndex: 1 },
    { question: "Duniya ka sabse lamba river kaunsa hai?", options: ["Ganga", "Amazon", "Nile", "Yamuna"], answerIndex: 2 },
    { question: "Ek din mein kitne ghante hote hain?", options: ["12", "20", "24", "26"], answerIndex: 2 },
    { question: "Bharat ka rashtriya khel kaunsa hai?", options: ["Cricket", "Hockey", "Football", "Kabaddi"], answerIndex: 1 },
    { question: "Sabse chhota mahina kaunsa hai (dino ke hisaab se)?", options: ["January", "February", "April", "June"], answerIndex: 1 }
  ],
  science: [
    { question: "Hum saans lene ke liye kaunsi gas use karte hain?", options: ["Carbon Dioxide", "Oxygen", "Nitrogen", "Hydrogen"], answerIndex: 1 },
    { question: "Paudhon ko bhojan banane ke liye kya chahiye?", options: ["Sirf paani", "Sunlight", "Sirf mitti", "Andhera"], answerIndex: 1 },
    { question: "Humare sharir mein khoon pump karne wala organ kaunsa hai?", options: ["Dimaag", "Dil (Heart)", "Fefda", "Liver"], answerIndex: 1 },
    { question: "Chand hume raat ko kaisa dikhta hai?", options: ["Khud ki roshni se", "Suraj ki roshni reflect kar ke", "Bulb ki tarah", "Aag se"], answerIndex: 1 },
    { question: "Kaunsa jaanwar anda deta hai?", options: ["Gaay", "Kutta", "Murgi", "Bakri"], answerIndex: 2 },
    { question: "Pani kis tapman par ubalta hai (Celsius mein)?", options: ["0°C", "50°C", "100°C", "150°C"], answerIndex: 2 },
    { question: "Humein dekhne ke liye kaunsa body part chahiye?", options: ["Kaan", "Aankh", "Naak", "Zubaan"], answerIndex: 1 },
    { question: "Kaunsi cheez chumbak (magnet) ko attract karti hai?", options: ["Lakdi", "Plastic", "Loha (Iron)", "Kagaz"], answerIndex: 2 },
    { question: "Insaan ke kitne daant (teeth) hote hain (adult mein)?", options: ["20", "28", "32", "36"], answerIndex: 2 },
    { question: "Mausam mein baraf kaise banti hai?", options: ["Garmi se", "Bahut thand se", "Hawa se", "Dhoop se"], answerIndex: 1 }
  ],
  english: [
    { question: "'Happy' ka opposite (viruddh) kya hai?", options: ["Sad", "Glad", "Joyful", "Fun"], answerIndex: 0 },
    { question: "Kaunsa word ek 'animal' hai?", options: ["Chair", "Elephant", "Table", "Book"], answerIndex: 1 },
    { question: "'Cat' ka plural (bahuvachan) kya hota hai?", options: ["Cates", "Cats", "Caties", "Cat's"], answerIndex: 1 },
    { question: "Sahi spelling choose karo:", options: ["Skool", "School", "Schoool", "Skul"], answerIndex: 1 },
    { question: "'Big' ka opposite kya hai?", options: ["Large", "Huge", "Small", "Tall"], answerIndex: 2 },
    { question: "Kaunsa word ek 'color' hai?", options: ["Happy", "Green", "Run", "Jump"], answerIndex: 1 },
    { question: "'I ___ a student.' — sahi word bharo.", options: ["is", "am", "are", "be"], answerIndex: 1 },
    { question: "'Fast' ka opposite kya hai?", options: ["Quick", "Slow", "Speedy", "Rapid"], answerIndex: 1 },
    { question: "Kaunsa word ek 'fruit' hai?", options: ["Carrot", "Potato", "Mango", "Onion"], answerIndex: 2 },
    { question: "'Sun rises in the ___.' sahi word kya hoga?", options: ["West", "North", "East", "South"], answerIndex: 2 }
  ]
};
