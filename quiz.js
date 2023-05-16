
// Scripts for running quizzes and storing quiz infomation


// Quizzes
const quizNames = [
    "Quiz Not Found",
    "Are You a Leader or a Supporter?",
    "Are You a Natural Healer?",
    "Which Programming Language Are You?",
    "Which Ice Cream Flavor Are You?"
];

// quizindex.html
function mainQuizIndex()
{
    // Populate the quiz list
    const quizList = document.getElementById("quiz-list");
    for (let i = 1; i < quizNames.length; i++)
    {
        quizList.innerHTML += `<li><a href="quiz.html?q=${i}">${quizNames[i]}</a></li>`;
    }
}

// newquizzes.html
function mainNewQuizzes()
{
    // Populate the quiz list
    const quizList = document.getElementById("quiz-list");
    for (let i = quizNames.length - 1; i > quizNames.length - 9 && i != 0; i--)
    {
        quizList.innerHTML += `<li><a href="quiz.html?q=${i}">${quizNames[i]}</a></li>`;
    }
}

// quiz.html
function mainQuiz()
{
    // Get the quiz ID from the URL
    const urlParams = new URLSearchParams(window.location.search);
    const quizID = parseInt(urlParams.get("q"));

    var quizName;

    const startScreen = document.getElementById("start-screen");
    const startButton = document.getElementById("start-button");

    const quizTitle = document.getElementById("quiz-title");

    // Attempt to access the quiz and stop if the quiz does not exist
    try
    {
        quizName = quizNames[quizID];
        if (quizName == undefined || quizID == 0) throw "Quiz does not exist";
    }
    catch (error)
    {
        quizName = quizNames[0];
        quizTitle.innerHTML = quizName;
        startButton.disabled = true;
        return;
    }

    // Set title
    quizTitle.innerHTML = quizName;

    const endScreen = document.getElementById("end-screen");
    const restartButton = document.getElementById("start-over");

    const questionScreen = document.getElementById("question-displayer");

    const question = document.getElementById("question");

    // Quiz option radiobuttons
    const choiceButtons = [
        document.getElementById("button1"),
        document.getElementById("button2"),
        document.getElementById("button3"),
        document.getElementById("button4")
    ];

    // Quiz option labels
    const answerLabels = [
        document.getElementById("answer1"),
        document.getElementById("answer2"),
        document.getElementById("answer3"),
        document.getElementById("answer4")
    ];

    const prevButton = document.getElementById("previous");
    const nextButton = document.getElementById("next");

    const resultDisplay = document.getElementById("result-display");

    // Quiz questions and answers
    const quizzes = [];

    quizzes[1] = [
        [
            "Do you like working with other people?",
            "Yes, of course!",
            "Yes, if they are competent.",
            "Yes, if they know what they're doing.",
            "Nope."
        ],
        [
            "Does having responsibilities make you feel in control?",
            "Yes, so I can carry them out with confidence.",
            "Yes, I feel like I have a purpose.",
            "No, responsibilities hold me back.",
            "No, responsibilities make me nervous."
        ],
        [
            "Do you consider yourself an organized person?",
            "Yes, I am neat, tidy, and prepared.",
            "Sure, most of the time.",
            "Not really, but I manage just fine.",
            "Hehehe next question :)"
        ],
        [
            "Do you have clear goals in life?",
            "Yes, I know exactly what I want to do and I've got plans on how to do it.",
            "Yes, but I have no idea how to achieve them.",
            "No, I just go with the flow and do what I feel is best.",
            "Uhhhhhhhhhhhhhhhhhhhhhhhhhh..."
        ],
        [
            "Are you good at interacting with people who have different views?",
            "Yes, I try to be good at communicating with anyone.",
            "Usually, but not if they are unreasonable.",
            "No because my views are obviously better than everyone else's.",
            "Interacting with people?"
        ]
    ];

    quizzes[2] = [
        [
            "What does it mean to be in good health?",
            "It means being physically, mentally, emotionally, and spiritually safe, secure, and comfortable.",
            "It means eating well and getting enough sleep to function and not get sick.",
            "Good health is just being alive.",
            "It means having what it takes to survive a difficult day."
        ],
        [
            "Do people like being around you?",
            "Yes, I am always surrounded by either friends, family, or people soon to be my friends.",
            "Yes, when I'm in a good mood.",
            "Nah, I don't spend much time with other people.",
            "I hope so, but I don't think so..."
        ],
        [
            "How would you comfort a friend who isn't feeling well?",
            "I would let them know that I'm there for them and help them as much as I can.",
            "I'd wish them a speedy recovery.",
            "I guess I'd say get well soon, but I'm not a fan of all the softness.",
            "I would be so sad but I wouldn't know what to say or do."
        ],
        [
            "Do you feel other people's pain?",
            "Yes, and it hurts!",
            "I just feel bad for those who are in pain.",
            "No. (I swear I am not a sociopath.)",
            "I am too busy feeling my own pain."
        ],
        [
            "Do want to help others?",
            "I absolutely adore helping others! I want everyone to be okay.",
            "If it's not too much of a hassle, of course I do.",
            "Uh hehe yes of course :) :) :).",
            "Yes, but usually I end up doing the opposite."
        ]
    ];

    quizzes[3] = [
        [
            "Do you enjoy computer programming?",
            "Yes, coding is a slay and I slay at it B)",
            "It can be a challenge but it's cool.",
            "It suppose it is mildly satisfying when things work, which isn't often.",
            "sucks."
        ],
        [
            "Are you a good computational thinker?",
            "My brain is literally a computer, I am a genius.",
            "I do like thinking things through logically and mathematically.",
            "I think so?",
            "......... what is that"
        ],
        [
            "Do you like touching grass?",
            "No grass only computers",
            "On good days, yes, but I'm an indoor person.",
            "Yes, it is a pleasurable activity that more people should engage in.",
            "I should be touching grass right now instead of taking this stupid quiz k bye."
        ],
        [
            "Do you like video games?",
            "Um, slay! I love video games! I also like game development.",
            "Yes, video games are great and some people need to appreciate them more.",
            "I guess some video games are cool, but I'm not a hardcore gamer or anything like that.",
            "something something touch grass."
        ],
        [
            ";",
            "OMG my favorite type of punctuation! ;)",
            "Hehe, gotta love semicolons.",
            "Do not speak to me ever again.",
            "Semicolon jumpscare?! (I do not get it.)"
        ]
    ];

    quizzes[4] = [
        [
            "Which meal of the day is the best?",
            "Lunch is the best because I can have dessert and still have more food later!",
            "Breakfast. There is a whole day of productivity ahead.",
            "Dinner is the best. It's sophisticated, and also the closest to when I get to sleep.",
            "They are all the same to me."
        ],
        [
            "Is chocolate the best thing ever?",
            "Yes, of course! Next question please :)",
            "Chocolate is good but maybe not the best thing ever...",
            "Nah, it's kind of overrated. ",
            "Chocolate should be illegal."
        ],
        [
            "Are you a sweet individual?",
            "Yes I am very sweet xoxo",
            "I am more of a spicy individual, actually.",
            "No I am actually very bitter >:(",
            "Get away from me"
        ],
        [
            "Do you like to try new things?",
            "Yes, how else am I meant to have a fulfilling life?",
            "Sure, but nothing too crazy.",
            "I like to stick with what I know, thank you very much.",
            "Leave"
        ],
        [
            "What is the meaning of life?",
            "Life is about forming connections, having worthwhile experiences, and enjoying oneself through it all.",
            "Who knows? But I think each person should live in the best way they can.",
            "To live.",
            "How is this relevant to this quiz????"
        ]
    ];

    // Quiz result possibilies
    const quizResults = [];

    quizResults[1] = ["Leader", "Supporter", "Individualist", "Confused Introvert :)"];
    quizResults[2] = ["Healing Master", "Fairly Decent Person", "Uh, no :)", "Your heart is in the right place xoxo"];
    quizResults[3] = ["C/C++", "C#", "Java", "JavaScript", "Python", "Scratch XD XD XD", "none of them"];
    quizResults[4] = ["Pink Lemonade Strawberry Chocolate Fudge Caramel Explosion (feat. Rocky Road Swirl of Chaos)", "Chocolate Fudge", "Mint Chocolate Chip", "Coffee", "Peanut Butter Cup", "Mango", "Caramel", "Vanilla Bean", "Strawberry", "The plainest vanilla you can possibly find"];

    const userResponses = [];
    var qNum = 0;

    // Activate start button
    startButton.addEventListener("click", startQuiz);

    // Activate restart button
    restartButton.addEventListener("click", startQuiz);

    // Activate previous and next buttons
    prevButton.addEventListener("click", ()=>{
        if (qNum > 0)
        {
            qNum--;
            updateQuiz();
        }
    });
    nextButton.addEventListener("click", ()=>{
        if (qNum != quizzes[quizID].length - 1)
        {
            qNum++;
            updateQuiz();
        }
        else
        {
            endQuiz();
        }
    });

    function startQuiz()
    {
        startScreen.style.visibility = "hidden";
        questionScreen.style.visibility = "visible";
        endScreen.style.visibility = "hidden";

        // Reset question number
        qNum = 0;

        // Reset user responses
        userResponses.length = 0;

        // Reset option buttons
        for (let i = 0; i < choiceButtons.length; i++)
        {
            choiceButtons[i].checked = false;
        }

        updateQuiz();
    }

    function updateQuiz()
    {
        // Update question
        question.innerHTML = quizzes[quizID][qNum][0];

        // Update answer options and answer buttons
        for (let i = 0; i < answerLabels.length; i++)
        {
            if (quizzes[quizID][qNum][i + 1] != "")
            {
                answerLabels[i].innerHTML = quizzes[quizID][qNum][i + 1];
                answerLabels[i].style.visibility = "visible";
                choiceButtons[i].style.visibility = "visible";
            }
            else
            {
                answerLabels[i].innerHTML = "";
                answerLabels[i].style.visibility = "hidden";
                choiceButtons[i].style.visibility = "hidden";
            }
        }

        // Check/update which option has been chosen
        for (let j = 0; j < choiceButtons.length; j++)
        {
            // Reset
            choiceButtons[j].removeEventListener("change", ()=>{userResponses[qNum] = j + 1});
            choiceButtons[j].checked = false;
            if (userResponses[qNum])
            {
                choiceButtons[userResponses[qNum] - 1].checked = true;
            }

            // Update buttons
            updateButtons();

            choiceButtons[j].addEventListener("change", ()=>{
                userResponses[qNum] = j + 1;
                updateButtons();
            });
        }
    }

    function endQuiz()
    {
        // Hide everything from the question screen
        questionScreen.style.visibility = "hidden";
        endScreen.style.visibility = "visible";
        for (let i = 0; i < answerLabels.length; i++)
        {
            answerLabels[i].style.visibility = "hidden";
            choiceButtons[i].style.visibility = "hidden";
        }

        // Give result
        resultDisplay.innerHTML = computeResults(quizID);
    }

    function computeResults(ID)
    {
        // Get possible results for the appropriate quiz and user responses
        const resultArray = quizResults[ID];
        const X = Array.from(new Set(userResponses.sort((a, b)=>{return b - a})));

        // Determine result
        switch (ID)
        {
            case 1:
                switch (X[0])
                {
                    case 1:
                        return resultArray[0];

                    case 2:
                        if (X[1] == 4)
                        {
                            return resultArray[1];
                        }
                        else
                        {
                            return resultArray[0];
                        }

                    case 3:
                        if (X[1] == 4)
                        {
                            return resultArray[1];
                        }
                        else
                        {
                            return resultArray[2];
                        }

                    case 4:
                        return resultArray[3];
                }

            case 2:
                switch (X[0])
                {
                    case 1:
                        if (X[1] == 3 || X[1] == 4)
                        {
                            return resultArray[1];
                        }
                        else
                        {
                            return resultArray[0];
                        }

                    case 2:
                        return resultArray[1];

                    case 3:
                        if (X[1] == 1)
                        {
                            return resultArray[1];
                        }
                        else
                        {
                            return resultArray[2];
                        }

                    case 4:
                        return resultArray[3];
                }

            case 3:
                switch (X[0])
                {
                    case 1:
                        return resultArray[Math.round(Math.random() * 2)];

                    case 2:
                        return resultArray[Math.round(Math.random() * 2) + 2];

                    case 3:
                        return resultArray[Math.round(Math.random() * 2) + 3];

                    case 4:
                        return resultArray[Math.round(Math.random()) + 5];
                }

            case 4:
                switch (X[0])
                {
                    case 1:
                        return resultArray[Math.round(Math.random() * 2)];

                    case 2:
                        return resultArray[Math.round(Math.random() * 4) + 1];

                    case 3:
                        return resultArray[Math.round(Math.random() * 4) + 4];

                    case 4:
                        return resultArray[Math.round(Math.random() * 2) + 7];
                }

            default:
                return resultArray[0];
        }
    }

    function updateButtons()
    {
        // Disable previous button for first question
        if (qNum < 1)
        {
            prevButton.disabled = true;
        }
        else
        {
            prevButton.disabled = false;
        }

        // Update next button for last question
        if (qNum == quizzes[quizID].length - 1)
        {
            nextButton.innerHTML = "Finish Quiz!";
        }
        else
        {
            nextButton.innerHTML = "Next Question";
        }

        // Disable next button until an answer has been chosen
        for (let i = 0; i < choiceButtons.length; i++)
        {
            if (choiceButtons[i].checked == true)
            {
                nextButton.disabled = false;
                break;
            }
            else if (i == choiceButtons.length - 1)
            {
                nextButton.disabled = true;
            }
        }
    }
}

// Run the appropriate script depending on the page
document.addEventListener("DOMContentLoaded", ()=>{
    if (window.location.href.search("/quizindex.html") != -1)
    {
        mainQuizIndex();
    }
    else if (window.location.href.search("/newquizzes.html") != -1)
    {
        mainNewQuizzes();
    }
    else if (window.location.href.search("/quiz.html"))
    {
        mainQuiz();
    }
});