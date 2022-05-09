const pull = {
    question: 'What is your favorite programming language?',
    options: ['0: JavaScript', '1: Python', '2: Rust', '3: C++'],
    answers: new Array(4).fill(0),
    registerNewAnswer() {
        const questionText = document.getElementById('question');
        const result = document.getElementById('result');
        const btn = document.getElementById('btn');
        const answersText0 = document.getElementById('answer0');
        const answersText1 = document.getElementById('answer1');
        const answersText2 = document.getElementById('answer2');
        const answersText3 = document.getElementById('answer3');
        questionText.innerText = this.question;
        [answersText0.innerText, answersText1.innerText, answersText2.innerText, answersText3.innerText] = this.options;

        // const window = document.getElementById('window');
        //
        //
        // let input = '<input type="text" class="input" id="input" placeholder="(Напишите номер опции)">';
        // window.insertAdjacentHTML('beforeend', input);
        //
        // let inputValue = input.value;
        // const input = document.getElementById('input').value;


        btn.addEventListener('click', () => {
            result.style.visibility = 'visible'
            const input = document.getElementById('input').value;
            console.log(input);

            if (input === '') {
                result.textContent = '';
                result.append('Введите какой-нибудь ответ');
                result.style.backgroundColor = '#a1bdf5';
            } else if (Number(input) >= 0 && Number(input) <= 3) {
                result.style.backgroundColor = '#98f8b2';
                result.textContent = '';
                this.answers[Number(input)]++;
                result.insertAdjacentHTML('afterbegin', `${this.answers[0]}:${this.answers[1]}:${this.answers[2]}:${this.answers[3]}`);

                console.log(this.answers)
            } else {
                result.style.backgroundColor = '#f898a6';
                result.textContent = '';
                result.append('Введены некорректные данные');
            }
        })
    },
};

pull.registerNewAnswer()


