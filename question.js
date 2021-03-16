class Question {

    constructor() {
      this.title = createElement('h1')
     // this.input1 = createInput("Enter Your Name Here....");
      this.input1 = createInput("Enter answer Option");
      this.button = createButton('Submit');
      this.question = createElement('h3');
      this.option1 = createElement('h4');
      this.option2 = createElement('h4');
      this.option3 = createElement('h4');
      this.option4 = createElement('h4');
      this.answer = createElement('h2');
      this.ans = null;
    }
  
    hide(){
      this.title.hide();
      //this.input1.hide();
      this.button.hide();
     // this.input2.hide();
    }
  
    display(){
      this.title.html("The DeathNote Quiz");
      this.title.position(350, 0);
  
      this.question.html("Question:- What was the real name of Melo " );
      this.question.position(150, 80);
      this.option1.html("1: Michael Amane  " );
      this.option1.position(150, 100);
      this.option2.html("2: Soichiro Yagami" );
      this.option2.position(150, 120);
      this.option3.html("3: L Lawliet " );
      this.option3.position(150, 140);
      this.option4.html("4: Mihael Keehl" );
      this.option4.position(150, 160);
  
      this.input1.position(150, 230);
    //  this.input2.position(350, 230);
      this.button.position(290, 300);
  
      this.button.mousePressed(()=>{
        this.title.hide();
        this.input1.hide();
        //this.input2.hide();
        this.button.hide();
       // contestant.name = this.input1.value();
        this.ans = this.input1.value();
       
      });
    }
  }
  