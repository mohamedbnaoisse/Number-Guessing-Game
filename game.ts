const readline = require('readline-sync')

class NumberGuessingGame {
    private secretNumber: number;
    private maxAttempts: number;
    private attempts: number;

    constructor() {
        this.secretNumber = 0;
        this.maxAttempts = 0;
        this.attempts = 0;
    }

    private generateSecretNumber(min: number, max: number): number {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    private welcomeMessage(): void {
        console.log("\n🎯 Welcome to the Number Guessing Game!");
        console.log("I'm thinking of a number between 1 and 100.");
    }


    private getDifficulty(): number {
        console.log("\nPlease select the difficulty level:");
        console.log("1. Easy (10 chances)");
        console.log("2. Medium (5 chances)");
        console.log("3. Hard (3 chances)");
        while(true){
            const input =readline.question("Enter difficulty level");
            const choise=parseInt(input);
            if(choise===1) return 10;
            if(choise===2) return 5; 
            if(choise===3) return 3; 
            console.log("Invalid choice! Please enter 1, 2, or 3.");

        }
    }
    private getUserGuess(): number {
        while(true){
            const  input=readline.question(`Entre your guse( attmpets ${this.attempts +1}/${this.maxAttempts}): `);
            const gusse =parseInt(input) ;
            if(!isNaN(gusse)&&gusse>=1 && gusse<=100 ){
                return gusse;
            }
            console.log("Please enter a valid number between 1 and 100!");
        }

    }
    private gameloop():void{ 
        while(this.attempts<this.maxAttempts){
            const gusse = this.getUserGuess();
            this.attempts++
            if(gusse === this.secretNumber){
                console.log(`\n🎉 Congratulations! You guessed the number in ${this.attempts} attempts!`);
                return;
            }
            else{
                if(gusse < this.secretNumber){
                    console.log("📈 The number is HIGHER than your guess");}
                else{
                    console.log("📉 The number is LOWER than your guess");}
                const  remniaing = this.maxAttempts - this.attempts
                if(remniaing>0){
                    console.log(`💡 You have ${remniaing} attempt(s) remaining\n`);
                }              
            }
        }


        console.log(`\n💔 Game Over! The secret number was ${this.secretNumber}`);
        
        

    }
    public startGame(){
        const stratdate=Date.now();
        this.welcomeMessage();
        this.secretNumber = this.generateSecretNumber(1,100);
        this.maxAttempts = this.getDifficulty();
        this.attempts = 0;
        
        console.log("lets go");

        this.gameloop();
        const enddate=Date.now();
        const timeTaken = (enddate - stratdate) / 1000;
    
        console.log(`⏱️ Time taken: ${timeTaken.toFixed(2)} seconds`);

    }
    public playagin():string{
        while(true){
            const reponse=readline.question("do you want to play agine('yes' or 'no')");
            if(!(reponse!="yes" &&reponse!="no")){
                return reponse;   
            }
            console.log("yes or no")

        }

    }
    
   
    
}

  
const Game = new NumberGuessingGame();
let playagin=true;
while(playagin){
    Game.startGame();
    
    const reponse= Game.playagin();
    if( reponse ==="no"){
        playagin=false;
        console.log("\nThanks for playing! Goodbye! 👋");
    }
        

}
